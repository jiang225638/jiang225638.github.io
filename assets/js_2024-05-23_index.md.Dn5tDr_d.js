import{_ as s,c as n,o as a,a5 as p}from"./chunks/framework.BDI1X2MA.js";const d=JSON.parse('{"title":"万字总结 JS 数据结构与常用的算法","description":"","frontmatter":{},"headers":[],"relativePath":"js/2024-05-23/index.md","filePath":"js/2024-05-23/index.md","lastUpdated":1716449060000}'),l={name:"js/2024-05-23/index.md"},e=p(`<h1 id="万字总结-js-数据结构与常用的算法" tabindex="-1">万字总结 JS 数据结构与常用的算法 <a class="header-anchor" href="#万字总结-js-数据结构与常用的算法" aria-label="Permalink to &quot;万字总结 JS 数据结构与常用的算法&quot;">​</a></h1><h1 id="一、前言" tabindex="-1"><strong>一、前言</strong> <a class="header-anchor" href="#一、前言" aria-label="Permalink to &quot;**一、前言**&quot;">​</a></h1><p>首先，为什么我会学习数据结构与算法呢，其实主要是有两方面</p><ul><li>第一，是我在今年的flag里明确说到我会学这个东西</li><li>第二，学了这些，对自己以后在工作或者面试也会带来许多好处</li></ul><p>然后，本文是最近学习的一个<code>总结文章</code>，文中的算法题，<strong>大部分都是leetcode中</strong>的，如不太理解题意，可直接去leetcode中找到对应的题。</p><h1 id="二、基本概念" tabindex="-1"><strong>二、基本概念</strong> <a class="header-anchor" href="#二、基本概念" aria-label="Permalink to &quot;**二、基本概念**&quot;">​</a></h1><p>常常听到算法的时候，就会有人说到 <strong>时间复杂度</strong>， <strong>空间复杂度</strong>。那么这俩玩意是啥呢，下面我们就来一一解释</p><h2 id="_1-时间复杂度" tabindex="-1">1. 时间复杂度 <a class="header-anchor" href="#_1-时间复杂度" aria-label="Permalink to &quot;1. 时间复杂度&quot;">​</a></h2><p>其实就是一个函数，用大 O 表示， 比如 O(1)、 O(n)...</p><p>它的作用就是用来<code>定义描述算法的运行时间</code></p><ul><li><strong>O(1)</strong></li></ul><div class="language- vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span>    let i = 0</span></span>
<span class="line"><span>    i += 1</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br></div></div><ul><li><strong>O(n)：</strong> 如果是 O(1) + O(n) 则还是 O(n)</li></ul><div class="language- vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span>    for (let i = 0; i &lt; n; i += 1) {</span></span>
<span class="line"><span>      console.log(i)</span></span>
<span class="line"><span>    }</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br></div></div><ul><li><strong>O(n^2)：</strong> O(n) * O(n), 也就是双层循环，自此类推：O(n^3)...</li></ul><div class="language- vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span>    for (let i = 0; i &lt; n; i += 1) {</span></span>
<span class="line"><span>      for (let j = 0; j &lt; n; j += 1) {</span></span>
<span class="line"><span>        console.log(i, j)</span></span>
<span class="line"><span>      }</span></span>
<span class="line"><span>    }</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br></div></div><ul><li><strong>O(logn)：</strong> 就是求 log 以 2 为底的多少次方等于 n</li></ul><div class="language- vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span>    // 这个例子就是求2的多少次方会大于i，然后就会结束循环。 这就是一个典型的 O(logn)</span></span>
<span class="line"><span>    let i = 1</span></span>
<span class="line"><span>    while (i &lt; n) {</span></span>
<span class="line"><span>      console.log(i)</span></span>
<span class="line"><span>      i *= 2</span></span>
<span class="line"><span>    }</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br></div></div><h2 id="_2-空间复杂度" tabindex="-1">2. 空间复杂度 <a class="header-anchor" href="#_2-空间复杂度" aria-label="Permalink to &quot;2. 空间复杂度&quot;">​</a></h2><p>和时间复杂度一样，空间复杂度也是用大 O 表示，比如 O(1)、 O(n)...</p><p>它用来<code>定义描述算法运行过程中临时占用的存储空间大小</code></p><blockquote><p>占用越少 代码写的就越好</p></blockquote><ul><li><strong>O(1)：</strong> 单个变量，所以占用永远是 O(1)</li></ul><div class="language- vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span>    let i = 0</span></span>
<span class="line"><span>    i += 1</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br></div></div><ul><li><strong>O(n)：</strong> 声明一个数组， 添加 n 个值， 相当于占用了 n 个空间单元</li></ul><div class="language- vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span>    const arr = []</span></span>
<span class="line"><span>    for (let i = 0; i &lt; n; i += 1) {</span></span>
<span class="line"><span>      arr.push(i)</span></span>
<span class="line"><span>    }</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br></div></div><ul><li><strong>O(n^2)：</strong> 类似一个矩阵的概念，就是二维数组的意思</li></ul><div class="language- vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span>    const arr = []</span></span>
<span class="line"><span>    for (let i = 0; i &lt; n; i += 1) {</span></span>
<span class="line"><span>      arr.push([])</span></span>
<span class="line"><span>      for (let j = 0; j &lt; n; j += 1) {</span></span>
<span class="line"><span>        arr[i].push(j)</span></span>
<span class="line"><span>      }</span></span>
<span class="line"><span>    }</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br></div></div><h1 id="三、数据结构" tabindex="-1"><strong>三、数据结构</strong> <a class="header-anchor" href="#三、数据结构" aria-label="Permalink to &quot;**三、数据结构**&quot;">​</a></h1><h2 id="_1-栈" tabindex="-1">1. 栈 <a class="header-anchor" href="#_1-栈" aria-label="Permalink to &quot;1. 栈&quot;">​</a></h2><p>一个<code>后进先出</code>的数据结构</p><p>按照常识理解就是有序的挤公交，<strong>最后上车</strong>的人会在门口，然后门口的人会<strong>最先下车</strong></p><p>![图片](data:image/svg+xml,%3C%3Fxml version=&#39;1.0&#39; encoding=&#39;UTF-8&#39;%3F%3E%3Csvg width=&#39;1px&#39; height=&#39;1px&#39; viewBox=&#39;0 0 1 1&#39; version=&#39;1.1&#39; xmlns=&#39;<a href="http://www.w3.org/2000/svg" target="_blank" rel="noreferrer">http://www.w3.org/2000/svg</a>&#39; xmlns:xlink=&#39;<a href="http://www.w3.org/1999/xlink" target="_blank" rel="noreferrer">http://www.w3.org/1999/xlink</a>&#39;%3E%3Ctitle%3E%3C/title%3E%3Cg stroke=&#39;none&#39; stroke-width=&#39;1&#39; fill=&#39;none&#39; fill-rule=&#39;evenodd&#39; fill-opacity=&#39;0&#39;%3E%3Cg transform=&#39;translate(-249.000000, -126.000000)&#39; fill=&#39;%23FFFFFF&#39;%3E%3Crect x=&#39;249&#39; y=&#39;126&#39; width=&#39;1&#39; height=&#39;1&#39;%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)</p><blockquote><p>js中没有栈的数据类型，但我们可以通过<strong>Array来模拟一个</strong></p></blockquote><div class="language- vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span>const stack = [];</span></span>
<span class="line"><span></span></span>
<span class="line"><span>stack.push(1); // 入栈</span></span>
<span class="line"><span>stack.push(2); // 入栈</span></span>
<span class="line"><span></span></span>
<span class="line"><span>const item1 = stack.pop();  //出栈的元素</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br></div></div><h3 id="_1-十进制转二进制" tabindex="-1">1）十进制转二进制 <a class="header-anchor" href="#_1-十进制转二进制" aria-label="Permalink to &quot;1）十进制转二进制&quot;">​</a></h3><div class="language- vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span>// 时间复杂度 O(n) n为二进制的长度</span></span>
<span class="line"><span>// 空间复杂度 O(n) n为二进制的长度</span></span>
<span class="line"><span>const dec2bin = (dec) =&gt; {</span></span>
<span class="line"><span>  // 创建一个字符串</span></span>
<span class="line"><span>  let res = &quot;&quot;;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>  // 创建一个栈</span></span>
<span class="line"><span>  let stack = []</span></span>
<span class="line"><span></span></span>
<span class="line"><span>  // 遍历数字 如果大于0 就可以继续转换2进制</span></span>
<span class="line"><span>  while (dec &gt; 0) {</span></span>
<span class="line"><span>    // 将数字的余数入栈</span></span>
<span class="line"><span>    stack.push(dec % 2);</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    // 除以2</span></span>
<span class="line"><span>    dec = dec &gt;&gt; 1;</span></span>
<span class="line"><span>  }</span></span>
<span class="line"><span></span></span>
<span class="line"><span>  // 取出栈中的数字</span></span>
<span class="line"><span>  while (stack.length) {</span></span>
<span class="line"><span>    res += stack.pop();</span></span>
<span class="line"><span>  }</span></span>
<span class="line"><span></span></span>
<span class="line"><span>  // 返回这个字符串</span></span>
<span class="line"><span>  return res;</span></span>
<span class="line"><span>};</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br><span class="line-number">22</span><br><span class="line-number">23</span><br><span class="line-number">24</span><br><span class="line-number">25</span><br><span class="line-number">26</span><br></div></div><h3 id="_2-判断字符串的有效括号" tabindex="-1">2）判断字符串的有效括号 <a class="header-anchor" href="#_2-判断字符串的有效括号" aria-label="Permalink to &quot;2）判断字符串的有效括号&quot;">​</a></h3><div class="language- vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span>// 时间复杂度O(n) n为s的length</span></span>
<span class="line"><span>// 空间复杂度O(n)</span></span>
<span class="line"><span>const isValid = (s) =&gt; {</span></span>
<span class="line"><span></span></span>
<span class="line"><span>  // 如果长度不等于2的倍数肯定不是一个有效的括号</span></span>
<span class="line"><span>  if (s.length % 2 === 1) return false;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>  // 创建一个栈</span></span>
<span class="line"><span>  let stack = [];</span></span>
<span class="line"><span></span></span>
<span class="line"><span>  // 遍历字符串</span></span>
<span class="line"><span>  for (let i = 0; i &lt; s.length; i++) {</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    const c = s[i];</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    // 如果是左括号就入栈</span></span>
<span class="line"><span>    if (c === &#39;(&#39; || c === &quot;{&quot; || c === &quot;[&quot;) {</span></span>
<span class="line"><span>      stack.push(c);</span></span>
<span class="line"><span>    } else {</span></span>
<span class="line"><span></span></span>
<span class="line"><span>      // 如果不是左括号 且栈为空 肯定不是一个有效的括号 返回false</span></span>
<span class="line"><span>      if (!stack.length) return false</span></span>
<span class="line"><span></span></span>
<span class="line"><span>      // 拿到最后一个左括号</span></span>
<span class="line"><span>      const top = stack[stack.length - 1];</span></span>
<span class="line"><span></span></span>
<span class="line"><span>      // 如果是右括号和左括号能匹配就出栈</span></span>
<span class="line"><span>      if ((top === &quot;(&quot; &amp;&amp; c === &quot;)&quot;) || (top === &quot;{&quot; &amp;&amp; c === &quot;}&quot;) || (top === &quot;[&quot; &amp;&amp; c === &quot;]&quot;)) {</span></span>
<span class="line"><span>        stack.pop();</span></span>
<span class="line"><span>      } else {</span></span>
<span class="line"><span></span></span>
<span class="line"><span>        // 否则就不是一个有效的括号</span></span>
<span class="line"><span>        return false</span></span>
<span class="line"><span>      }</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span></span></span>
<span class="line"><span>  }</span></span>
<span class="line"><span>  return stack.length === 0;</span></span>
<span class="line"><span>};</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br><span class="line-number">22</span><br><span class="line-number">23</span><br><span class="line-number">24</span><br><span class="line-number">25</span><br><span class="line-number">26</span><br><span class="line-number">27</span><br><span class="line-number">28</span><br><span class="line-number">29</span><br><span class="line-number">30</span><br><span class="line-number">31</span><br><span class="line-number">32</span><br><span class="line-number">33</span><br><span class="line-number">34</span><br><span class="line-number">35</span><br><span class="line-number">36</span><br><span class="line-number">37</span><br><span class="line-number">38</span><br><span class="line-number">39</span><br></div></div><h2 id="_2-队列" tabindex="-1">2. 队列 <a class="header-anchor" href="#_2-队列" aria-label="Permalink to &quot;2. 队列&quot;">​</a></h2><p>和栈相反 <code>先进先出</code>的一个数据结构</p><p>按照常识理解就是银行排号办理业务, <strong>先去</strong>领号排队的人, <strong>先办理</strong>业务</p><p>![图片](data:image/svg+xml,%3C%3Fxml version=&#39;1.0&#39; encoding=&#39;UTF-8&#39;%3F%3E%3Csvg width=&#39;1px&#39; height=&#39;1px&#39; viewBox=&#39;0 0 1 1&#39; version=&#39;1.1&#39; xmlns=&#39;<a href="http://www.w3.org/2000/svg" target="_blank" rel="noreferrer">http://www.w3.org/2000/svg</a>&#39; xmlns:xlink=&#39;<a href="http://www.w3.org/1999/xlink" target="_blank" rel="noreferrer">http://www.w3.org/1999/xlink</a>&#39;%3E%3Ctitle%3E%3C/title%3E%3Cg stroke=&#39;none&#39; stroke-width=&#39;1&#39; fill=&#39;none&#39; fill-rule=&#39;evenodd&#39; fill-opacity=&#39;0&#39;%3E%3Cg transform=&#39;translate(-249.000000, -126.000000)&#39; fill=&#39;%23FFFFFF&#39;%3E%3Crect x=&#39;249&#39; y=&#39;126&#39; width=&#39;1&#39; height=&#39;1&#39;%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)</p><blockquote><p>同样 js中没有栈的数据类型，但我们可以通过 <strong>Array来模拟一个</strong></p></blockquote><div class="language- vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span>const queue = [];</span></span>
<span class="line"><span></span></span>
<span class="line"><span>// 入队</span></span>
<span class="line"><span>queue.push(1);</span></span>
<span class="line"><span>queue.push(2);</span></span>
<span class="line"><span></span></span>
<span class="line"><span>// 出队</span></span>
<span class="line"><span>const first = queue.shift();</span></span>
<span class="line"><span>const end = queue.shift();</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br></div></div><h3 id="_1-最近的请求次数" tabindex="-1">1）最近的请求次数 <a class="header-anchor" href="#_1-最近的请求次数" aria-label="Permalink to &quot;1）最近的请求次数&quot;">​</a></h3><div class="language- vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span>var RecentCounter = function () {</span></span>
<span class="line"><span>  // 初始化队列</span></span>
<span class="line"><span>  this.q = [];</span></span>
<span class="line"><span>};</span></span>
<span class="line"><span></span></span>
<span class="line"><span>// 输入 inputs = [[],[1],[100],[3001],[3002]] 请求间隔为 3000ms</span></span>
<span class="line"><span>// 输出 outputs = [null,1,2,3,3]   </span></span>
<span class="line"><span></span></span>
<span class="line"><span>// 时间复杂度 O(n) n为剔出老请求的长度</span></span>
<span class="line"><span>// 空间复杂度 O(n) n为最近请求的次数</span></span>
<span class="line"><span>RecentCounter.prototype.ping = function (t) {</span></span>
<span class="line"><span>  // 如果传入的时间小于等于最近请求的时间，则直接返回0</span></span>
<span class="line"><span>  if (!t) return null</span></span>
<span class="line"><span></span></span>
<span class="line"><span>  // 将传入的时间放入队列</span></span>
<span class="line"><span>  this.q.push(t);</span></span>
<span class="line"><span></span></span>
<span class="line"><span>  // 如果队头小于 t - 3000 则剔除队头</span></span>
<span class="line"><span>  while (this.q[0] &lt; t - 3000) {</span></span>
<span class="line"><span>    this.q.shift();</span></span>
<span class="line"><span>  }</span></span>
<span class="line"><span></span></span>
<span class="line"><span>  // 返回最近请求的次数</span></span>
<span class="line"><span>  return this.q.length;</span></span>
<span class="line"><span>};</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br><span class="line-number">22</span><br><span class="line-number">23</span><br><span class="line-number">24</span><br><span class="line-number">25</span><br></div></div><h2 id="_3-链表" tabindex="-1">3. 链表 <a class="header-anchor" href="#_3-链表" aria-label="Permalink to &quot;3. 链表&quot;">​</a></h2><p>多个元素组成的列表，元素存储不连续，<code>通过 next 指针来链接</code>, 最底层为 null</p><p>就类似于 <strong>父辈链接关系</strong> 吧， 比如：你爷爷的儿子是你爸爸，你爸爸的儿子是你，而你假如目前还没有结婚生子，那你就暂时木有儿子</p><p>![图片](data:image/svg+xml,%3C%3Fxml version=&#39;1.0&#39; encoding=&#39;UTF-8&#39;%3F%3E%3Csvg width=&#39;1px&#39; height=&#39;1px&#39; viewBox=&#39;0 0 1 1&#39; version=&#39;1.1&#39; xmlns=&#39;<a href="http://www.w3.org/2000/svg" target="_blank" rel="noreferrer">http://www.w3.org/2000/svg</a>&#39; xmlns:xlink=&#39;<a href="http://www.w3.org/1999/xlink" target="_blank" rel="noreferrer">http://www.w3.org/1999/xlink</a>&#39;%3E%3Ctitle%3E%3C/title%3E%3Cg stroke=&#39;none&#39; stroke-width=&#39;1&#39; fill=&#39;none&#39; fill-rule=&#39;evenodd&#39; fill-opacity=&#39;0&#39;%3E%3Cg transform=&#39;translate(-249.000000, -126.000000)&#39; fill=&#39;%23FFFFFF&#39;%3E%3Crect x=&#39;249&#39; y=&#39;126&#39; width=&#39;1&#39; height=&#39;1&#39;%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)</p><blockquote><p>js中类似于链表的典型就是原型链, 但是js中没有链表这种数据结构，我们可以通过一个<strong>object来模拟链表</strong></p></blockquote><div class="language- vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span>const a = {</span></span>
<span class="line"><span>  val: &quot;a&quot;</span></span>
<span class="line"><span>}</span></span>
<span class="line"><span></span></span>
<span class="line"><span>const b = {</span></span>
<span class="line"><span>  val: &quot;b&quot;</span></span>
<span class="line"><span>}</span></span>
<span class="line"><span></span></span>
<span class="line"><span>const c = {</span></span>
<span class="line"><span>  val: &quot;c&quot;</span></span>
<span class="line"><span>}</span></span>
<span class="line"><span></span></span>
<span class="line"><span>const d = {</span></span>
<span class="line"><span>  val: &quot;d&quot;</span></span>
<span class="line"><span>}</span></span>
<span class="line"><span></span></span>
<span class="line"><span>a.next = b;</span></span>
<span class="line"><span>b.next = c;</span></span>
<span class="line"><span>c.next = d;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>// const linkList = {</span></span>
<span class="line"><span>//    val: &quot;a&quot;,</span></span>
<span class="line"><span>//    next: {</span></span>
<span class="line"><span>//        val: &quot;b&quot;,</span></span>
<span class="line"><span>//        next: {</span></span>
<span class="line"><span>//            val: &quot;c&quot;,</span></span>
<span class="line"><span>//            next: {</span></span>
<span class="line"><span>//                val: &quot;d&quot;,</span></span>
<span class="line"><span>//                next: null</span></span>
<span class="line"><span>//            }</span></span>
<span class="line"><span>//        }</span></span>
<span class="line"><span>//    }</span></span>
<span class="line"><span>// }</span></span>
<span class="line"><span></span></span>
<span class="line"><span>// 遍历链表</span></span>
<span class="line"><span>let p = a;</span></span>
<span class="line"><span>while (p) {</span></span>
<span class="line"><span>  console.log(p.val);</span></span>
<span class="line"><span>  p = p.next;</span></span>
<span class="line"><span>}</span></span>
<span class="line"><span></span></span>
<span class="line"><span>// 插入</span></span>
<span class="line"><span>const e = { val: &#39;e&#39; };</span></span>
<span class="line"><span>c.next = e;</span></span>
<span class="line"><span>e.next = d;</span></span>
<span class="line"><span></span></span>
<span class="line"><span></span></span>
<span class="line"><span>// 删除</span></span>
<span class="line"><span>c.next = d;</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br><span class="line-number">22</span><br><span class="line-number">23</span><br><span class="line-number">24</span><br><span class="line-number">25</span><br><span class="line-number">26</span><br><span class="line-number">27</span><br><span class="line-number">28</span><br><span class="line-number">29</span><br><span class="line-number">30</span><br><span class="line-number">31</span><br><span class="line-number">32</span><br><span class="line-number">33</span><br><span class="line-number">34</span><br><span class="line-number">35</span><br><span class="line-number">36</span><br><span class="line-number">37</span><br><span class="line-number">38</span><br><span class="line-number">39</span><br><span class="line-number">40</span><br><span class="line-number">41</span><br><span class="line-number">42</span><br><span class="line-number">43</span><br><span class="line-number">44</span><br><span class="line-number">45</span><br><span class="line-number">46</span><br><span class="line-number">47</span><br><span class="line-number">48</span><br><span class="line-number">49</span><br></div></div><h3 id="_1-手写instanceof" tabindex="-1">1）手写instanceOf <a class="header-anchor" href="#_1-手写instanceof" aria-label="Permalink to &quot;1）手写instanceOf&quot;">​</a></h3><div class="language- vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span>const myInstanceOf = (A, B) =&gt; {</span></span>
<span class="line"><span>  // 声明一个指针</span></span>
<span class="line"><span>  let p = A;</span></span>
<span class="line"><span>  </span></span>
<span class="line"><span>  // 遍历这个链表</span></span>
<span class="line"><span>  while (p) {</span></span>
<span class="line"><span>    if (p === B.prototype) return true;</span></span>
<span class="line"><span>    p = p.__proto__;</span></span>
<span class="line"><span>  }</span></span>
<span class="line"><span></span></span>
<span class="line"><span>  return false</span></span>
<span class="line"><span>}</span></span>
<span class="line"><span></span></span>
<span class="line"><span>myInstanceOf([], Object)</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br></div></div><h3 id="_2-删除链表中的节点" tabindex="-1">2）删除链表中的节点 <a class="header-anchor" href="#_2-删除链表中的节点" aria-label="Permalink to &quot;2）删除链表中的节点&quot;">​</a></h3><div class="language- vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span>// 时间复杂和空间复杂度都是 O(1)</span></span>
<span class="line"><span>const deleteNode = (node) =&gt; {</span></span>
<span class="line"><span>  // 把当前链表的指针指向下下个链表的值就可以了</span></span>
<span class="line"><span>  node.val = node.next.val;</span></span>
<span class="line"><span>  node.next = node.next.next</span></span>
<span class="line"><span>}</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br></div></div><h3 id="_3-删除排序链表中的重复元素" tabindex="-1">3）删除排序链表中的重复元素 <a class="header-anchor" href="#_3-删除排序链表中的重复元素" aria-label="Permalink to &quot;3）删除排序链表中的重复元素&quot;">​</a></h3><div class="language- vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span>// 1 -&gt; 1 -&gt; 2 -&gt; 3 -&gt; 3 </span></span>
<span class="line"><span>// 1 -&gt; 2 -&gt; 3 -&gt; null</span></span>
<span class="line"><span></span></span>
<span class="line"><span>// 时间复杂度 O(n) n为链表的长度</span></span>
<span class="line"><span>// 空间复杂度 O(1)</span></span>
<span class="line"><span>const deleteDuplicates = (head) =&gt; {</span></span>
<span class="line"><span></span></span>
<span class="line"><span>  // 创建一个指针</span></span>
<span class="line"><span>  let p = head;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>  // 遍历链表</span></span>
<span class="line"><span>  while (p &amp;&amp; p.next) {</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    // 如果当前节点的值等于下一个节点的值</span></span>
<span class="line"><span>    if (p.val === p.next.val) {</span></span>
<span class="line"><span></span></span>
<span class="line"><span>      // 删除下一个节点</span></span>
<span class="line"><span>      p.next = p.next.next</span></span>
<span class="line"><span>    } else {</span></span>
<span class="line"><span></span></span>
<span class="line"><span>      // 否则继续遍历</span></span>
<span class="line"><span>      p = p.next</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span>  }</span></span>
<span class="line"><span></span></span>
<span class="line"><span>  //  最后返回原来链表</span></span>
<span class="line"><span>  return head</span></span>
<span class="line"><span>}</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br><span class="line-number">22</span><br><span class="line-number">23</span><br><span class="line-number">24</span><br><span class="line-number">25</span><br><span class="line-number">26</span><br><span class="line-number">27</span><br><span class="line-number">28</span><br></div></div><h3 id="_4-反转链表" tabindex="-1">4）反转链表 <a class="header-anchor" href="#_4-反转链表" aria-label="Permalink to &quot;4）反转链表&quot;">​</a></h3><div class="language- vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span>// 1 -&gt; 2 -&gt; 3 -&gt; 4 -&gt; 5 -&gt; null</span></span>
<span class="line"><span>// 5 -&gt; 4 -&gt; 3 -&gt; 2 -&gt; 1 -&gt; null</span></span>
<span class="line"><span></span></span>
<span class="line"><span>// 时间复杂度 O(n) n为链表的长度</span></span>
<span class="line"><span>// 空间复杂度 O(1)</span></span>
<span class="line"><span>var reverseList = function (head) {</span></span>
<span class="line"><span></span></span>
<span class="line"><span>  // 创建一个指针</span></span>
<span class="line"><span>  let p1 = head;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>  // 创建一个新指针</span></span>
<span class="line"><span>  let p2 = null;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>  // 遍历链表</span></span>
<span class="line"><span>  while (p1) {</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    // 创建一个临时变量</span></span>
<span class="line"><span>    const tmp = p1.next;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    // 将当前节点的下一个节点指向新链表</span></span>
<span class="line"><span>    p1.next = p2;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    // 将新链表指向当前节点</span></span>
<span class="line"><span>    p2 = p1;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    // 将当前节点指向临时变量</span></span>
<span class="line"><span>    p1 = tmp;</span></span>
<span class="line"><span>  }</span></span>
<span class="line"><span></span></span>
<span class="line"><span>  // 最后返回新的这个链表</span></span>
<span class="line"><span>  return p2;</span></span>
<span class="line"><span>}</span></span>
<span class="line"><span></span></span>
<span class="line"><span>reverseList(list</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br><span class="line-number">22</span><br><span class="line-number">23</span><br><span class="line-number">24</span><br><span class="line-number">25</span><br><span class="line-number">26</span><br><span class="line-number">27</span><br><span class="line-number">28</span><br><span class="line-number">29</span><br><span class="line-number">30</span><br><span class="line-number">31</span><br><span class="line-number">32</span><br><span class="line-number">33</span><br><span class="line-number">34</span><br></div></div><h2 id="_4-集合" tabindex="-1">4. 集合 <a class="header-anchor" href="#_4-集合" aria-label="Permalink to &quot;4. 集合&quot;">​</a></h2><p>一种<code>无序且唯一</code>的数据结构</p><blockquote><p>ES6中有集合 <strong>Set类型</strong></p></blockquote><div class="language- vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span>const arr = [1, 1, 1, 2, 2, 3];</span></span>
<span class="line"><span></span></span>
<span class="line"><span>// 去重</span></span>
<span class="line"><span>const arr2 = [...new Set(arr)];</span></span>
<span class="line"><span></span></span>
<span class="line"><span>// 判断元素是否在集合中</span></span>
<span class="line"><span>const set = new Set(arr);</span></span>
<span class="line"><span>set.has(2) // true</span></span>
<span class="line"><span></span></span>
<span class="line"><span>//  交集</span></span>
<span class="line"><span>const set2 = new Set([1, 2]);</span></span>
<span class="line"><span>const set3 = new Set([...set].filter(item =&gt; set.has(item)));</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br></div></div><h3 id="_1-去重" tabindex="-1">1）去重 <a class="header-anchor" href="#_1-去重" aria-label="Permalink to &quot;1）去重&quot;">​</a></h3><p>具体代码在上面介绍中有写过，就不再重写了</p><h3 id="_2-两个数组的交集" tabindex="-1">2）两个数组的交集 <a class="header-anchor" href="#_2-两个数组的交集" aria-label="Permalink to &quot;2）两个数组的交集&quot;">​</a></h3><div class="language- vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span>// 时间复杂度 O(n^2) n为数组长度</span></span>
<span class="line"><span>// 空间复杂度 O(n)  n为去重后的数组长度</span></span>
<span class="line"><span>const intersection = (nums1, nums2) =&gt; {</span></span>
<span class="line"><span></span></span>
<span class="line"><span>  // 通过数组的filter选出交集</span></span>
<span class="line"><span>  // 然后通过 Set集合 去重 并生成数组</span></span>
<span class="line"><span>  return [...new Set(nums1.filter(item =&gt; nums2.includes(item)))];</span></span>
<span class="line"><span>}</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br></div></div><h2 id="_5-字典" tabindex="-1">5. 字典 <a class="header-anchor" href="#_5-字典" aria-label="Permalink to &quot;5. 字典&quot;">​</a></h2><p>与集合类似，<code>一个存储唯一值</code>的结构,以<code>键值对</code>的形式存储</p><blockquote><p>js中有字典数据结构 就是 <strong>Map 类型</strong></p></blockquote><h3 id="_1-两数之和" tabindex="-1">1）两数之和 <a class="header-anchor" href="#_1-两数之和" aria-label="Permalink to &quot;1）两数之和&quot;">​</a></h3><div class="language- vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span>// nums = [2, 7, 11, 15] target = 9</span></span>
<span class="line"><span></span></span>
<span class="line"><span>// 时间复杂度O(n) n为nums的length</span></span>
<span class="line"><span>// 空间复杂度O(n)</span></span>
<span class="line"><span>var twoSum = function (nums, target) {</span></span>
<span class="line"><span></span></span>
<span class="line"><span>  // 建立一个字典数据结构来保存需要的值</span></span>
<span class="line"><span>  const map = new Map();</span></span>
<span class="line"><span>  for (let i = 0; i &lt; nums.length; i++) {</span></span>
<span class="line"><span>  </span></span>
<span class="line"><span>    // 获取当前的值，和需要的值</span></span>
<span class="line"><span>    const n = nums[i];</span></span>
<span class="line"><span>    const n2 = target - n;</span></span>
<span class="line"><span>    </span></span>
<span class="line"><span>    // 如字典中有需要的值，就匹配成功</span></span>
<span class="line"><span>    if (map.has(n2)) {</span></span>
<span class="line"><span>      return [map.get(n2), i];</span></span>
<span class="line"><span>    } else {</span></span>
<span class="line"><span>    </span></span>
<span class="line"><span>    // 如没有，则把需要的值添加到字典中</span></span>
<span class="line"><span>      map.set(n, i);</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span>  }</span></span>
<span class="line"><span>};</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br><span class="line-number">22</span><br><span class="line-number">23</span><br><span class="line-number">24</span><br></div></div><h3 id="_2-两个数组的交集-1" tabindex="-1">2）两个数组的交集 <a class="header-anchor" href="#_2-两个数组的交集-1" aria-label="Permalink to &quot;2）两个数组的交集&quot;">​</a></h3><div class="language- vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span>// nums1 = [1,2,2,1], nums2 = [2,2]</span></span>
<span class="line"><span>// 输出：[2]</span></span>
<span class="line"><span></span></span>
<span class="line"><span>// 时间复杂度 O(m + n) m为nums1长度 n为nums2长度</span></span>
<span class="line"><span>// 空间复杂度 O(m) m为交集的数组长度</span></span>
<span class="line"><span>const intersection = (nums1, nums2) =&gt; {</span></span>
<span class="line"><span>  // 创建一个字典</span></span>
<span class="line"><span>  const map = new Map();</span></span>
<span class="line"><span></span></span>
<span class="line"><span>  // 将数组1中的数字放入字典</span></span>
<span class="line"><span>  nums1.forEach(n =&gt; map.set(n, true));</span></span>
<span class="line"><span></span></span>
<span class="line"><span>  // 创建一个新数组</span></span>
<span class="line"><span>  const res = [];</span></span>
<span class="line"><span></span></span>
<span class="line"><span>  // 将数组2遍历 并判断是否在字典中</span></span>
<span class="line"><span>  nums2.forEach(n =&gt; {</span></span>
<span class="line"><span>    if (map.has(n)) {</span></span>
<span class="line"><span>      res.push(n);</span></span>
<span class="line"><span></span></span>
<span class="line"><span>      // 如果在字典中，则删除该数字</span></span>
<span class="line"><span>      map.delete(n);</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span>  })</span></span>
<span class="line"><span></span></span>
<span class="line"><span>  return res;</span></span>
<span class="line"><span>};</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br><span class="line-number">22</span><br><span class="line-number">23</span><br><span class="line-number">24</span><br><span class="line-number">25</span><br><span class="line-number">26</span><br><span class="line-number">27</span><br></div></div><h3 id="_3-字符的有效的括号" tabindex="-1">3）字符的有效的括号 <a class="header-anchor" href="#_3-字符的有效的括号" aria-label="Permalink to &quot;3）字符的有效的括号&quot;">​</a></h3><div class="language- vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span>// 用字典优化</span></span>
<span class="line"><span></span></span>
<span class="line"><span>// 时间复杂度 O(n) n为s的字符长度</span></span>
<span class="line"><span>// 空间复杂度 O(n) </span></span>
<span class="line"><span>const isValid = (s) =&gt; {</span></span>
<span class="line"><span></span></span>
<span class="line"><span>  // 如果长度不等于2的倍数肯定不是一个有效的括号</span></span>
<span class="line"><span>  if (s.length % 2 !== 0) return false</span></span>
<span class="line"><span></span></span>
<span class="line"><span>  // 创建一个字典</span></span>
<span class="line"><span>  const map = new Map();</span></span>
<span class="line"><span>  map.set(&#39;(&#39;, &#39;)&#39;);</span></span>
<span class="line"><span>  map.set(&#39;{&#39;, &#39;}&#39;);</span></span>
<span class="line"><span>  map.set(&#39;[&#39;, &#39;]&#39;);</span></span>
<span class="line"><span></span></span>
<span class="line"><span>  // 创建一个栈</span></span>
<span class="line"><span>  const stack = [];</span></span>
<span class="line"><span></span></span>
<span class="line"><span>  // 遍历字符串</span></span>
<span class="line"><span>  for (let i = 0; i &lt; s.length; i++) {</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    // 取出字符</span></span>
<span class="line"><span>    const c = s[i];</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    // 如果是左括号就入栈</span></span>
<span class="line"><span>    if (map.has(c)) {</span></span>
<span class="line"><span>      stack.push(c)</span></span>
<span class="line"><span>    } else {</span></span>
<span class="line"><span></span></span>
<span class="line"><span>      // 取出栈顶</span></span>
<span class="line"><span>      const t = stack[stack.length - 1];</span></span>
<span class="line"><span></span></span>
<span class="line"><span>      // 如果字典中有这个值 就出栈</span></span>
<span class="line"><span>      if (map.get(t) === c) {</span></span>
<span class="line"><span>        stack.pop();</span></span>
<span class="line"><span>      } else {</span></span>
<span class="line"><span></span></span>
<span class="line"><span>        // 否则就不是一个有效的括号</span></span>
<span class="line"><span>        return false</span></span>
<span class="line"><span>      }</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span></span></span>
<span class="line"><span>  }</span></span>
<span class="line"><span></span></span>
<span class="line"><span>  return stack.length === 0;</span></span>
<span class="line"><span>};</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br><span class="line-number">22</span><br><span class="line-number">23</span><br><span class="line-number">24</span><br><span class="line-number">25</span><br><span class="line-number">26</span><br><span class="line-number">27</span><br><span class="line-number">28</span><br><span class="line-number">29</span><br><span class="line-number">30</span><br><span class="line-number">31</span><br><span class="line-number">32</span><br><span class="line-number">33</span><br><span class="line-number">34</span><br><span class="line-number">35</span><br><span class="line-number">36</span><br><span class="line-number">37</span><br><span class="line-number">38</span><br><span class="line-number">39</span><br><span class="line-number">40</span><br><span class="line-number">41</span><br><span class="line-number">42</span><br><span class="line-number">43</span><br><span class="line-number">44</span><br><span class="line-number">45</span><br><span class="line-number">46</span><br><span class="line-number">47</span><br></div></div><h3 id="_4-最小覆盖字串" tabindex="-1">4）最小覆盖字串 <a class="header-anchor" href="#_4-最小覆盖字串" aria-label="Permalink to &quot;4）最小覆盖字串&quot;">​</a></h3><div class="language- vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span>// 输入：s = &quot;ADOBECODEBANC&quot;, t = &quot;ABC&quot;</span></span>
<span class="line"><span>// 输出：&quot;BANC&quot;</span></span>
<span class="line"><span></span></span>
<span class="line"><span></span></span>
<span class="line"><span>// 时间复杂度 O(m + n) m是t的长度 n是s的长度</span></span>
<span class="line"><span>// 空间复杂度 O(k) k是字符串中不重复字符的个数</span></span>
<span class="line"><span>var minWindow = function (s, t) {</span></span>
<span class="line"><span>  // 定义双指针维护一个滑动窗口</span></span>
<span class="line"><span>  let l = 0;</span></span>
<span class="line"><span>  let r = 0;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>  // 建立一个字典</span></span>
<span class="line"><span>  const need = new Map();</span></span>
<span class="line"><span></span></span>
<span class="line"><span>  //  遍历t</span></span>
<span class="line"><span>  for (const c of t) {</span></span>
<span class="line"><span>    need.set(c, need.has(c) ? need.get(c) + 1 : 1)</span></span>
<span class="line"><span>  }</span></span>
<span class="line"><span></span></span>
<span class="line"><span>  let needType = need.size</span></span>
<span class="line"><span></span></span>
<span class="line"><span>  // 记录最小子串</span></span>
<span class="line"><span>  let res = &quot;&quot;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>  // 移动右指针</span></span>
<span class="line"><span>  while (r &lt; s.length) {</span></span>
<span class="line"><span>  </span></span>
<span class="line"><span>    // 获取当前字符</span></span>
<span class="line"><span>    const c = s[r];</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    // 如果字典里有这个字符</span></span>
<span class="line"><span>    if (need.has(c)) {</span></span>
<span class="line"><span>    </span></span>
<span class="line"><span>      // 减少字典里面的次数</span></span>
<span class="line"><span>      need.set(c, need.get(c) - 1);</span></span>
<span class="line"><span></span></span>
<span class="line"><span>      // 减少需要的值</span></span>
<span class="line"><span>      if (need.get(c) === 0) needType -= 1;</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    // 如果字典中所有的值都为0了 就说明找到了一个最小子串</span></span>
<span class="line"><span>    while (needType === 0) {</span></span>
<span class="line"><span>    </span></span>
<span class="line"><span>      // 取出当前符合要求的子串</span></span>
<span class="line"><span>      const newRes = s.substring(l, r + 1)</span></span>
<span class="line"><span></span></span>
<span class="line"><span>      // 如果当前子串是小于上次的子串就进行覆盖</span></span>
<span class="line"><span>      if (!res || newRes.length &lt; res.length) res = newRes;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>      // 获取左指针的字符</span></span>
<span class="line"><span>      const c2 = s[l];</span></span>
<span class="line"><span></span></span>
<span class="line"><span>      // 如果字典里有这个字符</span></span>
<span class="line"><span>      if (need.has(c2)) {</span></span>
<span class="line"><span>        // 增加字典里面的次数</span></span>
<span class="line"><span>        need.set(c2, need.get(c2) + 1);</span></span>
<span class="line"><span></span></span>
<span class="line"><span>        // 增加需要的值</span></span>
<span class="line"><span>        if (need.get(c2) === 1) needType += 1;</span></span>
<span class="line"><span>      }</span></span>
<span class="line"><span>      l += 1;</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span>    r += 1;</span></span>
<span class="line"><span>  }</span></span>
<span class="line"><span>  return res</span></span>
<span class="line"><span>};</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br><span class="line-number">22</span><br><span class="line-number">23</span><br><span class="line-number">24</span><br><span class="line-number">25</span><br><span class="line-number">26</span><br><span class="line-number">27</span><br><span class="line-number">28</span><br><span class="line-number">29</span><br><span class="line-number">30</span><br><span class="line-number">31</span><br><span class="line-number">32</span><br><span class="line-number">33</span><br><span class="line-number">34</span><br><span class="line-number">35</span><br><span class="line-number">36</span><br><span class="line-number">37</span><br><span class="line-number">38</span><br><span class="line-number">39</span><br><span class="line-number">40</span><br><span class="line-number">41</span><br><span class="line-number">42</span><br><span class="line-number">43</span><br><span class="line-number">44</span><br><span class="line-number">45</span><br><span class="line-number">46</span><br><span class="line-number">47</span><br><span class="line-number">48</span><br><span class="line-number">49</span><br><span class="line-number">50</span><br><span class="line-number">51</span><br><span class="line-number">52</span><br><span class="line-number">53</span><br><span class="line-number">54</span><br><span class="line-number">55</span><br><span class="line-number">56</span><br><span class="line-number">57</span><br><span class="line-number">58</span><br><span class="line-number">59</span><br><span class="line-number">60</span><br><span class="line-number">61</span><br><span class="line-number">62</span><br><span class="line-number">63</span><br><span class="line-number">64</span><br><span class="line-number">65</span><br><span class="line-number">66</span><br></div></div><h2 id="_6-树" tabindex="-1">6. 树 <a class="header-anchor" href="#_6-树" aria-label="Permalink to &quot;6. 树&quot;">​</a></h2><p>一种<code>分层数据的抽象模型</code>， 比如DOM树、树形控件等</p><blockquote><p>js中没有树 但是可以用 <strong>Object 和 Array 构建树</strong></p></blockquote><h3 id="_1-普通树" tabindex="-1">1）普通树 <a class="header-anchor" href="#_1-普通树" aria-label="Permalink to &quot;1）普通树&quot;">​</a></h3><div class="language- vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span>// 这就是一个常见的普通树形结构</span></span>
<span class="line"><span>const tree = {</span></span>
<span class="line"><span>  val: &quot;a&quot;,</span></span>
<span class="line"><span>  children: [</span></span>
<span class="line"><span>    {</span></span>
<span class="line"><span>      val: &quot;b&quot;,</span></span>
<span class="line"><span>      children: [</span></span>
<span class="line"><span>        {</span></span>
<span class="line"><span>          val: &quot;d&quot;,</span></span>
<span class="line"><span>          children: [],</span></span>
<span class="line"><span>        },</span></span>
<span class="line"><span>        {</span></span>
<span class="line"><span>          val: &quot;e&quot;,</span></span>
<span class="line"><span>          children: [],</span></span>
<span class="line"><span>        }</span></span>
<span class="line"><span>      ],</span></span>
<span class="line"><span>    },</span></span>
<span class="line"><span>    {</span></span>
<span class="line"><span>      val: &quot;c&quot;,</span></span>
<span class="line"><span>      children: [</span></span>
<span class="line"><span>        {</span></span>
<span class="line"><span>          val: &quot;f&quot;,</span></span>
<span class="line"><span>          children: [],</span></span>
<span class="line"><span>        },</span></span>
<span class="line"><span>        {</span></span>
<span class="line"><span>          val: &quot;g&quot;,</span></span>
<span class="line"><span>          children: [],</span></span>
<span class="line"><span>        }</span></span>
<span class="line"><span>      ],</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span>  ],</span></span>
<span class="line"><span>}</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br><span class="line-number">22</span><br><span class="line-number">23</span><br><span class="line-number">24</span><br><span class="line-number">25</span><br><span class="line-number">26</span><br><span class="line-number">27</span><br><span class="line-number">28</span><br><span class="line-number">29</span><br><span class="line-number">30</span><br><span class="line-number">31</span><br><span class="line-number">32</span><br></div></div><h4 id="深度优先遍历" tabindex="-1">&gt; 深度优先遍历 <a class="header-anchor" href="#深度优先遍历" aria-label="Permalink to &quot;&gt; 深度优先遍历&quot;">​</a></h4><ul><li>尽可能深的搜索树的分支,就比如遇到一个节点就会<strong>直接去遍历他的子节点</strong>，<strong>不会立刻去遍历他的兄弟节点</strong></li><li>口诀：</li><li>访问根节点</li><li>对根节点的 children 挨个进行深度优先遍历</li></ul><div class="language- vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span>// 深度优先遍历</span></span>
<span class="line"><span>const dfs = (tree) =&gt; {</span></span>
<span class="line"><span>  tree.children.forEach(dfs)</span></span>
<span class="line"><span>};</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br></div></div><h4 id="广度优先遍历" tabindex="-1">&gt; 广度优先遍历 <a class="header-anchor" href="#广度优先遍历" aria-label="Permalink to &quot;&gt; 广度优先遍历&quot;">​</a></h4><ul><li>先访问离根节点最近的节点, 如果有兄弟节点就会<strong>先遍历兄弟节点</strong>，<strong>再去遍历自己的子节点</strong></li><li>口诀</li><li>新建一个队列 并把根节点入队</li><li>把队头出队并访问</li><li>把队头的children挨个入队</li><li>重复第二 、三步 直到队列为空</li></ul><div class="language- vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span>// 广度优先遍历</span></span>
<span class="line"><span>const bfs = (tree) =&gt; {</span></span>
<span class="line"><span>  const q = [tree];</span></span>
<span class="line"><span></span></span>
<span class="line"><span>  while (q.length &gt; 0) {</span></span>
<span class="line"><span>    const n = q.shift()</span></span>
<span class="line"><span>    console.log(n.val);</span></span>
<span class="line"><span>    n.children.forEach(c =&gt; q.push(c))</span></span>
<span class="line"><span>  }</span></span>
<span class="line"><span>};</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br></div></div><h3 id="_2-二叉树" tabindex="-1">2）二叉树 <a class="header-anchor" href="#_2-二叉树" aria-label="Permalink to &quot;2）二叉树&quot;">​</a></h3><p>树中每个节点 <strong>最多只能有两个子节点</strong></p><p>![图片](data:image/svg+xml,%3C%3Fxml version=&#39;1.0&#39; encoding=&#39;UTF-8&#39;%3F%3E%3Csvg width=&#39;1px&#39; height=&#39;1px&#39; viewBox=&#39;0 0 1 1&#39; version=&#39;1.1&#39; xmlns=&#39;<a href="http://www.w3.org/2000/svg" target="_blank" rel="noreferrer">http://www.w3.org/2000/svg</a>&#39; xmlns:xlink=&#39;<a href="http://www.w3.org/1999/xlink" target="_blank" rel="noreferrer">http://www.w3.org/1999/xlink</a>&#39;%3E%3Ctitle%3E%3C/title%3E%3Cg stroke=&#39;none&#39; stroke-width=&#39;1&#39; fill=&#39;none&#39; fill-rule=&#39;evenodd&#39; fill-opacity=&#39;0&#39;%3E%3Cg transform=&#39;translate(-249.000000, -126.000000)&#39; fill=&#39;%23FFFFFF&#39;%3E%3Crect x=&#39;249&#39; y=&#39;126&#39; width=&#39;1&#39; height=&#39;1&#39;%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)</p><div class="language- vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span> const bt = {</span></span>
<span class="line"><span>  val: 1,</span></span>
<span class="line"><span>  left: {</span></span>
<span class="line"><span>    val: 2,</span></span>
<span class="line"><span>    left: null,</span></span>
<span class="line"><span>    right: null</span></span>
<span class="line"><span>  },</span></span>
<span class="line"><span>  right: {</span></span>
<span class="line"><span>    val: 3,</span></span>
<span class="line"><span>    left: {</span></span>
<span class="line"><span>      val: 4,</span></span>
<span class="line"><span>      left: null,</span></span>
<span class="line"><span>      right: null</span></span>
<span class="line"><span>    },</span></span>
<span class="line"><span>    right: {</span></span>
<span class="line"><span>      val: 5,</span></span>
<span class="line"><span>      left: null,</span></span>
<span class="line"><span>      right: null</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span>  }</span></span>
<span class="line"><span>}</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br></div></div><h4 id="二叉树的先序遍历" tabindex="-1">&gt; 二叉树的先序遍历 <a class="header-anchor" href="#二叉树的先序遍历" aria-label="Permalink to &quot;&gt; 二叉树的先序遍历&quot;">​</a></h4><ul><li>访问根节点</li><li>对根节点的左子树进行先序遍历</li><li>对根节点的右子树进行先序遍历</li></ul><div class="language- vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span>// 先序遍历 递归</span></span>
<span class="line"><span>const preOrder = (tree) =&gt; {</span></span>
<span class="line"><span>  if (!tree) return</span></span>
<span class="line"><span></span></span>
<span class="line"><span>  console.log(tree.val);</span></span>
<span class="line"><span></span></span>
<span class="line"><span>  preOrder(tree.left);</span></span>
<span class="line"><span>  preOrder(tree.right);</span></span>
<span class="line"><span>}</span></span>
<span class="line"><span></span></span>
<span class="line"><span></span></span>
<span class="line"><span></span></span>
<span class="line"><span>// 先序遍历 非递归</span></span>
<span class="line"><span>const preOrder2 = (tree) =&gt; {</span></span>
<span class="line"><span>  if (!tree) return</span></span>
<span class="line"><span></span></span>
<span class="line"><span>  // 新建一个栈</span></span>
<span class="line"><span>  const stack = [tree];</span></span>
<span class="line"><span></span></span>
<span class="line"><span>  while (stack.length &gt; 0) {</span></span>
<span class="line"><span>    const n = stack.pop();</span></span>
<span class="line"><span>    console.log(n.val);</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    // 负负为正</span></span>
<span class="line"><span>    if (n.right) stack.push(n.right);</span></span>
<span class="line"><span>    if (n.left) stack.push(n.left);</span></span>
<span class="line"><span></span></span>
<span class="line"><span>  }</span></span>
<span class="line"><span>}</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br><span class="line-number">22</span><br><span class="line-number">23</span><br><span class="line-number">24</span><br><span class="line-number">25</span><br><span class="line-number">26</span><br><span class="line-number">27</span><br><span class="line-number">28</span><br><span class="line-number">29</span><br></div></div><h4 id="二叉树的中序遍历" tabindex="-1">&gt; 二叉树的中序遍历 <a class="header-anchor" href="#二叉树的中序遍历" aria-label="Permalink to &quot;&gt; 二叉树的中序遍历&quot;">​</a></h4><ul><li>对根节点的左子树进行中序遍历</li><li>访问根节点</li><li>对根节点的右子树进行中序遍历</li></ul><p>![图片](data:image/svg+xml,%3C%3Fxml version=&#39;1.0&#39; encoding=&#39;UTF-8&#39;%3F%3E%3Csvg width=&#39;1px&#39; height=&#39;1px&#39; viewBox=&#39;0 0 1 1&#39; version=&#39;1.1&#39; xmlns=&#39;<a href="http://www.w3.org/2000/svg" target="_blank" rel="noreferrer">http://www.w3.org/2000/svg</a>&#39; xmlns:xlink=&#39;<a href="http://www.w3.org/1999/xlink" target="_blank" rel="noreferrer">http://www.w3.org/1999/xlink</a>&#39;%3E%3Ctitle%3E%3C/title%3E%3Cg stroke=&#39;none&#39; stroke-width=&#39;1&#39; fill=&#39;none&#39; fill-rule=&#39;evenodd&#39; fill-opacity=&#39;0&#39;%3E%3Cg transform=&#39;translate(-249.000000, -126.000000)&#39; fill=&#39;%23FFFFFF&#39;%3E%3Crect x=&#39;249&#39; y=&#39;126&#39; width=&#39;1&#39; height=&#39;1&#39;%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)</p><div class="language- vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span>// 中序遍历 递归</span></span>
<span class="line"><span>const inOrder = (tree) =&gt; {</span></span>
<span class="line"><span>  if (!tree) return;</span></span>
<span class="line"><span>  inOrder(tree.left)</span></span>
<span class="line"><span>  console.log(tree.val);</span></span>
<span class="line"><span>  inOrder(tree.right)</span></span>
<span class="line"><span>}</span></span>
<span class="line"><span></span></span>
<span class="line"><span></span></span>
<span class="line"><span>// 中序遍历 非递归</span></span>
<span class="line"><span>const inOrder2 = (tree) =&gt; {</span></span>
<span class="line"><span>  if (!tree) return;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>  // 新建一个栈</span></span>
<span class="line"><span>  const stack = [];</span></span>
<span class="line"><span></span></span>
<span class="line"><span>  // 先遍历所有的左节点</span></span>
<span class="line"><span>  let p = tree;</span></span>
<span class="line"><span>  while (stack.length || p) {</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    while (p) {</span></span>
<span class="line"><span>      stack.push(p)</span></span>
<span class="line"><span>      p = p.left</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    const n = stack.pop();</span></span>
<span class="line"><span>    console.log(n.val);</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    p = n.right;</span></span>
<span class="line"><span>  }</span></span>
<span class="line"><span>}</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br><span class="line-number">22</span><br><span class="line-number">23</span><br><span class="line-number">24</span><br><span class="line-number">25</span><br><span class="line-number">26</span><br><span class="line-number">27</span><br><span class="line-number">28</span><br><span class="line-number">29</span><br><span class="line-number">30</span><br><span class="line-number">31</span><br></div></div><h4 id="二叉树的后序遍历" tabindex="-1">&gt; 二叉树的后序遍历 <a class="header-anchor" href="#二叉树的后序遍历" aria-label="Permalink to &quot;&gt; 二叉树的后序遍历&quot;">​</a></h4><ul><li>对根节点的左子树进行后序遍历</li><li>对根节点的右子树进行后序遍历</li><li>访问根节点</li></ul><p>![图片](data:image/svg+xml,%3C%3Fxml version=&#39;1.0&#39; encoding=&#39;UTF-8&#39;%3F%3E%3Csvg width=&#39;1px&#39; height=&#39;1px&#39; viewBox=&#39;0 0 1 1&#39; version=&#39;1.1&#39; xmlns=&#39;<a href="http://www.w3.org/2000/svg" target="_blank" rel="noreferrer">http://www.w3.org/2000/svg</a>&#39; xmlns:xlink=&#39;<a href="http://www.w3.org/1999/xlink" target="_blank" rel="noreferrer">http://www.w3.org/1999/xlink</a>&#39;%3E%3Ctitle%3E%3C/title%3E%3Cg stroke=&#39;none&#39; stroke-width=&#39;1&#39; fill=&#39;none&#39; fill-rule=&#39;evenodd&#39; fill-opacity=&#39;0&#39;%3E%3Cg transform=&#39;translate(-249.000000, -126.000000)&#39; fill=&#39;%23FFFFFF&#39;%3E%3Crect x=&#39;249&#39; y=&#39;126&#39; width=&#39;1&#39; height=&#39;1&#39;%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)</p><div class="language- vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span>// 后序遍历 递归</span></span>
<span class="line"><span>const postOrder = (tree) =&gt; {</span></span>
<span class="line"><span>  if (!tree) return</span></span>
<span class="line"><span></span></span>
<span class="line"><span>  postOrder(tree.left)</span></span>
<span class="line"><span>  postOrder(tree.right)</span></span>
<span class="line"><span>  console.log(tree.val)</span></span>
<span class="line"><span>};</span></span>
<span class="line"><span></span></span>
<span class="line"><span></span></span>
<span class="line"><span></span></span>
<span class="line"><span>// 后序遍历 非递归</span></span>
<span class="line"><span>const postOrder2 = (tree) =&gt; {</span></span>
<span class="line"><span>  if (!tree) return</span></span>
<span class="line"><span></span></span>
<span class="line"><span>  const stack = [tree];</span></span>
<span class="line"><span>  const outputStack = [];</span></span>
<span class="line"><span></span></span>
<span class="line"><span>  while (stack.length) {</span></span>
<span class="line"><span>    const n = stack.pop();</span></span>
<span class="line"><span>    outputStack.push(n)</span></span>
<span class="line"><span>    // 负负为正</span></span>
<span class="line"><span>    if (n.left) stack.push(n.left);</span></span>
<span class="line"><span>    if (n.right) stack.push(n.right);</span></span>
<span class="line"><span></span></span>
<span class="line"><span>  }</span></span>
<span class="line"><span></span></span>
<span class="line"><span>  while (outputStack.length) {</span></span>
<span class="line"><span>    const n = outputStack.pop();</span></span>
<span class="line"><span>    console.log(n.val);</span></span>
<span class="line"><span>  }</span></span>
<span class="line"><span>};</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br><span class="line-number">22</span><br><span class="line-number">23</span><br><span class="line-number">24</span><br><span class="line-number">25</span><br><span class="line-number">26</span><br><span class="line-number">27</span><br><span class="line-number">28</span><br><span class="line-number">29</span><br><span class="line-number">30</span><br><span class="line-number">31</span><br><span class="line-number">32</span><br></div></div><h4 id="二叉树的最大深度" tabindex="-1">&gt; 二叉树的最大深度 <a class="header-anchor" href="#二叉树的最大深度" aria-label="Permalink to &quot;&gt; 二叉树的最大深度&quot;">​</a></h4><div class="language- vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span>// 给一个二叉树，需要你找出其最大的深度，从根节点到叶子节点的距离</span></span>
<span class="line"><span></span></span>
<span class="line"><span>// 时间复杂度 O(n) n为树的节点数</span></span>
<span class="line"><span>// 空间复杂度 有一个递归调用的栈 所以为 O(n) n也是为二叉树的最大深度</span></span>
<span class="line"><span>var maxDepth = function (root) {</span></span>
<span class="line"><span>  let res = 0;</span></span>
<span class="line"><span>    </span></span>
<span class="line"><span>  // 使用深度优先遍历</span></span>
<span class="line"><span>  const dfs = (n, l) =&gt; {</span></span>
<span class="line"><span>    if (!n) return;</span></span>
<span class="line"><span>    if (!n.left &amp;&amp; !n.right) {</span></span>
<span class="line"><span>     // 没有叶子节点就把深度数量更新</span></span>
<span class="line"><span>      res = Math.max(res, l);</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span>    dfs(n.left, l + 1)</span></span>
<span class="line"><span>    dfs(n.right, l + 1)</span></span>
<span class="line"><span>  }</span></span>
<span class="line"><span></span></span>
<span class="line"><span>  dfs(root, 1)</span></span>
<span class="line"><span></span></span>
<span class="line"><span>  return res</span></span>
<span class="line"><span>}</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br><span class="line-number">22</span><br></div></div><h4 id="二叉树的最小深度" tabindex="-1">&gt; 二叉树的最小深度 <a class="header-anchor" href="#二叉树的最小深度" aria-label="Permalink to &quot;&gt; 二叉树的最小深度&quot;">​</a></h4><div class="language- vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span>// 给一个二叉树，需要你找出其最小的深度， 从根节点到叶子节点的距离</span></span>
<span class="line"><span></span></span>
<span class="line"><span></span></span>
<span class="line"><span>// 时间复杂度O(n) n是树的节点数量</span></span>
<span class="line"><span>// 空间复杂度O(n) n是树的节点数量</span></span>
<span class="line"><span>var minDepth = function (root) {</span></span>
<span class="line"><span>  if (!root) return 0</span></span>
<span class="line"><span>  </span></span>
<span class="line"><span>  // 使用广度优先遍历</span></span>
<span class="line"><span>  const q = [[root, 1]];</span></span>
<span class="line"><span></span></span>
<span class="line"><span>  while (q.length) {</span></span>
<span class="line"><span>    // 取出当前节点</span></span>
<span class="line"><span>    const [n, l] = q.shift();</span></span>
<span class="line"><span>    </span></span>
<span class="line"><span>    // 如果是叶子节点直接返回深度就可</span></span>
<span class="line"><span>    if (!n.left &amp;&amp; !n.right) return l</span></span>
<span class="line"><span>    if (n.left) q.push([n.left, l + 1]);</span></span>
<span class="line"><span>    if (n.right) q.push([n.right, l + 1]);</span></span>
<span class="line"><span>  }</span></span>
<span class="line"><span></span></span>
<span class="line"><span>}</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br><span class="line-number">22</span><br></div></div><h4 id="二叉树的层序遍历" tabindex="-1">&gt; 二叉树的层序遍历 <a class="header-anchor" href="#二叉树的层序遍历" aria-label="Permalink to &quot;&gt; 二叉树的层序遍历&quot;">​</a></h4><p>![图片](data:image/svg+xml,%3C%3Fxml version=&#39;1.0&#39; encoding=&#39;UTF-8&#39;%3F%3E%3Csvg width=&#39;1px&#39; height=&#39;1px&#39; viewBox=&#39;0 0 1 1&#39; version=&#39;1.1&#39; xmlns=&#39;<a href="http://www.w3.org/2000/svg" target="_blank" rel="noreferrer">http://www.w3.org/2000/svg</a>&#39; xmlns:xlink=&#39;<a href="http://www.w3.org/1999/xlink" target="_blank" rel="noreferrer">http://www.w3.org/1999/xlink</a>&#39;%3E%3Ctitle%3E%3C/title%3E%3Cg stroke=&#39;none&#39; stroke-width=&#39;1&#39; fill=&#39;none&#39; fill-rule=&#39;evenodd&#39; fill-opacity=&#39;0&#39;%3E%3Cg transform=&#39;translate(-249.000000, -126.000000)&#39; fill=&#39;%23FFFFFF&#39;%3E%3Crect x=&#39;249&#39; y=&#39;126&#39; width=&#39;1&#39; height=&#39;1&#39;%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)</p><div class="language- vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span>// 需要返回 [[1], [2,3], [4,5]]</span></span>
<span class="line"><span></span></span>
<span class="line"><span></span></span>
<span class="line"><span>// 时间复杂度 O(n) n为树的节点数</span></span>
<span class="line"><span>// 空间复杂度 O(n) </span></span>
<span class="line"><span>var levelOrder = function (root) {</span></span>
<span class="line"><span>  if (!root) return []</span></span>
<span class="line"><span>   </span></span>
<span class="line"><span>  // 广度优先遍历</span></span>
<span class="line"><span>  const q = [root];</span></span>
<span class="line"><span>  const res = [];</span></span>
<span class="line"><span>  while (q.length) {</span></span>
<span class="line"><span>    let len = q.length</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    res.push([])</span></span>
<span class="line"><span>    </span></span>
<span class="line"><span>    // 循环每层的节点数量次</span></span>
<span class="line"><span>    while (len--) {</span></span>
<span class="line"><span>      const n = q.shift();</span></span>
<span class="line"><span>      </span></span>
<span class="line"><span>      res[res.length - 1].push(n.val)</span></span>
<span class="line"><span>      </span></span>
<span class="line"><span>      if (n.left) q.push(n.left);</span></span>
<span class="line"><span>      if (n.right) q.push(n.right);</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span></span></span>
<span class="line"><span>  }</span></span>
<span class="line"><span></span></span>
<span class="line"><span>  return res</span></span>
<span class="line"><span>};</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br><span class="line-number">22</span><br><span class="line-number">23</span><br><span class="line-number">24</span><br><span class="line-number">25</span><br><span class="line-number">26</span><br><span class="line-number">27</span><br><span class="line-number">28</span><br><span class="line-number">29</span><br><span class="line-number">30</span><br></div></div><h2 id="_7-图" tabindex="-1">7. 图 <a class="header-anchor" href="#_7-图" aria-label="Permalink to &quot;7. 图&quot;">​</a></h2><p>图是<code>网络结构的抽象模型</code>, 是一组由边连接的节点</p><blockquote><p>js中可以利用<strong>Object和Array构建图</strong></p></blockquote><p>![图片](data:image/svg+xml,%3C%3Fxml version=&#39;1.0&#39; encoding=&#39;UTF-8&#39;%3F%3E%3Csvg width=&#39;1px&#39; height=&#39;1px&#39; viewBox=&#39;0 0 1 1&#39; version=&#39;1.1&#39; xmlns=&#39;<a href="http://www.w3.org/2000/svg" target="_blank" rel="noreferrer">http://www.w3.org/2000/svg</a>&#39; xmlns:xlink=&#39;<a href="http://www.w3.org/1999/xlink" target="_blank" rel="noreferrer">http://www.w3.org/1999/xlink</a>&#39;%3E%3Ctitle%3E%3C/title%3E%3Cg stroke=&#39;none&#39; stroke-width=&#39;1&#39; fill=&#39;none&#39; fill-rule=&#39;evenodd&#39; fill-opacity=&#39;0&#39;%3E%3Cg transform=&#39;translate(-249.000000, -126.000000)&#39; fill=&#39;%23FFFFFF&#39;%3E%3Crect x=&#39;249&#39; y=&#39;126&#39; width=&#39;1&#39; height=&#39;1&#39;%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)</p><div class="language- vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span>// 上图可以表示为</span></span>
<span class="line"><span>const graph = {</span></span>
<span class="line"><span>  0: [1, 2],</span></span>
<span class="line"><span>  1: [2],</span></span>
<span class="line"><span>  2: [0, 3],</span></span>
<span class="line"><span>  3: [3]</span></span>
<span class="line"><span>}</span></span>
<span class="line"><span></span></span>
<span class="line"><span></span></span>
<span class="line"><span>// 深度优先遍历，对根节点没访问过的相邻节点挨个进行遍历</span></span>
<span class="line"><span>{</span></span>
<span class="line"><span>    // 记录节点是否访问过</span></span>
<span class="line"><span>    const visited = new Set();</span></span>
<span class="line"><span>    const dfs = (n) =&gt; {</span></span>
<span class="line"><span>      visited.add(n);</span></span>
<span class="line"><span>      </span></span>
<span class="line"><span>      // 遍历相邻节点</span></span>
<span class="line"><span>      graph[n].forEach(c =&gt; {</span></span>
<span class="line"><span>        // 没访问过才可以，进行递归访问</span></span>
<span class="line"><span>        if(!visited.has(c)){</span></span>
<span class="line"><span>          dfs(c)</span></span>
<span class="line"><span>        }</span></span>
<span class="line"><span>      });</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span>    </span></span>
<span class="line"><span>    // 从2开始进行遍历</span></span>
<span class="line"><span>    dfs(2)</span></span>
<span class="line"><span>}</span></span>
<span class="line"><span></span></span>
<span class="line"><span></span></span>
<span class="line"><span>// 广度优先遍历 </span></span>
<span class="line"><span>{</span></span>
<span class="line"><span>    const visited = new Set();</span></span>
<span class="line"><span>    // 新建一个队列， 根节点入队， 设2为根节点</span></span>
<span class="line"><span>    const q = [2];</span></span>
<span class="line"><span>    visited.add(2)</span></span>
<span class="line"><span>    while (q.length) {</span></span>
<span class="line"><span>    </span></span>
<span class="line"><span>      // 队头出队，并访问</span></span>
<span class="line"><span>      const n = q.shift();</span></span>
<span class="line"><span>      console.log(n);</span></span>
<span class="line"><span>      graph[n].forEach(c =&gt; {</span></span>
<span class="line"><span>      </span></span>
<span class="line"><span>        // 对没访问过的相邻节点入队</span></span>
<span class="line"><span>        if (!visited.has(c)) {</span></span>
<span class="line"><span>          q.push(c)</span></span>
<span class="line"><span>          visited.add(c)</span></span>
<span class="line"><span>        }</span></span>
<span class="line"><span>      })</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span>}</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br><span class="line-number">22</span><br><span class="line-number">23</span><br><span class="line-number">24</span><br><span class="line-number">25</span><br><span class="line-number">26</span><br><span class="line-number">27</span><br><span class="line-number">28</span><br><span class="line-number">29</span><br><span class="line-number">30</span><br><span class="line-number">31</span><br><span class="line-number">32</span><br><span class="line-number">33</span><br><span class="line-number">34</span><br><span class="line-number">35</span><br><span class="line-number">36</span><br><span class="line-number">37</span><br><span class="line-number">38</span><br><span class="line-number">39</span><br><span class="line-number">40</span><br><span class="line-number">41</span><br><span class="line-number">42</span><br><span class="line-number">43</span><br><span class="line-number">44</span><br><span class="line-number">45</span><br><span class="line-number">46</span><br><span class="line-number">47</span><br><span class="line-number">48</span><br><span class="line-number">49</span><br><span class="line-number">50</span><br><span class="line-number">51</span><br></div></div><h3 id="_1-有效数字" tabindex="-1">1）有效数字 <a class="header-anchor" href="#_1-有效数字" aria-label="Permalink to &quot;1）有效数字&quot;">​</a></h3><div class="language- vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span>// 生成数字关系图 只有状态为 3 5 6 的时候才为一个数字</span></span>
<span class="line"><span>const graph = {</span></span>
<span class="line"><span>  0: { &#39;blank&#39;: 0, &#39;sign&#39;: 1, &quot;.&quot;: 2, &quot;digit&quot;: 6 },</span></span>
<span class="line"><span>  1: { &quot;digit&quot;: 6, &quot;.&quot;: 2 },</span></span>
<span class="line"><span>  2: { &quot;digit&quot;: 3 },</span></span>
<span class="line"><span>  3: { &quot;digit&quot;: 3, &quot;e&quot;: 4 },</span></span>
<span class="line"><span>  4: { &quot;digit&quot;: 5, &quot;sign&quot;: 7 },</span></span>
<span class="line"><span>  5: { &quot;digit&quot;: 5 },</span></span>
<span class="line"><span>  6: { &quot;digit&quot;: 6, &quot;.&quot;: 3, &quot;e&quot;: 4 },</span></span>
<span class="line"><span>  7: { &quot;digit&quot;: 5 },</span></span>
<span class="line"><span>}</span></span>
<span class="line"><span></span></span>
<span class="line"><span></span></span>
<span class="line"><span>// 时间复杂度 O(n) n是字符串长度</span></span>
<span class="line"><span>// 空间复杂度 O(1) </span></span>
<span class="line"><span>var isNumber = function (s) {</span></span>
<span class="line"><span></span></span>
<span class="line"><span>  // 记录状态</span></span>
<span class="line"><span>  let state = 0;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>  // 遍历字符串</span></span>
<span class="line"><span>  for (c of s.trim()) {</span></span>
<span class="line"><span>    // 把字符进行转换</span></span>
<span class="line"><span>    if (c &gt;= &#39;0&#39; &amp;&amp; c &lt;= &#39;9&#39;) {</span></span>
<span class="line"><span>      c = &#39;digit&#39;;</span></span>
<span class="line"><span>    } else if (c === &quot; &quot;) {</span></span>
<span class="line"><span>      c = &#39;blank&#39;;</span></span>
<span class="line"><span>    } else if (c === &quot;+&quot; || c === &quot;-&quot;) {</span></span>
<span class="line"><span>      c = &quot;sign&quot;;</span></span>
<span class="line"><span>    } else if (c === &quot;E&quot; || c === &quot;e&quot;) {</span></span>
<span class="line"><span>      c = &quot;e&quot;;</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    // 开始寻找图</span></span>
<span class="line"><span>    state = graph[state][c];</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    // 如果最后是undefined就是错误</span></span>
<span class="line"><span>    if (state === undefined) return false</span></span>
<span class="line"><span>  }</span></span>
<span class="line"><span></span></span>
<span class="line"><span>  // 判断最后的结果是不是合法的数字</span></span>
<span class="line"><span>  if (state === 3 || state === 5 || state === 6) return true</span></span>
<span class="line"><span>  return false</span></span>
<span class="line"><span>};</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br><span class="line-number">22</span><br><span class="line-number">23</span><br><span class="line-number">24</span><br><span class="line-number">25</span><br><span class="line-number">26</span><br><span class="line-number">27</span><br><span class="line-number">28</span><br><span class="line-number">29</span><br><span class="line-number">30</span><br><span class="line-number">31</span><br><span class="line-number">32</span><br><span class="line-number">33</span><br><span class="line-number">34</span><br><span class="line-number">35</span><br><span class="line-number">36</span><br><span class="line-number">37</span><br><span class="line-number">38</span><br><span class="line-number">39</span><br><span class="line-number">40</span><br><span class="line-number">41</span><br><span class="line-number">42</span><br><span class="line-number">43</span><br><span class="line-number">44</span><br></div></div><h2 id="_8-堆" tabindex="-1">8. 堆 <a class="header-anchor" href="#_8-堆" aria-label="Permalink to &quot;8. 堆&quot;">​</a></h2><p>一种<code>特殊的完全二叉树</code>, 所有的节点都大于等于最大堆,或者小于等于最小堆的子节点，微信搜索公众号：架构师指南，回复：架构师 领取资料 。</p><blockquote><p>js通常使用<strong>数组来表示堆</strong></p></blockquote><ul><li>左侧子节点的位置是 <strong>2*index + 1</strong></li><li>右侧子节点的位置是 <strong>2*index + 2</strong></li><li>父节点的位置是 <strong>(index - 1) / 2</strong> , 取余数</li></ul><p>![图片](data:image/svg+xml,%3C%3Fxml version=&#39;1.0&#39; encoding=&#39;UTF-8&#39;%3F%3E%3Csvg width=&#39;1px&#39; height=&#39;1px&#39; viewBox=&#39;0 0 1 1&#39; version=&#39;1.1&#39; xmlns=&#39;<a href="http://www.w3.org/2000/svg" target="_blank" rel="noreferrer">http://www.w3.org/2000/svg</a>&#39; xmlns:xlink=&#39;<a href="http://www.w3.org/1999/xlink" target="_blank" rel="noreferrer">http://www.w3.org/1999/xlink</a>&#39;%3E%3Ctitle%3E%3C/title%3E%3Cg stroke=&#39;none&#39; stroke-width=&#39;1&#39; fill=&#39;none&#39; fill-rule=&#39;evenodd&#39; fill-opacity=&#39;0&#39;%3E%3Cg transform=&#39;translate(-249.000000, -126.000000)&#39; fill=&#39;%23FFFFFF&#39;%3E%3Crect x=&#39;249&#39; y=&#39;126&#39; width=&#39;1&#39; height=&#39;1&#39;%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)</p><h3 id="_2-js实现一个最小堆" tabindex="-1">2）JS实现一个最小堆 <a class="header-anchor" href="#_2-js实现一个最小堆" aria-label="Permalink to &quot;2）JS实现一个最小堆&quot;">​</a></h3><div class="language- vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span>// js实现最小堆类</span></span>
<span class="line"><span>class MinHeap {</span></span>
<span class="line"><span>  constructor() {</span></span>
<span class="line"><span>    // 元素容器</span></span>
<span class="line"><span>    this.heap = [];</span></span>
<span class="line"><span>  }</span></span>
<span class="line"><span></span></span>
<span class="line"><span>  // 交换节点的值</span></span>
<span class="line"><span>  swap(i1, i2) {</span></span>
<span class="line"><span>    [this.heap[i1], this.heap[i2]] = [this.heap[i2], this.heap[i1]]</span></span>
<span class="line"><span>  }</span></span>
<span class="line"><span></span></span>
<span class="line"><span>  //  获取父节点</span></span>
<span class="line"><span>  getParentIndex(index) {</span></span>
<span class="line"><span>    // 除以二， 取余数</span></span>
<span class="line"><span>    return (index - 1) &gt;&gt; 1;</span></span>
<span class="line"><span>  }</span></span>
<span class="line"><span></span></span>
<span class="line"><span>  // 获取左侧节点索引</span></span>
<span class="line"><span>  getLeftIndex(i) {</span></span>
<span class="line"><span>    return (i &lt;&lt; 1) + 1;</span></span>
<span class="line"><span>  }</span></span>
<span class="line"><span></span></span>
<span class="line"><span>  // 获取右侧节点索引</span></span>
<span class="line"><span>  getRightIndex(i) {</span></span>
<span class="line"><span>    return (i &lt;&lt; 1) + 2;</span></span>
<span class="line"><span>  }</span></span>
<span class="line"><span></span></span>
<span class="line"><span></span></span>
<span class="line"><span>  // 上移</span></span>
<span class="line"><span>  shiftUp(index) {</span></span>
<span class="line"><span>    if (index == 0) return;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    // 获取父节点</span></span>
<span class="line"><span>    const parentIndex = this.getParentIndex(index);</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    // 如果父节点的值大于当前节点的值 就需要进行交换</span></span>
<span class="line"><span>    if (this.heap[parentIndex] &gt; this.heap[index]) {</span></span>
<span class="line"><span>      this.swap(parentIndex, index);</span></span>
<span class="line"><span></span></span>
<span class="line"><span>      // 然后继续上移</span></span>
<span class="line"><span>      this.shiftUp(parentIndex);</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span>  }</span></span>
<span class="line"><span></span></span>
<span class="line"><span>  // 下移</span></span>
<span class="line"><span>  shiftDown(index) {</span></span>
<span class="line"><span>    // 获取左右节点索引</span></span>
<span class="line"><span>    const leftIndex = this.getLeftIndex(index);</span></span>
<span class="line"><span>    const rightIndex = this.getRightIndex(index);</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    // 如果左子节点小于当前的值</span></span>
<span class="line"><span>    if (this.heap[leftIndex] &lt; this.heap[index]) {</span></span>
<span class="line"><span></span></span>
<span class="line"><span>      // 进行节点交换</span></span>
<span class="line"><span>      this.swap(leftIndex, index);</span></span>
<span class="line"><span></span></span>
<span class="line"><span>      // 继续进行下移</span></span>
<span class="line"><span>      this.shiftDown(leftIndex)</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    // 如果右侧节点小于当前的值</span></span>
<span class="line"><span>    if (this.heap[rightIndex] &lt; this.heap[index]) {</span></span>
<span class="line"><span>      this.swap(rightIndex, index);</span></span>
<span class="line"><span>      this.shiftDown(rightIndex)</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span>  }</span></span>
<span class="line"><span></span></span>
<span class="line"><span>  // 插入元素</span></span>
<span class="line"><span>  insert(value) {</span></span>
<span class="line"><span>    // 插入到堆的底部</span></span>
<span class="line"><span>    this.heap.push(value);</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    // 然后上移： 将这个值和它的父节点进行交换，知道父节点小于等于这个插入的值</span></span>
<span class="line"><span>    this.shiftUp(this.heap.length - 1)</span></span>
<span class="line"><span>  }</span></span>
<span class="line"><span></span></span>
<span class="line"><span>  // 删除堆项</span></span>
<span class="line"><span>  pop() {</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    // 把数组最后一位 转移到数组头部</span></span>
<span class="line"><span>    this.heap[0] = this.heap.pop();</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    // 进行下移操作</span></span>
<span class="line"><span>    this.shiftDown(0);</span></span>
<span class="line"><span>  }</span></span>
<span class="line"><span></span></span>
<span class="line"><span>  // 获取堆顶元素</span></span>
<span class="line"><span>  peek() {</span></span>
<span class="line"><span>    return this.heap[0]</span></span>
<span class="line"><span>  }</span></span>
<span class="line"><span></span></span>
<span class="line"><span>  // 获取堆大小</span></span>
<span class="line"><span>  size() {</span></span>
<span class="line"><span>    return this.heap.length</span></span>
<span class="line"><span>  }</span></span>
<span class="line"><span></span></span>
<span class="line"><span>}</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br><span class="line-number">22</span><br><span class="line-number">23</span><br><span class="line-number">24</span><br><span class="line-number">25</span><br><span class="line-number">26</span><br><span class="line-number">27</span><br><span class="line-number">28</span><br><span class="line-number">29</span><br><span class="line-number">30</span><br><span class="line-number">31</span><br><span class="line-number">32</span><br><span class="line-number">33</span><br><span class="line-number">34</span><br><span class="line-number">35</span><br><span class="line-number">36</span><br><span class="line-number">37</span><br><span class="line-number">38</span><br><span class="line-number">39</span><br><span class="line-number">40</span><br><span class="line-number">41</span><br><span class="line-number">42</span><br><span class="line-number">43</span><br><span class="line-number">44</span><br><span class="line-number">45</span><br><span class="line-number">46</span><br><span class="line-number">47</span><br><span class="line-number">48</span><br><span class="line-number">49</span><br><span class="line-number">50</span><br><span class="line-number">51</span><br><span class="line-number">52</span><br><span class="line-number">53</span><br><span class="line-number">54</span><br><span class="line-number">55</span><br><span class="line-number">56</span><br><span class="line-number">57</span><br><span class="line-number">58</span><br><span class="line-number">59</span><br><span class="line-number">60</span><br><span class="line-number">61</span><br><span class="line-number">62</span><br><span class="line-number">63</span><br><span class="line-number">64</span><br><span class="line-number">65</span><br><span class="line-number">66</span><br><span class="line-number">67</span><br><span class="line-number">68</span><br><span class="line-number">69</span><br><span class="line-number">70</span><br><span class="line-number">71</span><br><span class="line-number">72</span><br><span class="line-number">73</span><br><span class="line-number">74</span><br><span class="line-number">75</span><br><span class="line-number">76</span><br><span class="line-number">77</span><br><span class="line-number">78</span><br><span class="line-number">79</span><br><span class="line-number">80</span><br><span class="line-number">81</span><br><span class="line-number">82</span><br><span class="line-number">83</span><br><span class="line-number">84</span><br><span class="line-number">85</span><br><span class="line-number">86</span><br><span class="line-number">87</span><br><span class="line-number">88</span><br><span class="line-number">89</span><br><span class="line-number">90</span><br><span class="line-number">91</span><br><span class="line-number">92</span><br><span class="line-number">93</span><br><span class="line-number">94</span><br><span class="line-number">95</span><br><span class="line-number">96</span><br><span class="line-number">97</span><br><span class="line-number">98</span><br></div></div><h3 id="_2-数组中的第k个最大元素" tabindex="-1">2）数组中的第k个最大元素 <a class="header-anchor" href="#_2-数组中的第k个最大元素" aria-label="Permalink to &quot;2）数组中的第k个最大元素&quot;">​</a></h3><div class="language- vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span>// 输入 [3,2,1,5,6,4] 和 k = 2</span></span>
<span class="line"><span>// 输出 5</span></span>
<span class="line"><span></span></span>
<span class="line"><span>// 时间复杂度 O(n * logK) K就是堆的大小</span></span>
<span class="line"><span>// 空间复杂度 O(K) K是参数k</span></span>
<span class="line"><span>var findKthLargest = function (nums, k) {</span></span>
<span class="line"><span></span></span>
<span class="line"><span>  // 使用上面js实现的最小堆类，来构建一个最小堆</span></span>
<span class="line"><span>  const h = new MinHeap();</span></span>
<span class="line"><span>  </span></span>
<span class="line"><span>  // 遍历数组</span></span>
<span class="line"><span>  nums.forEach(n =&gt; {</span></span>
<span class="line"><span>    </span></span>
<span class="line"><span>    // 把数组中的值依次插入到堆里</span></span>
<span class="line"><span>    h.insert(n);</span></span>
<span class="line"><span>    </span></span>
<span class="line"><span>    if (h.size() &gt; k) {</span></span>
<span class="line"><span>      // 进行优胜劣汰</span></span>
<span class="line"><span>      h.pop();</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span>  })</span></span>
<span class="line"><span></span></span>
<span class="line"><span>  return h.peek()</span></span>
<span class="line"><span>};</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br><span class="line-number">22</span><br><span class="line-number">23</span><br><span class="line-number">24</span><br></div></div><h3 id="_3-前-k-个高频元素" tabindex="-1">3）前 K 个高频元素 <a class="header-anchor" href="#_3-前-k-个高频元素" aria-label="Permalink to &quot;3）前 K 个高频元素&quot;">​</a></h3><div class="language- vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span>// nums = [1,1,1,2,2,3], k = 2</span></span>
<span class="line"><span>// 输出: [1,2]</span></span>
<span class="line"><span></span></span>
<span class="line"><span></span></span>
<span class="line"><span>// 时间复杂度 O(n * logK) </span></span>
<span class="line"><span>// 空间复杂度 O(k)</span></span>
<span class="line"><span>var topKFrequent = function (nums, k) {</span></span>
<span class="line"><span></span></span>
<span class="line"><span>  // 统计每个元素出现的频率</span></span>
<span class="line"><span>  const map = new Map();</span></span>
<span class="line"><span></span></span>
<span class="line"><span>  // 遍历数组 建立映射关系</span></span>
<span class="line"><span>  nums.forEach(n =&gt; {</span></span>
<span class="line"><span>    map.set(n, map.has(n) ? map.get(n) + 1 : 1);</span></span>
<span class="line"><span>  })</span></span>
<span class="line"><span></span></span>
<span class="line"><span>  // 建立最小堆</span></span>
<span class="line"><span>  const h = new MinHeap();</span></span>
<span class="line"><span></span></span>
<span class="line"><span>  // 遍历映射关系</span></span>
<span class="line"><span>  map.forEach((value, key) =&gt; {</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    // 由于插入的元素结构发生了变化，所以需要对 最小堆的类 进行改造一下,改造的方法我会写到最后</span></span>
<span class="line"><span>    h.insert({ value, key })</span></span>
<span class="line"><span>    if (h.size() &gt; k) {</span></span>
<span class="line"><span>      h.pop()</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span>  })</span></span>
<span class="line"><span>  return h.heap.map(item =&gt; item.key)</span></span>
<span class="line"><span>};</span></span>
<span class="line"><span></span></span>
<span class="line"><span>// 改造上移和下移操作即可</span></span>
<span class="line"><span>// shiftUp(index) {</span></span>
<span class="line"><span>//   if (index == 0) return;</span></span>
<span class="line"><span>//   const parentIndex = this.getParentIndex(index);</span></span>
<span class="line"><span>//   if (this.heap[parentIndex] &amp;&amp; this.heap[parentIndex].value &gt; this.heap[index].value) {</span></span>
<span class="line"><span>//     this.swap(parentIndex, index);</span></span>
<span class="line"><span>//     this.shiftUp(parentIndex);</span></span>
<span class="line"><span>//   }</span></span>
<span class="line"><span>// }</span></span>
<span class="line"><span>// shiftDown(index) {</span></span>
<span class="line"><span>//   const leftIndex = this.getLeftIndex(index);</span></span>
<span class="line"><span>//   const rightIndex = this.getRightIndex(index);</span></span>
<span class="line"><span></span></span>
<span class="line"><span>//   if (this.heap[leftIndex] &amp;&amp; this.heap[leftIndex].value &lt; this.heap[index].value) {</span></span>
<span class="line"><span>//     this.swap(leftIndex, index);</span></span>
<span class="line"><span>//     this.shiftDown(leftIndex)</span></span>
<span class="line"><span>//   }</span></span>
<span class="line"><span></span></span>
<span class="line"><span>//   if (this.heap[rightIndex] &amp;&amp; this.heap[rightIndex].value &lt; this.heap[index].value) {</span></span>
<span class="line"><span>//     this.swap(rightIndex, index);</span></span>
<span class="line"><span>//     this.shiftDown(rightIndex)</span></span>
<span class="line"><span>//   }</span></span>
<span class="line"><span>// }</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br><span class="line-number">22</span><br><span class="line-number">23</span><br><span class="line-number">24</span><br><span class="line-number">25</span><br><span class="line-number">26</span><br><span class="line-number">27</span><br><span class="line-number">28</span><br><span class="line-number">29</span><br><span class="line-number">30</span><br><span class="line-number">31</span><br><span class="line-number">32</span><br><span class="line-number">33</span><br><span class="line-number">34</span><br><span class="line-number">35</span><br><span class="line-number">36</span><br><span class="line-number">37</span><br><span class="line-number">38</span><br><span class="line-number">39</span><br><span class="line-number">40</span><br><span class="line-number">41</span><br><span class="line-number">42</span><br><span class="line-number">43</span><br><span class="line-number">44</span><br><span class="line-number">45</span><br><span class="line-number">46</span><br><span class="line-number">47</span><br><span class="line-number">48</span><br><span class="line-number">49</span><br><span class="line-number">50</span><br><span class="line-number">51</span><br><span class="line-number">52</span><br><span class="line-number">53</span><br><span class="line-number">54</span><br></div></div><h1 id="四、常见算法及算法思想" tabindex="-1"><strong>四、常见算法及算法思想</strong> <a class="header-anchor" href="#四、常见算法及算法思想" aria-label="Permalink to &quot;**四、常见算法及算法思想**&quot;">​</a></h1><h2 id="_1-排序" tabindex="-1">1. 排序 <a class="header-anchor" href="#_1-排序" aria-label="Permalink to &quot;1. 排序&quot;">​</a></h2><p><code>把某个乱序的数组变成升序序或者降序的数组</code>， js比较常用<strong>sort方法进行排序</strong></p><h3 id="_1-冒泡排序" tabindex="-1">1）冒泡排序 <a class="header-anchor" href="#_1-冒泡排序" aria-label="Permalink to &quot;1）冒泡排序&quot;">​</a></h3><ul><li>比较所有相邻元素，如果第一个比第二个大就<strong>交换他们</strong></li><li>执行一次后可以保证最后一个数字是最大的</li><li>重复执行 n-1 次，就可以完成排序</li></ul><div class="language- vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span>// 时间复杂度 O(n ^ 2) n为数组长度</span></span>
<span class="line"><span>// 空间复杂度 O(1)</span></span>
<span class="line"><span>Array.prototype.bubbleSort = function () {</span></span>
<span class="line"><span>  for (i = 0; i &lt; this.length - 1; i++) {</span></span>
<span class="line"><span>    for (let j = 0; j &lt; this.length - 1 - i; j++) {</span></span>
<span class="line"><span>      if (this[j] &gt; this[j + 1]) {</span></span>
<span class="line"><span>      </span></span>
<span class="line"><span>        // 交换数据</span></span>
<span class="line"><span>        [this[j], this[j + 1]] = [this[j + 1], this[j]];</span></span>
<span class="line"><span>      }</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span>  }</span></span>
<span class="line"><span>}</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br></div></div><h3 id="_2-选择排序" tabindex="-1">2）选择排序 <a class="header-anchor" href="#_2-选择排序" aria-label="Permalink to &quot;2）选择排序&quot;">​</a></h3><ul><li>找到数组中<strong>最小的值</strong>,选中它并放到第一位</li><li>接着找到数组中<strong>第二小的值</strong>,选中它并放到第二位</li><li>重复上述步骤执行 n-1 次</li></ul><div class="language- vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span>// 时间复杂度：O(n ^ 2) n为数组长度</span></span>
<span class="line"><span>// 空间复杂度：O(1)</span></span>
<span class="line"><span>Array.prototype.selectionSort = function () {</span></span>
<span class="line"><span>  for (let i = 0; i &lt; this.length - 1; i++) {</span></span>
<span class="line"><span>    let indexMin = i;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    for (let j = i; j &lt; this.length; j++) {</span></span>
<span class="line"><span></span></span>
<span class="line"><span>      // 如果当前这个元素 小于最小值的下标 就更新最小值的下标</span></span>
<span class="line"><span>      if (this[j] &lt; this[indexMin]) {</span></span>
<span class="line"><span>        indexMin = j;</span></span>
<span class="line"><span>      }</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    // 避免自己和自己进行交换</span></span>
<span class="line"><span>    if (indexMin !== i) {</span></span>
<span class="line"><span></span></span>
<span class="line"><span>      // 进行交换数据</span></span>
<span class="line"><span>      [this[i], this[indexMin]] = [this[indexMin], this[i]];</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span>  }</span></span>
<span class="line"><span>}</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br><span class="line-number">22</span><br></div></div><h3 id="_3-插入排序" tabindex="-1">3）插入排序 <a class="header-anchor" href="#_3-插入排序" aria-label="Permalink to &quot;3）插入排序&quot;">​</a></h3><ul><li>从第二个数，<strong>开始往前比较</strong></li><li>如<strong>它大就往后排</strong></li><li>以此类推进行到最后一个数</li></ul><div class="language- vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span>// 时间复杂度 O(n ^ 2)</span></span>
<span class="line"><span>Array.prototype.insertionSort = function () {</span></span>
<span class="line"><span></span></span>
<span class="line"><span>  // 遍历数组 从第二个开始</span></span>
<span class="line"><span>  for (let i = 1; i &lt; this.length; i++) {</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    // 获取第二个元素</span></span>
<span class="line"><span>    const temp = this[i];</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    let j = i;</span></span>
<span class="line"><span>    while (j &gt; 0) {</span></span>
<span class="line"><span></span></span>
<span class="line"><span>      // 如果当前元素小于前一个元素 就开始往后移动</span></span>
<span class="line"><span>      if (this[j - 1] &gt; temp) {</span></span>
<span class="line"><span>        this[j] = this[j - 1];</span></span>
<span class="line"><span>      } else {</span></span>
<span class="line"><span></span></span>
<span class="line"><span>        // 否则就跳出循环</span></span>
<span class="line"><span>        break</span></span>
<span class="line"><span>      }</span></span>
<span class="line"><span></span></span>
<span class="line"><span>      // 递减</span></span>
<span class="line"><span>      j--;</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    // 前一位置赋值为当前元素</span></span>
<span class="line"><span>    this[j] = temp;</span></span>
<span class="line"><span>  }</span></span>
<span class="line"><span>}</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br><span class="line-number">22</span><br><span class="line-number">23</span><br><span class="line-number">24</span><br><span class="line-number">25</span><br><span class="line-number">26</span><br><span class="line-number">27</span><br><span class="line-number">28</span><br><span class="line-number">29</span><br></div></div><h3 id="_4-归并排序" tabindex="-1">4）归并排序 <a class="header-anchor" href="#_4-归并排序" aria-label="Permalink to &quot;4）归并排序&quot;">​</a></h3><ul><li>分：把数组<strong>劈成两半</strong> 在递归的对子数组进行分操作，直到分成一个个<strong>单独的数</strong></li><li>合：把两个树<strong>合并为有序数组</strong>，再对有序数组进行合并， 直到全部子数组合并为一个完整的数组</li></ul><div class="language- vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span>// 时间复杂度 O(nlogn) 分需要劈开数组，所以是logn， 合则是n</span></span>
<span class="line"><span>// 空间复杂度 O(n)</span></span>
<span class="line"><span>Array.prototype.mergeSort = function () {</span></span>
<span class="line"><span></span></span>
<span class="line"><span>  const rec = (arr) =&gt; {</span></span>
<span class="line"><span>    // 递归终点</span></span>
<span class="line"><span>    if (arr.length === 1) return arr</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    // 获取中间索引</span></span>
<span class="line"><span>    const mid = arr.length &gt;&gt; 1;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    // 通过中间下标,进行分割数组</span></span>
<span class="line"><span>    const left = arr.slice(0, mid);</span></span>
<span class="line"><span>    const right = arr.slice(mid);</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    // 左边和右边的数组进行递归,会得到有序的左数组,和有序的右数组</span></span>
<span class="line"><span>    const orderLeft = rec(left);</span></span>
<span class="line"><span>    const orderRight = rec(right);</span></span>
<span class="line"><span></span></span>
<span class="line"><span></span></span>
<span class="line"><span>    // 存放结果的数组</span></span>
<span class="line"><span>    const res = [];</span></span>
<span class="line"><span></span></span>
<span class="line"><span>  </span></span>
<span class="line"><span>    while (orderLeft.length || orderRight.length) {</span></span>
<span class="line"><span></span></span>
<span class="line"><span>      // 如左边和右边数组都有值</span></span>
<span class="line"><span>      if (orderLeft.length &amp;&amp; orderRight.length) {</span></span>
<span class="line"><span></span></span>
<span class="line"><span>        // 左边队头的值小于右边队头的值 就左边队头出队,否则就是右边队头出队</span></span>
<span class="line"><span>        res.push(orderLeft[0] &lt; orderRight[0] ? orderLeft.shift() : orderRight.shift())</span></span>
<span class="line"><span>      } else if (orderLeft.length) {</span></span>
<span class="line"><span></span></span>
<span class="line"><span>        // 把左边的队头放入数组</span></span>
<span class="line"><span>        res.push(orderLeft.shift())</span></span>
<span class="line"><span>      } else if (orderRight.length) {</span></span>
<span class="line"><span></span></span>
<span class="line"><span>        // 把右边的队头放入数组</span></span>
<span class="line"><span>        res.push(orderRight.shift())</span></span>
<span class="line"><span>      }</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    return res</span></span>
<span class="line"><span>  }</span></span>
<span class="line"><span></span></span>
<span class="line"><span>  const res = rec(this)</span></span>
<span class="line"><span></span></span>
<span class="line"><span>  // 把结果放入原数组</span></span>
<span class="line"><span>  res.forEach((n, i) =&gt; this[i] = n)</span></span>
<span class="line"><span>}</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br><span class="line-number">22</span><br><span class="line-number">23</span><br><span class="line-number">24</span><br><span class="line-number">25</span><br><span class="line-number">26</span><br><span class="line-number">27</span><br><span class="line-number">28</span><br><span class="line-number">29</span><br><span class="line-number">30</span><br><span class="line-number">31</span><br><span class="line-number">32</span><br><span class="line-number">33</span><br><span class="line-number">34</span><br><span class="line-number">35</span><br><span class="line-number">36</span><br><span class="line-number">37</span><br><span class="line-number">38</span><br><span class="line-number">39</span><br><span class="line-number">40</span><br><span class="line-number">41</span><br><span class="line-number">42</span><br><span class="line-number">43</span><br><span class="line-number">44</span><br><span class="line-number">45</span><br><span class="line-number">46</span><br><span class="line-number">47</span><br><span class="line-number">48</span><br><span class="line-number">49</span><br><span class="line-number">50</span><br></div></div><h4 id="合并两个有序链表" tabindex="-1">&gt; 合并两个有序链表 <a class="header-anchor" href="#合并两个有序链表" aria-label="Permalink to &quot;&gt; 合并两个有序链表&quot;">​</a></h4><div class="language- vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span>// 时间复杂度O(n) n为链表1和链表2的长度之和</span></span>
<span class="line"><span>// 空间复杂度O(1)</span></span>
<span class="line"><span>var mergeTwoLists = function (list1, list2) {</span></span>
<span class="line"><span></span></span>
<span class="line"><span>  // 新建一个新链表 作为返回值</span></span>
<span class="line"><span>  const res = {</span></span>
<span class="line"><span>    val: 0,</span></span>
<span class="line"><span>    next: null</span></span>
<span class="line"><span>  }</span></span>
<span class="line"><span></span></span>
<span class="line"><span>  // 指向新链表的指针</span></span>
<span class="line"><span>  let p = res;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>  // 建立两个指针</span></span>
<span class="line"><span>  let p1 = list1;</span></span>
<span class="line"><span>  let p2 = list2;</span></span>
<span class="line"><span></span></span>
<span class="line"><span></span></span>
<span class="line"><span>  // 遍历两个链表</span></span>
<span class="line"><span>  while (p1 &amp;&amp; p2) {</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    // 如果链表1 小于 链表2的值 就接入链表1的值</span></span>
<span class="line"><span>    if (p1.val &lt; p2.val) {</span></span>
<span class="line"><span>      p.next = p1;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>      // 需要往后移动</span></span>
<span class="line"><span>      p1 = p1.next;</span></span>
<span class="line"><span>    } else {</span></span>
<span class="line"><span></span></span>
<span class="line"><span>      // 否则接入链表2的值</span></span>
<span class="line"><span>      p.next = p2;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>      // 需要往后移动</span></span>
<span class="line"><span>      p2 = p2.next;</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    // p永远要往后移动一位</span></span>
<span class="line"><span>    p = p.next;</span></span>
<span class="line"><span>  }</span></span>
<span class="line"><span></span></span>
<span class="line"><span>  // 如果链表1或者链表2还有值,就把后面的值全部接入新链表</span></span>
<span class="line"><span>  if (p1) {</span></span>
<span class="line"><span>    p.next = p1;</span></span>
<span class="line"><span>  }</span></span>
<span class="line"><span>  if (p2) {</span></span>
<span class="line"><span>    p.next = p2;</span></span>
<span class="line"><span>  }</span></span>
<span class="line"><span></span></span>
<span class="line"><span>  return res.next;</span></span>
<span class="line"><span>};</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br><span class="line-number">22</span><br><span class="line-number">23</span><br><span class="line-number">24</span><br><span class="line-number">25</span><br><span class="line-number">26</span><br><span class="line-number">27</span><br><span class="line-number">28</span><br><span class="line-number">29</span><br><span class="line-number">30</span><br><span class="line-number">31</span><br><span class="line-number">32</span><br><span class="line-number">33</span><br><span class="line-number">34</span><br><span class="line-number">35</span><br><span class="line-number">36</span><br><span class="line-number">37</span><br><span class="line-number">38</span><br><span class="line-number">39</span><br><span class="line-number">40</span><br><span class="line-number">41</span><br><span class="line-number">42</span><br><span class="line-number">43</span><br><span class="line-number">44</span><br><span class="line-number">45</span><br><span class="line-number">46</span><br><span class="line-number">47</span><br><span class="line-number">48</span><br><span class="line-number">49</span><br><span class="line-number">50</span><br></div></div><h3 id="_5-快速排序" tabindex="-1">5）快速排序 <a class="header-anchor" href="#_5-快速排序" aria-label="Permalink to &quot;5）快速排序&quot;">​</a></h3><ul><li>分区：从数组中任意选择一个 <strong>基准</strong>， 所有<strong>比基准小的元素放在基准前面</strong>，<strong>比基准大的元素放在基准后面</strong></li><li>递归： <strong>递归的对基准前后的子数组进行分区</strong></li></ul><div class="language- vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span>// 时间复杂度 O(nlogN)</span></span>
<span class="line"><span>// 空间复杂度 O(1)</span></span>
<span class="line"><span>Array.prototype.quickSort = function () {</span></span>
<span class="line"><span>  const rec = (arr) =&gt; {</span></span>
<span class="line"><span>  </span></span>
<span class="line"><span>    // 如果数组长度小于等于1 就不用排序了</span></span>
<span class="line"><span>    if (arr.length &lt;= 1) { return arr }</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    // 存放基准前后的数组</span></span>
<span class="line"><span>    const left = [];</span></span>
<span class="line"><span>    const right = [];</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    // 取基准</span></span>
<span class="line"><span>    const mid = arr[0];</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    for (let i = 1; i &lt; arr.length; i++) {</span></span>
<span class="line"><span></span></span>
<span class="line"><span>      // 如果当前值小于基准就放到基准前数组里面</span></span>
<span class="line"><span>      if (arr[i] &lt; mid) {</span></span>
<span class="line"><span>        left.push(arr[i]);</span></span>
<span class="line"><span>      } else {</span></span>
<span class="line"><span></span></span>
<span class="line"><span>        // 否则就放到基准后数组里面</span></span>
<span class="line"><span>        right.push(arr[i]);</span></span>
<span class="line"><span>      }</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    // 递归调用两边的子数组</span></span>
<span class="line"><span>    return [...rec(left), mid, ...rec(right)];</span></span>
<span class="line"><span>  };</span></span>
<span class="line"><span></span></span>
<span class="line"><span>  const res = rec(this);</span></span>
<span class="line"><span>  res.forEach((n, i) =&gt; this[i] = n);</span></span>
<span class="line"><span>}</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br><span class="line-number">22</span><br><span class="line-number">23</span><br><span class="line-number">24</span><br><span class="line-number">25</span><br><span class="line-number">26</span><br><span class="line-number">27</span><br><span class="line-number">28</span><br><span class="line-number">29</span><br><span class="line-number">30</span><br><span class="line-number">31</span><br><span class="line-number">32</span><br><span class="line-number">33</span><br><span class="line-number">34</span><br></div></div><h2 id="_2-搜索" tabindex="-1">2. 搜索 <a class="header-anchor" href="#_2-搜索" aria-label="Permalink to &quot;2. 搜索&quot;">​</a></h2><p><code>找出数组中某个元素的下标</code>，js中通常使用<strong>indexOf方法进行搜索</strong></p><h3 id="_1-顺序搜索" tabindex="-1">1）顺序搜索 <a class="header-anchor" href="#_1-顺序搜索" aria-label="Permalink to &quot;1）顺序搜索&quot;">​</a></h3><ul><li>就比如indexOf方法， <strong>从头开始搜索数组中的某个元素</strong></li></ul><h3 id="_2-二分搜索" tabindex="-1">2）二分搜索 <a class="header-anchor" href="#_2-二分搜索" aria-label="Permalink to &quot;2）二分搜索&quot;">​</a></h3><ul><li>从数组中的<strong>中间位置开始搜索</strong>，如果中间元素<strong>正好是目标值，则搜索结束</strong></li><li>如果<strong>目标值大于或者小于中间元素</strong>，则在大于或者小于中间元素的那<strong>一半数组中搜索</strong></li><li><code>数组必须是有序的，如不是则需要先进行排序</code></li></ul><div class="language- vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span>// 时间复杂度：O(log n)</span></span>
<span class="line"><span>// 空间复杂度：O(1)</span></span>
<span class="line"><span>Array.prototype.binarySearch = function (item) {</span></span>
<span class="line"><span>  // 代表数组的最小索引</span></span>
<span class="line"><span>  let low = 0;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>  // 和最大索引</span></span>
<span class="line"><span>  let higt = this.length - 1;</span></span>
<span class="line"><span></span></span>
<span class="line"><span></span></span>
<span class="line"><span>  while (low &lt;= higt) {</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    // 获取中间元素索引</span></span>
<span class="line"><span>    const mid = (low + higt) &gt;&gt; 1;</span></span>
<span class="line"><span>    </span></span>
<span class="line"><span>    const element = this[mid];</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    // 如果中间元素小于于要查找的元素 就把最小索引更新为中间索引的下一个</span></span>
<span class="line"><span>    if (element &lt; item) {</span></span>
<span class="line"><span>      low = mid + 1</span></span>
<span class="line"><span>    } else if (element &gt; item) {</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    // 如果中间元素大于要查找的元素 就把最大索引更新为中间索引的前一个</span></span>
<span class="line"><span>      higt = mid - 1;</span></span>
<span class="line"><span>    } else {</span></span>
<span class="line"><span>      // 如果中间元素等于要查找的元素 就返回索引</span></span>
<span class="line"><span>      return mid;</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span>  }</span></span>
<span class="line"><span></span></span>
<span class="line"><span>  return -1</span></span>
<span class="line"><span>}</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br><span class="line-number">22</span><br><span class="line-number">23</span><br><span class="line-number">24</span><br><span class="line-number">25</span><br><span class="line-number">26</span><br><span class="line-number">27</span><br><span class="line-number">28</span><br><span class="line-number">29</span><br><span class="line-number">30</span><br><span class="line-number">31</span><br><span class="line-number">32</span><br></div></div><h4 id="猜数字大小" tabindex="-1">&gt; 猜数字大小 <a class="header-anchor" href="#猜数字大小" aria-label="Permalink to &quot;&gt; 猜数字大小&quot;">​</a></h4><div class="language- vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span>// 时间复杂度 O(logn) 分割成两半的 基本都是logn</span></span>
<span class="line"><span>// 空间复杂度 O(1)</span></span>
<span class="line"><span>var guessNumber = function (n) {</span></span>
<span class="line"><span></span></span>
<span class="line"><span>  // 定义范围最小值和最大值</span></span>
<span class="line"><span>  const low = 1;</span></span>
<span class="line"><span>  const high = n;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>  while (low &lt;= high) {</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    // 获取中间值</span></span>
<span class="line"><span>    const mid = (low + high) &gt;&gt;&gt; 1;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    // 这个方法是 leetcode 中的方法</span></span>
<span class="line"><span>    // 如果返回值为-1 就是小了</span></span>
<span class="line"><span>    // 如果返回值为1  就是大了</span></span>
<span class="line"><span>    // 如果返回值为0  就是找到了 </span></span>
<span class="line"><span>    const res = guess(mid);</span></span>
<span class="line"><span>    </span></span>
<span class="line"><span>    // 剩下的操作就和二分搜索一样</span></span>
<span class="line"><span>    if (res === 0) {</span></span>
<span class="line"><span>      return mid</span></span>
<span class="line"><span>    } else if (res === 1) {</span></span>
<span class="line"><span>      low = mid + 1;</span></span>
<span class="line"><span>    } else {</span></span>
<span class="line"><span>      high = mid - 1;</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span>  }</span></span>
<span class="line"><span>};</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br><span class="line-number">22</span><br><span class="line-number">23</span><br><span class="line-number">24</span><br><span class="line-number">25</span><br><span class="line-number">26</span><br><span class="line-number">27</span><br><span class="line-number">28</span><br><span class="line-number">29</span><br></div></div><h2 id="_3-分而治之" tabindex="-1">3. 分而治之 <a class="header-anchor" href="#_3-分而治之" aria-label="Permalink to &quot;3. 分而治之&quot;">​</a></h2><p>算法设计中的一种思想，将一个问题<strong>分成多个子问题</strong>，<strong>递归解决子问题</strong>，然后将子问题的解<strong>合并成最终的解</strong></p><h3 id="_1-归并排序" tabindex="-1">1）归并排序 <a class="header-anchor" href="#_1-归并排序" aria-label="Permalink to &quot;1）归并排序&quot;">​</a></h3><ul><li>分：把数组从中间一分为二</li><li>解：递归地对两个子数组进行归并排序</li><li>合：合并有序子数组</li></ul><h3 id="_2-快速排序" tabindex="-1">2）快速排序 <a class="header-anchor" href="#_2-快速排序" aria-label="Permalink to &quot;2）快速排序&quot;">​</a></h3><ul><li>分：选基准，按基准把数组分成两个子数组</li><li>解：递归地对两个子数组进行快速排序</li><li>合：对两个子数组进行合并</li></ul><h3 id="_3-二分搜索" tabindex="-1">3）二分搜索 <a class="header-anchor" href="#_3-二分搜索" aria-label="Permalink to &quot;3）二分搜索&quot;">​</a></h3><ul><li>二分搜索也属于分而治之这种思想</li></ul><h4 id="分而治之思想-猜数字大小" tabindex="-1">&gt; 分而治之思想：猜数字大小 <a class="header-anchor" href="#分而治之思想-猜数字大小" aria-label="Permalink to &quot;&gt; 分而治之思想：猜数字大小&quot;">​</a></h4><div class="language- vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span>// 时间复杂度 O(logn) </span></span>
<span class="line"><span>// 空间复杂度 O(logn) 递归调用栈 所以是logn</span></span>
<span class="line"><span>var guessNumber = function (n) {</span></span>
<span class="line"><span></span></span>
<span class="line"><span>  // 递归函数 接受一个搜索范围</span></span>
<span class="line"><span>  const rec = (low, high) =&gt; {</span></span>
<span class="line"><span>  </span></span>
<span class="line"><span>    // 递归结束条件</span></span>
<span class="line"><span>    if (low &gt; high) return;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    // 获取中间元素</span></span>
<span class="line"><span>    const mid = (low + high) &gt;&gt;&gt; 1;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    // 判断是否猜对</span></span>
<span class="line"><span>    const res = guess(mid)</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    // 猜对</span></span>
<span class="line"><span>    if (res === 0) {</span></span>
<span class="line"><span>      return mid</span></span>
<span class="line"><span>    } else if (res === 1) {</span></span>
<span class="line"><span>      // 猜大了</span></span>
<span class="line"><span>      return rec(mid + 1, high)</span></span>
<span class="line"><span>    } else {</span></span>
<span class="line"><span>      // 猜小了</span></span>
<span class="line"><span>      return rec(low, mid - 1)</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span>  }</span></span>
<span class="line"><span></span></span>
<span class="line"><span>  return rec(1, n)</span></span>
<span class="line"><span>};</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br><span class="line-number">22</span><br><span class="line-number">23</span><br><span class="line-number">24</span><br><span class="line-number">25</span><br><span class="line-number">26</span><br><span class="line-number">27</span><br><span class="line-number">28</span><br><span class="line-number">29</span><br><span class="line-number">30</span><br></div></div><h4 id="分而治之思想-翻转二叉树" tabindex="-1">&gt; 分而治之思想：翻转二叉树 <a class="header-anchor" href="#分而治之思想-翻转二叉树" aria-label="Permalink to &quot;&gt; 分而治之思想：翻转二叉树&quot;">​</a></h4><div class="language- vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span>// 时间复杂度 O(n) n为树的节点数量</span></span>
<span class="line"><span>// 空间复杂度 O(h) h为树的高度</span></span>
<span class="line"><span>var invertTree = function (root) {</span></span>
<span class="line"><span>  if (!root) return null</span></span>
<span class="line"><span>  return {</span></span>
<span class="line"><span>    val: root.val,</span></span>
<span class="line"><span>    left: invertTree(root.right),</span></span>
<span class="line"><span>    right: invertTree(root.left)</span></span>
<span class="line"><span>  }</span></span>
<span class="line"><span>};</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br></div></div><h4 id="分而治之思想-相同的树" tabindex="-1">&gt; 分而治之思想：相同的树 <a class="header-anchor" href="#分而治之思想-相同的树" aria-label="Permalink to &quot;&gt; 分而治之思想：相同的树&quot;">​</a></h4><div class="language- vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span>// 时间复杂度 o(n) n为树的节点数量</span></span>
<span class="line"><span>// 空间复杂度 o(h) h为树的节点数</span></span>
<span class="line"><span>var isSameTree = function (p, q) {</span></span>
<span class="line"><span>  if (!p &amp;&amp; !q) return true</span></span>
<span class="line"><span>  </span></span>
<span class="line"><span>  if (</span></span>
<span class="line"><span>    p &amp;&amp; q</span></span>
<span class="line"><span>    &amp;&amp; p.val === q.val</span></span>
<span class="line"><span>    &amp;&amp; isSameTree(p.left, q.left)</span></span>
<span class="line"><span>    &amp;&amp; isSameTree(p.right, q.right)</span></span>
<span class="line"><span>  ) return true</span></span>
<span class="line"><span></span></span>
<span class="line"><span>  return false</span></span>
<span class="line"><span>};</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br></div></div><h4 id="分而治之思想-对称二叉树" tabindex="-1">&gt; 分而治之思想：对称二叉树 <a class="header-anchor" href="#分而治之思想-对称二叉树" aria-label="Permalink to &quot;&gt; 分而治之思想：对称二叉树&quot;">​</a></h4><div class="language- vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span>// 时间复杂度 O(n)</span></span>
<span class="line"><span>// 空间复杂度 O(n) </span></span>
<span class="line"><span>var isSymmetric = function (root) {</span></span>
<span class="line"><span>  if (!root) return true</span></span>
<span class="line"><span>  const isMirror = (l, r) =&gt; {</span></span>
<span class="line"><span>    if (!l &amp;&amp; !r) return true</span></span>
<span class="line"><span>    if (</span></span>
<span class="line"><span>      l &amp;&amp; r </span></span>
<span class="line"><span>      &amp;&amp; l.val === r.val</span></span>
<span class="line"><span>      &amp;&amp; isMirror(l.left, r.right)</span></span>
<span class="line"><span>      &amp;&amp; isMirror(l.right, r.left)</span></span>
<span class="line"><span>    ) return true</span></span>
<span class="line"><span>    return false</span></span>
<span class="line"><span>  }</span></span>
<span class="line"><span></span></span>
<span class="line"><span>  return isMirror(root.left, root.right)</span></span>
<span class="line"><span>};</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br></div></div><h2 id="_4-动态规划" tabindex="-1">4. 动态规划 <a class="header-anchor" href="#_4-动态规划" aria-label="Permalink to &quot;4. 动态规划&quot;">​</a></h2><p>动态规划是算法设计中的一种思想，将一个问题分解为<strong>相互重叠</strong>的子问题，通过反复求解子问题来解决原来的问题</p><h3 id="_1-斐波那契数列" tabindex="-1">1）斐波那契数列 <a class="header-anchor" href="#_1-斐波那契数列" aria-label="Permalink to &quot;1）斐波那契数列&quot;">​</a></h3><div class="language- vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span>// 时间复杂度 O(n) </span></span>
<span class="line"><span>// 空间复杂度 O(n)</span></span>
<span class="line"><span>function fib(n) {</span></span>
<span class="line"><span>    let dp = [0, 1, 1];</span></span>
<span class="line"><span>    for (let i = 3; i &lt;= n; i++) {</span></span>
<span class="line"><span></span></span>
<span class="line"><span>        // 当前值等于前两个值之和</span></span>
<span class="line"><span>        dp[i] = dp[i - 1] + dp[i - 2];</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span>    return dp[n];</span></span>
<span class="line"><span>}</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br></div></div><h3 id="_2-爬楼梯" tabindex="-1">2）爬楼梯 <a class="header-anchor" href="#_2-爬楼梯" aria-label="Permalink to &quot;2）爬楼梯&quot;">​</a></h3><div class="language- vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span>// 正在爬楼梯, 需要n阶才能到达楼顶</span></span>
<span class="line"><span>// 每次只能爬 1 或者 2 个台阶, 有多少中不同的方法可以到达楼顶</span></span>
<span class="line"><span></span></span>
<span class="line"><span>// 时间复杂度 O(n) n是楼梯长度</span></span>
<span class="line"><span>// 空间复杂度 O(1)</span></span>
<span class="line"><span>var climbStairs = function (n) {</span></span>
<span class="line"><span>    if (n &lt; 2) return 1</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    let dp0 = 1;</span></span>
<span class="line"><span>    let dp1 = 1</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    for (let i = 2; i &lt;= n; i++) {</span></span>
<span class="line"><span>        [dp0, dp1] = [dp1, dp1 + dp0]</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    return dp1</span></span>
<span class="line"><span>};</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br></div></div><h2 id="_5-贪心算法" tabindex="-1">5. 贪心算法 <a class="header-anchor" href="#_5-贪心算法" aria-label="Permalink to &quot;5. 贪心算法&quot;">​</a></h2><p>贪心算法是算法设计中的一种思想，期盼通过每个阶段的<strong>局部最优</strong>选择，从而达到全局的最优，但 <strong>结果并不一定是最优</strong></p><h3 id="_1-分发饼干" tabindex="-1">1）分发饼干 <a class="header-anchor" href="#_1-分发饼干" aria-label="Permalink to &quot;1）分发饼干&quot;">​</a></h3><div class="language- vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span>// 每个孩子都有一个胃口g. 每个孩子只能拥有一个饼干</span></span>
<span class="line"><span>// 输入: g = [1,2,3], s = [1,1]</span></span>
<span class="line"><span>// 输出: 1</span></span>
<span class="line"><span>// 三个孩子胃口值分别是1,2,3  但是只有两个饼干,所以只能让胃口1的孩子满足</span></span>
<span class="line"><span></span></span>
<span class="line"><span>// 时间复杂度 O(nlogn) </span></span>
<span class="line"><span>// 空间复杂度 O(1)</span></span>
<span class="line"><span>var findContentChildren = function (g, s) {</span></span>
<span class="line"><span>    // 对饼干和孩子胃口进行排序</span></span>
<span class="line"><span>    g.sort((a, b) =&gt; a - b)</span></span>
<span class="line"><span>    s.sort((a, b) =&gt; a - b)</span></span>
<span class="line"><span></span></span>
<span class="line"><span></span></span>
<span class="line"><span>    // 是第几个孩子</span></span>
<span class="line"><span>    let i = 0</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    s.forEach((n) =&gt; {</span></span>
<span class="line"><span>        // 如果饼干能满足第一个孩子</span></span>
<span class="line"><span>        if (n &gt;= g[i]) { </span></span>
<span class="line"><span>            // 就开始满足第二个孩子</span></span>
<span class="line"><span>            i += 1</span></span>
<span class="line"><span>        }</span></span>
<span class="line"><span>    })</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    return i</span></span>
<span class="line"><span>}</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br><span class="line-number">22</span><br><span class="line-number">23</span><br><span class="line-number">24</span><br><span class="line-number">25</span><br><span class="line-number">26</span><br></div></div><h3 id="_2-买卖股票的最佳时机ii" tabindex="-1">2）买卖股票的最佳时机Ⅱ <a class="header-anchor" href="#_2-买卖股票的最佳时机ii" aria-label="Permalink to &quot;2）买卖股票的最佳时机Ⅱ&quot;">​</a></h3><div class="language- vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span>// 时间复杂度 O(n) n为股票的数量</span></span>
<span class="line"><span>// 空间复杂度 O(1)</span></span>
<span class="line"><span>var maxProfit = function (prices) {</span></span>
<span class="line"><span>  // 存放利润</span></span>
<span class="line"><span>  const profit = 0;</span></span>
<span class="line"><span>  for (let i = 1; i &lt; prices.length; i++) {</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    // 不贪 如有更高的利润就直接卖出</span></span>
<span class="line"><span>    if (prices[i] &gt; prices[i - 1]) {</span></span>
<span class="line"><span>      profit += prices[i] - prices[i - 1]</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span>  }</span></span>
<span class="line"><span></span></span>
<span class="line"><span>  return profit</span></span>
<span class="line"><span>};</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br></div></div><h2 id="_6-回溯算法" tabindex="-1">6. 回溯算法 <a class="header-anchor" href="#_6-回溯算法" aria-label="Permalink to &quot;6. 回溯算法&quot;">​</a></h2><p>回溯算法是算法设计中的一种思想，一种<strong>渐进式</strong>寻找并构建问题解决方式的策略，会先从一个可能的动作开始解决问题，如不行，就<strong>回溯选择另外一个动作</strong>，直到找到一个解</p><h3 id="_1-全排列" tabindex="-1">1）全排列 <a class="header-anchor" href="#_1-全排列" aria-label="Permalink to &quot;1）全排列&quot;">​</a></h3><div class="language- vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span>// 输入 [1, 2, 3]</span></span>
<span class="line"><span>// 输出 [[1, 2, 3], [1, 3, 2], [2, 1, 3], [2, 3, 1], [3, 1, 2], [3, 2, 1]]</span></span>
<span class="line"><span></span></span>
<span class="line"><span></span></span>
<span class="line"><span>// 时间复杂度 O(n!) n! = 1 * 2 * 3 * ··· * (n-1) * n;</span></span>
<span class="line"><span>// 空间复杂度 O(n)</span></span>
<span class="line"><span>var permute = function (nums) {</span></span>
<span class="line"><span>  // 存放结果</span></span>
<span class="line"><span>  const res = [];</span></span>
<span class="line"><span></span></span>
<span class="line"><span>  const backTrack = (path) =&gt; {</span></span>
<span class="line"><span>    // 递归结束条件 </span></span>
<span class="line"><span>    if (path.length === nums.length) {</span></span>
<span class="line"><span>      res.push(path)</span></span>
<span class="line"><span>      return</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    // 遍历传入数组</span></span>
<span class="line"><span>    nums.forEach(n =&gt; {</span></span>
<span class="line"><span>      // 如果子数组中有这个元素就是死路， 需要回溯回去走其他路</span></span>
<span class="line"><span>      if (path.includes(n)) return;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>      // 加入到子数组里</span></span>
<span class="line"><span>      backTrack(path.concat(n))</span></span>
<span class="line"><span>    })</span></span>
<span class="line"><span>  }</span></span>
<span class="line"><span></span></span>
<span class="line"><span>  backTrack([])</span></span>
<span class="line"><span></span></span>
<span class="line"><span>  return res;</span></span>
<span class="line"><span>};</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br><span class="line-number">22</span><br><span class="line-number">23</span><br><span class="line-number">24</span><br><span class="line-number">25</span><br><span class="line-number">26</span><br><span class="line-number">27</span><br><span class="line-number">28</span><br><span class="line-number">29</span><br><span class="line-number">30</span><br><span class="line-number">31</span><br></div></div><h3 id="_2-子集" tabindex="-1">2）子集 <a class="header-anchor" href="#_2-子集" aria-label="Permalink to &quot;2）子集&quot;">​</a></h3><div class="language- vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span>// 输入 [1,2,3]</span></span>
<span class="line"><span>// 输出 [ [3], [1], [2], [1,2,3], [1,3], [2,3], [1,2], [] ]</span></span>
<span class="line"><span></span></span>
<span class="line"><span>// 时间复杂度 O(2 ^ N) 每个元素都有两种可能</span></span>
<span class="line"><span>// 空间复杂度 O(N)</span></span>
<span class="line"><span>var subsets = function (nums) {</span></span>
<span class="line"><span>  // 存放结果数组</span></span>
<span class="line"><span>  const res = [];</span></span>
<span class="line"><span></span></span>
<span class="line"><span>  const backTrack = (path, l, start) =&gt; {</span></span>
<span class="line"><span>    // 递归结束条件</span></span>
<span class="line"><span>    if (path.length === l) {</span></span>
<span class="line"><span>      res.push(path)</span></span>
<span class="line"><span>      return</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    // 遍历输入的数组长度 起始位置是start</span></span>
<span class="line"><span>    for (let i = start; i &lt; nums.length; i++) {</span></span>
<span class="line"><span></span></span>
<span class="line"><span>      // 递归调用 需要保证子集的有序, start为 i+1</span></span>
<span class="line"><span>      backTrack(path.concat(nums[i]), l, i + 1)</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span>  };</span></span>
<span class="line"><span></span></span>
<span class="line"><span>  // 遍历输入数组长度</span></span>
<span class="line"><span>  for (let i = 0; i &lt;= nums.length; i++) {</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    // 传入长度 起始索引</span></span>
<span class="line"><span>    backTrack([], i, 0)</span></span>
<span class="line"><span>  }</span></span>
<span class="line"><span></span></span>
<span class="line"><span></span></span>
<span class="line"><span>  return res</span></span>
<span class="line"><span>};</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br><span class="line-number">22</span><br><span class="line-number">23</span><br><span class="line-number">24</span><br><span class="line-number">25</span><br><span class="line-number">26</span><br><span class="line-number">27</span><br><span class="line-number">28</span><br><span class="line-number">29</span><br><span class="line-number">30</span><br><span class="line-number">31</span><br><span class="line-number">32</span><br><span class="line-number">33</span><br><span class="line-number">34</span><br></div></div>`,194),i=[e];function r(c,b,t,u,m,o){return a(),n("div",null,i)}const g=s(l,[["render",r]]);export{d as __pageData,g as default};
