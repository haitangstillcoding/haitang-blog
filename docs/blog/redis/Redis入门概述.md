---
cover: /blog/redis/images/redis版本演进.png
recommend: false
tag:
 - Redis
date: 2023-12-29 16:30:00
top: 4
---
# Redis入门概述

## 1 是什么

英文释义：<font color=red>RE</font>mote <font color=red>DI</font>ctionary <font color=red>S</font>erver（远程字典服务器）

官网解释：

![redis官网简介](.\images\redis官网简介.png)

Redis 是一种开源（BSD 许可）的内存数据结构存储，用作数据库、缓存、消息代理和流式处理引擎。Redis 提供数据结构，例如字符串、哈希、列表、集、带有范围查询的排序集、位图、超日志、地理空间索引和流。Redis 具有内置复制、Lua 脚本、LRU 逐出、事务和不同级别的磁盘持久性，并通过 Redis Sentinel 和 Redis 集群的自动分区提供高可用性。

github解释：

![redis官网简介](.\images\github简介.png)

Redis 是保留在磁盘上的内存数据库。数据模型是键值，但支持许多不同类型的值：字符串、列表、集、排序集、哈希、流、HyperLogLogs、位图。

作者github：https://github.com/antirez

作者博客：http://www.antirez.com/

## 2 能干嘛

为什么要引入 Redis 这门技术。

### 主流功能与应用

1. 分布式缓存，帮 MySQL 减负

   主流的系统都遵循28原则，80%查询和20%写入。MySQL 主要是做持久化存储，保证一致性，存储在硬盘。为了分担 MySQL 的查询压力，读写分离，引入了 Redis 。

   ![redis和mysql](.\images\redis和mysql.png)

   Redis 与 MySQL 的关系：

   - Redis 是 key-value 数据库（NoSQL一种），MySQL 是关系数据库
   - Redis 数据操作主要在内存，而 MySQL 主要存储在磁盘
   - Redis 在某一些场景使用中要明显优于 MySQL ，比如计数器、排行榜等方面
   - Redis 通常用于一些特定场景，需要与 MySQL 一起配合使用
   - 两者并不是相互替换和竞争关系，而是共用和配合使用

2. 内存存储和持久化（RDB + AOF）

   Redis 支持异步将内存中的数据持久化到硬盘，同时不影响继续服务。

3. 高可用架构选配

   单机、主从、哨兵、集群

4. 缓存穿透、击穿、雪崩

5. 分布式锁

6. 队列

   Reids 提供 list 和 set 操作，这使得 Redis 能作为一个很好的消息队列平台来使用。

   我们常通过 Reids 的队列功能做购买限制。比如到节假日或者推广期间，进行一些活动，对用户购买行为进行限制，限制今天只能购买几次商品或者一段时间内只能购买一次。也比较适合适用。

7. 排行榜、点赞

   在互联网应用中，有各种各样的排行榜，如电商网站的月度销量排行榜、社交APP的礼物排行榜、小程序的投票排行榜等等。Redis 提供的 zset 数据类型能够快速实现这些复杂的排行榜。

   比如小说网站对小说进行排名，根据排名，将排名靠前的小说推荐给用户。

### 总体功能概述

![redis总体功能](.\images\redis总体功能.png)

### 优势

- 性能极高，Redis 能读的速度是110000次/秒，写的速度是81000次/秒
- Redis 数据类型丰富，不仅仅支持简单的 key-value 类型的数据，同时还提供 list，set，Zset，hash 等数据结构的存储
- Redis支持数据的持久化，可以将内存中的数据保持在磁盘中，重启的时候可以再次加载进行使用
- Redis支持数据的备份，即 master-slave 模式的数据备份

### 小总结

![redis小总结](.\images\redis小总结.png)

## 3 去哪下

### 官网地址

英文：https://redis.io

中文：

- http://www.redis.cn
- https://www.redis.com.cn/documentation.html

### 下载安装

Redis 下载地址：https://www.redis.io/download

### 其他文档资料

Redis 源码地址：https://github.com/redis/redis

Redis 在线测试：https://try.redis.io

Redis 命令参考：http://doc.redisfans.com



## 4 Redis 版本迭代推演介绍

里程碑的重要版本：

![redis版本演进](.\images\redis版本演进.png)

版本命名规则：

版本号第二位如果是奇数，则为非稳定版本 如2.7、2.9、3.1；版本号第二位如果是偶数，则为稳定版本 如2.6、2.8、3.0、3.2，当前奇数版本就是下一个稳定版本的开发版本，如2.9版本是3.0版本的开发版本。

历史发布版本的源码：https://download.redis.io/releases/

## 5 Redis7 新特性概述

新特性概述：https://github.com/redis/redis/releases

部分新特性总览：

2022 年 4 月正式发布的 Redis 7.0 是目前 Redis 历史版本中变化最大的版本。首先，它有超过 50 个以上新增命令；其次，它有大量核心特性的新增和改进。

![redis7核心特性概览](.\images\redis7核心特性概览.png)

### Redis Functions

![RedisFunctions](.\images\RedisFunctions.png)

### Client-eviction

![Client-eviction](.\images\Client-eviction.png)

### Multi-part AOF

![Multi-part_AOF](.\images\Multi-part_AOF.png)

### ACL v2

![ACL_v2](.\images\ACL_v2.png)

### 新增命令

![新增命令](.\images\新增命令.png)

### listpack

listpack 是用来替代 ziplist 的新数据结构，在 7.0 版本已经没有 ziplist 的配置了（6.0版本仅部分数据类型作为过渡阶段在使用）



### 总体概述

大体和之前的redis版本保持一致和稳定，主要是自身底层性能和资源利用率上的优化和提高。

| 多AOF文件支持                     | 7.0 版本中一个比较大的变化就是 aof 文件由一个变成了多个，主要分为两种类型：基本文件(base files)、增量文件(incr files)，请注意这些文件名称是复数形式说明每一类文件不仅仅只有一个。在此之外还引入了一个清单文件(manifest) 用于跟踪文件以及文件的创建和应用顺序（恢复） |
| --------------------------------- | ------------------------------------------------------------ |
| config命令增强                    | 对于Config Set 和Get命令，支持在一次调用过程中传递多个配置参数。例如，现在我们可以在执行一次Config Set命令中更改多个参数： config set maxmemory 10000001 maxmemory-clients 50% port 6399 |
| 限制客户端内存使用Client-eviction | 一旦 Redis 连接较多，再加上每个连接的内存占用都比较大的时候， Redis总连接内存占用可能会达到maxmemory的上限，可以增加允许限制所有客户端的总内存使用量配置项，redis.config 中对应的配置项// 两种配置形式：指定内存大小、基于 maxmemory 的百分比。maxmemory-clients 1gmaxmemory-clients 10% |
| listpack紧凑列表调整              | listpack 是用来替代 ziplist 的新数据结构，在 7.0 版本已经没有 ziplist 的配置了（6.0版本仅部分数据类型作为过渡阶段在使用）listpack 已经替换了 ziplist 类似 hash-max-ziplist-entries 的配置 |
| 访问安全性增强ACLV2               | 在redis.conf配置文件中，protected-mode默认为yes，只有当你希望你的客户端在没有授权的情况下可以连接到Redis server的时候可以将protected-mode设置为no |
| Redis Functions                   | Redis函数，一种新的通过服务端脚本扩展Redis的方式，函数与数据本身一起存储。简言之，redis自己要去抢夺Lua脚本的饭碗 |
| RDB保存时间调整                   | 将持久化文件RDB的保存规则发生了改变，尤其是时间记录频度变化  |
| 命令新增和变动                    | Zset (有序集合)增加 ZMPOP、BZMPOP、ZINTERCARD 等命令Set (集合)增加 SINTERCARD 命令LIST (列表)增加 LMPOP、BLMPOP ，从提供的键名列表中的第一个非空列表键中弹出一个或多个元素。 |
| 性能资源利用率、安全、等改进      | 自身底层部分优化改动，Redis核心在许多方面进行了重构和改进主动碎片整理V2：增强版主动碎片整理，配合Jemalloc版本更新，更快更智能，延时更低HyperLogLog改进：在Redis5.0中，HyperLogLog算法得到改进，优化了计数统计时的内存使用效率，7更加优秀更好的内存统计报告如果不为了API向后兼容，我们将不再使用slave一词......(政治正确) |

