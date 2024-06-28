# ES7、ES8、ES9、ES10、ES11、ES12新特性大全！

##

# ES7

ES2016（ES7）中新增了如下特性👇

- `Array.prototype.includes`
- `Exponentiation Operator`

## 一、`Array.prototype.includes`

### 1.1 定义

`includes()`方法用来判断一个数组或字符串中是否包含一个指定的值

**返回值：** 如果包含返回`true`，否则返回`false`。

### 1.2 语法

- `arr.includes(valueToFind)`
- `arr.includes(valueToFind, fromIndex)`

```
let arr = [1, 2, 3, 4];
arr.includes(3);        // true
arr.includes(5);        // false
arr.includes(3, 1);     // true
```

#### 1.2.1 fromIndex大于等于数组长度

**返回`false`**

```
arr.includes(3, 3);     // false
arr.includes(3, 20);    // false
```

#### 1.2.2 计算出的索引小于0

如果`fromIndex`为负值，使用`数组长度 + fromIndex`计算出的索引作为新的`fromIndex`，如果新的`fromIndex`为负值，则搜索整个数组。

```
arr.includes(3, -100);  // true
arr.includes(3, -1);    // false
```

## 二、`Exponentiation Operator`幂运算

幂运算符`**`，相当于`Math.pow()`

```
5 ** 2                  // 25
Math.pow(5, 2)          // 25
```

# ES8

ES2017（ES8）新增了以下特性👇

- `Async functions`
- `Object.entries`
- `Object.values`
- `Object.getOwnPropertyDescriptors`
- `Trailing commas`

## 一、`Async functions`

### 1.1 定义

`Async functions` 是 `async` 声明的函数，`async` 函数是 `AsyncFunction` 构造函数的实例，其中允许使用 `await` 关键字。

### 1.2 语法

```
async function name([param[, param[, ...param]]]) {
  // statements
}
```

### 1.3 返回值

一个`Promise`

### 1.4 例子

```
const promise = () => {
  console.log('1');
  return new Promise((resolve, reject) => {
    resolve('2');
  });
};

const asyncFun = async() => {
  console.log('3');
  const test = await promise();
  console.log('4', test);
}

asyncFun();                        // 3 1 4 2
```

## 二、`Object.entries`

### 2.1 返回值

`Object.entries()`方法返回一个给定对象自身可枚举属性的键值对数组

### 2.2 语法

```
Object.entries(obj);
```

### 2.3 例子

```
let obj = {a: 1, b: 2};
Object.entries(obj);        // [['a', 1], ['b', 2]]
```

## 三、`Object.values`

### 3.1 返回值

`Object.values()`方法返回一个给定对象自身可枚举属性值的数组

### 3.2 语法

```
Object.values(obj);
```

### 3.3 例子

```
let obj = {a: 1, b: 2};
Object.values(obj);         // [1, 2]
```

## 四、`Object.getOwnPropertyDescriptors`

### 4.1 返回值

`Object.getOwnPropertyDescriptors()` 方法用来获取一个对象的所有自身属性的描述符

### 4.2 语法

```
Object.getOwnPropertyDescriptors(obj);
```

### 4.3 例子

```
let obj = {a: 1, b: 2};
Object.getOwnPropertyDescriptors(obj);   // [a: {configurable: true, enumerable: true, value: 1, writable: true}, b: {configurable: true, enumerable: true, value: 2, writable: true}]
```

## 五、`Trailing commas` 尾后逗号

### 5.1 定义

如果你想要添加新的属性，并且在上一行已经使用了尾后逗号，你可以仅仅添加新的一行，而不需要修改上一行

### 5.2 注意

- JSON 不允许尾后逗号

### 5.3 举例

- 字面量中的尾后逗号

  a: 1,b: 2}

  ```
  - 数组
  ```js
  let arr = [
  1, 
  2
  ]
  ```

- - 对象

    ```
    let obj = {
    ```

- 函数中的尾后逗号

- - 参数定义

    ```
    function(x, y) {}
    function(x, y,) {}
    (x, y) => {}
    (x, y,) => {}
    ```

  - 函数调用

    ```
    fun(x, y)
    fun(x, y,)
    ```

  - 不合法的尾后逗号

    不含参数或者在剩余参数后面加逗号，都是不合法的尾后逗号

    ```
    function(,) {}
    (,) => {}
    fn(,)
    function(...arg,) {}
    (...arg,) => {}
    ```

- 解构中的尾后逗号

  ```
  let [a, b,] = [1, 2];
  let {x, y} = {x: 1, y: 2};
  ```

- JSON中的尾后逗号

  JSON中不允许出现尾后逗号

  ```
  JSON.parse("[1, 2, 3,]")  // ❌
  JSON.parse('{"a": 1,}')   // ❌
  JSON.parse("[1, 2, 3]")   // ✅
  JSON.parse('{"a": 1}')    // ✅
  ```

## 六、`String.prototype.padStart()`

### 6.1 定义

`padStart()` 用另一个字符串填充当前字符串。

### 6.2 返回值

在原字符串**开头**填充指定的填充字符串直到目标长度所形成的新字符串。

### 6.3 语法

```
str.padStart(targetLength);
str.padStart(targetLength, padString);
```

- targetLength：当前字符串需要填充到的目标长度。如果这个数值小于当前字符串的长度，则返回当前字符串本身。
- padString（可选）：填充字符串。如果字符串太长，使填充后的字符串长度超过了目标长度，则只保留最左侧的部分，其他部分会被截断。此参数的默认值为 " "。

### 6.4 例子

```
'abc'.padStart(10);         // "       abc"
'abc'.padStart(10, "foo");  // "foofoofabc"
'abc'.padStart(6,"123465"); // "123abc"
'abc'.padStart(8, "0");     // "00000abc"
'abc'.padStart(1);          // "abc"
```

## 七、`String.prototype.padEnd()`

### 7.1 定义

padEnd() 方法会用一个字符串填充当前字符串（如果需要的话则重复填充）。

### 7.2 返回值

返回在原字符串**末尾**填充指定的填充字符串直到目标长度所形成的新字符串。

### 7.3 语法

```
str.padEnd(targetLength)
str.padEnd(targetLength, padString)
```

- targetLength：当前字符串需要填充到的目标长度。如果这个数值小于当前字符串的长度，则返回当前字符串本身。
- padString（可选）：填充字符串。如果字符串太长，使填充后的字符串长度超过了目标长度，则只保留最左侧的部分，其他部分会被截断。此参数的缺省值为 " "。

### 7.4 例子

```
'abc'.padEnd(10);          // "abc       "
'abc'.padEnd(10, "foo");   // "abcfoofoof"
'abc'.padEnd(6, "123456"); // "abc123"
'abc'.padEnd(1);           // "abc"
```

# ES9

ES2018（ES9）新增了如下特性👇

- `Async iterators` 异步迭代器
- `Object rest properties` 剩余属性
- `Object spread properties` 扩展属性
- `Promise.prototype.finally`

## 一、`Async iterators` 异步迭代器

### 1.1 返回值

`Async iterator` 对象的 next() 方法返回一个 `Promise`，这个 `Promise` 的返回值可以被解析成 `{value, done}` 的格式，

### 1.2 语法

```
iterator.next().then(({value, done}) => {});
```

### 1.3 举例

```
const asyncIterator = () => {
  const array = [1, 2];
  return {
    next: function() {
      if(array.length) {
        return Promise.resolve({
          value: array.shift(),
          done: false
        });
      }
      return Promise.resolve({
        done: true
      });
    }
  }
}

let iterator = asyncIterator();

const test = async() => {
  await iterator.next().then(console.log);  // {value: 1, done: false}
  await iterator.next().then(console.log);  // {value: 2, done: false}
  await iterator.next().then(console.log);  // {done: true}
}

test();
```

### 1.4 可以使用 `for-await-of` 在循环中异步调用函数

```
const promises = [
  new Promise((resolve) => resolve(1)),
  new Promise((resolve) => resolve(2)),
  new Promise((resolve) => resolve(3)),
];

const test = async() => {
  for await (const p of promises) {
    console.log('p', p);
  }
};

test();
```

## 二、`Object rest properties`

### 2.1 举例

```
let test = {
  a: 1,
  b: 2,
  c: 3,
  d: 4
}

let {a, b, ...rest} = test;

console.log(a);               // 1
console.log(b);               // 2
console.log(rest);            // {c: 3, d: 4}
```

### 2.2 注意

- `null` 不能使用扩展运算符

```
let {a, b, ...rest} = null;    // ❌
```

## 三、`Object spread properties`

### 3.1 举例

```
let test = {
  a: 1,
  b: 2
}
let result = {c: 3, ...test};
console.log(result);             // {c: 3, a: 1, b: 2}
let test = null;
let result = {c: 3, ...test};    // {c: 3}
```

## 四、`Promise.prototype.finally`

### 4.1 定义

在`Promise`结束的时候，不管是结果是`resolved`还是`rejected`，都会调用`finally`中的方法

`finally`中的回调函数不接受任何参数

### 4.2 返回值

一个Promise

### 4.3 语法

```
const promise = new Promise((resolve, reject) => {
  resolve('resolved');
  reject('rejectd');
})

promise.then((res) => {
  console.log(res);
}).finally(() => {
  console.log('finally')
});
```

### 4.4 举例

```
const promise = new Promise((resolve, reject) => {
  resolve(1);
  reject(2);
});

const test = () => {
  console.log(3);
  promise.then((res) => {
    console.log(4, res);
  }).catch(err => {
    console.log(5, err);
  }).finally(() => {
    console.log(6);
  });
};

test();  // 3 4 1 6
```

# ES10

ES2019（ES10）新增了如下新特性👇：

- `Array.prototype.{flat, flatMap}`扁平化嵌套数组
- `Object.fromEntries`
- `String.prototype.{trimStart, trimEnd}`
- `Symbol.prototype.description`
- `Optional catch binding`
- Array.prototype.sort() is now required to be stable

## 一、`Array.prototype.{flat, flatMap}` 扁平化嵌套数组

### 1.1 Array.prototype.flat

#### 1.1.1 定义

`flat()`方法会按照一个可指定的深度遍历递归**数组**，并将所有元素与遍历到的子数组中的元素合并为一个新数组返回。

#### 1.1.2 语法

```
arr.flat([depth]);
```

- `depth` 是数组遍历的深度，默认是1。

#### 1.1.3 返回值

一个新数组，不会改变旧数组。

#### 1.1.4 举例

```
const arr = [1, 2, [[[[3, 4]]]]];

arr.flat();          // [1, 2, [[[3, 4]]]]
arr.flat(3);         // [1, 2, [3, 4]]
arr.flat(-1);        // [1, 2, [[[[3, 4]]]]]
arr.flat(Infinity);  // [1, 2, 3, 4]
```

#### 1.1.5 注意

- `flat()`会移除数组中的空项

```
let arr = [1, 2, , , 3];
arr.flat();           // [1, 2, 3]
```

#### 1.1.6 替换

- `reduce`与`contact`

```
let arr = [1, 2, [3, 4]];
arr.reduce((arr, val) => arr.concat(val), []);
```

- `...` 扩展运算符与`contact`

```
let arr = [1, 2, [3, 4]];
[].contact(...arr);
```

更多替换方式请查看 MDN （ https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array/flat )

### 1.2 Array.prototype.flatMap

#### 1.2.1 定义

`flatMap()`方法首先使用映射函数映射数组（**深度值为1**）的每个元素，然后将结果压缩成一个新数组。

#### 1.2.2 返回值

一个新数组，并且每个元素都是回调函数的结果。

#### 1.2.3 语法

```
arr.flatMap(function callback(currentVal[, index[, array]]) {

}[, thisArg])
```

- callback: 可以生成一个新数组所调用的函数

- - currentVal: 当前数组在处理的元素
  - index: 可选，正在处理的元素索引
  - array: 可选，被调用的数组

- thisArg: 执行callback函数时使用的this值

#### 1.2.4 举例

```
let arr = ['My name', 'is', '', 'Lisa'];
let newArr1 = arr.flatMap(cur => cur.split(' '));
let newArr2 = arr.map(cur => cur.split(' '));
console.log(newArr1); // ["My", "name", "is", "", "Lisa"]
console.log(newArr2); // [["My", "name"], ["is"], [""], ["Lisa"]]
```

## 二、`Object.fromEntries`

### 2.1 定义

`fromEntries()` 方法会把键值对列表转换成一个对象

### 2.2 返回值

一个新的对象

### 2.3 语法

```
Object.fromEntries(iterable)
```

- iterable: Array、Map等可迭代对象

### 2.4 举例

```
let map = new Map([['a', 1], ['b', 2]]);
let mapToObj = Object.fromEntries(map);
console.log(mapToObj);  // {a: 1, b: 2}

let arr = [['a', 1], ['b', 2]];
let arrToObj = Object.fromEntries(arr);
console.log(arrToObj);   // {a: 1, b: 2}

let obj = {a: 1, b: 2};
let newObj = Object.fromEntries(
  Object.entries(obj).map(
    ([key, val]) => [key, val * 2]
  )
);
console.log(newObj);   // {a: 2, b: 4}
```

## 三、`String.prototype.{trimStart, trimEnd}`

### 3.1 `String.prototype.trimStart`

#### 3.1.1 定义

`trimStart()` 方法用来删除字符串的开头的空白字符。

`trimLeft()` 是它的别名。

#### 3.1.2 返回值

一个新的字符串，这个字符串左边的空格已经被去除掉了。

#### 3.1.3 语法

```
str.trimStart();
str.trimLeft();
```

#### 3.1.4 🌰 举例

```
let str = '    a b cd  ';
str.trimStart();   // 'a b cd  '
str.trimLeft();    // 'a b cd  '
```

### 3.2 `String.prototype.trimEnd`

#### 3.2.1 定义

`trimEnd()` 方法用来删除字符串末尾的空白字符。 `trimRight()` 是它的别名

#### 3.2.2 返回值

一个新的字符串，这个字符串右边的空格已经被去除了

#### 3.2.3 语法

```
str.trimEnd()
str.trimRight()
```

#### 3.2.4 举例

```
let str = '    a b cd  ';
str.trimEnd();                           // '    a b cd'
str.trimRight();                         // '    a b cd'
```

## 四、`Symbol.prototype.description`

### 4.1 定义

`description` 是一个只读属性

### 4.2 返回值

它返回Symbol对象的可选描述的字符串

### 4.3 语法

```
Symbol('myDescription').description;
Symbol.iterator.description;
Symbol.for('foo').description;
```

### 4.4 举例

```
Symbol('foo').description;      // 'foo'
Symbol().description;           // undefined
Symbol.for('foo').description;  // 'foo'
```

## 五、`Optional catch binding`

可选的捕获绑定，允许省略catch绑定和它后面的圆括号

以前的用法：

```
try {

} catch(err) {
  console.log('err', err);
}
```

ES10 的用法：

```
try {

} catch {

}
```

## 六、`JSON.stringify()` 的增强力

`JSON.stringify()` 在 ES10 修复了对于一些超出范围的 Unicode 展示错误的问题，所以遇到 0xD800-0xDFF 之内的字符会因为无法编码成 UTF-8 进而导致显示错误。在 ES10 它会用转义字符的方式来处理这部分字符而非编码的方式，这样就会正常显示了。

```
JSON.stringify('😊'); // '"😊"'
```

## 七、修订 `Function.prototype.toString()`

以前的 toString 方法来自 `Object.prototype.toString()`，现在 的 `Function.prototype.toString()` 方法返回一个表示当前函数源代码的字符串。以前只会返回这个函数，不会包含空格、注释等。

```
function foo() {
    // es10新特性
    console.log('imooc')
}
console.log(foo.toString());
// function foo() {
//     // es10新特性
//     console.log('imooc')
// }
```

# ES11

ES2020(ES11)新增了如下新特性👇：

- 空值合并运算符（Nullish coalescing Operator）
- 可选链 Optional chaining
- globalThis
- BigInt
- `String.prototype.matchAll()`
- `Promise.allSettled()`
- Dynamic import（按需 import）

## 一、空值合并运算符（Nullish coalescing Operator）

### 1.1 空值合并操作符（`??`）

**空值合并操作符**（`??`）是一个逻辑操作符，当左边的操作数为 `null` 或 `undefined` 的时候，返回其右侧操作符，否则返回左侧操作符。

```
undefined ?? 'foo'  // 'foo'
null ?? 'foo'  // 'foo'
'foo' ?? 'bar' // 'foo'
```

### 1.2 逻辑或操作符（`||`）

**逻辑或操作符**（`||`），会在左侧操作数为假值时返回右侧操作数，也就是说如果使用 `||` 来为某些变量设置默认值，可能会出现意料之外的情况。比如 0、''、NaN、false：

```
0 || 1  // 1
0 ?? 1  // 0

'' || 'bar'  // 'bar'
'' ?? 'bar'  // ''

NaN || 1  // 1
NaN ?? 1  // NaN

false || 'bar'  // 'bar'
false ?? 'bar'  // false
```

### 1.3 注意

不可以将 `??` 与 AND（`&&`）OR（`||`）一起使用，会报错。

```
null || undefined ?? "foo"; // 抛出 SyntaxError
true || undefined ?? "foo"; // 抛出 SyntaxError
```

## 二、可选链 Optional chaining

### 2.1 介绍

**可选链操作符**（`?.`）允许读取位于连接对象链深处的属性的值，而不必明确验证链中的每个引用都是否有效。`?.` 操作符的功能类似于`.`链式操作符，不同之处在于，在引用为 `null` 或 `undefined` 时不会报错，该链路表达式返回值为 `undefined`。

以前的写法：

```
const street = user && user.address && user.address.street;
const num = user && user.address && user.address.getNum && user.address.getNum();
console.log(street, num);
```

ES11 的写法：

```
const street2 = user?.address?.street;
const num2 = user?.address?.getNum?.();
console.log(street2, num2);
```

### 2.2 注意

可选链不能用于赋值：

```
let object = {};
object?.property = 1; // Uncaught SyntaxError: Invalid left-hand side in assignment
```

## 三、globalThis

以前，在 Web 中，可以通过 `window`、`self` 取到全局对象，在 node.js 中，必须使用 `global`。

在松散模式下，可以在函数中返回 `this` 来获取全局对象，但是在严格模式和模块环境下，`this` 会返回 `undefined`。

以前要获取全局对象，可以定义一个函数：

```
const getGlobal = () => {
    if (typeof self !== 'undefined') {
        return self
    }
    if (typeof window !== 'undefined') {
        return window
    }
    if (typeof global !== 'undefined') {
        return global
    }
    throw new Error('无法找到全局对象')
}

const globals = getGlobal()
console.log(globals)
```

现在 `globalThis` 提供了一个标准的方式来获取不同环境下的全局对象自身值。

## 四、BigInt

BigInt 是一种内置对象，用来创建比 2^53 - 1（Number 可创建的最大数字） 更大的整数。可以用来表示任意大的**整数**

### 4.1 如何定义一个 BigInt

- 在一个整数字面量后面加 n，例如 `10n`
- 调用函数 `BigInt()` 并传递一个整数值或字符串值，例如 `BigInt(10)`

### 4.2 BigInt 的特点

- BigInt 不能用于 Math 对象中的方法；

- BigInt 不能与任何 Number 实例混合运算，两者必须转换成同一种类型。但是需要注意，BigInt 在转换成 Number 时可能会丢失精度。

- 当使用 BigInt 时，带小数的运算会被向下取整

- BigInt 和 Number 不是严格相等，但是宽松相等

  ```
  0n === 0 // false
  0n == 0  // true
  ```

- BigInt 和 Number 可以比较

  ```
  2n > 2   // false
  2n > 1   // true
  ```

- BigInt 和 Number 可以混在一个数组中排序

  ```
  const mixed = [4n, 6, -12n, 10, 4, 0, 0n];
  mixed.sort();  // [-12n, 0, 0n, 10, 4n, 4, 6]
  ```

- 被 Object 包装的 BigInt 使用 object 的比较规则进行比较，只用同一个对象比较时才相等

  ```
  0n === Object(0n); // false
  Object(0n) === Object(0n); // false
  const o = Object(0n);
  o === o // true
  ```

### 4.3 BigInt 的方法

#### 4.3.1 BigInt.asIntN()

将 BigInt 值转换为一个 -2^(width-1) 与 2^(width-1) - 1 之间的有符号整数。

#### 4.3.2 BigInt.asUintN()

将一个 BigInt 值转换为 0 与 2^(width) - 1 之间的无符号整数。

#### 4.3.3 BigInt.prototype.toLocaleString()

返回此数字的 language-sensitive 形式的字符串。覆盖 `Object.prototype.toLocaleString()` 方法。

#### 4.3.4 BigInt.prototype.toString()

返回以指定基数 (base) 表示指定数字的字符串。覆盖 `Object.prototype.toString()` 方法。

#### 4.3.5 BigInt.prototype.valueOf()

返回指定对象的基元值。覆盖 `Object.prototype.valueOf()` 方法。

## 五、`String.prototype.matchAll()`

返回一个包含所有匹配正则表达式的结果及分组捕获组的迭代器。

```
const regexp = /t(e)(st(d?))/g;
const str = 'test1test2';

const array = [...str.matchAll(regexp)];
console.log(array[0]);  // ["test1", "e", "st1", "1"]
console.log(array[1]); // ["test2", "e", "st2", "2"]
```

## 六、`Promise.allSettled()`

类方法，返回一个在所有给定的 promise 都已经 fulfilled 或 rejected 后的 promise，并带有一个对象数组，每个对象表示对应的 promise 结果。

```
Promise.allSettled([
  Promise.resolve(33),
  new Promise((resolve) => setTimeout(() => resolve(66), 0)),
  99,
  Promise.reject(new Error("an error")),
]).then((values) => console.log(values)); 

// [
//   { status: 'fulfilled', value: 33 },
//   { status: 'fulfilled', value: 66 },
//   { status: 'fulfilled', value: 99 },
//   { status: 'rejected', reason: Error: an error }
// ]
```

## 七、Dynamic import（按需 import）

`import` 可以在需要的时候，再加载某个模块。

```
button.addEventListener('click', event => {
  import('./dialogBox.js')
  .then(dialogBox => {
    dialogBox.open();
  })
  .catch(error => {
    /* Error handling */
  })
});
```

# ES12

ES 2021（ES12）新增了如下新特性👇：

- 逻辑运算符和赋值表达式（&&=，||=，??=）
- `String.prototype.replaceAll()`
- 数字分隔符
- `Promise.any`

## 一、逻辑运算符和赋值表达式（&&=，||=，??=）

### 1.1 &&=

逻辑与赋值运算符 `x &&= y` 等价于 `x && (x=y)`：意思是当 x 为真时，x = y。

```
let a = 1;
let b = 0;

a &&= 2;
console.log(a); // 2

b &&= 2;
console.log(b);  // 0
```

### 1.2 ||=

逻辑或赋值运算符 `x ||= y` 等价于 `x || (x = y)`：意思是仅在 x 为 false 的时候，x = y。

```
const a = { duration: 50, title: '' };

a.duration ||= 10;
console.log(a.duration);  // 50

a.title ||= 'title is empty.';
console.log(a.title);  // "title is empty"
```

### 1.3 ??=

逻辑空赋值运算符 `x ??= y` 等价于 `x ?? (x = y)`：意思是仅在 x 为 null 或 undefined 的时候，x = y。

```
const a = { duration: 50 };

a.duration ??= 10;
console.log(a.duration);  // 50

a.speed ??= 25;
console.log(a.speed);  // 25
```

## 二、`String.prototype.replaceAll()`

返回一个新字符串，字符串中所有满足 pattern 的部分都会被 replacement 替换掉。原字符串保持不变。

- pattern 可以是一个字符串或 RegExp；
- replacement 可以是一个字符串或一个在每次被匹配被调用的函数。

```
'aabbcc'.replaceAll('b', '.');  // 'aa..cc'
```

使用正则表达式搜索值时，必须是全局的：

```
'aabbcc'.replaceAll(/b/, '.');  // TypeError: replaceAll must be called with a global RegExp

'aabbcc'.replaceAll(/b/g, '.');  // "aa..cc"
```

## 三、数字分隔符

ES12 允许 JavaScript 的数值使用下划线（_）作为分隔符，但是没有规定间隔的位数：

```
123_00
```

小数和科学记数法也可以使用分隔符：

```
0.1_23
1e10_00
```

⚠️ 注意：

- 不能放在数值的最前面和最后面；
- 不能将两个及两个以上的分隔符连在一起；
- 小数点的前后不能有分隔符；
- 科学记数法里，e 或 E 前后不能有分隔符。

## 四、`Promise.any`



方法接受一组 Promise 实例作为参数，包装成一个新的 Promise 实例返回。

只要参数实例有一个变成 fulfilled 状态，包装实例就会变成 fulfilled 状态；如果所有参数实例都变成 rejected 状态，包装实例就会变成 rejected 状态。

```
const promise1 = () => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve("promise1");
      //  reject("error promise1 ");
    }, 3000);
  });
};
const promise2 = () => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve("promise2");
      // reject("error promise2 ");
    }, 1000);
  });
};
const promise3 = () => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve("promise3");
      // reject("error promise3 ");
    }, 2000);
  });
};
Promise.any([promise1(), promise2(), promise3()])
  .then((first) => {
    // 只要有一个请求成功 就会返回第一个请求成功的
    console.log(first); // 会返回promise2
  })
  .catch((error) => {
    // 所有三个全部请求失败 才会来到这里
    console.log("error", error);
  });
Promise.any([promise1(), promise2(), promise3()])
  .then((first) => {
    // 只要有一个请求成功 就会返回第一个请求成功的
    console.log(first); // 会返回promise2
  })
  .catch((error) => {
    // 所有三个全部请求失败 才会来到这里
    console.log("error", error);
  });
```