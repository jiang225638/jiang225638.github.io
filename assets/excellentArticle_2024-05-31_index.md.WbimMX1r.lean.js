import{_ as s,c as n,o as a,a5 as p,c4 as e,c5 as l,c6 as i,c7 as r}from"./chunks/framework.OHpCs1Hn.js";const f=JSON.parse('{"title":"赶快收藏！全网最佳websocket封装：完美支持断网重连、自动心跳！","description":"","frontmatter":{},"headers":[],"relativePath":"excellentArticle/2024-05-31/index.md","filePath":"excellentArticle/2024-05-31/index.md","lastUpdated":1717123193000}'),c={name:"excellentArticle/2024-05-31/index.md"},t=p(`<h1 id="赶快收藏-全网最佳websocket封装-完美支持断网重连、自动心跳" tabindex="-1">赶快收藏！全网最佳websocket封装：完美支持断网重连、自动心跳！ <a class="header-anchor" href="#赶快收藏-全网最佳websocket封装-完美支持断网重连、自动心跳" aria-label="Permalink to &quot;赶快收藏！全网最佳websocket封装：完美支持断网重连、自动心跳！&quot;">​</a></h1><h2 id="简介" tabindex="-1"><strong>简介</strong> <a class="header-anchor" href="#简介" aria-label="Permalink to &quot;**简介**&quot;">​</a></h2><p><strong>websocket在前端开发中，是一个必须掌握的技术！你可以不用，但必须掌握！</strong></p><p>前几天，就遇到这样一个需求，要求界面的数据通过<code>websocket</code>实时推送，并且必须支持<strong>断网重连、自动心跳</strong>！</p><blockquote><p>自动心跳是定期向服务端发送小型数据包，如果一段时间内服务端没有收到心跳响应，系统可能会断开连接。</p></blockquote><p>websokect的API非常简单</p><div class="language- vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span>// 创建ws连接</span></span>
<span class="line"><span>const ws = new WebSocket(&#39;ws://localhost:8080/test&#39;);</span></span>
<span class="line"><span>ws.onopen = function() {</span></span>
<span class="line"><span>    console.log(&#39;WebSocket 连接已经建立。&#39;);</span></span>
<span class="line"><span>    ws.send(&#39;Hello, server!&#39;);</span></span>
<span class="line"><span>};</span></span>
<span class="line"><span>ws.onmessage = function(event) {</span></span>
<span class="line"><span>    console.log(&#39;收到服务器消息：&#39;, event.data);</span></span>
<span class="line"><span>};</span></span>
<span class="line"><span>ws.onerror = function(event) {</span></span>
<span class="line"><span>    console.error(&#39;WebSocket 连接出现错误：&#39;, event);</span></span>
<span class="line"><span>};</span></span>
<span class="line"><span>ws.onclose = function() {</span></span>
<span class="line"><span>    console.log(&#39;WebSocket 连接已经关闭。&#39;);</span></span>
<span class="line"><span>}</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br></div></div><p>但是，要封装一个支持断网重连、自动心跳的websokect没有那么容易！</p><h2 id="封装成功演示" tabindex="-1"><strong>封装成功演示</strong> <a class="header-anchor" href="#封装成功演示" aria-label="Permalink to &quot;**封装成功演示**&quot;">​</a></h2><h2 id="核心优势" tabindex="-1"><strong>核心优势</strong> <a class="header-anchor" href="#核心优势" aria-label="Permalink to &quot;**核心优势**&quot;">​</a></h2><p>我们先看我封装的websokect，首先，最重要的，它的使用方法和官方Api完全一致！零学习成本，上手即用！</p><div class="language- vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span>import WebSocketClient from &quot;./WebSocketClient&quot;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>// 创建实例</span></span>
<span class="line"><span>const ws = new WebSocketClient(&#39;ws://localhost:3200&#39;);</span></span>
<span class="line"><span></span></span>
<span class="line"><span>// 连接</span></span>
<span class="line"><span>ws.connect()</span></span>
<span class="line"><span>// 同原生方法</span></span>
<span class="line"><span>ws.onclose(()=&gt;{})</span></span>
<span class="line"><span>// 同原生方法</span></span>
<span class="line"><span>ws.onerror(()=&gt;{})</span></span>
<span class="line"><span>// 同原生方法</span></span>
<span class="line"><span>ws.onmessage(()=&gt;{</span></span>
<span class="line"><span>  // 同原生方法</span></span>
<span class="line"><span>  ws.send(&quot;自定义发送的数据&quot;)</span></span>
<span class="line"><span>})</span></span>
<span class="line"><span>// 同原生方法</span></span>
<span class="line"><span>ws.onopen(()=&gt;{})</span></span>
<span class="line"><span></span></span>
<span class="line"><span>// 关闭连接</span></span>
<span class="line"><span>ws.close()</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br></div></div><h2 id="效果演示" tabindex="-1"><strong>效果演示</strong> <a class="header-anchor" href="#效果演示" aria-label="Permalink to &quot;**效果演示**&quot;">​</a></h2><h3 id="后端服务创建" tabindex="-1"><strong>后端服务创建</strong> <a class="header-anchor" href="#后端服务创建" aria-label="Permalink to &quot;**后端服务创建**&quot;">​</a></h3><p>我们先使用node创建一个后端服务，安装ws库：</p><div class="language- vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span>npm install ws</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br></div></div><p>创建node index.js文件，引入WebSocket 服务器</p><div class="language- vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span>const WebSocket = require(&quot;ws&quot;);</span></span>
<span class="line"><span></span></span>
<span class="line"><span>const wss = new WebSocket.Server({ port: 3200 });</span></span>
<span class="line"><span></span></span>
<span class="line"><span>console.log(&quot;服务运行在http://localhost:3200/&quot;);</span></span>
<span class="line"><span></span></span>
<span class="line"><span>wss.on(&quot;connection&quot;, (ws) =&gt; {</span></span>
<span class="line"><span>  console.log(&quot;[服务器]：客官您来了~里边请&quot;);</span></span>
<span class="line"><span>  ws.send(\`[websocket云端]您已经连接云端!数据推送中!\`);</span></span>
<span class="line"><span>  let index = 1;</span></span>
<span class="line"><span>  const interval = setInterval(() =&gt; {</span></span>
<span class="line"><span>    ws.send(\`[websocket]数据推送第\${index}次\`);</span></span>
<span class="line"><span>    index ++</span></span>
<span class="line"><span>  }, 1000 * 10);</span></span>
<span class="line"><span></span></span>
<span class="line"><span>  ws.on(&quot;close&quot;, () =&gt; {</span></span>
<span class="line"><span>    clearInterval(interval); // 清除定时器</span></span>
<span class="line"><span>    console.log(&quot;[服务器]：客官下次再来呢~&quot;);</span></span>
<span class="line"><span>  });</span></span>
<span class="line"><span>});</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br></div></div><p>我们启动这个服务</p><div class="language- vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span>node index.js</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br></div></div><p>现在，我们在前端服务内进行连接测试</p><h3 id="前端websokect测试" tabindex="-1"><strong>前端websokect测试</strong> <a class="header-anchor" href="#前端websokect测试" aria-label="Permalink to &quot;**前端websokect测试**&quot;">​</a></h3><p>我们先写前端的相关逻辑</p><div class="language- vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span>import { WebSocketClient } from &#39;@/utils/dataDispatcher/WebSocketClient&#39;;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>const ws = new WebSocketClient(&#39;ws://localhost:3200&#39;);</span></span>
<span class="line"><span></span></span>
<span class="line"><span>// 连接</span></span>
<span class="line"><span>ws.connect();</span></span>
<span class="line"><span>// 同原生方法</span></span>
<span class="line"><span>ws.onclose(() =&gt; {});</span></span>
<span class="line"><span>// 同原生方法</span></span>
<span class="line"><span>ws.onerror(() =&gt; {});</span></span>
<span class="line"><span>// 同原生方法</span></span>
<span class="line"><span>ws.onmessage(() =&gt; {</span></span>
<span class="line"><span>    // 同原生方法</span></span>
<span class="line"><span>    ws.send(&#39;自定义发送的数据&#39;);</span></span>
<span class="line"><span>});</span></span>
<span class="line"><span>// 同原生方法</span></span>
<span class="line"><span>ws.onopen(() =&gt; {});</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br></div></div><p>启动项目，我们会发现控制台已经有了提示</p><p><img src="`+e+'" alt="medium-zoom"></p><p><strong>心跳验证：</strong></p><p>等待一段时间后，我们可以看到ws连接里，前端已经发送了多次心跳数据</p><p><img src="'+l+'" alt="medium-zoom"></p><p>服务端与客户端也一直在进行数据交互</p><p><img src="'+i+'" alt="medium-zoom"></p><p><strong>断网重连验证：</strong></p><p>可以看到，当我们断开服务端的时候，断网重连被自动触发。 <img src="'+r+`" alt="medium-zoom"></p><h2 id="技术路线" tabindex="-1"><strong>技术路线</strong> <a class="header-anchor" href="#技术路线" aria-label="Permalink to &quot;**技术路线**&quot;">​</a></h2><h2 id="基本框架搭建" tabindex="-1"><strong>基本框架搭建</strong> <a class="header-anchor" href="#基本框架搭建" aria-label="Permalink to &quot;**基本框架搭建**&quot;">​</a></h2><div class="language- vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span>export class WebSocketClient {</span></span>
<span class="line"><span>    // #socket链接</span></span>
<span class="line"><span>    private url = &#39;&#39;;</span></span>
<span class="line"><span>    // #socket实例</span></span>
<span class="line"><span>    private socket: WebSocket | null = null;</span></span>
<span class="line"><span>    </span></span>
<span class="line"><span>    constructor(url: string) {</span></span>
<span class="line"><span>        super();</span></span>
<span class="line"><span>        this.url = url;</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span>   </span></span>
<span class="line"><span>    // &gt;消息发送</span></span>
<span class="line"><span>    public send(message: string): void {</span></span>
<span class="line"><span>        if (this.socket &amp;&amp; this.socket.readyState === WebSocket.OPEN) {</span></span>
<span class="line"><span>            this.socket.send(message);</span></span>
<span class="line"><span>        } else {</span></span>
<span class="line"><span>            console.error(&#39;[WebSocket] 未连接&#39;);</span></span>
<span class="line"><span>        }</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    // !初始化连接</span></span>
<span class="line"><span>    public connect(): void {</span></span>
<span class="line"><span>        if (this.socket &amp;&amp; this.socket.readyState === WebSocket.OPEN) {</span></span>
<span class="line"><span>            return;</span></span>
<span class="line"><span>        }</span></span>
<span class="line"><span>        this.socket = new WebSocket(this.url);</span></span>
<span class="line"><span></span></span>
<span class="line"><span>        // !websocket连接成功</span></span>
<span class="line"><span>        this.socket.onopen = event =&gt; {</span></span>
<span class="line"><span>            console.log(\`连接成功,等待服务端数据推送[onopen]...\`);</span></span>
<span class="line"><span>        };</span></span>
<span class="line"><span></span></span>
<span class="line"><span>        this.socket.onmessage = event =&gt; {</span></span>
<span class="line"><span>        };</span></span>
<span class="line"><span></span></span>
<span class="line"><span>        this.socket.onclose = event =&gt; {</span></span>
<span class="line"><span>            console.log(\`连接断开[onclose]...\`);</span></span>
<span class="line"><span>        };</span></span>
<span class="line"><span></span></span>
<span class="line"><span>        this.socket.onerror = event =&gt; {</span></span>
<span class="line"><span>            console.log(\`连接异常[onerror]...\`);</span></span>
<span class="line"><span>        };</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    // &gt;关闭连接</span></span>
<span class="line"><span>    public close(): void {</span></span>
<span class="line"><span>        if (this.socket) {</span></span>
<span class="line"><span>            this.socket.close();</span></span>
<span class="line"><span>            this.socket = null;</span></span>
<span class="line"><span>        }</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span>}</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br><span class="line-number">22</span><br><span class="line-number">23</span><br><span class="line-number">24</span><br><span class="line-number">25</span><br><span class="line-number">26</span><br><span class="line-number">27</span><br><span class="line-number">28</span><br><span class="line-number">29</span><br><span class="line-number">30</span><br><span class="line-number">31</span><br><span class="line-number">32</span><br><span class="line-number">33</span><br><span class="line-number">34</span><br><span class="line-number">35</span><br><span class="line-number">36</span><br><span class="line-number">37</span><br><span class="line-number">38</span><br><span class="line-number">39</span><br><span class="line-number">40</span><br><span class="line-number">41</span><br><span class="line-number">42</span><br><span class="line-number">43</span><br><span class="line-number">44</span><br><span class="line-number">45</span><br><span class="line-number">46</span><br><span class="line-number">47</span><br><span class="line-number">48</span><br><span class="line-number">49</span><br><span class="line-number">50</span><br><span class="line-number">51</span><br><span class="line-number">52</span><br></div></div><p>上述代码借助官方API实现了一个基本的 WebSocket 客户端，具有以下功能：</p><ul><li>初始化连接并处理各种 WebSocket 事件（打开、消息、关闭、错误）。</li><li>发送消息到服务器。</li><li>关闭连接。</li></ul><p>现在，我们开始逐步完善代码，进行封装。</p><h2 id="断网重连封装" tabindex="-1"><strong>断网重连封装</strong> <a class="header-anchor" href="#断网重连封装" aria-label="Permalink to &quot;**断网重连封装**&quot;">​</a></h2><div class="language- vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span>export class WebSocketClient{</span></span>
<span class="line"><span>    // #socket链接</span></span>
<span class="line"><span>    private url = &#39;&#39;;</span></span>
<span class="line"><span>    // #socket实例</span></span>
<span class="line"><span>    private socket: WebSocket | null = null;</span></span>
<span class="line"><span>    // #重连次数</span></span>
<span class="line"><span>    private reconnectAttempts = 0;</span></span>
<span class="line"><span>    // #最大重连数</span></span>
<span class="line"><span>    private maxReconnectAttempts = 5;</span></span>
<span class="line"><span>    // #重连间隔</span></span>
<span class="line"><span>    private reconnectInterval = 10000; // 10 seconds</span></span>
<span class="line"><span>  </span></span>
<span class="line"><span>    constructor(url: string) {</span></span>
<span class="line"><span>        super();</span></span>
<span class="line"><span>        this.url = url;</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span>    // &gt;消息发送</span></span>
<span class="line"><span>    public send(message: string): void {</span></span>
<span class="line"><span>        if (this.socket &amp;&amp; this.socket.readyState === WebSocket.OPEN) {</span></span>
<span class="line"><span>            this.socket.send(message);</span></span>
<span class="line"><span>        } else {</span></span>
<span class="line"><span>            console.error(&#39;[WebSocket] 未连接&#39;);</span></span>
<span class="line"><span>        }</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    // !初始化连接</span></span>
<span class="line"><span>    public connect(): void {</span></span>
<span class="line"><span>        if (this.reconnectAttempts === 0) {</span></span>
<span class="line"><span>            console.log(\`初始化连接中...\`);</span></span>
<span class="line"><span>        }</span></span>
<span class="line"><span>        if (this.socket &amp;&amp; this.socket.readyState === WebSocket.OPEN) {</span></span>
<span class="line"><span>            return;</span></span>
<span class="line"><span>        }</span></span>
<span class="line"><span>        this.socket = new WebSocket(this.url);</span></span>
<span class="line"><span></span></span>
<span class="line"><span>        // !websocket连接成功</span></span>
<span class="line"><span>        this.socket.onopen = event =&gt; {</span></span>
<span class="line"><span>            // 重置重连尝试成功连接</span></span>
<span class="line"><span>            this.reconnectAttempts = 0;</span></span>
<span class="line"><span>            console.log(\`连接成功,等待服务端数据推送[onopen]...\`);</span></span>
<span class="line"><span>        };</span></span>
<span class="line"><span></span></span>
<span class="line"><span>        this.socket.onmessage = event =&gt; {</span></span>
<span class="line"><span>        };</span></span>
<span class="line"><span></span></span>
<span class="line"><span>        this.socket.onclose = event =&gt; {</span></span>
<span class="line"><span>            if (this.reconnectAttempts === 0) {</span></span>
<span class="line"><span>                console.log(\`连接断开[onclose]...\`);</span></span>
<span class="line"><span>            }</span></span>
<span class="line"><span>            if (!this.stopWs) {</span></span>
<span class="line"><span>                this.handleReconnect();</span></span>
<span class="line"><span>            }</span></span>
<span class="line"><span>        };</span></span>
<span class="line"><span></span></span>
<span class="line"><span>        this.socket.onerror = event =&gt; {</span></span>
<span class="line"><span>            if (this.reconnectAttempts === 0) {</span></span>
<span class="line"><span>                console.log(\`连接异常[onerror]...\`);</span></span>
<span class="line"><span>            }</span></span>
<span class="line"><span>        };</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    // &gt; 断网重连逻辑</span></span>
<span class="line"><span>    private handleReconnect(): void {</span></span>
<span class="line"><span>        if (this.reconnectAttempts &lt; this.maxReconnectAttempts) {</span></span>
<span class="line"><span>            this.reconnectAttempts++;</span></span>
<span class="line"><span>            console.log(\`尝试重连... (\${this.reconnectAttempts}/\${this.maxReconnectAttempts})\`);</span></span>
<span class="line"><span>            setTimeout(() =&gt; {</span></span>
<span class="line"><span>                this.connect();</span></span>
<span class="line"><span>            }, this.reconnectInterval);</span></span>
<span class="line"><span>        } else {</span></span>
<span class="line"><span>            console.log(\`最大重连失败，终止重连: \${this.url}\`);</span></span>
<span class="line"><span>        }</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    // &gt;关闭连接</span></span>
<span class="line"><span>    public close(): void {</span></span>
<span class="line"><span>        if (this.socket) {</span></span>
<span class="line"><span>            this.socket.close();</span></span>
<span class="line"><span>            this.socket = null;</span></span>
<span class="line"><span>        }</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span>}</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br><span class="line-number">22</span><br><span class="line-number">23</span><br><span class="line-number">24</span><br><span class="line-number">25</span><br><span class="line-number">26</span><br><span class="line-number">27</span><br><span class="line-number">28</span><br><span class="line-number">29</span><br><span class="line-number">30</span><br><span class="line-number">31</span><br><span class="line-number">32</span><br><span class="line-number">33</span><br><span class="line-number">34</span><br><span class="line-number">35</span><br><span class="line-number">36</span><br><span class="line-number">37</span><br><span class="line-number">38</span><br><span class="line-number">39</span><br><span class="line-number">40</span><br><span class="line-number">41</span><br><span class="line-number">42</span><br><span class="line-number">43</span><br><span class="line-number">44</span><br><span class="line-number">45</span><br><span class="line-number">46</span><br><span class="line-number">47</span><br><span class="line-number">48</span><br><span class="line-number">49</span><br><span class="line-number">50</span><br><span class="line-number">51</span><br><span class="line-number">52</span><br><span class="line-number">53</span><br><span class="line-number">54</span><br><span class="line-number">55</span><br><span class="line-number">56</span><br><span class="line-number">57</span><br><span class="line-number">58</span><br><span class="line-number">59</span><br><span class="line-number">60</span><br><span class="line-number">61</span><br><span class="line-number">62</span><br><span class="line-number">63</span><br><span class="line-number">64</span><br><span class="line-number">65</span><br><span class="line-number">66</span><br><span class="line-number">67</span><br><span class="line-number">68</span><br><span class="line-number">69</span><br><span class="line-number">70</span><br><span class="line-number">71</span><br><span class="line-number">72</span><br><span class="line-number">73</span><br><span class="line-number">74</span><br><span class="line-number">75</span><br><span class="line-number">76</span><br><span class="line-number">77</span><br><span class="line-number">78</span><br><span class="line-number">79</span><br><span class="line-number">80</span><br><span class="line-number">81</span><br><span class="line-number">82</span><br></div></div><p>上述代码添加了自动断网重连的机制。其核心逻辑在于以下几个方面：</p><ol><li><strong>记录重连次数</strong>：通过 reconnectAttempts 属性记录当前已经尝试重连的次数。</li><li><strong>设置最大重连次数</strong>：通过 maxReconnectAttempts 属性设置允许的最大重连次数。</li><li><strong>重连逻辑</strong>：在 onclose 和 onerror 事件中调用重连处理函数 handleReconnect。</li><li><strong>重连间隔</strong>：通过 reconnectInterval 属性设置每次重连的间隔时间，可以在每次重连时增加间隔以实现指数退避。</li></ol><p><strong>初始化连接并处理事件</strong></p><p>在 connect 方法中，初始化 WebSocket 连接并为其设置事件处理函数。特别关注 onclose 和 onerror 事件，在连接关闭和出现错误时调用重连逻辑。</p><div class="language- vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span>public connect(): void {</span></span>
<span class="line"><span>    if (this.reconnectAttempts === 0) {</span></span>
<span class="line"><span>        console.log(\`初始化连接中...\`);</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span>    if (this.socket &amp;&amp; this.socket.readyState === WebSocket.OPEN) {</span></span>
<span class="line"><span>        return;</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span>    this.socket = new WebSocket(this.url);</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    this.socket.onopen = (event: Event) =&gt; {</span></span>
<span class="line"><span>        this.reconnectAttempts = 0;</span></span>
<span class="line"><span>        console.log(\`连接成功,等待服务端数据推送[onopen]...\`);</span></span>
<span class="line"><span>    };</span></span>
<span class="line"><span>    this.socket.onclose = (event: CloseEvent) =&gt; {</span></span>
<span class="line"><span>        if (this.reconnectAttempts === 0) {</span></span>
<span class="line"><span>            console.log(\`连接断开[onclose]...\`);</span></span>
<span class="line"><span>        }</span></span>
<span class="line"><span>        this.handleReconnect();</span></span>
<span class="line"><span>    };</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    this.socket.onerror = (event: Event) =&gt; {</span></span>
<span class="line"><span>        if (this.reconnectAttempts === 0) {</span></span>
<span class="line"><span>            console.log(\`连接异常[onerror]...\`);</span></span>
<span class="line"><span>        }</span></span>
<span class="line"><span>        this.handleReconnect();</span></span>
<span class="line"><span>    };</span></span>
<span class="line"><span>}</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br><span class="line-number">22</span><br><span class="line-number">23</span><br><span class="line-number">24</span><br><span class="line-number">25</span><br><span class="line-number">26</span><br><span class="line-number">27</span><br></div></div><p><strong>处理重连逻辑</strong></p><p>在 handleReconnect 方法中，实现了实际的重连逻辑。该方法会递增 reconnectAttempts，检查是否达到最大重连次数，如果没有达到，则在指定的重连间隔后再次调用 connect 方法尝试重连。</p><div class="language- vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span>private handleReconnect(): void {</span></span>
<span class="line"><span>    if (this.reconnectAttempts &lt; this.maxReconnectAttempts) {</span></span>
<span class="line"><span>        this.reconnectAttempts++;</span></span>
<span class="line"><span>        console.log(\`尝试重连... (\${this.reconnectAttempts}/\${this.maxReconnectAttempts})\`);</span></span>
<span class="line"><span>        setTimeout(() =&gt; {</span></span>
<span class="line"><span>            this.connect();</span></span>
<span class="line"><span>        }, this.reconnectInterval * this.reconnectAttempts); // 重连间隔可以增加，例如指数退避</span></span>
<span class="line"><span>    } else {</span></span>
<span class="line"><span>        console.log(\`最大重连失败，终止重连: \${this.url}\`);</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span>}</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br></div></div><p><strong>关闭连接</strong></p><p>在 close 方法中，手动关闭 WebSocket 连接并将 socket 设置为 null。</p><div class="language- vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span>public close(): void {</span></span>
<span class="line"><span>    if (this.socket) {</span></span>
<span class="line"><span>        this.socket.close();</span></span>
<span class="line"><span>        this.socket = null;</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span>}</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br></div></div><h2 id="自动心跳封装" tabindex="-1"><strong>自动心跳封装</strong> <a class="header-anchor" href="#自动心跳封装" aria-label="Permalink to &quot;**自动心跳封装**&quot;">​</a></h2><p>自动心跳（Automatic Heartbeat）是一种在网络通信中常用的机制，用于维持连接的活跃状态，检测连接是否仍然有效，并及时发现和处理连接断开或故障的情况。心跳机制通过定期发送“心跳”消息（通常是一个简单的 ping 或者 pong 消息）来确认连接双方的状态。</p><p>实现自动心跳的基本思路</p><ol><li><strong>发送心跳消息</strong>：在 WebSocket 连接建立后，启动一个定时器，定期发送心跳消息到服务器。</li><li><strong>接收心跳响应</strong>：服务器收到心跳消息后返回响应，客户端接收到响应后重置定时器。</li><li><strong>检测心跳超时</strong>：如果在指定时间内没有收到心跳响应，则认为连接断开，进行重连。</li></ol><div class="language- vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span>export class WebSocketClient {</span></span>
<span class="line"><span>    // #socket链接</span></span>
<span class="line"><span>    private url = &#39;&#39;;</span></span>
<span class="line"><span>    // #socket实例</span></span>
<span class="line"><span>    private socket: WebSocket | null = null;</span></span>
<span class="line"><span>    // #重连次数</span></span>
<span class="line"><span>    private reconnectAttempts = 0;</span></span>
<span class="line"><span>    // #最大重连数</span></span>
<span class="line"><span>    private maxReconnectAttempts = 5;</span></span>
<span class="line"><span>    // #重连间隔</span></span>
<span class="line"><span>    private reconnectInterval = 10000; // 10 seconds</span></span>
<span class="line"><span>    // #发送心跳数据间隔</span></span>
<span class="line"><span>    private heartbeatInterval = 1000 * 30;</span></span>
<span class="line"><span>    // #计时器id</span></span>
<span class="line"><span>    private heartbeatTimer?: NodeJS.Timeout;</span></span>
<span class="line"><span>    // #彻底终止ws</span></span>
<span class="line"><span>    private stopWs = false;</span></span>
<span class="line"><span>    // *构造函数</span></span>
<span class="line"><span>    constructor(url: string) {</span></span>
<span class="line"><span>        super();</span></span>
<span class="line"><span>        this.url = url;</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span>    // &gt;消息发送</span></span>
<span class="line"><span>    public send(message: string): void {</span></span>
<span class="line"><span>        if (this.socket &amp;&amp; this.socket.readyState === WebSocket.OPEN) {</span></span>
<span class="line"><span>            this.socket.send(message);</span></span>
<span class="line"><span>        } else {</span></span>
<span class="line"><span>            console.error(&#39;[WebSocket] 未连接&#39;);</span></span>
<span class="line"><span>        }</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    // !初始化连接</span></span>
<span class="line"><span>    public connect(): void {</span></span>
<span class="line"><span>        if (this.reconnectAttempts === 0) {</span></span>
<span class="line"><span>            console.log(&#39;WebSocket&#39;, \`初始化连接中...\`);</span></span>
<span class="line"><span>        }</span></span>
<span class="line"><span>        if (this.socket &amp;&amp; this.socket.readyState === WebSocket.OPEN) {</span></span>
<span class="line"><span>            return;</span></span>
<span class="line"><span>        }</span></span>
<span class="line"><span>        this.socket = new WebSocket(this.url);</span></span>
<span class="line"><span></span></span>
<span class="line"><span>        // !websocket连接成功</span></span>
<span class="line"><span>        this.socket.onopen = event =&gt; {</span></span>
<span class="line"><span>            this.stopWs = false;</span></span>
<span class="line"><span>            // 重置重连尝试成功连接</span></span>
<span class="line"><span>            this.reconnectAttempts = 0;</span></span>
<span class="line"><span>            // 在连接成功时停止当前的心跳检测并重新启动</span></span>
<span class="line"><span>            this.startHeartbeat();</span></span>
<span class="line"><span>            console.log(\`连接成功,等待服务端数据推送[onopen]...\`);</span></span>
<span class="line"><span>        };</span></span>
<span class="line"><span></span></span>
<span class="line"><span>        this.socket.onmessage = event =&gt; {</span></span>
<span class="line"><span>            this.dispatchEvent(&#39;message&#39;, event);</span></span>
<span class="line"><span>            this.startHeartbeat();</span></span>
<span class="line"><span>        };</span></span>
<span class="line"><span></span></span>
<span class="line"><span>        this.socket.onclose = event =&gt; {</span></span>
<span class="line"><span>            if (this.reconnectAttempts === 0) {</span></span>
<span class="line"><span>                console.log(\`连接断开[onclose]...\`);</span></span>
<span class="line"><span>            }</span></span>
<span class="line"><span>            if (!this.stopWs) {</span></span>
<span class="line"><span>                this.handleReconnect();</span></span>
<span class="line"><span>            }</span></span>
<span class="line"><span>        };</span></span>
<span class="line"><span></span></span>
<span class="line"><span>        this.socket.onerror = event =&gt; {</span></span>
<span class="line"><span>            if (this.reconnectAttempts === 0) {</span></span>
<span class="line"><span>                console.log(\`连接异常[onerror]...\`);</span></span>
<span class="line"><span>            }</span></span>
<span class="line"><span>            this.closeHeartbeat();</span></span>
<span class="line"><span>        };</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    // &gt; 断网重连逻辑</span></span>
<span class="line"><span>    private handleReconnect(): void {</span></span>
<span class="line"><span>        if (this.reconnectAttempts &lt; this.maxReconnectAttempts) {</span></span>
<span class="line"><span>            this.reconnectAttempts++;</span></span>
<span class="line"><span>            console.log(&#39;WebSocket&#39;, \`尝试重连...\`);</span></span>
<span class="line"><span>            setTimeout(() =&gt; {</span></span>
<span class="line"><span>                this.connect();</span></span>
<span class="line"><span>            }, this.reconnectInterval);</span></span>
<span class="line"><span>        } else {</span></span>
<span class="line"><span>            this.closeHeartbeat();</span></span>
<span class="line"><span>            console.log(\`最大重连失败，终止重连: \${this.url}\`);</span></span>
<span class="line"><span>        }</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    // &gt;关闭连接</span></span>
<span class="line"><span>    public close(): void {</span></span>
<span class="line"><span>        if (this.socket) {</span></span>
<span class="line"><span>            this.stopWs = true;</span></span>
<span class="line"><span>            this.socket.close();</span></span>
<span class="line"><span>            this.socket = null;</span></span>
<span class="line"><span>        }</span></span>
<span class="line"><span>        this.closeHeartbeat();</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    // &gt;开始心跳检测 -&gt; 定时发送心跳消息</span></span>
<span class="line"><span>    private startHeartbeat(): void {</span></span>
<span class="line"><span>        if (this.stopWs) return;</span></span>
<span class="line"><span>        if (this.heartbeatTimer) {</span></span>
<span class="line"><span>            this.closeHeartbeat();</span></span>
<span class="line"><span>        }</span></span>
<span class="line"><span>        this.heartbeatTimer = setInterval(() =&gt; {</span></span>
<span class="line"><span>            if (this.socket) {</span></span>
<span class="line"><span>                this.socket.send(JSON.stringify({ type: &#39;heartBeat&#39;, data: {} }));</span></span>
<span class="line"><span>                console.log(&#39;WebSocket&#39;, &#39;送心跳数据...&#39;);</span></span>
<span class="line"><span>            } else {</span></span>
<span class="line"><span>                console.error(&#39;[WebSocket] 未连接&#39;);</span></span>
<span class="line"><span>            }</span></span>
<span class="line"><span>        }, this.heartbeatInterval);</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    // &gt;关闭心跳</span></span>
<span class="line"><span>    private closeHeartbeat(): void {</span></span>
<span class="line"><span>        clearInterval(this.heartbeatTimer);</span></span>
<span class="line"><span>        this.heartbeatTimer = undefined;</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span>}</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br><span class="line-number">22</span><br><span class="line-number">23</span><br><span class="line-number">24</span><br><span class="line-number">25</span><br><span class="line-number">26</span><br><span class="line-number">27</span><br><span class="line-number">28</span><br><span class="line-number">29</span><br><span class="line-number">30</span><br><span class="line-number">31</span><br><span class="line-number">32</span><br><span class="line-number">33</span><br><span class="line-number">34</span><br><span class="line-number">35</span><br><span class="line-number">36</span><br><span class="line-number">37</span><br><span class="line-number">38</span><br><span class="line-number">39</span><br><span class="line-number">40</span><br><span class="line-number">41</span><br><span class="line-number">42</span><br><span class="line-number">43</span><br><span class="line-number">44</span><br><span class="line-number">45</span><br><span class="line-number">46</span><br><span class="line-number">47</span><br><span class="line-number">48</span><br><span class="line-number">49</span><br><span class="line-number">50</span><br><span class="line-number">51</span><br><span class="line-number">52</span><br><span class="line-number">53</span><br><span class="line-number">54</span><br><span class="line-number">55</span><br><span class="line-number">56</span><br><span class="line-number">57</span><br><span class="line-number">58</span><br><span class="line-number">59</span><br><span class="line-number">60</span><br><span class="line-number">61</span><br><span class="line-number">62</span><br><span class="line-number">63</span><br><span class="line-number">64</span><br><span class="line-number">65</span><br><span class="line-number">66</span><br><span class="line-number">67</span><br><span class="line-number">68</span><br><span class="line-number">69</span><br><span class="line-number">70</span><br><span class="line-number">71</span><br><span class="line-number">72</span><br><span class="line-number">73</span><br><span class="line-number">74</span><br><span class="line-number">75</span><br><span class="line-number">76</span><br><span class="line-number">77</span><br><span class="line-number">78</span><br><span class="line-number">79</span><br><span class="line-number">80</span><br><span class="line-number">81</span><br><span class="line-number">82</span><br><span class="line-number">83</span><br><span class="line-number">84</span><br><span class="line-number">85</span><br><span class="line-number">86</span><br><span class="line-number">87</span><br><span class="line-number">88</span><br><span class="line-number">89</span><br><span class="line-number">90</span><br><span class="line-number">91</span><br><span class="line-number">92</span><br><span class="line-number">93</span><br><span class="line-number">94</span><br><span class="line-number">95</span><br><span class="line-number">96</span><br><span class="line-number">97</span><br><span class="line-number">98</span><br><span class="line-number">99</span><br><span class="line-number">100</span><br><span class="line-number">101</span><br><span class="line-number">102</span><br><span class="line-number">103</span><br><span class="line-number">104</span><br><span class="line-number">105</span><br><span class="line-number">106</span><br><span class="line-number">107</span><br><span class="line-number">108</span><br><span class="line-number">109</span><br><span class="line-number">110</span><br><span class="line-number">111</span><br><span class="line-number">112</span><br><span class="line-number">113</span><br><span class="line-number">114</span><br><span class="line-number">115</span><br><span class="line-number">116</span><br><span class="line-number">117</span><br><span class="line-number">118</span><br><span class="line-number">119</span><br></div></div><p>上述代码通过定时发送心跳消息来实现自动心跳机制，并结合断网重连逻辑来确保 WebSocket 连接的稳定性。</p><p>心跳机制的实现原理简析：</p><ul><li><strong>在连接成功时启动心跳检测</strong></li></ul><p>在 connect() 方法中，当 WebSocket 连接成功（onopen 事件触发）时，调用 startHeartbeat() 方法。</p><div class="language- vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span>this.socket.onopen = event =&gt; {</span></span>
<span class="line"><span>  this.stopWs = false;</span></span>
<span class="line"><span>  this.reconnectAttempts = 0;</span></span>
<span class="line"><span>  this.startHeartbeat();</span></span>
<span class="line"><span>  console.log(\`连接成功,等待服务端数据推送[onopen]...\`);</span></span>
<span class="line"><span>};</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br></div></div><ul><li><strong>定时发送心跳消息</strong></li></ul><p>startHeartbeat() 方法启动一个定时器，每隔 heartbeatInterval 时间（30秒）发送一次心跳消息。</p><div class="language- vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span>private startHeartbeat(): void {</span></span>
<span class="line"><span>  if (this.stopWs) return;</span></span>
<span class="line"><span>if (this.heartbeatTimer) {</span></span>
<span class="line"><span>  this.closeHeartbeat();</span></span>
<span class="line"><span>}</span></span>
<span class="line"><span>this.heartbeatTimer = setInterval(() =&gt; {</span></span>
<span class="line"><span>  if (this.socket) {</span></span>
<span class="line"><span>    this.socket.send(JSON.stringify({ type: &#39;heartBeat&#39;, data: {} }));</span></span>
<span class="line"><span>    console.log(&#39;WebSocket&#39;, &#39;发送心跳数据...&#39;);</span></span>
<span class="line"><span>  } else {</span></span>
<span class="line"><span>    console.error(&#39;[WebSocket] 未连接&#39;);</span></span>
<span class="line"><span>  }</span></span>
<span class="line"><span>}, this.heartbeatInterval);</span></span>
<span class="line"><span>}</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br></div></div><ul><li><strong>停止心跳检测</strong></li></ul><p>closeHeartbeat() 方法用于停止心跳检测，清除定时器。</p><div class="language- vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span>private closeHeartbeat(): void {</span></span>
<span class="line"><span>  clearInterval(this.heartbeatTimer);</span></span>
<span class="line"><span>    this.heartbeatTimer = undefined;</span></span>
<span class="line"><span>}</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br></div></div><ul><li><strong>在连接断开或发生错误时停止心跳检测</strong></li></ul><p>在 onclose 和 onerror 事件中调用 closeHeartbeat()，停止心跳检测。</p><div class="language- vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span>this.socket.onclose = event =&gt; {</span></span>
<span class="line"><span>  if (this.reconnectAttempts === 0) {</span></span>
<span class="line"><span>    console.log(\`连接断开[onclose]...\`);</span></span>
<span class="line"><span>  }</span></span>
<span class="line"><span>  if (!this.stopWs) {</span></span>
<span class="line"><span>    this.handleReconnect();</span></span>
<span class="line"><span>  }</span></span>
<span class="line"><span>};</span></span>
<span class="line"><span></span></span>
<span class="line"><span>this.socket.onerror = event =&gt; {</span></span>
<span class="line"><span>  if (this.reconnectAttempts === 0) {</span></span>
<span class="line"><span>    console.log(\`连接异常[onerror]...\`);</span></span>
<span class="line"><span>  }</span></span>
<span class="line"><span>  this.closeHeartbeat();</span></span>
<span class="line"><span>};</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br></div></div><h2 id="如何触发原生函数" tabindex="-1"><strong>如何触发原生函数</strong> <a class="header-anchor" href="#如何触发原生函数" aria-label="Permalink to &quot;**如何触发原生函数**&quot;">​</a></h2><p>现在，我们已经基本完成了功能的封装，那么，我们如何在外部调用原生的websokectApi呢？非常简单，借助几个自定义的生命周期函数即可！</p><div class="language- vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span>import { EventDispatcher } from &#39;./dispatcher&#39;;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>export class WebSocketClient extends EventDispatcher {</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    //...</span></span>
<span class="line"><span>    constructor(url: string) {</span></span>
<span class="line"><span>        super();</span></span>
<span class="line"><span>        this.url = url;</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span>    // &gt;生命周期钩子</span></span>
<span class="line"><span>    onopen(callBack: Function) {</span></span>
<span class="line"><span>        this.addEventListener(&#39;open&#39;, callBack);</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span>    onmessage(callBack: Function) {</span></span>
<span class="line"><span>        this.addEventListener(&#39;message&#39;, callBack);</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span>    onclose(callBack: Function) {</span></span>
<span class="line"><span>        this.addEventListener(&#39;close&#39;, callBack);</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span>    onerror(callBack: Function) {</span></span>
<span class="line"><span>        this.addEventListener(&#39;error&#39;, callBack);</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    // !初始化连接</span></span>
<span class="line"><span>    public connect(): void {</span></span>
<span class="line"><span>        // ...</span></span>
<span class="line"><span></span></span>
<span class="line"><span>        // !websocket连接成功</span></span>
<span class="line"><span>        this.socket.onopen = event =&gt; {</span></span>
<span class="line"><span>            // ...</span></span>
<span class="line"><span>            this.dispatchEvent(&#39;open&#39;, event);</span></span>
<span class="line"><span>        };</span></span>
<span class="line"><span></span></span>
<span class="line"><span>        this.socket.onmessage = event =&gt; {</span></span>
<span class="line"><span>            this.dispatchEvent(&#39;message&#39;, event);</span></span>
<span class="line"><span>            this.startHeartbeat();</span></span>
<span class="line"><span>        };</span></span>
<span class="line"><span></span></span>
<span class="line"><span>        this.socket.onclose = event =&gt; {</span></span>
<span class="line"><span>            // ...</span></span>
<span class="line"><span>            this.dispatchEvent(&#39;close&#39;, event);</span></span>
<span class="line"><span>        };</span></span>
<span class="line"><span></span></span>
<span class="line"><span>        this.socket.onerror = event =&gt; {</span></span>
<span class="line"><span>            // ...</span></span>
<span class="line"><span>            this.closeHeartbeat();</span></span>
<span class="line"><span>            this.dispatchEvent(&#39;error&#39;, event);</span></span>
<span class="line"><span>        };</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    // &gt;关闭连接</span></span>
<span class="line"><span>    public close(): void {</span></span>
<span class="line"><span>        if (this.socket) {</span></span>
<span class="line"><span>            this.stopWs = true;</span></span>
<span class="line"><span>            this.socket.close();</span></span>
<span class="line"><span>            this.socket = null;</span></span>
<span class="line"><span>            this.removeEventListener(&#39;open&#39;);</span></span>
<span class="line"><span>            this.removeEventListener(&#39;message&#39;);</span></span>
<span class="line"><span>            this.removeEventListener(&#39;close&#39;);</span></span>
<span class="line"><span>            this.removeEventListener(&#39;error&#39;);</span></span>
<span class="line"><span>        }</span></span>
<span class="line"><span>        this.closeHeartbeat();</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    // ...</span></span>
<span class="line"><span>}</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br><span class="line-number">22</span><br><span class="line-number">23</span><br><span class="line-number">24</span><br><span class="line-number">25</span><br><span class="line-number">26</span><br><span class="line-number">27</span><br><span class="line-number">28</span><br><span class="line-number">29</span><br><span class="line-number">30</span><br><span class="line-number">31</span><br><span class="line-number">32</span><br><span class="line-number">33</span><br><span class="line-number">34</span><br><span class="line-number">35</span><br><span class="line-number">36</span><br><span class="line-number">37</span><br><span class="line-number">38</span><br><span class="line-number">39</span><br><span class="line-number">40</span><br><span class="line-number">41</span><br><span class="line-number">42</span><br><span class="line-number">43</span><br><span class="line-number">44</span><br><span class="line-number">45</span><br><span class="line-number">46</span><br><span class="line-number">47</span><br><span class="line-number">48</span><br><span class="line-number">49</span><br><span class="line-number">50</span><br><span class="line-number">51</span><br><span class="line-number">52</span><br><span class="line-number">53</span><br><span class="line-number">54</span><br><span class="line-number">55</span><br><span class="line-number">56</span><br><span class="line-number">57</span><br><span class="line-number">58</span><br><span class="line-number">59</span><br><span class="line-number">60</span><br><span class="line-number">61</span><br><span class="line-number">62</span><br><span class="line-number">63</span><br><span class="line-number">64</span><br><span class="line-number">65</span><br><span class="line-number">66</span><br></div></div><p>当原生的onclose、onopen方法触发时，会通过dispatchEvent触发相应的调度，进而触发通过addEventListener绑定的生命周期函数！</p><p>注意，这里的this.dispatchEvent方法，addEventListener方法都是通过类继承EventDispatcher方法获得的！</p><p>EventDispatcher源码如下：</p><div class="language- vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span>export class EventDispatcher {</span></span>
<span class="line"><span>    private listeners: { [type: string]: Function[] } = {};</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    protected addEventListener(type: string, listener: Function) {</span></span>
<span class="line"><span>        if (!this.listeners[type]) {</span></span>
<span class="line"><span>            this.listeners[type] = [];</span></span>
<span class="line"><span>        }</span></span>
<span class="line"><span>        if (this.listeners[type].indexOf(listener) === -1) {</span></span>
<span class="line"><span>            this.listeners[type].push(listener);</span></span>
<span class="line"><span>        }</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    protected removeEventListener(type: string) {</span></span>
<span class="line"><span>        this.listeners[type] = [];</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    protected dispatchEvent(type: string, data: any) {</span></span>
<span class="line"><span>        const listenerArray = this.listeners[type] || [];</span></span>
<span class="line"><span>        if (listenerArray.length === 0) return;</span></span>
<span class="line"><span>        listenerArray.forEach(listener =&gt; {</span></span>
<span class="line"><span>            listener.call(this, data);</span></span>
<span class="line"><span>        });</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span>}</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br><span class="line-number">22</span><br><span class="line-number">23</span><br><span class="line-number">24</span><br></div></div><p><strong>关于EventDispatcher的实现原理，请参考博主的其他文章：</strong></p><blockquote><p><strong>juejin.cn/post/735851…</strong>[1]</p></blockquote><h2 id="完整代码" tabindex="-1"><strong>完整代码</strong> <a class="header-anchor" href="#完整代码" aria-label="Permalink to &quot;**完整代码**&quot;">​</a></h2><h3 id="ts版本" tabindex="-1"><strong>ts版本</strong> <a class="header-anchor" href="#ts版本" aria-label="Permalink to &quot;**ts版本**&quot;">​</a></h3><div class="language- vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span>import { EventDispatcher } from &#39;./dispatcher&#39;;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>export class WebSocketClient extends EventDispatcher {</span></span>
<span class="line"><span>    // #socket链接</span></span>
<span class="line"><span>    private url = &#39;&#39;;</span></span>
<span class="line"><span>    // #socket实例</span></span>
<span class="line"><span>    private socket: WebSocket | null = null;</span></span>
<span class="line"><span>    // #重连次数</span></span>
<span class="line"><span>    private reconnectAttempts = 0;</span></span>
<span class="line"><span>    // #最大重连数</span></span>
<span class="line"><span>    private maxReconnectAttempts = 5;</span></span>
<span class="line"><span>    // #重连间隔</span></span>
<span class="line"><span>    private reconnectInterval = 10000; // 10 seconds</span></span>
<span class="line"><span>    // #发送心跳数据间隔</span></span>
<span class="line"><span>    private heartbeatInterval = 1000 * 30;</span></span>
<span class="line"><span>    // #计时器id</span></span>
<span class="line"><span>    private heartbeatTimer?: NodeJS.Timeout;</span></span>
<span class="line"><span>    // #彻底终止ws</span></span>
<span class="line"><span>    private stopWs = false;</span></span>
<span class="line"><span>    // *构造函数</span></span>
<span class="line"><span>    constructor(url: string) {</span></span>
<span class="line"><span>        super();</span></span>
<span class="line"><span>        this.url = url;</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span>    // &gt;生命周期钩子</span></span>
<span class="line"><span>    onopen(callBack: Function) {</span></span>
<span class="line"><span>        this.addEventListener(&#39;open&#39;, callBack);</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span>    onmessage(callBack: Function) {</span></span>
<span class="line"><span>        this.addEventListener(&#39;message&#39;, callBack);</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span>    onclose(callBack: Function) {</span></span>
<span class="line"><span>        this.addEventListener(&#39;close&#39;, callBack);</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span>    onerror(callBack: Function) {</span></span>
<span class="line"><span>        this.addEventListener(&#39;error&#39;, callBack);</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span>    // &gt;消息发送</span></span>
<span class="line"><span>    public send(message: string): void {</span></span>
<span class="line"><span>        if (this.socket &amp;&amp; this.socket.readyState === WebSocket.OPEN) {</span></span>
<span class="line"><span>            this.socket.send(message);</span></span>
<span class="line"><span>        } else {</span></span>
<span class="line"><span>            console.error(&#39;[WebSocket] 未连接&#39;);</span></span>
<span class="line"><span>        }</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    // !初始化连接</span></span>
<span class="line"><span>    public connect(): void {</span></span>
<span class="line"><span>        if (this.reconnectAttempts === 0) {</span></span>
<span class="line"><span>            this.log(&#39;WebSocket&#39;, \`初始化连接中...          \${this.url}\`);</span></span>
<span class="line"><span>        }</span></span>
<span class="line"><span>        if (this.socket &amp;&amp; this.socket.readyState === WebSocket.OPEN) {</span></span>
<span class="line"><span>            return;</span></span>
<span class="line"><span>        }</span></span>
<span class="line"><span>        this.socket = new WebSocket(this.url);</span></span>
<span class="line"><span></span></span>
<span class="line"><span>        // !websocket连接成功</span></span>
<span class="line"><span>        this.socket.onopen = event =&gt; {</span></span>
<span class="line"><span>            this.stopWs = false;</span></span>
<span class="line"><span>            // 重置重连尝试成功连接</span></span>
<span class="line"><span>            this.reconnectAttempts = 0;</span></span>
<span class="line"><span>            // 在连接成功时停止当前的心跳检测并重新启动</span></span>
<span class="line"><span>            this.startHeartbeat();</span></span>
<span class="line"><span>            this.log(&#39;WebSocket&#39;, \`连接成功,等待服务端数据推送[onopen]...     \${this.url}\`);</span></span>
<span class="line"><span>            this.dispatchEvent(&#39;open&#39;, event);</span></span>
<span class="line"><span>        };</span></span>
<span class="line"><span></span></span>
<span class="line"><span>        this.socket.onmessage = event =&gt; {</span></span>
<span class="line"><span>            this.dispatchEvent(&#39;message&#39;, event);</span></span>
<span class="line"><span>            this.startHeartbeat();</span></span>
<span class="line"><span>        };</span></span>
<span class="line"><span></span></span>
<span class="line"><span>        this.socket.onclose = event =&gt; {</span></span>
<span class="line"><span>            if (this.reconnectAttempts === 0) {</span></span>
<span class="line"><span>                this.log(&#39;WebSocket&#39;, \`连接断开[onclose]...    \${this.url}\`);</span></span>
<span class="line"><span>            }</span></span>
<span class="line"><span>            if (!this.stopWs) {</span></span>
<span class="line"><span>                this.handleReconnect();</span></span>
<span class="line"><span>            }</span></span>
<span class="line"><span>            this.dispatchEvent(&#39;close&#39;, event);</span></span>
<span class="line"><span>        };</span></span>
<span class="line"><span></span></span>
<span class="line"><span>        this.socket.onerror = event =&gt; {</span></span>
<span class="line"><span>            if (this.reconnectAttempts === 0) {</span></span>
<span class="line"><span>                this.log(&#39;WebSocket&#39;, \`连接异常[onerror]...    \${this.url}\`);</span></span>
<span class="line"><span>            }</span></span>
<span class="line"><span>            this.closeHeartbeat();</span></span>
<span class="line"><span>            this.dispatchEvent(&#39;error&#39;, event);</span></span>
<span class="line"><span>        };</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    // &gt; 断网重连逻辑</span></span>
<span class="line"><span>    private handleReconnect(): void {</span></span>
<span class="line"><span>        if (this.reconnectAttempts &lt; this.maxReconnectAttempts) {</span></span>
<span class="line"><span>            this.reconnectAttempts++;</span></span>
<span class="line"><span>            this.log(&#39;WebSocket&#39;, \`尝试重连... (\${this.reconnectAttempts}/\${this.maxReconnectAttempts})       \${this.url}\`);</span></span>
<span class="line"><span>            setTimeout(() =&gt; {</span></span>
<span class="line"><span>                this.connect();</span></span>
<span class="line"><span>            }, this.reconnectInterval);</span></span>
<span class="line"><span>        } else {</span></span>
<span class="line"><span>            this.closeHeartbeat();</span></span>
<span class="line"><span>            this.log(&#39;WebSocket&#39;, \`最大重连失败，终止重连: \${this.url}\`);</span></span>
<span class="line"><span>        }</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    // &gt;关闭连接</span></span>
<span class="line"><span>    public close(): void {</span></span>
<span class="line"><span>        if (this.socket) {</span></span>
<span class="line"><span>            this.stopWs = true;</span></span>
<span class="line"><span>            this.socket.close();</span></span>
<span class="line"><span>            this.socket = null;</span></span>
<span class="line"><span>            this.removeEventListener(&#39;open&#39;);</span></span>
<span class="line"><span>            this.removeEventListener(&#39;message&#39;);</span></span>
<span class="line"><span>            this.removeEventListener(&#39;close&#39;);</span></span>
<span class="line"><span>            this.removeEventListener(&#39;error&#39;);</span></span>
<span class="line"><span>        }</span></span>
<span class="line"><span>        this.closeHeartbeat();</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    // &gt;开始心跳检测 -&gt; 定时发送心跳消息</span></span>
<span class="line"><span>    private startHeartbeat(): void {</span></span>
<span class="line"><span>        if (this.stopWs) return;</span></span>
<span class="line"><span>        if (this.heartbeatTimer) {</span></span>
<span class="line"><span>            this.closeHeartbeat();</span></span>
<span class="line"><span>        }</span></span>
<span class="line"><span>        this.heartbeatTimer = setInterval(() =&gt; {</span></span>
<span class="line"><span>            if (this.socket) {</span></span>
<span class="line"><span>                this.socket.send(JSON.stringify({ type: &#39;heartBeat&#39;, data: {} }));</span></span>
<span class="line"><span>                this.log(&#39;WebSocket&#39;, &#39;送心跳数据...&#39;);</span></span>
<span class="line"><span>            } else {</span></span>
<span class="line"><span>                console.error(&#39;[WebSocket] 未连接&#39;);</span></span>
<span class="line"><span>            }</span></span>
<span class="line"><span>        }, this.heartbeatInterval);</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    // &gt;关闭心跳</span></span>
<span class="line"><span>    private closeHeartbeat(): void {</span></span>
<span class="line"><span>        clearInterval(this.heartbeatTimer);</span></span>
<span class="line"><span>        this.heartbeatTimer = undefined;</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span>}</span></span>
<span class="line"><span>class Log {</span></span>
<span class="line"><span>    private static console = true;</span></span>
<span class="line"><span>    log(title: string, text: string) {</span></span>
<span class="line"><span>        if (!Log.console) return;</span></span>
<span class="line"><span>        if (import.meta.env.MODE === &#39;production&#39;) return;</span></span>
<span class="line"><span>        const color = &#39;#ff4d4f&#39;;</span></span>
<span class="line"><span>        console.log(</span></span>
<span class="line"><span>            \`%c \${title} %c \${text} %c\`,</span></span>
<span class="line"><span>            \`background:\${color};border:1px solid \${color}; padding: 1px; border-radius: 2px 0 0 2px; color: #fff;\`,</span></span>
<span class="line"><span>            \`border:1px solid \${color}; padding: 1px; border-radius: 0 2px 2px 0; color: \${color};\`,</span></span>
<span class="line"><span>            &#39;background:transparent&#39;</span></span>
<span class="line"><span>        );</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span>    closeConsole() {</span></span>
<span class="line"><span>        Log.console = false;</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span>}</span></span>
<span class="line"><span>export class EventDispatcher extends Log {</span></span>
<span class="line"><span>    private listeners: { [type: string]: Function[] } = {};</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    protected addEventListener(type: string, listener: Function) {</span></span>
<span class="line"><span>        if (!this.listeners[type]) {</span></span>
<span class="line"><span>            this.listeners[type] = [];</span></span>
<span class="line"><span>        }</span></span>
<span class="line"><span>        if (this.listeners[type].indexOf(listener) === -1) {</span></span>
<span class="line"><span>            this.listeners[type].push(listener);</span></span>
<span class="line"><span>        }</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    protected removeEventListener(type: string) {</span></span>
<span class="line"><span>        this.listeners[type] = [];</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    protected dispatchEvent(type: string, data: any) {</span></span>
<span class="line"><span>        const listenerArray = this.listeners[type] || [];</span></span>
<span class="line"><span>        if (listenerArray.length === 0) return;</span></span>
<span class="line"><span>        listenerArray.forEach(listener =&gt; {</span></span>
<span class="line"><span>            listener.call(this, data);</span></span>
<span class="line"><span>        });</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span>}</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br><span class="line-number">22</span><br><span class="line-number">23</span><br><span class="line-number">24</span><br><span class="line-number">25</span><br><span class="line-number">26</span><br><span class="line-number">27</span><br><span class="line-number">28</span><br><span class="line-number">29</span><br><span class="line-number">30</span><br><span class="line-number">31</span><br><span class="line-number">32</span><br><span class="line-number">33</span><br><span class="line-number">34</span><br><span class="line-number">35</span><br><span class="line-number">36</span><br><span class="line-number">37</span><br><span class="line-number">38</span><br><span class="line-number">39</span><br><span class="line-number">40</span><br><span class="line-number">41</span><br><span class="line-number">42</span><br><span class="line-number">43</span><br><span class="line-number">44</span><br><span class="line-number">45</span><br><span class="line-number">46</span><br><span class="line-number">47</span><br><span class="line-number">48</span><br><span class="line-number">49</span><br><span class="line-number">50</span><br><span class="line-number">51</span><br><span class="line-number">52</span><br><span class="line-number">53</span><br><span class="line-number">54</span><br><span class="line-number">55</span><br><span class="line-number">56</span><br><span class="line-number">57</span><br><span class="line-number">58</span><br><span class="line-number">59</span><br><span class="line-number">60</span><br><span class="line-number">61</span><br><span class="line-number">62</span><br><span class="line-number">63</span><br><span class="line-number">64</span><br><span class="line-number">65</span><br><span class="line-number">66</span><br><span class="line-number">67</span><br><span class="line-number">68</span><br><span class="line-number">69</span><br><span class="line-number">70</span><br><span class="line-number">71</span><br><span class="line-number">72</span><br><span class="line-number">73</span><br><span class="line-number">74</span><br><span class="line-number">75</span><br><span class="line-number">76</span><br><span class="line-number">77</span><br><span class="line-number">78</span><br><span class="line-number">79</span><br><span class="line-number">80</span><br><span class="line-number">81</span><br><span class="line-number">82</span><br><span class="line-number">83</span><br><span class="line-number">84</span><br><span class="line-number">85</span><br><span class="line-number">86</span><br><span class="line-number">87</span><br><span class="line-number">88</span><br><span class="line-number">89</span><br><span class="line-number">90</span><br><span class="line-number">91</span><br><span class="line-number">92</span><br><span class="line-number">93</span><br><span class="line-number">94</span><br><span class="line-number">95</span><br><span class="line-number">96</span><br><span class="line-number">97</span><br><span class="line-number">98</span><br><span class="line-number">99</span><br><span class="line-number">100</span><br><span class="line-number">101</span><br><span class="line-number">102</span><br><span class="line-number">103</span><br><span class="line-number">104</span><br><span class="line-number">105</span><br><span class="line-number">106</span><br><span class="line-number">107</span><br><span class="line-number">108</span><br><span class="line-number">109</span><br><span class="line-number">110</span><br><span class="line-number">111</span><br><span class="line-number">112</span><br><span class="line-number">113</span><br><span class="line-number">114</span><br><span class="line-number">115</span><br><span class="line-number">116</span><br><span class="line-number">117</span><br><span class="line-number">118</span><br><span class="line-number">119</span><br><span class="line-number">120</span><br><span class="line-number">121</span><br><span class="line-number">122</span><br><span class="line-number">123</span><br><span class="line-number">124</span><br><span class="line-number">125</span><br><span class="line-number">126</span><br><span class="line-number">127</span><br><span class="line-number">128</span><br><span class="line-number">129</span><br><span class="line-number">130</span><br><span class="line-number">131</span><br><span class="line-number">132</span><br><span class="line-number">133</span><br><span class="line-number">134</span><br><span class="line-number">135</span><br><span class="line-number">136</span><br><span class="line-number">137</span><br><span class="line-number">138</span><br><span class="line-number">139</span><br><span class="line-number">140</span><br><span class="line-number">141</span><br><span class="line-number">142</span><br><span class="line-number">143</span><br><span class="line-number">144</span><br><span class="line-number">145</span><br><span class="line-number">146</span><br><span class="line-number">147</span><br><span class="line-number">148</span><br><span class="line-number">149</span><br><span class="line-number">150</span><br><span class="line-number">151</span><br><span class="line-number">152</span><br><span class="line-number">153</span><br><span class="line-number">154</span><br><span class="line-number">155</span><br><span class="line-number">156</span><br><span class="line-number">157</span><br><span class="line-number">158</span><br><span class="line-number">159</span><br><span class="line-number">160</span><br><span class="line-number">161</span><br><span class="line-number">162</span><br><span class="line-number">163</span><br><span class="line-number">164</span><br><span class="line-number">165</span><br><span class="line-number">166</span><br><span class="line-number">167</span><br><span class="line-number">168</span><br><span class="line-number">169</span><br><span class="line-number">170</span><br><span class="line-number">171</span><br><span class="line-number">172</span><br><span class="line-number">173</span><br><span class="line-number">174</span><br><span class="line-number">175</span><br><span class="line-number">176</span><br><span class="line-number">177</span><br><span class="line-number">178</span><br><span class="line-number">179</span><br><span class="line-number">180</span><br><span class="line-number">181</span><br><span class="line-number">182</span><br></div></div><h3 id="js版本" tabindex="-1"><strong>js版本</strong> <a class="header-anchor" href="#js版本" aria-label="Permalink to &quot;**js版本**&quot;">​</a></h3><div class="language- vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span>export class WebSocketClient extends EventDispatcher {</span></span>
<span class="line"><span>    // #socket链接</span></span>
<span class="line"><span>    url = &#39;&#39;;</span></span>
<span class="line"><span>    // #socket实例</span></span>
<span class="line"><span>    socket = null;</span></span>
<span class="line"><span>    // #重连次数</span></span>
<span class="line"><span>    reconnectAttempts = 0;</span></span>
<span class="line"><span>    // #最大重连数</span></span>
<span class="line"><span>    maxReconnectAttempts = 5;</span></span>
<span class="line"><span>    // #重连间隔</span></span>
<span class="line"><span>    reconnectInterval = 10000; // 10 seconds</span></span>
<span class="line"><span>    // #发送心跳数据间隔</span></span>
<span class="line"><span>    heartbeatInterval = 1000 * 30;</span></span>
<span class="line"><span>    // #计时器id</span></span>
<span class="line"><span>    heartbeatTimer = undefined;</span></span>
<span class="line"><span>    // #彻底终止ws</span></span>
<span class="line"><span>    stopWs = false;</span></span>
<span class="line"><span>    // *构造函数</span></span>
<span class="line"><span>    constructor(url) {</span></span>
<span class="line"><span>        super();</span></span>
<span class="line"><span>        this.url = url;</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span>    // &gt;生命周期钩子</span></span>
<span class="line"><span>    onopen(callBack) {</span></span>
<span class="line"><span>        this.addEventListener(&#39;open&#39;, callBack);</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span>    onmessage(callBack) {</span></span>
<span class="line"><span>        this.addEventListener(&#39;message&#39;, callBack);</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span>    onclose(callBack) {</span></span>
<span class="line"><span>        this.addEventListener(&#39;close&#39;, callBack);</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span>    onerror(callBack) {</span></span>
<span class="line"><span>        this.addEventListener(&#39;error&#39;, callBack);</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span>    // &gt;消息发送</span></span>
<span class="line"><span>    send(message) {</span></span>
<span class="line"><span>        if (this.socket &amp;&amp; this.socket.readyState === WebSocket.OPEN) {</span></span>
<span class="line"><span>            this.socket.send(message);</span></span>
<span class="line"><span>        } else {</span></span>
<span class="line"><span>            console.error(&#39;[WebSocket] 未连接&#39;);</span></span>
<span class="line"><span>        }</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    // !初始化连接</span></span>
<span class="line"><span>    connect() {</span></span>
<span class="line"><span>        if (this.reconnectAttempts === 0) {</span></span>
<span class="line"><span>            this.log(&#39;WebSocket&#39;, \`初始化连接中...          \${this.url}\`);</span></span>
<span class="line"><span>        }</span></span>
<span class="line"><span>        if (this.socket &amp;&amp; this.socket.readyState === WebSocket.OPEN) {</span></span>
<span class="line"><span>            return;</span></span>
<span class="line"><span>        }</span></span>
<span class="line"><span>        this.socket = new WebSocket(this.url);</span></span>
<span class="line"><span></span></span>
<span class="line"><span>        // !websocket连接成功</span></span>
<span class="line"><span>        this.socket.onopen = event =&gt; {</span></span>
<span class="line"><span>            this.stopWs = false;</span></span>
<span class="line"><span>            // 重置重连尝试成功连接</span></span>
<span class="line"><span>            this.reconnectAttempts = 0;</span></span>
<span class="line"><span>            // 在连接成功时停止当前的心跳检测并重新启动</span></span>
<span class="line"><span>            this.startHeartbeat();</span></span>
<span class="line"><span>            this.log(&#39;WebSocket&#39;, \`连接成功,等待服务端数据推送[onopen]...     \${this.url}\`);</span></span>
<span class="line"><span>            this.dispatchEvent(&#39;open&#39;, event);</span></span>
<span class="line"><span>        };</span></span>
<span class="line"><span></span></span>
<span class="line"><span>        this.socket.onmessage = event =&gt; {</span></span>
<span class="line"><span>            this.dispatchEvent(&#39;message&#39;, event);</span></span>
<span class="line"><span>            this.startHeartbeat();</span></span>
<span class="line"><span>        };</span></span>
<span class="line"><span></span></span>
<span class="line"><span>        this.socket.onclose = event =&gt; {</span></span>
<span class="line"><span>            if (this.reconnectAttempts === 0) {</span></span>
<span class="line"><span>                this.log(&#39;WebSocket&#39;, \`连接断开[onclose]...    \${this.url}\`);</span></span>
<span class="line"><span>            }</span></span>
<span class="line"><span>            if (!this.stopWs) {</span></span>
<span class="line"><span>                this.handleReconnect();</span></span>
<span class="line"><span>            }</span></span>
<span class="line"><span>            this.dispatchEvent(&#39;close&#39;, event);</span></span>
<span class="line"><span>        };</span></span>
<span class="line"><span></span></span>
<span class="line"><span>        this.socket.onerror = event =&gt; {</span></span>
<span class="line"><span>            if (this.reconnectAttempts === 0) {</span></span>
<span class="line"><span>                this.log(&#39;WebSocket&#39;, \`连接异常[onerror]...    \${this.url}\`);</span></span>
<span class="line"><span>            }</span></span>
<span class="line"><span>            this.closeHeartbeat();</span></span>
<span class="line"><span>            this.dispatchEvent(&#39;error&#39;, event);</span></span>
<span class="line"><span>        };</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    // &gt; 断网重连逻辑</span></span>
<span class="line"><span>    handleReconnect() {</span></span>
<span class="line"><span>        if (this.reconnectAttempts &lt; this.maxReconnectAttempts) {</span></span>
<span class="line"><span>            this.reconnectAttempts++;</span></span>
<span class="line"><span>            this.log(&#39;WebSocket&#39;, \`尝试重连... (\${this.reconnectAttempts}/\${this.maxReconnectAttempts})       \${this.url}\`);</span></span>
<span class="line"><span>            setTimeout(() =&gt; {</span></span>
<span class="line"><span>                this.connect();</span></span>
<span class="line"><span>            }, this.reconnectInterval);</span></span>
<span class="line"><span>        } else {</span></span>
<span class="line"><span>            this.closeHeartbeat();</span></span>
<span class="line"><span>            this.log(&#39;WebSocket&#39;, \`最大重连失败，终止重连: \${this.url}\`);</span></span>
<span class="line"><span>        }</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    // &gt;关闭连接</span></span>
<span class="line"><span>    close() {</span></span>
<span class="line"><span>        if (this.socket) {</span></span>
<span class="line"><span>            this.stopWs = true;</span></span>
<span class="line"><span>            this.socket.close();</span></span>
<span class="line"><span>            this.socket = null;</span></span>
<span class="line"><span>            this.removeEventListener(&#39;open&#39;);</span></span>
<span class="line"><span>            this.removeEventListener(&#39;message&#39;);</span></span>
<span class="line"><span>            this.removeEventListener(&#39;close&#39;);</span></span>
<span class="line"><span>            this.removeEventListener(&#39;error&#39;);</span></span>
<span class="line"><span>        }</span></span>
<span class="line"><span>        this.closeHeartbeat();</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    // &gt;开始心跳检测 -&gt; 定时发送心跳消息</span></span>
<span class="line"><span>    startHeartbeat() {</span></span>
<span class="line"><span>        if (this.stopWs) return;</span></span>
<span class="line"><span>        if (this.heartbeatTimer) {</span></span>
<span class="line"><span>            this.closeHeartbeat();</span></span>
<span class="line"><span>        }</span></span>
<span class="line"><span>        this.heartbeatTimer = setInterval(() =&gt; {</span></span>
<span class="line"><span>            if (this.socket) {</span></span>
<span class="line"><span>                this.socket.send(JSON.stringify({ type: &#39;heartBeat&#39;, data: {} }));</span></span>
<span class="line"><span>                this.log(&#39;WebSocket&#39;, &#39;送心跳数据...&#39;);</span></span>
<span class="line"><span>            } else {</span></span>
<span class="line"><span>                console.error(&#39;[WebSocket] 未连接&#39;);</span></span>
<span class="line"><span>            }</span></span>
<span class="line"><span>        }, this.heartbeatInterval);</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    // &gt;关闭心跳</span></span>
<span class="line"><span>    closeHeartbeat() {</span></span>
<span class="line"><span>        clearInterval(this.heartbeatTimer);</span></span>
<span class="line"><span>        this.heartbeatTimer = undefined;</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span>}</span></span>
<span class="line"><span>class Log {</span></span>
<span class="line"><span>    static console = true;</span></span>
<span class="line"><span>    log(title, text) {</span></span>
<span class="line"><span>        if (!Log.console) return;</span></span>
<span class="line"><span>        if (import.meta.env.MODE === &#39;production&#39;) return;</span></span>
<span class="line"><span>        const color = &#39;#ff4d4f&#39;;</span></span>
<span class="line"><span>        console.log(</span></span>
<span class="line"><span>            \`%c \${title} %c \${text} %c\`,</span></span>
<span class="line"><span>            \`background:\${color};border:1px solid \${color}; padding: 1px; border-radius: 2px 0 0 2px; color: #fff;\`,</span></span>
<span class="line"><span>            \`border:1px solid \${color}; padding: 1px; border-radius: 0 2px 2px 0; color: \${color};\`,</span></span>
<span class="line"><span>            &#39;background:transparent&#39;</span></span>
<span class="line"><span>        );</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span>    closeConsole() {</span></span>
<span class="line"><span>        Log.console = false;</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span>}</span></span>
<span class="line"><span>export class EventDispatcher extends Log {</span></span>
<span class="line"><span>    listeners = {};</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    addEventListener(type, listener) {</span></span>
<span class="line"><span>        if (!this.listeners[type]) {</span></span>
<span class="line"><span>            this.listeners[type] = [];</span></span>
<span class="line"><span>        }</span></span>
<span class="line"><span>        if (this.listeners[type].indexOf(listener) === -1) {</span></span>
<span class="line"><span>            this.listeners[type].push(listener);</span></span>
<span class="line"><span>        }</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    removeEventListener(type) {</span></span>
<span class="line"><span>        this.listeners[type] = [];</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    dispatchEvent(type, data) {</span></span>
<span class="line"><span>        const listenerArray = this.listeners[type] || [];</span></span>
<span class="line"><span>        if (listenerArray.length === 0) return;</span></span>
<span class="line"><span>        listenerArray.forEach(listener =&gt; {</span></span>
<span class="line"><span>            listener.call(this, data);</span></span>
<span class="line"><span>        });</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span>}</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br><span class="line-number">22</span><br><span class="line-number">23</span><br><span class="line-number">24</span><br><span class="line-number">25</span><br><span class="line-number">26</span><br><span class="line-number">27</span><br><span class="line-number">28</span><br><span class="line-number">29</span><br><span class="line-number">30</span><br><span class="line-number">31</span><br><span class="line-number">32</span><br><span class="line-number">33</span><br><span class="line-number">34</span><br><span class="line-number">35</span><br><span class="line-number">36</span><br><span class="line-number">37</span><br><span class="line-number">38</span><br><span class="line-number">39</span><br><span class="line-number">40</span><br><span class="line-number">41</span><br><span class="line-number">42</span><br><span class="line-number">43</span><br><span class="line-number">44</span><br><span class="line-number">45</span><br><span class="line-number">46</span><br><span class="line-number">47</span><br><span class="line-number">48</span><br><span class="line-number">49</span><br><span class="line-number">50</span><br><span class="line-number">51</span><br><span class="line-number">52</span><br><span class="line-number">53</span><br><span class="line-number">54</span><br><span class="line-number">55</span><br><span class="line-number">56</span><br><span class="line-number">57</span><br><span class="line-number">58</span><br><span class="line-number">59</span><br><span class="line-number">60</span><br><span class="line-number">61</span><br><span class="line-number">62</span><br><span class="line-number">63</span><br><span class="line-number">64</span><br><span class="line-number">65</span><br><span class="line-number">66</span><br><span class="line-number">67</span><br><span class="line-number">68</span><br><span class="line-number">69</span><br><span class="line-number">70</span><br><span class="line-number">71</span><br><span class="line-number">72</span><br><span class="line-number">73</span><br><span class="line-number">74</span><br><span class="line-number">75</span><br><span class="line-number">76</span><br><span class="line-number">77</span><br><span class="line-number">78</span><br><span class="line-number">79</span><br><span class="line-number">80</span><br><span class="line-number">81</span><br><span class="line-number">82</span><br><span class="line-number">83</span><br><span class="line-number">84</span><br><span class="line-number">85</span><br><span class="line-number">86</span><br><span class="line-number">87</span><br><span class="line-number">88</span><br><span class="line-number">89</span><br><span class="line-number">90</span><br><span class="line-number">91</span><br><span class="line-number">92</span><br><span class="line-number">93</span><br><span class="line-number">94</span><br><span class="line-number">95</span><br><span class="line-number">96</span><br><span class="line-number">97</span><br><span class="line-number">98</span><br><span class="line-number">99</span><br><span class="line-number">100</span><br><span class="line-number">101</span><br><span class="line-number">102</span><br><span class="line-number">103</span><br><span class="line-number">104</span><br><span class="line-number">105</span><br><span class="line-number">106</span><br><span class="line-number">107</span><br><span class="line-number">108</span><br><span class="line-number">109</span><br><span class="line-number">110</span><br><span class="line-number">111</span><br><span class="line-number">112</span><br><span class="line-number">113</span><br><span class="line-number">114</span><br><span class="line-number">115</span><br><span class="line-number">116</span><br><span class="line-number">117</span><br><span class="line-number">118</span><br><span class="line-number">119</span><br><span class="line-number">120</span><br><span class="line-number">121</span><br><span class="line-number">122</span><br><span class="line-number">123</span><br><span class="line-number">124</span><br><span class="line-number">125</span><br><span class="line-number">126</span><br><span class="line-number">127</span><br><span class="line-number">128</span><br><span class="line-number">129</span><br><span class="line-number">130</span><br><span class="line-number">131</span><br><span class="line-number">132</span><br><span class="line-number">133</span><br><span class="line-number">134</span><br><span class="line-number">135</span><br><span class="line-number">136</span><br><span class="line-number">137</span><br><span class="line-number">138</span><br><span class="line-number">139</span><br><span class="line-number">140</span><br><span class="line-number">141</span><br><span class="line-number">142</span><br><span class="line-number">143</span><br><span class="line-number">144</span><br><span class="line-number">145</span><br><span class="line-number">146</span><br><span class="line-number">147</span><br><span class="line-number">148</span><br><span class="line-number">149</span><br><span class="line-number">150</span><br><span class="line-number">151</span><br><span class="line-number">152</span><br><span class="line-number">153</span><br><span class="line-number">154</span><br><span class="line-number">155</span><br><span class="line-number">156</span><br><span class="line-number">157</span><br><span class="line-number">158</span><br><span class="line-number">159</span><br><span class="line-number">160</span><br><span class="line-number">161</span><br><span class="line-number">162</span><br><span class="line-number">163</span><br><span class="line-number">164</span><br><span class="line-number">165</span><br><span class="line-number">166</span><br><span class="line-number">167</span><br><span class="line-number">168</span><br><span class="line-number">169</span><br><span class="line-number">170</span><br><span class="line-number">171</span><br><span class="line-number">172</span><br><span class="line-number">173</span><br><span class="line-number">174</span><br><span class="line-number">175</span><br><span class="line-number">176</span><br><span class="line-number">177</span><br><span class="line-number">178</span><br><span class="line-number">179</span><br><span class="line-number">180</span><br></div></div><h2 id="总结" tabindex="-1"><strong>总结</strong> <a class="header-anchor" href="#总结" aria-label="Permalink to &quot;**总结**&quot;">​</a></h2><p>这篇文章封装了weboskect，完美支持了断网重连、自动心跳的功能，且完全兼容原生写法，无任何学习负担，开开箱即用！但美中不足的是，断网重连时间、心跳数据内容目前都是写死的，大家可以根据自己的情况做一些更改，让它更灵活！</p>`,87),b=[t];function o(u,m,h,d,g,v){return a(),n("div",null,b)}const y=s(c,[["render",o]]);export{f as __pageData,y as default};
