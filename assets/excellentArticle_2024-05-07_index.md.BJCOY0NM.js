import{_ as s,c as n,o as a,a4 as p,bq as e,br as l,bs as i}from"./chunks/framework.BaCLUa54.js";const k=JSON.parse('{"title":"5分钟带你了解【前端装饰器】，“高大上”的“基础知识”","description":"","frontmatter":{},"headers":[],"relativePath":"excellentArticle/2024-05-07/index.md","filePath":"excellentArticle/2024-05-07/index.md","lastUpdated":1715160906000}'),r={name:"excellentArticle/2024-05-07/index.md"},c=p('<h1 id="_5分钟带你了解【前端装饰器】-高大上-的-基础知识" tabindex="-1">5分钟带你了解【前端装饰器】，“高大上”的“基础知识” <a class="header-anchor" href="#_5分钟带你了解【前端装饰器】-高大上-的-基础知识" aria-label="Permalink to &quot;5分钟带你了解【前端装饰器】，“高大上”的“基础知识”&quot;">​</a></h1><blockquote><p>装饰器来啦</p></blockquote><p><img src="'+e+'" alt="img"></p><h2 id="前言" tabindex="-1">前言 <a class="header-anchor" href="#前言" aria-label="Permalink to &quot;前言&quot;">​</a></h2><p>大家好，我是林三心，用最通俗易懂的话讲最难的知识点是我的座右铭，基础是进阶的前提是我的初心。</p><p><img src="'+l+`" alt="medium-zoom"></p><h2 id="基本介绍" tabindex="-1">基本介绍 <a class="header-anchor" href="#基本介绍" aria-label="Permalink to &quot;基本介绍&quot;">​</a></h2><p>装饰器是一种以 @ 符号开头的特殊语法，放在目标代码的前面用于包装或扩展代码功能。JavaScript 的装饰器语法目前仍处于提案阶段，现阶段使用的话需要通过 bable 等方式进行编译之后，才能在浏览器正常运行。装饰器分为两种：类装饰器，类成员装饰器，分别用于装饰我们的类以及类的成员。</p><h2 id="基本使用-类装饰器" tabindex="-1">基本使用（类装饰器） <a class="header-anchor" href="#基本使用-类装饰器" aria-label="Permalink to &quot;基本使用（类装饰器）&quot;">​</a></h2><div class="language- vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>class MyClass {</span></span>
<span class="line"><span>  constructor() {}</span></span>
<span class="line"><span>}</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br></div></div><p>比如现在有一个类或者函数 <code>MyClass</code>，它的身上没有任何的东西，但是我想要给他加一个 <code>log</code> 方法，那我们应该怎么做呢？很多人回想说，直接在它身上加一个 <code>log</code> 方法即可~</p><div class="language- vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>class MyClass {</span></span>
<span class="line"><span>  constructor() {}</span></span>
<span class="line"><span>  </span></span>
<span class="line"><span>  log() {}</span></span>
<span class="line"><span>}</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br></div></div><p>但是这么做的话，一个 class 是能做，那如果要给 1000 个 class 加上 <code>log</code>方法呢？那岂不是每一个都得写~很麻烦，这个时候可以使用 <code>装饰器</code> 去拓展每一个 class</p><ul><li>可以拓展原型方法</li><li>可以拓展静态属性</li></ul><p>装饰器接收的参数是装饰的目标类，这里的 <code>cls</code> 就是 <code>MyClass</code></p><div class="language- vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>function addConcole(target) {</span></span>
<span class="line"><span>  // 拓展原型方法</span></span>
<span class="line"><span>  target.prototype.log = function(msg) {</span></span>
<span class="line"><span>    console.log(\`[\${new Date()} \${msg}]\`);</span></span>
<span class="line"><span>  };</span></span>
<span class="line"><span>  // 拓展静态属性</span></span>
<span class="line"><span>  target.myName = &#39;一个类&#39;</span></span>
<span class="line"><span>  return target;</span></span>
<span class="line"><span>}</span></span>
<span class="line"><span></span></span>
<span class="line"><span>@addConcole</span></span>
<span class="line"><span>class MyClass {</span></span>
<span class="line"><span>  constructor() {}</span></span>
<span class="line"><span>}</span></span>
<span class="line"><span></span></span>
<span class="line"><span>const myObj = new MyClass();</span></span>
<span class="line"><span>myObj.log(&#39;林三心&#39;);</span></span>
<span class="line"><span>// [Sat Jul 08 2023 17:31:55 GMT+0800 (中国标准时间) 林三心]</span></span>
<span class="line"><span>console.log(MyClass.myName)</span></span>
<span class="line"><span>// 一个类</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br></div></div><h2 id="应用场景" tabindex="-1">应用场景 <a class="header-anchor" href="#应用场景" aria-label="Permalink to &quot;应用场景&quot;">​</a></h2><h3 id="node路由请求url-类成员装饰器" tabindex="-1">Node路由请求Url（类成员装饰器） <a class="header-anchor" href="#node路由请求url-类成员装饰器" aria-label="Permalink to &quot;Node路由请求Url（类成员装饰器）&quot;">​</a></h3><p>我们在使用一些 Node 的框架时，在写接口的时候，我们可能会经常看到这样的代码</p><ul><li>当我们请求路径是 GET doc 时会匹配到findDocById</li><li>当我们请求路径是 POST doc 时会匹配到createDoc</li></ul><div class="language- vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>class Doc {</span></span>
<span class="line"><span>  @Get(&#39;doc&#39;)</span></span>
<span class="line"><span>  async findDocById(id) {}</span></span>
<span class="line"><span>  </span></span>
<span class="line"><span>  @Post(&#39;doc&#39;)</span></span>
<span class="line"><span>  async createDoc(data) {}</span></span>
<span class="line"><span>}</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br></div></div><p>其实这个 <code>@Get</code> 和 <code>@Post</code> ，是框架提供给我们的 <code>类成员装饰器</code>，是的，类成员也能使用装饰器，类成员装饰器接收三个参数：</p><ul><li><code>target</code> 是目标类的原型对象</li><li><code>key</code> 表示目标类成员的键名</li><li><code>descriptor</code> 是一个属性描述符对象，它包含目标类成员的属性特性（例如 value、writable 等）</li></ul><div class="language- vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>function Get(path) {</span></span>
<span class="line"><span>  return function(target, key, descriptor) {</span></span>
<span class="line"><span>    console.log({</span></span>
<span class="line"><span>      target,</span></span>
<span class="line"><span>      key，</span></span>
<span class="line"><span>      descriptor</span></span>
<span class="line"><span>    })</span></span>
<span class="line"><span>  }</span></span>
<span class="line"><span>}</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br></div></div><p><img src="`+i+`" alt="medium-zoom"></p><p>他的基本实现原理大概是这样的</p><div class="language- vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>function Get(routePath) {</span></span>
<span class="line"><span>  return function(target, key, descriptor) {</span></span>
<span class="line"><span>    const originalMethod = descriptor.value; // 保存原始方法</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    descriptor.value = function() {</span></span>
<span class="line"><span>      // 在原始方法执行前加入逻辑</span></span>
<span class="line"><span>      console.log(&#39;处理 Get 请求，路由路径: &#39; + routePath);</span></span>
<span class="line"><span></span></span>
<span class="line"><span>      // 执行原始方法</span></span>
<span class="line"><span>      const result = originalMethod.apply(this, arguments);</span></span>
<span class="line"><span></span></span>
<span class="line"><span>      // 在原始方法执行后加入逻辑</span></span>
<span class="line"><span>      console.log(&#39;Get 请求处理完成&#39;);</span></span>
<span class="line"><span></span></span>
<span class="line"><span>      return result;</span></span>
<span class="line"><span>    };</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    return descriptor;</span></span>
<span class="line"><span>  };</span></span>
<span class="line"><span>}</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br></div></div><h3 id="接口权限控制-类成员装饰器叠加" tabindex="-1">接口权限控制（类成员装饰器叠加） <a class="header-anchor" href="#接口权限控制-类成员装饰器叠加" aria-label="Permalink to &quot;接口权限控制（类成员装饰器叠加）&quot;">​</a></h3><p>上面我们介绍了一下 Nodejs Url 的路由匹配基本原理，但是这是不够的，因为很多接口还需要权限控制，比如：</p><ul><li>GET doc 接口只能 管理员 才能访问</li><li>POST doc 接口只能 超级管理员 才能访问</li></ul><p>这也可以用装饰器来实现，并且装饰器是可以叠加的~</p><div class="language- vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>class Doc {</span></span>
<span class="line"><span>  @Get(&#39;doc&#39;)</span></span>
<span class="line"><span>  @Role(&#39;admin&#39;)</span></span>
<span class="line"><span>  async findDocById(id) {}</span></span>
<span class="line"><span>  </span></span>
<span class="line"><span>  @Post(&#39;doc&#39;)</span></span>
<span class="line"><span>  @Role(&#39;superAdmin&#39;)</span></span>
<span class="line"><span>  async createDoc(data) {}</span></span>
<span class="line"><span>}</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br></div></div><p>装饰器叠加的执行顺序是 从下往上 的~我们可以看一下下面的例子，发现输出顺序是</p><ul><li>2</li><li>1</li></ul><div class="language- vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>function A () {</span></span>
<span class="line"><span>  console.log(1)</span></span>
<span class="line"><span>}</span></span>
<span class="line"><span>function B () {</span></span>
<span class="line"><span>  console.log(2)</span></span>
<span class="line"><span>}</span></span>
<span class="line"><span>class Doc {</span></span>
<span class="line"><span>  @A</span></span>
<span class="line"><span>  @B</span></span>
<span class="line"><span>  async test() {}</span></span>
<span class="line"><span>}</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br></div></div><p>至于权限控制的装饰器实现，需要根据不同业务去实现，我这里就粗略实现一下</p><div class="language- vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>function Role(permissions) {</span></span>
<span class="line"><span>  return function(target, key, descriptor) {</span></span>
<span class="line"><span>    const originalMethod = descriptor.value; // 保存原始方法</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    descriptor.value = function() {</span></span>
<span class="line"><span>      // 在原始方法执行前进行权限验证</span></span>
<span class="line"><span>      const user = getCurrentUser(); // 获取当前用户信息</span></span>
<span class="line"><span></span></span>
<span class="line"><span>      // 检查用户是否拥有所需权限</span></span>
<span class="line"><span>      const hasPermission = checkUserPermissions(user, permissions);</span></span>
<span class="line"><span></span></span>
<span class="line"><span>      if (!hasPermission) {</span></span>
<span class="line"><span>        // 如果用户没有权限，则抛出错误或执行其他处理</span></span>
<span class="line"><span>        throw new Error(&#39;无权限访问该接口&#39;);</span></span>
<span class="line"><span>      }</span></span>
<span class="line"><span></span></span>
<span class="line"><span>      // 执行原始方法</span></span>
<span class="line"><span>      const result = originalMethod.apply(this, arguments);</span></span>
<span class="line"><span></span></span>
<span class="line"><span>      return result;</span></span>
<span class="line"><span>    };</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    return descriptor;</span></span>
<span class="line"><span>  };</span></span>
<span class="line"><span>}</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br><span class="line-number">22</span><br><span class="line-number">23</span><br><span class="line-number">24</span><br><span class="line-number">25</span><br></div></div><h3 id="记录日志的装饰器" tabindex="-1">记录日志的装饰器 <a class="header-anchor" href="#记录日志的装饰器" aria-label="Permalink to &quot;记录日志的装饰器&quot;">​</a></h3><p>我们想要在执行某个函数的时候，记录一下</p><ul><li>函数调用时间</li><li>函数调用参数</li></ul><p>这个时候我们也可以使用装饰器来完成，非常方便！！！</p><div class="language- vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>// 日志装饰器函数</span></span>
<span class="line"><span>function logDecorator(target, key, descriptor) {</span></span>
<span class="line"><span>  const originalMethod = descriptor.value; // 保存原始方法</span></span>
<span class="line"><span></span></span>
<span class="line"><span>  descriptor.value = function(...args) {</span></span>
<span class="line"><span>    console.log(\`调用函数：\${key}\`);</span></span>
<span class="line"><span>    console.log(\`参数：\${JSON.stringify(args)}\`);</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    // 执行原始方法</span></span>
<span class="line"><span>    const result = originalMethod.apply(this, args);</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    console.log(\`返回值：\${result}\`);</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    return result;</span></span>
<span class="line"><span>  };</span></span>
<span class="line"><span></span></span>
<span class="line"><span>  return descriptor;</span></span>
<span class="line"><span>}</span></span>
<span class="line"><span></span></span>
<span class="line"><span>// 示例类</span></span>
<span class="line"><span>class Example {</span></span>
<span class="line"><span>  @logDecorator</span></span>
<span class="line"><span>  greet(name) {</span></span>
<span class="line"><span>    return \`Hello, \${name}!\`;</span></span>
<span class="line"><span>  }</span></span>
<span class="line"><span>}</span></span>
<span class="line"><span></span></span>
<span class="line"><span>// 测试</span></span>
<span class="line"><span>const example = new Example();</span></span>
<span class="line"><span>example.greet(&#39;林三心&#39;);</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br><span class="line-number">22</span><br><span class="line-number">23</span><br><span class="line-number">24</span><br><span class="line-number">25</span><br><span class="line-number">26</span><br><span class="line-number">27</span><br><span class="line-number">28</span><br><span class="line-number">29</span><br><span class="line-number">30</span><br></div></div><h3 id="缓存的装饰器" tabindex="-1">缓存的装饰器 <a class="header-anchor" href="#缓存的装饰器" aria-label="Permalink to &quot;缓存的装饰器&quot;">​</a></h3><p>如果我们执行一个方法，获取返回值需要经过一系列的计算，非常耗时间，那么我们可以判断入参，第一次时计算完缓存起来，第二次的时候如果还是这个入参，就直接从缓存中去拿，这个操作也可以使用装饰器去完成</p><div class="language- vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>// 缓存装饰器函数</span></span>
<span class="line"><span>function cacheDecorator(target, key, descriptor) {</span></span>
<span class="line"><span>  const cache = {}; // 缓存对象</span></span>
<span class="line"><span></span></span>
<span class="line"><span>  const originalMethod = descriptor.value; // 保存原始方法</span></span>
<span class="line"><span></span></span>
<span class="line"><span>  descriptor.value = function(...args) {</span></span>
<span class="line"><span>    const cacheKey = JSON.stringify(args); // 生成缓存键</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    if (cacheKey in cache) {</span></span>
<span class="line"><span>      console.log(&#39;从缓存中获取结果&#39;);</span></span>
<span class="line"><span>      return cache[cacheKey]; // 直接返回缓存结果</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    // 执行原始方法</span></span>
<span class="line"><span>    const result = originalMethod.apply(this, args);</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    console.log(&#39;将结果缓存起来&#39;);</span></span>
<span class="line"><span>    cache[cacheKey] = result; // 缓存结果</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    return result;</span></span>
<span class="line"><span>  };</span></span>
<span class="line"><span></span></span>
<span class="line"><span>  return descriptor;</span></span>
<span class="line"><span>}</span></span>
<span class="line"><span></span></span>
<span class="line"><span>// 示例类</span></span>
<span class="line"><span>class Example {</span></span>
<span class="line"><span>  @cacheDecorator</span></span>
<span class="line"><span>  getValue(key) {</span></span>
<span class="line"><span>    console.log(&#39;执行函数逻辑&#39;);</span></span>
<span class="line"><span>    return key + Math.random(); // 模拟复杂的计算逻辑</span></span>
<span class="line"><span>  }</span></span>
<span class="line"><span>}</span></span>
<span class="line"><span></span></span>
<span class="line"><span>// 测试</span></span>
<span class="line"><span>const example = new Example();</span></span>
<span class="line"><span>console.log(example.getValue(&#39;foo&#39;));</span></span>
<span class="line"><span>console.log(example.getValue(&#39;foo&#39;)); // 从缓存中获取结果</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br><span class="line-number">22</span><br><span class="line-number">23</span><br><span class="line-number">24</span><br><span class="line-number">25</span><br><span class="line-number">26</span><br><span class="line-number">27</span><br><span class="line-number">28</span><br><span class="line-number">29</span><br><span class="line-number">30</span><br><span class="line-number">31</span><br><span class="line-number">32</span><br><span class="line-number">33</span><br><span class="line-number">34</span><br><span class="line-number">35</span><br><span class="line-number">36</span><br><span class="line-number">37</span><br><span class="line-number">38</span><br><span class="line-number">39</span><br></div></div><h3 id="防抖节流的装饰器" tabindex="-1">防抖节流的装饰器 <a class="header-anchor" href="#防抖节流的装饰器" aria-label="Permalink to &quot;防抖节流的装饰器&quot;">​</a></h3><p>对于防抖节流，我们平时可能会这么去做</p><div class="language- vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>class C {</span></span>
<span class="line"><span>  onClick = debounce(fn, 100)</span></span>
<span class="line"><span>}</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br></div></div><p>但是这么做的话会使这个函数不好拓展，所以使用装饰器真的很方便</p><div class="language- vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>// 防抖装饰器</span></span>
<span class="line"><span>function debounce(time) {</span></span>
<span class="line"><span>  return function (target, key, descriptor) {</span></span>
<span class="line"><span>    const oldFunction = descriptor.value;</span></span>
<span class="line"><span>    let timer = null;</span></span>
<span class="line"><span>    descriptor.value = function () {</span></span>
<span class="line"><span>      clearTimeout(timer);</span></span>
<span class="line"><span>      timer = setTimeout(() =&gt; {</span></span>
<span class="line"><span>        oldFunction.apply(this, arguments)</span></span>
<span class="line"><span>      }, time);</span></span>
<span class="line"><span>    };</span></span>
<span class="line"><span>    return descriptor;</span></span>
<span class="line"><span>  }</span></span>
<span class="line"><span>}</span></span>
<span class="line"><span></span></span>
<span class="line"><span>// 节流装饰器</span></span>
<span class="line"><span>function throttle(time) {</span></span>
<span class="line"><span>  return function (target, key, descriptor) {</span></span>
<span class="line"><span>    const oldFunction = descriptor.value;</span></span>
<span class="line"><span>    let isLock = false;</span></span>
<span class="line"><span>    descriptor.value = function() {</span></span>
<span class="line"><span>      if(isLock) { return; }</span></span>
<span class="line"><span>      isLock = true;</span></span>
<span class="line"><span>      oldFunction.apply(this, arguments);</span></span>
<span class="line"><span>      setTimeout(() =&gt; {</span></span>
<span class="line"><span>        isLock = false; </span></span>
<span class="line"><span>      }, time);</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span>    return descriptor;</span></span>
<span class="line"><span>  }</span></span>
<span class="line"><span>}</span></span>
<span class="line"><span></span></span>
<span class="line"><span>class C {</span></span>
<span class="line"><span>  @debounce(1000)</span></span>
<span class="line"><span>  onClick() {}</span></span>
<span class="line"><span>  </span></span>
<span class="line"><span>  @throttle(1000)</span></span>
<span class="line"><span>  onScroll() {}</span></span>
<span class="line"><span>}</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br><span class="line-number">22</span><br><span class="line-number">23</span><br><span class="line-number">24</span><br><span class="line-number">25</span><br><span class="line-number">26</span><br><span class="line-number">27</span><br><span class="line-number">28</span><br><span class="line-number">29</span><br><span class="line-number">30</span><br><span class="line-number">31</span><br><span class="line-number">32</span><br><span class="line-number">33</span><br><span class="line-number">34</span><br><span class="line-number">35</span><br><span class="line-number">36</span><br><span class="line-number">37</span><br><span class="line-number">38</span><br><span class="line-number">39</span><br></div></div>`,50),b=[c];function t(u,o,m,d,h,g){return a(),n("div",null,b)}const y=s(r,[["render",t]]);export{k as __pageData,y as default};
