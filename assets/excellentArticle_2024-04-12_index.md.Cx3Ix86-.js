import{_ as a,c as e,o as s,a5 as n,ad as o,ae as p,af as i,ag as l,ah as t,ai as c,aj as r,ak as d,al as h,am as m,an as u,ao as b,ap as g,aq as C,ar as k,as as q,at as _,au as x}from"./chunks/framework.C-6F2GHi.js";const w=JSON.parse('{"title":"为什么需要缓存","description":"","frontmatter":{},"headers":[],"relativePath":"excellentArticle/2024-04-12/index.md","filePath":"excellentArticle/2024-04-12/index.md","lastUpdated":1712912504000}'),v={name:"excellentArticle/2024-04-12/index.md"},f=n('<h1 id="为什么需要缓存" tabindex="-1">为什么需要缓存 <a class="header-anchor" href="#为什么需要缓存" aria-label="Permalink to &quot;为什么需要缓存&quot;">​</a></h1><p>这里说的不仅仅是我们常见的<code>强缓存</code>和<code>协商缓存</code>，还有<code>浏览器自带的缓存机制</code>，即使我们什么也没有配置也自带的隐式缓存（<code>启发式缓存</code>）;</p><ul><li>减少向服务器请求的的次数，也减少了服务器的压力 ⭐⭐⭐</li><li>页面加载速度更快，增加用户体验 ⭐⭐⭐</li></ul><p>如果没有缓存机制，刷新页面的时候，不管是以什么样的形式刷新（前进/后退/普通刷新/强制刷新），那么每次浏览器都会去请求服务器的资源，想想是有多么的可怕，这样会大大的增加服务器的压力和带宽。</p><blockquote><p>所以浏览器为了解决这个问题，当第一个请求资源完成后，根据相应的缓存机制，将一些静态资源存储在本地磁盘当中，这样下次请求资源的时候，浏览器直接从本地缓存中读取文件，不需要再次发送请求。</p></blockquote><h2 id="浏览器刷新的各种情况分析" tabindex="-1">浏览器刷新的各种情况分析 <a class="header-anchor" href="#浏览器刷新的各种情况分析" aria-label="Permalink to &quot;浏览器刷新的各种情况分析&quot;">​</a></h2><p><img src="'+o+'" alt="medium-zoom"></p><p>这个如图弹框如何被打开的呢，打开控制台之后再右键刷新按钮即可。</p><h3 id="正常重新加载" tabindex="-1">正常重新加载 <a class="header-anchor" href="#正常重新加载" aria-label="Permalink to &quot;正常重新加载&quot;">​</a></h3><blockquote><p>方法：地址栏回车、页面链接跳转、打开新窗口/标签页、history前进后退，点击刷新按钮、页面右键重新加载、F5、ctrl+R</p></blockquote><p>执行上面这些刷新操作，如果缓存不过期，会使用缓存。</p><p>这样浏览器可以避免重新下载JavaScript文件，图像，文本文件等，直接读取缓存信息。</p><h3 id="硬性重新加载" tabindex="-1">硬性重新加载 <a class="header-anchor" href="#硬性重新加载" aria-label="Permalink to &quot;硬性重新加载&quot;">​</a></h3><blockquote><p>方法：点击硬性重新加载、Ctrl+F5、Ctrl+Shift+R、</p></blockquote><p>执行上面这些刷新操作，清除了关键位置的缓存；所有的资源，都会跳过缓存判断，发起真实的请求，从服务端拿资源。但本地的缓存资源(如disk里的缓存)并没有删除。<code>这种方式会在Request Header里添加Cache-Control:no-cache和Pragma: no-cache</code>，也是浏览器自己的行为。</p><h3 id="清空缓存并硬性重新加载" tabindex="-1">清空缓存并硬性重新加载 <a class="header-anchor" href="#清空缓存并硬性重新加载" aria-label="Permalink to &quot;清空缓存并硬性重新加载&quot;">​</a></h3><blockquote><p>方法：点击左上角的清空缓存并硬性重新加载</p></blockquote><p>这种方式，相当于先删除缓存（如 disk磁盘 和 memory内存 里的缓存），再执行硬性重新加载。</p><h2 id="缓存的位置" tabindex="-1">缓存的位置 <a class="header-anchor" href="#缓存的位置" aria-label="Permalink to &quot;缓存的位置&quot;">​</a></h2><ol><li>启动Chrome浏览器,在Chrome浏览器的地址栏输入Chrome:Version查看Chrome浏览器保存文件的位置。</li><li>在“我的电脑”中找到此路径。C:\\Users\\Administrator\\AppData\\Local\\Google\\Chrome\\User Data\\Default。</li><li>Chrome浏览器的两个主要的缓存文件夹是该目录下的Cache文件夹和Media Cache文件夹。一个保存着浏览器缓存的图片，文档格式等信息，一个保存着浏览器访问视频的记录。</li></ol><p><img src="'+p+'" alt="medium-zoom"></p><h2 id="如何查看请求资源的缓存策略" tabindex="-1">如何查看请求资源的缓存策略 <a class="header-anchor" href="#如何查看请求资源的缓存策略" aria-label="Permalink to &quot;如何查看请求资源的缓存策略&quot;">​</a></h2><p>如下图所示：</p><ul><li><code>Size</code>栏：disk cache 代表走磁盘缓存，memory cache 走内存缓存；</li><li><code>Cache-Control</code>栏：查看缓存策略，可以看到配置文件setting.js没有配置任何缓存策略</li></ul><p>此时没有配置任何缓存策略，但还是走了本地缓存，这就是下面要说的浏览器的默认缓存（启发式缓存）。</p><p><img src="'+i+'" alt="medium-zoom"></p><p>一开始是没有 <code>Cache-Control</code> 这一栏的，需要手动设置一下，在头部右键勾选上 Cache-Control 即可。</p><p><img src="'+l+'" alt="medium-zoom"></p><p>下图的资源则配置了<code>强缓存和协商缓存</code></p><p><img src="'+t+`" alt="medium-zoom"></p><h2 id="启发式缓存" tabindex="-1">启发式缓存 <a class="header-anchor" href="#启发式缓存" aria-label="Permalink to &quot;启发式缓存&quot;">​</a></h2><p>缓存的默认行为（即对于没有 Cache-Control 的响应）不是简单的“不缓存”，而是根据所谓的“<code>启发式缓存</code>”进行隐式缓存。</p><p>HTTP 旨在尽可能多地缓存，因此即使没有给出 Cache-Control，如果满足某些条件，响应也会被存储和重用。这称为<code>启发式缓存</code>。</p><div class="language- vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span>HTTP/1.1 200 OK</span></span>
<span class="line"><span>Content-Type: text/html</span></span>
<span class="line"><span>Content-Length: 1024</span></span>
<span class="line"><span>Date: Tue, 22 Feb 2022 22:22:22 GMT</span></span>
<span class="line"><span>Last-Modified: Tue, 22 Feb 2021 22:22:22 GMT</span></span>
<span class="line"><span>&lt;!doctype html&gt;</span></span>
<span class="line"><span>…</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br></div></div><p>22:22:22 GMT：北京时间比浏览器时间晚8小时</p><h3 id="缓存时间" tabindex="-1">缓存时间 <a class="header-anchor" href="#缓存时间" aria-label="Permalink to &quot;缓存时间&quot;">​</a></h3><blockquote><p>公式为：( Date - Last-Modified ) * 0.1</p></blockquote><ul><li><code>Date</code>：当前请求的时间</li><li><code>Last-Modified</code>：服务器中资源最后被修改的日期</li></ul><p>MDN：试探性地知道，整整一年没有更新的内容在那之后的一段时间内不会更新。因此，客户端存储此响应（尽管缺少 max-age）并重用它一段时间。复用多长时间取决于实现，但规范建议存储后大约 10%（在本例中为 0.1 年）的时间。</p><p>也就是说，如果十天没有更新的资源，会缓存一天的时间，在这段时间内浏览器请求走的都是本地缓存，超出这个时间则向服务器请求资源。</p><blockquote><p>启发式缓存是在 Cache-Control 被广泛采用之前出现的一种解决方法，基本上所有响应都应明确指定 Cache-Control 标头。</p></blockquote><h3 id="彻底理解" tabindex="-1">彻底理解 <a class="header-anchor" href="#彻底理解" aria-label="Permalink to &quot;彻底理解&quot;">​</a></h3><p>这里会比较绕，这个默认缓存的时间到底会缓存多久？是如何进行判断的？</p><h4 id="相差较长时间" tabindex="-1">相差较长时间 <a class="header-anchor" href="#相差较长时间" aria-label="Permalink to &quot;相差较长时间&quot;">​</a></h4><p>我们查看一个配置文件的缓存，是没有配置缓存策略的，则默认启发式缓存；</p><p><img src="`+c+'" alt="medium-zoom"></p><p>再看下该文件响应头中的 <code>Date</code> 和 <code>Last-Modified</code> 信息，这里的这两个时间是决定下次刷新页面之后，是请求服务器还是走本地缓存的关键因素，注意是下一次请求！</p><p><img src="'+r+'" alt="medium-zoom"></p><p>此时当前这一次请求的响应头 （Date - Last-Modified） * 0.1 是决定该文件缓存时间的长短，也就是 （2023-04-13 - 2023-03-09） 等于35天（具体时间时分秒先不计算），再乘以0.1，则当前文件则会缓存大约3.5天的时间，用户下次请求这个文件的时候，在3.5天之内请求则直接走本地缓存获取，超过3.5天去请求当前文件，则会去请求服务器的资源，不再走缓存！</p><blockquote><p>在 Last-Modified （文件最后修改时间）不变的前提下，随着时间的推移，该资源缓存的时间会越来越长~</p></blockquote><h4 id="相差较短时间" tabindex="-1">相差较短时间 <a class="header-anchor" href="#相差较短时间" aria-label="Permalink to &quot;相差较短时间&quot;">​</a></h4><p>站在开发者的角度来解析这个问题，当我们自己在做测试启发式缓存的时候，容易出现错乱，就是感受不到启发式缓存的效果，不知道你们有没有遇到过。只要掌握上面的计算方法，一步步拆分，就可以轻松的识别和判断启发式缓存。</p><p><img src="'+d+'" alt="medium-zoom"></p><p>再来看，还是刚才那个文件，在服务器修改了文件的内容，Date 和 Last-Modified 只相差27秒，也就说当前文件只会缓存2.7秒。因为我们刚刚修改了服务器资源内容，需要强制刷新获取的最新文件，是发请求到服务器的，没有走本地缓存，所以这次是看不到效果的，正常是不能用强制刷新的；想要看到效果，在做测试的时候肯定会再次去修改服务器中该文件的内容，然后用普通刷新去看当前文件到底是不是走启发式缓存。</p><p><img src="'+h+'" alt="medium-zoom"></p><p>当再次修改服务器资源后刷新页面，如上图所示，发现 config.js 还是请求的服务器资源！没有走缓存！如果走缓存的话，Size栏是disk cache 或者 memory cache，这是为什么呢？因为之前上次请求资源的Date 和 Last-Modified决定下次请求是否走缓存，上次请求资源只缓存了2.7s，我们在服务器改了内容再返回页面去刷新查看结果的这个过程超过了2.7s就会重新请求服务器资源！</p><blockquote><p>所以说，我们做测试的时候一定注意尽可能的把Date 和 Last-Modified时间拉大一点，才能看出效果。</p></blockquote><p>此时，我们把时间拉的稍微大一点，再去修改服务器中的资源，（49 - 33） * 0.1 大约会缓存一分半时间；</p><p><img src="'+m+'" alt="medium-zoom"></p><p>在这一分半时间内，去服务器修改资源之后再去刷新页面，发现此时此刻 config.js 走的就是缓存了，我们服务器虽然修改了 config.js 里面的内容，但是在这个缓存的时间内仍然获取不到最新的内容！所以说系统的配置文件要配置协商缓存。</p><p><img src="'+u+'" alt="medium-zoom"></p><h2 id="cache-control" tabindex="-1">Cache-Control <a class="header-anchor" href="#cache-control" aria-label="Permalink to &quot;Cache-Control&quot;">​</a></h2><p>在HTTP/1.1中，<code>Cache-Control</code>是最重要的规则，主要用于控制网页缓存，主要取值为：</p><p><img src="'+b+'" alt="medium-zoom"></p><p>这里主要解读下max-age=0，no-cache，max-age=10086，no-store这几项：</p><h3 id="协商缓存" tabindex="-1">协商缓存 <a class="header-anchor" href="#协商缓存" aria-label="Permalink to &quot;协商缓存&quot;">​</a></h3><div class="language- vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span>Cache-Control : no-cache</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br></div></div><p><code>no-cache</code>：表示协商缓存，每次请求还是会和服务器去比对资源有没有修改（也就是拿ETag或者Last-Modified进行比较），如果资源没改变，则直接返回304状态码（Not Modified），说明无需再次传输请求的内容，也就是说可以使用缓存的内容；如果资源改变，则返回200状态码，并且返回新的资源；</p><div class="language- vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span>Cache-Control : max-age=0,must-revalidate</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br></div></div><p><code>max-age=0 和 must-revalidate</code> 的组合与 no-cache 具有相同的含义。但是这是为了兼容处理解决HTTP/1.1 之前的许多实现无法处理 no-cache 的情况，但是现在基本都是HTTP/1.1，所以没有理由再用这种方法了，转而直接用 no-cache 则更好！</p><blockquote><p>为确保默认情况下始终传输最新版本的资源，通常的做法是让默认的 Cache-Control 值包含 no-cache</p></blockquote><p>另外，如果服务实现了 cookie 或其他登录方式，并且内容是为每个用户个性化的，那么也必须提供 private，以防止与其他用户共享：</p><div class="language- vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span>Cache-Control: no-cache, private</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br></div></div><h3 id="强缓存" tabindex="-1">强缓存 <a class="header-anchor" href="#强缓存" aria-label="Permalink to &quot;强缓存&quot;">​</a></h3><div class="language- vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span>Cache-Control : max-age=10086</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br></div></div><p><code>max-age=10086</code>：表示强缓存，服务器直接告诉浏览器10086秒不要来烦我，你直接从本地缓存获取资源吧；如果是硬性重新加载，浏览器则表示：我就要向你服务器重新获取资源，你能咋滴吧，不还得乖乖返回给我（狗头）；</p><h3 id="不缓存" tabindex="-1">不缓存 <a class="header-anchor" href="#不缓存" aria-label="Permalink to &quot;不缓存&quot;">​</a></h3><div class="language- vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span>Cache-Control : no-store</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br></div></div><p><code>no-store</code>：表示不缓存，浏览器自带的启发式缓存都不生效了，慎用！</p><h3 id="expires-和-cache-control-的差别" tabindex="-1">Expires 和 Cache-Control 的差别 <a class="header-anchor" href="#expires-和-cache-control-的差别" aria-label="Permalink to &quot;Expires 和 Cache-Control 的差别&quot;">​</a></h3><p>其实这两者差别不大，区别就在于 <code>Expires</code> 是<code>http1.0</code>的产物，<code>Cache-Control</code>是<code>http1.1</code>的产物，两者同时存在的话，<code>Cache-Control优先级高于Expires</code>；在某些不支持HTTP1.1的环境下，Expires就会发挥用处。所以Expires其实是过时的产物，现阶段它的存在只是一种兼容性的写法。</p><h2 id="启发式缓存和强缓存的区别" tabindex="-1">启发式缓存和强缓存的区别 <a class="header-anchor" href="#启发式缓存和强缓存的区别" aria-label="Permalink to &quot;启发式缓存和强缓存的区别&quot;">​</a></h2><ul><li><code>启发式缓存</code>的缓存时间不是可控的，是根据用户请求的 Date 和 Last-Modified决定缓存的时间；</li><li><code>强缓存</code>是只要在设置的时间范围内，缓存一直都生效，除非资源变动。</li></ul><h2 id="no-stroe-丢失了什么" tabindex="-1">no-stroe 丢失了什么 <a class="header-anchor" href="#no-stroe-丢失了什么" aria-label="Permalink to &quot;no-stroe 丢失了什么&quot;">​</a></h2><p>你可能认为添加 <code>no-store</code> 只是不进行强缓存和协商缓存了。</p><p>但是，连浏览器自带的启发式缓存策略都没了，所以不建议随意授予 no-store，因为你失去了 HTTP 和浏览器所拥有的许多优势，包括浏览器的后退/前进缓存。</p><p>因此，要获得 Web 平台的全部功能集的优势，最好不要轻易设置 no-store。</p><h2 id="避免重新验证immutable" tabindex="-1">避免重新验证immutable <a class="header-anchor" href="#避免重新验证immutable" aria-label="Permalink to &quot;避免重新验证immutable&quot;">​</a></h2><p>永远不会改变的内容应该被赋予一个较长的 <code>max-age</code>；</p><p>但是，当用户重新加载时，即使服务器知道内容是不可变的，也会发送重新验证请求。</p><p>为了防止这种情况，<code>immutable</code> 指令可用于明确指示不需要重新验证，因为内容永远不会改变。</p><div class="language- vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span>Cache-Control: max-age=10086, immutable</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br></div></div><h2 id="缓存破坏" tabindex="-1">缓存破坏 <a class="header-anchor" href="#缓存破坏" aria-label="Permalink to &quot;缓存破坏&quot;">​</a></h2><p><code>缓存破坏</code>是一种通过在内容更改时更改 URL 来使响应在很长一段时间内可缓存的技术。该技术可以应用于所有子资源，例如图像。简单来说就是index.html里的所有子资源如js、css、图片等，在部署时，通过url的变化，使重新获取新的资源。</p><p>当向服务器部署一个前端资源包，虽然把包放到了服务器中，浏览器是如何立马就能知道这是新的资源，从而去获取这些新的资源，而不是去获取浏览器缓存的资源呢？</p><p>如何破坏缓存:</p><ul><li>部署时在文件名中带入Hash值👍</li></ul><p>这里重点说一下Hash值类型，Vue的生产环境打包采用的也是这种方式；在静态资源文件末尾加上Hash值，保证当前打的包和服务器之前部署的文件区分开来，避免文件名一致，而导致虽然部署成功了，浏览器请求的还是缓存的资源！</p><p><img src="'+g+'" alt="medium-zoom"></p><blockquote><p>缓存是根据它们的 URL 来区分资源，因此如果在更新资源时 URL 发生变化，缓存将不会再次被重用。</p></blockquote><p>这些打包好的js、css、img等静态资源最终会在index.html中引用，在访问一个网站的时候，首先会请求index.html，再去请求 index.html 里面的引用，此时html中引用的 js 等文件，和服务器中 html 引用的 js 等文件已经不是同一个文件了，因为文件名变了（加了Hash值），所以不会走本地缓存。</p><h2 id="站在用户角度" tabindex="-1">站在用户角度 <a class="header-anchor" href="#站在用户角度" aria-label="Permalink to &quot;站在用户角度&quot;">​</a></h2><p>如果部署了资源，但是刷新页面没有获取到最新的版本内容，我们第一反应是清空浏览器缓存，但是我们不是用户，也不能要求用户每次去清空缓存，户刷新页面大部分是正常重新加载里面的一些方式方法，所以遇到这种问题我们的解决方法如下：</p><h3 id="对于不能加hash值的资源-比如index-html、setting-js配置文件" tabindex="-1">对于不能加Hash值的资源：比如index.html、setting.js配置文件 <a class="header-anchor" href="#对于不能加hash值的资源-比如index-html、setting-js配置文件" aria-label="Permalink to &quot;对于不能加Hash值的资源：比如index.html、setting.js配置文件&quot;">​</a></h3><p>使用 <code>Cache-Control: no-cache</code>协商缓存，使浏览器每次都请求服务器，然后配合 ETag 或者 Last-Modified 来验证资源是否有效，来保证获取的是最新的文件；</p><p>拿setting.js举例：此时浏览器获取的内容为</p><p><img src="'+C+'" alt="medium-zoom"></p><p>此时正好赶上一个需求，需要把页面所有内容设置为灰色，因为事先在配置文件里面配置了，所以此时只需要在setting.js中把 gray 改为 true 即可，如下图所示，这个文件是没有设置缓存策略的，走的默认缓存，获取的是内存中【memory cache】的缓存；</p><p><img src="'+k+'" alt="medium-zoom"></p><p>现在修改一下数据库的该文件信息，进行保存</p><p><img src="'+q+'" alt="medium-zoom"></p><p>再回到浏览器执行用户常用的正常重新加载式刷新页面，发现页面并没有任何变化，查看该文件信息，发现还是获取的之前信息，并没有重新获取服务器修改过的资源信息！因为没有配置相应的缓存策略，用户使用起来就会有问题了，获取不到最新的内容。</p><p><img src="'+_+`" alt="medium-zoom"></p><p>这里也涉及到启发式缓存时间的问题，如果在服务器多次改变该文件内容，并且页面刷新频繁（自己测试的时候会频繁刷新，注意 <code>Response Header 中的 Date 和 Last-Modified</code> 时间的间隔，如果间隔时间很短，短到只有几秒钟，那么你修改配置文件之后，此时再刷新页面就会去请求服务器资源，而不是走缓存了；但是真实用户的 Date 和 Last-Modified 时间间隔不会这么短，默认缓存时间较长），缓存时间就会缩的非常短，让你产生没有配置协商缓存的话，页面也会同步更新，但是这样是有问题的！</p><blockquote><p>所以对于这些文件要配置协商缓存，保证每次获取的都是最新的文件！</p></blockquote><h3 id="对于有hash值的资源-静态文件js、css" tabindex="-1">对于有Hash值的资源：静态文件js、css <a class="header-anchor" href="#对于有hash值的资源-静态文件js、css" aria-label="Permalink to &quot;对于有Hash值的资源：静态文件js、css&quot;">​</a></h3><p>使用 <code>Cache-Control</code> 配置一个很大的 <code>max-age=31536000</code> (一年)；</p><p>当重新打的包是带有Hash值的，所以不怕这个强缓存，管它之前缓存的是一年、两年还是十年，当重新部署到服务器的时候，浏览器就得加载最新部署的资源。</p><h2 id="最佳实践" tabindex="-1">最佳实践 <a class="header-anchor" href="#最佳实践" aria-label="Permalink to &quot;最佳实践&quot;">​</a></h2><p>使用<code>Nginx</code>设置缓存策略</p><p>为什么说 index.html 和 setting.js 要设置协商缓存呢？因为他们的文件名是不可能带hash的，所以要设置协商缓存每次去验证资源是否有效。</p><p>在 <code>nginx.conf</code> 中配置以下内容：</p><div class="language- vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span>server {</span></span>
<span class="line"><span>    # html设置成协商缓存或者不缓存</span></span>
<span class="line"><span>    location ~* \\.(html)$ {</span></span>
<span class="line"><span>        # 关闭访问日志</span></span>
<span class="line"><span>        access_log off;</span></span>
<span class="line"><span>        # 进行协商缓存 保证每次调取最新的数据</span></span>
<span class="line"><span>        add_header  Cache-Control  no-cache;</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span>    </span></span>
<span class="line"><span>    # 特定文件设置强缓存</span></span>
<span class="line"><span>    location ~* \\.(css|js|png|jpg|jpeg|gif|gz|svg|mp4|ogg|ogv|webm|htc|xml|woff)$ {</span></span>
<span class="line"><span>        add_header  Cache-Control  max-age=360000; # 默认4天</span></span>
<span class="line"><span>        #add_header Cache-Control no-store; # 不缓存 但是不推荐 浏览器自带的优化功能用不了了</span></span>
<span class="line"><span>        #add_header Cache-Control no-cache; # 协商缓存 保证每次调取最新的数据</span></span>
<span class="line"><span></span></span>
<span class="line"><span>        # 系统配置文件setting.js，进行协商缓存 保证每次调取最新的数据</span></span>
<span class="line"><span>        if ($request_filename ~* \\.*setting.(js)$) {</span></span>
<span class="line"><span>            add_header Cache-Control no-cache;</span></span>
<span class="line"><span>        }</span></span>
<span class="line"><span>    }   </span></span>
<span class="line"><span>}</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br></div></div><p>设置好后，重启nginx服务，强制刷新再普通刷新页面，会发现资源已经根据 nginx 配置了对应的缓存策略，Size栏也能看到是获取的内存中的缓存。</p><p><img src="`+x+'" alt="medium-zoom"></p>',125),P=[f];function T(j,y,z,M,L,H){return s(),e("div",null,P)}const E=a(v,[["render",T]]);export{w as __pageData,E as default};
