---
title: 使用CompletableFuture优化查询速度
slug: use-completablefuture-to-optimize-query-speed
description: 使用Java8的CompletableFuture优化查询速度
keywords: java8,CompletableFuture,优化
date: 2023-04-25T09:31:53Z
---

## 多线程并发优化查询速度

### 简介

​	今天组内老大反应我维护的一个后台管理系统的的月维度数据出不来，让我去看看。在查看日志且本地调试后发现，原因是在使用简易规则引擎的那部分耗时太长，整个查询流程足足耗时30多s，导致前端超时。这里先说明一下这个简易规则引擎是什么回事。

​	首先我们在MySQL数据库中存储了业务的基础数据，然后针对运营处提出的业务数据需求，通过SQL来进行获取。但是有一部分数据并不能直接通过SQL得出，而是要在SQL获取到的数据基础上，再进行筛选。

### 过程

​	在原本编写的代码中是这样子直接进行for循环遍历得出的

```java
 for (Data data : Datas) {
     // ....规则引擎计算
 }
```

​	但是由于这个计算耗时实在是太长了，而且暂时又动不了这个引擎，只能采用另一种方式。

​	这种循环遍历计算的话，我们可以采用多线程并发的方式来进行性能优化。

```java
    // 将guildDataList分成多个子集
    List<List<GuildFamilyDataDTO>> guildDataSubLists = ListUtil.splitAvg(guildDataList, THREAD_COUNT);

    // 使用 CompletableFuture 并行处理
    List<CompletableFuture<Void>> futures = guildDataSubLists.stream()
            .map(subList -> CompletableFuture.runAsync(() -> processSublist(guildTimeDimensionDTO, guildRoomRuleMap, subList, dateType, userIds), threadPoolExecutor))
            .collect(Collectors.toList());

    // 等待所有子任务完成
    futures.forEach(CompletableFuture::join);
```

通过将需要计算的集合，分成多个子集，然后使用`CompletableFuture`来进行并行调用，这样子就可以通过并行查询来提高查询速度了。

​	并且这里CompletableFuture如果不指定线程池的话，则会使用默认的`ForkJoinPool.commonPool()` 线程池来执行任务，这里是一个小坑，如果有其他任务使用到这个线程池的话，那么这里查询也会受到影响。所以最好自己根据这个查询创建一个固定的全局线程池来使用。



### 结果

​	通过优化后，查询耗时从30多s降低到20s，但是这依旧只是治标不治本，想要查询速度更快的话还需要从规则引擎计算逻辑那里入手。
