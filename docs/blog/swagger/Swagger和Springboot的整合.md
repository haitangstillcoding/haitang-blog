---
cover: /blog/swagger/images/swagger-ui.png
recommend: false
tag:
 - Swagger
date: 2024-01-04 21:50:00
top: 1
---
# Swagger和Springboot的整合

## 整合出现问题的原因

> SpringBoot 处理映射匹配的默认策略发生变化

请求路径与 Spring MVC 处理映射匹配的默认策略已从 `AntPathMatcher` 更改为 `PathPatternParser`。

- Springboot 2.6.0之前

  ```java
  public static class Pathmatch {
  	private MatchingStrategy matchingStrategy = MatchingStrategy.ANT_PATH_MATCHER;
  }
  ```

- Springboot 2.6.0之后

  ```java
  public static class Pathmatch {
      private MatchingStrategy matchingStrategy = MatchingStrategy.PATH_PATTERN_PARSER;
  }
  ```

  如果升级Springboot 到2.6.0之后，可以通过设置 `spring.mvc.pathmatch.matching-strategy` 为 `ant-path-matcher` 来兼容Swagger2。

> Swagger版本升级

| 版本      | swagger-ui访问地址                          |
| --------- | ------------------------------------------- |
| 3.0.0之前 | http://127.0.0.1:8080/swagger-ui.html       |
| 3.0.0之后 | http://127.0.0.1:8080/swagger-ui/index.html |

## 推荐依赖

### Swagger版本

> SpringBoot 2.5.15 + Swagger 2.9.2

```xml
<parent>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-starter-parent</artifactId>
    <version>2.5.15</version>
    <relativePath/>
</parent>
<dependency>
    <groupId>io.springfox</groupId>
    <artifactId>springfox-swagger2</artifactId>
    <version>2.9.2</version>
</dependency>
<dependency>
    <groupId>io.springfox</groupId>
    <artifactId>springfox-swagger-ui</artifactId>
    <version>2.9.2</version>
</dependency>
```

需要在启动类上加 @EnableSwagger2 注解，访问地址：http://127.0.0.1:8080/swagger-ui.html

> SpringBoot 2.5.15 + Swagger 3.0.0

```xml
<parent>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-starter-parent</artifactId>
    <version>2.5.15</version>
    <relativePath/>
</parent>
<dependency>
	<groupId>io.springfox</groupId>
	<artifactId>springfox-boot-starter</artifactId>
	<version>3.0.0</version>
</dependency>
```

需要在启动类上加 @EnableSwagger2 注解，访问地址：http://127.0.0.1:8080/swagger-ui/index.html

> SpringBoot 2.7.18 + Swagger 3.0.0

```xml
<parent>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-starter-parent</artifactId>
    <version>2.7.18</version>
    <relativePath/>
</parent>
<dependency>
	<groupId>io.springfox</groupId>
	<artifactId>springfox-boot-starter</artifactId>
	<version>3.0.0</version>
</dependency>
```

application.yml 中添加如下配置

```yaml
spring:
  mvc:
    path match:
      matching-strategy: ant_path_matcher
```

或 applicaiton.properties 中添加如下配置

```properties
spring.mvc.pathmatch.matching-strategy=ant-path-matcher
```

需要在启动类上加 @EnableSwagger2 注解，访问地址：http://127.0.0.1:8080/swagger-ui/index.html

### Knife4j版本

| 版本      | 说明                                                         | SpringBoot                                                   | 配置注解                | 增强功能                                |
| --------- | ------------------------------------------------------------ | ------------------------------------------------------------ | ----------------------- | --------------------------------------- |
| 1.9.6     | 蓝色皮肤风格，增加更多后端模块                               |                                                              | `@EnableSwagger2`       | 不支持                                  |
| 2.0~2.0.5 | Ui重写，蓝色背景变成黑色，底层依赖的springfox框架版本是2.9.2 |                                                              | `@EnableSwagger2`       | 开启方式`@EnableKnife4j`                |
| 2.0.6~    | 底层springfox框架版本升级知2.10.5,OpenAPI规范是v2            | 大于等于2.2.x (2.6.0之后需要需要设置`spring.mvc.pathmatch.matching-strategy =ant-path-matcher`) | `@EnableSwagger2WebMvc` | 开启方式`knife4j.enable=true`默认不开启 |
| 3.0~      | 底层依赖springfox框架版本升级至3.0.3,OpenAPI规范是v3         | 大于等于2.2.x(2.6.0之后需要需要设置`spring.mvc.pathmatch.matching-strategy =ant-path-matcher`) | 写不写都可以            | 开启方式`knife4j.enable=true`默认不开启 |

> SpringBoot 2.7.18 + Knife4j 3.0.3

```xml
<parent>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-starter-parent</artifactId>
    <version>2.7.18</version>
    <relativePath/>
</parent>
<dependency>
	<groupId>com.github.xiaoymin</groupId>
	<artifactId>knife4j-spring-boot-starter</artifactId>
	<version>3.0.3</version>
</dependency>
```

application.yml 中添加如下配置

```yaml
spring:
  mvc:
    path match:
      matching-strategy: ant_path_matcher
```

或 applicaiton.properties 中添加如下配置

```properties
spring.mvc.pathmatch.matching-strategy=ant-path-matcher
```

访问地址：http://127.0.0.1:8080/doc.html。

## Swagger配置

本次测试依赖选用的是：SpringBoot 2.7.18 + Swagger 3.0.0

### 创建配置类

Swagger 的实例 Bean 是 Docket，所以通过配置 Docket 实例来配置 Swaggger。

接下来，我们新建一个 SwaggerConfig。

```java
@Configuration
// 启用Swagger2
@EnableSwagger2
public class SwaggerConfig {
    // 构建并配置 Docket 对象
    @Bean
    public Docket docket() {
        return new Docket(DocumentationType.SWAGGER_2);
    }
}
```

至此，我们其实已经能将 Swagger 启动起来了。启动 SpringBoot 项目，浏览器输入 http://127.0.0.1:8080/swagger-ui/index.html，就可以看到它的界面。

![swagger-ui](.\images\swagger-ui.png)

但里面的东西显然不是我们想要的，我们需要根据实际情况进行配置，比如接口文档名称，作者信息等。那我们该怎么配置 Docket 对象呢？

#### 1 Docket 源码分析

打开 Docket 的源码，我们第一眼就能看见，默认的分组 DEFAULT_GROUP_NAME 是 default，这就和 UI 界面的右上角的分组信息对应上了。

![Docket源码](.\images\Docket源码.png)

在 Docket 的源码中提供了很多可以配置的属性。其中，提供了相应的链式编程方法（方法与属性名同名，返回值是 this()）。

![链式编程方法](.\images\链式编程方法.png)

#### 2 DocumentationType 文档类型

可以看到 Docket 的构造函数需要一个 DocumentationType 作为参数，我们点进它的源码看看：

![DocumentationType](.\images\DocumentationType.png)

可以看到，它提供了三个构造好的 DocumentationType 常量，设置了使用 Swagger 哪个版本。我们现在一般使用的是 Swagger2，所以在构造 Docket 对象时传入 DocumentationType.SWAGGER_2

```java
@Configuration
@EnableSwagger2
public class SwaggerConfig {
    @Bean
    public Docket docket() {
        return new Docket(DocumentationType.SWAGGER_2);
    }
}
```

#### 3 ApiInfo 基本信息

ApiInfo 见名知意，提供了一些基本信息的配置，这些配置信息可以显示 UI 界面上。同样的，点进它的源码看看。

![ApiInfo](.\images\ApiInfo.png)

可以看到，它提供了 8 个可以配置属性，根据名字也能猜出其中的意思。

- version：API 版本
- title：文档标题
- description：文档描述
- termsOfServiceUrl：团队链接
- license：许可
- licenseUrl：许可链接
- contact：联系人信息
- vendorExtensions：扩展信息

这里注意，在 ApiInfo 中还有一个默认配置 DEFAULT，它看起来是不是很熟悉？没错，它就是我们在不做任何配置下启动 Swagger 显示的基本信息。

![DEFAULT](.\images\DEFAULT.png)

> 注：ApiInfo 中没有提供 setter，所以我们可以通过 ApiInfo 的构造函数去构建，也可以通过 ApiInfoBuilder 去逐项赋值。

```java
@Configuration
@EnableSwagger2
public class SwaggerConfig {
    @Bean
    public Docket docket() {
        return new Docket(DocumentationType.SWAGGER_2)
                // 配置基本信息
                .apiInfo(apiInfo());
    }

    // 构建基本配置信息
    private ApiInfo apiInfo() {
        return new ApiInfoBuilder()
                .title("文档标题")
                .description("测试的接口文档")
                .version("v2.0")
                .termsOfServiceUrl("baidu.com")
                .contact(new Contact("haitang", "http://www.haitang.icu/", "1344702052@qq.com"))
                .build();
    }
}
```

然后重启 SpringBoot 项目。

#### 4 ApiSelectorBuilder 扫描接口

构建 Docket 时通过 select() 方法配置怎么扫描接口，它会返回一个 ApiSelectorBuilder 对象

![select方法](.\images\select方法.png)

点开 ApiSelectorBuilder 源码：

![ApiSelectorBuilder](.\images\ApiSelectorBuilder.png)

可以看到，它需要配置的是 requestHandlerSelector 和 pathSelector，两个属性也同样使用了链式编程。

**1）requestHandlerSelector**

接口扫描方案。通过 ApiSelectorBuilder#apis() 方法配置（也是链式编程），在 RequestHandlerSelectors 提供了配置方案：

![RequestHandlerSelectors](.\images\RequestHandlerSelectors.png)

- any()：扫描所有，项目中的所有接口都会被扫描到
- none()：不扫描接口
- withClassAnnotation()：扫描注解
- withMethodAnnotation()：扫描方法上的注解，比如 withMethodAnnotation(GetMapping.class) 只扫描 @GetMapping 标识的 GET 请求
- withClassAnnotation()：扫描类上的注解，比如 withClassAnnotation(Controller.class) 只扫描有 @Controller 注解的类中的接口
- basePackage()：扫描指定路径，比如 basePackage(“com.test.controller”) 只扫描 controller 包

> 常用的是 basePackage()，只去扫描 controller 包。

**2）pathSelector**

接口过滤方案。

有些时候我们并不是希望所有的 Rest API 都呈现在文档上，这种情况下 Swagger2 提供给我们了两种方式配置，一种是基于 @ApiIgnore 注解，另一种是在 Docket 上增加筛选。两种方式的区别是，Docket 配置的规则，可以对多个接口器过滤作用，而 @ApiIgnore 只能作用于单个接口。

我们先来看第二种，这种方式可以通过筛选 API 的 url 来进行过滤；通过 ApiSelectorBuilder#paths() 方法配置，在 PathSelectors 提供了配置方案：

![PathSelectors](.\images\PathSelectors.png)

- any()：任何路径都满足条件
- none()：任何路径都不满足条件
- regex()：通过正则表达式控制
- ant()：通过 ant 控制

> 常用的是 any()，不做特殊处理。

在 ApiSelectorBuilder 中提供了默认配置方案 DEFAULT，即不扫描所有标有 @ApiIgnore 注解的类和方法，允许所有的请求路径：

![ApiSelector.png](.\images\ApiSelector.png)

所以，在一开始，我们才会看到 basic-error-controller 中的这些我们自己没配置过的接口

![basic-error-controller](.\images\basic-error-controller.png)

好了，现在我们来看一下在 SwaggerConfig 中该怎样配置：

```java
@Configuration
@EnableSwagger2
public class SwaggerConfig {
    @Bean
    public Docket docket() {
        return new Docket(DocumentationType.SWAGGER_2)
                .apiInfo(apiInfo())
                // 返回ApiSelectorBuilder对象
                .select()
                // 接口扫描方案
                .apis(RequestHandlerSelectors.basePackage("com.haitang.swagger.controller"))
                // 接口过滤方案
                .paths(PathSelectors.any())
                .build();
    }
    
    private ApiInfo apiInfo() {
        return new ApiInfoBuilder()
                .title("文档标题")
                .description("测试的接口文档")
                .version("v2.0")
                .termsOfServiceUrl("baidu.com")
                .contact(new Contact("haitang", "http://www.haitang.icu/", "1344702052@qq.com"))
                .build();
    }
}
```

在 controller 包新建一个 HelloController，然后重启项目后就能看到我们自己的接口了，并且 basic-error-controller 也没了。

![HelloController](.\images\HelloController.png)

#### 5 groupName 分组

groupName 就是上面说的右上角的分组选项，一般项目中不同的开发人员，可以创建不同的分组，默认的分组是 default。所以，我们可以通过配置多个 Docket 去实现分组。

```java
@Configuration
@EnableSwagger2
public class SwaggerConfig {
    @Bean
    public Docket docket1() {
        return new Docket(DocumentationType.SWAGGER_2).groupName("打工人1组");
    }
    @Bean
    public Docket docket2() {
        return new Docket(DocumentationType.SWAGGER_2).groupName("打工人2组");
    }
    @Bean
    public Docket docket3() {
        return new Docket(DocumentationType.SWAGGER_2).groupName("打工人3组");
    }
}
```

#### 6 useDefaultResponseMessages 默认状态码

点开接口文档中的接口，可以看见，在 Responses中 Swagger 默认提供了 200，401，403，404 这几个状态码。

![Responses](.\images\Responses.png)

但是，在我们实际开发中，大多数都是自定义状态码的。

所以，就可以通过 useDefaultResponseMessages(false) 关闭默认状态码。配置如下：

```java
@Configuration
@EnableSwagger2
public class SwaggerConfig {

    @Bean
    public Docket docket() {
        return new Docket(DocumentationType.SWAGGER_2)
                .apiInfo(apiInfo())
                // 关闭默认状态码
                .useDefaultResponseMessages(false)
                .select()
                .apis(RequestHandlerSelectors.basePackage("com.haitang.swagger.controller"))
                .paths(PathSelectors.any())
                .build();
    }
    
    ...略
}
```

重启项目后，可以看到，原先的 401，403，404 没有了。

![useDefaultResponseMessages](.\images\useDefaultResponseMessages.png)

#### 7 enabled 是否启动 Swagger

我们在开发、测试时候需要启动 Swagger，但是在实际项目发布上线了就要关闭它，因为一旦一些重要的接口暴露是很危险的，而且一直运行着 Swagger 也会浪费系统资源。

所以可以通过 Docket#enable(false) 来关闭 Swagger，但是如果每次都手动操作显得有些笨拙，我们可以根据当前项目的环境来决定是否开启 Swagger。

1）创建三个新的配置文件，application-dev.yaml 、application-test.yaml 和 application-pro.yaml，分别代表开发环境、测试环境和生产环境的配置。在这两个配置文件中，分别把启动端口设为 8081 、 8082 和 8080。

![开发环境、测试环境和生产环境](.\images\开发环境、测试环境和生产环境.png)

2）修改 SwaggerCofing，让它根据环境开启 Swagger

```java
@Configuration
@EnableSwagger2
public class SwaggerConfig {

    @Bean
    // 传入Environment对象，目的是获取系统环境
    public Docket docket(Environment environment) {
        // 设置要显示的swagger环境
        Profiles profiles = Profiles.of("dev", "test");
        // 判断是否处于该环境下
        boolean flag = environment.acceptsProfiles(profiles);

        return new Docket(DocumentationType.SWAGGER_2)
                .apiInfo(apiInfo())
                // 是否启用swagger
                .enable(flag)
                .useDefaultResponseMessages(false)
                .select()
                .apis(RequestHandlerSelectors.basePackage("com.haitang.swagger.controller"))
                .paths(PathSelectors.any())
                .build();
    }

    private ApiInfo apiInfo() {
        return new ApiInfoBuilder()
                .title("文档标题")
                .description("测试的接口文档")
                .version("v2.0")
                .termsOfServiceUrl("baidu.com")
                .contact(new Contact("haitang", "http://www.haitang.icu/", "1344702052@qq.com"))
                .build();
    }
}
```

3）修改 application.yaml ，将当前环境分别置为 test 、pro

然后重启项目，就可以发现 8081（dev环境 ）、 8082（test环境）端口可以正常访问 UI 界面，而8080 端口（pro环境）如图所示。

![生产环境](.\images\生产环境.png)

> Docket 其余的配置信息我在这里不说了，有用到或者想了解的同学可以自行查阅官网文档。

### 完整配置

```java
@Configuration
@EnableSwagger2
public class SwaggerConfig {

    @Bean
    public Docket docket(Environment environment) {
        Profiles profiles = Profiles.of("dev", "test");
        boolean flag = environment.acceptsProfiles(profiles);

        return new Docket(DocumentationType.SWAGGER_2)
                .apiInfo(apiInfo())
                .enable(flag)
                .useDefaultResponseMessages(false)
                .select()
                .apis(RequestHandlerSelectors.basePackage("com.haitang.swagger.controller"))
                .paths(PathSelectors.any())
                .build();
    }

    private ApiInfo apiInfo() {
        return new ApiInfoBuilder()
                .title("文档标题")
                .description("测试的接口文档")
                .version("v2.0")
                .termsOfServiceUrl("baidu.com")
                .contact(new Contact("haitang", "http://www.haitang.icu/", "1344702052@qq.com"))
                .build();
    }
    
    @Bean
    public Docket docket1() {
        return new Docket(DocumentationType.SWAGGER_2).groupName("打工人1组");
    }
}
```
