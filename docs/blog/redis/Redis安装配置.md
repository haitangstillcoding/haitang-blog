---
cover: /blog/redis/images/6379端口来源.png
recommend: false
tag:
 - Redis
date: 2023-12-30 23:30:00
---
# Redis安装配置

## Linux 环境安装 Redis 

### 什么是gcc

gcc是linux下的一个编译程序，是C程序的编译工具。

GCC(GNU Compiler Collection) 是 GNU(GNU's Not Unix) 计划提供的编译器家族，它能够支持 C, C++, Objective-C, Fortran, Java 和 Ada 等等程序设计语言前端，同时能够运行在 x86, x86-64, IA-64, PowerPC, SPARC和Alpha 等等几乎目前所有的硬件平台上。鉴于这些特征，以及 GCC 编译代码的高效性，使得 GCC 成为绝大多数自由软件开发编译的首选工具。虽然对于程序员们来说，编译器只是一个工具，除了开发和维护人员，很少有人关注编译器的发展，但是 GCC 的影响力是如此之大，它的性能提升甚至有望改善所有的自由软件的运行效率，同时它的内部结构的变化也体现出现代编译器发展的新特征。

### 安装gcc

安装 Redis 之前需要具备 c++ 库环境

```shell
yum install -y gcc-c++
```

### 查看gcc版本

```shell
gcc -v
```

## Redis7 安装步骤

1. 下载获得 redis-7.0.0.tar.gz 后将它放入我们的 Linux 目录 /opt

   ```shell
   wget https://download.redis.io/releases/redis-7.0.0.tar.gz
   ```

2. /opt 目录下解压 redis

   ```shell
   tar -zxvf redis-7.0.0.tar.gz
   ```

3. 进入目录

   ```shell
   cd redis-7.0.0
   ```

4. 在 redis-7.0.0 目录下执行 make 命令

   ```shell
   make && make install
   ```

5. 查看默认安装目录：usr/local/bin

   redis-benchmark：性能测试工具，服务启动后运行该命令，看看自己本子性能如何

   redis-check-aof：修复有问题的 AOF 文件，rdb 和 aof 后面讲

   redis-check-dump：修复有问题的 dump.rdb 文件

   redis-cli：客户端，操作入口

   redis-sentinel：redis 集群使用

   redis-server：Redis 服务器启动命令

6. 将默认的 redis.conf 拷贝到自己定义好的一个路径下，比如 /myredis

   ```shell
   # 新建一个文件夹
   mkdir /myredis
   # 拷贝 redis 配置文件到 /myredis 文件夹下
   cp /opt/redis-7.0.0/redis.conf /myredis/redis.conf
   ```

7. 修改 /myredis 目录下 redis.conf 配置文件做初始化设置

   redis.conf配置文件，改完后确保生效，记得重启。

   ```shell
   # 1.修改 daemonize no 改为 daemonize yes
   daemonize yes
   # 2. 默认protected-mode yes 改为 protected-mode no
   protected-mode no
   # 3. 默认bind 127.0.0.1 -::1 改为 直接注释掉(默认bind 127.0.0.1只能本机访问)或改成本机IP地址，否则影响远程IP连接
   # bind 127.0.0.1 -::1
   # 4. 添加redis密码 改为 requirepass 你自己设置的密码
   requirepass 你自己设置的密码
   ```

8. 启动服务

   ```shell
   redis-server /myredis/redis.conf
   ```

   查看6379端口占用情况

   ```shell
   ps -ef|grep redis|grep -v grep
   ```

9. 连接服务

   ```shell
   # redis 客户端连接 reids 服务
   # -a 是 authentication 身份验证的意思, -p 6379 默认端口可省略
   redis-cli -a 密码 -p 6379
   
   # 测试 redis 连接
   ping
   ```

   > Warning: Using a password with '-a' or '-u' option on the command line interface may not be safe.
   >
   > 我看着不爽，怎么办？
   >
   > warning 这串输出并不是普通输出，shell的标准输出包含两种：
   >
   > 1（标准输出）
   >
   > 2（标准错误）我们的命令，即包含1也包含2，2即是我们想要去除的提示。
   >
   > 解决办法将标准错误去除即可，追加2>/dev/null，将标准错误丢弃即可，就没有烦人的警告了。

10. 大家知道Redisi端口为啥是6379么？

    ![6379端口来源](.\images\6379端口来源.png)

    Redis的默认端口是6379，是由手机键盘字母MERZ的位置决定的。MERZ在Antirez的朋友圈语言中是"愚蠢和傻B"的代名词，它源于意大利广告女郎Alessia Merz在电视节目上说了一堆愚蠢的话，redis之父对她有"特殊"印象，就给她弄成端口号了。

11. 永远的 helloworld

    进入 redis 客户端输入命令

    ```shell
    set k1 helloworld
    get k1
    ```

12. 关闭

    ```shell
    # 在客户端里面关闭
    shutdown
    quit
    
    # 单实例关闭
    redis-cli -a 密码 shutdown
    
    # 多实例，指定端口关闭
    redis-cli -p 端口号 shutdown
    
    # 查看端口占用
    lsof -i:端口号
    ```

## Redis7 卸载步骤

1. 停止 redis-server 服务

   ```shell
   redis-cli -a 密码 shutdown
   ```

2. 删除/usr/local/Iib目录下与redis相关的文件

   ```shell
   # 查看redis相关文件
   ls -l /usr/local/bin/redis-*
   # 删除redis相关文件
   rm -rf /usr/local/bin/redis-*
   ```
