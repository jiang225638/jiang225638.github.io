# 大大提高开发效率的10个JavaScript技巧

![img](/assets/js/accumulate/0.jpeg)

一位深漂的00后程序媛，校招拿了小米、富途等11家互联网公司offer，深知编码不易，故本公众号专注于分享编码经验、技术干货、面试经验，偶尔分享深漂日常、工作心得、实用书籍等，期待您的关注。

JavaScript 是前端开发中的必备语言。但是我发现很多同学对于 JavaScript 的技巧使用却并不熟悉。所以，今天咱们就来分享一下 JavaScript 的10个好用的技巧，帮你更好地使用 JavaScript，提升开发效率！

## **1. 使用 flatMap**

有些 **JavaScript** 方法尽管鲜为人知，但它们解决独特挑战的潜力能够增强编码效率， 比如 `flatMap()`

数组方法 `flatMap()` 本质上是 `map()`和 `flat()` 的组合，区别在于 `flatMap` 只能扁平1级，flat 可以指定需要扁平的级数，flatmap 比分别调用这两个方法稍微高效一些。

- 使用 **flat + map**

```
const arr = [1, 2, [4, 5], 6, 7, [8]];
// 使用 map 对每个元素进行操作并用 flat 展平结果
const result = arr.map(element => Array.isArray(element) ? element : [element]).flat();
console.log(result); // output: [1, 2, 4, 5, 6, 7, 8]
```

- 使用 **flatmap**

```
const arr = [1, 2, [4, 5], 6, 7, [8]] ;
console.log(arr.flatMap((element) => element)); 
// output :[1, 2, 4, 5, 6, 7, 8]
```

flatmap 尽管是一个方法，但也会有 **中间数组 \(指中间创建了必须进行垃圾收集的临时数组\)**[1]的产生，flatMap 非常适合在需要灵活性和可读性的情况下使用。

## **2. console 的妙用**

**console** 并不只有 `console.log()`, 实际生产中都会使用已经封装好的log库，而 **控制台对象 console** 实际上内置了许多非常有用的方法，帮助您提高调试输出的质量和可读性，掌握它们能使您更轻松地 **debug** 和修复代码中的问题。

```
// 1. console.time 和 console.timeEnd
// 测量执行一段代码所需的时间。识别代码中的性能瓶颈并对其进行优化
console.time('开始获取数据');
fetch('https://reqres.in/api/users')
 .then(response => response.json())
 .then(data => {
 console.timeEnd('获取数据花费时间：');
 // ...code
 });
  
// 2. console.dir
// console.dir 方法以分层格式输出对象的属性。方便查看对象的结构以及其所有属性和方法
const promise = new Promise((resolve, reject) => resolve('foo'));
console.dir(promise);
// 3. console.count
// console.count 方法来计算特定日志消息的输出次数。这对于跟踪特定代码路径的执行次数以及识别代码中的热点非常有用
const fun = (x) => console.count(x);
fun('刻晴'); // 1
fun('甘雨'); // 1
fun('刻晴'); // 2
// 4. console.trace
// trace 可以输出堆栈跟踪。对于理解代码中的执行流程以及识别特定日志消息的来源非常有用
const foo = () => console.trace();
const bar = () => foo();
bar();
// 5. console.profile profileEnd
// 测量代码块的性能。这对于识别性能瓶颈以及优化代码以提高速度和效率非常有用。
console.profile('MyProfile');
// 想要测量性能的代码
for (let i = 0; i < 100000; i++) {
 // ...code
}
console.profileEnd('MyProfile');
```

## **3. 深拷贝 structuredClone()**

此前，如果开发人员想要深拷贝对象，经常需要依赖第三方库来实现或者手动实现一个神拷贝，或者采取 `const cloneObj = JSON.parse(JSON.stringify(obj));` 的 hack， 但其在处理**包含循环引用**或**不符合 JSON 的数据类型（如 Map 和 Set，Blob 等 ）** 的更复杂对象时，是有很多不足之处的

而现在，**JavaScript** 内置了一个 **structuredClone()** 的方法， 此方法提供了一种简单有效的方法来深度克隆对象， 且适用于大多数现代浏览器和 Node.js v17 以上

```
// 将原始对象传递给该函数， 它将返回一个具有不同引用和对象属性引用的深层副本
const obj = { name: 'Mike', friends: [{ name: 'Sam' }] };
const clonedObj = structuredClone(obj);
console.log(obj.name === clonedObj); // false
console.log(obj.friends === clonedObj.friends); // false
```

与众所周知的 `JSON.parse(JSON.stringify())”` 不同， `structuredClone()` 允许您克隆循环引用，这是目前在 **JavaScript** 中使用深拷贝最简单的方法。

## **4. 带标签的模板**

> ❝
>
> **带标签的模板**(**Tagged\_Templates**[2]) - 是模板字符串(反引号)的一种更高级的形式，它允许你使用函数解析模板字面量。

这个高级特性我也是在 **Next.js 14**[3] 发布后人们都在讨论的一张图才去了解的🫡，尽管这个特性是 **ES6** 就有的，至今已有**8年**！！！但我敢打赌知道这个并使用过这个特性的人屈指可数。

相信许多人已经见过下图(因为这个知识点请停止嘲笑 😝Next.js 14)， 相信许多人的第一反应就是回到二十年前 **PHP** 时代并且代码容易遭受 **sql 注入攻击** ， 但实际上是安全的。这得益于模板字符串的高级特性 - ( **带标签的模板 \-Tagged\_Templates**[4])

如果你不理解 **Tagged_Templates** 如何工作， 那么就让我用一个例子来简单说明下吧：

```
const checkCurrency = function (currency, amount) {
 const symbol = currency[0] === "USD" ? "$" : "¥";
 console.log(currency[0], "--" ,currency[1])// Outputs: USD -- RMB
 return `${symbol}${amount}`;
};
const amount = 200;
const currency = checkCurrency`USD${amount}RMB`;
console.log(currency); // Outputs: $200
// 1. checkCurrency是一个函数，标签函数的第一个参数currency包含一个字符串值数组
// 2. 字符串数组由标签模板里的字符串组成，在`USD${amount}RMB`里，字符串有USD和RMB
// 3. 因此 currency[0] 为第一个字符串 USD， currency[1] 则是第二个字符串 RMB
// 3. checkCurrency函数的其余参数则根据表达式直接插入到字符串中，如 amount = 200
// 4. 在checkCurrency函数的内部，判断第一个参数数组首项是否是‘USD’，是则选择"$"符号，否则是 "¥"
// 5. 函数内部将symbol和amount结合在一起返回一个新的字符串，symbol代表货币符号，而amount代表传递给函数的金额。
// 6. 返回的字符串赋值给 currency 常量， 因此 log为 $200
```

可以看到，**Tagged Templates** 的工作方式是将模板字符串里的所有字符串作为一个数组传递给函数的第一个参数，其余参数则根据相应的表达式直接插入到字符串中，**Tagged Templates**将 文字字符串 和表达式的结果 传递给函数，然后该函数可以以自定义方式操作并返回它们。这样开发者在构建 SQL 查询时，`对输入进行适当的转义和验证，从而避免 SQL 注入攻击`。

**带标签的模板字符串**可用于很多用途，例如 **安全性**、**i18n和本地化** 等。

## **5. 使用Symbols作为WeakMap的键**

`WeakMap` 和 `Map` 很像，但不同点在于它的**键(key)** 只能是**对象 Objects 和 symbol**，这些键被作为**弱引用存储(weakly)**。

为什么？因为 **WeakMap** 的键必须是可垃圾回收的。大多数原始数据类型可以任意创建并且没有生命周期，因此它们不能用作键, 而 **对象Objects** 和 **non-registered symbols** 可以用作键，因为它们是垃圾可收集的 - **MDN- WeakMap**[5]。

> ❝
>
> 这个特性意味着除了键之外内存中没有其他对对象的引用，**JavaScript** 引擎可以在需要时**对对象执行垃圾回收**。

```
// map
let user = { name: "User" };
let map = new Map();
map.set(user, "刻晴");
user = null; // 置null来覆盖引用，'user'被存在 map 的内部，通过 map.keys() 获取
// WeakMap
let user = { name: "User" };
let weakMap = new WeakMap();
weakMap.set(user, "甘雨");
user = null; // 使用 WeakMap，'user' 已经被从内存中删除
```

好了，那 **WeakMap** 到底有什么作用呢？根据其特点可以联想到 **WeakMap** 的用途可以是`自定义缓存`以及`检测内存泄漏`。

通过使用对象作为键，您可以将缓存的值与特定对象相关联。当对象被垃圾收集时，相应的 **WeakMap** 条目将被自动删除，立即清除缓存。

在 **ES14** 中， 使用 **symbol** 作为 **WeakMap** 的 **key** 已经成为可能， 这可以使**键值对**在 **WeakMap** 中扮演的角色更加清晰。因为**唯一能在 WeakMap 中被作为 key 使用的原始类型只有 symbol**， **symbol** 能保证 **key** 是 唯一的并且无法重新创建。

```
let mySymbol = Symbol('mySymbol');
let myWeakMap = new WeakMap();
let obj = {
 name: '写前端的刻猫猫'
};
myWeakMap.set(mySymbol, obj);
console.log(myWeakMap.get(mySymbol)); // Output: {name: '写前端的刻猫猫'}
```

## **6. 充分使用 generator**

**生成器 (Generator)** 和 **迭代器 (iterators)** 可能是 **JavaScript** 开发人员最不常使用的代码，其知识仅限于编码面试。（因为有更好用的语法糖 `async/await` ？😂）

> ❝
>
> **生成器 (Generator)** 是控制异步编程、生成可迭代对象和生成多个值的强大方法。生成器与传统函数不同。他们可以多次启动和停止执行。这使它们能够产生大量值并在以后继续执行，从而使它们非常适合管理异步操作、构造迭代器和处理无尽的数据流。

试想一下，假如在一个获取数据的场景下，**数据库/ API 的数据量可能是无限的**，而你必须将它们传输到前端，你会怎么做呢？

这种情况下， **react** 中最常用的方案就是无限加载方案， 如果是**在 node 中**或者**原生JS**，你该如何实现**无限加载之类的功能**。

```
async function *fetchProducts(){
 while (true){
 const productUrl = "https://fakestoreapi.com/products?limit=2";
 const res = await fetch(productUrl)
 const data = await res.json()
 yield data;
 // 在这里操作用户界面
 // 或将其保存在数据库或其他地方
 // 将其用作副作用的地方
 // 即使某些条件匹配，也中断流程
 }
}
async function main() {
 const itr = fetchProducts();
 // 这应该根据用户交互来调用
 // 或者其他技巧，因为您不希望出现无限加载。
 console.log( await itr.next() );
}
return main()
```

这就是 **迭代器 (iterators)** 真正有用的地方，而不是将请求的大量数据流式传输到本地存储或者某些位置。这是使用 **异步生成器(async generators)** 执行此操作的这样之一， 这样我们就可以解决JS中的无限加载问题。

## **7. 私有类字段**

现在，JavaScript类支持使用#符号的私有字段。

私有字段不能从类外部访问，从而提供封装和信息隐藏。

```
class Counter {
  #count = 0;

  increment() {
    this.#count++;
  }

  getCount() {
    return this.#count;
  }
}

const counter = new Counter();
counter.increment();
console.log(counter.getCount()); // 1
```

## **8. Promise.allSettled()**

Promise.allSettled() 方法返回一个 Promise，该 Promise 在所有给定的 Promise 已经 resolve 或 reject 后 resolve，提供每个 Promise 的结果数组。

```
const promises = [
  Promise.resolve('Resolved'),
  Promise.reject('Rejected')
];

Promise.allSettled(promises)
  .then(results => {
    console.log(results);
  });
// [{ status: "fulfilled", value: "Resolved" }, { status: "rejected", reason: "Rejected" }]
```

## **9. globalThis 全局对象**

globalThis对象提供了一种在不同环境下（包括浏览器和Node.js）访问全局对象的一致方式。

```
console.log(globalThis === window); // 在浏览器场景下: true
console.log(globalThis === global); // 在 Node.js 中: outputs: true
```

## **10. 代理**

代理对象允许你为基本对象操作创建自定义行为。

它允许截获和修改对象操作，例如访问属性、赋值和调用方法。

```
const handler = {
  get: function (obj, prop) {
    return prop in obj ? obj[prop] : 37;
  },
};

const p = new Proxy({}, handler);
p.a = 1;
p.b = undefined;

console.log(p.a, p.b); // 1, undefined
console.log("c" in p, p.c); // false, 37
```

**Reference**

[1]

https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/flatMap#description: https://link.juejin.cn?target=https%3A%2F%2Fdeveloper.mozilla.org%2Fen-US%2Fdocs%2FWeb%2FJavaScript%2FReference%2FGlobal_Objects%2FArray%2FflatMap%23description

[2]

https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Template_literals#tagged_templates: https://link.juejin.cn?target=https%3A%2F%2Fdeveloper.mozilla.org%2Fen-US%2Fdocs%2FWeb%2FJavaScript%2FReference%2FTemplate_literals%23tagged_templates

[3]

https://nextjs.org/: https://link.juejin.cn?target=https%3A%2F%2Fnextjs.org%2F

[4]

https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Template_literals#tagged_templates: https://link.juejin.cn?target=https%3A%2F%2Fdeveloper.mozilla.org%2Fen-US%2Fdocs%2FWeb%2FJavaScript%2FReference%2FTemplate_literals%23tagged_templates

[5]

https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/WeakMap: https://link.juejin.cn?target=https%3A%2F%2Fdeveloper.mozilla.org%2Fen-US%2Fdocs%2FWeb%2FJavaScript%2FReference%2FGlobal_Objects%2FWeakMap