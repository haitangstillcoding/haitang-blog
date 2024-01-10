---
cover: /blog/database/redis/images/常用key.png
recommend: false
tag:
 - Redis
date: 2023-12-31 11:30:00
top: 1
sticky: 1
---
# Redis数据类型之string

1. 命令不区分大小写，而 key 是区分大小写的

2. ```shell
   # 帮助命令
   help @数据类型
   ```

## string类型官网地址

https://redis.io/docs/data-types/strings/

## 常用命令

![string类型常用命令](.\images\string类型常用命令.png)

> 特点：单值单value
>

## 案例

### 最常用

```shell
set key value [NX|XX] [GET] [EX seconds|PX milliseconds|EXAT unix-time-seconds|PXAT unix-time-milliseconds|KEEPTTL]
```

![set_key_value](.\images\set_key_value.png)

> 如何获得设置指定的 Key 过期的 Unix 时间，单位为秒

```java
System.out.println(Long.toString(System.currentTimeMillis*()/1000L));
```

### 同时设置/获取多个键值

