import{_ as n,c as s,o as a,a5 as p,bT as e,bU as l,bV as i,bW as r,bX as c,bY as t,bZ as b,b_ as o,b$ as u,c0 as m,c1 as d,c2 as g,c3 as h}from"./chunks/framework.FhQQjK86.js";const P=JSON.parse('{"title":"领导被我的花式console.log吸引了！直接写入公司公共库！","description":"","frontmatter":{},"headers":[],"relativePath":"excellentArticle/2024-05-30/index.md","filePath":"excellentArticle/2024-05-30/index.md","lastUpdated":1717046134000}'),x={name:"excellentArticle/2024-05-30/index.md"},v=p('<h1 id="领导被我的花式console-log吸引了-直接写入公司公共库" tabindex="-1">领导被我的花式console.log吸引了！直接写入公司公共库！ <a class="header-anchor" href="#领导被我的花式console-log吸引了-直接写入公司公共库" aria-label="Permalink to &quot;领导被我的花式console.log吸引了！直接写入公司公共库！&quot;">​</a></h1><p><strong>背景简介</strong></p><p>这几天代码评审，领导无意中看到了我本地代码的控制台，被我花里胡哨的<code>console打印</code>内容吸引了！</p><p><img src="'+e+'" alt="medium-zoom">img</p><p>老板看见后，说我这东西有意思，花里胡哨的，他喜欢！</p><p>但是随即又问我，这么花里胡哨的东西，上生产会影响性能吧？我自信的说：不会，代码内有判断的，<code>只有开发环境会打印</code>！</p><p>老板很满意，于是让我给其他前端同事分享一下，讲解下实现思路！最终，这个方法还被写入公司的公用utils库里，供大家使用！</p><h1 id="console简介" tabindex="-1"><strong>console简介</strong> <a class="header-anchor" href="#console简介" aria-label="Permalink to &quot;**console简介**&quot;">​</a></h1><p>console 是一个用于调试和记录信息的内置对象， 提供了多种方法，可以帮助开发者输出各种信息，进行调试和分析。</p><p><strong>console.log()</strong></p><p>用于输出一般信息，大家应该在熟悉不过了。</p><p><img src="'+l+'" alt="medium-zoom">img</p><p><strong>console.info()</strong> :</p><p>输出信息，与 console.log 类似，但在某些浏览器中可能有不同的样式。</p><p><img src="'+i+'" alt="medium-zoom">img</p><p><strong>console.warn()</strong> :</p><p>输出警告信息，通常会以黄色背景或带有警告图标的样式显示。</p><p><img src="'+r+'" alt="medium-zoom">img</p><p><strong>console.error()</strong> :</p><p>输出错误信息，通常会以红色背景或带有错误图标的样式显示。</p><p><img src="'+c+`" alt="medium-zoom">img</p><p><strong>console.table()</strong> :</p><p>以表格形式输出数据，适用于数组和对象。</p><p>例如：</p><div class="language- vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span>js复制代码const users = [</span></span>
<span class="line"><span>    { name: &#39;石小石&#39;, age: 18 },</span></span>
<span class="line"><span>    { name: &#39;刘亦菲&#39;, age: 18 }</span></span>
<span class="line"><span>];</span></span>
<span class="line"><span>console.table(users);</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br></div></div><p><img src="`+t+`" alt="medium-zoom">img</p><p>通过上述介绍，我们可以看出，原生的文本信息、警告信息、错误信息、数组信息打印出来的效果都很普通，辨识度不高！现在我们通过console.log来实现一些花里花哨的样式！</p><h1 id="技术方案" tabindex="-1"><strong>技术方案</strong> <a class="header-anchor" href="#技术方案" aria-label="Permalink to &quot;**技术方案**&quot;">​</a></h1><h2 id="console-log" tabindex="-1"><strong>console.log()</strong> <a class="header-anchor" href="#console-log" aria-label="Permalink to &quot;**console.log()**&quot;">​</a></h2><p>console.log() 可以接受任何类型的参数，包括字符串、数字、布尔值、对象、数组、函数等。最厉害的是，它支持占位符!</p><p>常用的占位符：</p><ul><li>%s - 字符串</li><li>%d or %i - 整数</li><li>%f - 浮点数</li><li>%o - 对象</li><li>%c - CSS 样式</li></ul><h3 id="格式化字符串" tabindex="-1"><strong>格式化字符串</strong> <a class="header-anchor" href="#格式化字符串" aria-label="Permalink to &quot;**格式化字符串**&quot;">​</a></h3><p>console.log() 支持类似于 C 语言 printf 函数的格式化字符串。我们可以使用占位符来插入变量值。</p><div class="language- vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span>js复制代码const name = &#39;Alice&#39;;</span></span>
<span class="line"><span>const age = 30;</span></span>
<span class="line"><span>console.log(&#39;Name: %s, Age: %d&#39;, name, age); // Name: Alice, Age: 30</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br></div></div><h3 id="添加样式" tabindex="-1"><strong>添加样式</strong> <a class="header-anchor" href="#添加样式" aria-label="Permalink to &quot;**添加样式**&quot;">​</a></h3><p>可以使用 %c 占位符添加 CSS 样式，使输出内容更加美观。</p><div class="language- vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span>js复制代码console.log(&#39;%c This is a styled message&#39;, &#39;color: red; font-size: 20px;&#39;);</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br></div></div><p><img src="`+b+`" alt="medium-zoom">img</p><p>自定义样式的实现，其实主要是靠%c 占位符添加 CSS 样式实现的！</p><h2 id="实现美化的信息打印" tabindex="-1"><strong>实现美化的信息打印</strong> <a class="header-anchor" href="#实现美化的信息打印" aria-label="Permalink to &quot;**实现美化的信息打印**&quot;">​</a></h2><h3 id="基础信息打印" tabindex="-1"><strong>基础信息打印</strong> <a class="header-anchor" href="#基础信息打印" aria-label="Permalink to &quot;**基础信息打印**&quot;">​</a></h3><p>我们创建一个prettyLog方法，用于逻辑编写</p><div class="language- vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span>js复制代码// 美化打印实现方法</span></span>
<span class="line"><span>const prettyLog = () =&gt; {</span></span>
<span class="line"><span>  const isEmpty = (value: any) =&gt; {</span></span>
<span class="line"><span>    return value == null || value === undefined || value === &#39;&#39;;</span></span>
<span class="line"><span>  };</span></span>
<span class="line"><span>  const prettyPrint = (title: string, text: string, color: string) =&gt; {</span></span>
<span class="line"><span>    console.log(</span></span>
<span class="line"><span>      \`%c \${title} %c \${text} %c\`,</span></span>
<span class="line"><span>      \`background:\${color};border:1px solid \${color}; padding: 1px; border-radius: 2px 0 0 2px; color: #fff;\`,</span></span>
<span class="line"><span>      \`border:1px solid \${color}; padding: 1px; border-radius: 0 2px 2px 0; color: \${color};\`,</span></span>
<span class="line"><span>      &#39;background:transparent&#39;</span></span>
<span class="line"><span>    );</span></span>
<span class="line"><span>  };</span></span>
<span class="line"><span>  // 基础信息打印</span></span>
<span class="line"><span>  const info = (textOrTitle: string, content = &#39;&#39;) =&gt; {</span></span>
<span class="line"><span>    const title = isEmpty(content) ? &#39;Info&#39; : textOrTitle;</span></span>
<span class="line"><span>    const text = isEmpty(content) ? textOrTitle : content;</span></span>
<span class="line"><span>    prettyPrint(title, text, &#39;#909399&#39;);</span></span>
<span class="line"><span>  };</span></span>
<span class="line"><span>  return {</span></span>
<span class="line"><span>    info</span></span>
<span class="line"><span>  };</span></span>
<span class="line"><span>};</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br><span class="line-number">22</span><br><span class="line-number">23</span><br></div></div><p>上述代码定义了一个 prettyLog 函数，用于美化打印信息到控制台。通过自定义样式，输出信息以更易读和美观的格式呈现。</p><p>我们使用一下看看效果</p><div class="language- vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span>js复制代码// 创建打印对象</span></span>
<span class="line"><span>const log = prettyLog();</span></span>
<span class="line"><span></span></span>
<span class="line"><span>// 不带标题</span></span>
<span class="line"><span>log.info(&#39;这是基础信息!&#39;);</span></span>
<span class="line"><span></span></span>
<span class="line"><span>//带标题</span></span>
<span class="line"><span>log.info(&#39;注意看&#39;, &#39;这是个男人叫小帅!&#39;);</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br></div></div><p><img src="`+o+`" alt="medium-zoom">img</p><p>info 方法用于输出信息级别的日志。它接受两个参数：textOrTitle 和 content。如果只提供一个参数，则视为内容并设置默认标题为 Info；如果提供两个参数，则第一个参数为标题，第二个参数为内容。最后调用 prettyPrint 方法进行输出。</p><h3 id="错误信息打印" tabindex="-1"><strong>错误信息打印</strong> <a class="header-anchor" href="#错误信息打印" aria-label="Permalink to &quot;**错误信息打印**&quot;">​</a></h3><div class="language- vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span>js复制代码const prettyLog = () =&gt; {</span></span>
<span class="line"><span>    const isEmpty = (value: any) =&gt; {</span></span>
<span class="line"><span>        return value == null || value === undefined || value === &#39;&#39;;</span></span>
<span class="line"><span>    };</span></span>
<span class="line"><span>    const prettyPrint = (title: string, text: string, color: string) =&gt; {</span></span>
<span class="line"><span>         // ...</span></span>
<span class="line"><span>    };</span></span>
<span class="line"><span>    const info = (textOrTitle: string, content = &#39;&#39;) =&gt; {</span></span>
<span class="line"><span>        // ...</span></span>
<span class="line"><span>    };</span></span>
<span class="line"><span>    const error = (textOrTitle: string, content = &#39;&#39;) =&gt; {</span></span>
<span class="line"><span>        const title = isEmpty(content) ? &#39;Error&#39; : textOrTitle;</span></span>
<span class="line"><span>        const text = isEmpty(content) ? textOrTitle : content;</span></span>
<span class="line"><span>        prettyPrint(title, text, &#39;#F56C6C&#39;);</span></span>
<span class="line"><span>    };</span></span>
<span class="line"><span>    // retu;</span></span>
<span class="line"><span>    return {</span></span>
<span class="line"><span>        info,</span></span>
<span class="line"><span>        error,</span></span>
<span class="line"><span>    };</span></span>
<span class="line"><span>};</span></span>
<span class="line"><span>// 创建打印对象</span></span>
<span class="line"><span>const log = prettyLog();</span></span>
<span class="line"><span></span></span>
<span class="line"><span>log.error(&#39;奥德彪&#39;, &#39;出来的时候穷 生活总是让我穷 所以现在还是穷。&#39;);</span></span>
<span class="line"><span></span></span>
<span class="line"><span>log.error(&#39;前方的路看似很危险,实际一点也不安全。&#39;);</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br><span class="line-number">22</span><br><span class="line-number">23</span><br><span class="line-number">24</span><br><span class="line-number">25</span><br><span class="line-number">26</span><br><span class="line-number">27</span><br></div></div><p><img src="`+u+`" alt="medium-zoom">img</p><h3 id="成功信息与警告信息打印" tabindex="-1"><strong>成功信息与警告信息打印</strong> <a class="header-anchor" href="#成功信息与警告信息打印" aria-label="Permalink to &quot;**成功信息与警告信息打印**&quot;">​</a></h3><div class="language- vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span>js复制代码// 美化打印实现方法</span></span>
<span class="line"><span>const prettyLog = () =&gt; {</span></span>
<span class="line"><span>    const isEmpty = (value: any) =&gt; {</span></span>
<span class="line"><span>        return value == null || value === undefined || value === &#39;&#39;;</span></span>
<span class="line"><span>    };</span></span>
<span class="line"><span>    const prettyPrint = (title: string, text: string, color: string) =&gt; {</span></span>
<span class="line"><span>        console.log(</span></span>
<span class="line"><span>            \`%c \${title} %c \${text} %c\`,</span></span>
<span class="line"><span>            \`background:\${color};border:1px solid \${color}; padding: 1px; border-radius: 2px 0 0 2px; color: #fff;\`,</span></span>
<span class="line"><span>            \`border:1px solid \${color}; padding: 1px; border-radius: 0 2px 2px 0; color: \${color};\`,</span></span>
<span class="line"><span>            &#39;background:transparent&#39;</span></span>
<span class="line"><span>        );</span></span>
<span class="line"><span>    };</span></span>
<span class="line"><span>    const info = (textOrTitle: string, content = &#39;&#39;) =&gt; {</span></span>
<span class="line"><span>        const title = isEmpty(content) ? &#39;Info&#39; : textOrTitle;</span></span>
<span class="line"><span>        const text = isEmpty(content) ? textOrTitle : content;</span></span>
<span class="line"><span>        prettyPrint(title, text, &#39;#909399&#39;);</span></span>
<span class="line"><span>    };</span></span>
<span class="line"><span>    const error = (textOrTitle: string, content = &#39;&#39;) =&gt; {</span></span>
<span class="line"><span>        const title = isEmpty(content) ? &#39;Error&#39; : textOrTitle;</span></span>
<span class="line"><span>        const text = isEmpty(content) ? textOrTitle : content;</span></span>
<span class="line"><span>        prettyPrint(title, text, &#39;#F56C6C&#39;);</span></span>
<span class="line"><span>    };</span></span>
<span class="line"><span>    const warning = (textOrTitle: string, content = &#39;&#39;) =&gt; {</span></span>
<span class="line"><span>        const title = isEmpty(content) ? &#39;Warning&#39; : textOrTitle;</span></span>
<span class="line"><span>        const text = isEmpty(content) ? textOrTitle : content;</span></span>
<span class="line"><span>        prettyPrint(title, text, &#39;#E6A23C&#39;);</span></span>
<span class="line"><span>    };</span></span>
<span class="line"><span>    const success = (textOrTitle: string, content = &#39;&#39;) =&gt; {</span></span>
<span class="line"><span>        const title = isEmpty(content) ? &#39;Success &#39; : textOrTitle;</span></span>
<span class="line"><span>        const text = isEmpty(content) ? textOrTitle : content;</span></span>
<span class="line"><span>        prettyPrint(title, text, &#39;#67C23A&#39;);</span></span>
<span class="line"><span>    };</span></span>
<span class="line"><span>    // retu;</span></span>
<span class="line"><span>    return {</span></span>
<span class="line"><span>        info,</span></span>
<span class="line"><span>        error,</span></span>
<span class="line"><span>        warning,</span></span>
<span class="line"><span>        success</span></span>
<span class="line"><span>    };</span></span>
<span class="line"><span>};</span></span>
<span class="line"><span>// 创建打印对象</span></span>
<span class="line"><span>const log = prettyLog();</span></span>
<span class="line"><span></span></span>
<span class="line"><span>log.warning(&#39;奥德彪&#39;, &#39;我并非无路可走 我还有死路一条! &#39;);</span></span>
<span class="line"><span></span></span>
<span class="line"><span>log.success(&#39;奥德彪&#39;, &#39;钱没了可以再赚，良心没了便可以赚的更多。 &#39;);</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br><span class="line-number">22</span><br><span class="line-number">23</span><br><span class="line-number">24</span><br><span class="line-number">25</span><br><span class="line-number">26</span><br><span class="line-number">27</span><br><span class="line-number">28</span><br><span class="line-number">29</span><br><span class="line-number">30</span><br><span class="line-number">31</span><br><span class="line-number">32</span><br><span class="line-number">33</span><br><span class="line-number">34</span><br><span class="line-number">35</span><br><span class="line-number">36</span><br><span class="line-number">37</span><br><span class="line-number">38</span><br><span class="line-number">39</span><br><span class="line-number">40</span><br><span class="line-number">41</span><br><span class="line-number">42</span><br><span class="line-number">43</span><br><span class="line-number">44</span><br><span class="line-number">45</span><br><span class="line-number">46</span><br><span class="line-number">47</span><br></div></div><p><img src="`+m+`" alt="medium-zoom">img</p><h2 id="实现图片打印" tabindex="-1"><strong>实现图片打印</strong> <a class="header-anchor" href="#实现图片打印" aria-label="Permalink to &quot;**实现图片打印**&quot;">​</a></h2><div class="language- vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span>js复制代码// 美化打印实现方法</span></span>
<span class="line"><span>const prettyLog = () =&gt; {</span></span>
<span class="line"><span>  // ....</span></span>
<span class="line"><span>  const picture = (url: string, scale = 1) =&gt; {</span></span>
<span class="line"><span>    const img = new Image();</span></span>
<span class="line"><span>    img.crossOrigin = &#39;anonymous&#39;;</span></span>
<span class="line"><span>    img.onload = () =&gt; {</span></span>
<span class="line"><span>        const c = document.createElement(&#39;canvas&#39;);</span></span>
<span class="line"><span>        const ctx = c.getContext(&#39;2d&#39;);</span></span>
<span class="line"><span>        if (ctx) {</span></span>
<span class="line"><span>            c.width = img.width;</span></span>
<span class="line"><span>            c.height = img.height;</span></span>
<span class="line"><span>            ctx.fillStyle = &#39;red&#39;;</span></span>
<span class="line"><span>            ctx.fillRect(0, 0, c.width, c.height);</span></span>
<span class="line"><span>            ctx.drawImage(img, 0, 0);</span></span>
<span class="line"><span>            const dataUri = c.toDataURL(&#39;image/png&#39;);</span></span>
<span class="line"><span></span></span>
<span class="line"><span>            console.log(</span></span>
<span class="line"><span>                \`%c sup?\`,</span></span>
<span class="line"><span>                \`font-size: 1px;</span></span>
<span class="line"><span>                padding: \${Math.floor((img.height * scale) / 2)}px \${Math.floor((img.width * scale) / 2)}px;</span></span>
<span class="line"><span>                background-image: url(\${dataUri});</span></span>
<span class="line"><span>                background-repeat: no-repeat;</span></span>
<span class="line"><span>                background-size: \${img.width * scale}px \${img.height * scale}px;</span></span>
<span class="line"><span>                color: transparent;</span></span>
<span class="line"><span>                \`</span></span>
<span class="line"><span>            );</span></span>
<span class="line"><span>        }</span></span>
<span class="line"><span>    };</span></span>
<span class="line"><span>    img.src = url;</span></span>
<span class="line"><span>};</span></span>
<span class="line"><span></span></span>
<span class="line"><span>  return {</span></span>
<span class="line"><span>    info,</span></span>
<span class="line"><span>    error,</span></span>
<span class="line"><span>    warning,</span></span>
<span class="line"><span>    success,</span></span>
<span class="line"><span>    picture</span></span>
<span class="line"><span>  };</span></span>
<span class="line"><span>}</span></span>
<span class="line"><span></span></span>
<span class="line"><span>// 创建打印对象</span></span>
<span class="line"><span>const log = prettyLog();</span></span>
<span class="line"><span></span></span>
<span class="line"><span>log.picture(&#39;https://nimg.ws.126.net/?url=http%3A%2F%2Fdingyue.ws.126.net%2F2024%2F0514%2Fd0ea93ebj00sdgx56001xd200u000gtg00hz00a2.jpg&amp;thumbnail=660x2147483647&amp;quality=80&amp;type=jpg&#39;);</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br><span class="line-number">22</span><br><span class="line-number">23</span><br><span class="line-number">24</span><br><span class="line-number">25</span><br><span class="line-number">26</span><br><span class="line-number">27</span><br><span class="line-number">28</span><br><span class="line-number">29</span><br><span class="line-number">30</span><br><span class="line-number">31</span><br><span class="line-number">32</span><br><span class="line-number">33</span><br><span class="line-number">34</span><br><span class="line-number">35</span><br><span class="line-number">36</span><br><span class="line-number">37</span><br><span class="line-number">38</span><br><span class="line-number">39</span><br><span class="line-number">40</span><br><span class="line-number">41</span><br><span class="line-number">42</span><br><span class="line-number">43</span><br><span class="line-number">44</span><br><span class="line-number">45</span><br></div></div><p><img src="`+d+`" alt="medium-zoom">img</p><p>上述代码参考了其他文章：Just a moment...</p><p><em>url可以传支持 base64，如果是url链接，图片链接则必须开启了跨域访问才能打印</em></p><h2 id="实现美化的数组打印" tabindex="-1"><strong>实现美化的数组打印</strong> <a class="header-anchor" href="#实现美化的数组打印" aria-label="Permalink to &quot;**实现美化的数组打印**&quot;">​</a></h2><p>打印对象或者数组，其实用原生的console.table比较好</p><div class="language- vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span>yaml复制代码const data = [</span></span>
<span class="line"><span>  { id: 1, name: &#39;Alice&#39;, age: 25 },</span></span>
<span class="line"><span>  { id: 2, name: &#39;Bob&#39;, age: 30 },</span></span>
<span class="line"><span>  { id: 3, name: &#39;Charlie&#39;, age: 35 }</span></span>
<span class="line"><span>];</span></span>
<span class="line"><span></span></span>
<span class="line"><span>console.table(data);</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br></div></div><p><img src="`+g+`" alt="medium-zoom">img</p><p>当然，我们也可以伪实现</p><div class="language- vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span>js复制代码const table = () =&gt; {</span></span>
<span class="line"><span>    const data = [</span></span>
<span class="line"><span>        { id: 1, name: &#39;Alice&#39;, age: 25 },</span></span>
<span class="line"><span>        { id: 2, name: &#39;Bob&#39;, age: 30 },</span></span>
<span class="line"><span>        { id: 3, name: &#39;Charlie&#39;, age: 35 }</span></span>
<span class="line"><span>    ];</span></span>
<span class="line"><span>    console.log(</span></span>
<span class="line"><span>        &#39;%c id%c name%c age&#39;,</span></span>
<span class="line"><span>        &#39;color: white; background-color: black; padding: 2px 10px;&#39;,</span></span>
<span class="line"><span>        &#39;color: white; background-color: black; padding: 2px 10px;&#39;,</span></span>
<span class="line"><span>        &#39;color: white; background-color: black; padding: 2px 10px;&#39;</span></span>
<span class="line"><span>    );</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    data.forEach((row: any) =&gt; {</span></span>
<span class="line"><span>        console.log(</span></span>
<span class="line"><span>            \`%c \${row.id} %c \${row.name} %c \${row.age} \`,</span></span>
<span class="line"><span>            &#39;color: black; background-color: lightgray; padding: 2px 10px;&#39;,</span></span>
<span class="line"><span>            &#39;color: black; background-color: lightgray; padding: 2px 10px;&#39;,</span></span>
<span class="line"><span>            &#39;color: black; background-color: lightgray; padding: 2px 10px;&#39;</span></span>
<span class="line"><span>        );</span></span>
<span class="line"><span>    });</span></span>
<span class="line"><span>};</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br><span class="line-number">22</span><br></div></div><p><img src="`+h+`" alt="medium-zoom">img</p><p>但是，我们无法控制表格的宽度，因此，这个方法不太好用，不如原生。</p><h2 id="仅在开发环境使用" tabindex="-1"><strong>仅在开发环境使用</strong> <a class="header-anchor" href="#仅在开发环境使用" aria-label="Permalink to &quot;**仅在开发环境使用**&quot;">​</a></h2><div class="language- vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span>js复制代码// 美化打印实现方法</span></span>
<span class="line"><span>const prettyLog = () =&gt; {</span></span>
<span class="line"><span>  //判断是否生产环境</span></span>
<span class="line"><span>  const isProduction = import.meta.env.MODE === &#39;production&#39;;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>  const isEmpty = (value: any) =&gt; {</span></span>
<span class="line"><span>    return value == null || value === undefined || value === &#39;&#39;;</span></span>
<span class="line"><span>  };</span></span>
<span class="line"><span>  const prettyPrint = (title: string, text: string, color: string) =&gt; {</span></span>
<span class="line"><span>    if (isProduction) return;</span></span>
<span class="line"><span>    // ...</span></span>
<span class="line"><span>  };</span></span>
<span class="line"><span>  // ...</span></span>
<span class="line"><span>  const picture = (url: string, scale = 1) =&gt; {</span></span>
<span class="line"><span>    if (isProduction) return;</span></span>
<span class="line"><span>    // ...</span></span>
<span class="line"><span>    };</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    // retu;</span></span>
<span class="line"><span>    return {</span></span>
<span class="line"><span>        info,</span></span>
<span class="line"><span>        error,</span></span>
<span class="line"><span>        warning,</span></span>
<span class="line"><span>        success,</span></span>
<span class="line"><span>        picture,</span></span>
<span class="line"><span>        table</span></span>
<span class="line"><span>    };</span></span>
<span class="line"><span>};</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br><span class="line-number">22</span><br><span class="line-number">23</span><br><span class="line-number">24</span><br><span class="line-number">25</span><br><span class="line-number">26</span><br><span class="line-number">27</span><br><span class="line-number">28</span><br></div></div><p>我们可以通过import.meta.env.MODE 判断当前环境是否为生产环境，在生产环境，我们可以禁用信息打印！</p><h1 id="完整代码" tabindex="-1"><strong>完整代码</strong> <a class="header-anchor" href="#完整代码" aria-label="Permalink to &quot;**完整代码**&quot;">​</a></h1><div class="language- vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span>js复制代码// 美化打印实现方法</span></span>
<span class="line"><span>const prettyLog = () =&gt; {</span></span>
<span class="line"><span>    const isProduction = import.meta.env.MODE === &#39;production&#39;;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    const isEmpty = (value: any) =&gt; {</span></span>
<span class="line"><span>        return value == null || value === undefined || value === &#39;&#39;;</span></span>
<span class="line"><span>    };</span></span>
<span class="line"><span>    const prettyPrint = (title: string, text: string, color: string) =&gt; {</span></span>
<span class="line"><span>        if (isProduction) return;</span></span>
<span class="line"><span>        console.log(</span></span>
<span class="line"><span>            \`%c \${title} %c \${text} %c\`,</span></span>
<span class="line"><span>            \`background:\${color};border:1px solid \${color}; padding: 1px; border-radius: 2px 0 0 2px; color: #fff;\`,</span></span>
<span class="line"><span>            \`border:1px solid \${color}; padding: 1px; border-radius: 0 2px 2px 0; color: \${color};\`,</span></span>
<span class="line"><span>            &#39;background:transparent&#39;</span></span>
<span class="line"><span>        );</span></span>
<span class="line"><span>    };</span></span>
<span class="line"><span>    const info = (textOrTitle: string, content = &#39;&#39;) =&gt; {</span></span>
<span class="line"><span>        const title = isEmpty(content) ? &#39;Info&#39; : textOrTitle;</span></span>
<span class="line"><span>        const text = isEmpty(content) ? textOrTitle : content;</span></span>
<span class="line"><span>        prettyPrint(title, text, &#39;#909399&#39;);</span></span>
<span class="line"><span>    };</span></span>
<span class="line"><span>    const error = (textOrTitle: string, content = &#39;&#39;) =&gt; {</span></span>
<span class="line"><span>        const title = isEmpty(content) ? &#39;Error&#39; : textOrTitle;</span></span>
<span class="line"><span>        const text = isEmpty(content) ? textOrTitle : content;</span></span>
<span class="line"><span>        prettyPrint(title, text, &#39;#F56C6C&#39;);</span></span>
<span class="line"><span>    };</span></span>
<span class="line"><span>    const warning = (textOrTitle: string, content = &#39;&#39;) =&gt; {</span></span>
<span class="line"><span>        const title = isEmpty(content) ? &#39;Warning&#39; : textOrTitle;</span></span>
<span class="line"><span>        const text = isEmpty(content) ? textOrTitle : content;</span></span>
<span class="line"><span>        prettyPrint(title, text, &#39;#E6A23C&#39;);</span></span>
<span class="line"><span>    };</span></span>
<span class="line"><span>    const success = (textOrTitle: string, content = &#39;&#39;) =&gt; {</span></span>
<span class="line"><span>        const title = isEmpty(content) ? &#39;Success &#39; : textOrTitle;</span></span>
<span class="line"><span>        const text = isEmpty(content) ? textOrTitle : content;</span></span>
<span class="line"><span>        prettyPrint(title, text, &#39;#67C23A&#39;);</span></span>
<span class="line"><span>    };</span></span>
<span class="line"><span>    const table = () =&gt; {</span></span>
<span class="line"><span>        const data = [</span></span>
<span class="line"><span>            { id: 1, name: &#39;Alice&#39;, age: 25 },</span></span>
<span class="line"><span>            { id: 2, name: &#39;Bob&#39;, age: 30 },</span></span>
<span class="line"><span>            { id: 3, name: &#39;Charlie&#39;, age: 35 }</span></span>
<span class="line"><span>        ];</span></span>
<span class="line"><span>        console.log(</span></span>
<span class="line"><span>            &#39;%c id%c name%c age&#39;,</span></span>
<span class="line"><span>            &#39;color: white; background-color: black; padding: 2px 10px;&#39;,</span></span>
<span class="line"><span>            &#39;color: white; background-color: black; padding: 2px 10px;&#39;,</span></span>
<span class="line"><span>            &#39;color: white; background-color: black; padding: 2px 10px;&#39;</span></span>
<span class="line"><span>        );</span></span>
<span class="line"><span></span></span>
<span class="line"><span>        data.forEach((row: any) =&gt; {</span></span>
<span class="line"><span>            console.log(</span></span>
<span class="line"><span>                \`%c \${row.id} %c \${row.name} %c \${row.age} \`,</span></span>
<span class="line"><span>                &#39;color: black; background-color: lightgray; padding: 2px 10px;&#39;,</span></span>
<span class="line"><span>                &#39;color: black; background-color: lightgray; padding: 2px 10px;&#39;,</span></span>
<span class="line"><span>                &#39;color: black; background-color: lightgray; padding: 2px 10px;&#39;</span></span>
<span class="line"><span>            );</span></span>
<span class="line"><span>        });</span></span>
<span class="line"><span>    };</span></span>
<span class="line"><span>    const picture = (url: string, scale = 1) =&gt; {</span></span>
<span class="line"><span>        if (isProduction) return;</span></span>
<span class="line"><span>        const img = new Image();</span></span>
<span class="line"><span>        img.crossOrigin = &#39;anonymous&#39;;</span></span>
<span class="line"><span>        img.onload = () =&gt; {</span></span>
<span class="line"><span>            const c = document.createElement(&#39;canvas&#39;);</span></span>
<span class="line"><span>            const ctx = c.getContext(&#39;2d&#39;);</span></span>
<span class="line"><span>            if (ctx) {</span></span>
<span class="line"><span>                c.width = img.width;</span></span>
<span class="line"><span>                c.height = img.height;</span></span>
<span class="line"><span>                ctx.fillStyle = &#39;red&#39;;</span></span>
<span class="line"><span>                ctx.fillRect(0, 0, c.width, c.height);</span></span>
<span class="line"><span>                ctx.drawImage(img, 0, 0);</span></span>
<span class="line"><span>                const dataUri = c.toDataURL(&#39;image/png&#39;);</span></span>
<span class="line"><span></span></span>
<span class="line"><span>                console.log(</span></span>
<span class="line"><span>                    \`%c sup?\`,</span></span>
<span class="line"><span>                    \`font-size: 1px;</span></span>
<span class="line"><span>                    padding: \${Math.floor((img.height * scale) / 2)}px \${Math.floor((img.width * scale) / 2)}px;</span></span>
<span class="line"><span>                    background-image: url(\${dataUri});</span></span>
<span class="line"><span>                    background-repeat: no-repeat;</span></span>
<span class="line"><span>                    background-size: \${img.width * scale}px \${img.height * scale}px;</span></span>
<span class="line"><span>                    color: transparent;</span></span>
<span class="line"><span>                    \`</span></span>
<span class="line"><span>                );</span></span>
<span class="line"><span>            }</span></span>
<span class="line"><span>        };</span></span>
<span class="line"><span>        img.src = url;</span></span>
<span class="line"><span>    };</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    // retu;</span></span>
<span class="line"><span>    return {</span></span>
<span class="line"><span>        info,</span></span>
<span class="line"><span>        error,</span></span>
<span class="line"><span>        warning,</span></span>
<span class="line"><span>        success,</span></span>
<span class="line"><span>        picture,</span></span>
<span class="line"><span>        table</span></span>
<span class="line"><span>    };</span></span>
<span class="line"><span>};</span></span>
<span class="line"><span>// 创建打印对象</span></span>
<span class="line"><span>const log = prettyLog();</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br><span class="line-number">22</span><br><span class="line-number">23</span><br><span class="line-number">24</span><br><span class="line-number">25</span><br><span class="line-number">26</span><br><span class="line-number">27</span><br><span class="line-number">28</span><br><span class="line-number">29</span><br><span class="line-number">30</span><br><span class="line-number">31</span><br><span class="line-number">32</span><br><span class="line-number">33</span><br><span class="line-number">34</span><br><span class="line-number">35</span><br><span class="line-number">36</span><br><span class="line-number">37</span><br><span class="line-number">38</span><br><span class="line-number">39</span><br><span class="line-number">40</span><br><span class="line-number">41</span><br><span class="line-number">42</span><br><span class="line-number">43</span><br><span class="line-number">44</span><br><span class="line-number">45</span><br><span class="line-number">46</span><br><span class="line-number">47</span><br><span class="line-number">48</span><br><span class="line-number">49</span><br><span class="line-number">50</span><br><span class="line-number">51</span><br><span class="line-number">52</span><br><span class="line-number">53</span><br><span class="line-number">54</span><br><span class="line-number">55</span><br><span class="line-number">56</span><br><span class="line-number">57</span><br><span class="line-number">58</span><br><span class="line-number">59</span><br><span class="line-number">60</span><br><span class="line-number">61</span><br><span class="line-number">62</span><br><span class="line-number">63</span><br><span class="line-number">64</span><br><span class="line-number">65</span><br><span class="line-number">66</span><br><span class="line-number">67</span><br><span class="line-number">68</span><br><span class="line-number">69</span><br><span class="line-number">70</span><br><span class="line-number">71</span><br><span class="line-number">72</span><br><span class="line-number">73</span><br><span class="line-number">74</span><br><span class="line-number">75</span><br><span class="line-number">76</span><br><span class="line-number">77</span><br><span class="line-number">78</span><br><span class="line-number">79</span><br><span class="line-number">80</span><br><span class="line-number">81</span><br><span class="line-number">82</span><br><span class="line-number">83</span><br><span class="line-number">84</span><br><span class="line-number">85</span><br><span class="line-number">86</span><br><span class="line-number">87</span><br><span class="line-number">88</span><br><span class="line-number">89</span><br><span class="line-number">90</span><br><span class="line-number">91</span><br><span class="line-number">92</span><br><span class="line-number">93</span><br><span class="line-number">94</span><br><span class="line-number">95</span><br><span class="line-number">96</span><br><span class="line-number">97</span><br><span class="line-number">98</span><br><span class="line-number">99</span><br><span class="line-number">100</span><br></div></div>`,73),y=[v];function k(f,w,C,_,$,E){return a(),s("div",null,y)}const T=n(x,[["render",k]]);export{P as __pageData,T as default};
