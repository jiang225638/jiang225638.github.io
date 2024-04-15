import{_ as s,c as n,o as a,a5 as e,av as p,aw as r,ax as t}from"./chunks/framework.COc6AhYf.js";const _=JSON.parse('{"title":"面试官：Vue3中什么是Reactive的懒响应性？","description":"","frontmatter":{},"headers":[],"relativePath":"excellentArticle/2024-04-15/index.md","filePath":"excellentArticle/2024-04-15/index.md","lastUpdated":1713145463000}'),l={name:"excellentArticle/2024-04-15/index.md"},c=e('<h1 id="面试官-vue3中什么是reactive的懒响应性" tabindex="-1">面试官：Vue3中什么是Reactive的懒响应性？ <a class="header-anchor" href="#面试官-vue3中什么是reactive的懒响应性" aria-label="Permalink to &quot;面试官：Vue3中什么是Reactive的懒响应性？&quot;">​</a></h1><p><strong>Reactive 的懒响应性</strong> 可能很多同学之前没有听说过这个概念。最近一个同学在面试中就被问到了这个问题。所以说，咱们今天就借助这篇文章来看下：在vue3中，什么是 Reactive 的懒响应性？</p><h2 id="_01-reactive-的实现原理" tabindex="-1"><strong>01：Reactive 的实现原理</strong> <a class="header-anchor" href="#_01-reactive-的实现原理" aria-label="Permalink to &quot;**01：Reactive 的实现原理**&quot;">​</a></h2><p>Reactive 是基于 <code>Proxy</code> 进行实现的，这个概念很多同学都是知道的。我们可以通过 vue 的源码来看下这个实现：</p><p><img src="'+p+`" alt="medium-zoom"></p><p>代码比较复杂，大家可以只看我红框中的内容</p><p>通过上图红框中的代码，我们可以很清晰的看到在 Reactive 里面，Vue 最终通过 <code>new Proxy</code> 的方式生成了一个 Proxy 的实例对象。 这个 Proxy 的实例就是 <code>reactive()</code> 方法调用时的返回值。</p><p>我们可以通过如下伪代码表示：</p><div class="language- vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span>function reactive (target) {</span></span>
<span class="line"><span>  return new Proxy(target, {....})</span></span>
<span class="line"><span>}</span></span>
<span class="line"><span></span></span>
<span class="line"><span>const test = reactive({name: &#39;张三&#39;})</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br></div></div><p>在这种情况下，<code>{name: &#39;张三&#39;}</code> 就会被包装成一个 <strong>响应式对象</strong>，<code>proxy</code> 通过监听它的 <code>getter、setter</code> 行为来触发响应性。</p><h2 id="_02-proxy-的问题" tabindex="-1"><strong>02：Proxy 的问题</strong> <a class="header-anchor" href="#_02-proxy-的问题" aria-label="Permalink to &quot;**02：Proxy 的问题**&quot;">​</a></h2><p>Proxy 可以代理对象，这个是没有问题的。<strong>但是：Proxy 只能代理一层对象，而不能代理多层</strong>。</p><p>什么意思呢？假如当 代理对象 具备层级嵌套的时候，proxy 是不可以代理子层级的。我们可以通过以下代码来进行测试：</p><div class="language- vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span> const target = {</span></span>
<span class="line"><span>    name: &#39;张三&#39;,</span></span>
<span class="line"><span>    child: {</span></span>
<span class="line"><span>      name: &#39;小张三&#39;</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span>  }</span></span>
<span class="line"><span></span></span>
<span class="line"><span>  const p = new Proxy(target, {</span></span>
<span class="line"><span>    set(target, property, value, receiver) {</span></span>
<span class="line"><span>      console.log(&#39;触发了 set&#39;);</span></span>
<span class="line"><span>      target[property] = value</span></span>
<span class="line"><span>      return true</span></span>
<span class="line"><span>    },</span></span>
<span class="line"><span>    get(target, property, receiver) {</span></span>
<span class="line"><span>      console.log(&#39;触发了 get&#39;);</span></span>
<span class="line"><span>      return target[property]</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span>  })</span></span>
<span class="line"><span></span></span>
<span class="line"><span>  p.name = &#39;李四&#39;  // 打印：触发了 set</span></span>
<span class="line"><span>  p.child.name = &#39;小李四&#39; // 打印：触发了 get。注意：并没有触发 child 的 set</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br></div></div><p>在上述代码中，我们利用 proxy 代理了 target 对象。<strong>注意：此时的 target 是存在嵌套的复杂数据类型 child</strong>。</p><p>当我们执行 <code>p.name = &#39;李四&#39;</code> 时，触发 <code>set</code> 行为，这是一个很正常的逻辑。但是，当我们执行 <code>p.child.name = &#39;小李四&#39;</code> 时，我们会发现 <strong>仅触发了一个 get（p.child），而没有触发 <code>set</code></strong> 行为。</p><p>这就证明：对于 Proxy 而言， <strong>它只能代理 一层 的复杂数据类型，而不可以代理多层</strong>。</p><p>但是，在 Vue 中 <strong>多层的 Reactive 对象却可以实现响应性，那么这是如何做到的呢？</strong> 具体的方式就是 <strong>Reactive的懒响应性</strong>。</p><h2 id="_03-reactive的懒响应性" tabindex="-1"><strong>03：Reactive的懒响应性</strong> <a class="header-anchor" href="#_03-reactive的懒响应性" aria-label="Permalink to &quot;**03：Reactive的懒响应性**&quot;">​</a></h2><p>我们观察 Vue 的源码，在源码监听 proxy getter 行为的地方，存在这样一段代码（我把代码稍微做了一些调整，让大家看的可以更加清晰）：</p><p><img src="`+r+'" alt="medium-zoom"></p><p>核心的代码就在红框的位置，其中的 res 大家可以理解为 <code>target[property]</code> 。</p><p>而根据 <strong>01：Reactive 的实现原理</strong> 我们知道 <code>reactive</code> 方法本质上就是生成了一个 Proxy 实例。所以说，这里的代码核心其实就是 <strong>一旦获取到的属性是对象，则会为该对象再次执行 <code>reactive</code> 方法</strong></p><p>如果用伪代码表示，就是下面这样：</p><p><img src="'+t+'" alt="medium-zoom"></p><p>即：<strong>再次通过 Proxy 完成代理，并返回</strong></p><p>所以说，所谓的 Reactive的懒响应性 指的就是：<strong>Reactive 最初只会为复杂数据类型执行第一层的响应性。如果存在多层的复杂数据类型嵌套时，则会在使用到（getter 行为）该子集时，才会再次为该子集包装 proxy（执行 reactive 方法）</strong></p>',27),i=[c];function o(d,u,b,m,g,v){return a(),n("div",null,i)}const x=s(l,[["render",o]]);export{_ as __pageData,x as default};
