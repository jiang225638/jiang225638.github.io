import{_ as s,c as n,o as a,a4 as p}from"./chunks/framework.Dze4BnPo.js";const g=JSON.parse('{"title":"项目配置","description":"","frontmatter":{},"headers":[],"relativePath":"nestjs/proConfig/index.md","filePath":"nestjs/proConfig/index.md","lastUpdated":1713787480000}'),e={name:"nestjs/proConfig/index.md"},l=p(`<h1 id="项目配置" tabindex="-1">项目配置 <a class="header-anchor" href="#项目配置" aria-label="Permalink to &quot;项目配置&quot;">​</a></h1><h2 id="安装依赖" tabindex="-1">安装依赖 <a class="header-anchor" href="#安装依赖" aria-label="Permalink to &quot;安装依赖&quot;">​</a></h2><p><a href="https://docs.nestjs.com/techniques/configuration#configuration" target="_blank" rel="noreferrer">网站配置</a>管理使用 @nestjs/config 扩展包，首先安装扩展包。</p><div class="language- vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>pnpm add @nestjs/config</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br></div></div><p>在根模块app.module.ts中配置</p><div class="language- vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>...</span></span>
<span class="line"><span>import { ConfigModule } from &#39;@nestjs/config&#39;;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>@Module({</span></span>
<span class="line"><span>  imports: [</span></span>
<span class="line"><span>   	...</span></span>
<span class="line"><span>    ConfigModule.forRoot({</span></span>
<span class="line"><span>    	//全局模块</span></span>
<span class="line"><span>      isGlobal: true,</span></span>
<span class="line"><span>    }),</span></span>
<span class="line"><span>  ],</span></span>
<span class="line"><span> 	...</span></span>
<span class="line"><span>})</span></span>
<span class="line"><span>...</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br></div></div><p>系统会自动加载**.env**中的内容</p><div class="language- vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>DATABASE_URL=&quot;mysql://root:admin888@127.0.0.1:3306/nest&quot;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>DB_CONNECTION=mysql</span></span>
<span class="line"><span>DB_HOST=127.0.0.1</span></span>
<span class="line"><span>DB_PORT=3306</span></span>
<span class="line"><span>DB_DATABASE=nest</span></span>
<span class="line"><span>DB_USERNAME=root</span></span>
<span class="line"><span>DB_PASSWORD=admin888</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br></div></div><p>在任何的模块的服务中通过依赖注入使用</p><div class="language- vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>import { Injectable } from &#39;@nestjs/common&#39;;</span></span>
<span class="line"><span>import { ConfigService } from &#39;@nestjs/config&#39;;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>@Injectable()</span></span>
<span class="line"><span>export class PrismaService  {</span></span>
<span class="line"><span>  constructor(config: ConfigService) {</span></span>
<span class="line"><span>		console.log(config.get(&#39;DB_HOST&#39;))</span></span>
<span class="line"><span>  }</span></span>
<span class="line"><span>}</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br></div></div><h2 id="env文件" tabindex="-1">env文件 <a class="header-anchor" href="#env文件" aria-label="Permalink to &quot;env文件&quot;">​</a></h2><p>ConfigModule模块会加载.env配置项</p><ol><li>在开发时.env会有一些隐私数据，所以建议将**.env<strong>放在</strong>.gitignore**文件中</li><li>创建一个和**.env<strong>配置名一样的</strong>.env.example<strong>文件，上线后将其改名为</strong>.env**</li></ol><p><strong>.env</strong></p><p>该文件用于开发时使用，要定义在 <strong>.gitignore</strong>中，不提交到版本库</p><div class="language- vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>#数据库连接</span></span>
<span class="line"><span>DATABASE_URL=&quot;mysql://root:admin888@localhost:3306/nest-edu&quot;</span></span>
<span class="line"><span>NODE_ENV=development</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br></div></div><p><strong>.env.example</strong></p><p>该文件是生产环境使用的参考文件，要提交到版本库。</p><p>网站上线后将该文件复制一个，并修改文件名为**.env** 文件，并修改里面配置项内容</p><div class="language- vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>#数据库连接</span></span>
<span class="line"><span>DATABASE_URL=&quot;mysql://root:houdunren@localhost:3306/nest-edu&quot;</span></span>
<span class="line"><span>NODE_ENV=production</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br></div></div><p>现在可以在代码中使用 <strong>process.env.NODE_ENV</strong> 区分开发环境还是线上环境</p><h3 id="模块定义" tabindex="-1">模块定义 <a class="header-anchor" href="#模块定义" aria-label="Permalink to &quot;模块定义&quot;">​</a></h3><p>在 <strong>app.module.ts</strong> 模块中对<strong>ConfigModule</strong>进行定义</p><ul><li>使用 <strong>envFilePath</strong> 加载多个env配置文件</li><li>多个env文件有同名配置项时，前面的优先级高</li></ul><div class="language- vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>import { ConfigModule } from &#39;@nestjs/config&#39;</span></span>
<span class="line"><span>import { Module } from &#39;@nestjs/common&#39;</span></span>
<span class="line"><span>import { AppController } from &#39;./app.controller&#39;</span></span>
<span class="line"><span>import { AppService } from &#39;./app.service&#39;</span></span>
<span class="line"><span>import config from &#39;./config&#39;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>@Module({</span></span>
<span class="line"><span>  imports: [</span></span>
<span class="line"><span>    ConfigModule.forRoot({</span></span>
<span class="line"><span>      isGlobal: true,</span></span>
<span class="line"><span>    }),</span></span>
<span class="line"><span>  ],</span></span>
<span class="line"><span>  controllers: [AppController],</span></span>
<span class="line"><span>  providers: [AppService],</span></span>
<span class="line"><span>})</span></span>
<span class="line"><span>export class AppModule {}</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br></div></div><h3 id="版本库" tabindex="-1">版本库 <a class="header-anchor" href="#版本库" aria-label="Permalink to &quot;版本库&quot;">​</a></h3><p><strong>.env</strong>会包含开发时的私密信息，如理阿里云密钥等。所以将**.env<strong>文件放在</strong>.gitignore**中忽略提交。</p><p>然后在项目中创建一个同样的**.env.example** 文件，在生产环境中把 <strong>.env.example</strong> 内容改名为**.env**后使用。</p><p>这样做可以保护隐私数据不提交到GIT，尤其对于开源项目这很重要。</p><h2 id="多文件配置" tabindex="-1">多文件配置 <a class="header-anchor" href="#多文件配置" aria-label="Permalink to &quot;多文件配置&quot;">​</a></h2><p>我们也可以单独对配置文件进行管理</p><h3 id="文件定义" tabindex="-1">文件定义 <a class="header-anchor" href="#文件定义" aria-label="Permalink to &quot;文件定义&quot;">​</a></h3><p>下面在 <strong>src/config</strong> 目录定义两个配置文件</p><p>src/config/app.ts</p><div class="language- vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>export default () =&gt; ({</span></span>
<span class="line"><span>  app: {</span></span>
<span class="line"><span>    name: &#39;houdunren.com&#39;,</span></span>
<span class="line"><span>    isDev: process.env.NODE_ENV==&#39;development&#39;,</span></span>
<span class="line"><span>  },</span></span>
<span class="line"><span>  </span></span>
<span class="line"><span>})</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br></div></div><p>src/config/database.ts</p><div class="language- vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>export default () =&gt; ({</span></span>
<span class="line"><span>  database: {</span></span>
<span class="line"><span>    url: &#39;localhost&#39;,</span></span>
<span class="line"><span>  },</span></span>
<span class="line"><span>})</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br></div></div><h3 id="模块声明" tabindex="-1">模块声明 <a class="header-anchor" href="#模块声明" aria-label="Permalink to &quot;模块声明&quot;">​</a></h3><p>然后在<strong>ConfigModule</strong>模块中使用 <strong>load</strong> 属性声明加载</p><div class="language- vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>import { ConfigModule } from &#39;@nestjs/config&#39;</span></span>
<span class="line"><span>import { Module } from &#39;@nestjs/common&#39;</span></span>
<span class="line"><span>import { AppController } from &#39;./app.controller&#39;</span></span>
<span class="line"><span>import { AppService } from &#39;./app.service&#39;</span></span>
<span class="line"><span>import config from &#39;./config/app.ts&#39;</span></span>
<span class="line"><span>import database from &#39;./config/database.ts&#39;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>@Module({</span></span>
<span class="line"><span>  imports: [</span></span>
<span class="line"><span>    ConfigModule.forRoot({</span></span>
<span class="line"><span>      isGlobal: true,</span></span>
<span class="line"><span>      //可以加载多个配置文件</span></span>
<span class="line"><span>      load: [app,database],</span></span>
<span class="line"><span>    }),</span></span>
<span class="line"><span>  ],</span></span>
<span class="line"><span>  controllers: [AppController],</span></span>
<span class="line"><span>  providers: [AppService],</span></span>
<span class="line"><span>})</span></span>
<span class="line"><span>export class AppModule {}</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br></div></div><p>现在可以在项目中使用点语法读取配置项了</p><div class="language- vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>@Injectable()</span></span>
<span class="line"><span>export class AppService {</span></span>
<span class="line"><span>  constructor(private configService: ConfigService) {}</span></span>
<span class="line"><span>  getHello(): string {</span></span>
<span class="line"><span>    return this.configService.get(&#39;app.name&#39;)</span></span>
<span class="line"><span>  }</span></span>
<span class="line"><span>}</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br></div></div><h3 id="文件合并" tabindex="-1">文件合并 <a class="header-anchor" href="#文件合并" aria-label="Permalink to &quot;文件合并&quot;">​</a></h3><p>如果你项目不复杂，也可以把上面两个配置文件，合并到一个文件中。以下是 <strong>src/config.ts</strong> 文件的内容</p><div class="language- vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>export default () =&gt; ({</span></span>
<span class="line"><span>  app: {</span></span>
<span class="line"><span>    name: &#39;houdunren.com&#39;,</span></span>
<span class="line"><span>    isDev: process.env.NODE_ENV==&#39;development&#39;,</span></span>
<span class="line"><span>  },</span></span>
<span class="line"><span>  database: {</span></span>
<span class="line"><span>    url: &#39;localhost&#39;,</span></span>
<span class="line"><span>  },</span></span>
<span class="line"><span>})</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br></div></div><p>然后在模块中引入这个文件</p><div class="language- vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>import { ConfigModule } from &#39;@nestjs/config&#39;</span></span>
<span class="line"><span>import { Module } from &#39;@nestjs/common&#39;</span></span>
<span class="line"><span>import { AppController } from &#39;./app.controller&#39;</span></span>
<span class="line"><span>import { AppService } from &#39;./app.service&#39;</span></span>
<span class="line"><span>import config from &#39;./config.ts&#39;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>@Module({</span></span>
<span class="line"><span>  imports: [</span></span>
<span class="line"><span>    ConfigModule.forRoot({</span></span>
<span class="line"><span>      isGlobal: true,</span></span>
<span class="line"><span>      load: [config],</span></span>
<span class="line"><span>    }),</span></span>
<span class="line"><span>  ],</span></span>
<span class="line"><span>  controllers: [AppController],</span></span>
<span class="line"><span>  providers: [AppService],</span></span>
<span class="line"><span>})</span></span>
<span class="line"><span>export class AppModule {}</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br></div></div><h2 id="命名空间" tabindex="-1">命名空间 <a class="header-anchor" href="#命名空间" aria-label="Permalink to &quot;命名空间&quot;">​</a></h2><p>使用<a href="https://docs.nestjs.com/techniques/configuration#configuration-namespaces" target="_blank" rel="noreferrer">命名空间</a>这种方式处理配置项，也可以实现多文件管理，并会有TS类型提示。下面以创建数据库连接为例，进行说明。</p><h3 id="文件定义-1" tabindex="-1">文件定义 <a class="header-anchor" href="#文件定义-1" aria-label="Permalink to &quot;文件定义&quot;">​</a></h3><p>首先创建配置文件 <code>src/config/database.config.ts</code>，内容如下：</p><div class="language- vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>import { registerAs } from &#39;@nestjs/config&#39;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>export default registerAs(&#39;database&#39;, () =&gt; ({</span></span>
<span class="line"><span>  url: process.env.DATABASE_URL,</span></span>
<span class="line"><span>}))</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br></div></div><p>然后定义合并导入文件<code>config/database/index.ts</code></p><div class="language- vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>import databaseConfig from &#39;src/config/database.config&#39;</span></span>
<span class="line"><span>export default [databaseConfig]</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br></div></div><h3 id="模块声明-1" tabindex="-1">模块声明 <a class="header-anchor" href="#模块声明-1" aria-label="Permalink to &quot;模块声明&quot;">​</a></h3><p>然后在 <code>app.module.ts</code> 中模块定义</p><div class="language- vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>...</span></span>
<span class="line"><span>import config from &#39;./config&#39;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>@Module({</span></span>
<span class="line"><span>  imports: [ConfigModule.forRoot({ load: [...config] })],</span></span>
<span class="line"><span>  controllers: [AppController],</span></span>
<span class="line"><span>  providers: [AppService],</span></span>
<span class="line"><span>})</span></span>
<span class="line"><span>export class AppModule {}</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br></div></div><h3 id="使用方法" tabindex="-1">使用方法 <a class="header-anchor" href="#使用方法" aria-label="Permalink to &quot;使用方法&quot;">​</a></h3><p>接着在<code>app.service.ts</code>中使用</p><ul><li>使用 <code>@Inject(databaseConfig.KEY) </code>注入配置项</li><li><code>ConfigType&lt;typeof databaseConfig&gt;</code> 用于定义类型，这样在使用时就有类型提示了</li></ul><div class="language- vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>import { ConfigType } from &#39;@nestjs/config&#39;</span></span>
<span class="line"><span>import databaseConfig from &#39;src/config/database.config&#39;</span></span>
<span class="line"><span>import { Inject, Injectable } from &#39;@nestjs/common&#39;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>@Injectable()</span></span>
<span class="line"><span>export class AppService {</span></span>
<span class="line"><span>  constructor(</span></span>
<span class="line"><span>    @Inject(databaseConfig.KEY)</span></span>
<span class="line"><span>    private config: ConfigType&lt;typeof databaseConfig&gt;,</span></span>
<span class="line"><span>  ) {}</span></span>
<span class="line"><span>  getHello(): string {</span></span>
<span class="line"><span>    return this.config.host</span></span>
<span class="line"><span>  }</span></span>
<span class="line"><span>}</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br></div></div>`,61),i=[l];function r(c,o,t,b,u,d){return a(),n("div",null,i)}const h=s(e,[["render",r]]);export{g as __pageData,h as default};
