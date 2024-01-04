---
cover: /blog/redis/images/常用key.png
recommend: false
tag:
 - Redis
date: 2023-12-31 10:30:00
---
# Redis之key操作命令

## Redis 命令查询网址

- 官网英文：https://redis.io/commands

- 中文：http://www.redis.cn/commands.html




## Redis key操作命令

![常用key](.\images\常用key.png)

案例：

查看当前库所有的key

```shell
keys *
```

判断某个key是否存在

```shell
exists key
```

查看你的key是什么类型

```shell
type key
```

删除指定的key数据

```shell
del key
```

非阻塞删除，仅仅将 keys 从 keyspace 元数据中删除，真正的删除会在后续异步中

```shell
unlink key
```

查看还有多少秒过期，-1表示永不过期，-2表示已过期

```shell
ttl key
```

为给定的key设置过期时间

```shell
expire key 秒钟
```

将当前数据库的 key 移动到给定的数据库（0~15）当中

```shell
move key dbindex
```

切换数据库（0~15），默认为0

```shell
select dbindex
```

查看当前数据库 key 的数量

```shell
dbsize
```

清空当前库

```shell
flushdb
```

清空全部库

```shell
flushall
```
