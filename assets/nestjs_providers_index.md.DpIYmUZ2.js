import{_ as s,c as n,o as a,a5 as p}from"./chunks/framework.B3zOJzUV.js";const h=JSON.parse('{"title":"提供者","description":"","frontmatter":{},"headers":[],"relativePath":"nestjs/providers/index.md","filePath":"nestjs/providers/index.md","lastUpdated":1713787480000}'),e={name:"nestjs/providers/index.md"},l=p(`<h1 id="提供者" tabindex="-1">提供者 <a class="header-anchor" href="#提供者" aria-label="Permalink to &quot;提供者&quot;">​</a></h1><p>在模块中使用 <strong>providers</strong> 声明提供者，提供者需要被注册到模块的服务容器中，才可被依赖注入。</p><ul><li>提供者使用 <strong>@Injectable()</strong> 装饰器定义，这样系统会分析 <strong>constructor</strong> 进行依赖注入</li><li>提供者在模块的 <strong>providers</strong> 属性中定义，用于注册到服务容器中，用于被其他类依赖注入</li><li>提供者可以在自身的constructor构造函数中依赖注入其他服务提供者，需要使用 <strong>@Injectable()</strong> 装饰器声明该提供者</li><li>注册到容器的提供者，默认只对当前模块有效，即作用域为模块</li><li>可以使用 <strong>exports</strong> 导出给其他模块使用</li><li>提供者是单例的</li><li>提供者可以是任何值，而不仅仅是服务类</li></ul><p>提供者在模块的<strong>providers</strong>属性中声明，我们有多种将提供者注册到容器的方法，下面来学习使用。</p><h2 id="基本数据" tabindex="-1">基本数据 <a class="header-anchor" href="#基本数据" aria-label="Permalink to &quot;基本数据&quot;">​</a></h2><p>我们也可以将普通数据使用 useValue 注册到服务容器</p><div class="language- vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span>@Module({</span></span>
<span class="line"><span>  providers: [{</span></span>
<span class="line"><span>    provide: &#39;APP_NAME&#39;,</span></span>
<span class="line"><span>    useValue: &#39;后盾人-向军大叔&#39;,</span></span>
<span class="line"><span>  }],</span></span>
<span class="line"><span>})</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br></div></div><p>因为普通数据服务不是<strong>class</strong>，所以要使用**@Inject**进行注入</p><div class="language- vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span>@Injectable()</span></span>
<span class="line"><span>export class AuthService {</span></span>
<span class="line"><span>  constructor(</span></span>
<span class="line"><span>    @Inject(&#39;APP_NAME&#39;)</span></span>
<span class="line"><span>    private appName,</span></span>
<span class="line"><span>  ) {}</span></span>
<span class="line"><span>  show() {</span></span>
<span class="line"><span>    return this.appName</span></span>
<span class="line"><span>  }</span></span>
<span class="line"><span>  ...</span></span>
<span class="line"><span>}</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br></div></div><h2 id="类注册" tabindex="-1">类注册 <a class="header-anchor" href="#类注册" aria-label="Permalink to &quot;类注册&quot;">​</a></h2><p>使用类将提供者注册到服务容器是最常用的方式。</p><h3 id="基本使用" tabindex="-1">基本使用 <a class="header-anchor" href="#基本使用" aria-label="Permalink to &quot;基本使用&quot;">​</a></h3><p>下面是常用的使用类将提供者注册到容器的方式</p><div class="language- vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span>@Module({</span></span>
<span class="line"><span>  providers: [AuthService],</span></span>
<span class="line"><span>})</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br></div></div><p>以上是简写形式，完整写法应该如下</p><div class="language- vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span>@Module({</span></span>
<span class="line"><span>  providers: [{</span></span>
<span class="line"><span>    provide: AuthService,</span></span>
<span class="line"><span>    useClass: AuthService,</span></span>
<span class="line"><span>  }],</span></span>
<span class="line"><span>})</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br></div></div><h3 id="动态注册" tabindex="-1">动态注册 <a class="header-anchor" href="#动态注册" aria-label="Permalink to &quot;动态注册&quot;">​</a></h3><p>下面实现根据不同的环境创建不同的服务，首先安装 <strong>dotenv</strong> 扩展包，用来读取**.env**环境变量。</p><div class="language- vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span>pnpm add dotenv</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br></div></div><p>然后创建两个服务 <strong>app.service.ts</strong> 与 <strong>hd.service.ts</strong></p><p>appService.ts 内容</p><div class="language- vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span>import { Injectable } from &#39;@nestjs/common&#39;;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>@Injectable()</span></span>
<span class="line"><span>export class AppService {</span></span>
<span class="line"><span>  getHello(): string {</span></span>
<span class="line"><span>    return &#39;app getHello&#39;;</span></span>
<span class="line"><span>  }</span></span>
<span class="line"><span>}</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br></div></div><p>hd.service.ts 内容</p><div class="language- vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span>import { Injectable } from &#39;@nestjs/common&#39;;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>@Injectable()</span></span>
<span class="line"><span>export class HdService {</span></span>
<span class="line"><span>  getHello(): string {</span></span>
<span class="line"><span>    return &#39;hd getHello&#39;;</span></span>
<span class="line"><span>  }</span></span>
<span class="line"><span>}</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br></div></div><p>然后在模块中根据环境变量动态设置服务</p><div class="language- vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span>import { Module } from &#39;@nestjs/common&#39;;</span></span>
<span class="line"><span>import { config } from &#39;dotenv&#39;;</span></span>
<span class="line"><span>import path from &#39;path&#39;;</span></span>
<span class="line"><span>import { AppController } from &#39;./app.controller&#39;;</span></span>
<span class="line"><span>import { AppService } from &#39;./app.service&#39;;</span></span>
<span class="line"><span>import { HdService } from &#39;./hd.service&#39;;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>//读取.env 到 process.env 环境变量中</span></span>
<span class="line"><span>config({ path: path.join(__dirname, &#39;../.env&#39;) });</span></span>
<span class="line"><span></span></span>
<span class="line"><span>const appService = {</span></span>
<span class="line"><span>  provide: AppService,</span></span>
<span class="line"><span>  useClass: process.env.NODE_ENV === &#39;development&#39; ? AppService : HdService,</span></span>
<span class="line"><span>};</span></span>
<span class="line"><span></span></span>
<span class="line"><span>@Module({</span></span>
<span class="line"><span>  imports: [],</span></span>
<span class="line"><span>  controllers: [AppController],</span></span>
<span class="line"><span>  providers: [appService],</span></span>
<span class="line"><span>})</span></span>
<span class="line"><span>export class AppModule {}</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br></div></div><h2 id="工厂函数" tabindex="-1">工厂函数 <a class="header-anchor" href="#工厂函数" aria-label="Permalink to &quot;工厂函数&quot;">​</a></h2><p>针对于复杂要求的<strong>provider</strong> ，我们可以使用 <strong>useFactory</strong> 工厂函数对提供者进行注册。</p><h3 id="基本使用-1" tabindex="-1">基本使用 <a class="header-anchor" href="#基本使用-1" aria-label="Permalink to &quot;基本使用&quot;">​</a></h3><p>下面使用工厂函数注册基本数据</p><div class="language- vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span>import { Module } from &#39;@nestjs/common&#39;</span></span>
<span class="line"><span>import { AuthController } from &#39;./auth.controller&#39;</span></span>
<span class="line"><span>import { AuthService } from &#39;./auth.service&#39;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>class XjClass {</span></span>
<span class="line"><span>  make() {</span></span>
<span class="line"><span>    return &#39;this is XjClass Make Method&#39;</span></span>
<span class="line"><span>  }</span></span>
<span class="line"><span>}</span></span>
<span class="line"><span>@Module({</span></span>
<span class="line"><span>  providers: [</span></span>
<span class="line"><span>    AuthService,</span></span>
<span class="line"><span>    XjClass,</span></span>
<span class="line"><span>    {</span></span>
<span class="line"><span>      provide: &#39;HD&#39;,</span></span>
<span class="line"><span>      //依赖注入其他提供者,将做为参数传递给 useFactory 方法</span></span>
<span class="line"><span>      inject: [XjClass],</span></span>
<span class="line"><span>      useFactory: (xjClass) =&gt; {</span></span>
<span class="line"><span>        return xjClass.make()</span></span>
<span class="line"><span>      },</span></span>
<span class="line"><span>    },</span></span>
<span class="line"><span>  ],</span></span>
<span class="line"><span>  controllers: [AuthController],</span></span>
<span class="line"><span>})</span></span>
<span class="line"><span>export class AuthModule {}</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br><span class="line-number">22</span><br><span class="line-number">23</span><br><span class="line-number">24</span><br><span class="line-number">25</span><br></div></div><p>在其他服务中使用定义的HD提供者</p><div class="language- vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span>@Injectable()</span></span>
<span class="line"><span>export class AuthService {</span></span>
<span class="line"><span>  constructor(</span></span>
<span class="line"><span>    @Inject(&#39;HD&#39;)</span></span>
<span class="line"><span>    private hd</span></span>
<span class="line"><span>  ) {}</span></span>
<span class="line"><span>  show() {</span></span>
<span class="line"><span>    return this.hd</span></span>
<span class="line"><span>  }</span></span>
<span class="line"><span>  ...</span></span>
<span class="line"><span>}</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br></div></div><h3 id="动态配置" tabindex="-1">动态配置 <a class="header-anchor" href="#动态配置" aria-label="Permalink to &quot;动态配置&quot;">​</a></h3><p>下面使用工厂函数实现根据.env 环境变量值，加载不同配置项。</p><p>首先创建<code>config/development.config.ts</code> 与<code>config/production.config.ts</code> 配置文件</p><p>development.config.ts</p><div class="language- vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span>export const devConfig = {</span></span>
<span class="line"><span>  url: &#39;localhost&#39;,</span></span>
<span class="line"><span>};</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br></div></div><p>production.config.ts</p><div class="language- vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span>export const productionConfig = {</span></span>
<span class="line"><span>  url: &#39;houdunren.com&#39;,</span></span>
<span class="line"><span>};</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br></div></div><p>然后在模块中使用 useFactory 动态注册配置</p><div class="language- vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span>import { Module } from &#39;@nestjs/common&#39;;</span></span>
<span class="line"><span>import { config } from &#39;dotenv&#39;;</span></span>
<span class="line"><span>import path from &#39;path&#39;;</span></span>
<span class="line"><span>import { AppController } from &#39;./app.controller&#39;;</span></span>
<span class="line"><span>import { devConfig } from &#39;./config/development.config&#39;;</span></span>
<span class="line"><span>import { productionConfig } from &#39;./config/production.config&#39;;</span></span>
<span class="line"><span>config({ path: path.join(__dirname, &#39;../.env&#39;) });</span></span>
<span class="line"><span></span></span>
<span class="line"><span>const configService = {</span></span>
<span class="line"><span>  provide: &#39;config&#39;,</span></span>
<span class="line"><span>  useFactory() {</span></span>
<span class="line"><span>    return process.env.NODE_ENV === &#39;development&#39;</span></span>
<span class="line"><span>      ? devConfig</span></span>
<span class="line"><span>      : productionConfig;</span></span>
<span class="line"><span>  },</span></span>
<span class="line"><span>};</span></span>
<span class="line"><span>@Module({</span></span>
<span class="line"><span>  imports: [],</span></span>
<span class="line"><span>  controllers: [AppController],</span></span>
<span class="line"><span>  providers: [appService, configService],</span></span>
<span class="line"><span>})</span></span>
<span class="line"><span>export class AppModule {}</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br><span class="line-number">22</span><br></div></div><h2 id="服务导出" tabindex="-1">服务导出 <a class="header-anchor" href="#服务导出" aria-label="Permalink to &quot;服务导出&quot;">​</a></h2><p>默认情况下服务只在当前模块有效，如果服务要供其他模块使用，需要在该服务所在模块的 <strong>exports</strong> 属性中声明导出。</p><h3 id="导出服务" tabindex="-1">导出服务 <a class="header-anchor" href="#导出服务" aria-label="Permalink to &quot;导出服务&quot;">​</a></h3><p>下例是将 xj.module.ts 模块的服务 XjService 导出给其他模块使用。</p><div class="language- vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span>import { Module } from &#39;@nestjs/common&#39;;</span></span>
<span class="line"><span>import { XjService } from &#39;./xj.service&#39;;</span></span>
<span class="line"><span>import { XjController } from &#39;./xj.controller&#39;;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>@Module({</span></span>
<span class="line"><span>  providers: [XjService],</span></span>
<span class="line"><span>  controllers: [XjController],</span></span>
<span class="line"><span>  exports: [XjService],</span></span>
<span class="line"><span>})</span></span>
<span class="line"><span>export class XjModule {}</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br></div></div><h3 id="导入服务" tabindex="-1">导入服务 <a class="header-anchor" href="#导入服务" aria-label="Permalink to &quot;导入服务&quot;">​</a></h3><p>其他模块需要<strong>imports</strong>导入该模块后,才可以使用该模块导出的服务，下面是 HdModule 模块使用 XjModule 的 XjService 服务的定义。</p><div class="language- vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span>import { XjModule } from &#39;./../xj/xj.module&#39;;</span></span>
<span class="line"><span>import { Module } from &#39;@nestjs/common&#39;;</span></span>
<span class="line"><span>import { HdController } from &#39;./hd.controller&#39;;</span></span>
<span class="line"><span>import { HdService } from &#39;./hd.service&#39;;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>@Module({</span></span>
<span class="line"><span>  imports: [XjModule],</span></span>
<span class="line"><span>  controllers: [HdController],</span></span>
<span class="line"><span>  providers: [HdService],</span></span>
<span class="line"><span>})</span></span>
<span class="line"><span>export class HdModule {}</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br></div></div><h2 id="异步提供者" tabindex="-1">异步提供者 <a class="header-anchor" href="#异步提供者" aria-label="Permalink to &quot;异步提供者&quot;">​</a></h2><p>我们也可以注册异步提供者，用于对异步业务的处理。</p><h3 id="声明导出" tabindex="-1">声明导出 <a class="header-anchor" href="#声明导出" aria-label="Permalink to &quot;声明导出&quot;">​</a></h3><p>下面在 <strong>HdModule</strong> 模块中定义异步提供者 <strong>XjAsyncService</strong></p><div class="language- vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span>import { Module } from &#39;@nestjs/common&#39;;</span></span>
<span class="line"><span>import { HdController } from &#39;./hd.controller&#39;;</span></span>
<span class="line"><span>import { HdService } from &#39;./hd.service&#39;;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>@Module({</span></span>
<span class="line"><span>  imports: [],</span></span>
<span class="line"><span>  controllers: [HdController],</span></span>
<span class="line"><span>  providers: [</span></span>
<span class="line"><span>    HdService,</span></span>
<span class="line"><span>    {</span></span>
<span class="line"><span>      provide: &#39;HdAsyncService&#39;,</span></span>
<span class="line"><span>      useFactory: async () =&gt; {</span></span>
<span class="line"><span>        return new Promise((r) =&gt; {</span></span>
<span class="line"><span>          setTimeout(() =&gt; {</span></span>
<span class="line"><span>            r(&#39;向军大叔&#39;);</span></span>
<span class="line"><span>          }, 3000);</span></span>
<span class="line"><span>        });</span></span>
<span class="line"><span>      },</span></span>
<span class="line"><span>    },</span></span>
<span class="line"><span>  ],</span></span>
<span class="line"><span>  exports: [HdService, &#39;HdAsyncService&#39;],</span></span>
<span class="line"><span>})</span></span>
<span class="line"><span>export class HdModule {}</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br><span class="line-number">22</span><br><span class="line-number">23</span><br></div></div><h3 id="使用提供者" tabindex="-1">使用提供者 <a class="header-anchor" href="#使用提供者" aria-label="Permalink to &quot;使用提供者&quot;">​</a></h3><p>然后在 <strong>XjModule</strong> 中使用 <strong>HdModule</strong> 模块导出的 <strong>HdAsyncService</strong></p><div class="language- vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span>import { Module } from &#39;@nestjs/common&#39;;</span></span>
<span class="line"><span>import { HdModule } from &#39;./../hd/hd.module&#39;;</span></span>
<span class="line"><span>import { XjController } from &#39;./xj.controller&#39;;</span></span>
<span class="line"><span>import { XjService } from &#39;./xj.service&#39;;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>@Module({</span></span>
<span class="line"><span>  imports: [HdModule],</span></span>
<span class="line"><span>  providers: [XjService],</span></span>
<span class="line"><span>  controllers: [XjController],</span></span>
<span class="line"><span>  exports: [XjService],</span></span>
<span class="line"><span>})</span></span>
<span class="line"><span>export class XjModule {}</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br></div></div><p>现在就可以在 <strong>XjModule</strong> 模块的控制器中使用 HdAsyncService 服务了</p><div class="language- vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span>import { Controller, Get, Inject } from &#39;@nestjs/common&#39;;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>@Controller(&#39;xj&#39;)</span></span>
<span class="line"><span>export class XjController {</span></span>
<span class="line"><span>  constructor(</span></span>
<span class="line"><span>    @Inject(&#39;XjAsyncService&#39;)</span></span>
<span class="line"><span>    private readonly xjAsyncService: string,</span></span>
<span class="line"><span>  ) {}</span></span>
<span class="line"><span>  @Get()</span></span>
<span class="line"><span>  show() {</span></span>
<span class="line"><span>    return this.xjAsyncService;</span></span>
<span class="line"><span>  }</span></span>
<span class="line"><span>}</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br></div></div>`,60),r=[l];function i(c,o,t,b,u,d){return a(),n("div",null,r)}const v=s(e,[["render",i]]);export{h as __pageData,v as default};
