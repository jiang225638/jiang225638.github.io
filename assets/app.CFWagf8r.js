import{U as o,dm as p,dn as u,dp as d,dq as l,dr as c,ds as f,dt as m,du as h,dv as A,dw as g,d as v,u as y,y as P,x as w,dx as C,dy as R,dz as b,a3 as E}from"./chunks/framework.2rcLouwq.js";import{R as S}from"./chunks/theme.C2UQufAG.js";function i(e){if(e.extends){const t=i(e.extends);return{...t,...e,async enhanceApp(a){t.enhanceApp&&await t.enhanceApp(a),e.enhanceApp&&await e.enhanceApp(a)}}}return e}const s=i(S),T=v({name:"VitePressApp",setup(){const{site:e,lang:t,dir:a}=y();return P(()=>{w(()=>{document.documentElement.lang=t.value,document.documentElement.dir=a.value})}),e.value.router.prefetchLinks&&C(),R(),b(),s.setup&&s.setup(),()=>E(s.Layout)}});async function _(){globalThis.__VITEPRESS__=!0;const e=D(),t=x();t.provide(u,e);const a=d(e.route);return t.provide(l,a),t.component("Content",c),t.component("ClientOnly",f),Object.defineProperties(t.config.globalProperties,{$frontmatter:{get(){return a.frontmatter.value}},$params:{get(){return a.page.value.params}}}),s.enhanceApp&&await s.enhanceApp({app:t,router:e,siteData:m}),{app:t,router:e,data:a}}function x(){return h(T)}function D(){let e=o,t;return A(a=>{let n=g(a),r=null;return n&&(e&&(t=n),(e||t===n)&&(n=n.replace(/\.js$/,".lean.js")),r=import(n)),o&&(e=!1),r},s.NotFound)}o&&_().then(({app:e,router:t,data:a})=>{t.go().then(()=>{p(t.route,a.site),e.mount("#app")})});export{_ as createApp};
