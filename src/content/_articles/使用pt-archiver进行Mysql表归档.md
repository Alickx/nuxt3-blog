---

title: 使用 pt-archiver 进行 MySQL 表归档
slug: pt-archiver-mysql
summary: 本文介绍了如何使用 pt-archiver 工具对 MySQL 表进行归档操作
description: 本文介绍了如何使用 pt-archiver 工具对 MySQL 表进行归档操作
keywords: Mysql, pt-archiver, 数据库, 归档, MySQL, 数据管理
date: 2025-03-31 10:50
---

## 简介

我们在业务中肯定会遇到的一个情况是单表数据量过大，导致出现表性能下降以及存储空间过大等问题。
对于这个情况，就会延生出分表甚至分库的操作，但是这篇文章先不讨论这个分表分库，我们来讨论一下使用 pt-archiver 工具来对
某个大表进行归档处理的操作。

## 什么是 pt-archiver

pt-archiver 是 Percona-Toolkit 工具集中的一个组件，是一个对 Mysql 表数据进行归档和清理的工具，
Percona-Toolkit 是一个开源的数据库管理工具集，其包含了数据归档，表校验和查询分析等实用工具，
而 pt-archiver 全称是 ** Percona Toolkit Archiver **

### 常见用途：

1. 数据清理：删除或归档不再需要的旧数据，例如过期的日志或历史记录。
2. 性能优化：通过减少表的大小来提升查询性能。
3. 数据迁移：将数据从一个表移动到另一个表，或者导出到文件。

### 工作原理

- pt-archiver 会以小批量的方式处理数据，避免锁表或对数据库造成过大压力。
- 它支持条件过滤（比如 WHERE 子句），可以选择性地归档特定数据。
- 数据可以被归档到另一个表、文件，或者直接删除（如果指定了 --purge 选项）。

## 实践环节

我们在内网机器上安装完 pt-archiver 后，可以调用命令来进行归档

```powershell
pt-archiver
--source h=HOST,P=PORT,u=USER,p=PASSWORD,D=DB,t=TABLE,A=utf8mb4,i=idx_create_time
--dest h=HOST,P=PORT,u=USER,p=PASSWORD,D=DB,t=TABLE,A=utf8mb4
--where "create_time >= '2024-10-10 00:00:00' AND create_time <= '2024-10-31 23:59:59'"
--limit 20000
--txn-size 3000
--charset 'utf8mb4'
--bulk-delete
--bulk-insert
--purge
--progress 10000
--statistics
```

这里的参数就不逐一解释了，可以直接复制询问 ai，但是有几个参数需要着重注意，分别是

1. i ，这个参数在 --source 中，作用是指定分批查询的时候使用的索引，我们一般会对 create_time 或者某些业务时间字段进行归档筛选
如果我们不指定索引的话，pt-archiver 有时候会直接 force index primary 使用主键索引，而不是时间字段的索引，导致 db 会一直卡在
send data 阶段
2. charset ，这个参数是指定使用什么字符格式，如果不指定的话，归档操作可能会错误
3. limit 和 txn-size 这两个的作用可以详细询问 ai，这两个值的调整将会影响归档时 db 的性能

![归档完成截图](https://i.imgur.com/HAEBsjz.png)
可以看到归档完后，日志会给出每个 action 的耗时

### 归档完后的操作

我们在归档完后就会发现，源表虽然删除了数据，数据空间是减少了，但是索引空间仍然没有释放。那这里就涉及到我们面试涉及到的一个八股文了，为什么在 Mysql 中删除了表数据，但是空间仍然很大
那这里就给出 ai 的回答

> 如果使用的是 InnoDB 存储引擎（MySQL 的默认引擎），删除数据后，表空间和索引空间并不会立即释放。
InnoDB 使用 B+ 树来维护索引，删除记录时只是标记为“已删除”，空间仍然被占用，直到后续的表空间整理或优化。
如果使用的是 MyISAM 存储引擎，情况类似，索引文件（如 .MYI 文件）也不会自动收缩。

所以我们还需要对表执行优化

```sql
OPTIMIZE TABLE tb_name
```

注意！该操作会造成短暂的锁表，需要看 Mysql 的版本是否支持 online ddl 操作；执行耗时也视表大小

如果数据库引擎不支持 OPTIMIZE TABLE 操作，那么可以分别执行以下两个 sql

```sql
alter table tb_name
    ENGINE = 'InnoDB';
analyze table tb_name;
```

作用和 OPTIMIZE TABLE 一样

执行完后再检查表空间就会发现索引空间已经释放了
