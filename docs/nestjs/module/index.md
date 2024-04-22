# 模块

## 基础知识

模块是一个独立的应用单位，比如你可以将用户登录注册、配置项管理、商品定单管理分别定义为不同的模块

- 使用imports导入其他模块
- 使用providers属性向其他模块提供服务
- 使用inject 属性注入其他模块提供的服务
- 使用controllers属性声明模块的控制器，以供路由识别
- 社区有众多NestJs的模块，我们可以拿来使用，比如ConfigModule配置管理模块
- 模块是单例的
- providers定义的提供者也是单例的

## 根模块

每个应用程序至少有一个模块，即根模块。根模块是 Nest 用于构建**应用程序图**的起点。根模块在**main.ts**中定义。

如果你想让局域网用户可访问，可以在**main.ts**中指定ip地址



```
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.listen(3000, '0.0.0.0');
}
```

## 基本定义

模块是一个子程序，用于定义控制器、提供者或向其他模块开放提供者（开放模块的 API）

- 默认情况下控制器、提供者在当前模块可用，即模块作用域
- 如果向其他模块提供服务，可以将提供者定义在 **exports** 属性中，其他模块需要在 **imports** 属性中引入当前模块
- 模块是单例的，多个模块共享当前模块实例
- 模块提供者也是单例，所以模块被多个其他模块使用，那该模块的 **provider** 也是共享的



```
import { JwtStrategy } from './strategy/jwt.strategy'
import { Module } from '@nestjs/common'
import { ConfigModule, ConfigService } from '@nestjs/config'
import { JwtModule } from '@nestjs/jwt'
import { AuthController } from './auth.controller'
import { AuthService } from './auth.service'

@Module({
	//导入其他模块
  imports: [
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory(configService: ConfigService) {
        return {
          secret: configService.get('app.token_secret'),
          expiresIn: '100d',
        }
      },
    }),
  ],
  //模块提供者
  providers: [AuthService, JwtStrategy],
  //控制器
  controllers: [AuthController],
  //向外提供接口
  exports: [AuthService],
})
export class AuthModule {}
```

## 静态模块

静态模块指模块是固定的，不需要根据不同参数改变模块的形为，比如现实生活中大叔对老婆的爱就是静态的，不会改变的。

下面是 **auth.module.ts** 静态模块



```
import { Module } from '@nestjs/common'
import { AuthController } from './auth.controller'
import { AuthService } from './auth.service'

@Module({
  providers: [AuthService],
  controllers: [AuthController],
  exports: [AuthService],
})
export class AuthModule {}
```

然后在**app.module.ts** 根模块中使用



```
import { Module } from '@nestjs/common'
import { AppController } from './app.controller'
import { AuthModule } from './auth/auth.module'

@Module({
  imports: [AuthModule],
  controllers: [AppController],
  providers: [],
})
export class AppModule {}
```

## 动态模块

动态模块指要根据参数动态定义，比如数据库管理模块，就要根据数据库的连接配置项动态定义。现实生活中大叔的心情就是动态的，比如打王者赢了就会开心，输了就会沮丧。

- 动态模块是运行时通过编程方式动态创建的模块
- 动态模块可以使用 **async** 定义成异步的
- 如果要定义成全局模块，可以设置 **global** 属性为**true**
- 动态模块必须返回与静态模块具有完全相同接口的对象，外加一个称为`module`的附加属性
- 动态模块除 **module** 属性外，模块选项对象的所有属性都是可选的
- 动态模块可以定义 **imports** 导入其他模块
- 定义动态模块时可以结合 **@module** 定义属性，最终两种方式会合并处理

下面以登陆配置模块为例进行说明

### 文件结构

首先创建模块模块与服务



```
src/config
├── config.module.ts
└── config.service.ts
```

然后创建配置项，用于记录网站的不同配置项



```
src/configure
├── app.ts
└── database.ts
```

app.ts 内容如下



```
export default () => {
  return {
    app: {
      name: '后盾人',
    },
  }
}
```

database.ts 内容如下



```
export default () => {
  return {
    database: {
      host: 'localhost',
    },
  }
}
```

### 服务定义

config.service.ts 内容如下



```
import { Injectable } from '@nestjs/common'
import { readdirSync } from 'fs'
import path from 'path'

@Injectable()
export class ConfigService {
  //配置数据
  private config = {}
  constructor() {
    //配置文件存放目录
    const options = { path: path.resolve(__dirname, '../configure') }

    //遍历配置文件
    readdirSync(options.path).map(async (file) => {
      if (file.slice(-2) == 'js') {
        //加载配置文件内容
        const config = await import(path.join(options.path, file))
        this.config = { ...this.config, ...config.default() }
      }
    })
  }

  //读取配置项支持点语法
  public get(path: string) {
    return path.split('.').reduce((config, name) => config[name], this.config)
  }
}
```

### 模块定义

现在修改 **config.module.ts** 内容发下



```
import { Module } from '@nestjs/common'
import { ConfigService } from './config.service'

@Module({
  providers: [ConfigService],
  exports: [ConfigService],
})
export class ConfigModule {}
```

### 使用测试

在 **app.module.ts** 中导入 **config.module.ts** 模块



```
import { Module } from '@nestjs/common'
import { AppController } from './app.controller'
import { AppService } from './app.service'
import { ConfigModule } from './config/config.module'

@Module({
  imports: [ConfigModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
```

然后在 **app.controller.ts** 控制器中使用 **config.service.ts** 服务



```
import { ConfigService } from './config/config.service'
import { Controller, Get } from '@nestjs/common'

@Controller()
export class AppController {
  constructor(private readonly config: ConfigService) {}

  @Get()
  show() {
    return this.config.get('database.host')
  }
}
```

现在在浏览器中访问，就可以读取到配置项了

### 动态模块

现在是可以使用配置项了，但我们希望配置项的目录 **configure** 目录是可以定义的，所以修改 **config.module.ts** 将其定义为动态模块。



```
import { DynamicModule, Module } from '@nestjs/common'
import { ConfigService } from './config.service'

@Module({
  providers: [ConfigService],
  exports: [ConfigService],
})
export class ConfigModule {
	//接收动态创建模块的参数 
  static register(options: { path: string }): DynamicModule {
    return {
      module: ConfigModule,
      //定义提供者用于保存参数，这样就可以被 ConfigService 服务使用了
      providers: [
        {
          provide: 'CONFIG_OPTIONS',
          useValue: options,
        },
      ],
    }
  }
}
```

接着修改 **config.service.ts ** 服务，让其他可以根据选项动态加载配置



```
import { Inject, Injectable, Optional } from '@nestjs/common'
import { readdirSync } from 'fs'
import path from 'path'

@Injectable()
export class ConfigService {
  //配置数据
  constructor(
  	@Inject('CONFIG_OPTIONS') private options: { path: string }, 
  	@Optional() private config = {}
  ) {
    //遍历配置文件
    readdirSync(options.path).map(async (file) => {
      if (file.slice(-2) == 'js') {
        //加载配置文件内容
        const config = await import(path.join(options.path, file))
        this.config = { ...this.config, ...config.default() }
      }
    })
  }

  //读取配置项支持点语法
  public get(path: string) {
    return path.split('.').reduce((config, name) => config[name], this.config)
  }
}
```

现在就可以在 **app.module.ts** 模块中灵活的指定配置项的加载目录了



```
import { Module } from '@nestjs/common'
import path from 'path'
import { AppController } from './app.controller'
import { AppService } from './app.service'
import { ConfigModule } from './config/config.module'

@Module({
  imports: [
  	ConfigModule.register({ path: path.resolve(__dirname, './configure/') })
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
```

## 全局模块

使用**@Global**装饰器定义的模块为全局模块，其他模块在使用全局模块时不需要**imports**导入该模块

- **@Global** 装饰器将模块定义为全局作用域，其他模块不需要使用 **imports** 引入该模块就可以使用
- 全局模块也需要使用 **exports** 选项向其他模块提供接口
- 不建议将模块都定义为全局模块，但像配置模块是广泛使用的，可以定义为全局模块

### 装饰器

我们可以使用 **@Global** 装饰器来将模块声明为全局模块



```
@Global()
@Module({
  providers: [AuthService],
  exports: [AuthService],
})
```

### 动态模块

上面讲解的动态模块也可使用 **global** 属性或 **@Global** 装饰器定义动态模块



```
import { DynamicModule, Global, Module } from '@nestjs/common'
import { ConfigService } from './config.service'

@Module({
  providers: [ConfigService],
  exports: [ConfigService],
})
export class ConfigModule {
  static register(options: { path: string }): DynamicModule {
    return {
      module: ConfigModule,
      //定义全局模块
      global: true,
      providers: [
        {
          provide: 'CONFIG_OPTIONS',
          useValue: options,
        },
      ],
    }
  }
}
```

### 运行测试

现在你可以创建 **test.module.ts** 与 **test.controller.ts** 进行测试

test.module.ts 的内容如下



```
import { Module } from '@nestjs/common'
import { TestController } from './test.controller'

@Module({
  controllers: [TestController],
})
export class TestModule {}
```

test.controller.ts 内容如下



```
import { ConfigService } from './../config/config.service'
import { Controller, Get } from '@nestjs/common'

@Controller('test')
export class TestController {
  constructor(private config: ConfigService) {}
  @Get()
  get() {
    return this.config.get('app.name')
  }
}
```

现在访问 **localhost:3000/test** 可以查看到结果

