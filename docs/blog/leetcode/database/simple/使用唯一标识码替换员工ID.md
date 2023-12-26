---
hidden: true
recommend: false
date: 2023-12-24 16:10:00
---

# 使用唯一标识码替换员工ID

`Employees` 表：

```
+---------------+---------+
| Column Name   | Type    |
+---------------+---------+
| id            | int     |
| name          | varchar |
+---------------+---------+
在 SQL 中，id 是这张表的主键。
这张表的每一行分别代表了某公司其中一位员工的名字和 ID 。
```

 

`EmployeeUNI` 表：

```
+---------------+---------+
| Column Name   | Type    |
+---------------+---------+
| id            | int     |
| unique_id     | int     |
+---------------+---------+
在 SQL 中，(id, unique_id) 是这张表的主键。
这张表的每一行包含了该公司某位员工的 ID 和他的唯一标识码（unique ID）。
```

 

展示每位用户的 **唯一标识码（unique ID ）**；如果某位员工没有唯一标识码，使用 null 填充即可。

你可以以 **任意** 顺序返回结果表。

返回结果的格式如下例所示。

 

**示例 1：**

```
输入：
Employees 表:
+----+----------+
| id | name     |
+----+----------+
| 1  | Alice    |
| 7  | Bob      |
| 11 | Meir     |
| 90 | Winston  |
| 3  | Jonathan |
+----+----------+
EmployeeUNI 表:
+----+-----------+
| id | unique_id |
+----+-----------+
| 3  | 1         |
| 11 | 2         |
| 90 | 3         |
+----+-----------+
输出：
+-----------+----------+
| unique_id | name     |
+-----------+----------+
| null      | Alice    |
| null      | Bob      |
| 2         | Meir     |
| 3         | Winston  |
| 1         | Jonathan |
+-----------+----------+
解释：
Alice and Bob 没有唯一标识码, 因此我们使用 null 替代。
Meir 的唯一标识码是 2 。
Winston 的唯一标识码是 3 。
Jonathan 唯一标识码是 1 。
```

## 方法一：根据ID进行左连接

我们首先执行LEFT JOIN操作，将两个表的数据基于 id 列进行组合。同样，我们使用 LEFT JOIN 来确保将所有 Employees 表中的行都包含在结果中，即使在 EmployeeUNI 表中没有匹配的行。

```sql
select
    u.unique_id,
    e.name
from
    Employees e
left join
    EmployeeUNI u on e.id = u.id
```

