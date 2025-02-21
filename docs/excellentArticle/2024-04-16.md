# 搞懂 Vue3 中的各种 ref: toRef,toRefs,isRef,unref...

在 Vue3 中，有许多与响应式相关的函数，例如 toRef、toRefs、isRef、unref 等等。合理地使用这些函数可以在实际开发中大大提高效率。本文将详细介绍这些函数的用法，让我们在实际开发中知道应该使用哪些 API 并能够熟练地回答面试官的相关问题。

## **ref()**

大家对于 ref 这个 API 肯定都不陌生。在 Vue3 中经常会用到它。它的作用是接收一个值并返回一个响应式的对象。我们可以通过.value 属性来访问和修改这个值。在模板中，我们可以省略.value，例如在下面的代码中，当点击按钮时，页面中的 count 会响应式地更改。

```
<template>
    <div>
        {{ count }}
        <button @click="addCount">+1</button>
    </div>
</template>

<script lang='ts' setup>
import { ref } from "vue"
const count = ref(1)
const addCount = () => {
    count.value++
}
</script>
```

## **toRef**

toRef 可以根据一个响应式对象中的一个属性,创建一个响应式的 ref。同时这个 ref 和原对象中的属性保持同步,改变原对象属性的值这个 ref 会跟着改变,反之改变这个 ref 的值原对象属性值也会改变,它接收两个参数,一个是响应式对应,另一个则是属性值,例如下面代码

```
<template>
    <div>
        {{ count.a }}
        {{ a }}
        <button @click="addCount">+1</button>
    </div>
</template>

<script lang='ts' setup>
import { ref, toRef } from "vue"
const count = ref({
    a: 1,
    b: 2
})
const a = toRef(count.value, 'a')
const addCount = () => {
    a.value++
}
</script>
```

点击按钮的时候修改了 a 的值,此时 count 中的 a 也会跟着修改,当然这里的 count 也可以用 reactive

![medium-zoom](/assets/excellentArticle/2024-04-16/640.gif)GIF.gif

## **toRefs**

toRefs 它可以将一个响应式对象转成普通对象,而这个普通对象的每个属性都是响应式的 ref

```
<template>
    <div>
        {{ count.a }}
        {{ countAsRefs.a }}
        <button @click="addCount">+1</button>
    </div>
</template>

<script lang='ts' setup>
import { reactive, toRefs } from "vue"
const count = reactive({
    a: 1,
    b: 2
})
const countAsRefs = toRefs(count)
const addCount = () => {
    countAsRefs.a.value++
}

</script>
```

此时代码中的`countAsRefs`类型为

```
{
  a: Ref<number>,
  b: Ref<number>
}
```

它的属性 a 和 b 都是响应式的 ref 对象,同样的它们和原对象的 count 的属性也是保持同步的

![medium-zoom](/assets/excellentArticle/2024-04-16/640.gif)GIF.gif

根据它的特性我们通常用它来解构一个响应式对象而不会让其失去响应式

```
import { reactive, toRefs } from "vue";
const count = reactive({
  a: 1,
  b: 2,
});
const { a, b } = toRefs(count);
```

此时的 a 和 b 都是一个响应式的 ref 对象,并和原对象的 a 和 b 属性保持同步

## **isRef()**

isRef 顾名思义它是用来判断某个值是否是 ref,注意:它判断不了这个值是不是 reactive(可以使用 isReactive 判断)

```
import { reactive, isRef, ref } from "vue";
const count = ref(1);
const testObj = reactive({
  a: 1,
});
console.log(isRef(count)); //true
console.log(isRef(testObj)); //false
```

## **unref()**

其实它是一个语法糖

```
val = isRef(val) ? val.value : val;
```

如果是 ref 则返回它的内部值,否则则返回它本身。通过这个语法糖我们可以看出它可以对响应式对象解除响应式引用,比如我们只想获取一个响应式的值,但不想要它的响应式可以使用它解除引用。 例如

```
<template>
    <div>
        {{ unRefAsCount }}
        {{ count }}
        <button @click="addCount">+1</button>
    </div>
</template>

<script lang='ts' setup>
import { unref, ref } from "vue"
const count = ref(1)
let unRefAsCount = unref(count)
const addCount = () => {
    count.value++
}
</script>
```

代码中的 unRefAsCount 是不具备响应式的

![medium-zoom](/assets/excellentArticle/2024-04-16/640-1713258966057-1.gif)GIF5.gif

## **shallowRef**

通过翻译我们可以看出它是浅层的 ref,什么是浅层的 ref 呢? 与 ref 不同的是只有.value 是响应式的,再深层的属性则不具备响应式

```
<template>
    <div>
        {{ shallowObj.a }}
        <button @click="addCount"> +1</button>
    </div>
</template>

<script lang='ts' setup>
import { shallowRef } from "vue"

const shallowObj = shallowRef({
    a: 1
})
const addCount = () => {
    //不会触发页面更新
    shallowObj.value.a++
}
</script>
```

![medium-zoom](/assets/excellentArticle/2024-04-16/640-1713258966057-2.gif)GIF6.gif

但是如果我们将 addCount 改为修改整个.value 就会触发响应式了

```
const addCount = () => {
  let temp = shallowObj.value.a;
  temp++;
  shallowObj.value = {
    a: temp,
  };
};
```

![medium-zoom](/assets/excellentArticle/2024-04-16/640-1713258966057-3.gif)GIF7.gif

## **triggerRef**

它可以让浅层的 ref 即 shallowRef 深层属性发生改变的时候强制触发更改,比如上面触发不了响应式的代码示例加入`triggerRef`后

```
<template>
    <div>
        {{ shallowObj.a }}
        <button @click="addCount"> +1</button>
    </div>
</template>

<script lang='ts' setup>
import { shallowRef, triggerRef } from "vue"

const shallowObj = shallowRef({
    a: 1
})

const addCount = () => {
    shallowObj.value.a++
    //加入triggerRef强制触发更改
    triggerRef(shallowObj)
}
</script>
```

此时再看页面效果则触发了响应式

![medium-zoom](/assets/excellentArticle/2024-04-16/640-1713258966057-3.gif)GIF7.gif

## **customRef**

顾名思义它是自定义的 ref,我们可以通过 customRef 来显式的追踪某个值的响应式变化,它接收一个函数,这个函数接受 track 和 trigger 两个函数作为参数，并返回一个带有 get 和 set 方法的对象。比如下面封装一个自定义的响应式对象 myRef,同时控制它只有值小于 4 才会触发响应式

```
<template>
    <div>
        {{ count }}
        <button @click="addCount"> +1</button>
    </div>
</template>

<script lang='ts' setup>
import { customRef } from "vue"
const myRef = (value: number) => {
    const customValue = customRef((track, trigger) => {
        return {
            get() {
                //通知vue需要追踪后续内容的变化,这里可以自由控制
                track()
                return value
            },
            set(newValue) {
                console.log(newValue);//myRef.value=xxx的xxx值
                //加trigger则触发响应式,通知vue更新页面,这里可以自由控制是否加trigger
                if(value<4)  trigger()
                value = newValue
            }
        }
    })
    return customValue
}

const count = myRef(0)
const addCount = () => {
    count.value++
}
</script>
```

![medium-zoom](/assets/excellentArticle/2024-04-16/640-1713258966057-4.gif)GIF7.gif

可以看到当 count 大于 4 的时候便失去了响应式

## **总结**

本篇文章详细介绍了 Vue3 中各种 ref 的用法,其中包括

- ref(): 接收一个值并返回一个响应式的对象，可以使用.value 属性来访问和修改这个值。
- toRef(obj, key): 根据一个响应式对象中的一个属性，创建一个响应式的 ref，并且该 ref 和原对象中的属性保持同步。 -toRefs(obj): 将一个响应式对象转换成一个普通对象，其中普通对象的每个属性都是响应式的 ref。
- isRef(value): 判断某个值是否是 ref 对象。
- unref(value): 用于解除响应式引用
- shallowRef(value): 创建一个浅层的 ref，只有 value 属性是响应式的，深层的属性不具备响应式。
- triggerRef(ref): 强制浅层的 ref 发生改变时触发响应式。
- customRef(factory): 自定义 ref 对象，可以显式地追踪某个值的响应式变化。