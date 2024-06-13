import{_ as s,c as n,o as a,a4 as p}from"./chunks/framework.2rcLouwq.js";const g=JSON.parse('{"title":"JavaScript | 1000个判断条件难道要写了1000个 if ? 一文教你如何实现分支优化","description":"","frontmatter":{},"headers":[],"relativePath":"excellentArticle/2024-06-13/index.md","filePath":"excellentArticle/2024-06-13/index.md","lastUpdated":1718258785000}'),e={name:"excellentArticle/2024-06-13/index.md"},l=p(`<h1 id="javascript-1000个判断条件难道要写了1000个-if-一文教你如何实现分支优化" tabindex="-1">JavaScript | 1000个判断条件难道要写了1000个 if ? 一文教你如何实现分支优化 <a class="header-anchor" href="#javascript-1000个判断条件难道要写了1000个-if-一文教你如何实现分支优化" aria-label="Permalink to &quot;JavaScript | 1000个判断条件难道要写了1000个 if ? 一文教你如何实现分支优化&quot;">​</a></h1><p>最近在网上冲浪时看到了这样一段代码：</p><div class="language- vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>function getUserDescribe(name) {</span></span>
<span class="line"><span>    if (name === &quot;小刘&quot;) {</span></span>
<span class="line"><span>        console.log(&quot;刘哥哥&quot;);</span></span>
<span class="line"><span>    } else if (name === &quot;小红&quot;) {</span></span>
<span class="line"><span>        console.log(&quot;小红妹妹&quot;);</span></span>
<span class="line"><span>    } else if (name === &quot;陈龙&quot;) {</span></span>
<span class="line"><span>        console.log(&quot;大师&quot;);</span></span>
<span class="line"><span>    } else if (name === &quot;李龙&quot;) {</span></span>
<span class="line"><span>        console.log(&quot;师傅&quot;);</span></span>
<span class="line"><span>    } else if (name === &quot;大鹏&quot;) {</span></span>
<span class="line"><span>        console.log(&quot;恶人&quot;);</span></span>
<span class="line"><span>    } else {</span></span>
<span class="line"><span>        console.log(&quot;此人比较神秘！&quot;);</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span>}</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br></div></div><p>咋一看没感觉有什么异常，但如果有1000个判断条件，按照这种写法难不成要写1000个 <code>if</code> 分支？</p><p>如果写了大量的 <code>if</code> 分支，并且可能还具有<strong>分支套分支</strong>，可以想象到整个代码的可读性和可维护都会大大降低，这在实际开发中，确实是一个比较头疼的问题，那有没有什么办法能够即实现需求又能避免这些问题呢？</p><h2 id="_1️⃣-简单分支优化" tabindex="-1">1️⃣ 简单分支优化 <a class="header-anchor" href="#_1️⃣-简单分支优化" aria-label="Permalink to &quot;1️⃣ 简单分支优化&quot;">​</a></h2><p>这就涉及到<strong>分支优化</strong>，让我们转换思维，去优化一下上面的代码结构：</p><div class="language- vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>function getUserDescribe(name) {</span></span>
<span class="line"><span>    const describeForNameMap = {</span></span>
<span class="line"><span>        小刘: () =&gt; console.log(&quot;刘哥哥&quot;),</span></span>
<span class="line"><span>        小红: () =&gt; console.log(&quot;小红妹妹&quot;),</span></span>
<span class="line"><span>        陈龙: () =&gt; console.log(&quot;大师&quot;),</span></span>
<span class="line"><span>        李龙: () =&gt; console.log(&quot;师傅&quot;),</span></span>
<span class="line"><span>        大鹏: () =&gt; console.log(&quot;恶人&quot;),</span></span>
<span class="line"><span>    };</span></span>
<span class="line"><span>    describeForNameMap[name] ? describeForNameMap[name]() : console.log(&quot;此人比较神秘！&quot;);</span></span>
<span class="line"><span>}</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br></div></div><p>问题代码中的判断都是简单的<strong>相等判断</strong>，那么我们就可以将这些判断条件作为一个属性写到对象<code>describeForNameMap</code> 中去，这些属性对应的值就是条件成立后的处理函数。</p><p>之后我们就只需通过<code>getUserDescribe</code>函数接收到的参数去获取<code>describeForNameMap</code>对象中对应的值，如果该值存在就运行该值（因为值是一个函数）。</p><p>这样一来原本的 <code>if</code> 分支判断就转换成了简单的<code>key value</code>对应值，条件与处理函数一一对应，一目了然。</p><h2 id="_2️⃣-复杂分支优化" tabindex="-1">2️⃣ 复杂分支优化 <a class="header-anchor" href="#_2️⃣-复杂分支优化" aria-label="Permalink to &quot;2️⃣ 复杂分支优化&quot;">​</a></h2><p>那如果我们的 <code>if</code> 分支中的判断条件不只是简单的相等判断，还具有一些需要计算的表达式时，我们该怎么办呢？（如下所示）</p><div class="language- vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>function getUserDescribe(name) {</span></span>
<span class="line"><span>    if (name.length &gt; 3) {</span></span>
<span class="line"><span>        console.log(&quot;名字太长&quot;);</span></span>
<span class="line"><span>    } else if (name.length &lt; 2) {</span></span>
<span class="line"><span>        console.log(&quot;名字太短&quot;);</span></span>
<span class="line"><span>    } else if (name[0] === &quot;陈&quot;) {</span></span>
<span class="line"><span>        console.log(&quot;小陈&quot;);</span></span>
<span class="line"><span>    } else if (name[0] === &quot;李&quot; &amp;&amp; name !== &quot;李鹏&quot;) {</span></span>
<span class="line"><span>        console.log(&quot;小李&quot;);</span></span>
<span class="line"><span>    } else if (name === &quot;李鹏&quot;) {</span></span>
<span class="line"><span>        console.log(&quot;管理员&quot;);</span></span>
<span class="line"><span>    } else {</span></span>
<span class="line"><span>        console.log(&quot;此人比较神秘！&quot;);</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span>}</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br></div></div><p>对于这种结构的代码就不能引入对象来进行分支优化了，我们可以引入<strong>二维数组</strong>来进行分支优化：</p><div class="language- vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>function getUserDescribe(name) {</span></span>
<span class="line"><span>    const describeForNameMap = [</span></span>
<span class="line"><span>        [</span></span>
<span class="line"><span>            (name) =&gt; name.length &gt; 3, // 判断条件</span></span>
<span class="line"><span>            () =&gt; console.log(&quot;名字太长&quot;) // 执行函数</span></span>
<span class="line"><span>        ],</span></span>
<span class="line"><span>        [</span></span>
<span class="line"><span>            (name) =&gt; name.length &lt; 2, </span></span>
<span class="line"><span>            () =&gt; console.log(&quot;名字太短&quot;)</span></span>
<span class="line"><span>        ],</span></span>
<span class="line"><span>        [</span></span>
<span class="line"><span>            (name) =&gt; name[0] === &quot;陈&quot;, </span></span>
<span class="line"><span>            () =&gt; console.log(&quot;小陈&quot;)</span></span>
<span class="line"><span>        ],</span></span>
<span class="line"><span>        [</span></span>
<span class="line"><span>            (name) =&gt; name === &quot;大鹏&quot;, </span></span>
<span class="line"><span>            () =&gt; console.log(&quot;管理员&quot;)</span></span>
<span class="line"><span>        ],</span></span>
<span class="line"><span>        [</span></span>
<span class="line"><span>            (name) =&gt; name[0] === &quot;李&quot; &amp;&amp; name !== &quot;李鹏&quot;,</span></span>
<span class="line"><span>            () =&gt; console.log(&quot;小李&quot;),</span></span>
<span class="line"><span>        ],</span></span>
<span class="line"><span>    ];</span></span>
<span class="line"><span>    // 获取符合条件的子数组</span></span>
<span class="line"><span>    const getDescribe = describeForNameMap.find((item) =&gt; item[0](name));</span></span>
<span class="line"><span>    // 子数组存在则运行子数组中的第二个元素（执行函数）</span></span>
<span class="line"><span>    getDescribe ? getDescribe[1]() : console.log(&quot;此人比较神秘！&quot;);</span></span>
<span class="line"><span>}</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br><span class="line-number">22</span><br><span class="line-number">23</span><br><span class="line-number">24</span><br><span class="line-number">25</span><br><span class="line-number">26</span><br><span class="line-number">27</span><br><span class="line-number">28</span><br></div></div><p>上面我们定义了一个<code>describeForNameMap</code>数组，数组内的每一个元素代表一个判断条件与其执行函数的集合（也是一个数组），之后我们通过数组的<code>find</code>方法查找<code>describeForNameMap</code>数组中符合判断条件的子数组即可。</p><h2 id="_3️⃣-抽离分支" tabindex="-1">3️⃣ 抽离分支 <a class="header-anchor" href="#_3️⃣-抽离分支" aria-label="Permalink to &quot;3️⃣ 抽离分支&quot;">​</a></h2><p>上面例子中我们定义的这个<code>describeForNameMap</code>对象是一个独立的结构，我们完全可以将它抽离出去：</p><div class="language- vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>const describeForNameMap = {</span></span>
<span class="line"><span>    小刘: () =&gt; console.log(&quot;刘哥哥&quot;),</span></span>
<span class="line"><span>    小红: () =&gt; console.log(&quot;小红妹妹&quot;),</span></span>
<span class="line"><span>    陈龙: () =&gt; console.log(&quot;大师&quot;),</span></span>
<span class="line"><span>    李龙: () =&gt; console.log(&quot;师傅&quot;),</span></span>
<span class="line"><span>    大鹏: () =&gt; console.log(&quot;恶人&quot;),</span></span>
<span class="line"><span>};</span></span>
<span class="line"><span></span></span>
<span class="line"><span>function getUserDescribe(name) {</span></span>
<span class="line"><span>    describeForNameMap[name] ? describeForNameMap[name]() : console.log(&quot;此人比较神秘！&quot;);</span></span>
<span class="line"><span>}</span></span>
<span class="line"><span>const describeForNameMap = [</span></span>
<span class="line"><span>    [</span></span>
<span class="line"><span>        (name) =&gt; name.length &gt; 3, // 判断条件</span></span>
<span class="line"><span>        () =&gt; console.log(&quot;名字太长&quot;) // 执行函数</span></span>
<span class="line"><span>    ],</span></span>
<span class="line"><span>    [</span></span>
<span class="line"><span>        (name) =&gt; name.length &lt; 2, </span></span>
<span class="line"><span>        () =&gt; console.log(&quot;名字太短&quot;)</span></span>
<span class="line"><span>    ],</span></span>
<span class="line"><span>    [</span></span>
<span class="line"><span>        (name) =&gt; name[0] === &quot;陈&quot;, </span></span>
<span class="line"><span>        () =&gt; console.log(&quot;小陈&quot;)</span></span>
<span class="line"><span>    ],</span></span>
<span class="line"><span>    [</span></span>
<span class="line"><span>        (name) =&gt; name === &quot;大鹏&quot;, </span></span>
<span class="line"><span>        () =&gt; console.log(&quot;管理员&quot;)</span></span>
<span class="line"><span>    ],</span></span>
<span class="line"><span>    [</span></span>
<span class="line"><span>        (name) =&gt; name[0] === &quot;李&quot; &amp;&amp; name !== &quot;李鹏&quot;,</span></span>
<span class="line"><span>        () =&gt; console.log(&quot;小李&quot;),</span></span>
<span class="line"><span>    ],</span></span>
<span class="line"><span>];</span></span>
<span class="line"><span>    </span></span>
<span class="line"><span>function getUserDescribe(name) {</span></span>
<span class="line"><span>    // 获取符合条件的子数组</span></span>
<span class="line"><span>    const getDescribe = describeForNameMap.find((item) =&gt; item[0](name));</span></span>
<span class="line"><span>    // 子数组存在则运行子数组中的第二个元素（执行函数）</span></span>
<span class="line"><span>    getDescribe ? getDescribe[1]() : console.log(&quot;此人比较神秘！&quot;);</span></span>
<span class="line"><span>}</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br><span class="line-number">22</span><br><span class="line-number">23</span><br><span class="line-number">24</span><br><span class="line-number">25</span><br><span class="line-number">26</span><br><span class="line-number">27</span><br><span class="line-number">28</span><br><span class="line-number">29</span><br><span class="line-number">30</span><br><span class="line-number">31</span><br><span class="line-number">32</span><br><span class="line-number">33</span><br><span class="line-number">34</span><br><span class="line-number">35</span><br><span class="line-number">36</span><br><span class="line-number">37</span><br><span class="line-number">38</span><br><span class="line-number">39</span><br><span class="line-number">40</span><br></div></div><blockquote><p>通过模块化的开发也可以将这个<code>map</code>对象写进一个单独的<code>js</code>文件，之后在需要使用的地方导入即可。</p></blockquote><h2 id="_4️⃣-争议" tabindex="-1">4️⃣ 争议 <a class="header-anchor" href="#_4️⃣-争议" aria-label="Permalink to &quot;4️⃣ 争议&quot;">​</a></h2><p>这样一来整个<code>getUserDescribe</code>函数就变得非常简洁，有的同学可能会问这有什么用呢？这不是更加麻烦了吗？如果真的嫌<code>if else</code>不好看，那我就使用<code>if return</code>不用<code>else</code>就好了：</p><div class="language- vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>function getUserDescribe(name) {</span></span>
<span class="line"><span>    if (name === &quot;小刘&quot;) {</span></span>
<span class="line"><span>        console.log(&quot;刘哥哥&quot;);</span></span>
<span class="line"><span>        return;</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span>    if (name === &quot;小红&quot;) {</span></span>
<span class="line"><span>        console.log(&quot;小红妹妹&quot;);</span></span>
<span class="line"><span>        return;</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span>    if (name === &quot;陈龙&quot;) {</span></span>
<span class="line"><span>        console.log(&quot;大师&quot;);</span></span>
<span class="line"><span>        return;</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span>    if (name === &quot;李龙&quot;) {</span></span>
<span class="line"><span>        console.log(&quot;师傅&quot;);</span></span>
<span class="line"><span>        return;</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span>    if (name === &quot;大鹏&quot;) {</span></span>
<span class="line"><span>        console.log(&quot;恶人&quot;);</span></span>
<span class="line"><span>        return;</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span>    console.log(&quot;此人比较神秘！&quot;);</span></span>
<span class="line"><span>}</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br><span class="line-number">22</span><br><span class="line-number">23</span><br></div></div><p>试想一下，如果你<code>getUserDescribe</code>函数中有1000个判断分支，并且还具有大量的根据判断结果来执行的处理代码，并且<code>getUserDescribe</code>函数会返回这个处理后的判断结果的值。</p><p>这时<code>getUserDescribe</code>函数的<strong>重点</strong>在于<strong>对判断结果的处理</strong>，而不在于这个结果是通过什么分支获取的，例如：</p><div class="language- vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>function getUserDescribe(name) {</span></span>
<span class="line"><span>    let str; // 存储判断结果</span></span>
<span class="line"><span>    if (name.length &gt; 3) {</span></span>
<span class="line"><span>        str = &quot;名字太长&quot;;</span></span>
<span class="line"><span>    } else if (name.length &lt; 2) {</span></span>
<span class="line"><span>        str = &quot;名字太短&quot;;</span></span>
<span class="line"><span>    } else if (name[0] === &quot;陈&quot;) {</span></span>
<span class="line"><span>        str = &quot;小陈&quot;;</span></span>
<span class="line"><span>    } else if (name[0] === &quot;李&quot; &amp;&amp; name !== &quot;李鹏&quot;) {</span></span>
<span class="line"><span>        str = &quot;小李&quot;;</span></span>
<span class="line"><span>    } else if (name === &quot;李鹏&quot;) {</span></span>
<span class="line"><span>        str = &quot;管理员&quot;;</span></span>
<span class="line"><span>    } else {</span></span>
<span class="line"><span>        str = &quot;此人比较神秘！&quot;;</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span>    // 对判断结果str的一些处理</span></span>
<span class="line"><span>    // ......</span></span>
<span class="line"><span>    console.log(str);</span></span>
<span class="line"><span>    return str;</span></span>
<span class="line"><span>}</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br></div></div><p>如果你不进行分支优化，<code>getUserDescribe</code>函数就会被大量的 <code>if</code> 分支抢占空间，使得<code>getUserDescribe</code>函数的重点迷失（<code>getUserDescribe</code>函数<strong>重点在于对判断结果的处理</strong>，而不在于这个结果是通过什么分支获取的），这时你再看一下我们优化后的代码：</p><div class="language- vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>const describeForNameMap = [</span></span>
<span class="line"><span>    [(name) =&gt; name.length &gt; 3, () =&gt; &quot;名字太长&quot;],</span></span>
<span class="line"><span>    [(name) =&gt; name.length &lt; 2, () =&gt; &quot;名字太短&quot;],</span></span>
<span class="line"><span>    [(name) =&gt; name[0] === &quot;陈&quot;, () =&gt; &quot;小陈&quot;],</span></span>
<span class="line"><span>    [(name) =&gt; name === &quot;大鹏&quot;, () =&gt; &quot;管理员&quot;],</span></span>
<span class="line"><span>    [(name) =&gt; name[0] === &quot;李&quot; &amp;&amp; name !== &quot;李鹏&quot;, () =&gt; &quot;小李&quot;],</span></span>
<span class="line"><span>];</span></span>
<span class="line"><span></span></span>
<span class="line"><span>function getUserDescribe(name) {</span></span>
<span class="line"><span>    let str; // 存储判断结果</span></span>
<span class="line"><span>    const getDescribe = describeForNameMap.find((item) =&gt; item[0](name));</span></span>
<span class="line"><span>    if (getDescribe) {</span></span>
<span class="line"><span>        str = getDescribe[1]();</span></span>
<span class="line"><span>    } else {</span></span>
<span class="line"><span>        str = &quot;此人比较神秘！&quot;;</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span>    // 对判断结果str的一些处理</span></span>
<span class="line"><span>    // ......</span></span>
<span class="line"><span>    console.log(str);</span></span>
<span class="line"><span>    return str;</span></span>
<span class="line"><span>}</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br></div></div><p>查看优化后的<code>getUserDescribe</code>函数我们能够知道，它从<code>describeForNameMap</code>获取了一个值赋值给了<code>str</code>（<code>describeForNameMap</code>是如何返回值的我们并不关心），之后对<code>str</code>作了一些处理。这就突出了<code>getUserDescribe</code>函数的重点（<strong>对判断结果str进行处理</strong>）。</p><blockquote><p>在这个例子中<code>describeForNameMap</code>子数组的第二个元素完全可以直接使用一个值：<code>[(name) =&gt; name.length &gt; 3, &quot;名字太长&quot;]</code>，但为了整体代码的可扩展性，推荐还是使用函数，因为函数可以接收参数，方便应对之后更复杂的场景。</p></blockquote><h2 id="🔼-结语" tabindex="-1">🔼 结语 <a class="header-anchor" href="#🔼-结语" aria-label="Permalink to &quot;🔼 结语&quot;">​</a></h2><p><strong>分支优化</strong>在各种语言中都有不同的实现方式和应用场景，本篇通过<code>JavaScript</code>介绍了两种代码分支优化的思想，代码的实现非常简单，重点在于这种思想的应用。</p><p>其实关于分支优化这个问题一直存在争议，目前存在两种观点：</p><ul><li><strong>观点1</strong>：压根不需要多此一举去优化它，并且优化后的代码因为多创建了一个<code>对象/数组</code>，对<code>对象/数组</code>进行检索反而比单纯的<code>if else</code>还是废性能。</li><li><strong>观点2</strong>：分支优化后的代码<code>可读性/可维护性</code>更好，并且引入<code>对象/数组</code>所带来的性能问题在当今时代根本不值一提。</li></ul><p>你是什么观点呢？</p>`,36),c=[l];function i(r,o,t,b,u,m){return a(),n("div",null,c)}const q=s(e,[["render",i]]);export{g as __pageData,q as default};
