# yk-admin 为后台管理系统基础版本

## 搭建框架
### spring boot 搭建
* 问题：  
1. 修改controller代码后，不能访问页面了
    原因：application.properties文件中需要配置
    spring.freemarker.cache=true

### 整合mybatis
* Dao层代码：其中Java类必须是以Dao结尾，不然扫描不到

### 多数据源（静态）
1. application.properties 添加配置
~~~
master.datasource.url=jdbc:mysql://127.0.0.1:3306/xjone?useUnicode=true&characterEncoding=utf8&zeroDateTimeBehavior=convertToNull
master.datasource.username=root
master.datasource.password=root
master.datasource.driver-class-name=com.mysql.jdbc.Driver
master.datasource.type=com.alibaba.druid.pool.DruidDataSource

cluster.datasource.url=jdbc:mysql://127.0.0.1:3306/s120?useUnicode=true&characterEncoding=utf8&zeroDateTimeBehavior=convertToNull
cluster.datasource.username=root
cluster.datasource.password=root
cluster.datasource.driver-class-name=com.mysql.jdbc.Driver
cluster.datasource.type=com.alibaba.druid.pool.DruidDataSource
~~~


2. 在config.ds 包中创建数据源文件（必须在这个包中，这个是规范）
MasterDataSourceConfig.java 和ClusterDataSourceConfig.java
* masterDataSource 数据源 
* masterTransactionManager 事物管理
* masterSqlSessionFactory 会话工厂   
````  在主连接中添加@Primary注解  ````

3. mapper 文件  
在resources中创建mapper/master,mapper/cluster 文件夹，其中分别放置mapper文件

4. 创建com.yk.dao.master、com.yk.modules.sys.dao.cluster包，其中分别放置dao层interface文件

### 部署Tomcat中（war）
1. spring boot 支持 tomcat7 以上版本，因为spring boot最低支持servlet3.0,但是tomcat6 中的servlet为2.6
2. 既然需要打包成war包项目，首先需要在pom.xml文件中修改打包类型，将spring boot默认的<packaging>jar</packaging>修改为<packaging>war</packaging>形式
3. 其次spring boot的web项目中内嵌tomcat服务器，所以如果我们想要发布war包到tomcat项目，要讲spring boot中内嵌的tomcat包依赖排除，
不然产生冲突，打开下面代码中的注释即可。
~~~
<dependency>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-starter-web</artifactId>
    <!--
    <exclusions>
        <exclusion>
            <groupId>org.springframework.boot</groupId>
            <artifactId>spring-boot-starter-tomcat</artifactId>
        </exclusion>
    </exclusions>
    -->
</dependency>    
~~~
4. 有一点想说的是，如果本地开发的时候依然想要使用spring boot内嵌tomcat进行调试，添加如下依赖即可
~~~
<dependency>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-starter-tomcat</artifactId>
    <scope>provided</scope>
</dependency>
~~~

5.  spring boot发布jar包web程序的入口是main函数所在的类，使用@SpringBootApplication注解。但是如果war包发布至tomcat，
    需要增加 SpringBootServletInitializer 子类，并覆盖它的 configure 方法，
    或者直接将main函数所在的类继承 SpringBootServletInitializer 子类，并覆盖它的 configure 方法。代码举例如下，
~~~
@SpringBootApplication
public class DemoApplication extends SpringBootServletInitializer {
    @Override
    protected SpringApplicationBuilder configure(
            SpringApplicationBuilder application) {
        return application.sources(DemoApplication.class);
    }
 
    public static void main(String[] args) {
        SpringApplication.run(DemoApplication.class, args);
    }
}
~~~
### 打包成jar执行
1. 打成jar后，java -jar xxxx.jar 执行，提示：没有主清单属性，如下解决：
~~~
<plugin>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-maven-plugin</artifactId>
    <version>1.5.7.RELEASE</version>
    <configuration>
        <maimClass>com.yk.Application</maimClass>
    </configuration>
    <executions>
        <execution>
            <goals>
                <goal>repackage</goal>
            </goals>
        </execution>
    </executions>
</plugin>
~~~

### 解决问题
* 在idea中freemarker 页面修改不刷新
    解决方法：http://blog.csdn.net/M201672389/article/details/77994570