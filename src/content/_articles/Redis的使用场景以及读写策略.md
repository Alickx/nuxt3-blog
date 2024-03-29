---
title: Redis的使用场景以及读写策略
slug: redis-use-scenarios-and-read-write-strategy
description: 关于Redis的各种使用场景以及各读写策略的读写步骤和实践场景
keywords: redis，使用场景，读写策略
date: 2023-10-21
---

## Redis为什么那么快

1. Redis 是一个基于内存的数据存储，内存访问至少比随机磁盘访问快 100 倍。
2. Redis 使用 IO 多路复用和单线程执行循环来提高执行效率。
3. Redis 利用多种高效的数据结构。

![Redis为什么那么快](https://songtiancloud-1300061766.cos.ap-guangzhou.myqcloud.com/img/202310211009313.webp)



## 如何使用Redis

1. 在不同服务中使用Redis来共享用户会话数据
2. 使用 Redis 缓存对象或页面，尤其是热点数据
3. 分布式锁
4. 统计文章的点赞数或阅读量
5. 对某些用户进行限流
6. 全局 ID 生成
7. 使用 Redis Hash 来实现购物车
8. 计算用户保留率，使用 Bitmap 数据结构来表示每天的用户登录情况并计算用户留存情况
9. 队列消息，使用 List 结构
10. 排行榜，使用 Zset 来进行排序

<img src="https://songtiancloud-1300061766.cos.ap-guangzhou.myqcloud.com/img/202310211013757.webp" alt="Redis的使用" style="zoom:50%;" />



## Redis的缓存策略

### 1. 旁路缓存

读策略步骤：

- 如果读取的数据命中了缓存，则直接返回数据；
- 如果读取的数据没有命中缓存，则从数据库读取数据，然后将数据写入到缓存，并且返回给用户。

写策略步骤：

- 先更新数据库中的数据，再删除缓存中的数据

实践场景：

旁路缓存多应用于读多写少的的场景，例如**实时数据更新**，**登录状态和用户身份验证**等等。



### 2. 读写穿透

读策略步骤：

- 先查询缓存中数据是否存在，如果存在则直接返回，如果不存在，则由缓存组件负责从数据库查询数据，并将结果写入到缓存组件，最后缓存组件将数据返回给应用。

写策略步骤：

当有数据更新的时候，先查询要写入的数据在缓存中是否已经存在：

- 如果缓存中数据已经存在，则更新缓存中的数据，并且由缓存组件同步更新到数据库中，然后缓存组件告知应用程序更新完成。
- 如果缓存中数据不存在，直接更新数据库，然后返回；

实践场景：

在日常开发中比较少见，因为该策略是直接将 Cache 视为一个服务节点，由 Cache 服务负责数据的读取和 db 写入，减轻应用程序的职责。



### 3. 写回策略

写回策略和读写穿透策略比较相似，但是不同于写回策略是异步将缓存的数据更新到数据库中，在实际场景中比较适用于 文章的阅读量，点赞量这类对数据安全度不高，但是需要读写效率比较高的场景。
