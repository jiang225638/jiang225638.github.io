import{_ as s,c as n,o as a,a4 as p}from"./chunks/framework.2rcLouwq.js";const h=JSON.parse('{"title":"模块","description":"","frontmatter":{},"headers":[],"relativePath":"nestjs/module/index.md","filePath":"nestjs/module/index.md","lastUpdated":1713787480000}'),e={name:"nestjs/module/index.md"},l=p(`<h1 id="模块" tabindex="-1">模块 <a class="header-anchor" href="#模块" aria-label="Permalink to &quot;模块&quot;">​</a></h1><h2 id="基础知识" tabindex="-1">基础知识 <a class="header-anchor" href="#基础知识" aria-label="Permalink to &quot;基础知识&quot;">​</a></h2><p>模块是一个独立的应用单位，比如你可以将用户登录注册、配置项管理、商品定单管理分别定义为不同的模块</p><ul><li>使用imports导入其他模块</li><li>使用providers属性向其他模块提供服务</li><li>使用inject 属性注入其他模块提供的服务</li><li>使用controllers属性声明模块的控制器，以供路由识别</li><li>社区有众多NestJs的模块，我们可以拿来使用，比如ConfigModule配置管理模块</li><li>模块是单例的</li><li>providers定义的提供者也是单例的</li></ul><h2 id="根模块" tabindex="-1">根模块 <a class="header-anchor" href="#根模块" aria-label="Permalink to &quot;根模块&quot;">​</a></h2><p>每个应用程序至少有一个模块，即根模块。根模块是 Nest 用于构建<strong>应用程序图</strong>的起点。根模块在<strong>main.ts</strong>中定义。</p><p>如果你想让局域网用户可访问，可以在<strong>main.ts</strong>中指定ip地址</p><div class="language- vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>async function bootstrap() {</span></span>
<span class="line"><span>  const app = await NestFactory.create(AppModule);</span></span>
<span class="line"><span>  await app.listen(3000, &#39;0.0.0.0&#39;);</span></span>
<span class="line"><span>}</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br></div></div><h2 id="基本定义" tabindex="-1">基本定义 <a class="header-anchor" href="#基本定义" aria-label="Permalink to &quot;基本定义&quot;">​</a></h2><p>模块是一个子程序，用于定义控制器、提供者或向其他模块开放提供者（开放模块的 API）</p><ul><li>默认情况下控制器、提供者在当前模块可用，即模块作用域</li><li>如果向其他模块提供服务，可以将提供者定义在 <strong>exports</strong> 属性中，其他模块需要在 <strong>imports</strong> 属性中引入当前模块</li><li>模块是单例的，多个模块共享当前模块实例</li><li>模块提供者也是单例，所以模块被多个其他模块使用，那该模块的 <strong>provider</strong> 也是共享的</li></ul><div class="language- vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>import { JwtStrategy } from &#39;./strategy/jwt.strategy&#39;</span></span>
<span class="line"><span>import { Module } from &#39;@nestjs/common&#39;</span></span>
<span class="line"><span>import { ConfigModule, ConfigService } from &#39;@nestjs/config&#39;</span></span>
<span class="line"><span>import { JwtModule } from &#39;@nestjs/jwt&#39;</span></span>
<span class="line"><span>import { AuthController } from &#39;./auth.controller&#39;</span></span>
<span class="line"><span>import { AuthService } from &#39;./auth.service&#39;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>@Module({</span></span>
<span class="line"><span>	//导入其他模块</span></span>
<span class="line"><span>  imports: [</span></span>
<span class="line"><span>    JwtModule.registerAsync({</span></span>
<span class="line"><span>      imports: [ConfigModule],</span></span>
<span class="line"><span>      inject: [ConfigService],</span></span>
<span class="line"><span>      useFactory(configService: ConfigService) {</span></span>
<span class="line"><span>        return {</span></span>
<span class="line"><span>          secret: configService.get(&#39;app.token_secret&#39;),</span></span>
<span class="line"><span>          expiresIn: &#39;100d&#39;,</span></span>
<span class="line"><span>        }</span></span>
<span class="line"><span>      },</span></span>
<span class="line"><span>    }),</span></span>
<span class="line"><span>  ],</span></span>
<span class="line"><span>  //模块提供者</span></span>
<span class="line"><span>  providers: [AuthService, JwtStrategy],</span></span>
<span class="line"><span>  //控制器</span></span>
<span class="line"><span>  controllers: [AuthController],</span></span>
<span class="line"><span>  //向外提供接口</span></span>
<span class="line"><span>  exports: [AuthService],</span></span>
<span class="line"><span>})</span></span>
<span class="line"><span>export class AuthModule {}</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br><span class="line-number">22</span><br><span class="line-number">23</span><br><span class="line-number">24</span><br><span class="line-number">25</span><br><span class="line-number">26</span><br><span class="line-number">27</span><br><span class="line-number">28</span><br><span class="line-number">29</span><br></div></div><h2 id="静态模块" tabindex="-1">静态模块 <a class="header-anchor" href="#静态模块" aria-label="Permalink to &quot;静态模块&quot;">​</a></h2><p>静态模块指模块是固定的，不需要根据不同参数改变模块的形为，比如现实生活中大叔对老婆的爱就是静态的，不会改变的。</p><p>下面是 <strong>auth.module.ts</strong> 静态模块</p><div class="language- vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>import { Module } from &#39;@nestjs/common&#39;</span></span>
<span class="line"><span>import { AuthController } from &#39;./auth.controller&#39;</span></span>
<span class="line"><span>import { AuthService } from &#39;./auth.service&#39;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>@Module({</span></span>
<span class="line"><span>  providers: [AuthService],</span></span>
<span class="line"><span>  controllers: [AuthController],</span></span>
<span class="line"><span>  exports: [AuthService],</span></span>
<span class="line"><span>})</span></span>
<span class="line"><span>export class AuthModule {}</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br></div></div><p>然后在<strong>app.module.ts</strong> 根模块中使用</p><div class="language- vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>import { Module } from &#39;@nestjs/common&#39;</span></span>
<span class="line"><span>import { AppController } from &#39;./app.controller&#39;</span></span>
<span class="line"><span>import { AuthModule } from &#39;./auth/auth.module&#39;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>@Module({</span></span>
<span class="line"><span>  imports: [AuthModule],</span></span>
<span class="line"><span>  controllers: [AppController],</span></span>
<span class="line"><span>  providers: [],</span></span>
<span class="line"><span>})</span></span>
<span class="line"><span>export class AppModule {}</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br></div></div><h2 id="动态模块" tabindex="-1">动态模块 <a class="header-anchor" href="#动态模块" aria-label="Permalink to &quot;动态模块&quot;">​</a></h2><p>动态模块指要根据参数动态定义，比如数据库管理模块，就要根据数据库的连接配置项动态定义。现实生活中大叔的心情就是动态的，比如打王者赢了就会开心，输了就会沮丧。</p><ul><li>动态模块是运行时通过编程方式动态创建的模块</li><li>动态模块可以使用 <strong>async</strong> 定义成异步的</li><li>如果要定义成全局模块，可以设置 <strong>global</strong> 属性为<strong>true</strong></li><li>动态模块必须返回与静态模块具有完全相同接口的对象，外加一个称为<code>module</code>的附加属性</li><li>动态模块除 <strong>module</strong> 属性外，模块选项对象的所有属性都是可选的</li><li>动态模块可以定义 <strong>imports</strong> 导入其他模块</li><li>定义动态模块时可以结合 <strong>@module</strong> 定义属性，最终两种方式会合并处理</li></ul><p>下面以登陆配置模块为例进行说明</p><h3 id="文件结构" tabindex="-1">文件结构 <a class="header-anchor" href="#文件结构" aria-label="Permalink to &quot;文件结构&quot;">​</a></h3><p>首先创建模块模块与服务</p><div class="language- vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>src/config</span></span>
<span class="line"><span>├── config.module.ts</span></span>
<span class="line"><span>└── config.service.ts</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br></div></div><p>然后创建配置项，用于记录网站的不同配置项</p><div class="language- vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>src/configure</span></span>
<span class="line"><span>├── app.ts</span></span>
<span class="line"><span>└── database.ts</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br></div></div><p>app.ts 内容如下</p><div class="language- vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>export default () =&gt; {</span></span>
<span class="line"><span>  return {</span></span>
<span class="line"><span>    app: {</span></span>
<span class="line"><span>      name: &#39;后盾人&#39;,</span></span>
<span class="line"><span>    },</span></span>
<span class="line"><span>  }</span></span>
<span class="line"><span>}</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br></div></div><p>database.ts 内容如下</p><div class="language- vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>export default () =&gt; {</span></span>
<span class="line"><span>  return {</span></span>
<span class="line"><span>    database: {</span></span>
<span class="line"><span>      host: &#39;localhost&#39;,</span></span>
<span class="line"><span>    },</span></span>
<span class="line"><span>  }</span></span>
<span class="line"><span>}</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br></div></div><h3 id="服务定义" tabindex="-1">服务定义 <a class="header-anchor" href="#服务定义" aria-label="Permalink to &quot;服务定义&quot;">​</a></h3><p>config.service.ts 内容如下</p><div class="language- vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>import { Injectable } from &#39;@nestjs/common&#39;</span></span>
<span class="line"><span>import { readdirSync } from &#39;fs&#39;</span></span>
<span class="line"><span>import path from &#39;path&#39;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>@Injectable()</span></span>
<span class="line"><span>export class ConfigService {</span></span>
<span class="line"><span>  //配置数据</span></span>
<span class="line"><span>  private config = {}</span></span>
<span class="line"><span>  constructor() {</span></span>
<span class="line"><span>    //配置文件存放目录</span></span>
<span class="line"><span>    const options = { path: path.resolve(__dirname, &#39;../configure&#39;) }</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    //遍历配置文件</span></span>
<span class="line"><span>    readdirSync(options.path).map(async (file) =&gt; {</span></span>
<span class="line"><span>      if (file.slice(-2) == &#39;js&#39;) {</span></span>
<span class="line"><span>        //加载配置文件内容</span></span>
<span class="line"><span>        const config = await import(path.join(options.path, file))</span></span>
<span class="line"><span>        this.config = { ...this.config, ...config.default() }</span></span>
<span class="line"><span>      }</span></span>
<span class="line"><span>    })</span></span>
<span class="line"><span>  }</span></span>
<span class="line"><span></span></span>
<span class="line"><span>  //读取配置项支持点语法</span></span>
<span class="line"><span>  public get(path: string) {</span></span>
<span class="line"><span>    return path.split(&#39;.&#39;).reduce((config, name) =&gt; config[name], this.config)</span></span>
<span class="line"><span>  }</span></span>
<span class="line"><span>}</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br><span class="line-number">22</span><br><span class="line-number">23</span><br><span class="line-number">24</span><br><span class="line-number">25</span><br><span class="line-number">26</span><br><span class="line-number">27</span><br></div></div><h3 id="模块定义" tabindex="-1">模块定义 <a class="header-anchor" href="#模块定义" aria-label="Permalink to &quot;模块定义&quot;">​</a></h3><p>现在修改 <strong>config.module.ts</strong> 内容发下</p><div class="language- vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>import { Module } from &#39;@nestjs/common&#39;</span></span>
<span class="line"><span>import { ConfigService } from &#39;./config.service&#39;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>@Module({</span></span>
<span class="line"><span>  providers: [ConfigService],</span></span>
<span class="line"><span>  exports: [ConfigService],</span></span>
<span class="line"><span>})</span></span>
<span class="line"><span>export class ConfigModule {}</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br></div></div><h3 id="使用测试" tabindex="-1">使用测试 <a class="header-anchor" href="#使用测试" aria-label="Permalink to &quot;使用测试&quot;">​</a></h3><p>在 <strong>app.module.ts</strong> 中导入 <strong>config.module.ts</strong> 模块</p><div class="language- vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>import { Module } from &#39;@nestjs/common&#39;</span></span>
<span class="line"><span>import { AppController } from &#39;./app.controller&#39;</span></span>
<span class="line"><span>import { AppService } from &#39;./app.service&#39;</span></span>
<span class="line"><span>import { ConfigModule } from &#39;./config/config.module&#39;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>@Module({</span></span>
<span class="line"><span>  imports: [ConfigModule],</span></span>
<span class="line"><span>  controllers: [AppController],</span></span>
<span class="line"><span>  providers: [AppService],</span></span>
<span class="line"><span>})</span></span>
<span class="line"><span>export class AppModule {}</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br></div></div><p>然后在 <strong>app.controller.ts</strong> 控制器中使用 <strong>config.service.ts</strong> 服务</p><div class="language- vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>import { ConfigService } from &#39;./config/config.service&#39;</span></span>
<span class="line"><span>import { Controller, Get } from &#39;@nestjs/common&#39;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>@Controller()</span></span>
<span class="line"><span>export class AppController {</span></span>
<span class="line"><span>  constructor(private readonly config: ConfigService) {}</span></span>
<span class="line"><span></span></span>
<span class="line"><span>  @Get()</span></span>
<span class="line"><span>  show() {</span></span>
<span class="line"><span>    return this.config.get(&#39;database.host&#39;)</span></span>
<span class="line"><span>  }</span></span>
<span class="line"><span>}</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br></div></div><p>现在在浏览器中访问，就可以读取到配置项了</p><h3 id="动态模块-1" tabindex="-1">动态模块 <a class="header-anchor" href="#动态模块-1" aria-label="Permalink to &quot;动态模块&quot;">​</a></h3><p>现在是可以使用配置项了，但我们希望配置项的目录 <strong>configure</strong> 目录是可以定义的，所以修改 <strong>config.module.ts</strong> 将其定义为动态模块。</p><div class="language- vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>import { DynamicModule, Module } from &#39;@nestjs/common&#39;</span></span>
<span class="line"><span>import { ConfigService } from &#39;./config.service&#39;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>@Module({</span></span>
<span class="line"><span>  providers: [ConfigService],</span></span>
<span class="line"><span>  exports: [ConfigService],</span></span>
<span class="line"><span>})</span></span>
<span class="line"><span>export class ConfigModule {</span></span>
<span class="line"><span>	//接收动态创建模块的参数 </span></span>
<span class="line"><span>  static register(options: { path: string }): DynamicModule {</span></span>
<span class="line"><span>    return {</span></span>
<span class="line"><span>      module: ConfigModule,</span></span>
<span class="line"><span>      //定义提供者用于保存参数，这样就可以被 ConfigService 服务使用了</span></span>
<span class="line"><span>      providers: [</span></span>
<span class="line"><span>        {</span></span>
<span class="line"><span>          provide: &#39;CONFIG_OPTIONS&#39;,</span></span>
<span class="line"><span>          useValue: options,</span></span>
<span class="line"><span>        },</span></span>
<span class="line"><span>      ],</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span>  }</span></span>
<span class="line"><span>}</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br><span class="line-number">22</span><br></div></div><p>接着修改 **config.service.ts ** 服务，让其他可以根据选项动态加载配置</p><div class="language- vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>import { Inject, Injectable, Optional } from &#39;@nestjs/common&#39;</span></span>
<span class="line"><span>import { readdirSync } from &#39;fs&#39;</span></span>
<span class="line"><span>import path from &#39;path&#39;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>@Injectable()</span></span>
<span class="line"><span>export class ConfigService {</span></span>
<span class="line"><span>  //配置数据</span></span>
<span class="line"><span>  constructor(</span></span>
<span class="line"><span>  	@Inject(&#39;CONFIG_OPTIONS&#39;) private options: { path: string }, </span></span>
<span class="line"><span>  	@Optional() private config = {}</span></span>
<span class="line"><span>  ) {</span></span>
<span class="line"><span>    //遍历配置文件</span></span>
<span class="line"><span>    readdirSync(options.path).map(async (file) =&gt; {</span></span>
<span class="line"><span>      if (file.slice(-2) == &#39;js&#39;) {</span></span>
<span class="line"><span>        //加载配置文件内容</span></span>
<span class="line"><span>        const config = await import(path.join(options.path, file))</span></span>
<span class="line"><span>        this.config = { ...this.config, ...config.default() }</span></span>
<span class="line"><span>      }</span></span>
<span class="line"><span>    })</span></span>
<span class="line"><span>  }</span></span>
<span class="line"><span></span></span>
<span class="line"><span>  //读取配置项支持点语法</span></span>
<span class="line"><span>  public get(path: string) {</span></span>
<span class="line"><span>    return path.split(&#39;.&#39;).reduce((config, name) =&gt; config[name], this.config)</span></span>
<span class="line"><span>  }</span></span>
<span class="line"><span>}</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br><span class="line-number">22</span><br><span class="line-number">23</span><br><span class="line-number">24</span><br><span class="line-number">25</span><br><span class="line-number">26</span><br></div></div><p>现在就可以在 <strong>app.module.ts</strong> 模块中灵活的指定配置项的加载目录了</p><div class="language- vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>import { Module } from &#39;@nestjs/common&#39;</span></span>
<span class="line"><span>import path from &#39;path&#39;</span></span>
<span class="line"><span>import { AppController } from &#39;./app.controller&#39;</span></span>
<span class="line"><span>import { AppService } from &#39;./app.service&#39;</span></span>
<span class="line"><span>import { ConfigModule } from &#39;./config/config.module&#39;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>@Module({</span></span>
<span class="line"><span>  imports: [</span></span>
<span class="line"><span>  	ConfigModule.register({ path: path.resolve(__dirname, &#39;./configure/&#39;) })</span></span>
<span class="line"><span>  ],</span></span>
<span class="line"><span>  controllers: [AppController],</span></span>
<span class="line"><span>  providers: [AppService],</span></span>
<span class="line"><span>})</span></span>
<span class="line"><span>export class AppModule {}</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br></div></div><h2 id="全局模块" tabindex="-1">全局模块 <a class="header-anchor" href="#全局模块" aria-label="Permalink to &quot;全局模块&quot;">​</a></h2><p>使用**@Global<strong>装饰器定义的模块为全局模块，其他模块在使用全局模块时不需要</strong>imports**导入该模块</p><ul><li><strong>@Global</strong> 装饰器将模块定义为全局作用域，其他模块不需要使用 <strong>imports</strong> 引入该模块就可以使用</li><li>全局模块也需要使用 <strong>exports</strong> 选项向其他模块提供接口</li><li>不建议将模块都定义为全局模块，但像配置模块是广泛使用的，可以定义为全局模块</li></ul><h3 id="装饰器" tabindex="-1">装饰器 <a class="header-anchor" href="#装饰器" aria-label="Permalink to &quot;装饰器&quot;">​</a></h3><p>我们可以使用 <strong>@Global</strong> 装饰器来将模块声明为全局模块</p><div class="language- vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>@Global()</span></span>
<span class="line"><span>@Module({</span></span>
<span class="line"><span>  providers: [AuthService],</span></span>
<span class="line"><span>  exports: [AuthService],</span></span>
<span class="line"><span>})</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br></div></div><h3 id="动态模块-2" tabindex="-1">动态模块 <a class="header-anchor" href="#动态模块-2" aria-label="Permalink to &quot;动态模块&quot;">​</a></h3><p>上面讲解的动态模块也可使用 <strong>global</strong> 属性或 <strong>@Global</strong> 装饰器定义动态模块</p><div class="language- vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>import { DynamicModule, Global, Module } from &#39;@nestjs/common&#39;</span></span>
<span class="line"><span>import { ConfigService } from &#39;./config.service&#39;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>@Module({</span></span>
<span class="line"><span>  providers: [ConfigService],</span></span>
<span class="line"><span>  exports: [ConfigService],</span></span>
<span class="line"><span>})</span></span>
<span class="line"><span>export class ConfigModule {</span></span>
<span class="line"><span>  static register(options: { path: string }): DynamicModule {</span></span>
<span class="line"><span>    return {</span></span>
<span class="line"><span>      module: ConfigModule,</span></span>
<span class="line"><span>      //定义全局模块</span></span>
<span class="line"><span>      global: true,</span></span>
<span class="line"><span>      providers: [</span></span>
<span class="line"><span>        {</span></span>
<span class="line"><span>          provide: &#39;CONFIG_OPTIONS&#39;,</span></span>
<span class="line"><span>          useValue: options,</span></span>
<span class="line"><span>        },</span></span>
<span class="line"><span>      ],</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span>  }</span></span>
<span class="line"><span>}</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br><span class="line-number">22</span><br></div></div><h3 id="运行测试" tabindex="-1">运行测试 <a class="header-anchor" href="#运行测试" aria-label="Permalink to &quot;运行测试&quot;">​</a></h3><p>现在你可以创建 <strong>test.module.ts</strong> 与 <strong>test.controller.ts</strong> 进行测试</p><p>test.module.ts 的内容如下</p><div class="language- vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>import { Module } from &#39;@nestjs/common&#39;</span></span>
<span class="line"><span>import { TestController } from &#39;./test.controller&#39;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>@Module({</span></span>
<span class="line"><span>  controllers: [TestController],</span></span>
<span class="line"><span>})</span></span>
<span class="line"><span>export class TestModule {}</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br></div></div><p>test.controller.ts 内容如下</p><div class="language- vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>import { ConfigService } from &#39;./../config/config.service&#39;</span></span>
<span class="line"><span>import { Controller, Get } from &#39;@nestjs/common&#39;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>@Controller(&#39;test&#39;)</span></span>
<span class="line"><span>export class TestController {</span></span>
<span class="line"><span>  constructor(private config: ConfigService) {}</span></span>
<span class="line"><span>  @Get()</span></span>
<span class="line"><span>  get() {</span></span>
<span class="line"><span>    return this.config.get(&#39;app.name&#39;)</span></span>
<span class="line"><span>  }</span></span>
<span class="line"><span>}</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br></div></div><p>现在访问 <strong>localhost:3000/test</strong> 可以查看到结果</p>`,66),i=[l];function r(c,t,o,b,u,m){return a(),n("div",null,i)}const g=s(e,[["render",r]]);export{h as __pageData,g as default};
