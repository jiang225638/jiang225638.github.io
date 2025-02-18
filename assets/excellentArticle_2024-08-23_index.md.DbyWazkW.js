import{_ as n,c as a,o as e,ag as p}from"./chunks/framework.D_D2S754.js";const d=JSON.parse('{"title":"10 分钟，速通 JS 性能优化","description":"","frontmatter":{},"headers":[],"relativePath":"excellentArticle/2024-08-23/index.md","filePath":"excellentArticle/2024-08-23/index.md","lastUpdated":1727418873000}'),l={name:"excellentArticle/2024-08-23/index.md"};function r(i,s,c,o,t,b){return e(),a("div",null,s[0]||(s[0]=[p(`<h1 id="_10-分钟-速通-js-性能优化" tabindex="-1">10 分钟，速通 JS 性能优化 <a class="header-anchor" href="#_10-分钟-速通-js-性能优化" aria-label="Permalink to &quot;10 分钟，速通 JS 性能优化&quot;">​</a></h1><h2 id="_1-内存管理方案" tabindex="-1"><strong>1. 内存管理方案</strong> <a class="header-anchor" href="#_1-内存管理方案" aria-label="Permalink to &quot;**1. 内存管理方案**&quot;">​</a></h2><h3 id="_1-1-全局变量导致内存泄漏问题" tabindex="-1"><strong>1.1 全局变量导致内存泄漏问题</strong> <a class="header-anchor" href="#_1-1-全局变量导致内存泄漏问题" aria-label="Permalink to &quot;**1.1 全局变量导致内存泄漏问题**&quot;">​</a></h3><p>使用全局变量可能会导致内存泄漏，因为它们在程序终止之前不会自动被垃圾回收。</p><div class="language- vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>// 具有全局变量的内存泄漏示例</span></span>
<span class="line"><span>let globalArray = [];</span></span>
<span class="line"><span>function addToGlobalArray(item) {</span></span>
<span class="line"><span>  globalArray.push(item);</span></span>
<span class="line"><span>}</span></span>
<span class="line"><span></span></span>
<span class="line"><span>// 使用局部变量修复这个问题</span></span>
<span class="line"><span>function manageArray() {</span></span>
<span class="line"><span>  let localArray = [];</span></span>
<span class="line"><span>  function addToArray(item) {</span></span>
<span class="line"><span>    localArray.push(item);</span></span>
<span class="line"><span>  }</span></span>
<span class="line"><span>}</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br></div></div><h3 id="_1-2-闭包引发的内存泄漏" tabindex="-1"><strong>1.2 闭包引发的内存泄漏</strong> <a class="header-anchor" href="#_1-2-闭包引发的内存泄漏" aria-label="Permalink to &quot;**1.2 闭包引发的内存泄漏**&quot;">​</a></h3><p>即使外部函数已经返回，闭包仍可以保留对变量的引用，如果使用不当，可能会导致内存泄漏</p><div class="language- vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>// 闭包导致内存泄漏的场景</span></span>
<span class="line"><span>function outerFunction() {</span></span>
<span class="line"><span>  let largeArray = new Array(1000000).fill(&#39;data&#39;);</span></span>
<span class="line"><span>  return function innerFunction() {</span></span>
<span class="line"><span>    console.log(largeArray.length);</span></span>
<span class="line"><span>  }</span></span>
<span class="line"><span>}</span></span>
<span class="line"><span>const inner = outerFunction();</span></span>
<span class="line"><span>inner(); </span></span>
<span class="line"><span></span></span>
<span class="line"><span>// 通过显示的清除方案，解决内存泄漏的问题</span></span>
<span class="line"><span>function outerFunction() {</span></span>
<span class="line"><span>  let largeArray = new Array(1000000).fill(&#39;data&#39;);</span></span>
<span class="line"><span>  return function innerFunction() {</span></span>
<span class="line"><span>    console.log(largeArray.length);</span></span>
<span class="line"><span>    largeArray = null; // 显示清除</span></span>
<span class="line"><span>  }</span></span>
<span class="line"><span>}</span></span>
<span class="line"><span>const inner = outerFunction();</span></span>
<span class="line"><span>inner();</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br></div></div><h3 id="_1-3-事件监听导致内存泄漏问题" tabindex="-1"><strong>1.3 事件监听导致内存泄漏问题</strong> <a class="header-anchor" href="#_1-3-事件监听导致内存泄漏问题" aria-label="Permalink to &quot;**1.3 事件监听导致内存泄漏问题**&quot;">​</a></h3><p>当不再需要事件监听器时未能删除它们可能会导致内存泄漏</p><div class="language- vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>// 事件监听器的可能会导致内存泄漏</span></span>
<span class="line"><span>function addEventListenerExample() {</span></span>
<span class="line"><span>  document.querySelector(&#39;button&#39;).addEventListener(&#39;click&#39;, function() {</span></span>
<span class="line"><span>    console.log(&#39;Button clicked&#39;);</span></span>
<span class="line"><span>  });</span></span>
<span class="line"><span>}</span></span>
<span class="line"><span></span></span>
<span class="line"><span>// 手动清除监听器</span></span>
<span class="line"><span>function addEventListenerExample() {</span></span>
<span class="line"><span>  const button = document.querySelector(&#39;button&#39;);</span></span>
<span class="line"><span>  const clickHandler = function() {</span></span>
<span class="line"><span>    console.log(&#39;Button clicked&#39;);</span></span>
<span class="line"><span>  }</span></span>
<span class="line"><span>  button.addEventListener(&#39;click&#39;, clickHandler);</span></span>
<span class="line"><span>  // 删除监听</span></span>
<span class="line"><span>  button.removeEventListener(&#39;click&#39;, clickHandler);</span></span>
<span class="line"><span>}</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br></div></div><h3 id="_1-4-dom-节点导致的内存泄漏" tabindex="-1"><strong>1.4 DOM 节点导致的内存泄漏</strong> <a class="header-anchor" href="#_1-4-dom-节点导致的内存泄漏" aria-label="Permalink to &quot;**1.4 DOM 节点导致的内存泄漏**&quot;">​</a></h3><p>引用的已经删除的 DOM 节点可能会导致内存泄漏。当删除节点时，需要清理 DOM 引用</p><div class="language- vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>// DON 节点的引用</span></span>
<span class="line"><span>let element = document.createElement(&#39;div&#39;);</span></span>
<span class="line"><span>document.body.appendChild(element);</span></span>
<span class="line"><span>document.body.removeChild(element); // DOM 节点被删除</span></span>
<span class="line"><span></span></span>
<span class="line"><span>// 手动清理引用</span></span>
<span class="line"><span>element = null;</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br></div></div><h2 id="_2-基于-web-worker-进行性能提升" tabindex="-1"><strong>2. 基于 Web Worker 进行性能提升</strong> <a class="header-anchor" href="#_2-基于-web-worker-进行性能提升" aria-label="Permalink to &quot;**2. 基于 Web Worker 进行性能提升**&quot;">​</a></h2><h3 id="web-worker-到底是什么" tabindex="-1"><strong>Web Worker 到底是什么？</strong> <a class="header-anchor" href="#web-worker-到底是什么" aria-label="Permalink to &quot;**Web Worker 到底是什么？**&quot;">​</a></h3><p>因为 JS 是单线程（主线程）的，这意味着它一次只能做一件事。当在主线程上运行耗时较长的任务时，那么 Web 应用可能会卡住或需要一段时间才能加载。如下伪代码：</p><div class="language- vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>&lt;div class=&quot;box&quot;&gt;hello&lt;/div&gt;</span></span>
<span class="line"><span>for (let i = 0; i &lt; 1000000; i++) {</span></span>
<span class="line"><span>  console.log(i)</span></span>
<span class="line"><span>}</span></span>
<span class="line"><span></span></span>
<span class="line"><span>document.querySelector(&#39;.box&#39;).innerHTML = &#39;程序员Sunday&#39;</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br></div></div><p>而 <code>web worker</code> 就可以解决掉卡顿的问题。</p><p><code>web worker</code> 可以在 “后台” 独立执行任务，类似于开启了一个 “子线程”，可以在不影响主线程的前提下，完成对应的计算。</p><p>如下基础代码（暂时不需要关心什么是 <code>slef</code>、<code>postMessage</code> 或者 <code>onmessage</code>）：</p><div class="language- vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>// worker.js</span></span>
<span class="line"><span>self.onmessage = () =&gt; {</span></span>
<span class="line"><span> for (let i = 0; i &lt; 1000000; i++) {</span></span>
<span class="line"><span>  console.log(i)</span></span>
<span class="line"><span> }</span></span>
<span class="line"><span>}</span></span>
<span class="line"><span>// index.html</span></span>
<span class="line"><span>&lt;script&gt;</span></span>
<span class="line"><span>  const worker = new Worker(&#39;./worker.js&#39;)</span></span>
<span class="line"><span>  worker.postMessage(1)</span></span>
<span class="line"><span></span></span>
<span class="line"><span>  document.querySelector(&#39;.box&#39;).innerHTML = &#39;程序员Sunday&#39;</span></span>
<span class="line"><span>&lt;/script&gt;</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br></div></div><p>它主要具备以下四个特点：</p><ol><li><strong>并行执行</strong>：Web Worker 允许在不同线程中并行处理任务，不会干扰主线程的执行。这对于需要大量计算或需要处理大量数据的应用特别有用。</li><li><strong>不共享全局对象</strong>：每个 Web Worker 都有自己的全局上下文（<code>self</code>），并且不能直接访问主线程的 DOM 或其他全局对象。它们通过消息传递来与主线程或其他 Web Workers 进行通信。</li><li><strong>线程安全</strong>：由于 Web Workers 在自己的线程中运行，并且没有直接访问共享内存的能力，这减少了多线程编程中的常见问题（如：竞态问题）。</li><li><strong>消息传递机制</strong>：主线程和 Web Worker 之间通过 <code>postMessage</code> 和 <code>onmessage</code> 事件来进行数据交换。主线程使用 <code>worker.postMessage()</code> 发送消息，Web Worker 使用 <code>self.onmessage</code> 处理消息。</li></ol><p>明确好了它的特点之后，我们来逐步解析下对应的代码逻辑。</p><h3 id="web-worker-代码解析" tabindex="-1"><strong>Web Worker 代码解析</strong> <a class="header-anchor" href="#web-worker-代码解析" aria-label="Permalink to &quot;**Web Worker 代码解析**&quot;">​</a></h3><p>想要使用 Web Worker，那么需要先明确 一个变量、一个构造、两个方法：</p><h5 id="变量-self" tabindex="-1"><strong>变量 <code>self</code></strong> <a class="header-anchor" href="#变量-self" aria-label="Permalink to &quot;**变量 \`self\`**&quot;">​</a></h5><p>类似于 <code>window</code>。因为 Web Worker 在一个不同的全局上下文中运行，所以不是我们熟悉的 window 对象。而是使用 <code>self</code> 来代表全局上下文</p><h5 id="构造函数-worker" tabindex="-1"><strong>构造函数 <code>Worker</code></strong> <a class="header-anchor" href="#构造函数-worker" aria-label="Permalink to &quot;**构造函数 \`Worker\`**&quot;">​</a></h5><p>想要使用 Web Worker 那么必须要生成 <code>Worker 实例</code>。该构造函数接收 <strong>一个JS文件的路径</strong>。该路径就是书写 Web Worker 代码的位置</p><h5 id="方法一-onmessage" tabindex="-1"><strong>方法一 <code>onmessage</code></strong> <a class="header-anchor" href="#方法一-onmessage" aria-label="Permalink to &quot;**方法一 \`onmessage\`**&quot;">​</a></h5><p><code>self</code> 的常用方法之一，用来监听 worker 事件启动。被 <code>实例.postMessage</code> 触发</p><h5 id="方法二-postmessage" tabindex="-1"><strong>方法二 <code>postMessage</code></strong> <a class="header-anchor" href="#方法二-postmessage" aria-label="Permalink to &quot;**方法二 \`postMessage\`**&quot;">​</a></h5><p>触发 <code>self.onmessage</code> 的方法。可以理解为 “启动器”。该方法 <strong>必须</strong> 接收一个参数</p><h3 id="web-worker-的注意事项" tabindex="-1"><strong>Web Worker 的注意事项</strong> <a class="header-anchor" href="#web-worker-的注意事项" aria-label="Permalink to &quot;**Web Worker 的注意事项**&quot;">​</a></h3><p>使用 Web Worker 时，有两个注意事项：</p><ol><li>无法操作 DOM： <strong>DOM 的操作必须要在主线程中进行</strong>。因为 Web Worker 是单独开辟了线程，所以无法进行 DOM 操作</li><li><code>Handle Errors</code>： Web Worker 中始终包含错误处理来捕获任何问题。</li></ol><h2 id="_3-数据结构提升-js-性能" tabindex="-1"><strong>3. 数据结构提升 JS 性能</strong> <a class="header-anchor" href="#_3-数据结构提升-js-性能" aria-label="Permalink to &quot;**3. 数据结构提升 JS 性能**&quot;">​</a></h2><p>选择正确的数据结构会显著影响 JavaScript 应用程序的性能。高效的数据结构可以提高搜索、排序和操作数据等操作的速度和内存使用率</p><div class="language- vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>// 基于 Set 构建唯一值的集合</span></span>
<span class="line"><span>const uniqueValues = new Set([1, 2, 3, 4, 5, 5, 6]);</span></span>
<span class="line"><span>uniqueValues.add(7);</span></span>
<span class="line"><span>uniqueValues.delete(3);</span></span>
<span class="line"><span>console.log(uniqueValues.has(2)); // true</span></span>
<span class="line"><span>console.log(uniqueValues.size); // 6</span></span>
<span class="line"><span></span></span>
<span class="line"><span>// 基于 Map 构建 key-value 结构</span></span>
<span class="line"><span>const map = new Map();</span></span>
<span class="line"><span>map.set(&#39;key1&#39;, &#39;value1&#39;);</span></span>
<span class="line"><span>map.set(&#39;key2&#39;, &#39;value2&#39;);</span></span>
<span class="line"><span>console.log(map.get(&#39;key1&#39;)); // &#39;value1&#39;</span></span>
<span class="line"><span>map.delete(&#39;key2&#39;);</span></span>
<span class="line"><span>console.log(map.size); // 1</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br></div></div><h2 id="_4-基于-webassembly-处理密集任务" tabindex="-1"><strong>4. 基于 WebAssembly 处理密集任务</strong> <a class="header-anchor" href="#_4-基于-webassembly-处理密集任务" aria-label="Permalink to &quot;**4. 基于 WebAssembly 处理密集任务**&quot;">​</a></h2><p>WebAssembly (Wasm) 是一种二进制指令格式（文档：<code>https://developer.mozilla.org/zh-CN/docs/WebAssembly/Concepts</code>），可在 Web 上实现代码的高性能执行。它允许开发人员使用 C、C++ 和 Rust 等语言编写性能关键型代码，并与 JavaScript 一起运行。</p><div class="language- vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>// src/lib.rs</span></span>
<span class="line"><span>#[wasm_bindgen]</span></span>
<span class="line"><span>pub fn fibonacci(n: u32) -&gt; u32 {</span></span>
<span class="line"><span>    match n {</span></span>
<span class="line"><span>        0 =&gt; 0,</span></span>
<span class="line"><span>        1 =&gt; 1,</span></span>
<span class="line"><span>        _ =&gt; fibonacci(n - 1) + fibonacci(n - 2),</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span>}</span></span>
<span class="line"><span>//加载和执行 WebAssembly 模块的 js 代码</span></span>
<span class="line"><span>fetch(&#39;fibonacci.wasm&#39;)</span></span>
<span class="line"><span>  .then(response =&gt; response.arrayBuffer())</span></span>
<span class="line"><span>  .then(bytes =&gt; WebAssembly.instantiate(bytes))</span></span>
<span class="line"><span>  .then(result =&gt; {</span></span>
<span class="line"><span>    const fibonacci = result.instance.exports.fibonacci;</span></span>
<span class="line"><span>    console.log(fibonacci(10)); // Output: 55</span></span>
<span class="line"><span>  });</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br></div></div>`,44)]))}const m=n(l,[["render",r]]);export{d as __pageData,m as default};
