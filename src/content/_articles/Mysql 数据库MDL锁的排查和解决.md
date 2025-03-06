---
title: 解决 Mysql 数据库 MDL 锁问题
slug: solving-mysql-database-mdl-lock-issue
description: 本文记录了在对MySQL数据库表增加字段时遇到的 MDL 锁问题及其解决方法，包括问题原因分析、排查过程和解决方案。
keywords: Mysql, MDL 锁, TDSQL-C MySQL, 数据库, alter table, 长事务, metadata lock
date: 2024-07-06 10:25
---

## 简介
在本周工作中遇到一个关于 Mysql 数据库MDL锁的问题，因为在之前学习和工作中没有遇到过，所以借此来简单的记录一下这个问题以及相应的解决方法。本文章对部分问题不作深入的研究，有兴趣的可以去网上搜索。

## 前提
这周由于一个需求，需要对一个表增加字段，这里说一下数据库的具体情况，公司的数据库是使用腾讯云的 `TDSQL-C MySQL 版` ，版本是 5.7.18，内核小版本是 2.1.9。增加的表是一张记录表， 总数据量总共 13w，读写并不频繁。

增加字段的 ddl 语句为

```sql
alter table `xxxx`
    add column a INT NULL,
    ALGORITHM = inplace,
    LOCK = NONE;
```

这里ALGORITHM和 LOCK 参数具体可以去网上搜索，这里不作具体说明。在执行这条语句后，出现了以下几种情况

1. alter table 语句迟迟执行未完成
2. 该表的读写都被阻塞了
3. 从腾讯云的数据库管家界面查看，alter 语句和 select 语句的状态都是 **waiting for table metadata lock**

在执行时间超过 5 分钟后，相关的查询线程堆积，导致数据库 cpu 上升较多，对 alter 语句进行 cancel 后，阻塞消失。



## 解决
先直接说这个问题的结论，这是因为在执行 alter 语句前，有一个事务对该表开启，那么当执行alter 语句时，数据库会获取该表的 MDL 锁，同时后续的查询，更新和删除操作都需要等待这个 MDL 锁，直到该事务结束。

我遇到这个问题原因是同事有一个 python 脚本对该表进行查询，但是他脚本里面的查询语句加了事务，并且没有作 commit 处理，导致会有一个**状态为 Sleep 的长事务存在**。由于该事务一直没有关闭，也就导致我这边 alter 一直在 waiting metadata lock 了。

后续在找到这个长事务的线程 id后，直接 Kill 掉，alter 操作就完成了。

## 排查过程
这里说一下如何排查出这个问题，首先使用一个有权限的 Mysql 账号，使用SQL

```sql
select t.*, to_seconds(now()) - to_seconds(t.trx_started) idle_time
from INFORMATION_SCHEMA.INNODB_TRX t;
```

这里查询出来的是当前数据库存在的事务，并且 `idle_time` 为该事务的存在时间，基本超过几十秒以上都可以认为是长事务了。

通过这个 SQL 我们可以获取到 **thread_id** 也就是线程 id 了，在 Mysql 中，我们的每个连接都会算一个线程，也就是每个连接都会有一个唯一的线程 id，我们通过线程 id 就可以直接使用 kill thread_id命令来 kill 掉这个会话。

但是这个治标不治本，因为只要这个长事务问题不解决，那么后面还是会出问题的，那么我们可以使用 SQL

```sql
SELECT * FROM information_schema.PROCESSLIST WHERE ID = 123
```

这里 123 就是刚刚你查询出来的长事务的 thread_id，这里可以获取到连接的 user，操作的 db，当前连接的状态，以及最重要的 HOST

通过 db 和 user 我们大概率就可以锁定是哪些应用导致了，如果说还不能确定，那么可以通过 HOST 的 ip 和端口，去指定 ip 的机器上，使用相关命令查询出该端口是什么应用，就可以排查出来了。



## MDL锁
上面已经说了问题和解决方式了，这里简单看一下这个 mdl 锁是如何造成的，这里就直接画个图吧。

![mdl 锁](https://i.imgur.com/ehzf2tc.png)

画的比较丑，会话 a，b，c 顺序执行

2025-03-06 更新执行图
![mdl 锁执行图](https://i.imgur.com/2TpkTW3.png)

## 题外话
如果使用 mysql8 版本，alter 语句可以这样子

```sql
alter table `xxxx`
    add column a INT NULL,
    ALGORITHM = instant;
```

ALGORITHM参数使用 **instant** 算法，可以实现只更改元数据，而不需要更改源表。这样子 alter 操作会非常非常快。

如果说你mysql 版本是 5.7，但是是使用腾讯云 `TDSQL-C MySQL` 版本的话，可以查看一下你的小内核版本是否支持 instant 特性，官方的 5.7 内核小版本 2.1.3 以上是支持 instant 的，只不过有诸多限制，具体可以看

[TDSQL-C MySQL 版 Instant DDL-自研内核-文档中心-腾讯云 (tencent.com)](https://cloud.tencent.com/document/product/1003/61539)

