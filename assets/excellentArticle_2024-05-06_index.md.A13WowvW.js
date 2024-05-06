import{_ as s,c as n,o as a,a5 as e}from"./chunks/framework.BFhuDLoy.js";const h=JSON.parse('{"title":"前端视频人像实时捕获技术,超干货!!!","description":"","frontmatter":{},"headers":[],"relativePath":"excellentArticle/2024-05-06/index.md","filePath":"excellentArticle/2024-05-06/index.md","lastUpdated":1714989523000}'),p={name:"excellentArticle/2024-05-06/index.md"},l=e(`<h1 id="前端视频人像实时捕获技术-超干货" tabindex="-1">前端视频人像实时捕获技术,超干货!!! <a class="header-anchor" href="#前端视频人像实时捕获技术-超干货" aria-label="Permalink to &quot;前端视频人像实时捕获技术,超干货!!!&quot;">​</a></h1><h3 id="简介" tabindex="-1"><strong>简介</strong> <a class="header-anchor" href="#简介" aria-label="Permalink to &quot;**简介**&quot;">​</a></h3><p><strong>假如有一天, 客户提需求 要我门从摄像头监控中 进行动态人像识别 捕获 ;我们该如何 来完成这一需求呢?</strong></p><p>近年来，计算机视觉和机器学习的进步促成了视频流中物体检测的突破性发展。这项技术在各个领域得到了广泛应用，包括安全、监控，甚至是创意性的影视制作。在本文中，我们将在<code>coco-ssd.js</code> 模型基础上 深入探讨专门用于实时捕获人类主体的视频对象检测前端实现。</p><h3 id="技术理解" tabindex="-1"><strong>技术理解</strong> <a class="header-anchor" href="#技术理解" aria-label="Permalink to &quot;**技术理解**&quot;">​</a></h3><p>这项技术的核心在于利用预训练的机器学习模型，如 COCO-SSD（上下文中的常见对象 - 单次多框检测器）。这些模型是在包含大量对象类别的广泛数据集上进行训练的，使它们能够准确地识别和定位图像或视频帧中的物体。</p><h3 id="coco-ssd-模型" tabindex="-1"><strong>COCO-SSD 模型</strong> <a class="header-anchor" href="#coco-ssd-模型" aria-label="Permalink to &quot;**COCO-SSD 模型**&quot;">​</a></h3><p>COCO-SSD 以其高精度检测各种物体的能力脱颖而出。该模型在 COCO 数据集上进行了训练，该数据集包含超过 33 万张图像，涵盖了 80 个不同的对象类别，因此能够精准识别日常场景中的常见对象。</p><h3 id="实时视频流处理" tabindex="-1"><strong>实时视频流处理</strong> <a class="header-anchor" href="#实时视频流处理" aria-label="Permalink to &quot;**实时视频流处理**&quot;">​</a></h3><p>通过使用 TensorFlow.js 将 COCO-SSD 集成到前端 Web 应用程序中，开发人员可以直接在浏览器环境中执行实时对象检测。这消除了对复杂的服务器端处理的需求，使其能够与网络摄像头或其他来源的视频流无缝集成。</p><h3 id="实现概述" tabindex="-1"><strong>实现概述</strong> <a class="header-anchor" href="#实现概述" aria-label="Permalink to &quot;**实现概述**&quot;">​</a></h3><p>让我们来探讨一个基本的前端视频对象检测实现，专门用于实时捕获人类主体。以下是一个简化的 HTML 文档，嵌入了 JavaScript 代码来实现这一功能：</p><h3 id="代码操作实现" tabindex="-1"><strong>代码操作实现</strong> <a class="header-anchor" href="#代码操作实现" aria-label="Permalink to &quot;**代码操作实现**&quot;">​</a></h3><p>我讲需要用到一个第三方模型识别库 <code>coco-ssd.js</code> 和<code>tfjs@3.11.0.js</code></p><div class="language- vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span>&lt;!DOCTYPE html&gt;</span></span>
<span class="line"><span>&lt;html lang=&quot;zh-CN&quot;&gt;</span></span>
<span class="line"><span>&lt;head&gt;</span></span>
<span class="line"><span>    &lt;meta charset=&quot;UTF-8&quot;&gt;</span></span>
<span class="line"><span>    &lt;meta name=&quot;viewport&quot; content=&quot;width=device-width, initial-scale=1.0&quot;&gt;</span></span>
<span class="line"><span>    &lt;title&gt;视频人像捕获&lt;/title&gt;</span></span>
<span class="line"><span>   &lt;script src=&quot;https://cdn.jsdelivr.net/npm/@tensorflow/tfjs@3.11.0&quot;&gt;&lt;/script&gt;</span></span>
<span class="line"><span>    &lt;script src=&quot;https://cdn.jsdelivr.net/npm/@tensorflow-models/coco-ssd&quot;&gt;&lt;/script&gt;    &lt;style&gt;</span></span>
<span class="line"><span>        #overlay {</span></span>
<span class="line"><span>            position: absolute;</span></span>
<span class="line"><span>            border: 2px solid red;</span></span>
<span class="line"><span>            display: none;</span></span>
<span class="line"><span>        }</span></span>
<span class="line"><span>    &lt;/style&gt;</span></span>
<span class="line"><span>&lt;/head&gt;</span></span>
<span class="line"><span>&lt;body&gt;</span></span>
<span class="line"><span>&lt;video id=&quot;video&quot; width=&quot;640&quot; height=&quot;480&quot; autoplay&gt;&lt;/video&gt;</span></span>
<span class="line"><span>&lt;div id=&quot;overlay&quot;&gt;&lt;/div&gt;</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br></div></div><ol><li><code>&lt;head&gt;</code> 部分包含了所需的 <code>&lt;script&gt;</code> 标签，其中包括 TensorFlow.js 和 COCO-SSD 模型的引用。</li><li>关于模型引用 在线对网络要求比较高 建议下载本地咋使用 <a href="https://www.tensorflow.org/js" target="_blank" rel="noreferrer">https://www.tensorflow.org/js</a> 官网</li><li>页面中有一个 <code>&lt;video&gt;</code> 元素用于显示视频流，以及一个 <code>&lt;div&gt; </code>元素作为覆盖层，用于在检测到人像时叠加边框。</li></ol><h3 id="javascript-部分" tabindex="-1"><strong>JavaScript 部分</strong> <a class="header-anchor" href="#javascript-部分" aria-label="Permalink to &quot;**JavaScript 部分**&quot;">​</a></h3><div class="language- vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span>  &lt;script&gt;</span></span>
<span class="line"><span>   document.addEventListener(&#39;DOMContentLoaded&#39;, () =&gt; {</span></span>
<span class="line"><span>      const video = document.getElementById(&#39;video&#39;);</span></span>
<span class="line"><span>      const overlay = document.getElementById(&#39;overlay&#39;);</span></span>
<span class="line"><span></span></span>
<span class="line"><span>      // 加载 COCO-SSD 模型</span></span>
<span class="line"><span>      cocoSsd.load().then(model =&gt; {</span></span>
<span class="line"><span>         console.log(&#39;模型加载成功&#39;);</span></span>
<span class="line"><span></span></span>
<span class="line"><span>         // 开始视频流</span></span>
<span class="line"><span>         navigator.mediaDevices.getUserMedia({video: true})</span></span>
<span class="line"><span>         .then(stream =&gt; {</span></span>
<span class="line"><span>            video.srcObject = stream;</span></span>
<span class="line"><span>            video.play();</span></span>
<span class="line"><span>         })</span></span>
<span class="line"><span>         .catch(error =&gt; {</span></span>
<span class="line"><span>            console.error(&#39;访问摄像头出错：&#39;, error);</span></span>
<span class="line"><span>         });</span></span>
<span class="line"><span></span></span>
<span class="line"><span>         // 在视频流上进行对象检测</span></span>
<span class="line"><span>         video.addEventListener(&#39;play&#39;, () =&gt; {</span></span>
<span class="line"><span>            setTimeout(() =&gt; {</span></span>
<span class="line"><span>               setInterval(() =&gt; {</span></span>
<span class="line"><span>                  detectObjects(model);</span></span>
<span class="line"><span>               }, 10); // 每秒检测一次</span></span>
<span class="line"><span>            }, 1000);</span></span>
<span class="line"><span></span></span>
<span class="line"><span>         });</span></span>
<span class="line"><span>      });</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br><span class="line-number">22</span><br><span class="line-number">23</span><br><span class="line-number">24</span><br><span class="line-number">25</span><br><span class="line-number">26</span><br><span class="line-number">27</span><br><span class="line-number">28</span><br><span class="line-number">29</span><br></div></div><ol><li>DOMContentLoaded 事件监听器确保了当文档完全加载后再执行 JavaScript 代码。</li><li>video 和 overlay 分别获取了视频元素和覆盖层元素。</li><li>使用 cocoSsd.load().then(model =&gt; {...}) 异步加载 COCO-SSD 模型。</li><li>使用 navigator.mediaDevices.getUserMedia() 获取用户媒体（视频流）并将其赋值给元素的 srcObject 属性，然后播放视频流。</li><li>addEventListener 监听了视频的 play 事件，一旦视频开始播放，便开始对象检测。</li></ol><div class="language- vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span>// 对视频流进行对象检测</span></span>
<span class="line"><span>async function detectObjects(model) {</span></span>
<span class="line"><span>// 使用 COCO-SSD 模型进行对象检测</span></span>
<span class="line"><span>const predictions = await model.detect(video);</span></span>
<span class="line"><span>const specifiedObject = predictions.find(prediction =&gt; {</span></span>
<span class="line"><span>return prediction.class === &#39;person&#39;;</span></span>
<span class="line"><span> });</span></span>
<span class="line"><span>          // 如果找到了指定的对象</span></span>
<span class="line"><span>  if (specifiedObject) {</span></span>
<span class="line"><span> // 更新 overlay 的位置使其跟随指定对象</span></span>
<span class="line"><span>const bbox = specifiedObject.bbox;</span></span>
<span class="line"><span>overlay.style.left = \`\${bbox[0]}px\`;</span></span>
<span class="line"><span>overlay.style.top = \`\${bbox[1]}px\`;</span></span>
<span class="line"><span>overlay.style.width = \`\${bbox[2]}px\`;</span></span>
<span class="line"><span>overlay.style.height = \`\${bbox[3]}px\`;</span></span>
<span class="line"><span>overlay.style.display = &#39;block&#39;;</span></span>
<span class="line"><span>} else {</span></span>
<span class="line"><span>    overlay.style.display = &#39;none&#39;;</span></span>
<span class="line"><span> }</span></span>
<span class="line"><span>}</span></span>
<span class="line"><span>});</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br></div></div><ol><li>detectObjects 函数用于执行对象检测。它接收加载的 COCO-SSD 模型作为参数。</li><li>使用 model.detect(video) 对视频中的对象进行检测，返回一个包含对象预测结果的数组。</li><li>使用 predictions.find() 方法查找包含类别为 &#39;person&#39; 的预测结果。</li><li>如果找到了类别为 &#39;person&#39; 的对象，就更新覆盖层的位置和尺寸，以及显示覆盖层；否则隐藏覆盖层。</li></ol><p><strong>通过这种方式，我们可以实现在前端对视频中的人像进行实时捕获，并在画面中标识出人物的位置。</strong></p><p><strong>如果是一张静态图片, 我们需要从用户 拍摄的人脸照片 来完成 人脸识别功能 该如何去做呢?</strong></p><p><strong>详情请看下期。</strong></p><p><strong>图像人脸识别技术</strong></p>`,25),i=[l];function t(r,c,o,b,d,u){return a(),n("div",null,i)}const g=s(p,[["render",t]]);export{h as __pageData,g as default};
