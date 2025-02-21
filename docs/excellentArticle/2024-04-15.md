# 面试官：Vue3中什么是Reactive的懒响应性？

**Reactive 的懒响应性** 可能很多同学之前没有听说过这个概念。最近一个同学在面试中就被问到了这个问题。所以说，咱们今天就借助这篇文章来看下：在vue3中，什么是 Reactive 的懒响应性？

## **01：Reactive 的实现原理**

Reactive 是基于 `Proxy` 进行实现的，这个概念很多同学都是知道的。我们可以通过 vue 的源码来看下这个实现：

![medium-zoom](/assets/excellentArticle/2024-04-15/640.png)

代码比较复杂，大家可以只看我红框中的内容

通过上图红框中的代码，我们可以很清晰的看到在 Reactive 里面，Vue 最终通过 `new Proxy` 的方式生成了一个 Proxy 的实例对象。 这个 Proxy 的实例就是 `reactive()` 方法调用时的返回值。

我们可以通过如下伪代码表示：

```
function reactive (target) {
  return new Proxy(target, {....})
}

const test = reactive({name: '张三'})
```

在这种情况下，`{name: '张三'}` 就会被包装成一个 **响应式对象**，`proxy` 通过监听它的 `getter、setter` 行为来触发响应性。

## **02：Proxy 的问题**

Proxy 可以代理对象，这个是没有问题的。**但是：Proxy 只能代理一层对象，而不能代理多层**。

什么意思呢？假如当 代理对象 具备层级嵌套的时候，proxy 是不可以代理子层级的。我们可以通过以下代码来进行测试：

```
 const target = {
    name: '张三',
    child: {
      name: '小张三'
    }
  }

  const p = new Proxy(target, {
    set(target, property, value, receiver) {
      console.log('触发了 set');
      target[property] = value
      return true
    },
    get(target, property, receiver) {
      console.log('触发了 get');
      return target[property]
    }
  })

  p.name = '李四'  // 打印：触发了 set
  p.child.name = '小李四' // 打印：触发了 get。注意：并没有触发 child 的 set
```

在上述代码中，我们利用 proxy 代理了 target 对象。**注意：此时的 target 是存在嵌套的复杂数据类型 child**。

当我们执行 `p.name = '李四'` 时，触发 `set` 行为，这是一个很正常的逻辑。但是，当我们执行 `p.child.name = '小李四'` 时，我们会发现 **仅触发了一个 get（p.child），而没有触发 `set`** 行为。

这就证明：对于 Proxy 而言， **它只能代理 一层 的复杂数据类型，而不可以代理多层**。

但是，在 Vue 中 **多层的 Reactive 对象却可以实现响应性，那么这是如何做到的呢？** 具体的方式就是 **Reactive的懒响应性**。

## **03：Reactive的懒响应性**

我们观察 Vue 的源码，在源码监听 proxy getter 行为的地方，存在这样一段代码（我把代码稍微做了一些调整，让大家看的可以更加清晰）：

![medium-zoom](/assets/excellentArticle/2024-04-15/642.png)

核心的代码就在红框的位置，其中的 res 大家可以理解为 `target[property]` 。

而根据 **01：Reactive 的实现原理** 我们知道 `reactive` 方法本质上就是生成了一个 Proxy 实例。所以说，这里的代码核心其实就是 **一旦获取到的属性是对象，则会为该对象再次执行 `reactive` 方法**

如果用伪代码表示，就是下面这样：

![medium-zoom](/assets/excellentArticle/2024-04-15/641.png)

即：**再次通过 Proxy 完成代理，并返回**

所以说，所谓的 Reactive的懒响应性 指的就是：**Reactive 最初只会为复杂数据类型执行第一层的响应性。如果存在多层的复杂数据类型嵌套时，则会在使用到（getter 行为）该子集时，才会再次为该子集包装 proxy（执行 reactive 方法）**