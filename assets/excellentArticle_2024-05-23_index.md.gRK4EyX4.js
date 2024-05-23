import{_ as s,c as n,o as a,a5 as e,bJ as p,bK as l,bL as r,bM as i,bN as c,bO as t,bP as o,bQ as d,bR as b,bS as m}from"./chunks/framework.BDI1X2MA.js";const S=JSON.parse('{"title":"前端需要知道的缓存知识总结","description":"","frontmatter":{},"headers":[],"relativePath":"excellentArticle/2024-05-23/index.md","filePath":"excellentArticle/2024-05-23/index.md","lastUpdated":1716449060000}'),u={name:"excellentArticle/2024-05-23/index.md"},h=e(`<h1 id="前端需要知道的缓存知识总结" tabindex="-1">前端需要知道的缓存知识总结 <a class="header-anchor" href="#前端需要知道的缓存知识总结" aria-label="Permalink to &quot;前端需要知道的缓存知识总结&quot;">​</a></h1><p><strong>引言📇</strong></p><p>HTTP缓存是一种用于提高网站性能和减少带宽使用的技术。当用户访问一个网页时，浏览器会下载页面上的所有资源（如HTML、CSS、JavaScript等），这些资源会占用大量的带宽和时间。为了减少这些资源的加载时间，HTTP缓存机制被引入。📚︎</p><p>缓存分为<strong>强缓存</strong>和<strong>协商缓存</strong>两种，强缓存不能缓存地址栏访问的文件，协商缓存可以缓存地址栏访问的文件。</p><h2 id="_1、强缓存🛅" tabindex="-1"><strong>1、强缓存🛅</strong> <a class="header-anchor" href="#_1、强缓存🛅" aria-label="Permalink to &quot;**1、强缓存🛅**&quot;">​</a></h2><p>由服务器设置过期时间，在该时间到期之前，浏览器会直接从本地缓存中获取资源。</p><p><strong>强缓存</strong>的实现方式有两种：<code>Expires</code>和<code>Cache-Control</code>。</p><h3 id="_1-1、expires❤️❤️🤍🤍🤍" tabindex="-1"><strong>1.1、Expires❤️❤️🤍🤍🤍</strong> <a class="header-anchor" href="#_1-1、expires❤️❤️🤍🤍🤍" aria-label="Permalink to &quot;**1.1、Expires❤️❤️🤍🤍🤍**&quot;">​</a></h3><p><code>Expires</code> 是 HTTP 缓存机制中实现强缓存的一种方式，它通过在响应头部中加入一个过期时间来控制缓存。<code>Expires</code> 的值是一个日期，格式为：<code>Wed, 21 Oct 2015 07:28:00 GMT</code>。它表示该资源的过期时间。当浏览器再次请求该资源时，会判断是否在该过期时间内，如果是则直接从缓存中获取资源，否则重新向服务器请求。</p><p>要设置 <code>Expires</code> 头部，需要在服务器端进行配置。例如，在 Nginx 中可以使用expires指令来设置过期时间：</p><div class="language- vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span>location / {</span></span>
<span class="line"><span>    expires 1h;</span></span>
<span class="line"><span>}</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br></div></div><blockquote><p>注意⚡⚡：由于Expires是基于客户端时间计算的，如果客户端的时间与服务器的时间不一致，则可能会影响缓存效果。</p></blockquote><h3 id="_1-2、cache-control❤️❤️❤️🤍🤍" tabindex="-1"><strong>1.2、Cache-Control❤️❤️❤️🤍🤍</strong> <a class="header-anchor" href="#_1-2、cache-control❤️❤️❤️🤍🤍" aria-label="Permalink to &quot;**1.2、Cache-Control❤️❤️❤️🤍🤍**&quot;">​</a></h3><p><code>Cache-Control</code> 是通过在响应头部中加入 <code>Cache-Control</code> 字段，并设置max-age值来表示该资源在多少秒内有效（即缓存的最大时长）。</p><p><code>Cache-Control</code>响应头的最常用格式为：</p><div class="language- vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span>Cache-Control: max-age=&lt;seconds&gt; // seconds 是缓存的时间，单位是秒</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br></div></div><p>当浏览器请求资源得到的响应头中带有 <code>Cache-Control</code> 响应头时，浏览器会将该资源缓存到本地。在下一次访问该资源时，同时满足下述条件，浏览器就会使用本地资源（即缓存），而不重新去服务器请求该资源：</p><ol><li>缓存时间未过期</li><li>URL未发生变化</li><li>请求头中没有 <code>Cache-Control: no-cache</code> 或 <code>Pragma: no-cache</code> 这两个信息（强制刷新会在请求头中添加 <code>Cache-Control: no-cache</code>）</li></ol><blockquote><p>注意⚡⚡：直接通过浏览器的地址栏访问的资源缓存会失效（跟强制刷新一样会在请求头中添加 <code>Cache-Control: no-cache</code>）</p></blockquote><p>接下来我们通过一个简单的页面来实践一下：</p><p>目录结构，我们准备两个文件 <code>index.js</code> 和 <code>index.html</code> ，再准备两张图片：</p><div class="language- vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span>http</span></span>
<span class="line"><span>|--- index.js</span></span>
<span class="line"><span>|--- index.html</span></span>
<span class="line"><span>|--- 1.jpg</span></span>
<span class="line"><span>|___ 2.jpg</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br></div></div><p><strong>index.js</strong></p><p>提供一个 node 服务，用于返回浏览器请求的资源（index.html 和图片）</p><div class="language- vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span>// index.js</span></span>
<span class="line"><span>const http = require(&#39;http&#39;)</span></span>
<span class="line"><span>const fs = require(&#39;fs&#39;)</span></span>
<span class="line"><span>const path = require(&#39;path&#39;)</span></span>
<span class="line"><span></span></span>
<span class="line"><span>const server = http.createServer((req, res) =&gt; {</span></span>
<span class="line"><span></span></span>
<span class="line"><span>  let filePath = path.resolve(__dirname, req.url === &#39;/&#39; ? \`index.html\` : &#39;1.jpg&#39;)</span></span>
<span class="line"><span></span></span>
<span class="line"><span>  res.writeHead(200, {</span></span>
<span class="line"><span>    &#39;Content-Type&#39;: req.url === &#39;/&#39; ? &#39;text/html; charset=utf-8&#39; : &#39;image/png&#39;,</span></span>
<span class="line"><span>    &#39;Cache-Control&#39;: &#39;max-age=86400&#39;, // 缓存一天</span></span>
<span class="line"><span>  })</span></span>
<span class="line"><span>  const fileStream = fs.createReadStream(filePath)</span></span>
<span class="line"><span>  return fileStream.pipe(res)</span></span>
<span class="line"><span>})</span></span>
<span class="line"><span></span></span>
<span class="line"><span>server.on(&#39;clientError&#39;, (err, socket) =&gt; {</span></span>
<span class="line"><span>  socket.end(&#39;HTTP/1.1 400 Bad Request\\r\\n\\r\\n&#39;)</span></span>
<span class="line"><span>})</span></span>
<span class="line"><span></span></span>
<span class="line"><span>server.listen(8080, () =&gt; {</span></span>
<span class="line"><span>  console.log(\`opened server on http://localhost:\${server.address().port}\`)</span></span>
<span class="line"><span>})</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br><span class="line-number">22</span><br><span class="line-number">23</span><br><span class="line-number">24</span><br></div></div><p><strong>index.html</strong></p><p>一个简单的页面，包含一张图片，因为我们会直接通过浏览器的地址栏访问 <code>html</code>，所以 <code>html</code> 的缓存策略会失效。这里我们判断缓存是否生效是通过页面中的图片去判断的。</p><div class="language- vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span>&lt;!-- index.html --&gt;</span></span>
<span class="line"><span>&lt;!DOCTYPE html&gt;</span></span>
<span class="line"><span>&lt;html lang=&quot;en&quot;&gt;</span></span>
<span class="line"><span>&lt;head&gt;</span></span>
<span class="line"><span>  &lt;meta charset=&quot;UTF-8&quot;&gt;</span></span>
<span class="line"><span>  &lt;meta http-equiv=&quot;X-UA-Compatible&quot; content=&quot;IE=edge&quot;&gt;</span></span>
<span class="line"><span>  &lt;meta name=&quot;viewport&quot; content=&quot;width=device-width, initial-scale=1.0&quot;&gt;</span></span>
<span class="line"><span>  &lt;title&gt;Hello World&lt;/title&gt;</span></span>
<span class="line"><span>&lt;/head&gt;</span></span>
<span class="line"><span>&lt;body&gt;</span></span>
<span class="line"><span>  &lt;h1&gt;Hello World!&lt;/h1&gt;</span></span>
<span class="line"><span>  &lt;!-- 别忘记替换成你的图片名称 --&gt;</span></span>
<span class="line"><span>  &lt;img src=&quot;./1.jpg&quot; title=&quot;123&quot;&gt;</span></span>
<span class="line"><span>&lt;/body&gt;</span></span>
<span class="line"><span>&lt;/html&gt;</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br></div></div><p>然后随便准备两张图片就可以了，我们在项目的跟目录使用 <code>node index.js</code> 来启动项目。如下图提示，就表示启动成功，然后我们通过浏览器访问 <code>http://localhost:8080/</code> 就能看到我们的页面了。</p><p><img src="`+p+'" alt="medium-zoom">image.png</p><p><strong>首次请求</strong> 我们主要看图片的请求头跟响应头就行（因为html的缓存会失效）。</p><p><img src="'+l+'" alt="medium-zoom">image.png</p><p><img src="'+r+'" alt="medium-zoom">image.png</p><p><strong>刷新页面（非强制刷新）</strong></p><p>第二次的请求可以看到请求的 <code>Size</code> 变成了 <code>memory cache</code>，并且 <code>Time</code> 也变为了 0。再进一步看请求头和响应头，请求头中的 <code>Cache-Control: no-cache</code> 属性没有了，并且浏览器会给出一个警告：<code>Provisional headers are shown. Disable cache to see full headers.</code>。大致意思就是当前使用的是缓存的临时文件，禁用缓存后才可以查看完整的请求头。</p><p><img src="'+i+'" alt="medium-zoom">image.png</p><p><img src="'+c+'" alt="medium-zoom">image.png</p><p><strong>验证缓存</strong></p><p>上述的方法可能并不一定让你相信我们使用的是缓存文件，而不是重新请求的资源文件。</p><p>一开始我们准备了两张图片，现在使用的是 <code>1.jpg</code>，还有一个 <code>2.jpg</code>，我们把 <code>1.jpg</code> 删除了，然后把<code>2.jpg</code> 改名成 <code>1.jpg</code>，然后刷新页面（非强制刷新），就会发现虽然我们图片更改了，但是图片并不是我们后面改名的那个图片，还是之前的图片。</p><p><img src="'+t+'" alt="medium-zoom">image.png</p><p>强制刷新后就能看到，我们替换的图片生效了，请求头中也带上了 <code>Cache-Control: no-cache</code> 属性。</p><p><img src="'+o+`" alt="medium-zoom">image.png</p><h2 id="_2、协商缓存" tabindex="-1"><strong>2、协商缓存</strong> <a class="header-anchor" href="#_2、协商缓存" aria-label="Permalink to &quot;**2、协商缓存**&quot;">​</a></h2><p>利用浏览器和服务器之间的通信来确定是否需要重新获取资源。</p><p>协商缓存有两种实现方式：<code>If-Modified-Since</code> 和 <code>ETag</code></p><p>当浏览器第一次请求资源时，服务器会返回该资源的 <code>ETag</code> 值和 <code>Last-Modified</code> 时间。当浏览器再次请求该资源时，它会将这些值作为请求头部的 <code>If-Modified-Since</code> 和 <code>If-None-Match</code> 字段发送给服务器。服务器会比较这些值与资源的当前状态，如果资源没有发生变化，服务器返回 <code>304 Not Modified</code> 响应，告诉浏览器可以使用缓存的资源。</p><p>如果资源已经发生了变化，服务器会返回新的资源，并更新 <code>ETag</code> 和 <code>Last-Modified</code> 。</p><h3 id="_2-1、if-modified-since-❤️❤️❤️❤️🤍" tabindex="-1"><strong>2.1、If-Modified-Since ❤️❤️❤️❤️🤍</strong> <a class="header-anchor" href="#_2-1、if-modified-since-❤️❤️❤️❤️🤍" aria-label="Permalink to &quot;**2.1、If-Modified-Since ❤️❤️❤️❤️🤍**&quot;">​</a></h3><p>利用响应头的 <code>Last-Modified</code> 来设置缓存，并在下次请求的请求头中携带 <code>If-Modified-Since</code> 来判断该资源是否发生变化，如果发生变化则返回新的资源，并更新 <code>Last-Modified</code> 属性，如果没有发生变化，则返回 <code>304</code> 跟空的 <code>body</code>。</p><p>对强缓存的例子稍微修改一下</p><div class="language- vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span>// index.js</span></span>
<span class="line"><span>const http = require(&#39;http&#39;)</span></span>
<span class="line"><span>const fs = require(&#39;fs&#39;)</span></span>
<span class="line"><span>const path = require(&#39;path&#39;)</span></span>
<span class="line"><span></span></span>
<span class="line"><span>const server = http.createServer((req, res) =&gt; {</span></span>
<span class="line"><span>  let filePath = path.resolve(__dirname, req.url === &#39;/&#39; ? \`index.html\` : &#39;1.jpg&#39;)</span></span>
<span class="line"><span>  const stat = fs.statSync(filePath)</span></span>
<span class="line"><span>  const lastModified = stat.mtime.toUTCString()</span></span>
<span class="line"><span>  const header = {</span></span>
<span class="line"><span>    &#39;Content-Type&#39;: req.url === &#39;/&#39; ? &#39;text/html; charset=utf-8&#39; : &#39;image/png&#39;,</span></span>
<span class="line"><span>    &#39;Last-Modified&#39;: lastModified</span></span>
<span class="line"><span>  }</span></span>
<span class="line"><span>  // 判断资源是否发生变化</span></span>
<span class="line"><span>  if (req.headers[&#39;if-modified-since&#39;] === lastModified) {</span></span>
<span class="line"><span>    res.writeHead(304, header)</span></span>
<span class="line"><span>    res.end()</span></span>
<span class="line"><span>  } else {</span></span>
<span class="line"><span>    res.writeHead(200, header)</span></span>
<span class="line"><span>    const fileStream = fs.createReadStream(filePath)</span></span>
<span class="line"><span>    return fileStream.pipe(res)</span></span>
<span class="line"><span>  }</span></span>
<span class="line"><span>})</span></span>
<span class="line"><span></span></span>
<span class="line"><span>server.on(&#39;clientError&#39;, (err, socket) =&gt; {</span></span>
<span class="line"><span>  socket.end(&#39;HTTP/1.1 400 Bad Request\\r\\n\\r\\n&#39;)</span></span>
<span class="line"><span>})</span></span>
<span class="line"><span></span></span>
<span class="line"><span>server.listen(8080, () =&gt; {</span></span>
<span class="line"><span>  console.log(\`opened server on http://localhost:\${server.address().port}\`)</span></span>
<span class="line"><span>})</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br><span class="line-number">22</span><br><span class="line-number">23</span><br><span class="line-number">24</span><br><span class="line-number">25</span><br><span class="line-number">26</span><br><span class="line-number">27</span><br><span class="line-number">28</span><br><span class="line-number">29</span><br><span class="line-number">30</span><br><span class="line-number">31</span><br></div></div><p><strong>首次请求</strong></p><p>响应头携带 <code>Last-Modified: Mon, 05 Jun 2023 08:57:17 GMT</code> 属性，告诉浏览器这个文件需要缓存。</p><p><img src="`+d+'" alt="medium-zoom">image.png</p><p><strong>刷新页面（非强制刷新）</strong></p><p>第二次请求，响应状态码变为 <code>304</code>，并在请求头中携带 <code>If-Modified-Since: Mon, 05 Jun 2023 08:57:17 GMT</code> 属性，表示浏览器使用缓存文件。</p><p><img src="'+b+'" alt="medium-zoom">image.png</p><p><strong>改变html文件</strong></p><p>把 html 中 的 <code>Hello World!</code> 改为 <code>Web Html</code>，并刷新页面（非强制刷新），发现响应状态码变为 <code>200</code> ，并且更新了页面和响应头的 <code>Last-Modified</code> 属性。</p><p><img src="'+m+`" alt="medium-zoom">image.png</p><blockquote><p>注意⚡⚡：如果资源的修改时间只精确到秒，而不是毫秒，可能会导致缓存失效。此外，如果服务器上的资源被修改了，但修改时间没有更新，也会导致缓存失效</p></blockquote><h3 id="_2、etag-❤️❤️❤️❤️❤️" tabindex="-1"><strong>2、ETag ❤️❤️❤️❤️❤️</strong> <a class="header-anchor" href="#_2、etag-❤️❤️❤️❤️❤️" aria-label="Permalink to &quot;**2、ETag ❤️❤️❤️❤️❤️**&quot;">​</a></h3><p><code>ETag</code> 基本上与 <code>If-Modified-Since</code> 一致， 利用响应头的 <code>Etag</code> 来设置缓存，并在下次请求的请求头中携带 <code>if-none-match</code> 来判断该资源是否发生变化，如果发生变化则返回新的资源，并更新 <code>Etag</code> 属性，如果没有发生变化，则返回 <code>304</code> 跟空的 <code>body</code>。</p><div class="language- vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span>const http = require(&#39;http&#39;)</span></span>
<span class="line"><span>const fs = require(&#39;fs&#39;)</span></span>
<span class="line"><span>const path = require(&#39;path&#39;)</span></span>
<span class="line"><span>const crypto = require(&#39;crypto&#39;)</span></span>
<span class="line"><span></span></span>
<span class="line"><span>const server = http.createServer((req, res) =&gt; {</span></span>
<span class="line"><span>  let filePath = path.resolve(__dirname, req.url === &#39;/&#39; ? \`index.html\` : &#39;1.jpg&#39;)</span></span>
<span class="line"><span>  const fileContent = fs.readFileSync(filePath)</span></span>
<span class="line"><span>  const hash = crypto.createHash(&#39;md5&#39;).update(fileContent).digest(&#39;hex&#39;)</span></span>
<span class="line"><span>  const etag = \`&quot;\${hash}&quot;\` // etag需要加双引号</span></span>
<span class="line"><span>  const header = {</span></span>
<span class="line"><span>    &#39;Content-Type&#39;: req.url === &#39;/&#39; ? &#39;text/html; charset=utf-8&#39; : &#39;image/png&#39;,</span></span>
<span class="line"><span>    &#39;Etag&#39;: etag</span></span>
<span class="line"><span>  }</span></span>
<span class="line"><span>  if (req.headers[&#39;if-none-match&#39;] === etag) {</span></span>
<span class="line"><span>    res.writeHead(304, header)</span></span>
<span class="line"><span>    res.end()</span></span>
<span class="line"><span>  } else {</span></span>
<span class="line"><span>    res.writeHead(200, header)</span></span>
<span class="line"><span>    const fileStream = fs.createReadStream(filePath)</span></span>
<span class="line"><span>    return fileStream.pipe(res)</span></span>
<span class="line"><span>  }</span></span>
<span class="line"><span>})</span></span>
<span class="line"><span></span></span>
<span class="line"><span>server.on(&#39;clientError&#39;, (err, socket) =&gt; {</span></span>
<span class="line"><span>  socket.end(&#39;HTTP/1.1 400 Bad Request\\r\\n\\r\\n&#39;)</span></span>
<span class="line"><span>})</span></span>
<span class="line"><span></span></span>
<span class="line"><span>server.listen(8080, () =&gt; {</span></span>
<span class="line"><span>  console.log(\`opened server on http://localhost:\${server.address().port}\`)</span></span>
<span class="line"><span>})</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br><span class="line-number">22</span><br><span class="line-number">23</span><br><span class="line-number">24</span><br><span class="line-number">25</span><br><span class="line-number">26</span><br><span class="line-number">27</span><br><span class="line-number">28</span><br><span class="line-number">29</span><br><span class="line-number">30</span><br><span class="line-number">31</span><br></div></div><p>这里的测试证明就不写，不然这文章的字数就太水了，如果你们有兴趣可以自己尝试一下</p><p>原文：<a href="https://juejin.cn/post/7241095368179957820" target="_blank" rel="noreferrer">https://juejin.cn/post/7241095368179957820</a></p><p>作者：——树深遇鹿</p>`,68),g=[h];function f(v,_,q,C,x,k){return a(),n("div",null,g)}const P=s(u,[["render",f]]);export{S as __pageData,P as default};
