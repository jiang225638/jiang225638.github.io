- # 面经，考Vue考的比较多~


  ![img](/assets/roteLearning/vue/300.png)

  ## 面经

  ### 1、怎么理解Vue单向数据流？

  父组件传输局`props`给子组件时，子组件只能使用而不能修改，这是为了组件之间能更高地去解耦。比如有一个父组件，传`props`给10个子组件，如果某一个子组件修改了，那么会影响其他9个子组件跟着刷新，所以不推荐子组件修改`props`

  ### 2、Vue 组件之间的通信方式都有哪些，用过 eventbus 么，eventbus 的思想是什么

  - 父组件传值给子组件数据`props`
  - 子组件传值给父组件，通过`$emit`事件对父组件进行传值
  - 父组件和子组件通过`$parent`和`$children`进行获取实例数据
  - 二次封装时经常使用`$attrs`和`$listener`进行传值
  - 使用`$refs`获取组件实例，进而获取数据
  - 使用`Vuex`进行状态管理
  - 使用`eventBus`进行跨组件传值，进而传递数据(发布订阅模式)
  - 使用`provide`和`inject`，官方不建议
  - 浏览器本地缓存，例如`localStorage`
  - 路由传值

  ### 3、写个自定义 v-model？

  `v-model`实际是`:value + @input`的语法糖

  ```
  <input v-model="inputValue" />
  
  <input 
  :value="inputValue" 
  @input="inputValue = $event.target.value" 
  />
  ```

  ### 4、`$attrs` 和 `$listener` 有了解吗？

  常用于对组件进行二次封装时，比如`A -> B -> C`，B可以直接将爷爷组件的所有数据或者事件直接传给孙子

  ### 5、Vue 生命周期有哪些，都是做什么的，updated 什么情况下会触发，beforeCreate 的时候能拿到 Vue 实例么，组件销毁的时候调用的是哪个 API

  生命周期：

  - `beforeVCreated`：实例了Vue但是还没有进行数据初始化与响应式处理
  - `created`：数据已经被初始化和响应式处理，这里可以访问和修改数据
  - `beforeMount`：render函数在这里调用，生成虚拟DOM，但是还没转真实DOM并替代到el
  - `mounted`：真实DOM挂载完毕
  - `beforeUpdated`：数据更新后，新的虚拟DOM生成，但还没更旧虚拟DOM对比打补丁
  - `update`：新旧虚拟DOM对比打补丁后，进行真实DOM的更新
  - `activated`：被keep-alive缓存的组件被激活时调用
  - `deactivated`：被keep-alive缓存的组件停用时调用
  - `beforeDestroy`：实例销毁之前调用，在这一步，依然可以访问数据
  - `destroyed`：实例销毁后调用。Vue实例的所有指令都被解绑，实例的监听器被移除，所有子实例也都被销毁
  - `errorCaptured`：捕获子孙组件的错误时被调用。此钩子会收到三个参数：错误对象、发生错误的组件实例以及一个包含错误来源信息的字符串。此钩子可以返回false以阻止该错误继续向上传播。

  ### 6、什么情况下会触发组件销毁，销毁的时候会卸载自定义事件和原生事件么？

  组件销毁时会自动卸载组件本身绑定的事件，但是仅限于组件本身。例如一些`定时器、全局对象的事件绑定、eventBus`则不会自动解绑，需要手动解绑。

  ### 7、自定义指令写过么，自定义指令都有哪些钩子？

  #### Vue2

  - `bind`：指令绑定到指定元素时触发，只触发一次
  - `inserted`：指定元素插入到DOM时触发，只触发一次
  - `update`：VNode更新时触发，会触发多次
  - `unbind`：指令解绑时触发，只触发一次

  #### Vue3

  - `created`：指定元素的attribute或事件监听器被应用之前被调用
  - `beforeMount`：指令绑定到指定元素上触发
  - `mounted`：指定元素被挂载时触发
  - `beforeUpdate`：在更新包含组件的VNode之前触发
  - `updated`：在包含组件的VNode及其VNode更新后调用
  - `beforeUnMount`：在卸载指定元素的父组件之前触发
  - `unmounted`：指令解绑时触发

  ### 8、传统前端开发和框架开发的区别是什么？

  传统的前端开发就像是盖房子时需要自己从零开始，用了框架开发就相当于有人事先给你搭好架子，你只需要添砖加瓦就行了。框架有他自己的一套开发模式和开发流程，只要跟着他的流程走，并利用好其开发模式，做起事来会事半功倍，这也是为什么现在的前端越来越趋于框架开发的原因，毕竟时间就是金钱，节省时间很重要。

  ### 9、Vue2 的数据响应式有两个缺陷，你知道是哪两个缺陷么，为什么会有这样的缺陷，如何解决？

  - 1、对象新增属性或修改新增的属性时，无法触发视图更新，需要使用` Vue.set`，对象删除属性时需要使用`Vue.delete`才能触发更新
  - 2、数组直接通过下标修改元素无法触发视图更新，需要使用数组的方法`splice、push`等等

  ### 10、Vue 如何实现的数组的监听，为什么 Vue 没有对数组下标修改做劫持？

  Vue2是通过重写了数组原型上的方法来达到对数组的修改的监听，Vue2没有对数组下标做劫持，是出于心梗的考虑，因为通常数组元素都是非常多的，可能成百上千，如果每个元素都进行劫持，则非常耗费性能。

  ### 11、Symbol 有了解吗，迭代器有了解吗，哪些是可迭代的？

  #### Symbol

  是ES6的特性，具体使用场景有：

  - 充当对象的属性名，实现私有属性
  - 充当变量，实现单独变量
  - 用来定义类里的私有属性

  #### 迭代

  迭代器：`Iterator`，可迭代对象有`Array、Set、Map`，想将`不可迭代对象`变成`可迭代对象`，可以设置`Symbol.iterator`属性

  ```
  const t = {
    name: '林三心',
    age: 12
  }
  
  t[Symbol.iterator] = function () {
    let index = 0,
      self = this,
      keys = Object.keys(this)
  
    return {
      next() {
        if (index < keys.length) {
          return {
            value: self[keys[index++]],
            done: false
          }
        } else {
          return {
            value: undefined,
            done: true
          }
        }
      }
    }
  }
  for (let value of t) {
    console.log(value)
  }
  ```

  #### 迭代器和迭代对象

  ### 12、用Set获取两个数组的交集，如何做？

  #### 合集

  ```
  const heji = (arr1, arr2) => {
    return [...new Set(arr1.concat(arr2))]
  }
  ```

  #### 交集

  ```
  const jiaoji = (arr1, arr2) => {
    const temp = new Set(arr1)
    return Array.from(new Set(arr2)).filter(item => {
      return temp.has(item)
    })
  }
  ```

  #### 差集

  ```
  const chaji = (arr1, arr2) => {
    const temp1 = new Set(arr1)
    const temp2 = new Set(arr2)
    const res = []
    for (let item of temp1) {
      !temp2.has(item) && res.push(item)
    }
    return res
  }
  ```

  ### 13、实现 Promise.all？

  ```
  Promise.sx_all = (promises) => {
      return new Promise((resolve, reject) => {
          const result = []
          let count = 0
          for (let i = 0; i < promises.length; i++) {
              const promise = Promise.resolve(promises[i])
              promise.then(res => {
                  result[i] = res
                  count++
                  if (count === promises.length) {
                      resolve(result)
                  }
              }).catch(err => {
                  reject(err)
              })
          }
      })
  }
  ```

  ### 14、animation 和 transition 的区别？

  - `animation`需配合`@keyframe`，而`transition`不需要
  - `animation`可以出发多次，`transition`只能触发一次
  - `animation`可以设置多个帧，而`transition`只有两帧
  - 前者可能会引起多次重回回流，后者会比较少

  ### 15、写个动画，一个盒子，开始时缩放是 0，50%时是 1，100%时是 0，开始结束都是慢速，持续 2 秒，延迟 2 秒，结束后固定在结束的效果

  ```
  .box {
      width: 100px;
      height: 100px;
      background-color: pink;
      animation: scale 2s 9999999 alternate;
    }
    @keyframes scale {
      from { transform: scale(0); }
      to { transform: scale(1); }
    }
  ```

