# NestJs

<!-- ![xj-small](/assets/nestjs/base/xj.BkzzMsXj.jpg) -->

[Nest.js](https://docs.nestjs.com/) 用于构建高效且可伸缩的服务端应用程序的渐进式 Node.js 框架。

一般来说，一个请求流经中间件、守卫与拦截器，然后到达管道，并最终回到拦截器中的返回路径中（从而产生响应）。后面的章节向军大叔将分别对每个部分进行讲解。

本章节来讨论Nest.js的常用功能，更多细节你可以访问 [英文官网](https://docs.nestjs.com/) 或 [中文网](https://docs.nestjs.cn/) 来学习。

> 章节中示例用到的数据使用 prima 操作mysql，所以建议按顺序学习。

![image-20220713221001080](/assets/nestjs/base/image-20220713221001080.BdZA4s5h.png)

## 项目创建

下面来创建每一个NestJs项目，因为很多朋友是刚开始学习，所以下面介绍几个概念。

### 构建工具

下面对命令行构建工具进行说明，下面说到的工具都可以在 [后盾人文档库](https://doc.houdunren.com/) 查看到使用说明。

- 可以使用 npm、yarn、pnpm进行包管理，向军大叔建议使用pnpm
- 建议安装nrm镜像源管理工具，可以方便切换国内镜像，提高下载速度
- 建议安装nvm用于切换node版本

### 全局命令

首先全局安装相关命令，你可以使用npm 、yarm、pnpm管理包



```
pnpm add -g @nestjs/cli nodemon ts-node
nest new project-name
```

### 项目依赖

进入项目目录然后安装项目依赖，包含prisma、表单验证、加密工具、JWT、文件上传、工具包、日期处理等



```
pnpm add prisma-binding ts-node @prisma/client mockjs @nestjs/config class-validator class-transformer argon2 @nestjs/passport passport passport-local @nestjs/jwt passport-jwt lodash multer dayjs express redis @nestjs/throttler mockjs @nestjs/cache-manager cache-manager md5 @casl/prisma @casl/ability

pnpm add -D prisma typescript @types/node @types/mockjs @nestjs/mapped-types @types/passport-local @types/passport-jwt @types/express @types/lodash @types/multer @types/cache-manager @types/md5
```

注意事项：

- ts-node 要安装在 dependencies

## vscode

建议使用 [vscode](https://code.visualstudio.com/) 他对前端支持非常好且免费

### 插件

请安装以下插件为NestJs提供支持

- [Prisma](https://marketplace.visualstudio.com/items?itemName=Prisma.prisma)
- [JavaScript and TypeScript Nightly](https://marketplace.visualstudio.com/items?itemName=ms-vscode.vscode-typescript-next)
- [DotENV](https://marketplace.visualstudio.com/items?itemName=mikestead.dotenv)

### prettierrc

NestJs项目创建后会生成`.prettierrc`文件，这是代码格式化规范，下面是向军大叔的配置。



```
{
  "arrowParens": "always",
  "bracketSameLine": true,
  "bracketSpacing": true,
  "embeddedLanguageFormatting": "auto",
  "htmlWhitespaceSensitivity": "css",
  "insertPragma": false,
  "jsxSingleQuote": false,
  "printWidth": 120,
  "proseWrap": "never",
  "quoteProps": "as-needed",
  "requirePragma": false,
  "semi": false,
  "singleQuote": true,
  "tabWidth": 2,
  "trailingComma": "all",
  "useTabs": false,
  "vueIndentScriptAndStyle": false,
  "singleAttributePerLine": false
}
```

## 依赖注入

依赖注入指创建对象的过程由框架自动完成，a对象在使用b对象，b对象使用c对象，a对象只需要使用b对象，而不需要了解b对象怎么怎么样创建出c对象。

### 高耦合代码

以下代码是没有依赖注入的情况，a对象要考虑b对象的参数，如果c对象也有参数也要考虑，这显然是高耦合低效率的编码体验。



```
class c {
  run() {
    console.log('c object');
  }
}

class b {
  constructor(private c) {}
  run() {
    this.c.run();
  }
}

class a {
  constructor(private b) {}

  run() {
    this.b.run();
  }
}

const hd = new a(new b(new c()));
hd.run();
```

### 依赖注入

NestJs将类定义在模块的 **providers** 属性中即声明为提供者，其他类可以在constructor构造函数中依赖注入，实现编码的解耦。

下面代码的构造函数使用依赖注入了PrismaService与JwtService服务实例。



```
@Injectable()
export class AuthService {
  constructor(private readonly prismaService: PrismaService, private readonly jwtService: JwtService) {}

  async login(loginDto: LoginDto) {
    const user = await this.prismaService.user.findUnique({
      where: {
        name: loginDto.name,
      },
    })

    const passwordCheck = await argon2.verify(user.password, loginDto.password)
    if (!passwordCheck) throw new BadRequestException('密码输入错误')

    return this.token(user)
  }
  ...
}
```

## 生命周期

![img](/assets/nestjs/base/pasted-from-clipboard.CeOqlfbU.png)

一般来说，nest.js请求生命周期大致如下：

1. 收到请求
2. 全局绑定的中间件
3. 模块绑定的中间件
4. 全局守卫
5. 控制层守卫
6. 路由守卫
7. 全局拦截器（控制器之前）
8. 控制器层拦截器 （控制器之前）
9. 路由拦截器 （控制器之前）
10. 全局管道
11. 控制器管道
12. 路由管道
13. 路由参数管道
14. 控制器（方法处理器）
15. 路由拦截器（请求之后）
16. 控制器拦截器 （请求之后）
17. 全局拦截器 （请求之后）
18. 异常过滤器 （路由，之后是控制器，之后是全局）
19. 服务器响应