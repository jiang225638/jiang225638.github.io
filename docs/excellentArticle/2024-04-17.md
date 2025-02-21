# 基于nginx+ffmpeg+vue3+TypeScript在网页上显示监控的实时画面

以下文章来源于稀土掘金技术社区 ，作者Cles8it

![medium-zoom](/assets/excellentArticle/2024-04-17/300-1713345856084-217.png)

### 一些必要的认知

- 一些常见的流媒体传输协议：**「RTSP、RTMP、HLS、HTTP-FLV」**

当时我查阅文档的时候也很蒙b，这些都是什么啊，这么多协议，而且都用来干啥的。反正就是一脸懵逼，

![medium-zoom](/assets/excellentArticle/2024-04-17/640.png)

经过好多番的学习。我这边提供的摄像头是支持**「RTSP」**取流的，所以打算在服务器上通过**「ffmpeg」**进行取流，然后推流到**「Nginx」**上，**「Nginx」**将流处理成对前端友好的传输格式**「HLS」**(**「m3u8」**格式的文件)，然后前端再拉流就行了。这里实现的流程是这样的

![medium-zoom](/assets/excellentArticle/2024-04-17/640-1713345856084-218.jpeg)

什么你说什么拉流推流，根本听不懂诶！

![medium-zoom](/assets/excellentArticle/2024-04-17/640-1713345856084-219.jpeg)

说实话，我也不懂，我三天的摸索下来，似乎还不能正确的理解推流和拉流。最后我是这么理解的：
**「推流」**：女主播把画面推到服务器上
**「拉流」**：我点开女主播的直播间，看女主播跳舞（doge)

### RTSP协议

当然没这么简单，媒体文件的传输肯定是要基于某个协议进行传输。由于这里摄像头提供了RTSP协议的地址(很多监控摄像头厂商都有的)，手机移动摄像头我不懂。
RTSP协议，RTSP（实时流传输协议）是一个网络控制协议，用于在线实时观看和控制流媒体服务器。它的作用类似于流媒体服务器的远程控制 （https://zhuanlan.zhihu.com/p/478736595）这里说的比较清楚。

### 调试工具

学习了这些知识，我对视频流的传输渐渐有了一些理解，上文提到我们监控摄像机提供了RTSP流的地址常见摄像机厂商RTSP地址格式，我们可以通过一些工具去播放这个流，比如VLC、potPlayer播放器。这里建议使用VLC，因为它真的很轻量！potPlayers也行，两个都是究极好用的媒体播放器
VLC：打开软件**-->**「媒体」**-->**打开网络串流

![medium-zoom](/assets/excellentArticle/2024-04-17/640-1713345856084-220.png)

potPlayer：浏览器-->打开链接

![medium-zoom](/assets/excellentArticle/2024-04-17/640-1713345856084-221.png)

这里把他们当作调试工具用就行啦，因为不管是RTSP流、RTMP流、FLV流、HLS流都能播放。在搭建服务之前得保证自己的摄像机正常的在工作。


然后就是重头戏了，**「nginx」**和**「ffmpeg」**。叠个甲，对ffmpeg我是第一次用，nginx也仅限于了解，平时部署项目是宝塔面板一键部署的。

### ffmpeg

这个就不多说了(因为我说不来哈哈哈)，是一个开源的程序库，通过命令行的方式来使用他的功能，就专门用来处理媒体文件的，这里挂一个官网的下载地址。如果使用的是宝塔面板，软件商店就有，一键安装就行。什么？命令行的方式？当然，我想，你在找文档，而且最好是中文文档。这里也准备好了ffmpeg中文文档。
把他当作一个中间工具就行了。



### Nginx

这位才是重量级，真正让服务跑起来的还得是nginx，因为不熟，本来不打算走这条路(原本想用Node来搭)，到头来还是避不开Nginx(踩坑过后，嗯Nginx真香)

![medium-zoom](/assets/excellentArticle/2024-04-17/640-1713345856084-222.jpeg)

很重要的一点！一定要给nginx添加rtmp模块，在这里踩了很多坑，什么模块安装不上、配置文件不生效....em反正就踩了很多坑。

## 二、实战



### RTSP地址

这边老师给提供的是海康威视的摄像头，地址格式是`rtsp://摄像头用户名:摄像头密码@摄像头ip:rtsp端口号/h264/ch1/main/av_stream`

### 画面测试

有了上文的地址，可以先在vlc和potPlayer里看一看，画面是否能正常预览画面，这里放一个正常取流的结果

![medium-zoom](/assets/excellentArticle/2024-04-17/640-1713345856084-223.png)

### 安装ffpemg

这里给出了两种方式安装

- **「宝塔面板」**


我是用宝塔面板安装的，因为方便嘛！

![medium-zoom](/assets/excellentArticle/2024-04-17/640-1713345856084-224.png)

- **「手动安装」**

来到ffmpeg中文官网，选择静态构建

![medium-zoom](/assets/excellentArticle/2024-04-17/640-1713345856084-225.png)

点击sorce

![medium-zoom](/assets/excellentArticle/2024-04-17/640-1713345856084-226.png)

下载第一个就行

![medium-zoom](/assets/excellentArticle/2024-04-17/640-1713345856084-227.png)

下载完了之后把他扔到服务器上面去
这里先不着急，ffmpeg安装还依赖一些东西，nasm

![medium-zoom](/assets/excellentArticle/2024-04-17/640-1713345856084-228.png)

同样也是下载完了扔到服务器上就行

![medium-zoom](/assets/excellentArticle/2024-04-17/640-1713345856084-229.png)

万事俱备，解压编译安装

![medium-zoom](/assets/excellentArticle/2024-04-17/640-1713345856084-230.png)

先是解压nasm

```
tar -xvf /www/server/mypack/nasm-2.16.01.tar.gz #解压到当前目录
# tar -xvf /www/server/mypack/nasm-2.16.01.tar.gz -C /指定目录
```

这里我解压到了/www/server/nasm目录下

![medium-zoom](/assets/excellentArticle/2024-04-17/640-1713345856084-231.png)

**「进入该目录后」**配置makeFile然后进行编译安装

```
./configure --prefix=[你的安装路径]
make && make install
```

nasm安装完了之后就可以安装ffmpeg了
还是一样，解压，配置makeFile，编译，安装即可
`tips`我习惯给安装的软件配置一个软链接（它很像windows中的快捷方式），方便全局使用，一般是这样的

```
ln -s [软件安装目录下的bin目录或者sbin] [自己机器的sbin]
```

以nasm为例，我的nasm是安装在/usr/local/nasm下面

![medium-zoom](/assets/excellentArticle/2024-04-17/640-1713345856084-232.png)

因为我这里已经配置过了，所以whereis显示/usr/local/sbin/nasm
来看看/usr/local/nasm目录下有什么，一个bin目录（用于存放该软件的指令，有些软件是sbin）

![medium-zoom](/assets/excellentArticle/2024-04-17/640-1713345856084-233.png)

命令如下：

```
ln -s /usr/local/nasm/sbin /usr/local/sbin/nasm
```

这里我已经建立过了，所以会显示文件已经存在

![medium-zoom](/assets/excellentArticle/2024-04-17/640-1713345856084-234.png)

照葫芦画瓢，ffmpeg也是如此安装


安装完了并建立了软链接，使用`ffmpeg -version`检查是否安装上了。

![medium-zoom](/assets/excellentArticle/2024-04-17/640-1713345856084-235.png)

### 安装Nginx

到这里开始踩坑了，nginx-rtmp-module模块的安装，因为我的机器原本就安装了nginx，按道理说这并不麻烦，不就是添加一个功能模块嘛，尝试过各种办法老是装不上。这里有两种情况，这两种情况都是要下载rtmp和nginx-http-flv模块的，先下载它吧，有可能会出现一些**「网络」**问题，这里自己解决啦

![medium-zoom](/assets/excellentArticle/2024-04-17/640-1713345856084-236.png)

```
git clone https://github.com/arut/nginx-rtmp-module.git 模块存放路径/默认当前
git clone https://gitcode.com/winshining/nginx-http-flv-module.git 模块存放路径/默认当前
```

- **「机器没有nginx」**

没有就装呗，这里我就不写了，因为不同的Linux发行版包管理工具都不一样
这里给出Centos7的安装历程

1. 安装一些依赖

```
yum install -y gcc-c++ #因为要通过编译安装nginx，所以这里要安装c/c++编译器
yum install -y pcre pcre-devel #nginx的http模块需要使用pcre来解析正则表达式
yum install -y zlib zlib-devel #nginx使用zlib对http包的内容进行gzip
yum install -y openssl openssl-devel #可以在你的应用程序中使用 OpenSSL 提供的加密功能
```

1. 下载nginx

下载nginx有很多方式，你可以在windows上下载，然后再扔到Linux上，也可以用包管理工具安装，这里选择前者。

![medium-zoom](/assets/excellentArticle/2024-04-17/640-1713345856084-237.png)

找个工具扔上去就行

```
# 这里选择解压到/usr/local目录下
tar -xvf nginx-1.14.0.tar.gz -C /usr/local
```

`ls /usr/local/`查看解压出来的nginx

![medium-zoom](/assets/excellentArticle/2024-04-17/640-1713345856084-238.png)

发现已经解压好了，然后进入该目录
`cd /usr/local/nginx-1.24.0`
配置./configure 脚本

```
./configure \
--prefix=/usr/local/nginx \
--pid-path=/var/run/nginx/nginx.pid \
--lock-path=/var/lock/nginx.lock \
--error-log-path=/var/log/nginx/error.log \
--http-log-path=/var/log/nginx/access.log \
--with-http_gzip_static_module \
--http-client-body-temp-path=/var/temp/nginx/client \
--http-proxy-temp-path=/var/temp/nginx/proxy \
--http-fastcgi-temp-path=/var/temp/nginx/fastcgi \
--http-uwsgi-temp-path=/var/temp/nginx/uwsgi \
--http-scgi-temp-path=/var/temp/nginx/scgi \
--with-http_stub_status_module \
--with-http_ssl_module \
--with-file-aio \
--with-http_realip_module \
--add-module=/www/server/nginx-http-flv-module # 指定添加flv模块
```


**「后期实践证明，压根不需要rtmp模块，要http-flv模块就行了，昨晚复盘的时候发现不装nginx-rtmp-module也能跑通」**
mmp，特别像这根水管一样，去网上找各种文章，然后东拼西凑，居然能跑起来，你就说能不能用吧

![medium-zoom](/assets/excellentArticle/2024-04-17/640-1713345856084-239.gif)


编译安装nginx

```
make && make install #如果你想看编译是否通过，建议是make和make install分开执行
```

安装完并且软连接建立，`nginx -t`检查

![medium-zoom](/assets/excellentArticle/2024-04-17/640-1713345856084-240.png)

nginx默认对应的是80端口，在启动nginx之前检查一下自己的防火墙，看看80端口有没有放行

```
firewall-cmd --list-ports
```

如果没有放行

```
#  --zone #作用域    --add-port=80/tcp #添加端口，格式为：端口/通讯协议
# --permanent #永久生效，没有此参数重启后失效
firewall-cmd --zone=public --add-port=80/tcp --permanent
# reload一下防火墙
firewall-cmd --reload
```

这个时候启动nginx

```
nginx
```

打开浏览器，输入你的服务器ip就能看到这个默认界面了，要是出现其他的错误，仔细看终端的错误信息。

![medium-zoom](/assets/excellentArticle/2024-04-17/640-1713345856084-241.png)

### nginx配置

编辑nginx的配置文件nginx.conf

![medium-zoom](/assets/excellentArticle/2024-04-17/640-1713345856085-242.png)

内容如下

```
#user  nobody;
worker_processes  1;

error_log  logs/error.log;
#error_log  logs/error.log  notice;
#error_log  logs/error.log  info;

pid        logs/nginx.pid;


events {
    worker_connections  1024;
}


http {
    include       mime.types;
    default_type  application/octet-stream;

    sendfile        on;

    keepalive_timeout  65;


    server {
        listen       80;
        server_name  localhost;

        location / {
            root   html;
            index  index.html index.htm;
        }

        error_page   500 502 503 504  /50x.html;
        location = /50x.html {
            root   html;
        }
    }
      server {
      listen 8888;
      
      location /stat { # http://ip:1000/stat, 监控流的地址 
          rtmp_stat all;  
          rtmp_stat_stylesheet stat.xsl;
      }  
      location /hls { # http拉流的地址，http://ip:1000/hls/密钥.m3u8
          # Serve HLS fragments
          types {
              application/vnd.apple.mpegurl m3u8;
              video/mp2t ts;
          }
          root /www/tmp;
          expires -1;
          add_header Cache-Control no-cache;
          add_header Access-Control-Allow-Origin *;
      } 
  }
}
rtmp {
    server {
        listen 1935;
        ping 30s;
        chunk_size 4000;
        notify_method get;

        application live { # 推流地址rtmp://ip:1935/live/密钥，同拉流播放地址
            live on;
            record all; # 是否开启记录 alloff, all，用于录制直播视频以便回放重播
            record_unique on; # 记录值唯一
            record_max_size 200M; # 记录文件大小
            record_path "/www/tmp/video"; # 记录文件位置
            record_suffix -%Y-%m-%d-%H_%M_%S.flv; # 记录文件命名
            # on_publish http://127.0.0.1:8686/auth; # 开始推流的回调地址
            #on_done 'http://when live stop call this url'; # 结束推流的回调地址
            #on_play http://127.0.0.1:8686/auth; # 开始播放的回调地址
        }
        
        application hls { # 推流地址rtmp://ip:1935/hls/密钥，开启HLS协议进行m3u8直播
            live on;
            hls on; # 开启hls, hls的推流会产生一个m3u8的ts视频文件索引，同时保存一个个视频片段缓存，可以拿到再次播放。
            hls_path /www/tmp/hls; # 视频切片ts文件存放的位置
            hls_sync 100ms;
            hls_fragment 5s; # 视频切片的大小，ts文件大小
            hls_cleanup on; #对多余的切片进行删除
            hls_playlist_length 60s;    #保存m3u8列表长度时间，默认是30秒
        }

        #application vod { # 用于视频点播flv/mp4
        #    play /www/tmp/videos; # 本地视频MP4文件存放地址，作为流播放视频: rtmp://ip:1935/vod/视频名称.mp4
        #}
        #application vod_http { # 播放远程http链接的视频，rtmp://ip:1935/vod_http/视频名称.mp4
        #    play http://localhost:8080/vod/;
        #}   
    }
}
```



### 使用ffpemg进行拉流转码

`tips`如果拉流转码的服务不在本机上运行，命令会有一些改动。具体怎么改请查阅ffmpeg的官方文档

```
ffmpeg -re -rtsp_transport tcp -i rtsp://admin:123456@ip:port/h264/ch1/main/av_stream -c copy -f hls -hls_time 10 -hls_list_size 0 /www/tmp/hls/test.m3u8
```

跑起来是这样的

![medium-zoom](/assets/excellentArticle/2024-04-17/640-1713345856085-243.png)

不用担心ts片段会堆满你的磁盘，因为之前已经在nginx的nginx.conf文件配置过了，多余的ts片段会直接丢掉。

### 测试

要是没什么问题那么现在用VLC访问http://ip:8888/hls/test.m3u8是可以看到监控画面的，
要是有问题 那多半是对应的端口没放行

![medium-zoom](/assets/excellentArticle/2024-04-17/640-1713345856085-244.png)

成功！

![medium-zoom](/assets/excellentArticle/2024-04-17/640-1713345856085-245.png)

有了这个hls流的地址，就可以很方便的将监控画面放进移动端页面，网页端页面了，这里我就不过多的介绍了，

### vue3中使用

用的video.js这个插件，这个自行学习安装了

```
<script setup lang="ts">
  import {onMounted, onUnmounted, ref} from 'vue'
  import 'video.js/dist/video-js.css'
  import videojs from 'video.js'

  const src = ref('http://ip:8888/hls/test.m3u8')
  const player = ref<any>(null)
  const videoRef = ref('')
  const videoInit = () => {
    if(player.value) {
      return
    }
    player.value = videojs(videoRef.value, {
      autoplay: false,
      controls: true,
      fluid: true, // 自适应宽高
      sources: [
        {
          src: src.value,
          type: 'application/x-mpegURL'
        }
      ]
    }, () => {
      console.log('player init success')
    })
  }
  onMounted(() => {
    videoInit()
  })
  onUnmounted(() => {
    if (player.value) {
      player.value.dispose()
      console.log('player dispose success')
    }
  })
</script>
<template>
  <video
    ref="videoRef"
    id="my-video"
    class="video-js vjs-default-skin vjs-big-play-centered vjs-16-9"
    controls
    >
    <source :src="src"/>
  </video>
</template>

  <style scoped lang="scss">
</style>
```

结果：

![medium-zoom](/assets/excellentArticle/2024-04-17/640-1713345856085-246.png)

## 三、总结

几天的试验与探索，收获很多，我也想过为什么不能让rtsp流直接在web网页中显示，那得具体的问问研究流媒体传输协议的大佬了，究其原因还是浏览器不支持直接播放rtsp流。所以没办法还是要转码，转码就会花时间，延迟自然就出现了。而且这个demo转码是直接在本机进行的，并不需要再推流到服务器上了，实际情况可能转码和流媒体服务器是分开的，延迟会更高，假设又抛一个回放的需求....要回放XXXX年XX月XX日，某某时间段的录像，好了我的服务器已经宕机了。有错误的地方请指正

![medium-zoom](/assets/excellentArticle/2024-04-17/640-1713345856085-247.jpeg)

### 性能问题（实际环境中）

我的机器比较垃圾，一个ffmpeg进程已经负载累累了，还有一个问题是画面延迟，hls方案延迟会比较高，我没做过其他的解决方案。这个demo的延迟大概10S这样
平均负载

![medium-zoom](/assets/excellentArticle/2024-04-17/640-1713345856085-248.png)

IO

![medium-zoom](/assets/excellentArticle/2024-04-17/640-1713345856085-249.png)

暂时没有想到优化的解决方案。如果有好的优化方案可以聊一聊，我也想学！

### ffmpeg后台24小时运行

这个应该很简单了，我就直接把指令贴出来了

```
ffmpeg -nostdin -re -rtsp_transport tcp -i rtsp://admin:123456@ip:554/h264/ch1/main/av_stream -c copy -f hls -hls_time 10 -hls_list_size 0 /www/tmp/hls/test.m3u8 2> /dev/null &
```

为了防止拉流转码服务挂掉，可以写一个shell脚本，每隔一段时间去检查一下ffmpeg进程是否还在，不在重启就可以了
重启脚本`restart.sh`

```
ffmpeg -nostdin -re -rtsp_transport tcp -i rtsp://admin:123456@ip:554/h264/ch1/main/av_stream -c copy -f hls -hls_time 10 -hls_list_size 0 /www/tmp/hls/test.m3u8 2> /dev/null &
```

检查脚本`check.sh`这里我没有在脚本中写定时器，而是通过宝塔面板计划任务去实现的，方便嘛

![medium-zoom](/assets/excellentArticle/2024-04-17/640-1713345856085-250.png)

```
#!/bin/bash  
  
# 定义一个函数来检查并重启ffmpeg进程  
check_and_restart_ffmpeg() {  
    # 使用pgrep查找ffmpeg进程的PID，如果不存在则返回空  
    ffmpeg_pids=$(pgrep -f ffmpeg)  
      
    # 如果没有找到ffmpeg进程，则执行重启脚本  
    if [ -z "$ffmpeg_pids" ]; then  
        echo "$(date): No ffmpeg processes found, restarting..."  
        /root/restart.sh  
    else  
        echo "$(date): ffmpeg processes are running with PIDs: $ffmpeg_pids"  
    fi  
}  
check_and_restart_ffmpeg
```