# 10 分钟，速通 JS 性能优化

## **1. 内存管理方案**

### **1.1 全局变量导致内存泄漏问题**

使用全局变量可能会导致内存泄漏，因为它们在程序终止之前不会自动被垃圾回收。

```
// 具有全局变量的内存泄漏示例
let globalArray = [];
function addToGlobalArray(item) {
  globalArray.push(item);
}

// 使用局部变量修复这个问题
function manageArray() {
  let localArray = [];
  function addToArray(item) {
    localArray.push(item);
  }
}
```

### **1.2 闭包引发的内存泄漏**

即使外部函数已经返回，闭包仍可以保留对变量的引用，如果使用不当，可能会导致内存泄漏

```
// 闭包导致内存泄漏的场景
function outerFunction() {
  let largeArray = new Array(1000000).fill('data');
  return function innerFunction() {
    console.log(largeArray.length);
  }
}
const inner = outerFunction();
inner(); 

// 通过显示的清除方案，解决内存泄漏的问题
function outerFunction() {
  let largeArray = new Array(1000000).fill('data');
  return function innerFunction() {
    console.log(largeArray.length);
    largeArray = null; // 显示清除
  }
}
const inner = outerFunction();
inner();
```

### **1.3 事件监听导致内存泄漏问题**

当不再需要事件监听器时未能删除它们可能会导致内存泄漏

```
// 事件监听器的可能会导致内存泄漏
function addEventListenerExample() {
  document.querySelector('button').addEventListener('click', function() {
    console.log('Button clicked');
  });
}

// 手动清除监听器
function addEventListenerExample() {
  const button = document.querySelector('button');
  const clickHandler = function() {
    console.log('Button clicked');
  }
  button.addEventListener('click', clickHandler);
  // 删除监听
  button.removeEventListener('click', clickHandler);
}
```

### **1.4 DOM 节点导致的内存泄漏**

引用的已经删除的 DOM 节点可能会导致内存泄漏。当删除节点时，需要清理 DOM 引用

```
// DON 节点的引用
let element = document.createElement('div');
document.body.appendChild(element);
document.body.removeChild(element); // DOM 节点被删除

// 手动清理引用
element = null;
```

## **2. 基于 Web Worker 进行性能提升**

### **Web Worker 到底是什么？**

因为 JS 是单线程（主线程）的，这意味着它一次只能做一件事。当在主线程上运行耗时较长的任务时，那么 Web 应用可能会卡住或需要一段时间才能加载。如下伪代码：

```
<div class="box">hello</div>
for (let i = 0; i < 1000000; i++) {
  console.log(i)
}

document.querySelector('.box').innerHTML = '程序员Sunday'
```

而 `web worker` 就可以解决掉卡顿的问题。

`web worker` 可以在 “后台” 独立执行任务，类似于开启了一个 “子线程”，可以在不影响主线程的前提下，完成对应的计算。

如下基础代码（暂时不需要关心什么是 `slef`、`postMessage` 或者 `onmessage`）：

```
// worker.js
self.onmessage = () => {
 for (let i = 0; i < 1000000; i++) {
  console.log(i)
 }
}
// index.html
<script>
  const worker = new Worker('./worker.js')
  worker.postMessage(1)

  document.querySelector('.box').innerHTML = '程序员Sunday'
</script>
```

它主要具备以下四个特点：

1. **并行执行**：Web Worker 允许在不同线程中并行处理任务，不会干扰主线程的执行。这对于需要大量计算或需要处理大量数据的应用特别有用。
2. **不共享全局对象**：每个 Web Worker 都有自己的全局上下文（`self`），并且不能直接访问主线程的 DOM 或其他全局对象。它们通过消息传递来与主线程或其他 Web Workers 进行通信。
3. **线程安全**：由于 Web Workers 在自己的线程中运行，并且没有直接访问共享内存的能力，这减少了多线程编程中的常见问题（如：竞态问题）。
4. **消息传递机制**：主线程和 Web Worker 之间通过 `postMessage` 和 `onmessage` 事件来进行数据交换。主线程使用 `worker.postMessage()` 发送消息，Web Worker 使用 `self.onmessage` 处理消息。

明确好了它的特点之后，我们来逐步解析下对应的代码逻辑。

### **Web Worker 代码解析**

想要使用 Web Worker，那么需要先明确 一个变量、一个构造、两个方法：

##### **变量 `self`**

类似于 `window`。因为 Web Worker 在一个不同的全局上下文中运行，所以不是我们熟悉的 window 对象。而是使用 `self` 来代表全局上下文

##### **构造函数 `Worker`**

想要使用 Web Worker 那么必须要生成 `Worker 实例`。该构造函数接收 **一个JS文件的路径**。该路径就是书写 Web Worker 代码的位置

##### **方法一 `onmessage`**

`self` 的常用方法之一，用来监听 worker 事件启动。被 `实例.postMessage` 触发

##### **方法二 `postMessage`**

触发 `self.onmessage` 的方法。可以理解为 “启动器”。该方法 **必须** 接收一个参数

### **Web Worker 的注意事项**

使用 Web Worker 时，有两个注意事项：

1. 无法操作 DOM： **DOM 的操作必须要在主线程中进行**。因为 Web Worker 是单独开辟了线程，所以无法进行 DOM 操作
2. `Handle Errors`： Web Worker 中始终包含错误处理来捕获任何问题。

## **3. 数据结构提升 JS 性能**

选择正确的数据结构会显著影响 JavaScript 应用程序的性能。高效的数据结构可以提高搜索、排序和操作数据等操作的速度和内存使用率

```
// 基于 Set 构建唯一值的集合
const uniqueValues = new Set([1, 2, 3, 4, 5, 5, 6]);
uniqueValues.add(7);
uniqueValues.delete(3);
console.log(uniqueValues.has(2)); // true
console.log(uniqueValues.size); // 6

// 基于 Map 构建 key-value 结构
const map = new Map();
map.set('key1', 'value1');
map.set('key2', 'value2');
console.log(map.get('key1')); // 'value1'
map.delete('key2');
console.log(map.size); // 1
```

## **4. 基于 WebAssembly 处理密集任务**

WebAssembly (Wasm) 是一种二进制指令格式（文档：`https://developer.mozilla.org/zh-CN/docs/WebAssembly/Concepts`），可在 Web 上实现代码的高性能执行。它允许开发人员使用 C、C++ 和 Rust 等语言编写性能关键型代码，并与 JavaScript 一起运行。

```
// src/lib.rs
#[wasm_bindgen]
pub fn fibonacci(n: u32) -> u32 {
    match n {
        0 => 0,
        1 => 1,
        _ => fibonacci(n - 1) + fibonacci(n - 2),
    }
}
//加载和执行 WebAssembly 模块的 js 代码
fetch('fibonacci.wasm')
  .then(response => response.arrayBuffer())
  .then(bytes => WebAssembly.instantiate(bytes))
  .then(result => {
    const fibonacci = result.instance.exports.fibonacci;
    console.log(fibonacci(10)); // Output: 55
  });
```







