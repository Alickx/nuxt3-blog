---
title: jdk21虚拟线程体验
slug: jdk21-virtual-thread-experience
date: 2023-09-24
---

## 虚拟线程是什么？

网上已经有很多关于虚拟线程的介绍了，这里我就不复制粘贴过来，有兴趣可以去看看大佬们的介绍，我就说一下我认为的虚拟线程吧。  

首先我们在背八股文的时候都背过**进程和线程的区别**，进程是操作系统中的一个独立执行单位，而线程则是进程内的一个执行单位，进程之间是相互独立的，而同一进程的线程则可以通过共享内存空间来实现通信。  

而比较关键的一点则是 进程和线程相比，线程创建，切换和销毁的代价较低，占用的系统资源较少。  

同时我们在程序开发上就经常使用到线程这种东西，例如我们想在不阻塞主线程执行的情况下去执行其他的一些操作，例如发送消息，上传文件等等，我们就可以创建一个新线程去进行操作。  

但就算是线程，我们如果频繁的创建，销毁，它的一个性能影响依旧是很大的，这里又涉及到一些关于操作系统的知识了，总之频繁的创建和销毁线程相比于操作进程而言是一个轻量的操作，但依旧对性能有影响。  

所以在 Java 中，我们通常会创建一个线程池来进行线程的操作，也就是池化技术，通过这种技术来最大限度减少线程操作的损耗，例如 Tomcat 的连接池，Mysql 的连接池。   

我们在开发一些 IO 耗时较长的逻辑的时候，也会使用线程池来有效增加这个吞吐量。但是这里终究有个问题，就是线程池中的线程始终是有限的，它并不是 Jdk 来实现线程的操作逻辑，而是会调用系统接口来创建一个真实的线程。  

而我们看一个 Go 语言中相比于 Java 出色的一点就是 Go 拥有**协程**。

> Go语言的协程（Goroutine）是一种轻量级的线程，由Go语言的运行时系统管理。协程是Go语言并发编程的重要组成部分，它们允许你在程序中并发执行代码，而不需要显式地创建线程和管理线程的生命周期。协程是Go语言中并发的基本单元，它们相比传统的线程更加高效，因为它们可以在少量的内存上运行，而且创建和销毁协程的开销很小。
>
> Go语言的协程与传统线程的主要区别在于：
>
> 1. 轻量级：Go协程使用的内存远比传统线程少，因此可以创建成千上万个协程而不会导致系统资源耗尽。
> 2. 并发性：Go协程使得并发编程变得容易，你可以轻松创建和管理协程，而不需要担心线程同步和锁定等复杂问题。
> 3. 通信：Go协程之间可以通过通道（Channel）进行通信，这是一种用于在协程之间传递数据的机制。通道可以安全地传递数据，避免了共享内存导致的竞态条件和死锁问题。

从这段简介就知道，Go的协程它跟线程的作用是一样的，但是它却是依赖于 Go 语言本身来实现，并不是系统级别。它可以很轻易地创建成百上千万个协程来操作，并且资源消耗极低，这种在 Jdk 虚拟线程出来之前是根本实现不了的。  

这也是为什么这么多音视频，网盘和高 IO 并发等等应用程序选择使用 Go 来实现的原因，因为实现并发操作极其简单，性能又好。  

但是在 Jdk21 后，Java 拥有了虚拟线程，这意味着 Java 也能做到这些了。    



## 虚拟线程的性能

我们可以拿一个很小的 Demo 来看一下虚拟线程性能，先来看一下这个 Demo。

```java
public class VirtualThreadDemo {
  public static void main(String[] args) {
    var a = new AtomicInteger(0);
    // 创建一个固定200个线程的线程池
    try (var vs = Executors.newFixedThreadPool(200)) {
      List<Future<Integer>> futures = new ArrayList<>();
      var begin = System.currentTimeMillis();
      // 向线程池提交1000个sleep 1s的任务
      for (int i = 0; i < 1_000; i++) {
        var future = vs.submit(() -> {
          Thread.sleep(Duration.ofSeconds(1));
          return a.addAndGet(1);
        });
        futures.add(future);
      }
      // 获取这1000个任务的结果
      for (var future : futures) {
        var i = future.get();
        if (i % 100 == 0) {
          System.out.print(i + " ");
        }
      }
      // 打印总耗时
      System.out.println("Exec finished.");
      System.out.printf("Exec time: %dms.%n", System.currentTimeMillis() - begin);
    } catch (ExecutionException | InterruptedException e) {
      e.printStackTrace();
    }
  }
}
```

这一段代码是从网上中找来的，其内容其实就是创建一个固定核心线程数为 200 的线程池，然后多线程去操作原子类自增，同时逻辑里面还添加了 `Thread.sleep(Duration.ofSeconds(1));` 休眠一秒，来模拟耗时操作。

我先执行看看其执行速度是多少。

![固定线程池执行速度](https://alickx-1300061766.cos.ap-guangzhou.myqcloud.com/img/image-20230924153252561.webp)

一共执行了5秒，也就是1000个任务，每个任务都要休眠1秒，而线程池为200核心线程数，200 * 5 = 1000，这也是符合计算结果。  

那我们来看看虚拟线程的执行结果，将 `var vs = Executors.newFixedThreadPool(200)` 换成 `var vs = Executors.newVirtualThreadPerTaskExecutor()` ，不需要添加任何的参数。

![虚拟线程执行结果](https://alickx-1300061766.cos.ap-guangzhou.myqcloud.com/img/image-20230924153616169.webp)

执行时间只需要 1s ！

也就是相当于有 1000 个线程在同时执行，并且其实这么多虚拟线程**只需要一个平台线程**来进行调度即可。  



## Java1.8该退役了

尽管 Jdk21 已经是正式版本了，不止拥有虚拟线程，还拥有比较先进的垃圾收集器，但是我们在企业中依旧大范围使用的是 1.8 版本，甚至有一句话，你强任你强 清风拂山岗，他发由他发，我用Java8。  

但是现在情况可能要发生一点改变了，Jdk21 那么多先进的改动，以及 SpringBoot3 最低要求的 Jdk17，我相信随着时间推移，新项目会一步步用上最新版本的 Jdk。  

放着这么好用的东西缺用不了，实在是可惜。