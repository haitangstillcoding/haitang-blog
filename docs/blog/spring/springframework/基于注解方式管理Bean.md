---
cover: /blog/spring/springframework/images/Component注解.png
recommend: false
tag:
 - SpringFramework
 - IoC
 - DI
date: 2023-12-6 20:00:00
top: 1
---
# 基于注解方式管理Bean

## 1 Bean注解标记和扫描(loC)

### 注解理解

和 XML 配置文件一样，注解本身并不能执行，注解本身仅仅只是做一个标记，具体的功能是框架检测到注解标记的位置，然后针对这个位置按照注解标记的功能来执行具体操作。

本质上：所有一切的操作都是 Java 代码来完成的，XML 和注解只是告诉框架中的 Java 代码如何执行。

### 扫描理解

Spring 为了知道程序员在哪些地方标记了什么注解，就需要通过扫描的方式，来进行检测。然后根据注解进行后续操作。

### 准备Spring项目和组件

- 新建项目spring-ioc-annotation-03

- 准备pom.xml文件

  ```xml
  <dependencies>
      <!--spring context依赖-->
      <!--当你引入Spring Context依赖之后，表示将Spring的基础依赖引入了-->
      <dependency>
          <groupId>org.springframework</groupId>
          <artifactId>spring-context</artifactId>
          <version>6.0.6</version>
      </dependency>
  
      <!--junit5测试-->
      <dependency>
          <groupId>org.junit.jupiter</groupId>
          <artifactId>junit-jupiter-api</artifactId>
          <version>5.3.1</version>
      </dependency>
      <!--jdk注解-->
  	<dependency>
      	<groupId>javax.annotation</groupId>
      	<artifactId>javax.annotation-api</artifactId>
      	<version>1.3.2</version>
      	<scope>compile</scope>
  	</dependency>
  </dependencies>
  ```

- 准备组件类

  - 普通组件

    ```java
    public class CommonComponent {
    }
    ```

  - Controller组件

    ```java
    public class XxxController {
    }
    ```

  - Service组件

    ```java
    public class XxxService {
    }
    ```

  - Dao组件

    ```java
    public class XxxDao {
    }
    ```

### 组件添加标记注解

- 组件标记注解和区别

  Spring 提供了以下多个注解，这些注解可以直接标注在 Java 类上，将它们定义成 Spring Bean。

  | 注解        | 说明                                                         |
  | ----------- | ------------------------------------------------------------ |
  | @Component  | 该注解用于描述 Spring 中的 Bean，它是一个泛化的概念，仅仅表示容器中的一个组件（Bean），并且可以作用在应用的任何层次，例如 Service 层、Dao 层等。 使用时只需将该注解标注在相应类上即可。 |
  | @Repository | 该注解用于将数据访问层（Dao 层）的类标识为 Spring 中的 Bean，其功能与 @Component 相同。 |
  | @Service    | 该注解通常作用在业务层（Service 层），用于将业务层的类标识为 Spring 中的 Bean，其功能与 @Component 相同。 |
  | @Controller | 该注解通常作用在控制层（如SpringMVC 的 Controller），用于将控制层的类标识为 Spring 中的 Bean，其功能与 @Component 相同。 |

  ![Component注解](./images/Component注解.png)

  通过查看源码我们得知，@Controller、@Service、@Repository这三个注解只是在@Component注解的基础上起了三个新的名字。

  对于Spring使用IOC容器管理这些组件来说没有区别，也就是语法层面没有区别。所以@Controller、@Service、@Repository这三个注解只是给开发人员看的，让我们能够便于分辨组件的作用。

  > 注意：虽然它们本质上一样，但是为了代码的可读性、程序结构严谨！我们肯定不能随便胡乱标记。

- 使用注解标记

  - 普通组件

    ```java
    @Component
    public class CommonComponent {
    }
    ```

  - Controller组件

    ```java
    @Controller
    public class XxxController {
    }
    ```

  - Service组件

    ```java
    @Service
    public class XxxService {
    }
    ```

  - Dao组件

    ```java
    @Repository
    public class XxxDao {
    }
    ```

### 配置文件确定扫描范围

情况1：基本扫描配置

```xml
<!-- 情况1：配置自动扫描的包 -->
<!-- 1.包要精准,提高性能!
     2.会扫描指定的包和子包内容
     3.多个包可以使用,分割 例如: com.haitang.controller,com.haitang.service等
-->
<context:component-scan base-package="com.haitang.component"/>
```

情况2：指定排除组件

```xml
<!-- 情况2：指定不扫描的组件 -->
<context:component-scan base-package="com.haitang.component">
    <!-- context:exclude-filter标签：指定排除规则 -->
    <!-- type属性：指定根据什么来进行排除，annotation取值表示根据注解来排除 -->
    <!-- expression属性：指定排除规则的表达式，对于注解来说指定全类名即可 -->
    <context:exclude-filter type="annotation" expression="org.springframework.stereotype.Controller"/>
</context:component-scan>
```

情况3：指定扫描组件

```xml
<!-- 情况3：仅扫描指定的组件 -->
<!-- 仅扫描 = 关闭默认规则 + 追加规则 -->
<!-- use-default-filters属性：取值false表示关闭默认扫描规则 -->
<context:component-scan base-package="com.haitang.component" use-default-filters="false">
    <!-- context:include-filter标签：指定在原有扫描规则的基础上追加的规则 -->
    <context:include-filter type="annotation" expression="org.springframework.stereotype.Controller"/>
</context:component-scan>
```

### 组件BeanName问题

在我们使用 XML 方式管理 bean 的时候，每个 bean 都有一个唯一标识（id 属性的值），便于在其他地方引用。现在使用注解后，每个组件仍然应该有一个唯一标识。

默认情况：

类名首字母小写就是 bean 的 id。例如：SoldierController 类对应的 bean 的 id 就是 soldierController。

使用value属性指定：

```Java
@Controller(value = "tianDog")
public class SoldierController {
}
```

当注解中只设置一个属性时，value属性的属性名可以省略：

```Java
@Service("smallDog")
public class SoldierService {
}
```

### 总结

1. 注解方式IoC只是标记哪些类要被Spring管理
2. 最终，我们还需要XML方式或者后面讲解Java配置类方式指定注解生效的包
3. **现阶段配置方式为 注解 （标记）+ XML（扫描）**

## 2 组件(Bean)作用域和周期方法注解

### 组件周期方法配置

1. 周期方法概念

    我们可以在组件类中定义方法，然后当IoC容器实例化和销毁组件对象的时候进行调用！这两个方法我们成为生命周期方法！

    类似于Servlet的init/destroy方法,我们可以在周期方法完成初始化和释放资源等工作。
2. 周期方法声明

```Java
@Component
public class JavaBean {
    
    //注解指定初始化方法
    @PostConstruct
    public void init() {
        // 初始化逻辑
    }

    //注解指定销毁方法
    @PreDestroy
    public void destroy() {
        // 释放资源逻辑
    }
}
```
### 组件作用域配置

1. Bean作用域概念

    `<bean>` 标签声明Bean，只是将Bean的信息配置给SpringIoC容器！

    在IoC容器中，这些`<bean>`标签对应的信息转成Spring内部 `BeanDefinition` 对象，`BeanDefinition` 对象内，包含定义的信息（id，class，属性等等）！

    这意味着，`BeanDefinition`与`类`概念一样，SpringIoC容器可以可以根据`BeanDefinition`对象反射创建多个Bean对象实例。

    具体创建多少个Bean的实例对象，由Bean的作用域Scope属性指定！

2. 作用域可选值

    | 取值      | 含义                                        | 创建对象的时机   | 默认值 |
    | --------- | ------------------------------------------- | ---------------- | ------ |
    | singleton | 在 IOC 容器中，这个 bean 的对象始终为单实例 | IOC 容器初始化时 | 是     |
    | prototype | 这个 bean 在 IOC 容器中有多个实例           | 获取 bean 时     | 否     |

    如果是在WebApplicationContext环境下还会有另外两个作用域（但不常用）：

    | 取值    | 含义                 | 创建对象的时机 | 默认值 |
    | ------- | -------------------- | -------------- | ------ |
    | request | 请求范围内有效的实例 | 每次请求       | 否     |
    | session | 会话范围内有效的实例 | 每次会话       | 否     |

3. 作用域配置

    ```java
    //@Scope(scopeName = ConfigurableBeanFactory.SCOPE_SINGLETON) //单例
    @Scope(scopeName = ConfigurableBeanFactory.SCOPE_PROTOTYPE) //原型
    @Component
    public class JavaBean {
    
        //注解指定初始化方法
        @PostConstruct
        public void init() {
            // 初始化逻辑
        }
    
        //注解指定销毁方法
        @PreDestroy
        public void destroy() {
            // 释放资源逻辑
        }
    }
    ```

## 3 Bean属性赋值：引用类型自动装配(DI)



## 4 Bean属性赋值：基本类型属性赋值(DI)



## 5 基于注解+XML方式整合三层架构组件