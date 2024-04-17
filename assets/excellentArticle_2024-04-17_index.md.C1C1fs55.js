import{_ as s,c as n,o as a,a5 as p,aD as e,aE as l,aF as i,aG as r,aH as t,aI as c,aJ as m,aK as o,aL as u,aM as b,aN as d,aO as h,aP as g,aQ as v,aR as f,aS as _,aT as x,aU as k,aV as y,aW as w,aX as q,aY as z,aZ as C,a_ as P,a$ as S,b0 as E,b1 as T,b2 as R,b3 as A,b4 as L,b5 as B,b6 as N,b7 as F,b8 as j,b9 as V}from"./chunks/framework.B-MQH6Bx.js";const K=JSON.parse('{"title":"基于nginx+ffmpeg+vue3+TypeScript在网页上显示监控的实时画面","description":"","frontmatter":{},"headers":[],"relativePath":"excellentArticle/2024-04-17/index.md","filePath":"excellentArticle/2024-04-17/index.md","lastUpdated":1713346187000}'),$={name:"excellentArticle/2024-04-17/index.md"},X=p('<h1 id="基于nginx-ffmpeg-vue3-typescript在网页上显示监控的实时画面" tabindex="-1">基于nginx+ffmpeg+vue3+TypeScript在网页上显示监控的实时画面 <a class="header-anchor" href="#基于nginx-ffmpeg-vue3-typescript在网页上显示监控的实时画面" aria-label="Permalink to &quot;基于nginx+ffmpeg+vue3+TypeScript在网页上显示监控的实时画面&quot;">​</a></h1><p>以下文章来源于稀土掘金技术社区 ，作者Cles8it</p><p><img src="'+e+'" alt="medium-zoom"></p><h3 id="一些必要的认知" tabindex="-1">一些必要的认知 <a class="header-anchor" href="#一些必要的认知" aria-label="Permalink to &quot;一些必要的认知&quot;">​</a></h3><ul><li>一些常见的流媒体传输协议：<strong>「RTSP、RTMP、HLS、HTTP-FLV」</strong></li></ul><p>当时我查阅文档的时候也很蒙b，这些都是什么啊，这么多协议，而且都用来干啥的。反正就是一脸懵逼， <img src="'+l+'" alt="meduium-zoom"> 经过好多番的学习。我这边提供的摄像头是支持**「RTSP」<strong>取流的，所以打算在服务器上通过</strong>「ffmpeg」<strong>进行取流，然后推流到</strong>「Nginx」<strong>上，</strong>「Nginx」<strong>将流处理成对前端友好的传输格式</strong>「HLS」<strong>(</strong>「m3u8」**格式的文件)，然后前端再拉流就行了。这里实现的流程是这样的 <img src="'+i+'" alt="meduium-zoom"></p><p>什么你说什么拉流推流，根本听不懂诶！ <img src="'+r+'" alt="meduium-zoom"> 说实话，我也不懂，我三天的摸索下来，似乎还不能正确的理解推流和拉流。最后我是这么理解的： <strong>「推流」</strong>：女主播把画面推到服务器上 <strong>「拉流」</strong>：我点开女主播的直播间，看女主播跳舞（doge)</p><hr><h3 id="rtsp协议" tabindex="-1">RTSP协议 <a class="header-anchor" href="#rtsp协议" aria-label="Permalink to &quot;RTSP协议&quot;">​</a></h3><p>当然没这么简单，媒体文件的传输肯定是要基于某个协议进行传输。由于这里摄像头提供了RTSP协议的地址(很多监控摄像头厂商都有的)，手机移动摄像头我不懂。 RTSP协议，RTSP（实时流传输协议）是一个网络控制协议，用于在线实时观看和控制流媒体服务器。它的作用类似于流媒体服务器的远程控制 （<a href="https://zhuanlan.zhihu.com/p/478736595%EF%BC%89%E8%BF%99%E9%87%8C%E8%AF%B4%E7%9A%84%E6%AF%94%E8%BE%83%E6%B8%85%E6%A5%9A%E3%80%82" target="_blank" rel="noreferrer">https://zhuanlan.zhihu.com/p/478736595）这里说的比较清楚。</a></p><h3 id="调试工具" tabindex="-1">调试工具 <a class="header-anchor" href="#调试工具" aria-label="Permalink to &quot;调试工具&quot;">​</a></h3><p>学习了这些知识，我对视频流的传输渐渐有了一些理解，上文提到我们监控摄像机提供了RTSP流的地址常见摄像机厂商RTSP地址格式，我们可以通过一些工具去播放这个流，比如VLC、potPlayer播放器。这里建议使用VLC，因为它真的很轻量！potPlayers也行，两个都是究极好用的媒体播放器 VLC：打开软件**--&gt;<strong>「媒体」</strong>--&gt;**打开网络串流 <img src="'+t+'" alt="meduium-zoom"> potPlayer：浏览器--&gt;打开链接 <img src="'+c+'" alt="meduium-zoom"> 这里把他们当作调试工具用就行啦，因为不管是RTSP流、RTMP流、FLV流、HLS流都能播放。在搭建服务之前得保证自己的摄像机正常的在工作。</p><hr><p>然后就是重头戏了，<strong>「nginx」<strong>和</strong>「ffmpeg」</strong>。叠个甲，对ffmpeg我是第一次用，nginx也仅限于了解，平时部署项目是宝塔面板一键部署的。</p><h3 id="ffmpeg" tabindex="-1">ffmpeg <a class="header-anchor" href="#ffmpeg" aria-label="Permalink to &quot;ffmpeg&quot;">​</a></h3><p>这个就不多说了(因为我说不来哈哈哈)，是一个开源的程序库，通过命令行的方式来使用他的功能，就专门用来处理媒体文件的，这里挂一个官网的下载地址。如果使用的是宝塔面板，软件商店就有，一键安装就行。什么？命令行的方式？当然，我想，你在找文档，而且最好是中文文档。这里也准备好了ffmpeg中文文档。 把他当作一个中间工具就行了。</p><hr><h3 id="nginx" tabindex="-1">Nginx <a class="header-anchor" href="#nginx" aria-label="Permalink to &quot;Nginx&quot;">​</a></h3><p>这位才是重量级，真正让服务跑起来的还得是nginx，因为不熟，本来不打算走这条路(原本想用Node来搭)，到头来还是避不开Nginx(踩坑过后，嗯Nginx真香) <img src="'+m+'" alt="meduium-zoom"> 很重要的一点！一定要给nginx添加rtmp模块，在这里踩了很多坑，什么模块安装不上、配置文件不生效....em反正就踩了很多坑。</p><h2 id="二、实战" tabindex="-1">二、实战 <a class="header-anchor" href="#二、实战" aria-label="Permalink to &quot;二、实战&quot;">​</a></h2><h3 id="rtsp地址" tabindex="-1">RTSP地址 <a class="header-anchor" href="#rtsp地址" aria-label="Permalink to &quot;RTSP地址&quot;">​</a></h3><p>这边老师给提供的是海康威视的摄像头，地址格式是<code>rtsp://摄像头用户名:摄像头密码@摄像头ip:rtsp端口号/h264/ch1/main/av_stream</code></p><h3 id="画面测试" tabindex="-1">画面测试 <a class="header-anchor" href="#画面测试" aria-label="Permalink to &quot;画面测试&quot;">​</a></h3><p>有了上文的地址，可以先在vlc和potPlayer里看一看，画面是否能正常预览画面，这里放一个正常取流的结果 <img src="'+o+'" alt="meduium-zoom"></p><h3 id="安装ffpemg" tabindex="-1">安装ffpemg <a class="header-anchor" href="#安装ffpemg" aria-label="Permalink to &quot;安装ffpemg&quot;">​</a></h3><p>这里给出了两种方式安装</p><ul><li><strong>「宝塔面板」</strong></li></ul><p>我是用宝塔面板安装的，因为方便嘛！ <img src="'+u+'" alt="meduium-zoom"></p><ul><li><strong>「手动安装」</strong></li></ul><p>来到ffmpeg中文官网，选择静态构建 <img src="'+b+'" alt="meduium-zoom"> 点击sorce <img src="'+d+'" alt="meduium-zoom"> 下载第一个就行 <img src="'+h+'" alt="meduium-zoom"> 下载完了之后把他扔到服务器上面去 这里先不着急，ffmpeg安装还依赖一些东西，nasm <img src="'+g+'" alt="meduium-zoom"> 同样也是下载完了扔到服务器上就行 <img src="'+v+'" alt="meduium-zoom"> 万事俱备，解压编译安装 <img src="'+f+`" alt="meduium-zoom"> 先是解压nasm</p><div class="language- vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span>tar -xvf /www/server/mypack/nasm-2.16.01.tar.gz #解压到当前目录</span></span>
<span class="line"><span># tar -xvf /www/server/mypack/nasm-2.16.01.tar.gz -C /指定目录</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br></div></div><p>这里我解压到了/www/server/nasm目录下 <img src="`+_+`" alt="meduium-zoom"> **「进入该目录后」**配置makeFile然后进行编译安装</p><div class="language- vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span>./configure --prefix=[你的安装路径]</span></span>
<span class="line"><span>make &amp;&amp; make install</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br></div></div><p>nasm安装完了之后就可以安装ffmpeg了 还是一样，解压，配置makeFile，编译，安装即可 <code>tips</code>我习惯给安装的软件配置一个软链接（它很像windows中的快捷方式），方便全局使用，一般是这样的</p><div class="language- vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span>ln -s [软件安装目录下的bin目录或者sbin] [自己机器的sbin]</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br></div></div><p>以nasm为例，我的nasm是安装在/usr/local/nasm下面 <img src="`+x+'" alt="meduium-zoom"> 因为我这里已经配置过了，所以whereis显示/usr/local/sbin/nasm 来看看/usr/local/nasm目录下有什么，一个bin目录（用于存放该软件的指令，有些软件是sbin） <img src="'+k+'" alt="meduium-zoom"> 命令如下：</p><div class="language- vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span>ln -s /usr/local/nasm/sbin /usr/local/sbin/nasm</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br></div></div><p>这里我已经建立过了，所以会显示文件已经存在 <img src="'+y+'" alt="meduium-zoom"> 照葫芦画瓢，ffmpeg也是如此安装</p><hr><p>安装完了并建立了软链接，使用<code>ffmpeg -version</code>检查是否安装上了。 <img src="'+w+'" alt="meduium-zoom"></p><h3 id="安装nginx" tabindex="-1">安装Nginx <a class="header-anchor" href="#安装nginx" aria-label="Permalink to &quot;安装Nginx&quot;">​</a></h3><p>到这里开始踩坑了，nginx-rtmp-module模块的安装，因为我的机器原本就安装了nginx，按道理说这并不麻烦，不就是添加一个功能模块嘛，尝试过各种办法老是装不上。这里有两种情况，这两种情况都是要下载rtmp和nginx-http-flv模块的，先下载它吧，有可能会出现一些**「网络」**问题，这里自己解决啦 <img src="'+q+`" alt="meduium-zoom"></p><div class="language- vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span>git clone https://github.com/arut/nginx-rtmp-module.git 模块存放路径/默认当前</span></span>
<span class="line"><span>git clone https://gitcode.com/winshining/nginx-http-flv-module.git 模块存放路径/默认当前</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br></div></div><ul><li><strong>「机器没有nginx」</strong></li></ul><p>没有就装呗，这里我就不写了，因为不同的Linux发行版包管理工具都不一样 这里给出Centos7的安装历程</p><ol><li>安装一些依赖</li></ol><div class="language- vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span>yum install -y gcc-c++ #因为要通过编译安装nginx，所以这里要安装c/c++编译器</span></span>
<span class="line"><span>yum install -y pcre pcre-devel #nginx的http模块需要使用pcre来解析正则表达式</span></span>
<span class="line"><span>yum install -y zlib zlib-devel #nginx使用zlib对http包的内容进行gzip</span></span>
<span class="line"><span>yum install -y openssl openssl-devel #可以在你的应用程序中使用 OpenSSL 提供的加密功能</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br></div></div><ol><li>下载nginx</li></ol><p>下载nginx有很多方式，你可以在windows上下载，然后再扔到Linux上，也可以用包管理工具安装，这里选择前者。 <img src="`+z+`" alt="meduium-zoom"> 找个工具扔上去就行</p><div class="language- vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span># 这里选择解压到/usr/local目录下</span></span>
<span class="line"><span>tar -xvf nginx-1.14.0.tar.gz -C /usr/local</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br></div></div><p><code>ls /usr/local/</code>查看解压出来的nginx <img src="`+C+`" alt="meduium-zoom"> 发现已经解压好了，然后进入该目录 <code>cd /usr/local/nginx-1.24.0</code> 配置./configure 脚本</p><div class="language- vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span>./configure \\</span></span>
<span class="line"><span>--prefix=/usr/local/nginx \\</span></span>
<span class="line"><span>--pid-path=/var/run/nginx/nginx.pid \\</span></span>
<span class="line"><span>--lock-path=/var/lock/nginx.lock \\</span></span>
<span class="line"><span>--error-log-path=/var/log/nginx/error.log \\</span></span>
<span class="line"><span>--http-log-path=/var/log/nginx/access.log \\</span></span>
<span class="line"><span>--with-http_gzip_static_module \\</span></span>
<span class="line"><span>--http-client-body-temp-path=/var/temp/nginx/client \\</span></span>
<span class="line"><span>--http-proxy-temp-path=/var/temp/nginx/proxy \\</span></span>
<span class="line"><span>--http-fastcgi-temp-path=/var/temp/nginx/fastcgi \\</span></span>
<span class="line"><span>--http-uwsgi-temp-path=/var/temp/nginx/uwsgi \\</span></span>
<span class="line"><span>--http-scgi-temp-path=/var/temp/nginx/scgi \\</span></span>
<span class="line"><span>--with-http_stub_status_module \\</span></span>
<span class="line"><span>--with-http_ssl_module \\</span></span>
<span class="line"><span>--with-file-aio \\</span></span>
<span class="line"><span>--with-http_realip_module \\</span></span>
<span class="line"><span>--add-module=/www/server/nginx-http-flv-module # 指定添加flv模块</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br></div></div><hr><p><strong>「后期实践证明，压根不需要rtmp模块，要http-flv模块就行了，昨晚复盘的时候发现不装nginx-rtmp-module也能跑通」</strong> mmp，特别像这根水管一样，去网上找各种文章，然后东拼西凑，居然能跑起来，你就说能不能用吧</p><p><img src="`+P+'" alt="meduium-zoom"></p><hr><p>编译安装nginx</p><div class="language- vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span>make &amp;&amp; make install #如果你想看编译是否通过，建议是make和make install分开执行</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br></div></div><p>安装完并且软连接建立，<code>nginx -t</code>检查 <img src="'+S+`" alt="meduium-zoom"> nginx默认对应的是80端口，在启动nginx之前检查一下自己的防火墙，看看80端口有没有放行</p><div class="language- vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span>firewall-cmd --list-ports</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br></div></div><p>如果没有放行</p><div class="language- vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span>#  --zone #作用域    --add-port=80/tcp #添加端口，格式为：端口/通讯协议</span></span>
<span class="line"><span># --permanent #永久生效，没有此参数重启后失效</span></span>
<span class="line"><span>firewall-cmd --zone=public --add-port=80/tcp --permanent</span></span>
<span class="line"><span># reload一下防火墙</span></span>
<span class="line"><span>firewall-cmd --reload</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br></div></div><p>这个时候启动nginx</p><div class="language- vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span>nginx</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br></div></div><p>打开浏览器，输入你的服务器ip就能看到这个默认界面了，要是出现其他的错误，仔细看终端的错误信息。 <img src="`+E+'" alt="meduium-zoom"></p><h3 id="nginx配置" tabindex="-1">nginx配置 <a class="header-anchor" href="#nginx配置" aria-label="Permalink to &quot;nginx配置&quot;">​</a></h3><p>编辑nginx的配置文件nginx.conf <img src="'+T+`" alt="meduium-zoom"> 内容如下</p><div class="language- vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span>#user  nobody;</span></span>
<span class="line"><span>worker_processes  1;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>error_log  logs/error.log;</span></span>
<span class="line"><span>#error_log  logs/error.log  notice;</span></span>
<span class="line"><span>#error_log  logs/error.log  info;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>pid        logs/nginx.pid;</span></span>
<span class="line"><span></span></span>
<span class="line"><span></span></span>
<span class="line"><span>events {</span></span>
<span class="line"><span>    worker_connections  1024;</span></span>
<span class="line"><span>}</span></span>
<span class="line"><span></span></span>
<span class="line"><span></span></span>
<span class="line"><span>http {</span></span>
<span class="line"><span>    include       mime.types;</span></span>
<span class="line"><span>    default_type  application/octet-stream;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    sendfile        on;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    keepalive_timeout  65;</span></span>
<span class="line"><span></span></span>
<span class="line"><span></span></span>
<span class="line"><span>    server {</span></span>
<span class="line"><span>        listen       80;</span></span>
<span class="line"><span>        server_name  localhost;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>        location / {</span></span>
<span class="line"><span>            root   html;</span></span>
<span class="line"><span>            index  index.html index.htm;</span></span>
<span class="line"><span>        }</span></span>
<span class="line"><span></span></span>
<span class="line"><span>        error_page   500 502 503 504  /50x.html;</span></span>
<span class="line"><span>        location = /50x.html {</span></span>
<span class="line"><span>            root   html;</span></span>
<span class="line"><span>        }</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span>      server {</span></span>
<span class="line"><span>      listen 8888;</span></span>
<span class="line"><span>      </span></span>
<span class="line"><span>      location /stat { # http://ip:1000/stat, 监控流的地址 </span></span>
<span class="line"><span>          rtmp_stat all;  </span></span>
<span class="line"><span>          rtmp_stat_stylesheet stat.xsl;</span></span>
<span class="line"><span>      }  </span></span>
<span class="line"><span>      location /hls { # http拉流的地址，http://ip:1000/hls/密钥.m3u8</span></span>
<span class="line"><span>          # Serve HLS fragments</span></span>
<span class="line"><span>          types {</span></span>
<span class="line"><span>              application/vnd.apple.mpegurl m3u8;</span></span>
<span class="line"><span>              video/mp2t ts;</span></span>
<span class="line"><span>          }</span></span>
<span class="line"><span>          root /www/tmp;</span></span>
<span class="line"><span>          expires -1;</span></span>
<span class="line"><span>          add_header Cache-Control no-cache;</span></span>
<span class="line"><span>          add_header Access-Control-Allow-Origin *;</span></span>
<span class="line"><span>      } </span></span>
<span class="line"><span>  }</span></span>
<span class="line"><span>}</span></span>
<span class="line"><span>rtmp {</span></span>
<span class="line"><span>    server {</span></span>
<span class="line"><span>        listen 1935;</span></span>
<span class="line"><span>        ping 30s;</span></span>
<span class="line"><span>        chunk_size 4000;</span></span>
<span class="line"><span>        notify_method get;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>        application live { # 推流地址rtmp://ip:1935/live/密钥，同拉流播放地址</span></span>
<span class="line"><span>            live on;</span></span>
<span class="line"><span>            record all; # 是否开启记录 alloff, all，用于录制直播视频以便回放重播</span></span>
<span class="line"><span>            record_unique on; # 记录值唯一</span></span>
<span class="line"><span>            record_max_size 200M; # 记录文件大小</span></span>
<span class="line"><span>            record_path &quot;/www/tmp/video&quot;; # 记录文件位置</span></span>
<span class="line"><span>            record_suffix -%Y-%m-%d-%H_%M_%S.flv; # 记录文件命名</span></span>
<span class="line"><span>            # on_publish http://127.0.0.1:8686/auth; # 开始推流的回调地址</span></span>
<span class="line"><span>            #on_done &#39;http://when live stop call this url&#39;; # 结束推流的回调地址</span></span>
<span class="line"><span>            #on_play http://127.0.0.1:8686/auth; # 开始播放的回调地址</span></span>
<span class="line"><span>        }</span></span>
<span class="line"><span>        </span></span>
<span class="line"><span>        application hls { # 推流地址rtmp://ip:1935/hls/密钥，开启HLS协议进行m3u8直播</span></span>
<span class="line"><span>            live on;</span></span>
<span class="line"><span>            hls on; # 开启hls, hls的推流会产生一个m3u8的ts视频文件索引，同时保存一个个视频片段缓存，可以拿到再次播放。</span></span>
<span class="line"><span>            hls_path /www/tmp/hls; # 视频切片ts文件存放的位置</span></span>
<span class="line"><span>            hls_sync 100ms;</span></span>
<span class="line"><span>            hls_fragment 5s; # 视频切片的大小，ts文件大小</span></span>
<span class="line"><span>            hls_cleanup on; #对多余的切片进行删除</span></span>
<span class="line"><span>            hls_playlist_length 60s;    #保存m3u8列表长度时间，默认是30秒</span></span>
<span class="line"><span>        }</span></span>
<span class="line"><span></span></span>
<span class="line"><span>        #application vod { # 用于视频点播flv/mp4</span></span>
<span class="line"><span>        #    play /www/tmp/videos; # 本地视频MP4文件存放地址，作为流播放视频: rtmp://ip:1935/vod/视频名称.mp4</span></span>
<span class="line"><span>        #}</span></span>
<span class="line"><span>        #application vod_http { # 播放远程http链接的视频，rtmp://ip:1935/vod_http/视频名称.mp4</span></span>
<span class="line"><span>        #    play http://localhost:8080/vod/;</span></span>
<span class="line"><span>        #}   </span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span>}</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br><span class="line-number">22</span><br><span class="line-number">23</span><br><span class="line-number">24</span><br><span class="line-number">25</span><br><span class="line-number">26</span><br><span class="line-number">27</span><br><span class="line-number">28</span><br><span class="line-number">29</span><br><span class="line-number">30</span><br><span class="line-number">31</span><br><span class="line-number">32</span><br><span class="line-number">33</span><br><span class="line-number">34</span><br><span class="line-number">35</span><br><span class="line-number">36</span><br><span class="line-number">37</span><br><span class="line-number">38</span><br><span class="line-number">39</span><br><span class="line-number">40</span><br><span class="line-number">41</span><br><span class="line-number">42</span><br><span class="line-number">43</span><br><span class="line-number">44</span><br><span class="line-number">45</span><br><span class="line-number">46</span><br><span class="line-number">47</span><br><span class="line-number">48</span><br><span class="line-number">49</span><br><span class="line-number">50</span><br><span class="line-number">51</span><br><span class="line-number">52</span><br><span class="line-number">53</span><br><span class="line-number">54</span><br><span class="line-number">55</span><br><span class="line-number">56</span><br><span class="line-number">57</span><br><span class="line-number">58</span><br><span class="line-number">59</span><br><span class="line-number">60</span><br><span class="line-number">61</span><br><span class="line-number">62</span><br><span class="line-number">63</span><br><span class="line-number">64</span><br><span class="line-number">65</span><br><span class="line-number">66</span><br><span class="line-number">67</span><br><span class="line-number">68</span><br><span class="line-number">69</span><br><span class="line-number">70</span><br><span class="line-number">71</span><br><span class="line-number">72</span><br><span class="line-number">73</span><br><span class="line-number">74</span><br><span class="line-number">75</span><br><span class="line-number">76</span><br><span class="line-number">77</span><br><span class="line-number">78</span><br><span class="line-number">79</span><br><span class="line-number">80</span><br><span class="line-number">81</span><br><span class="line-number">82</span><br><span class="line-number">83</span><br><span class="line-number">84</span><br><span class="line-number">85</span><br><span class="line-number">86</span><br><span class="line-number">87</span><br><span class="line-number">88</span><br><span class="line-number">89</span><br><span class="line-number">90</span><br><span class="line-number">91</span><br><span class="line-number">92</span><br><span class="line-number">93</span><br><span class="line-number">94</span><br><span class="line-number">95</span><br></div></div><h3 id="使用ffpemg进行拉流转码" tabindex="-1">使用ffpemg进行拉流转码 <a class="header-anchor" href="#使用ffpemg进行拉流转码" aria-label="Permalink to &quot;使用ffpemg进行拉流转码&quot;">​</a></h3><p><code>tips</code>如果拉流转码的服务不在本机上运行，命令会有一些改动。具体怎么改请查阅ffmpeg的官方文档</p><div class="language- vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span>ffmpeg -re -rtsp_transport tcp -i rtsp://admin:123456@ip:port/h264/ch1/main/av_stream -c copy -f hls -hls_time 10 -hls_list_size 0 /www/tmp/hls/test.m3u8</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br></div></div><p>跑起来是这样的 <img src="`+R+'" alt="meduium-zoom"> 不用担心ts片段会堆满你的磁盘，因为之前已经在nginx的nginx.conf文件配置过了，多余的ts片段会直接丢掉。</p><h3 id="测试" tabindex="-1">测试 <a class="header-anchor" href="#测试" aria-label="Permalink to &quot;测试&quot;">​</a></h3><p>要是没什么问题那么现在用VLC访问<a href="http://ip:8888/hls/test.m3u8%E6%98%AF%E5%8F%AF%E4%BB%A5%E7%9C%8B%E5%88%B0%E7%9B%91%E6%8E%A7%E7%94%BB%E9%9D%A2%E7%9A%84%EF%BC%8C" target="_blank" rel="noreferrer">http://ip:8888/hls/test.m3u8是可以看到监控画面的，</a> 要是有问题 那多半是对应的端口没放行 <img src="'+A+'" alt="meduium-zoom"> 成功！ <img src="'+L+`" alt="meduium-zoom"> 有了这个hls流的地址，就可以很方便的将监控画面放进移动端页面，网页端页面了，这里我就不过多的介绍了，</p><h3 id="vue3中使用" tabindex="-1">vue3中使用 <a class="header-anchor" href="#vue3中使用" aria-label="Permalink to &quot;vue3中使用&quot;">​</a></h3><p>用的video.js这个插件，这个自行学习安装了</p><div class="language- vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span>&lt;script setup lang=&quot;ts&quot;&gt;</span></span>
<span class="line"><span>  import {onMounted, onUnmounted, ref} from &#39;vue&#39;</span></span>
<span class="line"><span>  import &#39;video.js/dist/video-js.css&#39;</span></span>
<span class="line"><span>  import videojs from &#39;video.js&#39;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>  const src = ref(&#39;http://ip:8888/hls/test.m3u8&#39;)</span></span>
<span class="line"><span>  const player = ref&lt;any&gt;(null)</span></span>
<span class="line"><span>  const videoRef = ref(&#39;&#39;)</span></span>
<span class="line"><span>  const videoInit = () =&gt; {</span></span>
<span class="line"><span>    if(player.value) {</span></span>
<span class="line"><span>      return</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span>    player.value = videojs(videoRef.value, {</span></span>
<span class="line"><span>      autoplay: false,</span></span>
<span class="line"><span>      controls: true,</span></span>
<span class="line"><span>      fluid: true, // 自适应宽高</span></span>
<span class="line"><span>      sources: [</span></span>
<span class="line"><span>        {</span></span>
<span class="line"><span>          src: src.value,</span></span>
<span class="line"><span>          type: &#39;application/x-mpegURL&#39;</span></span>
<span class="line"><span>        }</span></span>
<span class="line"><span>      ]</span></span>
<span class="line"><span>    }, () =&gt; {</span></span>
<span class="line"><span>      console.log(&#39;player init success&#39;)</span></span>
<span class="line"><span>    })</span></span>
<span class="line"><span>  }</span></span>
<span class="line"><span>  onMounted(() =&gt; {</span></span>
<span class="line"><span>    videoInit()</span></span>
<span class="line"><span>  })</span></span>
<span class="line"><span>  onUnmounted(() =&gt; {</span></span>
<span class="line"><span>    if (player.value) {</span></span>
<span class="line"><span>      player.value.dispose()</span></span>
<span class="line"><span>      console.log(&#39;player dispose success&#39;)</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span>  })</span></span>
<span class="line"><span>&lt;/script&gt;</span></span>
<span class="line"><span>&lt;template&gt;</span></span>
<span class="line"><span>  &lt;video</span></span>
<span class="line"><span>    ref=&quot;videoRef&quot;</span></span>
<span class="line"><span>    id=&quot;my-video&quot;</span></span>
<span class="line"><span>    class=&quot;video-js vjs-default-skin vjs-big-play-centered vjs-16-9&quot;</span></span>
<span class="line"><span>    controls</span></span>
<span class="line"><span>    &gt;</span></span>
<span class="line"><span>    &lt;source :src=&quot;src&quot;/&gt;</span></span>
<span class="line"><span>  &lt;/video&gt;</span></span>
<span class="line"><span>&lt;/template&gt;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>  &lt;style scoped lang=&quot;scss&quot;&gt;</span></span>
<span class="line"><span>&lt;/style&gt;</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br><span class="line-number">22</span><br><span class="line-number">23</span><br><span class="line-number">24</span><br><span class="line-number">25</span><br><span class="line-number">26</span><br><span class="line-number">27</span><br><span class="line-number">28</span><br><span class="line-number">29</span><br><span class="line-number">30</span><br><span class="line-number">31</span><br><span class="line-number">32</span><br><span class="line-number">33</span><br><span class="line-number">34</span><br><span class="line-number">35</span><br><span class="line-number">36</span><br><span class="line-number">37</span><br><span class="line-number">38</span><br><span class="line-number">39</span><br><span class="line-number">40</span><br><span class="line-number">41</span><br><span class="line-number">42</span><br><span class="line-number">43</span><br><span class="line-number">44</span><br><span class="line-number">45</span><br><span class="line-number">46</span><br><span class="line-number">47</span><br><span class="line-number">48</span><br><span class="line-number">49</span><br></div></div><p>结果： <img src="`+B+'" alt="meduium-zoom"></p><h2 id="三、总结" tabindex="-1">三、总结 <a class="header-anchor" href="#三、总结" aria-label="Permalink to &quot;三、总结&quot;">​</a></h2><p>几天的试验与探索，收获很多，我也想过为什么不能让rtsp流直接在web网页中显示，那得具体的问问研究流媒体传输协议的大佬了，究其原因还是浏览器不支持直接播放rtsp流。所以没办法还是要转码，转码就会花时间，延迟自然就出现了。而且这个demo转码是直接在本机进行的，并不需要再推流到服务器上了，实际情况可能转码和流媒体服务器是分开的，延迟会更高，假设又抛一个回放的需求....要回放XXXX年XX月XX日，某某时间段的录像，好了我的服务器已经宕机了。有错误的地方请指正 <img src="'+N+'" alt="meduium-zoom"></p><h3 id="性能问题-实际环境中" tabindex="-1">性能问题（实际环境中） <a class="header-anchor" href="#性能问题-实际环境中" aria-label="Permalink to &quot;性能问题（实际环境中）&quot;">​</a></h3><p>我的机器比较垃圾，一个ffmpeg进程已经负载累累了，还有一个问题是画面延迟，hls方案延迟会比较高，我没做过其他的解决方案。这个demo的延迟大概10S这样 平均负载 <img src="'+F+'" alt="meduium-zoom"> IO <img src="'+j+'" alt="meduium-zoom"> 暂时没有想到优化的解决方案。如果有好的优化方案可以聊一聊，我也想学！</p><h3 id="ffmpeg后台24小时运行" tabindex="-1">ffmpeg后台24小时运行 <a class="header-anchor" href="#ffmpeg后台24小时运行" aria-label="Permalink to &quot;ffmpeg后台24小时运行&quot;">​</a></h3><p>这个应该很简单了，我就直接把指令贴出来了</p><div class="language- vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span>ffmpeg -nostdin -re -rtsp_transport tcp -i rtsp://admin:123456@ip:554/h264/ch1/main/av_stream -c copy -f hls -hls_time 10 -hls_list_size 0 /www/tmp/hls/test.m3u8 2&gt; /dev/null &amp;</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br></div></div><p>为了防止拉流转码服务挂掉，可以写一个shell脚本，每隔一段时间去检查一下ffmpeg进程是否还在，不在重启就可以了 重启脚本<code>restart.sh</code></p><div class="language- vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span>ffmpeg -nostdin -re -rtsp_transport tcp -i rtsp://admin:123456@ip:554/h264/ch1/main/av_stream -c copy -f hls -hls_time 10 -hls_list_size 0 /www/tmp/hls/test.m3u8 2&gt; /dev/null &amp;</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br></div></div><p>检查脚本<code>check.sh</code>这里我没有在脚本中写定时器，而是通过宝塔面板计划任务去实现的，方便嘛 <img src="'+V+`" alt="meduium-zoom"></p><div class="language- vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span>#!/bin/bash  </span></span>
<span class="line"><span>  </span></span>
<span class="line"><span># 定义一个函数来检查并重启ffmpeg进程  </span></span>
<span class="line"><span>check_and_restart_ffmpeg() {  </span></span>
<span class="line"><span>    # 使用pgrep查找ffmpeg进程的PID，如果不存在则返回空  </span></span>
<span class="line"><span>    ffmpeg_pids=$(pgrep -f ffmpeg)  </span></span>
<span class="line"><span>      </span></span>
<span class="line"><span>    # 如果没有找到ffmpeg进程，则执行重启脚本  </span></span>
<span class="line"><span>    if [ -z &quot;$ffmpeg_pids&quot; ]; then  </span></span>
<span class="line"><span>        echo &quot;$(date): No ffmpeg processes found, restarting...&quot;  </span></span>
<span class="line"><span>        /root/restart.sh  </span></span>
<span class="line"><span>    else  </span></span>
<span class="line"><span>        echo &quot;$(date): ffmpeg processes are running with PIDs: $ffmpeg_pids&quot;  </span></span>
<span class="line"><span>    fi  </span></span>
<span class="line"><span>}  </span></span>
<span class="line"><span>check_and_restart_ffmpeg</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br></div></div>`,89),H=[X];function I(M,D,O,U,J,Y){return a(),n("div",null,H)}const Q=s($,[["render",I]]);export{K as __pageData,Q as default};
