# 5分钟带你了解【前端装饰器】，“高大上”的“基础知识”



> 装饰器来啦

![img](/assets/excellentArticle/2024-05-07/300.png)



## 前言

大家好，我是林三心，用最通俗易懂的话讲最难的知识点是我的座右铭，基础是进阶的前提是我的初心。

![medium-zoom](/assets/excellentArticle/2024-05-07/640.png)

## 基本介绍

装饰器是一种以 @ 符号开头的特殊语法，放在目标代码的前面用于包装或扩展代码功能。JavaScript 的装饰器语法目前仍处于提案阶段，现阶段使用的话需要通过 bable 等方式进行编译之后，才能在浏览器正常运行。装饰器分为两种：类装饰器，类成员装饰器，分别用于装饰我们的类以及类的成员。

## 基本使用（类装饰器）

```
class MyClass {
  constructor() {}
}
```

比如现在有一个类或者函数 `MyClass`，它的身上没有任何的东西，但是我想要给他加一个 `log` 方法，那我们应该怎么做呢？很多人回想说，直接在它身上加一个 `log` 方法即可~

```
class MyClass {
  constructor() {}
  
  log() {}
}
```

但是这么做的话，一个 class 是能做，那如果要给 1000 个 class 加上 `log`方法呢？那岂不是每一个都得写~很麻烦，这个时候可以使用 `装饰器` 去拓展每一个 class

- 可以拓展原型方法
- 可以拓展静态属性

装饰器接收的参数是装饰的目标类，这里的 `cls` 就是 `MyClass`

```
function addConcole(target) {
  // 拓展原型方法
  target.prototype.log = function(msg) {
    console.log(`[${new Date()} ${msg}`);
  };
  // 拓展静态属性
  target.myName = '一个类'
  return target;
}

@addConcole
class MyClass {
  constructor() {}
}

const myObj = new MyClass();
myObj.log('林三心');
// [Sat Jul 08 2023 17:31:55 GMT+0800 (中国标准时间) 林三心
console.log(MyClass.myName)
// 一个类
```

## 应用场景

### Node路由请求Url（类成员装饰器）

我们在使用一些 Node 的框架时，在写接口的时候，我们可能会经常看到这样的代码

- 当我们请求路径是 GET doc 时会匹配到findDocById
- 当我们请求路径是 POST doc 时会匹配到createDoc

```
class Doc {
  @Get('doc')
  async findDocById(id) {}
  
  @Post('doc')
  async createDoc(data) {}
}
```

其实这个 `@Get` 和 `@Post` ，是框架提供给我们的 `类成员装饰器`，是的，类成员也能使用装饰器，类成员装饰器接收三个参数：

- `target` 是目标类的原型对象
- `key` 表示目标类成员的键名
- `descriptor` 是一个属性描述符对象，它包含目标类成员的属性特性（例如 value、writable 等）

```
function Get(path) {
  return function(target, key, descriptor) {
    console.log({
      target,
      key，
      descriptor
    })
  }
}
```

![medium-zoom](/assets/excellentArticle/2024-05-07/640-1715074863956-1.png)

他的基本实现原理大概是这样的

```
function Get(routePath) {
  return function(target, key, descriptor) {
    const originalMethod = descriptor.value; // 保存原始方法

    descriptor.value = function() {
      // 在原始方法执行前加入逻辑
      console.log('处理 Get 请求，路由路径: ' + routePath);

      // 执行原始方法
      const result = originalMethod.apply(this, arguments);

      // 在原始方法执行后加入逻辑
      console.log('Get 请求处理完成');

      return result;
    };

    return descriptor;
  };
}
```

### 接口权限控制（类成员装饰器叠加）

上面我们介绍了一下 Nodejs Url 的路由匹配基本原理，但是这是不够的，因为很多接口还需要权限控制，比如：

- GET doc 接口只能 管理员 才能访问
- POST doc 接口只能 超级管理员 才能访问

这也可以用装饰器来实现，并且装饰器是可以叠加的~

```
class Doc {
  @Get('doc')
  @Role('admin')
  async findDocById(id) {}
  
  @Post('doc')
  @Role('superAdmin')
  async createDoc(data) {}
}
```

装饰器叠加的执行顺序是 从下往上 的~我们可以看一下下面的例子，发现输出顺序是

- 2
- 1

```
function A () {
  console.log(1)
}
function B () {
  console.log(2)
}
class Doc {
  @A
  @B
  async test() {}
}
```

至于权限控制的装饰器实现，需要根据不同业务去实现，我这里就粗略实现一下

```
function Role(permissions) {
  return function(target, key, descriptor) {
    const originalMethod = descriptor.value; // 保存原始方法

    descriptor.value = function() {
      // 在原始方法执行前进行权限验证
      const user = getCurrentUser(); // 获取当前用户信息

      // 检查用户是否拥有所需权限
      const hasPermission = checkUserPermissions(user, permissions);

      if (!hasPermission) {
        // 如果用户没有权限，则抛出错误或执行其他处理
        throw new Error('无权限访问该接口');
      }

      // 执行原始方法
      const result = originalMethod.apply(this, arguments);

      return result;
    };

    return descriptor;
  };
}
```

### 记录日志的装饰器

我们想要在执行某个函数的时候，记录一下

- 函数调用时间
- 函数调用参数

这个时候我们也可以使用装饰器来完成，非常方便！！！

```
// 日志装饰器函数
function logDecorator(target, key, descriptor) {
  const originalMethod = descriptor.value; // 保存原始方法

  descriptor.value = function(...args) {
    console.log(`调用函数：${key}`);
    console.log(`参数：${JSON.stringify(args)}`);

    // 执行原始方法
    const result = originalMethod.apply(this, args);

    console.log(`返回值：${result}`);

    return result;
  };

  return descriptor;
}

// 示例类
class Example {
  @logDecorator
  greet(name) {
    return `Hello, ${name}!`;
  }
}

// 测试
const example = new Example();
example.greet('林三心');
```

### 缓存的装饰器

如果我们执行一个方法，获取返回值需要经过一系列的计算，非常耗时间，那么我们可以判断入参，第一次时计算完缓存起来，第二次的时候如果还是这个入参，就直接从缓存中去拿，这个操作也可以使用装饰器去完成

```
// 缓存装饰器函数
function cacheDecorator(target, key, descriptor) {
  const cache = {}; // 缓存对象

  const originalMethod = descriptor.value; // 保存原始方法

  descriptor.value = function(...args) {
    const cacheKey = JSON.stringify(args); // 生成缓存键

    if (cacheKey in cache) {
      console.log('从缓存中获取结果');
      return cache[cacheKey]; // 直接返回缓存结果
    }

    // 执行原始方法
    const result = originalMethod.apply(this, args);

    console.log('将结果缓存起来');
    cache[cacheKey] = result; // 缓存结果

    return result;
  };

  return descriptor;
}

// 示例类
class Example {
  @cacheDecorator
  getValue(key) {
    console.log('执行函数逻辑');
    return key + Math.random(); // 模拟复杂的计算逻辑
  }
}

// 测试
const example = new Example();
console.log(example.getValue('foo'));
console.log(example.getValue('foo')); // 从缓存中获取结果
```

### 防抖节流的装饰器

对于防抖节流，我们平时可能会这么去做

```
class C {
  onClick = debounce(fn, 100)
}
```

但是这么做的话会使这个函数不好拓展，所以使用装饰器真的很方便

```
// 防抖装饰器
function debounce(time) {
  return function (target, key, descriptor) {
    const oldFunction = descriptor.value;
    let timer = null;
    descriptor.value = function () {
      clearTimeout(timer);
      timer = setTimeout(() => {
        oldFunction.apply(this, arguments)
      }, time);
    };
    return descriptor;
  }
}

// 节流装饰器
function throttle(time) {
  return function (target, key, descriptor) {
    const oldFunction = descriptor.value;
    let isLock = false;
    descriptor.value = function() {
      if(isLock) { return; }
      isLock = true;
      oldFunction.apply(this, arguments);
      setTimeout(() => {
        isLock = false; 
      }, time);
    }
    return descriptor;
  }
}

class C {
  @debounce(1000)
  onClick() {}
  
  @throttle(1000)
  onScroll() {}
}
```







