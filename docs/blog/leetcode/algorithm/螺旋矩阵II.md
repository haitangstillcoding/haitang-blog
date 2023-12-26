---
recommend: false
tag:
 - 二分查找
date: 2023-12-18 21:00:00
---

# 螺旋矩阵 II

给你一个正整数 `n` ，生成一个包含 `1` 到 `n2` 所有元素，且元素按顺时针顺序螺旋排列的 `n x n` 正方形矩阵 `matrix` 。

 

**示例 1：**

![螺旋矩阵II](./images/螺旋矩阵II.jpg)

```
输入：n = 3
输出：[[1,2,3],[8,9,4],[7,6,5]]
```

**示例 2：**

```
输入：n = 1
输出：[[1]]
```

 

**提示：**

- `1 <= n <= 20`

## 方法一：模拟

求解本题依然是要坚持循环不变量原则。

模拟顺时针画矩阵的过程:

- 填充上行从左到右
- 填充右列从上到下
- 填充下行从右到左
- 填充左列从下到上

由外向内一圈一圈这么画下去。

```java 
        // 每一圈螺旋的起始位置(start, start)
        int start = 0;
        // 螺旋数字和循环次数
        int num = 1, loop = 0;
        // 螺旋二维数组
        int[][] arr = new int[n][n];
        int i, j;
        while (n / 2 > loop++) {
            // 螺旋上边
            for (j = start; j < n - loop; j++) {
                arr[start][j] = num++;
            }
            // 螺旋右边
            for (i = start; i < n - loop; i++) {
                arr[i][j] = num++;
            }
            // 螺旋下边
            for (; j > start; j--) {
                arr[i][j] = num++;
            }
            // 螺旋左边
            for (; i > start; i--) {
                arr[i][j] = num++;
            }
            start++;
        }
        if (n % 2 != 0) {
            arr[start][start] = num;
        }
        return arr;
```

- 时间复杂度 O(n<sup>2</sup>)，模拟遍历二维矩阵的时间。
- 空间复杂度 O(1)
