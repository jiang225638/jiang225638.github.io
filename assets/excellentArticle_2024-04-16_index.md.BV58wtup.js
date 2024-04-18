import{_ as a,c as p,o as e,a5 as l,ay as s,az as i,aA as r,aB as n,aC as t}from"./chunks/framework.C3URvVMS.js";const k=JSON.parse('{"title":"搞懂 Vue3 中的各种 ref: toRef,toRefs,isRef,unref...","description":"","frontmatter":{},"headers":[],"relativePath":"excellentArticle/2024-04-16/index.md","filePath":"excellentArticle/2024-04-16/index.md","lastUpdated":1713259402000}'),c={name:"excellentArticle/2024-04-16/index.md"},u=l(`<h1 id="搞懂-vue3-中的各种-ref-toref-torefs-isref-unref" tabindex="-1">搞懂 Vue3 中的各种 ref: toRef,toRefs,isRef,unref... <a class="header-anchor" href="#搞懂-vue3-中的各种-ref-toref-torefs-isref-unref" aria-label="Permalink to &quot;搞懂 Vue3 中的各种 ref: toRef,toRefs,isRef,unref...&quot;">​</a></h1><p>在 Vue3 中，有许多与响应式相关的函数，例如 toRef、toRefs、isRef、unref 等等。合理地使用这些函数可以在实际开发中大大提高效率。本文将详细介绍这些函数的用法，让我们在实际开发中知道应该使用哪些 API 并能够熟练地回答面试官的相关问题。</p><h2 id="ref" tabindex="-1"><strong>ref()</strong> <a class="header-anchor" href="#ref" aria-label="Permalink to &quot;**ref()**&quot;">​</a></h2><p>大家对于 ref 这个 API 肯定都不陌生。在 Vue3 中经常会用到它。它的作用是接收一个值并返回一个响应式的对象。我们可以通过.value 属性来访问和修改这个值。在模板中，我们可以省略.value，例如在下面的代码中，当点击按钮时，页面中的 count 会响应式地更改。</p><div class="language- vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span>&lt;template&gt;</span></span>
<span class="line"><span>    &lt;div&gt;</span></span>
<span class="line"><span>        {{ count }}</span></span>
<span class="line"><span>        &lt;button @click=&quot;addCount&quot;&gt;+1&lt;/button&gt;</span></span>
<span class="line"><span>    &lt;/div&gt;</span></span>
<span class="line"><span>&lt;/template&gt;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>&lt;script lang=&#39;ts&#39; setup&gt;</span></span>
<span class="line"><span>import { ref } from &quot;vue&quot;</span></span>
<span class="line"><span>const count = ref(1)</span></span>
<span class="line"><span>const addCount = () =&gt; {</span></span>
<span class="line"><span>    count.value++</span></span>
<span class="line"><span>}</span></span>
<span class="line"><span>&lt;/script&gt;</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br></div></div><h2 id="toref" tabindex="-1"><strong>toRef</strong> <a class="header-anchor" href="#toref" aria-label="Permalink to &quot;**toRef**&quot;">​</a></h2><p>toRef 可以根据一个响应式对象中的一个属性,创建一个响应式的 ref。同时这个 ref 和原对象中的属性保持同步,改变原对象属性的值这个 ref 会跟着改变,反之改变这个 ref 的值原对象属性值也会改变,它接收两个参数,一个是响应式对应,另一个则是属性值,例如下面代码</p><div class="language- vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span>&lt;template&gt;</span></span>
<span class="line"><span>    &lt;div&gt;</span></span>
<span class="line"><span>        {{ count.a }}</span></span>
<span class="line"><span>        {{ a }}</span></span>
<span class="line"><span>        &lt;button @click=&quot;addCount&quot;&gt;+1&lt;/button&gt;</span></span>
<span class="line"><span>    &lt;/div&gt;</span></span>
<span class="line"><span>&lt;/template&gt;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>&lt;script lang=&#39;ts&#39; setup&gt;</span></span>
<span class="line"><span>import { ref, toRef } from &quot;vue&quot;</span></span>
<span class="line"><span>const count = ref({</span></span>
<span class="line"><span>    a: 1,</span></span>
<span class="line"><span>    b: 2</span></span>
<span class="line"><span>})</span></span>
<span class="line"><span>const a = toRef(count.value, &#39;a&#39;)</span></span>
<span class="line"><span>const addCount = () =&gt; {</span></span>
<span class="line"><span>    a.value++</span></span>
<span class="line"><span>}</span></span>
<span class="line"><span>&lt;/script&gt;</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br></div></div><p>点击按钮的时候修改了 a 的值,此时 count 中的 a 也会跟着修改,当然这里的 count 也可以用 reactive</p><p><img src="`+s+`" alt="medium-zoom">GIF.gif</p><h2 id="torefs" tabindex="-1"><strong>toRefs</strong> <a class="header-anchor" href="#torefs" aria-label="Permalink to &quot;**toRefs**&quot;">​</a></h2><p>toRefs 它可以将一个响应式对象转成普通对象,而这个普通对象的每个属性都是响应式的 ref</p><div class="language- vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span>&lt;template&gt;</span></span>
<span class="line"><span>    &lt;div&gt;</span></span>
<span class="line"><span>        {{ count.a }}</span></span>
<span class="line"><span>        {{ countAsRefs.a }}</span></span>
<span class="line"><span>        &lt;button @click=&quot;addCount&quot;&gt;+1&lt;/button&gt;</span></span>
<span class="line"><span>    &lt;/div&gt;</span></span>
<span class="line"><span>&lt;/template&gt;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>&lt;script lang=&#39;ts&#39; setup&gt;</span></span>
<span class="line"><span>import { reactive, toRefs } from &quot;vue&quot;</span></span>
<span class="line"><span>const count = reactive({</span></span>
<span class="line"><span>    a: 1,</span></span>
<span class="line"><span>    b: 2</span></span>
<span class="line"><span>})</span></span>
<span class="line"><span>const countAsRefs = toRefs(count)</span></span>
<span class="line"><span>const addCount = () =&gt; {</span></span>
<span class="line"><span>    countAsRefs.a.value++</span></span>
<span class="line"><span>}</span></span>
<span class="line"><span></span></span>
<span class="line"><span>&lt;/script&gt;</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br></div></div><p>此时代码中的<code>countAsRefs</code>类型为</p><div class="language- vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span>{</span></span>
<span class="line"><span>  a: Ref&lt;number&gt;,</span></span>
<span class="line"><span>  b: Ref&lt;number&gt;</span></span>
<span class="line"><span>}</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br></div></div><p>它的属性 a 和 b 都是响应式的 ref 对象,同样的它们和原对象的 count 的属性也是保持同步的</p><p><img src="`+s+`" alt="medium-zoom">GIF.gif</p><p>根据它的特性我们通常用它来解构一个响应式对象而不会让其失去响应式</p><div class="language- vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span>import { reactive, toRefs } from &quot;vue&quot;;</span></span>
<span class="line"><span>const count = reactive({</span></span>
<span class="line"><span>  a: 1,</span></span>
<span class="line"><span>  b: 2,</span></span>
<span class="line"><span>});</span></span>
<span class="line"><span>const { a, b } = toRefs(count);</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br></div></div><p>此时的 a 和 b 都是一个响应式的 ref 对象,并和原对象的 a 和 b 属性保持同步</p><h2 id="isref" tabindex="-1"><strong>isRef()</strong> <a class="header-anchor" href="#isref" aria-label="Permalink to &quot;**isRef()**&quot;">​</a></h2><p>isRef 顾名思义它是用来判断某个值是否是 ref,注意:它判断不了这个值是不是 reactive(可以使用 isReactive 判断)</p><div class="language- vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span>import { reactive, isRef, ref } from &quot;vue&quot;;</span></span>
<span class="line"><span>const count = ref(1);</span></span>
<span class="line"><span>const testObj = reactive({</span></span>
<span class="line"><span>  a: 1,</span></span>
<span class="line"><span>});</span></span>
<span class="line"><span>console.log(isRef(count)); //true</span></span>
<span class="line"><span>console.log(isRef(testObj)); //false</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br></div></div><h2 id="unref" tabindex="-1"><strong>unref()</strong> <a class="header-anchor" href="#unref" aria-label="Permalink to &quot;**unref()**&quot;">​</a></h2><p>其实它是一个语法糖</p><div class="language- vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span>val = isRef(val) ? val.value : val;</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br></div></div><p>如果是 ref 则返回它的内部值,否则则返回它本身。通过这个语法糖我们可以看出它可以对响应式对象解除响应式引用,比如我们只想获取一个响应式的值,但不想要它的响应式可以使用它解除引用。 例如</p><div class="language- vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span>&lt;template&gt;</span></span>
<span class="line"><span>    &lt;div&gt;</span></span>
<span class="line"><span>        {{ unRefAsCount }}</span></span>
<span class="line"><span>        {{ count }}</span></span>
<span class="line"><span>        &lt;button @click=&quot;addCount&quot;&gt;+1&lt;/button&gt;</span></span>
<span class="line"><span>    &lt;/div&gt;</span></span>
<span class="line"><span>&lt;/template&gt;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>&lt;script lang=&#39;ts&#39; setup&gt;</span></span>
<span class="line"><span>import { unref, ref } from &quot;vue&quot;</span></span>
<span class="line"><span>const count = ref(1)</span></span>
<span class="line"><span>let unRefAsCount = unref(count)</span></span>
<span class="line"><span>const addCount = () =&gt; {</span></span>
<span class="line"><span>    count.value++</span></span>
<span class="line"><span>}</span></span>
<span class="line"><span>&lt;/script&gt;</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br></div></div><p>代码中的 unRefAsCount 是不具备响应式的</p><p><img src="`+i+`" alt="medium-zoom">GIF5.gif</p><h2 id="shallowref" tabindex="-1"><strong>shallowRef</strong> <a class="header-anchor" href="#shallowref" aria-label="Permalink to &quot;**shallowRef**&quot;">​</a></h2><p>通过翻译我们可以看出它是浅层的 ref,什么是浅层的 ref 呢? 与 ref 不同的是只有.value 是响应式的,再深层的属性则不具备响应式</p><div class="language- vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span>&lt;template&gt;</span></span>
<span class="line"><span>    &lt;div&gt;</span></span>
<span class="line"><span>        {{ shallowObj.a }}</span></span>
<span class="line"><span>        &lt;button @click=&quot;addCount&quot;&gt; +1&lt;/button&gt;</span></span>
<span class="line"><span>    &lt;/div&gt;</span></span>
<span class="line"><span>&lt;/template&gt;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>&lt;script lang=&#39;ts&#39; setup&gt;</span></span>
<span class="line"><span>import { shallowRef } from &quot;vue&quot;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>const shallowObj = shallowRef({</span></span>
<span class="line"><span>    a: 1</span></span>
<span class="line"><span>})</span></span>
<span class="line"><span>const addCount = () =&gt; {</span></span>
<span class="line"><span>    //不会触发页面更新</span></span>
<span class="line"><span>    shallowObj.value.a++</span></span>
<span class="line"><span>}</span></span>
<span class="line"><span>&lt;/script&gt;</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br></div></div><p><img src="`+r+`" alt="medium-zoom">GIF6.gif</p><p>但是如果我们将 addCount 改为修改整个.value 就会触发响应式了</p><div class="language- vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span>const addCount = () =&gt; {</span></span>
<span class="line"><span>  let temp = shallowObj.value.a;</span></span>
<span class="line"><span>  temp++;</span></span>
<span class="line"><span>  shallowObj.value = {</span></span>
<span class="line"><span>    a: temp,</span></span>
<span class="line"><span>  };</span></span>
<span class="line"><span>};</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br></div></div><p><img src="`+n+`" alt="medium-zoom">GIF7.gif</p><h2 id="triggerref" tabindex="-1"><strong>triggerRef</strong> <a class="header-anchor" href="#triggerref" aria-label="Permalink to &quot;**triggerRef**&quot;">​</a></h2><p>它可以让浅层的 ref 即 shallowRef 深层属性发生改变的时候强制触发更改,比如上面触发不了响应式的代码示例加入<code>triggerRef</code>后</p><div class="language- vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span>&lt;template&gt;</span></span>
<span class="line"><span>    &lt;div&gt;</span></span>
<span class="line"><span>        {{ shallowObj.a }}</span></span>
<span class="line"><span>        &lt;button @click=&quot;addCount&quot;&gt; +1&lt;/button&gt;</span></span>
<span class="line"><span>    &lt;/div&gt;</span></span>
<span class="line"><span>&lt;/template&gt;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>&lt;script lang=&#39;ts&#39; setup&gt;</span></span>
<span class="line"><span>import { shallowRef, triggerRef } from &quot;vue&quot;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>const shallowObj = shallowRef({</span></span>
<span class="line"><span>    a: 1</span></span>
<span class="line"><span>})</span></span>
<span class="line"><span></span></span>
<span class="line"><span>const addCount = () =&gt; {</span></span>
<span class="line"><span>    shallowObj.value.a++</span></span>
<span class="line"><span>    //加入triggerRef强制触发更改</span></span>
<span class="line"><span>    triggerRef(shallowObj)</span></span>
<span class="line"><span>}</span></span>
<span class="line"><span>&lt;/script&gt;</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br></div></div><p>此时再看页面效果则触发了响应式</p><p><img src="`+n+`" alt="medium-zoom">GIF7.gif</p><h2 id="customref" tabindex="-1"><strong>customRef</strong> <a class="header-anchor" href="#customref" aria-label="Permalink to &quot;**customRef**&quot;">​</a></h2><p>顾名思义它是自定义的 ref,我们可以通过 customRef 来显式的追踪某个值的响应式变化,它接收一个函数,这个函数接受 track 和 trigger 两个函数作为参数，并返回一个带有 get 和 set 方法的对象。比如下面封装一个自定义的响应式对象 myRef,同时控制它只有值小于 4 才会触发响应式</p><div class="language- vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span>&lt;template&gt;</span></span>
<span class="line"><span>    &lt;div&gt;</span></span>
<span class="line"><span>        {{ count }}</span></span>
<span class="line"><span>        &lt;button @click=&quot;addCount&quot;&gt; +1&lt;/button&gt;</span></span>
<span class="line"><span>    &lt;/div&gt;</span></span>
<span class="line"><span>&lt;/template&gt;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>&lt;script lang=&#39;ts&#39; setup&gt;</span></span>
<span class="line"><span>import { customRef } from &quot;vue&quot;</span></span>
<span class="line"><span>const myRef = (value: number) =&gt; {</span></span>
<span class="line"><span>    const customValue = customRef((track, trigger) =&gt; {</span></span>
<span class="line"><span>        return {</span></span>
<span class="line"><span>            get() {</span></span>
<span class="line"><span>                //通知vue需要追踪后续内容的变化,这里可以自由控制</span></span>
<span class="line"><span>                track()</span></span>
<span class="line"><span>                return value</span></span>
<span class="line"><span>            },</span></span>
<span class="line"><span>            set(newValue) {</span></span>
<span class="line"><span>                console.log(newValue);//myRef.value=xxx的xxx值</span></span>
<span class="line"><span>                //加trigger则触发响应式,通知vue更新页面,这里可以自由控制是否加trigger</span></span>
<span class="line"><span>                if(value&lt;4)  trigger()</span></span>
<span class="line"><span>                value = newValue</span></span>
<span class="line"><span>            }</span></span>
<span class="line"><span>        }</span></span>
<span class="line"><span>    })</span></span>
<span class="line"><span>    return customValue</span></span>
<span class="line"><span>}</span></span>
<span class="line"><span></span></span>
<span class="line"><span>const count = myRef(0)</span></span>
<span class="line"><span>const addCount = () =&gt; {</span></span>
<span class="line"><span>    count.value++</span></span>
<span class="line"><span>}</span></span>
<span class="line"><span>&lt;/script&gt;</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br><span class="line-number">22</span><br><span class="line-number">23</span><br><span class="line-number">24</span><br><span class="line-number">25</span><br><span class="line-number">26</span><br><span class="line-number">27</span><br><span class="line-number">28</span><br><span class="line-number">29</span><br><span class="line-number">30</span><br><span class="line-number">31</span><br><span class="line-number">32</span><br><span class="line-number">33</span><br></div></div><p><img src="`+t+'" alt="medium-zoom">GIF7.gif</p><p>可以看到当 count 大于 4 的时候便失去了响应式</p><h2 id="总结" tabindex="-1"><strong>总结</strong> <a class="header-anchor" href="#总结" aria-label="Permalink to &quot;**总结**&quot;">​</a></h2><p>本篇文章详细介绍了 Vue3 中各种 ref 的用法,其中包括</p><ul><li>ref(): 接收一个值并返回一个响应式的对象，可以使用.value 属性来访问和修改这个值。</li><li>toRef(obj, key): 根据一个响应式对象中的一个属性，创建一个响应式的 ref，并且该 ref 和原对象中的属性保持同步。 -toRefs(obj): 将一个响应式对象转换成一个普通对象，其中普通对象的每个属性都是响应式的 ref。</li><li>isRef(value): 判断某个值是否是 ref 对象。</li><li>unref(value): 用于解除响应式引用</li><li>shallowRef(value): 创建一个浅层的 ref，只有 value 属性是响应式的，深层的属性不具备响应式。</li><li>triggerRef(ref): 强制浅层的 ref 发生改变时触发响应式。</li><li>customRef(factory): 自定义 ref 对象，可以显式地追踪某个值的响应式变化。</li></ul>',50),b=[u];function o(m,d,g,f,h,v){return e(),p("div",null,b)}const q=a(c,[["render",o]]);export{k as __pageData,q as default};
