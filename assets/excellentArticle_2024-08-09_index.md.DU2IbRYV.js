import{_ as s,c as n,o as a,a5 as p}from"./chunks/framework.BXMMEvbx.js";const g=JSON.parse('{"title":"Vue3 组件封装的一些技巧和心得","description":"","frontmatter":{},"headers":[],"relativePath":"excellentArticle/2024-08-09/index.md","filePath":"excellentArticle/2024-08-09/index.md","lastUpdated":1723191367000}'),e={name:"excellentArticle/2024-08-09/index.md"},l=p(`<h1 id="vue3-组件封装的一些技巧和心得" tabindex="-1">Vue3 组件封装的一些技巧和心得 <a class="header-anchor" href="#vue3-组件封装的一些技巧和心得" aria-label="Permalink to &quot;Vue3 组件封装的一些技巧和心得&quot;">​</a></h1><h2 id="_1-组件特性" tabindex="-1"><strong>1. 组件特性</strong> <a class="header-anchor" href="#_1-组件特性" aria-label="Permalink to &quot;**1. 组件特性**&quot;">​</a></h2><p>在<code>Vue</code>中组件是一个独立的实例，每个组件都有共通点，就是：<code>属性</code>、<code>插槽</code>、<code>事件</code>、<code>方法</code>；</p><p>在日常我们使用第三方组件库的时候，组件库的文档都会说明上面四个特性，而组件封装就是围绕这四个特性进行的；</p><h2 id="_2-组件封装" tabindex="-1"><strong>2. 组件封装</strong> <a class="header-anchor" href="#_2-组件封装" aria-label="Permalink to &quot;**2. 组件封装**&quot;">​</a></h2><h3 id="_2-1-组件继承" tabindex="-1"><strong>2.1 组件继承</strong> <a class="header-anchor" href="#_2-1-组件继承" aria-label="Permalink to &quot;**2.1 组件继承**&quot;">​</a></h3><p>很多情况下，我们会在一个组件的基础上进行扩展，这个时候就需要用到组件继承；</p><p>在<code>Vue2</code>的时候，我们可以使用<code>extends</code>关键字进行组件继承，但是在<code>Vue3</code>中，<code>extends</code>关键字已经被废弃了；</p><p>在<code>Vue3</code>中，如果想要实现组件继承其实很简单，要明白一个组件其实就是一个<code>js</code>对象，我们可以直接将一个组件对象合并，然后注册成一个新的组件；</p><div class="language- vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>import { createApp } from &quot;vue&quot;;</span></span>
<span class="line"><span>import App from &quot;./App.vue&quot;;</span></span>
<span class="line"><span>import ElementPlus, { ElInput } from &quot;element-plus&quot;;</span></span>
<span class="line"><span>import &quot;element-plus/dist/index.css&quot;;</span></span>
<span class="line"><span>import { merge } from &quot;lodash&quot;;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>const app = createApp(App);</span></span>
<span class="line"><span>app.use(ElementPlus);</span></span>
<span class="line"><span></span></span>
<span class="line"><span>// 组件继承，将ElInput组件的placeholder属性默认值改为&quot;请输入&quot;</span></span>
<span class="line"><span>app.component(</span></span>
<span class="line"><span>  &quot;ElInput&quot;,</span></span>
<span class="line"><span>  merge(ElInput, {</span></span>
<span class="line"><span>    props: {</span></span>
<span class="line"><span>      placeholder: {</span></span>
<span class="line"><span>        default: &quot;请输入&quot;</span></span>
<span class="line"><span>      }</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span>  })</span></span>
<span class="line"><span>);</span></span>
<span class="line"><span></span></span>
<span class="line"><span>app.mount(&quot;#app&quot;);</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br><span class="line-number">22</span><br></div></div><p>这里直接使用了<code>lodash</code>的<code>merge</code>方法，将<code>ElInput</code>组件的<code>props</code>属性进行了合并，然后覆盖注册成了一个新的组件；</p><p>因为有很多小伙伴遇到一个问题就是需要固定<code>ElTable</code>组件的一些属性，比如<code>border</code>、<code>stripe</code>、<code>size</code>等，这个时候用这种方法就非常方便；</p><h3 id="_2-2-组件插槽" tabindex="-1"><strong>2.2 组件插槽</strong> <a class="header-anchor" href="#_2-2-组件插槽" aria-label="Permalink to &quot;**2.2 组件插槽**&quot;">​</a></h3><p>上面的组件继承只是简单的改变了组件的默认属性，但是如果我们想要改变组件的结构，就需要用到组件插槽；</p><p>通常情况下我们要拆分组件的业务，然后封装成业务组件，这个时候可能会使用到多个组件；</p><p>这个时候组件里面有很多组件，需要替换组件里面的组件里面的插槽，这个时候就需要透传插槽；</p><div class="language- vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>&lt;!--  透传插槽  --&gt;</span></span>
<span class="line"><span>&lt;template&gt;</span></span>
<span class="line"><span>  &lt;div&gt;</span></span>
<span class="line"><span>    区域A这里有一个组件，这个组件需要替换插槽</span></span>
<span class="line"><span>    &lt;el-tree :data=&quot;treeData&quot;&gt;</span></span>
<span class="line"><span>      &lt;template v-if=&quot;$slots.tree&quot; #default=&quot;{ node, data }&quot;&gt;</span></span>
<span class="line"><span>        &lt;slot name=&quot;tree&quot; :node=&quot;node&quot; :data=&quot;data&quot; /&gt;</span></span>
<span class="line"><span>      &lt;/template&gt;</span></span>
<span class="line"><span>    &lt;/el-tree&gt;</span></span>
<span class="line"><span>  &lt;/div&gt;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>  &lt;div&gt;</span></span>
<span class="line"><span>    区域B这里有一个组件，这个组件需要替换插槽</span></span>
<span class="line"><span>    &lt;el-table :data=&quot;tableData&quot;&gt;</span></span>
<span class="line"><span>      &lt;template v-if=&quot;$slots.default&quot;&gt;</span></span>
<span class="line"><span>        &lt;slot /&gt;</span></span>
<span class="line"><span>      &lt;/template&gt;</span></span>
<span class="line"><span>    &lt;/el-table&gt;</span></span>
<span class="line"><span>  &lt;/div&gt;</span></span>
<span class="line"><span>&lt;/template&gt;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>&lt;script&gt;</span></span>
<span class="line"><span>export default {</span></span>
<span class="line"><span>  data() {</span></span>
<span class="line"><span>    return {</span></span>
<span class="line"><span>      treeData: new Array(10)</span></span>
<span class="line"><span>          .fill(0)</span></span>
<span class="line"><span>          .map((_, index) =&gt; ({ label: &quot;label&quot; + index })),</span></span>
<span class="line"><span>      tableData: [],</span></span>
<span class="line"><span>    };</span></span>
<span class="line"><span>  },</span></span>
<span class="line"><span>};</span></span>
<span class="line"><span>&lt;/script&gt;</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br><span class="line-number">22</span><br><span class="line-number">23</span><br><span class="line-number">24</span><br><span class="line-number">25</span><br><span class="line-number">26</span><br><span class="line-number">27</span><br><span class="line-number">28</span><br><span class="line-number">29</span><br><span class="line-number">30</span><br><span class="line-number">31</span><br><span class="line-number">32</span><br><span class="line-number">33</span><br></div></div><p>通过使用<code>$slots</code>可以获取到组件的插槽，然后通过<code>v-if</code>判断是否有插槽，如果有插槽就进行透传；</p><p>除了这种方式之外，还可以使用<code>jsx</code>语法，这种方式更加灵活；</p><div class="language- vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>&lt;script lang=&quot;jsx&quot;&gt;</span></span>
<span class="line"><span>export default {</span></span>
<span class="line"><span>  render() {</span></span>
<span class="line"><span>    const areaA = (</span></span>
<span class="line"><span>        &lt;div&gt;</span></span>
<span class="line"><span>          区域A这里有一个组件，这个组件需要替换插槽</span></span>
<span class="line"><span>          &lt;el-tree data={treeData}&gt;</span></span>
<span class="line"><span>            {{</span></span>
<span class="line"><span>              default: this.$slots.tree</span></span>
<span class="line"><span>            }}</span></span>
<span class="line"><span>          &lt;/el-tree&gt;</span></span>
<span class="line"><span>        &lt;/div&gt;</span></span>
<span class="line"><span>    );</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    const areaB = (</span></span>
<span class="line"><span>        &lt;div&gt;</span></span>
<span class="line"><span>          区域B这里有一个组件，这个组件需要替换插槽</span></span>
<span class="line"><span>          &lt;el-table data={tableData}&gt;</span></span>
<span class="line"><span>            {{</span></span>
<span class="line"><span>              default: this.$slots.default</span></span>
<span class="line"><span>            }}</span></span>
<span class="line"><span>          &lt;/el-table&gt;</span></span>
<span class="line"><span>        &lt;/div&gt;</span></span>
<span class="line"><span>    );</span></span>
<span class="line"><span>    </span></span>
<span class="line"><span>    return (</span></span>
<span class="line"><span>        &lt;div&gt;</span></span>
<span class="line"><span>          {areaA}</span></span>
<span class="line"><span>          {areaB}</span></span>
<span class="line"><span>        &lt;/div&gt;</span></span>
<span class="line"><span>    );</span></span>
<span class="line"><span>  }</span></span>
<span class="line"><span>}</span></span>
<span class="line"><span>&lt;/script&gt;</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br><span class="line-number">22</span><br><span class="line-number">23</span><br><span class="line-number">24</span><br><span class="line-number">25</span><br><span class="line-number">26</span><br><span class="line-number">27</span><br><span class="line-number">28</span><br><span class="line-number">29</span><br><span class="line-number">30</span><br><span class="line-number">31</span><br><span class="line-number">32</span><br><span class="line-number">33</span><br><span class="line-number">34</span><br></div></div><blockquote><p>在<code>setup</code>语法中是没有<code>this</code>的，这个使用需要获取<code>$slots</code>的时候需要使用<code>useSlots</code>方法；</p></blockquote><h3 id="_2-3-组件事件和透传-attrs" tabindex="-1"><strong>2.3 组件事件和透传 attrs</strong> <a class="header-anchor" href="#_2-3-组件事件和透传-attrs" aria-label="Permalink to &quot;**2.3 组件事件和透传 attrs**&quot;">​</a></h3><p>在<code>Vue2</code>中，我们可以使用<code>$listeners</code>来获取组件的事件，然后进行透传；</p><p>而在<code>Vue3</code>中，<code>$listeners</code>已经被废弃了，<code>$listeners</code>和<code>$attrs</code>都被合并到了<code>$attrs</code>中；</p><div class="language- vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>&lt;!-- 组件 --&gt;</span></span>
<span class="line"><span>&lt;template&gt;</span></span>
<span class="line"><span>  &lt;div v-bind=&quot;$attrs&quot;&gt;&lt;/div&gt;</span></span>
<span class="line"><span>&lt;/template&gt;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>&lt;!-- 父组件 --&gt;</span></span>
<span class="line"><span>&lt;template&gt;</span></span>
<span class="line"><span>  &lt;div&gt;</span></span>
<span class="line"><span>    &lt;MyComponent </span></span>
<span class="line"><span>        class=&quot;my-class&quot;</span></span>
<span class="line"><span>        @click=&quot;handleClick&quot;</span></span>
<span class="line"><span>    /&gt;</span></span>
<span class="line"><span>  &lt;/div&gt;</span></span>
<span class="line"><span>&lt;/template&gt;</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br></div></div><p>在<code>Vue3</code>中，我们可以直接使用<code>$attrs</code>来获取组件的事件，然后进行透传；</p><p>例如上面的例子，我们可以直接在组件中使用<code>$attrs</code>来获取到<code>class</code>和<code>@click</code>事件，等同于下面的写法；</p><div class="language- vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>&lt;!-- 组件 --&gt;</span></span>
<span class="line"><span>&lt;template&gt;</span></span>
<span class="line"><span>  &lt;div class=&quot;my-class&quot; @click=&quot;handleClick&quot;&gt;&lt;/div&gt;</span></span>
<span class="line"><span>&lt;/template&gt;</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br></div></div><p>但是这里其实有一个小技巧，就是<code>Vue3</code>默认属性是可以透传的，例如上面的例子其实可以简化成下面的写法；</p><div class="language- vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>&lt;!-- 组件 --&gt;</span></span>
<span class="line"><span>&lt;template&gt;</span></span>
<span class="line"><span>  &lt;div&gt;&lt;/div&gt;</span></span>
<span class="line"><span>&lt;/template&gt;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>&lt;!-- 父组件 --&gt;</span></span>
<span class="line"><span>&lt;template&gt;</span></span>
<span class="line"><span>  &lt;div&gt;</span></span>
<span class="line"><span>    &lt;MyComponent </span></span>
<span class="line"><span>        class=&quot;my-class&quot;</span></span>
<span class="line"><span>        @click=&quot;handleClick&quot;</span></span>
<span class="line"><span>    /&gt;</span></span>
<span class="line"><span>  &lt;/div&gt;</span></span>
<span class="line"><span>&lt;/template&gt;</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br></div></div><p>就是组件里面什么都不写，最后在父组件中使用这个组件的时候，属性会透传到组件中的根元素上；</p><p>参考：<strong>透传 Attributes</strong>[1]</p><p>了解这个特性就可以这样封装组件：</p><div class="language- vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>&lt;!-- 组件 --&gt;</span></span>
<span class="line"><span>&lt;template&gt;</span></span>
<span class="line"><span>  &lt;el-dialog&gt;</span></span>
<span class="line"><span>  &lt;/el-dialog&gt;</span></span>
<span class="line"><span>&lt;/template&gt;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>&lt;!-- 父组件 --&gt;</span></span>
<span class="line"><span>&lt;template&gt;</span></span>
<span class="line"><span>  &lt;div&gt;</span></span>
<span class="line"><span>    &lt;MyComponent </span></span>
<span class="line"><span>        v-model=&quot;visible&quot;</span></span>
<span class="line"><span>        width=&quot;500px&quot;</span></span>
<span class="line"><span>    /&gt;</span></span>
<span class="line"><span>  &lt;/div&gt;</span></span>
<span class="line"><span>&lt;/template&gt;</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br></div></div><p>通常我们会封装一个<code>Dialog</code>组件来解耦业务，这个时候直接将<code>Dialog</code>作为根元素，然后可以将<code>v-model</code>和<code>width</code>属性透传到<code>Dialog</code>组件上；</p><p>这样不需要写<code>Dialog</code>组件开启关闭的双向绑定的代码，前提是不需要在组件内部操作<code>Dialog</code>的开启关闭；</p><h3 id="_2-4-组件方法" tabindex="-1"><strong>2.4 组件方法</strong> <a class="header-anchor" href="#_2-4-组件方法" aria-label="Permalink to &quot;**2.4 组件方法**&quot;">​</a></h3><p>在<code>Vue2</code>中，我们可以通过<code>this.$refs.xxx</code>来获取到组件的实例，然后调用组件的方法；</p><p>在<code>Vue3</code>中，我们可以通过<code>ref</code>来获取到组件的实例，然后调用组件的方法；</p><p>但是不管是<code>Vue2</code>还是<code>Vue3</code>，在组件内部想要使用组件的子组件的方法都不是一件容易的事情；</p><p>通常都是手动将组件的实例获取到，然后再重新定义在组件的<code>methods</code>中；</p><div class="language- vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>&lt;!-- 组件 --&gt;</span></span>
<span class="line"><span>&lt;template&gt;</span></span>
<span class="line"><span>  &lt;div&gt;</span></span>
<span class="line"><span>    &lt;el-input ref=&quot;input&quot; /&gt;</span></span>
<span class="line"><span>  &lt;/div&gt;</span></span>
<span class="line"><span>&lt;/template&gt;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>&lt;script&gt;</span></span>
<span class="line"><span>export default {</span></span>
<span class="line"><span>  methods: {</span></span>
<span class="line"><span>    focus() {</span></span>
<span class="line"><span>      this.$refs.input.focus();</span></span>
<span class="line"><span>    },</span></span>
<span class="line"><span>  },</span></span>
<span class="line"><span>};</span></span>
<span class="line"><span>&lt;/script&gt;</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br></div></div><p>组件的方法通常没有啥特别好的方式，除了我上面的这种方式之外，还有小伙伴是直接将<code>ref</code>返回出去：</p><div class="language- vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>&lt;template&gt;</span></span>
<span class="line"><span>  &lt;div&gt;</span></span>
<span class="line"><span>    &lt;el-input ref=&quot;input&quot; /&gt;</span></span>
<span class="line"><span>  &lt;/div&gt;</span></span>
<span class="line"><span>&lt;/template&gt;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>&lt;script&gt;</span></span>
<span class="line"><span>export default {</span></span>
<span class="line"><span>  methods: {</span></span>
<span class="line"><span>    inputRef() {</span></span>
<span class="line"><span>      return this.$refs.input</span></span>
<span class="line"><span>    },</span></span>
<span class="line"><span>  },</span></span>
<span class="line"><span>};</span></span>
<span class="line"><span>&lt;/script&gt;</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br></div></div><p>当然还有一种偷懒的方式：</p><div class="language- vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>&lt;template&gt;</span></span>
<span class="line"><span>  &lt;div&gt;</span></span>
<span class="line"><span>    &lt;el-input ref=&quot;input&quot; /&gt;</span></span>
<span class="line"><span>  &lt;/div&gt;</span></span>
<span class="line"><span>&lt;/template&gt;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>&lt;script&gt;</span></span>
<span class="line"><span>export default {</span></span>
<span class="line"><span>  mounted() {</span></span>
<span class="line"><span>    Object.values(this.$refs.input).forEach((value) =&gt; {</span></span>
<span class="line"><span>      if (typeof value === &#39;function&#39;) {</span></span>
<span class="line"><span>        this[value.name] = (...args) =&gt; value(...args);</span></span>
<span class="line"><span>      }</span></span>
<span class="line"><span>    });</span></span>
<span class="line"><span>  },</span></span>
<span class="line"><span>  methods: {</span></span>
<span class="line"><span>    inputRef() {</span></span>
<span class="line"><span>      return this.$refs.input</span></span>
<span class="line"><span>    },</span></span>
<span class="line"><span>  },</span></span>
<span class="line"><span>};</span></span>
<span class="line"><span>&lt;/script&gt;</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br><span class="line-number">22</span><br></div></div><p>不过这种偷懒的方式只能在<code>options api</code>中使用，因为在<code>composition api</code>中是没有<code>this</code>的；</p><p>对于<code>setup</code>语法，如果需要使用组件的方法，可以使用<code>getCurrentInstance</code>来获取到组件的实例，然后将方法挂载到<code>exposed</code>上；</p><div class="language- vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>&lt;template&gt;</span></span>
<span class="line"><span>  &lt;div&gt;</span></span>
<span class="line"><span>    &lt;el-input ref=&quot;input&quot; /&gt;</span></span>
<span class="line"><span>  &lt;/div&gt;</span></span>
<span class="line"><span>&lt;/template&gt;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>&lt;script setup&gt;</span></span>
<span class="line"><span>import { getCurrentInstance, onMounted, ref } from &quot;vue&quot;;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>const instance = getCurrentInstance();</span></span>
<span class="line"><span>const input = ref(null);</span></span>
<span class="line"><span>onMounted(() =&gt; {</span></span>
<span class="line"><span>  Object.values(input.value).forEach((value) =&gt; {</span></span>
<span class="line"><span>    if (typeof value === &quot;function&quot;) {</span></span>
<span class="line"><span>      instance.exposed[value.name] = (...args) =&gt; value(...args);</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span>  });</span></span>
<span class="line"><span>});</span></span>
<span class="line"><span>&lt;/script&gt;</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br></div></div><blockquote><p>这种方式不太稳定，因为<code>exposed</code>是<code>Vue3</code>的一个私有属性，不建议使用；</p></blockquote><blockquote><p>在<code>setup</code>语法中如果需要暴露组件的内部方法，需要使用<code>defineExpose</code>来暴露；</p></blockquote><div class="language- vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>&lt;script setup&gt;</span></span>
<span class="line"><span>// ... 省略其他代码</span></span>
<span class="line"><span></span></span>
<span class="line"><span>defineExpose({</span></span>
<span class="line"><span>  focus: () =&gt; {</span></span>
<span class="line"><span>    input.value.focus();</span></span>
<span class="line"><span>  },</span></span>
<span class="line"><span>});</span></span>
<span class="line"><span>&lt;/script&gt;</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br></div></div><h2 id="总结" tabindex="-1"><strong>总结</strong> <a class="header-anchor" href="#总结" aria-label="Permalink to &quot;**总结**&quot;">​</a></h2><p>这次带来的是<code>Vue3</code>的组件封装的一些技巧，主要是<code>setup</code>语法的一些特性，以及<code>Vue3</code>中的一些奇淫技巧；</p><p><code>Vue3</code>的组件封装相比<code>Vue2</code>来说更加的灵活，但是也更加的复杂，需要我们在使用的时候多加注意</p>`,55),i=[l];function c(t,r,b,u,o,d){return a(),n("div",null,i)}const h=s(e,[["render",c]]);export{g as __pageData,h as default};
