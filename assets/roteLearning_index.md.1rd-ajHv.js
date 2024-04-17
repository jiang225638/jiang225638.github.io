import{_ as a,c as s,o as n,a5 as e,aD as l}from"./chunks/framework.aodRBjHw.js";const v=JSON.parse('{"title":"面经，考Vue考的比较多~","description":"","frontmatter":{},"headers":[],"relativePath":"roteLearning/index.md","filePath":"roteLearning/index.md","lastUpdated":1713341353000}'),p={name:"roteLearning/index.md"},i=e('<ul><li><h1 id="面经-考vue考的比较多" tabindex="-1">面经，考Vue考的比较多~ <a class="header-anchor" href="#面经-考vue考的比较多" aria-label="Permalink to &quot;面经，考Vue考的比较多~&quot;">​</a></h1><p><img src="'+l+`" alt="img"></p><h2 id="面经" tabindex="-1">面经 <a class="header-anchor" href="#面经" aria-label="Permalink to &quot;面经&quot;">​</a></h2><h3 id="_1、怎么理解vue单向数据流" tabindex="-1">1、怎么理解Vue单向数据流？ <a class="header-anchor" href="#_1、怎么理解vue单向数据流" aria-label="Permalink to &quot;1、怎么理解Vue单向数据流？&quot;">​</a></h3><p>父组件传输局<code>props</code>给子组件时，子组件只能使用而不能修改，这是为了组件之间能更高地去解耦。比如有一个父组件，传<code>props</code>给10个子组件，如果某一个子组件修改了，那么会影响其他9个子组件跟着刷新，所以不推荐子组件修改<code>props</code></p><h3 id="_2、vue-组件之间的通信方式都有哪些-用过-eventbus-么-eventbus-的思想是什么" tabindex="-1">2、Vue 组件之间的通信方式都有哪些，用过 eventbus 么，eventbus 的思想是什么 <a class="header-anchor" href="#_2、vue-组件之间的通信方式都有哪些-用过-eventbus-么-eventbus-的思想是什么" aria-label="Permalink to &quot;2、Vue 组件之间的通信方式都有哪些，用过 eventbus 么，eventbus 的思想是什么&quot;">​</a></h3><ul><li>父组件传值给子组件数据<code>props</code></li><li>子组件传值给父组件，通过<code>$emit</code>事件对父组件进行传值</li><li>父组件和子组件通过<code>$parent</code>和<code>$children</code>进行获取实例数据</li><li>二次封装时经常使用<code>$attrs</code>和<code>$listener</code>进行传值</li><li>使用<code>$refs</code>获取组件实例，进而获取数据</li><li>使用<code>Vuex</code>进行状态管理</li><li>使用<code>eventBus</code>进行跨组件传值，进而传递数据(发布订阅模式)</li><li>使用<code>provide</code>和<code>inject</code>，官方不建议</li><li>浏览器本地缓存，例如<code>localStorage</code></li><li>路由传值</li></ul><h3 id="_3、写个自定义-v-model" tabindex="-1">3、写个自定义 v-model？ <a class="header-anchor" href="#_3、写个自定义-v-model" aria-label="Permalink to &quot;3、写个自定义 v-model？&quot;">​</a></h3><p><code>v-model</code>实际是<code>:value + @input</code>的语法糖</p><div class="language- vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span>&lt;input v-model=&quot;inputValue&quot; /&gt;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>&lt;input </span></span>
<span class="line"><span>:value=&quot;inputValue&quot; </span></span>
<span class="line"><span>@input=&quot;inputValue = $event.target.value&quot; </span></span>
<span class="line"><span>/&gt;</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br></div></div><h3 id="_4、-attrs-和-listener-有了解吗" tabindex="-1">4、<code>$attrs</code> 和 <code>$listener</code> 有了解吗？ <a class="header-anchor" href="#_4、-attrs-和-listener-有了解吗" aria-label="Permalink to &quot;4、\`$attrs\` 和 \`$listener\` 有了解吗？&quot;">​</a></h3><p>常用于对组件进行二次封装时，比如<code>A -&gt; B -&gt; C</code>，B可以直接将爷爷组件的所有数据或者事件直接传给孙子</p><h3 id="_5、vue-生命周期有哪些-都是做什么的-updated-什么情况下会触发-beforecreate-的时候能拿到-vue-实例么-组件销毁的时候调用的是哪个-api" tabindex="-1">5、Vue 生命周期有哪些，都是做什么的，updated 什么情况下会触发，beforeCreate 的时候能拿到 Vue 实例么，组件销毁的时候调用的是哪个 API <a class="header-anchor" href="#_5、vue-生命周期有哪些-都是做什么的-updated-什么情况下会触发-beforecreate-的时候能拿到-vue-实例么-组件销毁的时候调用的是哪个-api" aria-label="Permalink to &quot;5、Vue 生命周期有哪些，都是做什么的，updated 什么情况下会触发，beforeCreate 的时候能拿到 Vue 实例么，组件销毁的时候调用的是哪个 API&quot;">​</a></h3><p>生命周期：</p><ul><li><code>beforeVCreated</code>：实例了Vue但是还没有进行数据初始化与响应式处理</li><li><code>created</code>：数据已经被初始化和响应式处理，这里可以访问和修改数据</li><li><code>beforeMount</code>：render函数在这里调用，生成虚拟DOM，但是还没转真实DOM并替代到el</li><li><code>mounted</code>：真实DOM挂载完毕</li><li><code>beforeUpdated</code>：数据更新后，新的虚拟DOM生成，但还没更旧虚拟DOM对比打补丁</li><li><code>update</code>：新旧虚拟DOM对比打补丁后，进行真实DOM的更新</li><li><code>activated</code>：被keep-alive缓存的组件被激活时调用</li><li><code>deactivated</code>：被keep-alive缓存的组件停用时调用</li><li><code>beforeDestroy</code>：实例销毁之前调用，在这一步，依然可以访问数据</li><li><code>destroyed</code>：实例销毁后调用。Vue实例的所有指令都被解绑，实例的监听器被移除，所有子实例也都被销毁</li><li><code>errorCaptured</code>：捕获子孙组件的错误时被调用。此钩子会收到三个参数：错误对象、发生错误的组件实例以及一个包含错误来源信息的字符串。此钩子可以返回false以阻止该错误继续向上传播。</li></ul><h3 id="_6、什么情况下会触发组件销毁-销毁的时候会卸载自定义事件和原生事件么" tabindex="-1">6、什么情况下会触发组件销毁，销毁的时候会卸载自定义事件和原生事件么？ <a class="header-anchor" href="#_6、什么情况下会触发组件销毁-销毁的时候会卸载自定义事件和原生事件么" aria-label="Permalink to &quot;6、什么情况下会触发组件销毁，销毁的时候会卸载自定义事件和原生事件么？&quot;">​</a></h3><p>组件销毁时会自动卸载组件本身绑定的事件，但是仅限于组件本身。例如一些<code>定时器、全局对象的事件绑定、eventBus</code>则不会自动解绑，需要手动解绑。</p><h3 id="_7、自定义指令写过么-自定义指令都有哪些钩子" tabindex="-1">7、自定义指令写过么，自定义指令都有哪些钩子？ <a class="header-anchor" href="#_7、自定义指令写过么-自定义指令都有哪些钩子" aria-label="Permalink to &quot;7、自定义指令写过么，自定义指令都有哪些钩子？&quot;">​</a></h3><h4 id="vue2" tabindex="-1">Vue2 <a class="header-anchor" href="#vue2" aria-label="Permalink to &quot;Vue2&quot;">​</a></h4><ul><li><code>bind</code>：指令绑定到指定元素时触发，只触发一次</li><li><code>inserted</code>：指定元素插入到DOM时触发，只触发一次</li><li><code>update</code>：VNode更新时触发，会触发多次</li><li><code>unbind</code>：指令解绑时触发，只触发一次</li></ul><h4 id="vue3" tabindex="-1">Vue3 <a class="header-anchor" href="#vue3" aria-label="Permalink to &quot;Vue3&quot;">​</a></h4><ul><li><code>created</code>：指定元素的attribute或事件监听器被应用之前被调用</li><li><code>beforeMount</code>：指令绑定到指定元素上触发</li><li><code>mounted</code>：指定元素被挂载时触发</li><li><code>beforeUpdate</code>：在更新包含组件的VNode之前触发</li><li><code>updated</code>：在包含组件的VNode及其VNode更新后调用</li><li><code>beforeUnMount</code>：在卸载指定元素的父组件之前触发</li><li><code>unmounted</code>：指令解绑时触发</li></ul><h3 id="_8、传统前端开发和框架开发的区别是什么" tabindex="-1">8、传统前端开发和框架开发的区别是什么？ <a class="header-anchor" href="#_8、传统前端开发和框架开发的区别是什么" aria-label="Permalink to &quot;8、传统前端开发和框架开发的区别是什么？&quot;">​</a></h3><p>传统的前端开发就像是盖房子时需要自己从零开始，用了框架开发就相当于有人事先给你搭好架子，你只需要添砖加瓦就行了。框架有他自己的一套开发模式和开发流程，只要跟着他的流程走，并利用好其开发模式，做起事来会事半功倍，这也是为什么现在的前端越来越趋于框架开发的原因，毕竟时间就是金钱，节省时间很重要。</p><h3 id="_9、vue2-的数据响应式有两个缺陷-你知道是哪两个缺陷么-为什么会有这样的缺陷-如何解决" tabindex="-1">9、Vue2 的数据响应式有两个缺陷，你知道是哪两个缺陷么，为什么会有这样的缺陷，如何解决？ <a class="header-anchor" href="#_9、vue2-的数据响应式有两个缺陷-你知道是哪两个缺陷么-为什么会有这样的缺陷-如何解决" aria-label="Permalink to &quot;9、Vue2 的数据响应式有两个缺陷，你知道是哪两个缺陷么，为什么会有这样的缺陷，如何解决？&quot;">​</a></h3><ul><li>1、对象新增属性或修改新增的属性时，无法触发视图更新，需要使用<code> Vue.set</code>，对象删除属性时需要使用<code>Vue.delete</code>才能触发更新</li><li>2、数组直接通过下标修改元素无法触发视图更新，需要使用数组的方法<code>splice、push</code>等等</li></ul><h3 id="_10、vue-如何实现的数组的监听-为什么-vue-没有对数组下标修改做劫持" tabindex="-1">10、Vue 如何实现的数组的监听，为什么 Vue 没有对数组下标修改做劫持？ <a class="header-anchor" href="#_10、vue-如何实现的数组的监听-为什么-vue-没有对数组下标修改做劫持" aria-label="Permalink to &quot;10、Vue 如何实现的数组的监听，为什么 Vue 没有对数组下标修改做劫持？&quot;">​</a></h3><p>Vue2是通过重写了数组原型上的方法来达到对数组的修改的监听，Vue2没有对数组下标做劫持，是出于心梗的考虑，因为通常数组元素都是非常多的，可能成百上千，如果每个元素都进行劫持，则非常耗费性能。</p><h3 id="_11、symbol-有了解吗-迭代器有了解吗-哪些是可迭代的" tabindex="-1">11、Symbol 有了解吗，迭代器有了解吗，哪些是可迭代的？ <a class="header-anchor" href="#_11、symbol-有了解吗-迭代器有了解吗-哪些是可迭代的" aria-label="Permalink to &quot;11、Symbol 有了解吗，迭代器有了解吗，哪些是可迭代的？&quot;">​</a></h3><h4 id="symbol" tabindex="-1">Symbol <a class="header-anchor" href="#symbol" aria-label="Permalink to &quot;Symbol&quot;">​</a></h4><p>是ES6的特性，具体使用场景有：</p><ul><li>充当对象的属性名，实现私有属性</li><li>充当变量，实现单独变量</li><li>用来定义类里的私有属性</li></ul><h4 id="迭代" tabindex="-1">迭代 <a class="header-anchor" href="#迭代" aria-label="Permalink to &quot;迭代&quot;">​</a></h4><p>迭代器：<code>Iterator</code>，可迭代对象有<code>Array、Set、Map</code>，想将<code>不可迭代对象</code>变成<code>可迭代对象</code>，可以设置<code>Symbol.iterator</code>属性</p><div class="language- vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span>const t = {</span></span>
<span class="line"><span>  name: &#39;林三心&#39;,</span></span>
<span class="line"><span>  age: 12</span></span>
<span class="line"><span>}</span></span>
<span class="line"><span></span></span>
<span class="line"><span>t[Symbol.iterator] = function () {</span></span>
<span class="line"><span>  let index = 0,</span></span>
<span class="line"><span>    self = this,</span></span>
<span class="line"><span>    keys = Object.keys(this)</span></span>
<span class="line"><span></span></span>
<span class="line"><span>  return {</span></span>
<span class="line"><span>    next() {</span></span>
<span class="line"><span>      if (index &lt; keys.length) {</span></span>
<span class="line"><span>        return {</span></span>
<span class="line"><span>          value: self[keys[index++]],</span></span>
<span class="line"><span>          done: false</span></span>
<span class="line"><span>        }</span></span>
<span class="line"><span>      } else {</span></span>
<span class="line"><span>        return {</span></span>
<span class="line"><span>          value: undefined,</span></span>
<span class="line"><span>          done: true</span></span>
<span class="line"><span>        }</span></span>
<span class="line"><span>      }</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span>  }</span></span>
<span class="line"><span>}</span></span>
<span class="line"><span>for (let value of t) {</span></span>
<span class="line"><span>  console.log(value)</span></span>
<span class="line"><span>}</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br><span class="line-number">22</span><br><span class="line-number">23</span><br><span class="line-number">24</span><br><span class="line-number">25</span><br><span class="line-number">26</span><br><span class="line-number">27</span><br><span class="line-number">28</span><br><span class="line-number">29</span><br></div></div><h4 id="迭代器和迭代对象" tabindex="-1">迭代器和迭代对象 <a class="header-anchor" href="#迭代器和迭代对象" aria-label="Permalink to &quot;迭代器和迭代对象&quot;">​</a></h4><h3 id="_12、用set获取两个数组的交集-如何做" tabindex="-1">12、用Set获取两个数组的交集，如何做？ <a class="header-anchor" href="#_12、用set获取两个数组的交集-如何做" aria-label="Permalink to &quot;12、用Set获取两个数组的交集，如何做？&quot;">​</a></h3><h4 id="合集" tabindex="-1">合集 <a class="header-anchor" href="#合集" aria-label="Permalink to &quot;合集&quot;">​</a></h4><div class="language- vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span>const heji = (arr1, arr2) =&gt; {</span></span>
<span class="line"><span>  return [...new Set(arr1.concat(arr2))]</span></span>
<span class="line"><span>}</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br></div></div><h4 id="交集" tabindex="-1">交集 <a class="header-anchor" href="#交集" aria-label="Permalink to &quot;交集&quot;">​</a></h4><div class="language- vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span>const jiaoji = (arr1, arr2) =&gt; {</span></span>
<span class="line"><span>  const temp = new Set(arr1)</span></span>
<span class="line"><span>  return Array.from(new Set(arr2)).filter(item =&gt; {</span></span>
<span class="line"><span>    return temp.has(item)</span></span>
<span class="line"><span>  })</span></span>
<span class="line"><span>}</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br></div></div><h4 id="差集" tabindex="-1">差集 <a class="header-anchor" href="#差集" aria-label="Permalink to &quot;差集&quot;">​</a></h4><div class="language- vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span>const chaji = (arr1, arr2) =&gt; {</span></span>
<span class="line"><span>  const temp1 = new Set(arr1)</span></span>
<span class="line"><span>  const temp2 = new Set(arr2)</span></span>
<span class="line"><span>  const res = []</span></span>
<span class="line"><span>  for (let item of temp1) {</span></span>
<span class="line"><span>    !temp2.has(item) &amp;&amp; res.push(item)</span></span>
<span class="line"><span>  }</span></span>
<span class="line"><span>  return res</span></span>
<span class="line"><span>}</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br></div></div><h3 id="_13、实现-promise-all" tabindex="-1">13、实现 Promise.all？ <a class="header-anchor" href="#_13、实现-promise-all" aria-label="Permalink to &quot;13、实现 Promise.all？&quot;">​</a></h3><div class="language- vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span>Promise.sx_all = (promises) =&gt; {</span></span>
<span class="line"><span>    return new Promise((resolve, reject) =&gt; {</span></span>
<span class="line"><span>        const result = []</span></span>
<span class="line"><span>        let count = 0</span></span>
<span class="line"><span>        for (let i = 0; i &lt; promises.length; i++) {</span></span>
<span class="line"><span>            const promise = Promise.resolve(promises[i])</span></span>
<span class="line"><span>            promise.then(res =&gt; {</span></span>
<span class="line"><span>                result[i] = res</span></span>
<span class="line"><span>                count++</span></span>
<span class="line"><span>                if (count === promises.length) {</span></span>
<span class="line"><span>                    resolve(result)</span></span>
<span class="line"><span>                }</span></span>
<span class="line"><span>            }).catch(err =&gt; {</span></span>
<span class="line"><span>                reject(err)</span></span>
<span class="line"><span>            })</span></span>
<span class="line"><span>        }</span></span>
<span class="line"><span>    })</span></span>
<span class="line"><span>}</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br></div></div><h3 id="_14、animation-和-transition-的区别" tabindex="-1">14、animation 和 transition 的区别？ <a class="header-anchor" href="#_14、animation-和-transition-的区别" aria-label="Permalink to &quot;14、animation 和 transition 的区别？&quot;">​</a></h3><ul><li><code>animation</code>需配合<code>@keyframe</code>，而<code>transition</code>不需要</li><li><code>animation</code>可以出发多次，<code>transition</code>只能触发一次</li><li><code>animation</code>可以设置多个帧，而<code>transition</code>只有两帧</li><li>前者可能会引起多次重回回流，后者会比较少</li></ul><h3 id="_15、写个动画-一个盒子-开始时缩放是-0-50-时是-1-100-时是-0-开始结束都是慢速-持续-2-秒-延迟-2-秒-结束后固定在结束的效果" tabindex="-1">15、写个动画，一个盒子，开始时缩放是 0，50%时是 1，100%时是 0，开始结束都是慢速，持续 2 秒，延迟 2 秒，结束后固定在结束的效果 <a class="header-anchor" href="#_15、写个动画-一个盒子-开始时缩放是-0-50-时是-1-100-时是-0-开始结束都是慢速-持续-2-秒-延迟-2-秒-结束后固定在结束的效果" aria-label="Permalink to &quot;15、写个动画，一个盒子，开始时缩放是 0，50%时是 1，100%时是 0，开始结束都是慢速，持续 2 秒，延迟 2 秒，结束后固定在结束的效果&quot;">​</a></h3><div class="language- vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span>.box {</span></span>
<span class="line"><span>    width: 100px;</span></span>
<span class="line"><span>    height: 100px;</span></span>
<span class="line"><span>    background-color: pink;</span></span>
<span class="line"><span>    animation: scale 2s 9999999 alternate;</span></span>
<span class="line"><span>  }</span></span>
<span class="line"><span>  @keyframes scale {</span></span>
<span class="line"><span>    from { transform: scale(0); }</span></span>
<span class="line"><span>    to { transform: scale(1); }</span></span>
<span class="line"><span>  }</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br></div></div></li></ul>`,1),r=[i];function c(t,o,d,u,b,m){return n(),s("div",null,r)}const g=a(p,[["render",c]]);export{v as __pageData,g as default};
