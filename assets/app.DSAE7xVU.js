function __vite__mapDeps(indexes) {
  if (!__vite__mapDeps.viteFileDeps) {
    __vite__mapDeps.viteFileDeps = []
  }
  return indexes.map((i) => __vite__mapDeps.viteFileDeps[i])
}
import{j as o,ax as p,ay as u,az as l,aA as c,aB as f,aC as d,aD as m,aE as h,aF as A,aG as g,aH as P,d as _,u as v,l as y,z as C,aI as E,aJ as R,aK as w,a4 as T}from"./chunks/framework.C-6F2GHi.js";import{R as b}from"./chunks/theme.DQdJ8S9z.js";function i(e){if(e.extends){const a=i(e.extends);return{...a,...e,async enhanceApp(t){a.enhanceApp&&await a.enhanceApp(t),e.enhanceApp&&await e.enhanceApp(t)}}}return e}const s=i(b),D=_({name:"VitePressApp",setup(){const{site:e,lang:a,dir:t}=v();return y(()=>{C(()=>{document.documentElement.lang=a.value,document.documentElement.dir=t.value})}),e.value.router.prefetchLinks&&E(),R(),w(),s.setup&&s.setup(),()=>T(s.Layout)}});async function S(){globalThis.__VITEPRESS__=!0;const e=x(),a=j();a.provide(u,e);const t=l(e.route);return a.provide(c,t),a.component("Content",f),a.component("ClientOnly",d),Object.defineProperties(a.config.globalProperties,{$frontmatter:{get(){return t.frontmatter.value}},$params:{get(){return t.page.value.params}}}),s.enhanceApp&&await s.enhanceApp({app:a,router:e,siteData:m}),{app:a,router:e,data:t}}function j(){return h(D)}function x(){let e=o,a;return A(t=>{let n=g(t),r=null;return n&&(e&&(a=n),(e||a===n)&&(n=n.replace(/\.js$/,".lean.js")),r=P(()=>import(n),__vite__mapDeps([]))),o&&(e=!1),r},s.NotFound)}o&&S().then(({app:e,router:a,data:t})=>{a.go().then(()=>{p(a.route,t.site),e.mount("#app")})});export{S as createApp};
