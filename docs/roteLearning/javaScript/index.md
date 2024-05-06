# 进阶进阶！复习50个JavaScript「进阶」知识点，金三银四！



![img](/assets/roteLearning/javaScript/300-1714988709404-15.png)





今天就带着大家来复习一下**JavaScript的50个「进阶」知识点**哦~~~

## 开始复习

### 1、undeclared 与 undefined的区别？

- undefined：声明了变量，但是没有赋值
- undecalared：没有声明变量就直接使用

```
var a; //undefined
b;    // b is not defined
```

### 2、let & const与 var 的区别？

- `var`存在变量提升，可重复声明同一变量，声明的变量均可改
- `let`没有变量提升，不可重复声明同一变量，声明的变量均可改
- `const`没有变量提升，不可重复声明同一变量，声明的基本数据类型不可改，引用类型可改属性，不可只声明变量而不赋值

### 3、暂时性死区问题

```
var a = 100;

if(1){
    a = 10;
    //在当前块作用域中存在a使用let/const声明的情况下，给a赋值10时，只会在当前作用域找变量a，
    // 而这时，还未到声明时候，所以控制台Error:Cannot access 'a' before initialization
    let a = 1;
}
```

### 4、获取DOM元素有哪些方法？

| 方法                                   | 描述                      |
| :------------------------------------- | :------------------------ |
| document.getElementById(id)            | 通过id获取dom             |
| document.getElementsByTagName(tagName) | 通过标签名获取dom         |
| document.getElementsByClassName(class) | 通过class获取dom          |
| document.getElementsByName(name)       | 通过标签的属性name获取dom |
| document.querySelector(选择器)         | 通过选择器获取dom         |
| document.querySelectorAll(选择器)      | 通过选择器获取dom         |

### 5、操作DOM元素有哪些方法

| 方法                   | 描述                                                                                                    |
| :--------------------- | :------------------------------------------------------------------------------------------------------ |
| createElement          | 创建一个标签节点                                                                                        |
| createTextNode         | 创建一个文本节点                                                                                        |
| cloneNode(deep)        | 复制一个节点，连同属性与值都复制，deep为true时，连同后代节点一起复制，不传或者传false，则只复制当前节点 |
| createDocumentFragment | 创建一个文档碎片节点                                                                                    |
| appendChild            | 追加子元素                                                                                              |
| insertBefore           | 将元素插入前面                                                                                          |
| removeChild            | 删除子元素                                                                                              |
| replaceChild           | 替换子元素                                                                                              |
| getAttribute           | 获取节点的属性                                                                                          |
| createAttribute        | 创建属性                                                                                                |
| setAttribute           | 设置节点属性                                                                                            |
| romoveAttribute        | 删除节点属性                                                                                            |
| element.attributes     | 将属性生成类数组对象                                                                                    |

### 6、DOM的类型有哪几种？

```
元素节点              Node.ELEMENT_NODE(1)
属性节点              Node.ATTRIBUTE_NODE(2)
文本节点              Node.TEXT_NODE(3)
CDATA节点             Node.CDATA_SECTION_NODE(4)
实体引用名称节点       Node.ENTRY_REFERENCE_NODE(5)
实体名称节点          Node.ENTITY_NODE(6)
处理指令节点          Node.PROCESSING_INSTRUCTION_NODE(7)
注释节点              Node.COMMENT_NODE(8)
文档节点              Node.DOCUMENT_NODE(9)
文档类型节点          Node.DOCUMENT_TYPE_NODE(10)
文档片段节点          Node.DOCUMENT_FRAGMENT_NODE(11)
DTD声明节点            Node.NOTATION_NODE(12)
```

### 7、JS的作用域及作用域链

#### 什么是作用域呢？

在 Javascript 中，作用域分为 `全局作用域` 和 `函数作用域`

- 全局作用域：代码在程序任何地方都能访问，window对象的内置属性都属于全局作用域
- 函数作用域：在固定的代码片段才能被访问

![medium-zoom](/assets/roteLearning/javaScript/20240506175356.png)

作用域有上下级关系，上下级关系的确定就看函数是在哪个作用域下创建的。如上，fn作用域下创建了bar函数，那么“fn作用域”就是“bar作用域”的上级。

作用域最大的用处就是隔离变量，不同作用域下同名变量不会有冲突。

#### 什么是作用域链？

一般情况下，变量取值到 创建 这个变量 的函数的作用域中取值

但是如果在当前作用域中没有查到值，就会向上级作用域去查，直到查到全局作用域，这么一个查找过程形成的链条就叫做作用域链

```
var x = 10;

function fn(){
    console.log(x);
}

function show(f){
    var x = 20;
    f();    // 10 
}

show(fn);
```

![medium-zoom](/assets/roteLearning/javaScript/640(1).png)

### 8、数组的splice 与 slice 的区别？

| 方法   | 参数                                  |
| :----- | :------------------------------------ |
| splice | splice(start, num, item1, item2, ...) |
| slice  | slice(start, end)                     |

### 9、substr 和 substring 的区别？

| 方法      | 参数                 |
| :-------- | :------------------- |
| substr    | substr(start,length) |
| substring | substring(start,end) |

### 10、includes 比 indexOf好在哪？

includes可以检测`NaN`，indexOf不能检测`NaN`，includes内部使用了`Number.isNaN`对`NaN`进行了匹配

### 11、下面代码输出的结果？

```
for(var i = 0; i < 3; i++){
  setTimeout(function(){
      console.log(i);   
  },0); 
};
```

答案：3，3，3

解决方法

```
for(let i = 0; i < 3; i++){
  setTimeout(function(){
      console.log(i);   
  },0); 
};
// 0 1 2
for (var i = 0; i < 3; i++) {
  (function(i) {
    setTimeout(function () {
      console.log(i);
    }, 0, i)
  })(i)
};
// 0 1 2
```

### 12、什么是Promise？解决了什么问题？

#### 好处

- 解决了回调地狱
- 提高代码可读性
- 状态不可逆不可变
- 存值，使用时再执行方法

#### 方法

- `then`
- `catch`
- `all`
- `race`
- `allSetteled`
- `any`

### 13、什么是async/await？解决了什么问题？

是`generator + Promise`的语法糖，主要的作用是**用同步方式执行异步操作**，`await`只能在`async函数`中使用，`async函数`执行会返回一个`Promise`，值由函数的return值所决定

### 14、常用的正则表达式有哪些？

[有了这25个正则表达式，代码效率提高80%](http://mp.weixin.qq.com/s?__biz=Mzg2NjY2NTcyNg==&mid=2247483954&idx=1&sn=18489d9cbcd0562a017094058bc91610&chksm=ce4617a3f9319eb59a7e64703f87098382aa952f9d86f45b05c2ce47b0f248776276f453bdd4&scene=21#wechat_redirect)

### 15、JS延迟加载的方法有哪些？

- 1、`<script async src="script.js"></script>`：给script标签加async属性，则加载和渲染后续文档元素的过程将和 `script.js` 的加载与执行并行进行（异步）
- 2、`<script defer src="script.js"></script>`：给script标签加defer属性，加载后续文档元素的过程将和 `script.js` 的加载并行进行（异步），但是 `script.js` 的执行要在所有元素解析完成之后，`DOMContentLoaded` 事件触发之前完成
- 3、动态创建script标签：等到`DOMContentLoaded` 事件触发时，生成一个script标签，渲染到页面上上
- 4、setTimeout定时器延迟代码执行

### 16、new操作符为什么能创建一个实例对象？

分析一下new的整个过程：

- 1、创建一个空对象
- 2、继承构造函数的原型
- 3、this指向obj，并调用构造函数
- 4、返回对象

简单实现一下new：

```
function myNew (fn, ...args) {
    // 第一步：创建一个空对象
    const obj = {}

    // 第二步：继承构造函数的原型
    obj.__proto__ =  fn.prototype

    // 第三步：this指向obj，并调用构造函数
    fn.apply(obj, args)


    // 第四步：返回对象
    return obj
}
```

### 17、什么是文档碎片？

- 是什么：一个容器，用于暂时存放创建的dom元素，使用`document.createDocumentFragment()`创建
- 有什么用：将需要添加的大量元素 先添加到文档碎片 中，再将文档碎片添加到需要插入的位置，大大减少dom操作，提高性能 例子

```
var oFragmeng = document.createDocumentFragment(); 
for(var i=0;i<10000;i++)
{ 

    var op = document.createElement("span"); 

    var oText = document.createTextNode(i); 

    op.appendChild(oText); 

    //先附加在文档碎片中

    oFragmeng.appendChild(op);  

} 
//最后一次性添加到document中
document.body.appendChild(oFragmeng); 
```

### 18、async/await如何检测报错？

```
/**
 * @param { Promise } 传进去的请求函数
 * @param { Object= } errorExt - 拓展错误对象
 * @return { Promise } 返回一个Promise
 */
export function to(
  promise,
  errorExt
) {
  return promise
    .then(data => [null, data])
    .catch(err => {
      if (errorExt) {
        const parsedError = Object.assign({}, err, errorExt)
        return [parsedError, undefined]
      }

      return [err, undefined]
    })
}

export default to
```

### 19、宏任务与微任务有哪些？

#### 宏任务

| #                         | 浏览器 | Node |
| :------------------------ | :----- | :--- |
| **I/O**                   | ✅      | ✅    |
| **setTimeout**            | ✅      | ✅    |
| **setInterval**           | ✅      | ✅    |
| **setImmediate**          | ❌      | ✅    |
| **requestAnimationFrame** | ✅      | ❌    |

#### 微任务

| #                                        | 浏览器 | Node |
| :--------------------------------------- | :----- | :--- |
| **Promise.prototype.then catch finally** | ✅      | ✅    |
| **process.nextTick**                     | ❌      | ✅    |
| **MutationObserver**                     | ✅      | ❌    |

### 20、宏任务与微任务的执行顺序？说说EventLoop？

[7关！setTimeout+Promise+Async输出顺序？你能过几关！](http://mp.weixin.qq.com/s?__biz=Mzg2NjY2NTcyNg==&mid=2247483940&idx=1&sn=7a97101836c2b697a270bd84707d441f&chksm=ce4617b5f9319ea3e65092ef4a8b977c85cb0c589f89f49cf626df961de0900c2510297f0af9&scene=21#wechat_redirect)

### 21、Object.defineProperty(target, key, options)，options可传什么参数？

- `value`：给target[key]设置初始值
- `get`：调用target[key]时触发
- `set`：设置target[key]时触发
- `writable`：默认false，为true时此属性才能被赋值运算符修改
- `enumerable`：默认false，为true时此属性才能被枚举
- `configurable`：默认为false，为true时此属性的描述符才能被修改，才能被删除

### 22、什么是防抖？什么是节流？

| 操作 | 描述                                                   | 场景                                                                                                           |
| :--- | :----------------------------------------------------- | :------------------------------------------------------------------------------------------------------------- |
| 防抖 | 频繁去触发一个事件，但是只触发最后一次。以最后一次为准 | 1、电脑息屏时间，每动一次电脑又重新计算时间 2、input框变化频繁触发事件可加防抖 3、频繁点击按钮提交表单可加防抖 |
| 节流 | 频繁去触发一个事件，但是只能每隔一段时间触发一次       | 1、滚动频繁请求列表可加节流 2、游戏里长按鼠标，但是动作都是每隔一段时间做一次                                  |

### 23、什么是高阶函数？简单实现一个？

高阶函数：英文叫Higher-order function。JavaScript的函数其实都指向某个变量。既然变量可以指向函数，函数的参数能接收变量，那么一个函数就可以接收另一个函数作为参数，这种函数就称之为高阶函数。

```
// 简单的高阶函数
function add(x, y, f) {
    return f(x) + f(y);
}

//用代码验证一下：
add(-5, 6, Math.abs); // 11
```

像数组的`map、reduce、filter`这些都是高阶函数

### 24、什么是函数柯里化？简单实现一个？

柯里化，英语：Currying(果然是满满的英译中的既视感)，是把接受多个参数的函数变换成接受一个单一参数（最初函数的第一个参数）的函数，并且返回接受余下的参数而且返回结果的新函数的技术。

```
// 普通的add函数
function add(x, y) {
    return x + y
}

// Currying后
function curryingAdd(x) {
    return function (y) {
        return x + y
    }
}

add(1, 2)           // 3
curryingAdd(1)(2)   // 3
```

#### 好处

- 1、参数复用

```
// 正常正则验证字符串 reg.test(txt)

// 普通情况
function check(reg, txt) {
    return reg.test(txt)
}

check(/\d+/g, 'test')       //false
check(/[a-z]+/g, 'test')    //true

// Currying后
function curryingCheck(reg) {
    return function(txt) {
        return reg.test(txt)
    }
}

var hasNumber = curryingCheck(/\d+/g)
var hasLetter = curryingCheck(/[a-z]+/g)

hasNumber('test1')      // true
hasNumber('testtest')   // false
hasLetter('21212')      // false
```

- 2、延迟执行 其实`Function.prototype.bind`就是科里化的实现例子

```
function sayKey(key) {
  console.log(this[key])
}
const person = {
  name: 'Sunshine_Lin',
  age: 23
}
// call不是科里化
sayKey.call(person, 'name') // 立即输出 Sunshine_Lin
sayKey.call(person, 'age') // 立即输出 23

// bind是科里化
const say = sayKey.bind(person) // 不执行
// 想执行再执行
say('name') // Sunshine_Lin
say('age') // 23
```

### 25、什么是compose？简单实现一个？

简单的compose函数

```
const compose = (a , b) => c => a( b( c ) );
```

例子：统计单词个数

```
const space = (str) => str.split(' ')
const len = (arr) => arr.length


// 普通写法
console.log(len(space('i am linsanxin'))) // 3
console.log(len(space('i am 23 year old'))) // 5
console.log(len(space('i am a author in juejin'))) // 6


// compose写法
const compose = (...fn) => value => {
  return fn.reduce((value, fn) => {
    return fn(value)
  }, value)
}
const computedWord = compose(space, len)
console.log(computedWord('i am linsanxin')) // 3
console.log(computedWord('i am 23 year old')) // 5
console.log(computedWord('i am a author in juejin')) // 6
```

### 26、箭头函数与普通函数的区别？

- 1、箭头函数不能作为构造函数，不能new
- 2、箭头函数没有自己的this
- 3、箭头函数没有arguments对象
- 4、箭头函数没有原型对象

### 27、Symbol的应用场景？

- 使用Symbol充当属性名
- 使用Symbol充当变量
- 使用Symbol实现私有属性

### 28、AMD 和 CMD 的区别？

| 模块化 | 代表应用   | 特点                                                              |
| :----- | :--------- | :---------------------------------------------------------------- |
| AMD    | require.js | 1、AMD的api默认一个当多个用 2、依赖前置，异步执行                 |
| CMD    | sea.js     | 1、CMD的api严格区分，推崇职责单一 2、依赖就近，按需加载，同步执行 |

### 29、Commonjs 和 ES6 Module的区别？

- 1、前者是拷贝输出，后者是引用输出
- 2、前者可修改引入值，后者只读
- 3、前者是运行时，后者是编译时

### 30、为什么Commonjs不适用于浏览器

```
var math = require('math');

math.add(2, 3);
```

第二行math.add(2, 3)，在第一行require('math')之后运行，因此必须等math.js加载完成。也就是说，如果加载时间很长，整个应用就会停在那里等。

这对服务器端不是一个问题，因为所有的模块都存放在本地硬盘，可以同步加载完成，等待时间就是硬盘的读取时间。但是，对于浏览器，这却是一个大问题，因为模块都放在服务器端，等待时间取决于网速的快慢，可能要等很长时间，浏览器处于"假死"状态。

因此，浏览器端的模块，不能采用"同步加载"（synchronous），只能采用"异步加载"（asynchronous）。这就是AMD规范诞生的背景。

### 31、常用的ES6-ES12的语法有哪些？

[总结了38个ES6-ES12的开发技巧，你能拿几分？嘿嘿](http://mp.weixin.qq.com/s?__biz=Mzg2NjY2NTcyNg==&mid=2247484979&idx=1&sn=ff9fd50664a1f75a770f7e396c72fd2e&chksm=ce4613a2f9319ab4fb841798cc2fb2d17719545645a592b88f276731a3426773b3f86ee4aade&scene=21#wechat_redirect)

### 32、(a == 1 && a == 2 && a == 3) 有可能是 true 吗？

```
// 第一种
const a = {
  i: 0,
  toString() {
    return ++this.i
  }
}
console.log(a == 1 && a == 2 && a == 3) // true

// 第二种
const a = [1, 2, 3]
a.join = a.shift
console.log(a == 1 && a == 2 && a == 3) // true

// 第三种
let i = 0
Object.defineProperty(global, 'a', {
  get() {
    return ++i
  }
})
console.log(a == 1 && a == 2 && a == 3) // true
```

### 33、函数的length是多少？

`length` 是函数对象的一个属性值，指该函数有多少个必须要传入的参数，即形参的个数。形参的数量不包括剩余参数个数，仅包括第一个具有默认值之前的参数个数

### 35、JS中的 MUL 函数？

MUL表示数的简单乘法。在这种技术中，将一个值作为参数传递给一个函数，而该函数将返回另一个函数，将第二个值传递给该函数，然后重复继续。例如:x*y*z可以表示为

```
const mul = x => y => z => x * y * z

console.log(mul(1)(2)(3)) // 6
```

### 36、深度遍历广度遍历的区别？

对于算法来说 无非就是时间换空间 空间换时间

- 1、深度优先不需要记住所有的节点, 所以占用空间小, 而广度优先需要先记录所有的节点占用空间大
- 2、深度优先有回溯的操作(没有路走了需要回头)所以相对而言时间会长一点
- 3、深度优先采用的是堆栈的形式, 即先进后出
- 4、广度优先则采用的是队列的形式, 即先进先出

### 37、JS中的设计模式有哪些？

- 创建模式：该模式抽象了对象实例化过程。
- 结构型模式：这些模式处理不同的类和对象以提供新功能。
- 行为模式：也称发布-订阅模式，定义了一个被观察者和多个观察者的、一对多的对象关系。
- 并行设计模式：这些模式处理多线程编程范例。

架构设计模式：这些模式用于处理架构设计

### 38、forEach如何跳出循环？

```
function getItemById(arr, id) {
  var item = null;
  try {
    arr.forEach(function (curItem, i) {
      console.log(i)
      if (curItem.id == id) {
        item = curItem;
        throw Error();
      }
    })
  } catch (e) {}
  return item;
}
```

### 39、JS中如何将页面重定向到另一个页面？

- 1、使用 `location.href`：window.location.href =“https://www.onlineinterviewquestions.com/”)
- 2、使用 `location.replace`：window.location.replace(" https://www.onlineinterviewquestions.com/;")

### 40、实现一遍常用的JS原生方法？

后面单独出一篇文章

### 41、鼠标事件有哪些？

| 事件       | 说明                                           |
| :--------- | :--------------------------------------------- |
| click      | 单机鼠标左键触发                               |
| dbclick    | 双击鼠标左键触发                               |
| mousedown  | 单机鼠标任意一个按键都触发                     |
| mouseout   | 鼠标指针位于某个元素上且将要移出元素边界时触发 |
| mouseover  | 鼠标指针出某个元素到另一个元素上时触发         |
| mouseup    | 松开任意鼠标按键时触发                         |
| mousemove  | 鼠标在某个元素上时持续发生                     |
| mouseenter | 鼠标进入某个元素边界时触发                     |
| mouseleave | 鼠标离开某个元素边界时触发                     |

### 42、键盘事件有哪些？

> 注明：`event`对象上的`keyCode`属性，是按下的按键的`ASCLL值`，通过这个值可辨别是按下哪个按键。`ASCLL`表在此ASCII码一览表，ASCII码对照表

| 事件       | 说明                                              |
| :--------- | :------------------------------------------------ |
| onkeydown  | 某个键盘按键被按下时触发                          |
| onkeyup    | 某个键盘按键被松开时触发                          |
| onkeypress | 某个按键被按下时触发，不监听功能键，如ctrl，shift |

### 43、JS中鼠标事件的各个坐标？

| 属性    | 说明                                                                                | 兼容性            |
| :------ | :---------------------------------------------------------------------------------- | :---------------- |
| offsetX | 以当前的目标元素左上角为原点，定位x轴坐标                                           | 除Mozilla外都兼容 |
| offsetY | 以当前的目标元素左上角为原点，定位y轴坐标                                           | 除Mozilla外都兼容 |
| clientX | 以浏览器可视窗口左上角为原点，定位x轴坐标                                           | 都兼容            |
| clientY | 以浏览器可视窗口左上角为原点，定位y轴坐标                                           | 都兼容            |
| pageX   | 以doument对象左上角为原点，定位x轴坐标                                              | 除IE外都兼容      |
| pageY   | 以doument对象左上角为原点，定位y轴坐标                                              | 除IE外都兼容      |
| screenX | 以计算机屏幕左上顶角为原点，定位x轴坐标(多屏幕会影响)                               | 全兼容            |
| screenY | 以计算机屏幕左上顶角为原点，定位y轴坐标                                             | 全兼容            |
| layerX  | 最近的绝对定位的父元素（如果没有，则为 document 对象）左上顶角为元素，定位 x 轴坐标 | Mozilla 和 Safari |
| layerY  | 最近的绝对定位的父元素（如果没有，则为 document 对象）左上顶角为元素，定位 y 轴坐标 | Mozilla 和 Safari |

### 44、JS中元素视图的各个尺寸？

| 属性         | 说明                                                             |
| :----------- | :--------------------------------------------------------------- |
| offsetLeft   | 获取当前元素到定位父节点的left方向的距离                         |
| offsetTop    | 获取当前元素到定位父节点的top方向的距离                          |
| offsetWidth  | 获取当前元素 width + 左右padding + 左右border-width              |
| offsetHeight | 获取当前元素 height + 上下padding + 上下border-width             |
| clientWidth  | 获取当前元素 width + 左右padding                                 |
| clientHeight | 获取当前元素 height + 上下padding                                |
| scrollWidth  | 当前元素内容真实的宽度，内容不超出盒子宽度时为盒子的clientWidth  |
| scrollHeight | 当前元素内容真实的高度，内容不超出盒子高度时为盒子的clientHeight |

### 45、Window视图的各个尺寸？

| 属性        | 说明                                                                  |
| :---------- | :-------------------------------------------------------------------- |
| innerWidth  | innerWidth 浏览器窗口可视区宽度（不包括浏览器控制台、菜单栏、工具栏） |
| innerHeight | innerWidth 浏览器窗口可视区高度（不包括浏览器控制台、菜单栏、工具栏） |

### 46、Document文档视图的各个尺寸？

| 属性                                  | 说明                                                               |
| :------------------------------------ | :----------------------------------------------------------------- |
| document.documentElement.clientWidth  | 浏览器窗口可视区宽度（不包括浏览器控制台、菜单栏、工具栏、滚动条） |
| document.documentElement.clientHeight | 浏览器窗口可视区高度（不包括浏览器控制台、菜单栏、工具栏、滚动条） |
| document.documentElement.offsetHeight | 获取整个文档的高度（包含body的margin）                             |
| document.body.offsetHeight            | 获取整个文档的高度（不包含body的margin）                           |
| document.documentElement.scrollTop    | 返回文档的滚动top方向的距离（当窗口发生滚动时值改变）              |
| document.documentElement.scrollLeft   | 返回文档的滚动left方向的距离（当窗口发生滚动时值改变）             |

### 47、target 和 currentTarget的区别？

[e.target 和 e.currentTarget 的区别？你到底知不知道？](http://mp.weixin.qq.com/s?__biz=Mzg2NjY2NTcyNg==&mid=2247485676&idx=1&sn=457d5c900d9c4ce20a7685c57669f626&chksm=ce461d7df931946bae794365fb0e011a531b7ab86c067ace580ea5a6bc3cb0b20fc7ffde08c3&scene=21#wechat_redirect)

### 48、arguments对象

```
function fn1 () {
  console.log(arguments)
}

fn1(1, 2, 3)
// [Arguments] { '0': 1, '1': 2, '2': 3 }


const fn2 = () => {
  console.log(arguments)
}
fn2(1, 2, 3)
// arguments is not defined
```

### 49、监听ajax上传进度

```
//【上传进度调用方法实现】
xhr.upload.onprogress = progressFunction
```

### 50、['1', '2', '3'].map(parseInt)

- parseInt('1', 0)
- parseInt('2', 1)
- parseInt('3', 2)

```
[1, NaN, NaN]
```



![medium-zoom](/assets/roteLearning/javaScript/300-1714988709404-15.png)