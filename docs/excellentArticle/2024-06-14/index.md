# 古茗前端在 web 地图上的踩坑指南

## 背景

古茗是一家茶饮行业的连锁加盟企业，加盟就涉及到开店选址，一家奶茶店能否盈利，点位无疑是很重要的一个因素，如何保证点位的数量、质量，直观分析和感受点位之间的分布合理性、覆盖率、竞争关系，以及如何进行合理规划就成了一个刚性需求场景，而基于高德地图的可视化大盘可以很好的解决这些问题。

接下来的内容将会从高德地图的使用到一些踩坑经验为小伙伴们分享一些填坑技巧和指南，希望对使用相关技术的小伙伴提供一个参考~

## 引入方式

- js引入方式

```
<script src="https://webapi.amap.com/maps?v=2.0.0&key=您申请的key值"></script> 
<script type="text/javascript">
  const map = new AMap.Map('container', {
    center:[117.000923,36.675807], 
    zoom:11 
  }); 
</script>
```

- npm包引入方式

- - 先在项目中安装Loader `npm i @amap/amap-jsapi-loader --save`
  - 初始化

```
import AMapLoader from '@amap/amap-jsapi-loader';
window._AMapSecurityConfig = {
  securityJsCode:'「您申请的安全密钥」',
}
AMapLoader.load({
  "key": "",              // 申请好的Web端开发者Key，首次调用 load 时必填
  "version": "2.0",   // 指定要加载的 JS API 的版本，缺省时默认为 1.4.15
  "plugins": [],           // 需要使用的的插件列表，如比例尺'AMap.Scale'等
}).then((AMap)=>{
  map = new AMap.Map('container');
}).catch(e => {
  console.log(e);
})
```

## 高德地图能力

![medium-zoom](/assets/excellentArticle/2024-06-14/640.webp)

## 地图实例化抽离

- 地图是一个会在多个页面使用的场景，地图相关公共能力的抽离复用是必要的；
- 和地图有关的独立状态及逻辑众多，如图层类型、城市`POI`搜索、区边界显示切换、测距及绘制工具、缩放级别、视图范围等状态数据，以及地图实例销毁，`webgl` 内存释放，如果不做收拢，会散落在主文件中，收拢后可极大提升复用性；

### 封装抽离

> 抽离并封装常用基本能力，调用方按需使用；

- 透传出：

- - 地图实例
  - 地图缩放级别、视野经纬度范围 【用于动态调整地图中标记物的聚合态及和缩放级别的相关逻辑】
  - 测距工具、鼠标绘制工具实例
  - 地图城市`POI`搜索实例 【地图当前城市的 `POI` 搜索，比如搜杭州市的肯德基】
  - 地图省市区边界实例【区边界线回显切换】

- 内部自行进行实例销毁，避免内存堆积；

```
import { debounce } from 'lodash';
import { useEffect, useState, useRef, useMemo } from 'react';
import { RangingTool } from '@/pages/map-mode/utils/index';
import { destroyMapWebGl, districtLayerPlugin } from '@/utils/AMapUtils';

const AMap = window.AMap;


/**
 * 提供地图的初始能力，透出常用的实例和变量
 * 
 * * */

export default (props) => {
  const {
    id,
    city,
    mapConfig = {},
  } = props;
  const defaultZoom = mapConfig.zoom || 10;
  const mapRef = useRef();
  const rangingToolRef = useRef();
  const mouseToolRef = useRef();
  const searchRef = useRef();
  const districtLayerPluginRef = useRef();
  const [currentZoom, setCurrentZoom] = useState(defaultZoom);
  const [currentBound, setCurrentBound] = useState(undefined);

  const [mapInstance, setMapInstance] = useState();

  const handleMapMove = useMemo(() => {
    return debounce(() => {
      const bound = mapRef.current.getBounds();
      setCurrentBound(bound);
    }, 50);
  }, []);

  useEffect(() => {
    if (!mapRef.current) {
      mapRef.current = new AMap.Map(id, mapConfig || {});
    }

    const map = mapRef.current;
    map.on('complete', () => {
      // 初始化绘图工具
      rangingToolRef.current = new RangingTool({
        mapInstance: mapRef.current,
      });
      // 初始化绘制能力
      mouseToolRef.current = new AMap.MouseTool(map);
    });

    map.on('zoomchange', () => {
      const zoom = mapRef.current.getZoom();
      const bound = mapRef.current.getBounds();
      setCurrentZoom(zoom);
      setCurrentBound(bound);
    });

    map.on('mapmove', () => {
      handleMapMove();
    });

    map.on('click', () => { });
    setMapInstance(map);

    // 地图实例内存销毁
    return () => {
      let parentDom = document.getElementById(id);
      let canvas = parentDom?.getElementsByTagName('canvas');
      destroyMapWebGl(canvas);
      mapRef.current.destroy();
      mapRef.current = null;
      setMapInstance(null);
      canvas = null;
      parentDom = null;
    };
  }, []);

  useEffect(() => {
    if (city && mapRef.current) {
      // 初始化地图搜索
      initMapSearch();
      mapRef.current.setCity(city);
      mapRef.current.setZoom(defaultZoom);
    }
  }, [city]);

  const initMapSearch = () => {
    searchRef.current = new AMap.PlaceSearch({
      city,
      citylimit: true,
      pageSize: 50,
      extensions: 'all',
    });
  };

  return {
    mapRef,
    mapInstance,
    rangingToolRef,
    mouseToolRef,
    searchRef,
    currentZoom,
    currentBound,
    districtLayerPluginRef,
  };
};
```

### 使用

```
const createId = () => `${Math.random().toString(36).substr(2)}_${+new Date}`;
const [mapId] = useState(createId());
const { mapInstance, searchRef, currentZoom } = useInitMap({
  id: mapId,
  city,
  mapConfig: {
    zoom: 10,
    isHotspot: true,
  },
});


return <>
  <div id={mapId}></div>
  </>
```

## 信息窗体响应式

### 背景

> 线索标记：点击地图，标记一个点出现弹框，在弹框中进行相关信息的填写和提交 要求：**弹框内容紧贴着地图的标记点，弹框内容响应式**；那就只能用 `Marker.setLabel()` 或  `Marker.setContent()`但问题在于，这两个方法都只能传递字符串或`dom对象`，如 :`Marker.setContent("<div><input /></div>")`

![medium-zoom](/assets/excellentArticle/2024-06-14/640-1718347484386-1.webp)image.png

### 问题

> 这会导致几个问题

- 没办法用组件的形式编写代码；
- 弹框内容是纯静态，没办法做到响应式【如：图例中多行文本的字数统计非响应式】；
- 绑定事件过于麻烦，需要查找 `dom节点`进行绑定；
- 表单字段值获取困难；

> 如果常规处理大概就是如下这种实现，会遇到以上所列问题

```
const getDomByReactElement = async (reactElement) => {
  const fragment = document.createDocumentFragment();
  await new Promise((resolve) => {
    ReactDOM.render(reactElement, fragment, resolve);
  });
  return fragment.firstChild;
};

Marker.setContent(getDomByReactElement(<Comp />));


// 按钮事件绑定
Marker.on('click', (e) => {
  const { className } = e.originEvent.srcElement;
  if (className.indexOf('cancel-btn') > -1) {
    handleRemoveMark();
  } else if (className.indexOf('confirm-btn') > -1) {
    handleConfirmClue();
  }
});
```

那么有没有办法能解决掉以上问题呢？答案是肯定的；

### 解法

> 先插入一个具有全局唯一 `id` 的空元素 `div`，设置为`content`将`content` 渲染到地图中【此时页面中即可以查找到该元素】 查找到该元素，将组件动态渲染到这个 `dom 节点`上；【有点类似于微前端的理念：将任意组件渲染到指定的`dom`节点上】

上代码：

```
import ClueCreateDialog from "@c/omponents/ClueCreateDialog/index";

// 新的方式
const uid = () => `${Math.random().toString(36).substr(2)}_${new Date().getTime()}`;
marker.setContent(`<div id="${uid}"></div>`);
mapInstance.add(marker);
ReactDom.render(<ClueCreateDialog />, document.getElementById(uid));
```

这样就完美解决了以上的所有问题；
![medium-zoom](/assets/excellentArticle/2024-06-14/640-1718347484386-2.gif)

## 事件处理

### 地图事件特殊性

- 地图事件分为地图本身的事件、标记物事件两种；
- 两种事件分别是在地图和标记物实例化时手动绑定，在绑定时，就锁死了当前帧的状态；后续在执行事件回调时，存在拿不到最新状态的问题；
- 地图事件和标记物事件在某些场景下需要支持穿透功能；穿透的属性高德不支持动态控制，和事件绑定同步进行，会存在两种事件共存冲突的情况；

为了解决访问不到最新状态的问题，有两种方式解决：

- 在状态变化时重新换绑事件；【但由于地图标记物是海量，频繁换绑事件会带来性能问题】
- 永远保持初始化的绑定，在事件内部做逻辑判断处理；【就只能对某些状态存储在`ref`中，而`ref`又会导致没办法做到响应式  】

在解决问题的同时引入了新的问题 ~~

### 综合权衡解法

综合分析考虑

- 地图事件是独立单个的，不存在性能问题，可以根据状态变动进行解绑和重新绑定，避免事件之间的耦合判断，也确保能拿到最新状态，避免过多状态保存在`ref` 中，解决不能根据状态作响应式处理的问题；
- 标记物事件由于是海量的，不能频繁解绑，只能在初始化时绑定一次 【巧的是地图标记物都是打开弹框详情之类的场景，和主页面的状态基本没有太多耦合，小部分状态使用 `ref` 存储即可】

> 图例说明： 实线代表长存事件、虚线为动态绑定事件 标记物事件和地图事件的穿透没办法动态配置，只能长存，也即：在点击标记物时，同样是会穿透到地图中，同时触发标记物和地图的标记事件 地图事件通过换绑进行处理，这样在需要只触发标记物事件时，清空地图事件； 标记物事件则一直存在，通过内部逻辑决定在点击时是否执行标记物事件回调；

![medium-zoom](/assets/excellentArticle/2024-06-14/640-1718347484386-3.webp)

#### 地图事件绑定

> `use-map-events`通过状态匹配自动换绑事件；可以在事件执行时拿到最新状态

```
export default (props) => {
  const { mapInstance, mapCurrentEventType, handleClickHotSpot ,handleClickAddClue} = props;
  useEffect(() => {
    if (mapInstance) {
      mapInstance.clearEvents('hotspotclick');
      mapCurrentEventType === MAP_EVENTS.addGatherPoint && mapInstance.on('hotspotclick', handleClickHotSpot);

      // other map events ..
      mapInstance.clearEvents('click');
      mapCurrentEventType === MAP_EVENTS.addClue && mapInstance.on('click', handleClickAddClue);

    }
  }, [mapInstance, mapCurrentEventType]);

  return {};
};
```

#### 标记物事件绑定

> 事件绑定一次，只需要在事件内逻辑判断是否有地图事件决定是否执行后续逻辑 局限：事件内只能使用 `ref` 进行状态判断

```
const handleClickPointMark = async (data) => {
  // 有地图事件时不执行
  if (mapCurrentEventTypeRef.current) return;
  const { position } = data;
  mapRef.current && mapRef.current.panTo(position);
  setCurPointData(data);
  setShowPonitCard(true);
};


useRenderPointMarkers({
  pointsData: pointData,
  mapInstance,
  mapRef,
  handleClickPointMark, 
});
```

## 渲染抽离

### 地图中各实体渲染抽离

> 地图中包含多种实体，分别采用`massMarker`、`Marker`、`Polygon` 等方式渲染，不同实体抽离独立`hook`进行渲染，便于逻辑隔离和复用；`hooks` 内部只关注数据渲染、将数据渲染成不同标记物到地图上即可；

- 点位渲染 ：  `use-render-point-markers`
- 线索渲染 ：  `use-render-clue-markers`
- 竞品渲染 ：  `use-render-poi-markers`
- 规划圈渲染：`use-render-plan-polygons`
- 动线图渲染：`use-render-traffic-lines`

基本结构大体如下，绘制部分根据不同实体使用不同的高德 `api` 进行绘制； 举例：`use-render-point-markers`

```
import { useEffect, useRef, useState } from 'react';
import { useBatchEffect } from '@/hooks';
import {
  POINT_MARKES_ANCHOR,
  POINT_MARKES_SIZE,
  POINT_MARKES_OFFSET,
} from '@/pages/map-mode/constant';

export default (props) => {
  const {
    pointsData = [],
    mapInstance,
    mapRef,
    handleClickPointMark,
  } = props || {};
  const pointMarkersRef = useRef({});

  useEffect(() => {
    if (!mapInstance) return;

    // 清除所有marker
    Object.keys(pointMarkersRef.current).forEach((id) => {
      mapRef.current.remove(pointMarkersRef.current[id]);
      delete pointMarkersRef.current[id];
    });

    // 点位marker实例化
    pointsData?.forEach((item: any) => {
      const size = POINT_MARKES_SIZE;
      const Icon = new AMap.Icon({
        size,
        anchor: POINT_MARKES_ANCHOR,
        image: item.iconConfig?.iconUrl,
        imageSize: size,
      });

      const marker = new AMap.Marker({
        position: new AMap.LngLat(item.position[0], item.position[1]), // 经纬度对象，也可以是经纬度构成的一维数组[116.39, 39.9]
        title: item.name,
        icon: Icon,
        extData: { item },
        visible: true,
        anchor: new AMap.Pixel(0, 0),
        offset: POINT_MARKES_OFFSET,
        bubble: true,
        zIndex: 999,
      });

      marker.on('click', () => handleClickPointMark?.(marker.getExtData().item));

      mapRef.current.add(marker);
      pointMarkersRef.current[item.id] = marker;
    });
  }, [pointsData, mapInstance]);
 
  return {
    pointMarkersRef,
  };
};
```

## 其他

### 高德缺陷

> **`massMarker` 点击穿透**

使用`massMarker` 渲染时，当有标记物拥挤后产生重叠时，点击最上面的标记物，最终效果是点击到了层级最低的，这个咨询了高德官方，说这是已知 `bug`；如果我们考虑性能只能用 `massMarker `的话，也只能尽量放大到没有重叠时点击；

> **动态设置 `marker` 的 `bubble` 穿透属性**

只能在事件绑定的时候去设置 `bubble` 穿透属性，无法动态设置该属性，如果想禁止穿透，只能重新解绑事件，但海量数据进行动态解绑是很消耗性能的操作，这个目前也是无解，目前是通过在事件中进行判断处理；

### 小细节

> **Marker icon偏移问题**

点标记覆盖物图标可能五花八门，比如下面几种

![medium-zoom](/assets/excellentArticle/2024-06-14/640-1718347484386-4.webp)

![medium-zoom](/assets/excellentArticle/2024-06-14/640-1718347484386-5.webp)

![medium-zoom](/assets/excellentArticle/2024-06-14/640-1718347484386-6.webp)

当基准点设置有问题

![medium-zoom](/assets/excellentArticle/2024-06-14/640-1718347484386-7.gif)

其实高德地图的各种覆盖物都有设置标记锚点和偏移量的属性

![medium-zoom](/assets/excellentArticle/2024-06-14/640-1718347484386-8.webp)

我们只需要根据不同的`icon`锚点位置设置`anchor`，不用去关心 `offset` 即可； 设置好以后效果如下

![medium-zoom](/assets/excellentArticle/2024-06-14/640-1718347484387-9.gif)

> **marker 拖动产生的经纬度偏移**

> 场景：地图上有一个图标，拖动图标到某一个位置后，将拖动位置动态设置为地图中心点 之前一直是用事件的经纬度`e.lnglat`，导致拖动非锚点时坐标会产生偏移【图1】 咨询了高德官方后，现使用 `e.target.getPosition()` 规避了该问题【图2】

![medium-zoom](/assets/excellentArticle/2024-06-14/640-1718347484387-10.gif)    

![medium-zoom](/assets/excellentArticle/2024-06-14/640-1718347484387-11.gif)

```
// 图1  错误的使用
markerRef.current.on('dragend', async (e) => {
  mapInstnce.setCenter([e.lnglat.lng, e?.lnglat.lat]);
});

// 图2  正确的使用
markerRef.current.on('dragend', async (e) => {
  mapInstnce.setCenter(e.target.getPosition());
});
```

> **内存泄漏问题**

高德本身有提供`destory`方法来卸载高德实例，但是在切换页面时，当前高德的地图卸载方法不能够完全清除，或者在地图页面和其他页面来回切换时，通过`Chrome DevTools Performance`观察到地图内存会疯狂增长。通过高德工单咨询以后，得到的反馈是问题确实存在，他们已经在修复过程中。

![medium-zoom](/assets/excellentArticle/2024-06-14/640-1718347484387-12.webp)

但是等高德升级？估计遥遥无期…… 所以开始了`google`大法 在地图崩溃后会有一个报错信息：`createBuffer error`的错误，这个错误是`webGL`引起的，那么利用`webgl`丢失上下文的方法可以干掉内存。

```
export const destroyMapWebGl = (canvass = []) => {
  for (let i = 0; i < canvass.length; i++) {
    const canvas = canvass[i];
    canvas.getContext('webgl');
    const gl = canvas.getContext('webgl');
    // 丢失上下文的方法
    gl.getExtension('WEBGL_lose_context')?.loseContext?.();
  }
};
```

###

![medium-zoom](/assets/excellentArticle/2024-06-14/640-1718347484387-13.webp)

### 疑难问题咨询

当进行深度开发时，难免会遇到一些疑难问题，可以在高德管理后台创建个人应用，基于应用 `id` 提工单进行咨询；不得不赞一下高德的响应速度和服务效率  ~~

![medium-zoom](/assets/excellentArticle/2024-06-14/640-1718347484387-14.webp)image.png

## 总结

- 抽离地图通用化能力便于不同业务场景复用；
- 信息窗体响应式通过` ReactDom.render(<Comp />, document.getElementById('id') )` 解决；
- 事件较为特殊，综合性能以及事件中状态的实时性，需要在两者之间做权衡取舍【地图事件采用动态绑定，标记物事件考虑到性能，采用初始化一次性绑定】；
- 不同实体渲染抽离成独立 `hook`，便于复用；
