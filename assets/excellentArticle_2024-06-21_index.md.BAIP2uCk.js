import{_ as n,c as a,o as e,ag as p}from"./chunks/framework.D_D2S754.js";const l="/jiang225638.github.io/assets/excellentArticle/2024-06-21/640wx_fmt=png&from=appmsg&random=0.762227380468314&random=0.webp",r="/jiang225638.github.io/assets/excellentArticle/2024-06-21/640wx_fmt=png&from=appmsg&random=0.7042364028047725&random=0.webp",g=JSON.parse('{"title":"一个reduce还能玩出这么多花样儿？中高级前端都知道的reduce函数高级用法","description":"","frontmatter":{},"headers":[],"relativePath":"excellentArticle/2024-06-21/index.md","filePath":"excellentArticle/2024-06-21/index.md","lastUpdated":1718957840000}'),i={name:"excellentArticle/2024-06-21/index.md"};function c(t,s,u,b,o,d){return e(),a("div",null,s[0]||(s[0]=[p(`<h1 id="一个reduce还能玩出这么多花样儿-中高级前端都知道的reduce函数高级用法" tabindex="-1">一个reduce还能玩出这么多花样儿？中高级前端都知道的reduce函数高级用法 <a class="header-anchor" href="#一个reduce还能玩出这么多花样儿-中高级前端都知道的reduce函数高级用法" aria-label="Permalink to &quot;一个reduce还能玩出这么多花样儿？中高级前端都知道的reduce函数高级用法&quot;">​</a></h1><h2 id="" tabindex="-1"><a class="header-anchor" href="#" aria-label="Permalink to &quot;&quot;">​</a></h2><p>reduce 函数是 JavaScript 中的一个功能强大的高阶函数，它算是 JS 数组方法里面较为复杂的一个函数了。reduce 的灵活性在于它能够遍历数组的所有元素，根据提供的函数累积一个最终的返回值。reduce()方法可以应用的场景特别多，循环遍历能做的，reduce都可以做，比如数组求和、数组求积、统计数组中元素出现的次数、数组去重等等。</p><p>一、reduce的用法</p><p>reduce() 方法对数组中的每个元素按序执行一个由您提供的 reducer 函数，每一次运行 reducer 会将先前元素的计算结果作为参数传入，最后将其结果汇总为单个返回值。</p><p>第一次执行回调函数时，不存在“上一次的计算结果”。如果需要回调函数从数组索引为 0 的元素开始执行，则需要传递初始值。否则，数组索引为 0 的元素将被作为初始值 initialValue，迭代器将从第二个元素开始执行（索引为 1 而不是 0）。</p><p>注意: reduce() 对于空数组是不会执行回调函数的。</p><p>语法如下：</p><div class="language- vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>array.reduce(function(total, currentValue, currentIndex, arr), initialValue</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br></div></div><p>简洁语法：</p><div class="language- vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>reduce(callbackFn, initialValue)</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br></div></div><p><strong>function(total,currentValue, index,arr)</strong>：回调函数，必需。</p><ul><li><p><strong>total</strong>：上一次回调函数的返回值，第一次调用回调函数时，如果指定的初始值 initialValue，那么该参数值就是 initialValue，否则就是数组元素的第一个。</p></li><li><p><strong>currentValue</strong>：数组中正在处理的元素。在第一次调用时，若指定了初始值 initialValue，那么当前处理的元素就是数组的第一个元素，否则的话就是第二个元素。</p></li><li><p><strong>currentIndex</strong>：数组中正在处理的元素的索引。若指定了初始值 initialValue，则起始索引号为 0，否则从索引 1 起始。</p></li><li><p><strong>array</strong>：用于遍历的数组。</p></li></ul><p><strong>initialValue</strong>：可选。传递给函数的初始值。也就是第一次调用回调函数时参数total，是否指定初始值将会影响其它几个参数的值。</p><p>reduce 方法的返回值就是遍历所有数组执行回调函数后的返回值。</p><p>二、reduce的使用场景</p><p><strong>2.1 数组求和</strong></p><p>日常开发基本使用中，最简单其实就是数组求和的场景了。代码如下：</p><div class="language- vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>const arr = [1, 2, 3, 4, 5, 6, 7, 8];</span></span>
<span class="line"><span>const result = arr.reduce((total, currentValue) =&gt; {</span></span>
<span class="line"><span>    return total + currentValue;</span></span>
<span class="line"><span>}, 0);</span></span>
<span class="line"><span>console.log(result); // 36</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br></div></div><p>按指定属性求和：</p><div class="language- vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>const arr = [</span></span>
<span class="line"><span>    { name: &#39;张三&#39;, score: 98 }, </span></span>
<span class="line"><span>    { name: &#39;李四&#39;, score: 86 }, </span></span>
<span class="line"><span>    { name: &#39;王五&#39;, score: 90 }, </span></span>
<span class="line"><span>];</span></span>
<span class="line"><span>const result = arr.reduce((total, currentValue) =&gt; { </span></span>
<span class="line"><span>    return total + currentValue.score</span></span>
<span class="line"><span>}, 0);</span></span>
<span class="line"><span>console.log(result); // 274</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br></div></div><p>按照条件求和：</p><div class="language- vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>const arr = [</span></span>
<span class="line"><span>    { name: &#39;张三&#39;, score: 93 }, </span></span>
<span class="line"><span>    { name: &#39;李四&#39;, score: 76 }, </span></span>
<span class="line"><span>    { name: &#39;王五&#39;, score: 80 }, </span></span>
<span class="line"><span>    { name: &#39;赵六&#39;, score: 65 }, </span></span>
<span class="line"><span>];</span></span>
<span class="line"><span>const result = arr.reduce((total, currentValue) =&gt; { </span></span>
<span class="line"><span>    return currentValue.score &gt;= 80 ? total + currentValue.score : total;</span></span>
<span class="line"><span>}, 0);</span></span>
<span class="line"><span>console.log(result); // 173</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br></div></div><p><strong>2.2 计算数组每个数据出现的次数</strong></p><p>这种场景通常出现在算法题当中，借助 reduce 就可以简单实现它。其主要思路是通过键值对的形式巧妙的将出现的次数存储下来。</p><p>代码如下：</p><div class="language- vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>const arr = [&#39;Allice&#39;, &#39;Bob&#39;, &#39;Tiff&#39;, &#39;Bruce&#39;, &#39;Bob&#39;, &#39;Jack&#39;, &#39;Allice&#39;, &#39;Bob&#39;];</span></span>
<span class="line"><span>const result = arr.reduce((total, currentValue) =&gt; {</span></span>
<span class="line"><span>    total[currentValue] = (total[currentValue] || 0) + 1;</span></span>
<span class="line"><span>    return total;</span></span>
<span class="line"><span>}, {});</span></span>
<span class="line"><span>console.log(result);</span></span>
<span class="line"><span>// {Allice: 2, Bob: 3, Tiff: 1, Bruce: 1, Jack: 1}</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br></div></div><p>变形：</p><p>同样的道理，也可以统计字符串中每个字符的出现次数，只需把字符串使用split方法分割成数组即可。</p><div class="language- vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>const str = &#39;Hello World&#39;;</span></span>
<span class="line"><span>const result = str.split(&#39;&#39;).reduce((total, currentValue) =&gt; {</span></span>
<span class="line"><span>    total[currentValue] = (total[currentValue] || 0) + 1;</span></span>
<span class="line"><span>    return total;</span></span>
<span class="line"><span>}, {});</span></span>
<span class="line"><span>console.log(result);</span></span>
<span class="line"><span>// {H: 1, e: 1, l: 3, o: 2, &quot; &quot;: 1, d: 1, r: 1, W: 1</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br></div></div><p><strong>2.3 数组去重</strong></p><p>想不到吧！reduce还能实现数组去重？是的！</p><p>过程如下：</p><ol><li>初始化一个空数组；</li><li>将需要去重处理的数组中的第1项在初始化数组中查找，如果找不到（空数组中肯定找不到），就将该项添加到初始化数组中；</li><li>将需要去重处理的数组中的第2项在初始化数组中查找，如果找不到，就将该项继续添加到初始化数组中；</li><li>……；</li><li>将需要去重处理的数组中的第n项在初始化数组中查找，如果找不到，就将该项继续添加到初始化数组中；</li><li>将这个初始化数组返回。</li></ol><p>代码如下：</p><div class="language- vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>const arr = [1, 2, 2, 3, 3, 4, 4, 5, 6];</span></span>
<span class="line"><span>const result = arr.reduce((total, currentValue) =&gt; {</span></span>
<span class="line"><span>    if(!total.includes(currentValue)) {</span></span>
<span class="line"><span>        total.push(currentValue)</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span>    return total;</span></span>
<span class="line"><span>}, []);</span></span>
<span class="line"><span>console.log(result);</span></span>
<span class="line"><span>// [1, 2, 3, 4, 5, 6]</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br></div></div><p><strong>2.4 数组扁平化</strong></p><p>将初始值设置为了空数组，然后利用 concat 将数组中的每一项与初始值拼接，得到一个新的数组。</p><div class="language- vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>const arr = [[&#39;a&#39;, &#39;b&#39;], [&#39;c&#39;, &#39;d&#39;], [&#39;e&#39;, &#39;f&#39;]];</span></span>
<span class="line"><span>const result = arr.reduce((total, currentValue) =&gt; {</span></span>
<span class="line"><span>    return total.concat(currentValue);</span></span>
<span class="line"><span>}, []);</span></span>
<span class="line"><span>console.log(result);</span></span>
<span class="line"><span>// [&#39;a&#39;, &#39;b&#39;, &#39;c&#39;, &#39;d&#39;, &#39;e&#39;, &#39;f&#39;]</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br></div></div><p><strong>2.5 将二维数组转为对象</strong></p><p>又没想到吧！将二维数组转化为对象，其过程为将初始值设置为了空对象，currentValue可以看做为[key, value]，然后total[key] = value把键值放入total对象中。</p><div class="language- vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>const arr = [[&#39;name&#39;, &#39;前端技术营&#39;], [&#39;age&#39;, &#39;18&#39;], [&#39;sex&#39;, &#39;男&#39;]];</span></span>
<span class="line"><span>const result = arr.reduce((total, [key, value]) =&gt; {</span></span>
<span class="line"><span>    total[key] = value</span></span>
<span class="line"><span>    return total;</span></span>
<span class="line"><span>}, {});</span></span>
<span class="line"><span>console.log(result);</span></span>
<span class="line"><span>// {name: &#39;前端技术营&#39;, age: &#39;18&#39;, sex: &#39;男&#39;}</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br></div></div><p><strong>2.6 提取数组中的特定值生产新数组</strong></p><div class="language- vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>const arr = [{id: 1, name: &#39;Tom&#39;}, { id: 2, name: &#39;Jack&#39; }, { id: 3, name: &#39;Anna&#39; }]</span></span>
<span class="line"><span>const result = arr.reduce((total, currentValue) =&gt; { </span></span>
<span class="line"><span>    return [...total, currentValue.name]</span></span>
<span class="line"><span>}, []);</span></span>
<span class="line"><span>console.log(result);</span></span>
<span class="line"><span>// [&#39;Tom&#39;, &#39;Jack&#39;, &#39;Anna&#39;]</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br></div></div><p><strong>2.7 合并数组对象</strong></p><div class="language- vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>const arr = [{name: &#39;前端技术营&#39;}, { age: 18 }, { sex: &#39;男&#39; }];</span></span>
<span class="line"><span>const result = arr.reduce((total, currentValue) =&gt; { </span></span>
<span class="line"><span>    return { ...total, ...currentValue }</span></span>
<span class="line"><span>}, {});</span></span>
<span class="line"><span>console.log(result);</span></span>
<span class="line"><span>// {name: &#39;前端技术营&#39;, age: 18, sex: &#39;男&#39;}</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br></div></div><p><strong>2.8 解析url参数</strong></p><div class="language- vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>const url = &#39;https://www.test.com/index.html?name=Jack&amp;id=123456&amp;latitude=31.101109&amp;longitude=121.51367&#39;;</span></span>
<span class="line"><span>const params = url.split(&#39;?&#39;)[1];</span></span>
<span class="line"><span>const result = params.split(&#39;&amp;&#39;).reduce((total, currentValue) =&gt; { </span></span>
<span class="line"><span>    const [key, value] = currentValue.split(&#39;=&#39;);</span></span>
<span class="line"><span>    total[key] = value;</span></span>
<span class="line"><span>    return total;</span></span>
<span class="line"><span>}, {});</span></span>
<span class="line"><span>console.log(result); </span></span>
<span class="line"><span>// {name: &#39;Jack&#39;, id: &#39;123456&#39;, latitude: &#39;31.101109&#39;, longitude: &#39;121.51367&#39;}</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br></div></div><p><strong>2.9 反序列化参数</strong></p><div class="language- vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>const stringifyData = (data = {}) =&gt; {</span></span>
<span class="line"><span>    return Object.entries(data).reduce((total, currentValue) =&gt; {</span></span>
<span class="line"><span>        return \`\${total}\${currentValue[0]}=\${encodeURIComponent(currentValue[1])}&amp;\`</span></span>
<span class="line"><span>    }, Object.keys(data).length ? &quot;?&quot; : &quot;&quot;)</span></span>
<span class="line"><span>    .replace(/&amp;$/, &quot;&quot;);</span></span>
<span class="line"><span>};</span></span>
<span class="line"><span>const params = stringifyData({</span></span>
<span class="line"><span>    name: &quot;Jack&quot;,</span></span>
<span class="line"><span>    id: &#39;123456&#39;,</span></span>
<span class="line"><span>    age: 18</span></span>
<span class="line"><span>});</span></span>
<span class="line"><span>const url = \`https://www.test.com/index.html\${params}\`;</span></span>
<span class="line"><span>console.log(url);</span></span>
<span class="line"><span>// https://www.test.com/index.html?name=Jack&amp;id=123456&amp;age=18</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br></div></div><p><strong>2.10 求最大值、最小值</strong></p><p>计算数组中的最大值或最小值，可以使用原生api Math.max()和Math.min()，当然我们也可以使用reduce来实现。</p><div class="language- vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>const array = [1, 10, 6, 8, 3, 9];</span></span>
<span class="line"><span>const max = array.reduce((max, num) =&gt; (max &gt; num ? max : num));</span></span>
<span class="line"><span>console.log(max); // 10</span></span>
<span class="line"><span>const min = array.reduce((min, num) =&gt; (min &lt; num ? min : num));</span></span>
<span class="line"><span>console.log(min); // 1</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br></div></div><p><strong>2.11 根据指定项分组</strong></p><div class="language- vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>const arr = [</span></span>
<span class="line"><span>    { name: &#39;小明&#39;, score: 96 },</span></span>
<span class="line"><span>    { name: &#39;小华&#39;, score: 88 },</span></span>
<span class="line"><span>    { name: &#39;小红&#39;, score: 92 },</span></span>
<span class="line"><span>    { name: &#39;小刚&#39;, score: 100 },</span></span>
<span class="line"><span>    { name: &#39;小李&#39;, score: 96 },</span></span>
<span class="line"><span>    { name: &#39;小美&#39;, score: 90 },</span></span>
<span class="line"><span>    { name: &#39;小芳&#39;, score: 100 },</span></span>
<span class="line"><span>]</span></span>
<span class="line"><span>const result = arr.reduce((total, currentValue) =&gt; {</span></span>
<span class="line"><span>    const { score } = currentValue;</span></span>
<span class="line"><span>    if(!total[score]) total[score] = [];</span></span>
<span class="line"><span>    total[score].push(currentValue)</span></span>
<span class="line"><span>    return total;</span></span>
<span class="line"><span>}, {})</span></span>
<span class="line"><span>console.log(result)</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br></div></div><p><img src="`+l+`" alt="medium-zoom"></p><p>更复杂场景，多条件数据分类。</p><p>假设有一个包含人员信息的数组，每个人员对象有 age 和 gender 属性。现在我们想要根据人员的年龄和性别进行多条件分类。</p><div class="language- vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>const arr = [</span></span>
<span class="line"><span>  { name: &#39;Alice&#39;, age: 25, gender: &#39;female&#39; },</span></span>
<span class="line"><span>  { name: &#39;Bob&#39;, age: 30, gender: &#39;male&#39; },</span></span>
<span class="line"><span>  { name: &#39;Charlie&#39;, age: 25, gender: &#39;male&#39; },</span></span>
<span class="line"><span>  { name: &#39;Dave&#39;, age: 35, gender: &#39;male&#39; },</span></span>
<span class="line"><span>  { name: &#39;Eve&#39;, age: 25, gender: &#39;female&#39; },</span></span>
<span class="line"><span>];</span></span>
<span class="line"><span></span></span>
<span class="line"><span>const result = arr.reduce((accumulator, currentValue) =&gt; {</span></span>
<span class="line"><span>    const { age, gender } = person;</span></span>
<span class="line"><span>    if (!accumulator[age]) {</span></span>
<span class="line"><span>        accumulator[age] = {};</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span>    if (!accumulator[age][gender]) {</span></span>
<span class="line"><span>        accumulator[age][gender] = [];</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span>    accumulator[age][gender].push(person);</span></span>
<span class="line"><span>    return accumulator;</span></span>
<span class="line"><span>}, {});</span></span>
<span class="line"><span></span></span>
<span class="line"><span>console.log(result);</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br></div></div><p><img src="`+r+`" alt="medium-zoom"></p><p><strong>2.12 管道函数</strong></p><p>当结合其他高阶用法时，reduce 可以应用于非常复杂的场景。其中一个非常复杂的场景是实现函数组合或管道。管道(Pipe)是指输入一个值，依次经过管道(有序的函数运算)后输出这个值，也是函数编程的核心思想。</p><p>函数组合是一种将多个函数合并成一个新函数的技术，其中每个函数的输出都是下一个函数的输入。我们可以使用 reduce 和函数组合技术来实现函数管道，将一系列函数应用于数据并依次传递结果。</p><div class="language- vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>function add10(num) {</span></span>
<span class="line"><span>  return num + 10;</span></span>
<span class="line"><span>};</span></span>
<span class="line"><span>function multipl2(num) {</span></span>
<span class="line"><span>  return num * 2;</span></span>
<span class="line"><span>};</span></span>
<span class="line"><span>function divide3(num) {</span></span>
<span class="line"><span>  return num / 3;</span></span>
<span class="line"><span>};</span></span>
<span class="line"><span>const compose = (fns) =&gt; (initialValue) =&gt; fns.reduce((previous, current) =&gt; current(previous), initialValue);</span></span>
<span class="line"><span>const calculate1 = compose([add10, divide3]);</span></span>
<span class="line"><span>const calculate2 = compose([divide3, add10, multipl2]);</span></span>
<span class="line"><span>// 先加10，在除以3</span></span>
<span class="line"><span>console.log(calculate1(20)); //10</span></span>
<span class="line"><span>// 先加10，在除以3，最后乘以2</span></span>
<span class="line"><span>console.log(calculate2(9)); //26</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br></div></div><p>三、总结</p><p>reduce 是数组的归并方法，与forEach、map、filter等迭代方法一样都会对数组每一项进行遍历，但是reduce可同时将前面数组项遍历产生的结果与当前遍历项进行运算，这一点是其它迭代方法无法企及的。</p><p>reduce除了以上介绍的使用场景外，还有很多其它使用场景，有兴趣的朋友可以研究一下。</p>`,67)]))}const h=n(i,[["render",c]]);export{g as __pageData,h as default};
