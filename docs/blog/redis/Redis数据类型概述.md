---
cover: /blog/redis/images/redis数据类型.png
recommend: false
tag:
 - Redis
date: 2023-12-31 00:30:00
---
# Redis数据类型概述

官网：https://redis.io/docs/data-types/

![Redis数据类型](.\images\redis数据类型.png)

> 这里说的数据类型是 value 的数据类型，key 的类型都是字符串。

## Redis 字符串（String）

string 是 Redis 最基本的类型，一个 key 对应一个 value。

string 类型是二进制安全的，意思是 Redis 的 string 可以包含任何数据，比如 jpg 图片或者序列化的对象 。

String 类型是 Redis 最基本的数据类型，一个 Redis 中字符串 value 最多可以是512M。

## Redis 列表（List）

Redis list 列表是简单的字符串列表，按照插入顺序排序。你可以添加一个元素到列表的头部（左边）或者尾部（右边）

它的底层实际是个双端链表，最多可以包含 2<sup>32</sup> - 1 个元素 （4294967295，每个列表超过40亿个元素）。

## Redis 哈希表（Hash）

Redis hash 是一个 string 类型的 field（字段） 和 value（值） 的映射表，hash 特别适合用于存储对象。

Redis 中每个 hash 可以存储 2<sup>32</sup> - 1 键值对（40多亿）。

## Redis 集合（Set）

Redis 的 set 是 string 类型的无序集合。集合成员是唯一的，这就意味着集合中不能出现重复的数据，集合对象的编码可以是 intset 或者 hashtable。

Redis 中 set 集合是通过哈希表实现的，所以添加，删除，查找的复杂度都是 O(1)。

集合中最大的成员数为 2<sup>32</sup> - 1（4294967295，每个集合可存储40多亿个成员）

## Redis 有序集合（ZSet）

Redis zset 和 set 一样也是 string 类型元素的集合，且不允许重复的成员。

不同的是每个元素都会关联一个 double 类型的分数，Redis 正是通过分数来为集合中的成员进行从小到大的排序。

zset 的成员是唯一的，但分数（score）却可以重复。

zset 集合是通过哈希表实现的，所以添加，删除，查找的复杂度都是 O(1)。 集合中最大的成员数为 2<sup>32</sup> - 1

## Redis 地理空间（GEO）

Redis GEO 主要用于存储地理位置信息，并对存储的信息进行操作，包括

- 添加地理位置的坐标。
- 获取地理位置的坐标。
- 计算两个位置之间的距离。

- 根据用户给定的经纬度坐标来获取指定范围内的地理位置集合

## Redis 基数统计（HyperLogLog）

HyperLogLog 是用来做基数统计的算法，HyperLogLog 的优点是，在输入元素的数量或者体积非常非常大时，计算基数所需的空间总是固定且是很小的。

在 Redis 里面，每个 HyperLogLog 键只需要花费 12 KB 内存，就可以计算接近 2<sup>64</sup> 个不同元素的基 数。这和计算基数时，元素越多耗费内存就越多的集合形成鲜明对比。

但是，因为 HyperLogLog 只会根据输入元素来计算基数，而不会储存输入元素本身，所以 HyperLogLog 不能像集合那样，返回输入的各个元素。

## Redis 位图（bitmap）

由0和1状态表现的二进制位的 bit 数组

![bitmap位图](.\images\bitmap位图.png)

## Redis 位域（bitfield）

通过 bitfield 命令可以一次性操作多个比特位域（指的是连续的多个比特位），它会执行一系列操作并返回一个响应数组，这个数组中的元素对应参数列表中的相应操作的执行结果。

说白了就是通过 bitfield 命令我们可以一次性对多个比特位域进行操作。

## Redis 流（Stream）

Redis Stream 是 Redis 5.0 版本新增加的数据结构。

Redis Stream 主要用于消息队列（MQ，Message Queue），Redis 本身是有一个 Redis 发布订阅（pub/sub）来实现消息队列的功能，但它有个缺点就是消息无法持久化，如果出现网络断开、Redis 宕机等，消息就会被丢弃。

简单来说发布订阅（pub/sub）可以分发消息，但无法记录历史消息。

而 Redis Stream 提供了消息的持久化和主备复制功能，可以让任何客户端访问任何时刻的数据，并且能记住每一个客户端的访问位置，还能保证消息不丢失。

