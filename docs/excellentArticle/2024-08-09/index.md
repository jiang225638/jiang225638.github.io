# Vue3 组件封装的一些技巧和心得

## **1. 组件特性**

在`Vue`中组件是一个独立的实例，每个组件都有共通点，就是：`属性`、`插槽`、`事件`、`方法`；

在日常我们使用第三方组件库的时候，组件库的文档都会说明上面四个特性，而组件封装就是围绕这四个特性进行的；

## **2. 组件封装**

### **2.1 组件继承**

很多情况下，我们会在一个组件的基础上进行扩展，这个时候就需要用到组件继承；

在`Vue2`的时候，我们可以使用`extends`关键字进行组件继承，但是在`Vue3`中，`extends`关键字已经被废弃了；

在`Vue3`中，如果想要实现组件继承其实很简单，要明白一个组件其实就是一个`js`对象，我们可以直接将一个组件对象合并，然后注册成一个新的组件；

```
import { createApp } from "vue";
import App from "./App.vue";
import ElementPlus, { ElInput } from "element-plus";
import "element-plus/dist/index.css";
import { merge } from "lodash";

const app = createApp(App);
app.use(ElementPlus);

// 组件继承，将ElInput组件的placeholder属性默认值改为"请输入"
app.component(
  "ElInput",
  merge(ElInput, {
    props: {
      placeholder: {
        default: "请输入"
      }
    }
  })
);

app.mount("#app");
```

这里直接使用了`lodash`的`merge`方法，将`ElInput`组件的`props`属性进行了合并，然后覆盖注册成了一个新的组件；

因为有很多小伙伴遇到一个问题就是需要固定`ElTable`组件的一些属性，比如`border`、`stripe`、`size`等，这个时候用这种方法就非常方便；

### **2.2 组件插槽**

上面的组件继承只是简单的改变了组件的默认属性，但是如果我们想要改变组件的结构，就需要用到组件插槽；

通常情况下我们要拆分组件的业务，然后封装成业务组件，这个时候可能会使用到多个组件；

这个时候组件里面有很多组件，需要替换组件里面的组件里面的插槽，这个时候就需要透传插槽；

```
<!--  透传插槽  -->
<template>
  <div>
    区域A这里有一个组件，这个组件需要替换插槽
    <el-tree :data="treeData">
      <template v-if="$slots.tree" #default="{ node, data }">
        <slot name="tree" :node="node" :data="data" />
      </template>
    </el-tree>
  </div>

  <div>
    区域B这里有一个组件，这个组件需要替换插槽
    <el-table :data="tableData">
      <template v-if="$slots.default">
        <slot />
      </template>
    </el-table>
  </div>
</template>

<script>
export default {
  data() {
    return {
      treeData: new Array(10)
          .fill(0)
          .map((_, index) => ({ label: "label" + index })),
      tableData: [],
    };
  },
};
</script>
```

通过使用`$slots`可以获取到组件的插槽，然后通过`v-if`判断是否有插槽，如果有插槽就进行透传；

除了这种方式之外，还可以使用`jsx`语法，这种方式更加灵活；

```
<script lang="jsx">
export default {
  render() {
    const areaA = (
        <div>
          区域A这里有一个组件，这个组件需要替换插槽
          <el-tree data={treeData}>
            {{
              default: this.$slots.tree
            }}
          </el-tree>
        </div>
    );

    const areaB = (
        <div>
          区域B这里有一个组件，这个组件需要替换插槽
          <el-table data={tableData}>
            {{
              default: this.$slots.default
            }}
          </el-table>
        </div>
    );
    
    return (
        <div>
          {areaA}
          {areaB}
        </div>
    );
  }
}
</script>
```

> 在`setup`语法中是没有`this`的，这个使用需要获取`$slots`的时候需要使用`useSlots`方法；

### **2.3 组件事件和透传 attrs**

在`Vue2`中，我们可以使用`$listeners`来获取组件的事件，然后进行透传；

而在`Vue3`中，`$listeners`已经被废弃了，`$listeners`和`$attrs`都被合并到了`$attrs`中；

```
<!-- 组件 -->
<template>
  <div v-bind="$attrs"></div>
</template>

<!-- 父组件 -->
<template>
  <div>
    <MyComponent 
        class="my-class"
        @click="handleClick"
    />
  </div>
</template>
```

在`Vue3`中，我们可以直接使用`$attrs`来获取组件的事件，然后进行透传；

例如上面的例子，我们可以直接在组件中使用`$attrs`来获取到`class`和`@click`事件，等同于下面的写法；

```
<!-- 组件 -->
<template>
  <div class="my-class" @click="handleClick"></div>
</template>
```

但是这里其实有一个小技巧，就是`Vue3`默认属性是可以透传的，例如上面的例子其实可以简化成下面的写法；

```
<!-- 组件 -->
<template>
  <div></div>
</template>

<!-- 父组件 -->
<template>
  <div>
    <MyComponent 
        class="my-class"
        @click="handleClick"
    />
  </div>
</template>
```

就是组件里面什么都不写，最后在父组件中使用这个组件的时候，属性会透传到组件中的根元素上；

参考：**透传 Attributes**[1]

了解这个特性就可以这样封装组件：

```
<!-- 组件 -->
<template>
  <el-dialog>
  </el-dialog>
</template>

<!-- 父组件 -->
<template>
  <div>
    <MyComponent 
        v-model="visible"
        width="500px"
    />
  </div>
</template>
```

通常我们会封装一个`Dialog`组件来解耦业务，这个时候直接将`Dialog`作为根元素，然后可以将`v-model`和`width`属性透传到`Dialog`组件上；

这样不需要写`Dialog`组件开启关闭的双向绑定的代码，前提是不需要在组件内部操作`Dialog`的开启关闭；

### **2.4 组件方法**

在`Vue2`中，我们可以通过`this.$refs.xxx`来获取到组件的实例，然后调用组件的方法；

在`Vue3`中，我们可以通过`ref`来获取到组件的实例，然后调用组件的方法；

但是不管是`Vue2`还是`Vue3`，在组件内部想要使用组件的子组件的方法都不是一件容易的事情；

通常都是手动将组件的实例获取到，然后再重新定义在组件的`methods`中；

```
<!-- 组件 -->
<template>
  <div>
    <el-input ref="input" />
  </div>
</template>

<script>
export default {
  methods: {
    focus() {
      this.$refs.input.focus();
    },
  },
};
</script>
```

组件的方法通常没有啥特别好的方式，除了我上面的这种方式之外，还有小伙伴是直接将`ref`返回出去：

```
<template>
  <div>
    <el-input ref="input" />
  </div>
</template>

<script>
export default {
  methods: {
    inputRef() {
      return this.$refs.input
    },
  },
};
</script>
```

当然还有一种偷懒的方式：

```
<template>
  <div>
    <el-input ref="input" />
  </div>
</template>

<script>
export default {
  mounted() {
    Object.values(this.$refs.input).forEach((value) => {
      if (typeof value === 'function') {
        this[value.name] = (...args) => value(...args);
      }
    });
  },
  methods: {
    inputRef() {
      return this.$refs.input
    },
  },
};
</script>
```

不过这种偷懒的方式只能在`options api`中使用，因为在`composition api`中是没有`this`的；

对于`setup`语法，如果需要使用组件的方法，可以使用`getCurrentInstance`来获取到组件的实例，然后将方法挂载到`exposed`上；

```
<template>
  <div>
    <el-input ref="input" />
  </div>
</template>

<script setup>
import { getCurrentInstance, onMounted, ref } from "vue";

const instance = getCurrentInstance();
const input = ref(null);
onMounted(() => {
  Object.values(input.value).forEach((value) => {
    if (typeof value === "function") {
      instance.exposed[value.name] = (...args) => value(...args);
    }
  });
});
</script>
```

> 这种方式不太稳定，因为`exposed`是`Vue3`的一个私有属性，不建议使用；

> 在`setup`语法中如果需要暴露组件的内部方法，需要使用`defineExpose`来暴露；

```
<script setup>
// ... 省略其他代码

defineExpose({
  focus: () => {
    input.value.focus();
  },
});
</script>
```

## **总结**

这次带来的是`Vue3`的组件封装的一些技巧，主要是`setup`语法的一些特性，以及`Vue3`中的一些奇淫技巧；

`Vue3`的组件封装相比`Vue2`来说更加的灵活，但是也更加的复杂，需要我们在使用的时候多加注意

