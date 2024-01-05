---
cover: /blog/swagger/images/swagger-ui.png
recommend: false
tag:
 - Swagger
date: 2024-01-04 21:50:00
top: 1
---
# Swagger常用注解

## 类的注解

### @Api：资源描述

标识这个类是 Swagger 的资源

```java
@Api("学生管理")
@RestController
@RequestMapping("api/student")
public class StudentController {
}
```

可以设置的属性如下：

![ApiInfo](.\images\Api.png)

- values：字符串；说明该类的作用，在类旁边的小字显示

- tags：字符串；标签（也可理解成分类），会替换 Controller 名称；当多个 Controller 的 tags 相同时，它们的方法会在一起显示

- consumes：字符串；指定处理请求的提交内容类型 Content-Type ，例如 application/json

- produces：字符串；指定返回的内容类型，即仅当请求头的 Accept 类型中包含该指定类型才返回，例如：application/json

- protocols：字符串；标识当前的请求支持的协议，例如：http、https、ws

- hidden：true/false；隐藏整个 Controller，作用与 @ApiIgnore 相似，但没有 @ApiIgnore 功能强大
  

### @ApiIgnore：资源过滤

@ApiIgnore 可以用在类、方法上，方法参数中，用来屏蔽某些接口或参数，使其不在页面上显示。

![apiIgnore](.\images\apiIgnore.png)

## 方法的注解

### @ApiOperation：方法描述

 @ApiOperation 注解提供了很多属性供我们来描述接口信息。

![ApiOperation](.\images\ApiOperation.png)

- value：字符串；方法摘要，在路径旁显示

- note：字符串；方法详细描述

  ![ApiOperation注解的value和note属性](.\images\ApiOperation注解的value和note属性.png)

- 
  tags：字符串数组；对方法进行分类，一个方法可以有多个分类

  ![ApiOperation注解的tags属性](.\images\ApiOperation注解的tags属性.png)

- response：Class；设置当前请求的返回值类型，String.class；会覆盖自动识别的返回类型，一般用不上

- responseContainer：字符串；说明包装的容器，默认情况下，有效值为 List、Set、Map；在定义通用 Response 后，一般用不上

- httpMethod：字符串；指定请求方式，比如 GET、POST、PUT

- consumes：字符串；指定处理请求的提交内容类型(Content-Type)，例如 application/json

- produces：字符串；指定返回的内容类型，即仅当请求头的 Accept 类型中包含该指定类型才返回，例如:application/json

### @ApiImplicitParam(s)：参数描述

参数描述，可用在方法头。ApiImplicitParams 只有一个属性 `ApiImplicitParam[] value(); `是 ApiImplicitParam 的数组，比如

```java
@ApiImplicitParams({
        @ApiImplicitParam(name = "id", value = "商户ID")
})
@GetMapping("/{id}")
public Response getMerchantsInfo(@PathVariable Integer id) {
    return null;
}
```

所以，来看看 @ApiImplicitParam 有哪些属性：

![ApiImplicitParam](.\images\ApiImplicitParam.png)

- **name**：字符串；参数名
- **value**：字符串；参数的汉字说明、解释
- defaultValue：字符串；参数的默认值
- allowableValues：字符串；限制此参数接收的值，可使用的值或值得范围
  - `(`表示是大于，`)`表示是小于
  - `[`表示是大于等于，`]`表示是小于等于
  - `infinity`表示无限大，`-infinity`表示负无限大
- allowEmptyValue：true/false；允许参数为空，默认为 false
- **required**：true/false；参数是否必须传
- **paramType**：字符串；参数放在哪个地方（可以自动识别）
- header --> 参数在request headers 里边提交：@RequestHeader
  - path（用于restful接口）–> 参数以地址的形式提交：@PathVariable
  - query --> 直接跟参数完成自动映射赋值：@RequestParam
  - form --> 以form表单的形式提交，仅支持POST：@RequestParam
  - body --> 以流的形式提交，仅支持POST：@RequestBody
- **dataType**：字符串；参数类型，参数的数据类型（默认String），可以使用类名或原始数据类型（使用不当汇报类型转换异常）
- dataTypeClass：Class；参数的类，如果提供则覆盖 dataType
- example：字符串；非请求体（body）参数的**单个请求**示例
- examples：Example；参数的举例说明，仅适用于 body 类型。

### @ApiParam：参数描述

参数描述，用在每个参数前面，比如

```java
@PostMapping("/create")
// 注：这里如果使用 @ApiImplicitParam 会出现无法识别的问题
public Response createMerchants(
        @ApiParam(name = "request", value = "创建商户请求对象") @RequestBody CreateMerchantsRequest request) 
1234
```

@ApiParam 的可以设置的属性如下：

![ApiParam](.\images\ApiParam.png)

- **name**：字符串；参数名
- **value**：字符串；参数的汉字说明、解释
- defaultValue：字符串；参数默认值
- allowableValues：字符串；限制此参数接收的值，可使用的值或值得范围
  - `(`表示是大于，`)`表示是小于
  - `[`表示是大于等于，`]`表示是小于等于
  - `infinity`表示无限大，`-infinity`表示负无限大
- allowEmptyValue：true/false；允许参数为空，默认为 false
- **required**：true/false；参数是否必须传
- example：字符串；非请求体（body）参数的**单个请求**示例
- examples：Example；参数的举例说明，仅适用于 body 类型。

> 关于 @ApiImplicitParam 和 @ApiParm 它俩都能为方法的请求参数做注释，区别有：

1. @ApiImplicitParam 可以在方法前使用，而 @ApiParm 只能在参数前使用
2. @ApiImplicitParam 提供的可设置属性更多，特别是 **paramType** 很关键
3. 对于 @RequestBody 标识的 Json 字符串，不能使用 @ApiImplicitParam，会出现无法识别的情况
   1. 方案一：通过 @ApiParm 对 @RequestBody 的参数进行说明
   2. 方案二：直接不对该参数使用注解，将注释的任务交给实体类（@ApiModel）

另外，两者是可以混搭使用的，一般推荐使用 @ApiImplicitParam(s)，但是注意 @RequestBody 的情况。

### @ApiResponse(s)

跟上面 @ApiImplicitParam(s) 一样，@ApiResponses 也是只有唯一个属性`ApiResponse[] value();`

```java
@ApiResponses({
        @ApiResponse(code = 1, message = "非HTTP状态码，Response code字段值，描述：成功，返回该商户ID"),
        @ApiResponse(code = 0, message = "非HTTP状态码，Response code字段值，描述：失败")
})
@PostMapping("/create")
public Response createMerchants
```

下面来看看 @ApiResponse 有哪些属性

![ApiResponse](.\images\ApiResponse.png)

- **code**：整形数；相应的状态码
- **message**：字符串；相应消息，例如"电话号码已存在"
- **response**：Class；消息有效负载的可选响应类，对应于响应消息对象的 schema 字段；对于使用通用 Response 的情况，该字段很关键
- responseHeaders：ResponseHeader[]；可能响应的 header 列表
- responseContainer：String；声明响应的容器，有效值为List,Set,Map，任何其他值都将被忽略

## 实体类的注解

### @ApiModel：实体类描述

用于请求类或者响应类上，表示一个返回响应数据的信息

```java
@ApiModel("创建商户的请求对象")
@Data
@AllArgsConstructor
@NoArgsConstructor
public class CreateMerchantsRequest 
```

@ApiModel 可以设置的属性有：

![ApiModel](.\images\ApiModel.png)

- **value**：字符串；实体类的备用名，如果不设置，则会采用原类名
- description：字符串；实体类的说明
- parent：Class；父类的一些信息

### @ApiModelProperty：实体类成员描述

```java
@ApiModel("创建商户的请求对象")
@Data
@AllArgsConstructor
@NoArgsConstructor
public class CreateMerchantsRequest {

    @ApiModelProperty("商户名")
    private String name;

    @ApiModelProperty("商户logo的URL")
    private String logoUrl;

    @ApiModelProperty("营业执照URL")
    private String businessLicenseUrl;

    @ApiModelProperty("联系电话")
    private String phone;

    @ApiModelProperty("地址")
    private String address;
}
```

ApiModelProperty 可以设置的属性有：

![ApiModelProperty](.\images\ApiModelProperty.png)

- **value**：字符串；字段说明
- name：字符串；重写字段名称
- dataType：字符串；重写字段类型
- required：true/false；是否必填
- allowableValues：字符串；限制此参数接收的值，可使用的值或值得范围
  - `(`表示是大于，`)`表示是小于
  - `[`表示是大于等于，`]`表示是小于等于
  - `infinity`表示无限大，`-infinity`表示负无限大
- allowEmptyValue：true/false；允许参数为空，默认为 false
- example：String；示例
- hidden：true/false；是否在文档中隐藏该字段