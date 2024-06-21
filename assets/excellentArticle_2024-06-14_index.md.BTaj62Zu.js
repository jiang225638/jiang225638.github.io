import{_ as n,c as s,o as a,a4 as p,cF as e,cG as l,cH as i,cI as r,cJ as c,cK as t,cL as o,cM as b,cN as u,cO as m,cP as d,cQ as h,cR as g,cS as k,cT as f}from"./chunks/framework.BaCLUa54.js";const w=JSON.parse('{"title":"古茗前端在 web 地图上的踩坑指南","description":"","frontmatter":{},"headers":[],"relativePath":"excellentArticle/2024-06-14/index.md","filePath":"excellentArticle/2024-06-14/index.md","lastUpdated":1718347891000}'),v={name:"excellentArticle/2024-06-14/index.md"},q=p(`<h1 id="古茗前端在-web-地图上的踩坑指南" tabindex="-1">古茗前端在 web 地图上的踩坑指南 <a class="header-anchor" href="#古茗前端在-web-地图上的踩坑指南" aria-label="Permalink to &quot;古茗前端在 web 地图上的踩坑指南&quot;">​</a></h1><h2 id="背景" tabindex="-1">背景 <a class="header-anchor" href="#背景" aria-label="Permalink to &quot;背景&quot;">​</a></h2><p>古茗是一家茶饮行业的连锁加盟企业，加盟就涉及到开店选址，一家奶茶店能否盈利，点位无疑是很重要的一个因素，如何保证点位的数量、质量，直观分析和感受点位之间的分布合理性、覆盖率、竞争关系，以及如何进行合理规划就成了一个刚性需求场景，而基于高德地图的可视化大盘可以很好的解决这些问题。</p><p>接下来的内容将会从高德地图的使用到一些踩坑经验为小伙伴们分享一些填坑技巧和指南，希望对使用相关技术的小伙伴提供一个参考~</p><h2 id="引入方式" tabindex="-1">引入方式 <a class="header-anchor" href="#引入方式" aria-label="Permalink to &quot;引入方式&quot;">​</a></h2><ul><li>js引入方式</li></ul><div class="language- vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>&lt;script src=&quot;https://webapi.amap.com/maps?v=2.0.0&amp;key=您申请的key值&quot;&gt;&lt;/script&gt; </span></span>
<span class="line"><span>&lt;script type=&quot;text/javascript&quot;&gt;</span></span>
<span class="line"><span>  const map = new AMap.Map(&#39;container&#39;, {</span></span>
<span class="line"><span>    center:[117.000923,36.675807], </span></span>
<span class="line"><span>    zoom:11 </span></span>
<span class="line"><span>  }); </span></span>
<span class="line"><span>&lt;/script&gt;</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br></div></div><ul><li><p>npm包引入方式</p></li><li><ul><li>先在项目中安装Loader <code>npm i @amap/amap-jsapi-loader --save</code></li><li>初始化</li></ul></li></ul><div class="language- vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>import AMapLoader from &#39;@amap/amap-jsapi-loader&#39;;</span></span>
<span class="line"><span>window._AMapSecurityConfig = {</span></span>
<span class="line"><span>  securityJsCode:&#39;「您申请的安全密钥」&#39;,</span></span>
<span class="line"><span>}</span></span>
<span class="line"><span>AMapLoader.load({</span></span>
<span class="line"><span>  &quot;key&quot;: &quot;&quot;,              // 申请好的Web端开发者Key，首次调用 load 时必填</span></span>
<span class="line"><span>  &quot;version&quot;: &quot;2.0&quot;,   // 指定要加载的 JS API 的版本，缺省时默认为 1.4.15</span></span>
<span class="line"><span>  &quot;plugins&quot;: [],           // 需要使用的的插件列表，如比例尺&#39;AMap.Scale&#39;等</span></span>
<span class="line"><span>}).then((AMap)=&gt;{</span></span>
<span class="line"><span>  map = new AMap.Map(&#39;container&#39;);</span></span>
<span class="line"><span>}).catch(e =&gt; {</span></span>
<span class="line"><span>  console.log(e);</span></span>
<span class="line"><span>})</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br></div></div><h2 id="高德地图能力" tabindex="-1">高德地图能力 <a class="header-anchor" href="#高德地图能力" aria-label="Permalink to &quot;高德地图能力&quot;">​</a></h2><p><img src="`+e+`" alt="medium-zoom"></p><h2 id="地图实例化抽离" tabindex="-1">地图实例化抽离 <a class="header-anchor" href="#地图实例化抽离" aria-label="Permalink to &quot;地图实例化抽离&quot;">​</a></h2><ul><li>地图是一个会在多个页面使用的场景，地图相关公共能力的抽离复用是必要的；</li><li>和地图有关的独立状态及逻辑众多，如图层类型、城市<code>POI</code>搜索、区边界显示切换、测距及绘制工具、缩放级别、视图范围等状态数据，以及地图实例销毁，<code>webgl</code> 内存释放，如果不做收拢，会散落在主文件中，收拢后可极大提升复用性；</li></ul><h3 id="封装抽离" tabindex="-1">封装抽离 <a class="header-anchor" href="#封装抽离" aria-label="Permalink to &quot;封装抽离&quot;">​</a></h3><blockquote><p>抽离并封装常用基本能力，调用方按需使用；</p></blockquote><ul><li><p>透传出：</p></li><li><ul><li>地图实例</li><li>地图缩放级别、视野经纬度范围 【用于动态调整地图中标记物的聚合态及和缩放级别的相关逻辑】</li><li>测距工具、鼠标绘制工具实例</li><li>地图城市<code>POI</code>搜索实例 【地图当前城市的 <code>POI</code> 搜索，比如搜杭州市的肯德基】</li><li>地图省市区边界实例【区边界线回显切换】</li></ul></li><li><p>内部自行进行实例销毁，避免内存堆积；</p></li></ul><div class="language- vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>import { debounce } from &#39;lodash&#39;;</span></span>
<span class="line"><span>import { useEffect, useState, useRef, useMemo } from &#39;react&#39;;</span></span>
<span class="line"><span>import { RangingTool } from &#39;@/pages/map-mode/utils/index&#39;;</span></span>
<span class="line"><span>import { destroyMapWebGl, districtLayerPlugin } from &#39;@/utils/AMapUtils&#39;;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>const AMap = window.AMap;</span></span>
<span class="line"><span></span></span>
<span class="line"><span></span></span>
<span class="line"><span>/**</span></span>
<span class="line"><span> * 提供地图的初始能力，透出常用的实例和变量</span></span>
<span class="line"><span> * </span></span>
<span class="line"><span> * * */</span></span>
<span class="line"><span></span></span>
<span class="line"><span>export default (props) =&gt; {</span></span>
<span class="line"><span>  const {</span></span>
<span class="line"><span>    id,</span></span>
<span class="line"><span>    city,</span></span>
<span class="line"><span>    mapConfig = {},</span></span>
<span class="line"><span>  } = props;</span></span>
<span class="line"><span>  const defaultZoom = mapConfig.zoom || 10;</span></span>
<span class="line"><span>  const mapRef = useRef();</span></span>
<span class="line"><span>  const rangingToolRef = useRef();</span></span>
<span class="line"><span>  const mouseToolRef = useRef();</span></span>
<span class="line"><span>  const searchRef = useRef();</span></span>
<span class="line"><span>  const districtLayerPluginRef = useRef();</span></span>
<span class="line"><span>  const [currentZoom, setCurrentZoom] = useState(defaultZoom);</span></span>
<span class="line"><span>  const [currentBound, setCurrentBound] = useState(undefined);</span></span>
<span class="line"><span></span></span>
<span class="line"><span>  const [mapInstance, setMapInstance] = useState();</span></span>
<span class="line"><span></span></span>
<span class="line"><span>  const handleMapMove = useMemo(() =&gt; {</span></span>
<span class="line"><span>    return debounce(() =&gt; {</span></span>
<span class="line"><span>      const bound = mapRef.current.getBounds();</span></span>
<span class="line"><span>      setCurrentBound(bound);</span></span>
<span class="line"><span>    }, 50);</span></span>
<span class="line"><span>  }, []);</span></span>
<span class="line"><span></span></span>
<span class="line"><span>  useEffect(() =&gt; {</span></span>
<span class="line"><span>    if (!mapRef.current) {</span></span>
<span class="line"><span>      mapRef.current = new AMap.Map(id, mapConfig || {});</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    const map = mapRef.current;</span></span>
<span class="line"><span>    map.on(&#39;complete&#39;, () =&gt; {</span></span>
<span class="line"><span>      // 初始化绘图工具</span></span>
<span class="line"><span>      rangingToolRef.current = new RangingTool({</span></span>
<span class="line"><span>        mapInstance: mapRef.current,</span></span>
<span class="line"><span>      });</span></span>
<span class="line"><span>      // 初始化绘制能力</span></span>
<span class="line"><span>      mouseToolRef.current = new AMap.MouseTool(map);</span></span>
<span class="line"><span>    });</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    map.on(&#39;zoomchange&#39;, () =&gt; {</span></span>
<span class="line"><span>      const zoom = mapRef.current.getZoom();</span></span>
<span class="line"><span>      const bound = mapRef.current.getBounds();</span></span>
<span class="line"><span>      setCurrentZoom(zoom);</span></span>
<span class="line"><span>      setCurrentBound(bound);</span></span>
<span class="line"><span>    });</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    map.on(&#39;mapmove&#39;, () =&gt; {</span></span>
<span class="line"><span>      handleMapMove();</span></span>
<span class="line"><span>    });</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    map.on(&#39;click&#39;, () =&gt; { });</span></span>
<span class="line"><span>    setMapInstance(map);</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    // 地图实例内存销毁</span></span>
<span class="line"><span>    return () =&gt; {</span></span>
<span class="line"><span>      let parentDom = document.getElementById(id);</span></span>
<span class="line"><span>      let canvas = parentDom?.getElementsByTagName(&#39;canvas&#39;);</span></span>
<span class="line"><span>      destroyMapWebGl(canvas);</span></span>
<span class="line"><span>      mapRef.current.destroy();</span></span>
<span class="line"><span>      mapRef.current = null;</span></span>
<span class="line"><span>      setMapInstance(null);</span></span>
<span class="line"><span>      canvas = null;</span></span>
<span class="line"><span>      parentDom = null;</span></span>
<span class="line"><span>    };</span></span>
<span class="line"><span>  }, []);</span></span>
<span class="line"><span></span></span>
<span class="line"><span>  useEffect(() =&gt; {</span></span>
<span class="line"><span>    if (city &amp;&amp; mapRef.current) {</span></span>
<span class="line"><span>      // 初始化地图搜索</span></span>
<span class="line"><span>      initMapSearch();</span></span>
<span class="line"><span>      mapRef.current.setCity(city);</span></span>
<span class="line"><span>      mapRef.current.setZoom(defaultZoom);</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span>  }, [city]);</span></span>
<span class="line"><span></span></span>
<span class="line"><span>  const initMapSearch = () =&gt; {</span></span>
<span class="line"><span>    searchRef.current = new AMap.PlaceSearch({</span></span>
<span class="line"><span>      city,</span></span>
<span class="line"><span>      citylimit: true,</span></span>
<span class="line"><span>      pageSize: 50,</span></span>
<span class="line"><span>      extensions: &#39;all&#39;,</span></span>
<span class="line"><span>    });</span></span>
<span class="line"><span>  };</span></span>
<span class="line"><span></span></span>
<span class="line"><span>  return {</span></span>
<span class="line"><span>    mapRef,</span></span>
<span class="line"><span>    mapInstance,</span></span>
<span class="line"><span>    rangingToolRef,</span></span>
<span class="line"><span>    mouseToolRef,</span></span>
<span class="line"><span>    searchRef,</span></span>
<span class="line"><span>    currentZoom,</span></span>
<span class="line"><span>    currentBound,</span></span>
<span class="line"><span>    districtLayerPluginRef,</span></span>
<span class="line"><span>  };</span></span>
<span class="line"><span>};</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br><span class="line-number">22</span><br><span class="line-number">23</span><br><span class="line-number">24</span><br><span class="line-number">25</span><br><span class="line-number">26</span><br><span class="line-number">27</span><br><span class="line-number">28</span><br><span class="line-number">29</span><br><span class="line-number">30</span><br><span class="line-number">31</span><br><span class="line-number">32</span><br><span class="line-number">33</span><br><span class="line-number">34</span><br><span class="line-number">35</span><br><span class="line-number">36</span><br><span class="line-number">37</span><br><span class="line-number">38</span><br><span class="line-number">39</span><br><span class="line-number">40</span><br><span class="line-number">41</span><br><span class="line-number">42</span><br><span class="line-number">43</span><br><span class="line-number">44</span><br><span class="line-number">45</span><br><span class="line-number">46</span><br><span class="line-number">47</span><br><span class="line-number">48</span><br><span class="line-number">49</span><br><span class="line-number">50</span><br><span class="line-number">51</span><br><span class="line-number">52</span><br><span class="line-number">53</span><br><span class="line-number">54</span><br><span class="line-number">55</span><br><span class="line-number">56</span><br><span class="line-number">57</span><br><span class="line-number">58</span><br><span class="line-number">59</span><br><span class="line-number">60</span><br><span class="line-number">61</span><br><span class="line-number">62</span><br><span class="line-number">63</span><br><span class="line-number">64</span><br><span class="line-number">65</span><br><span class="line-number">66</span><br><span class="line-number">67</span><br><span class="line-number">68</span><br><span class="line-number">69</span><br><span class="line-number">70</span><br><span class="line-number">71</span><br><span class="line-number">72</span><br><span class="line-number">73</span><br><span class="line-number">74</span><br><span class="line-number">75</span><br><span class="line-number">76</span><br><span class="line-number">77</span><br><span class="line-number">78</span><br><span class="line-number">79</span><br><span class="line-number">80</span><br><span class="line-number">81</span><br><span class="line-number">82</span><br><span class="line-number">83</span><br><span class="line-number">84</span><br><span class="line-number">85</span><br><span class="line-number">86</span><br><span class="line-number">87</span><br><span class="line-number">88</span><br><span class="line-number">89</span><br><span class="line-number">90</span><br><span class="line-number">91</span><br><span class="line-number">92</span><br><span class="line-number">93</span><br><span class="line-number">94</span><br><span class="line-number">95</span><br><span class="line-number">96</span><br><span class="line-number">97</span><br><span class="line-number">98</span><br><span class="line-number">99</span><br><span class="line-number">100</span><br><span class="line-number">101</span><br><span class="line-number">102</span><br><span class="line-number">103</span><br><span class="line-number">104</span><br><span class="line-number">105</span><br><span class="line-number">106</span><br><span class="line-number">107</span><br><span class="line-number">108</span><br></div></div><h3 id="使用" tabindex="-1">使用 <a class="header-anchor" href="#使用" aria-label="Permalink to &quot;使用&quot;">​</a></h3><div class="language- vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>const createId = () =&gt; \`\${Math.random().toString(36).substr(2)}_\${+new Date}\`;</span></span>
<span class="line"><span>const [mapId] = useState(createId());</span></span>
<span class="line"><span>const { mapInstance, searchRef, currentZoom } = useInitMap({</span></span>
<span class="line"><span>  id: mapId,</span></span>
<span class="line"><span>  city,</span></span>
<span class="line"><span>  mapConfig: {</span></span>
<span class="line"><span>    zoom: 10,</span></span>
<span class="line"><span>    isHotspot: true,</span></span>
<span class="line"><span>  },</span></span>
<span class="line"><span>});</span></span>
<span class="line"><span></span></span>
<span class="line"><span></span></span>
<span class="line"><span>return &lt;&gt;</span></span>
<span class="line"><span>  &lt;div id={mapId}&gt;&lt;/div&gt;</span></span>
<span class="line"><span>  &lt;/&gt;</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br></div></div><h2 id="信息窗体响应式" tabindex="-1">信息窗体响应式 <a class="header-anchor" href="#信息窗体响应式" aria-label="Permalink to &quot;信息窗体响应式&quot;">​</a></h2><h3 id="背景-1" tabindex="-1">背景 <a class="header-anchor" href="#背景-1" aria-label="Permalink to &quot;背景&quot;">​</a></h3><blockquote><p>线索标记：点击地图，标记一个点出现弹框，在弹框中进行相关信息的填写和提交 要求：<strong>弹框内容紧贴着地图的标记点，弹框内容响应式</strong>；那就只能用 <code>Marker.setLabel()</code> 或 <code>Marker.setContent()</code>但问题在于，这两个方法都只能传递字符串或<code>dom对象</code>，如 :<code>Marker.setContent(&quot;&lt;div&gt;&lt;input /&gt;&lt;/div&gt;&quot;)</code></p></blockquote><p><img src="`+l+`" alt="medium-zoom">image.png</p><h3 id="问题" tabindex="-1">问题 <a class="header-anchor" href="#问题" aria-label="Permalink to &quot;问题&quot;">​</a></h3><blockquote><p>这会导致几个问题</p></blockquote><ul><li>没办法用组件的形式编写代码；</li><li>弹框内容是纯静态，没办法做到响应式【如：图例中多行文本的字数统计非响应式】；</li><li>绑定事件过于麻烦，需要查找 <code>dom节点</code>进行绑定；</li><li>表单字段值获取困难；</li></ul><blockquote><p>如果常规处理大概就是如下这种实现，会遇到以上所列问题</p></blockquote><div class="language- vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>const getDomByReactElement = async (reactElement) =&gt; {</span></span>
<span class="line"><span>  const fragment = document.createDocumentFragment();</span></span>
<span class="line"><span>  await new Promise((resolve) =&gt; {</span></span>
<span class="line"><span>    ReactDOM.render(reactElement, fragment, resolve);</span></span>
<span class="line"><span>  });</span></span>
<span class="line"><span>  return fragment.firstChild;</span></span>
<span class="line"><span>};</span></span>
<span class="line"><span></span></span>
<span class="line"><span>Marker.setContent(getDomByReactElement(&lt;Comp /&gt;));</span></span>
<span class="line"><span></span></span>
<span class="line"><span></span></span>
<span class="line"><span>// 按钮事件绑定</span></span>
<span class="line"><span>Marker.on(&#39;click&#39;, (e) =&gt; {</span></span>
<span class="line"><span>  const { className } = e.originEvent.srcElement;</span></span>
<span class="line"><span>  if (className.indexOf(&#39;cancel-btn&#39;) &gt; -1) {</span></span>
<span class="line"><span>    handleRemoveMark();</span></span>
<span class="line"><span>  } else if (className.indexOf(&#39;confirm-btn&#39;) &gt; -1) {</span></span>
<span class="line"><span>    handleConfirmClue();</span></span>
<span class="line"><span>  }</span></span>
<span class="line"><span>});</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br></div></div><p>那么有没有办法能解决掉以上问题呢？答案是肯定的；</p><h3 id="解法" tabindex="-1">解法 <a class="header-anchor" href="#解法" aria-label="Permalink to &quot;解法&quot;">​</a></h3><blockquote><p>先插入一个具有全局唯一 <code>id</code> 的空元素 <code>div</code>，设置为<code>content</code>将<code>content</code> 渲染到地图中【此时页面中即可以查找到该元素】 查找到该元素，将组件动态渲染到这个 <code>dom 节点</code>上；【有点类似于微前端的理念：将任意组件渲染到指定的<code>dom</code>节点上】</p></blockquote><p>上代码：</p><div class="language- vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>import ClueCreateDialog from &quot;@c/omponents/ClueCreateDialog/index&quot;;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>// 新的方式</span></span>
<span class="line"><span>const uid = () =&gt; \`\${Math.random().toString(36).substr(2)}_\${new Date().getTime()}\`;</span></span>
<span class="line"><span>marker.setContent(\`&lt;div id=&quot;\${uid}&quot;&gt;&lt;/div&gt;\`);</span></span>
<span class="line"><span>mapInstance.add(marker);</span></span>
<span class="line"><span>ReactDom.render(&lt;ClueCreateDialog /&gt;, document.getElementById(uid));</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br></div></div><p>这样就完美解决了以上的所有问题； <img src="`+i+'" alt="medium-zoom"></p><h2 id="事件处理" tabindex="-1">事件处理 <a class="header-anchor" href="#事件处理" aria-label="Permalink to &quot;事件处理&quot;">​</a></h2><h3 id="地图事件特殊性" tabindex="-1">地图事件特殊性 <a class="header-anchor" href="#地图事件特殊性" aria-label="Permalink to &quot;地图事件特殊性&quot;">​</a></h3><ul><li>地图事件分为地图本身的事件、标记物事件两种；</li><li>两种事件分别是在地图和标记物实例化时手动绑定，在绑定时，就锁死了当前帧的状态；后续在执行事件回调时，存在拿不到最新状态的问题；</li><li>地图事件和标记物事件在某些场景下需要支持穿透功能；穿透的属性高德不支持动态控制，和事件绑定同步进行，会存在两种事件共存冲突的情况；</li></ul><p>为了解决访问不到最新状态的问题，有两种方式解决：</p><ul><li>在状态变化时重新换绑事件；【但由于地图标记物是海量，频繁换绑事件会带来性能问题】</li><li>永远保持初始化的绑定，在事件内部做逻辑判断处理；【就只能对某些状态存储在<code>ref</code>中，而<code>ref</code>又会导致没办法做到响应式 】</li></ul><p>在解决问题的同时引入了新的问题 ~~</p><h3 id="综合权衡解法" tabindex="-1">综合权衡解法 <a class="header-anchor" href="#综合权衡解法" aria-label="Permalink to &quot;综合权衡解法&quot;">​</a></h3><p>综合分析考虑</p><ul><li>地图事件是独立单个的，不存在性能问题，可以根据状态变动进行解绑和重新绑定，避免事件之间的耦合判断，也确保能拿到最新状态，避免过多状态保存在<code>ref</code> 中，解决不能根据状态作响应式处理的问题；</li><li>标记物事件由于是海量的，不能频繁解绑，只能在初始化时绑定一次 【巧的是地图标记物都是打开弹框详情之类的场景，和主页面的状态基本没有太多耦合，小部分状态使用 <code>ref</code> 存储即可】</li></ul><blockquote><p>图例说明： 实线代表长存事件、虚线为动态绑定事件 标记物事件和地图事件的穿透没办法动态配置，只能长存，也即：在点击标记物时，同样是会穿透到地图中，同时触发标记物和地图的标记事件 地图事件通过换绑进行处理，这样在需要只触发标记物事件时，清空地图事件； 标记物事件则一直存在，通过内部逻辑决定在点击时是否执行标记物事件回调；</p></blockquote><p><img src="'+r+`" alt="medium-zoom"></p><h4 id="地图事件绑定" tabindex="-1">地图事件绑定 <a class="header-anchor" href="#地图事件绑定" aria-label="Permalink to &quot;地图事件绑定&quot;">​</a></h4><blockquote><p><code>use-map-events</code>通过状态匹配自动换绑事件；可以在事件执行时拿到最新状态</p></blockquote><div class="language- vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>export default (props) =&gt; {</span></span>
<span class="line"><span>  const { mapInstance, mapCurrentEventType, handleClickHotSpot ,handleClickAddClue} = props;</span></span>
<span class="line"><span>  useEffect(() =&gt; {</span></span>
<span class="line"><span>    if (mapInstance) {</span></span>
<span class="line"><span>      mapInstance.clearEvents(&#39;hotspotclick&#39;);</span></span>
<span class="line"><span>      mapCurrentEventType === MAP_EVENTS.addGatherPoint &amp;&amp; mapInstance.on(&#39;hotspotclick&#39;, handleClickHotSpot);</span></span>
<span class="line"><span></span></span>
<span class="line"><span>      // other map events ..</span></span>
<span class="line"><span>      mapInstance.clearEvents(&#39;click&#39;);</span></span>
<span class="line"><span>      mapCurrentEventType === MAP_EVENTS.addClue &amp;&amp; mapInstance.on(&#39;click&#39;, handleClickAddClue);</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span>  }, [mapInstance, mapCurrentEventType]);</span></span>
<span class="line"><span></span></span>
<span class="line"><span>  return {};</span></span>
<span class="line"><span>};</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br></div></div><h4 id="标记物事件绑定" tabindex="-1">标记物事件绑定 <a class="header-anchor" href="#标记物事件绑定" aria-label="Permalink to &quot;标记物事件绑定&quot;">​</a></h4><blockquote><p>事件绑定一次，只需要在事件内逻辑判断是否有地图事件决定是否执行后续逻辑 局限：事件内只能使用 <code>ref</code> 进行状态判断</p></blockquote><div class="language- vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>const handleClickPointMark = async (data) =&gt; {</span></span>
<span class="line"><span>  // 有地图事件时不执行</span></span>
<span class="line"><span>  if (mapCurrentEventTypeRef.current) return;</span></span>
<span class="line"><span>  const { position } = data;</span></span>
<span class="line"><span>  mapRef.current &amp;&amp; mapRef.current.panTo(position);</span></span>
<span class="line"><span>  setCurPointData(data);</span></span>
<span class="line"><span>  setShowPonitCard(true);</span></span>
<span class="line"><span>};</span></span>
<span class="line"><span></span></span>
<span class="line"><span></span></span>
<span class="line"><span>useRenderPointMarkers({</span></span>
<span class="line"><span>  pointsData: pointData,</span></span>
<span class="line"><span>  mapInstance,</span></span>
<span class="line"><span>  mapRef,</span></span>
<span class="line"><span>  handleClickPointMark, </span></span>
<span class="line"><span>});</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br></div></div><h2 id="渲染抽离" tabindex="-1">渲染抽离 <a class="header-anchor" href="#渲染抽离" aria-label="Permalink to &quot;渲染抽离&quot;">​</a></h2><h3 id="地图中各实体渲染抽离" tabindex="-1">地图中各实体渲染抽离 <a class="header-anchor" href="#地图中各实体渲染抽离" aria-label="Permalink to &quot;地图中各实体渲染抽离&quot;">​</a></h3><blockquote><p>地图中包含多种实体，分别采用<code>massMarker</code>、<code>Marker</code>、<code>Polygon</code> 等方式渲染，不同实体抽离独立<code>hook</code>进行渲染，便于逻辑隔离和复用；<code>hooks</code> 内部只关注数据渲染、将数据渲染成不同标记物到地图上即可；</p></blockquote><ul><li>点位渲染 ： <code>use-render-point-markers</code></li><li>线索渲染 ： <code>use-render-clue-markers</code></li><li>竞品渲染 ： <code>use-render-poi-markers</code></li><li>规划圈渲染：<code>use-render-plan-polygons</code></li><li>动线图渲染：<code>use-render-traffic-lines</code></li></ul><p>基本结构大体如下，绘制部分根据不同实体使用不同的高德 <code>api</code> 进行绘制； 举例：<code>use-render-point-markers</code></p><div class="language- vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>import { useEffect, useRef, useState } from &#39;react&#39;;</span></span>
<span class="line"><span>import { useBatchEffect } from &#39;@/hooks&#39;;</span></span>
<span class="line"><span>import {</span></span>
<span class="line"><span>  POINT_MARKES_ANCHOR,</span></span>
<span class="line"><span>  POINT_MARKES_SIZE,</span></span>
<span class="line"><span>  POINT_MARKES_OFFSET,</span></span>
<span class="line"><span>} from &#39;@/pages/map-mode/constant&#39;;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>export default (props) =&gt; {</span></span>
<span class="line"><span>  const {</span></span>
<span class="line"><span>    pointsData = [],</span></span>
<span class="line"><span>    mapInstance,</span></span>
<span class="line"><span>    mapRef,</span></span>
<span class="line"><span>    handleClickPointMark,</span></span>
<span class="line"><span>  } = props || {};</span></span>
<span class="line"><span>  const pointMarkersRef = useRef({});</span></span>
<span class="line"><span></span></span>
<span class="line"><span>  useEffect(() =&gt; {</span></span>
<span class="line"><span>    if (!mapInstance) return;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    // 清除所有marker</span></span>
<span class="line"><span>    Object.keys(pointMarkersRef.current).forEach((id) =&gt; {</span></span>
<span class="line"><span>      mapRef.current.remove(pointMarkersRef.current[id]);</span></span>
<span class="line"><span>      delete pointMarkersRef.current[id];</span></span>
<span class="line"><span>    });</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    // 点位marker实例化</span></span>
<span class="line"><span>    pointsData?.forEach((item: any) =&gt; {</span></span>
<span class="line"><span>      const size = POINT_MARKES_SIZE;</span></span>
<span class="line"><span>      const Icon = new AMap.Icon({</span></span>
<span class="line"><span>        size,</span></span>
<span class="line"><span>        anchor: POINT_MARKES_ANCHOR,</span></span>
<span class="line"><span>        image: item.iconConfig?.iconUrl,</span></span>
<span class="line"><span>        imageSize: size,</span></span>
<span class="line"><span>      });</span></span>
<span class="line"><span></span></span>
<span class="line"><span>      const marker = new AMap.Marker({</span></span>
<span class="line"><span>        position: new AMap.LngLat(item.position[0], item.position[1]), // 经纬度对象，也可以是经纬度构成的一维数组[116.39, 39.9]</span></span>
<span class="line"><span>        title: item.name,</span></span>
<span class="line"><span>        icon: Icon,</span></span>
<span class="line"><span>        extData: { item },</span></span>
<span class="line"><span>        visible: true,</span></span>
<span class="line"><span>        anchor: new AMap.Pixel(0, 0),</span></span>
<span class="line"><span>        offset: POINT_MARKES_OFFSET,</span></span>
<span class="line"><span>        bubble: true,</span></span>
<span class="line"><span>        zIndex: 999,</span></span>
<span class="line"><span>      });</span></span>
<span class="line"><span></span></span>
<span class="line"><span>      marker.on(&#39;click&#39;, () =&gt; handleClickPointMark?.(marker.getExtData().item));</span></span>
<span class="line"><span></span></span>
<span class="line"><span>      mapRef.current.add(marker);</span></span>
<span class="line"><span>      pointMarkersRef.current[item.id] = marker;</span></span>
<span class="line"><span>    });</span></span>
<span class="line"><span>  }, [pointsData, mapInstance]);</span></span>
<span class="line"><span> </span></span>
<span class="line"><span>  return {</span></span>
<span class="line"><span>    pointMarkersRef,</span></span>
<span class="line"><span>  };</span></span>
<span class="line"><span>};</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br><span class="line-number">22</span><br><span class="line-number">23</span><br><span class="line-number">24</span><br><span class="line-number">25</span><br><span class="line-number">26</span><br><span class="line-number">27</span><br><span class="line-number">28</span><br><span class="line-number">29</span><br><span class="line-number">30</span><br><span class="line-number">31</span><br><span class="line-number">32</span><br><span class="line-number">33</span><br><span class="line-number">34</span><br><span class="line-number">35</span><br><span class="line-number">36</span><br><span class="line-number">37</span><br><span class="line-number">38</span><br><span class="line-number">39</span><br><span class="line-number">40</span><br><span class="line-number">41</span><br><span class="line-number">42</span><br><span class="line-number">43</span><br><span class="line-number">44</span><br><span class="line-number">45</span><br><span class="line-number">46</span><br><span class="line-number">47</span><br><span class="line-number">48</span><br><span class="line-number">49</span><br><span class="line-number">50</span><br><span class="line-number">51</span><br><span class="line-number">52</span><br><span class="line-number">53</span><br><span class="line-number">54</span><br><span class="line-number">55</span><br><span class="line-number">56</span><br><span class="line-number">57</span><br><span class="line-number">58</span><br><span class="line-number">59</span><br></div></div><h2 id="其他" tabindex="-1">其他 <a class="header-anchor" href="#其他" aria-label="Permalink to &quot;其他&quot;">​</a></h2><h3 id="高德缺陷" tabindex="-1">高德缺陷 <a class="header-anchor" href="#高德缺陷" aria-label="Permalink to &quot;高德缺陷&quot;">​</a></h3><blockquote><p><strong><code>massMarker</code> 点击穿透</strong></p></blockquote><p>使用<code>massMarker</code> 渲染时，当有标记物拥挤后产生重叠时，点击最上面的标记物，最终效果是点击到了层级最低的，这个咨询了高德官方，说这是已知 <code>bug</code>；如果我们考虑性能只能用 <code>massMarker </code>的话，也只能尽量放大到没有重叠时点击；</p><blockquote><p><strong>动态设置 <code>marker</code> 的 <code>bubble</code> 穿透属性</strong></p></blockquote><p>只能在事件绑定的时候去设置 <code>bubble</code> 穿透属性，无法动态设置该属性，如果想禁止穿透，只能重新解绑事件，但海量数据进行动态解绑是很消耗性能的操作，这个目前也是无解，目前是通过在事件中进行判断处理；</p><h3 id="小细节" tabindex="-1">小细节 <a class="header-anchor" href="#小细节" aria-label="Permalink to &quot;小细节&quot;">​</a></h3><blockquote><p><strong>Marker icon偏移问题</strong></p></blockquote><p>点标记覆盖物图标可能五花八门，比如下面几种</p><p><img src="`+c+'" alt="medium-zoom"></p><p><img src="'+t+'" alt="medium-zoom"></p><p><img src="'+o+'" alt="medium-zoom"></p><p>当基准点设置有问题</p><p><img src="'+b+'" alt="medium-zoom"></p><p>其实高德地图的各种覆盖物都有设置标记锚点和偏移量的属性</p><p><img src="'+u+'" alt="medium-zoom"></p><p>我们只需要根据不同的<code>icon</code>锚点位置设置<code>anchor</code>，不用去关心 <code>offset</code> 即可； 设置好以后效果如下</p><p><img src="'+m+'" alt="medium-zoom"></p><blockquote><p><strong>marker 拖动产生的经纬度偏移</strong></p></blockquote><blockquote><p>场景：地图上有一个图标，拖动图标到某一个位置后，将拖动位置动态设置为地图中心点 之前一直是用事件的经纬度<code>e.lnglat</code>，导致拖动非锚点时坐标会产生偏移【图1】 咨询了高德官方后，现使用 <code>e.target.getPosition()</code> 规避了该问题【图2】</p></blockquote><p><img src="'+d+'" alt="medium-zoom"></p><p><img src="'+h+`" alt="medium-zoom"></p><div class="language- vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>// 图1  错误的使用</span></span>
<span class="line"><span>markerRef.current.on(&#39;dragend&#39;, async (e) =&gt; {</span></span>
<span class="line"><span>  mapInstnce.setCenter([e.lnglat.lng, e?.lnglat.lat]);</span></span>
<span class="line"><span>});</span></span>
<span class="line"><span></span></span>
<span class="line"><span>// 图2  正确的使用</span></span>
<span class="line"><span>markerRef.current.on(&#39;dragend&#39;, async (e) =&gt; {</span></span>
<span class="line"><span>  mapInstnce.setCenter(e.target.getPosition());</span></span>
<span class="line"><span>});</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br></div></div><blockquote><p><strong>内存泄漏问题</strong></p></blockquote><p>高德本身有提供<code>destory</code>方法来卸载高德实例，但是在切换页面时，当前高德的地图卸载方法不能够完全清除，或者在地图页面和其他页面来回切换时，通过<code>Chrome DevTools Performance</code>观察到地图内存会疯狂增长。通过高德工单咨询以后，得到的反馈是问题确实存在，他们已经在修复过程中。</p><p><img src="`+g+`" alt="medium-zoom"></p><p>但是等高德升级？估计遥遥无期…… 所以开始了<code>google</code>大法 在地图崩溃后会有一个报错信息：<code>createBuffer error</code>的错误，这个错误是<code>webGL</code>引起的，那么利用<code>webgl</code>丢失上下文的方法可以干掉内存。</p><div class="language- vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>export const destroyMapWebGl = (canvass = []) =&gt; {</span></span>
<span class="line"><span>  for (let i = 0; i &lt; canvass.length; i++) {</span></span>
<span class="line"><span>    const canvas = canvass[i];</span></span>
<span class="line"><span>    canvas.getContext(&#39;webgl&#39;);</span></span>
<span class="line"><span>    const gl = canvas.getContext(&#39;webgl&#39;);</span></span>
<span class="line"><span>    // 丢失上下文的方法</span></span>
<span class="line"><span>    gl.getExtension(&#39;WEBGL_lose_context&#39;)?.loseContext?.();</span></span>
<span class="line"><span>  }</span></span>
<span class="line"><span>};</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br></div></div><h3 id="" tabindex="-1"><a class="header-anchor" href="#" aria-label="Permalink to &quot;&quot;">​</a></h3><p><img src="`+k+'" alt="medium-zoom"></p><h3 id="疑难问题咨询" tabindex="-1">疑难问题咨询 <a class="header-anchor" href="#疑难问题咨询" aria-label="Permalink to &quot;疑难问题咨询&quot;">​</a></h3><p>当进行深度开发时，难免会遇到一些疑难问题，可以在高德管理后台创建个人应用，基于应用 <code>id</code> 提工单进行咨询；不得不赞一下高德的响应速度和服务效率 ~~</p><p><img src="'+f+'" alt="medium-zoom">image.png</p><h2 id="总结" tabindex="-1">总结 <a class="header-anchor" href="#总结" aria-label="Permalink to &quot;总结&quot;">​</a></h2><ul><li>抽离地图通用化能力便于不同业务场景复用；</li><li>信息窗体响应式通过<code> ReactDom.render(&lt;Comp /&gt;, document.getElementById(&#39;id&#39;) )</code> 解决；</li><li>事件较为特殊，综合性能以及事件中状态的实时性，需要在两者之间做权衡取舍【地图事件采用动态绑定，标记物事件考虑到性能，采用初始化一次性绑定】；</li><li>不同实体渲染抽离成独立 <code>hook</code>，便于复用；</li></ul>',92),C=[q];function _(M,R,x,y,P,I){return a(),s("div",null,C)}const S=n(v,[["render",_]]);export{w as __pageData,S as default};
