import{_ as e,c as r,a as t,a5 as a,o as i,a6 as o,a7 as l,a8 as h,a9 as s,aa as p,ab as n,ac as d}from"./chunks/framework.CkMy4b1Q.js";const T=JSON.parse('{"title":"","description":"","frontmatter":{},"headers":[],"relativePath":"excellentArticle/2024-04-12/index.md","filePath":"excellentArticle/2024-04-12/index.md","lastUpdated":1712832632000}'),c={name:"excellentArticle/2024-04-12/index.md"},m=a('<h2 id="_2024-04-11" tabindex="-1">2024-04-11 <a class="header-anchor" href="#_2024-04-11" aria-label="Permalink to &quot;2024-04-11&quot;">​</a></h2><h3 id="微信公众号-文章一" tabindex="-1">微信公众号 - 文章一： <a class="header-anchor" href="#微信公众号-文章一" aria-label="Permalink to &quot;微信公众号 - 文章一：&quot;">​</a></h3><p>前端常见的安全攻击方式、原理、以及如何防护！</p><h4 id="_01-跨站脚本攻击-xss" tabindex="-1">01：跨站脚本攻击（XSS） <a class="header-anchor" href="#_01-跨站脚本攻击-xss" aria-label="Permalink to &quot;01：跨站脚本攻击（XSS）&quot;">​</a></h4><p>跨站点脚本攻击(XSS)是最常见的网络共计之一。在 XSS 攻击中，攻击者将恶意客户端脚本注入受信任的网站，然后在用户的浏览器中执行。</p><h5 id="xss-攻击的原因是什么" tabindex="-1">XSS 攻击的原因是什么？ <a class="header-anchor" href="#xss-攻击的原因是什么" aria-label="Permalink to &quot;XSS 攻击的原因是什么？&quot;">​</a></h5><p><img src="'+o+'" alt="medium-zoom"></p><p>XSS 攻击的主要原因之一是在将用户生成的输入呈现在页面上。例如，攻击者可能能够使用 JavaScript 注入恶意代码，并且该代码可以在你的应用呈现 DOM 时执行。</p><p>此恶意代码最终可能会访问并窃取 用户Token、cookie 以及浏览器中存储的其他敏感信息。</p><h5 id="如何防止-xss-攻击" tabindex="-1">如何防止 XSS 攻击？ <a class="header-anchor" href="#如何防止-xss-攻击" aria-label="Permalink to &quot;如何防止 XSS 攻击？&quot;">​</a></h5><p>防止 XSS 攻击并不困难。</p><p>可以从三个部分进行思考</p><p>确保验证和清理允许用户在必要时插入数据和编码输出的表单、输入字段。 实施内容安全策略 (CSP) 以限制加载的资源和脚本。 使用 Vue 和 React 等框架，它们具有针对跨站点脚本攻击的内置预防机制。</p><p><br><hr></p><h4 id="_02-sql注入" tabindex="-1">02：SQL注入 <a class="header-anchor" href="#_02-sql注入" aria-label="Permalink to &quot;02：SQL注入&quot;">​</a></h4><p>SQL 注入是一种非常危险的攻击方式，并且已经存在很长一段时间了。攻击操纵数据库查询以获得未经授权的数据库访问，以执行恶意活动，例如损坏数据库或窃取敏感数据。</p><hr>',17),_=a('<p><img src="'+l+'" alt="medium-zoom"></p><p>简而言之，SQL 注入让攻击者可以从前端执行 SQL 查询。这可能会导致破坏性操作，从而获取你数据库中的信息！</p><h5 id="如何防止-sql-注入" tabindex="-1">如何防止 SQL 注入？ <a class="header-anchor" href="#如何防止-sql-注入" aria-label="Permalink to &quot;如何防止 SQL 注入？&quot;">​</a></h5><p>防止 SQL 注入的策略分为两部分：</p><p>1.首先，你需要确保前端输入字段经过正确验证和处理。防止用户在输入的字段中插入恶意代码。<br> 2.验证前端后，清理后端收到的数据也很重要。后端不要信任前端输入的任何数据，因为任何人都可以获取你的 API 端点并开始发送恶意输入。因此，后端也需要进行验证。此外，利用Burp Scanner 、 sqlmap、jSQL Injection和Invicti等工具来检测应用程序中潜在的 SQL 攻击和相关漏洞。</p><p><br><hr></p><h4 id="_03-跨站请求伪造-csrf" tabindex="-1">03：跨站请求伪造(CSRF) <a class="header-anchor" href="#_03-跨站请求伪造-csrf" aria-label="Permalink to &quot;03：跨站请求伪造(CSRF)&quot;">​</a></h4><p>跨站点请求伪造 (CSRF) 是一种前端安全攻击，它通过伪造的形式来执行 你原本不希望执行的操作。</p><h5 id="跨站请求伪造的原理是什么" tabindex="-1">跨站请求伪造的原理是什么？ <a class="header-anchor" href="#跨站请求伪造的原理是什么" aria-label="Permalink to &quot;跨站请求伪造的原理是什么？&quot;">​</a></h5><p><img src="'+h+'" alt="medium-zoom"></p><p>通过伪装的表单、链接或按钮，用于更改用户凭据、删除或操纵敏感数据。</p><h5 id="如何防止-跨站请求伪造-csrf" tabindex="-1">如何防止 跨站请求伪造(CSRF) <a class="header-anchor" href="#如何防止-跨站请求伪造-csrf" aria-label="Permalink to &quot;如何防止 跨站请求伪造(CSRF)&quot;">​</a></h5><p>防止 CSRF 攻击的最简单方法之一是使用从服务器生成的 CSRF 令牌。你可以与客户端共享这些令牌，以便后端可以在收到的每个请求中检查令牌并验证其真实性。因此，如果客户端无法提供准确的令牌，你的服务器可以拒绝请求的操作。</p><p>此外，可以利用 .NET、Joomla、Spring (Spring Security) 和 Ruby on Rails 等框架的内置 CSRF 支持来防止此类攻击。</p><h4 id="_04-中间人攻击" tabindex="-1">04：中间人攻击 <a class="header-anchor" href="#_04-中间人攻击" aria-label="Permalink to &quot;04：中间人攻击&quot;">​</a></h4><p>中间人 (MitM) 攻击迫使攻击者拦截和操纵在两方之间传输的信息</p><h5 id="中间人攻击的原理是什么" tabindex="-1">中间人攻击的原理是什么？ <a class="header-anchor" href="#中间人攻击的原理是什么" aria-label="Permalink to &quot;中间人攻击的原理是什么？&quot;">​</a></h5><p><img src="'+s+'" alt="medium-zoom"></p><p>当攻击者利用不安全的通信通道（通常通过公共 WiFi）时，就会发生这些攻击。这种攻击的受害者不会觉得自己受到了攻击，因为他们认为自己正在与服务器进行完全正常且安全的对话，而他们共享的信息在此过程中遭到监视或更改。</p><p>例如：你连接了一个 wifi 原本请求 lgdsunday.club 的地址，但是却被这个 wifi 拦截代理（有点像 devServer 代理请求的感觉）</p><h5 id="如何防止中间人攻击" tabindex="-1">如何防止中间人攻击 <a class="header-anchor" href="#如何防止中间人攻击" aria-label="Permalink to &quot;如何防止中间人攻击&quot;">​</a></h5><p>主要有三步：</p><p>1.使用安全的互联网连接并注销不再使用的应用程序。<br> 2.不要连接到你不知道的网络。例如，不要连接到咖啡馆提供的免费 WiFi。<br> 3.使用 HTTPS 和 TLS 等安全通信协议对传输中的所有数据进行加密。</p><p><br><hr></p><h4 id="_05-点击劫持" tabindex="-1">05：点击劫持 <a class="header-anchor" href="#_05-点击劫持" aria-label="Permalink to &quot;05：点击劫持&quot;">​</a></h4><p>点击劫持（又名 — UI 纠正攻击）是一种欺骗机制，它会诱骗用户点击与他们认为完全不同的内容。</p><h5 id="点击劫持的原理是什么" tabindex="-1">点击劫持的原理是什么？ <a class="header-anchor" href="#点击劫持的原理是什么" aria-label="Permalink to &quot;点击劫持的原理是什么？&quot;">​</a></h5><p><img src="'+p+'" alt="medium-zoom"></p><p>如图所示，它将隐藏元素覆盖在网站上合法可点击组件的顶部。在这种情况下，用户实际上点击了一个无意的元素，这可能会在未经他们同意的情况下触发攻击者的期望操作（比如转账）等意外操作。</p><h5 id="如何防止点击劫持" tabindex="-1">如何防止点击劫持 <a class="header-anchor" href="#如何防止点击劫持" aria-label="Permalink to &quot;如何防止点击劫持&quot;">​</a></h5><p>为了减轻点击劫持攻击的潜在风险，可以使用的一种机制是使用X-Frame-Options标头，它可以确保你的网站不会嵌入到其他网站或 IFrame 中。</p><p><br><hr></p><h4 id="_06-安全配置错误攻击" tabindex="-1">06：安全配置错误攻击 <a class="header-anchor" href="#_06-安全配置错误攻击" aria-label="Permalink to &quot;06：安全配置错误攻击&quot;">​</a></h4><p>应用程序的安全配置错误问题通常是由不正确的设置、默认值和过时的配置引起的，这些问题可能导致攻击者利用的漏洞进行攻击。</p><h5 id="安全配置错误攻击的原理是什么" tabindex="-1">安全配置错误攻击的原理是什么？ <a class="header-anchor" href="#安全配置错误攻击的原理是什么" aria-label="Permalink to &quot;安全配置错误攻击的原理是什么？&quot;">​</a></h5><p><img src="'+n+'" alt="medium-zoom"></p><p>例如，在某些情况下，启用目录列表可能会泄露敏感信息，密码和密钥不会更新并保留为默认值，并且会暴露错误处理信息。</p><h5 id="如何防止安全配置错误攻击" tabindex="-1">如何防止安全配置错误攻击 <a class="header-anchor" href="#如何防止安全配置错误攻击" aria-label="Permalink to &quot;如何防止安全配置错误攻击&quot;">​</a></h5><p>1.始终确保更新使用的服务的默认密钥和密码，并定期执行配置审核。<br> 2.定期检查安全设置还可以帮助降低可能存在安全配置错误或过时配置漏洞的风险。<br> 3.对于具有不同凭据的类似配置的生产、开发和测试环境进行自动化构建和部署流程。</p><p><br><hr></p><h4 id="_07-依赖性利用" tabindex="-1">07：依赖性利用 <a class="header-anchor" href="#_07-依赖性利用" aria-label="Permalink to &quot;07：依赖性利用&quot;">​</a></h4><p>前端应用程序由许多第三方库组成，用于使开发人员的工作更加轻松。但开发人员普遍忽视的是，这些库有时可能存在安全漏洞。</p><h5 id="依赖性利用的原理是什么" tabindex="-1">依赖性利用的原理是什么？ <a class="header-anchor" href="#依赖性利用的原理是什么" aria-label="Permalink to &quot;依赖性利用的原理是什么？&quot;">​</a></h5><p><img src="'+d+'" alt="medium-zoom"></p><p>例如，xxxxx 这个依赖库存在一个巨大的漏洞，允许攻击者执行远程代码。因此，任何使用 xxxxx 的应用程序都成为此攻击的受害者。</p><p>我印象中有个库之前出现过 主动作恶 的情况，但是具体忘记是哪个库了。有知道的小伙伴，可以给我发消息哈</p><h5 id="如何防止依赖性利用" tabindex="-1">如何防止依赖性利用 <a class="header-anchor" href="#如何防止依赖性利用" aria-label="Permalink to &quot;如何防止依赖性利用&quot;">​</a></h5><p>这个没有太好的防范方式，只能是使用广泛使用且维护得当的可靠且经过社区测试的库。</p><p>除此之外，最好可以定期审核、依赖项更新和使用漏洞扫描工具进行检查。</p>',49);function u(b,S,q,x,f,P){return i(),r("div",null,[m,t(" ##### SQL注入的原理是什么？ "),_])}const C=e(c,[["render",u]]);export{T as __pageData,C as default};
