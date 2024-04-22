# 项目配置

## 安装依赖

[网站配置](https://docs.nestjs.com/techniques/configuration#configuration)管理使用 @nestjs/config 扩展包，首先安装扩展包。



```
pnpm add @nestjs/config
```

在根模块app.module.ts中配置



```
...
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
   	...
    ConfigModule.forRoot({
    	//全局模块
      isGlobal: true,
    }),
  ],
 	...
})
...
```

系统会自动加载**.env**中的内容



```
DATABASE_URL="mysql://root:admin888@127.0.0.1:3306/nest"

DB_CONNECTION=mysql
DB_HOST=127.0.0.1
DB_PORT=3306
DB_DATABASE=nest
DB_USERNAME=root
DB_PASSWORD=admin888
```

在任何的模块的服务中通过依赖注入使用



```
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class PrismaService  {
  constructor(config: ConfigService) {
		console.log(config.get('DB_HOST'))
  }
}
```

## env文件

ConfigModule模块会加载.env配置项

1. 在开发时.env会有一些隐私数据，所以建议将**.env**放在**.gitignore**文件中
2. 创建一个和**.env**配置名一样的**.env.example**文件，上线后将其改名为**.env**

**.env**

该文件用于开发时使用，要定义在 **.gitignore**中，不提交到版本库



```
#数据库连接
DATABASE_URL="mysql://root:admin888@localhost:3306/nest-edu"
NODE_ENV=development
```

**.env.example**

该文件是生产环境使用的参考文件，要提交到版本库。

网站上线后将该文件复制一个，并修改文件名为**.env** 文件，并修改里面配置项内容



```
#数据库连接
DATABASE_URL="mysql://root:houdunren@localhost:3306/nest-edu"
NODE_ENV=production
```

现在可以在代码中使用 **process.env.NODE_ENV** 区分开发环境还是线上环境

### 模块定义

在 **app.module.ts** 模块中对**ConfigModule**进行定义

- 使用 **envFilePath** 加载多个env配置文件
- 多个env文件有同名配置项时，前面的优先级高



```
import { ConfigModule } from '@nestjs/config'
import { Module } from '@nestjs/common'
import { AppController } from './app.controller'
import { AppService } from './app.service'
import config from './config'

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
```

### 版本库

**.env**会包含开发时的私密信息，如理阿里云密钥等。所以将**.env**文件放在**.gitignore**中忽略提交。

然后在项目中创建一个同样的**.env.example** 文件，在生产环境中把 **.env.example** 内容改名为**.env**后使用。

这样做可以保护隐私数据不提交到GIT，尤其对于开源项目这很重要。

## 多文件配置

我们也可以单独对配置文件进行管理

### 文件定义

下面在 **src/config** 目录定义两个配置文件

src/config/app.ts



```
export default () => ({
  app: {
    name: 'houdunren.com',
    isDev: process.env.NODE_ENV=='development',
  },
  
})
```

src/config/database.ts



```
export default () => ({
  database: {
    url: 'localhost',
  },
})
```

### 模块声明

然后在**ConfigModule**模块中使用 **load** 属性声明加载



```
import { ConfigModule } from '@nestjs/config'
import { Module } from '@nestjs/common'
import { AppController } from './app.controller'
import { AppService } from './app.service'
import config from './config/app.ts'
import database from './config/database.ts'

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      //可以加载多个配置文件
      load: [app,database],
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
```

现在可以在项目中使用点语法读取配置项了



```
@Injectable()
export class AppService {
  constructor(private configService: ConfigService) {}
  getHello(): string {
    return this.configService.get('app.name')
  }
}
```

### 文件合并

如果你项目不复杂，也可以把上面两个配置文件，合并到一个文件中。以下是 **src/config.ts** 文件的内容



```
export default () => ({
  app: {
    name: 'houdunren.com',
    isDev: process.env.NODE_ENV=='development',
  },
  database: {
    url: 'localhost',
  },
})
```

然后在模块中引入这个文件



```
import { ConfigModule } from '@nestjs/config'
import { Module } from '@nestjs/common'
import { AppController } from './app.controller'
import { AppService } from './app.service'
import config from './config.ts'

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [config],
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
```

## 命名空间

使用[命名空间](https://docs.nestjs.com/techniques/configuration#configuration-namespaces)这种方式处理配置项，也可以实现多文件管理，并会有TS类型提示。下面以创建数据库连接为例，进行说明。

### 文件定义

首先创建配置文件 `src/config/database.config.ts`，内容如下：



```
import { registerAs } from '@nestjs/config'

export default registerAs('database', () => ({
  url: process.env.DATABASE_URL,
}))
```

然后定义合并导入文件`config/database/index.ts`



```
import databaseConfig from 'src/config/database.config'
export default [databaseConfig]
```

### 模块声明

然后在 `app.module.ts` 中模块定义



```
...
import config from './config'

@Module({
  imports: [ConfigModule.forRoot({ load: [...config] })],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
```

### 使用方法

接着在`app.service.ts`中使用

- 使用 `@Inject(databaseConfig.KEY) `注入配置项
- `ConfigType<typeof databaseConfig>` 用于定义类型，这样在使用时就有类型提示了



```
import { ConfigType } from '@nestjs/config'
import databaseConfig from 'src/config/database.config'
import { Inject, Injectable } from '@nestjs/common'

@Injectable()
export class AppService {
  constructor(
    @Inject(databaseConfig.KEY)
    private config: ConfigType<typeof databaseConfig>,
  ) {}
  getHello(): string {
    return this.config.host
  }
}
```

