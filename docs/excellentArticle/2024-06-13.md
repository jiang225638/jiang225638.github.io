# JavaScript | 1000个判断条件难道要写了1000个 if ? 一文教你如何实现分支优化

最近在网上冲浪时看到了这样一段代码：

```
function getUserDescribe(name) {
    if (name === "小刘") {
        console.log("刘哥哥");
    } else if (name === "小红") {
        console.log("小红妹妹");
    } else if (name === "陈龙") {
        console.log("大师");
    } else if (name === "李龙") {
        console.log("师傅");
    } else if (name === "大鹏") {
        console.log("恶人");
    } else {
        console.log("此人比较神秘！");
    }
}
```

咋一看没感觉有什么异常，但如果有1000个判断条件，按照这种写法难不成要写1000个 `if` 分支？

如果写了大量的 `if` 分支，并且可能还具有**分支套分支**，可以想象到整个代码的可读性和可维护都会大大降低，这在实际开发中，确实是一个比较头疼的问题，那有没有什么办法能够即实现需求又能避免这些问题呢？

## 1️⃣ 简单分支优化

这就涉及到**分支优化**，让我们转换思维，去优化一下上面的代码结构：

```
function getUserDescribe(name) {
    const describeForNameMap = {
        小刘: () => console.log("刘哥哥"),
        小红: () => console.log("小红妹妹"),
        陈龙: () => console.log("大师"),
        李龙: () => console.log("师傅"),
        大鹏: () => console.log("恶人"),
    };
    describeForNameMap[name] ? describeForNameMap[name]() : console.log("此人比较神秘！");
}
```

问题代码中的判断都是简单的**相等判断**，那么我们就可以将这些判断条件作为一个属性写到对象`describeForNameMap` 中去，这些属性对应的值就是条件成立后的处理函数。

之后我们就只需通过`getUserDescribe`函数接收到的参数去获取`describeForNameMap`对象中对应的值，如果该值存在就运行该值（因为值是一个函数）。

这样一来原本的 `if` 分支判断就转换成了简单的`key value`对应值，条件与处理函数一一对应，一目了然。

## 2️⃣ 复杂分支优化

那如果我们的 `if` 分支中的判断条件不只是简单的相等判断，还具有一些需要计算的表达式时，我们该怎么办呢？（如下所示）

```
function getUserDescribe(name) {
    if (name.length > 3) {
        console.log("名字太长");
    } else if (name.length < 2) {
        console.log("名字太短");
    } else if (name[0] === "陈") {
        console.log("小陈");
    } else if (name[0] === "李" && name !== "李鹏") {
        console.log("小李");
    } else if (name === "李鹏") {
        console.log("管理员");
    } else {
        console.log("此人比较神秘！");
    }
}
```

对于这种结构的代码就不能引入对象来进行分支优化了，我们可以引入**二维数组**来进行分支优化：

```
function getUserDescribe(name) {
    const describeForNameMap = [
        [
            (name) => name.length > 3, // 判断条件
            () => console.log("名字太长") // 执行函数
        ],
        [
            (name) => name.length < 2, 
            () => console.log("名字太短")
        ],
        [
            (name) => name[0] === "陈", 
            () => console.log("小陈")
        ],
        [
            (name) => name === "大鹏", 
            () => console.log("管理员")
        ],
        [
            (name) => name[0] === "李" && name !== "李鹏",
            () => console.log("小李"),
        ],
    ];
    // 获取符合条件的子数组
    const getDescribe = describeForNameMap.find((item) => item[0](name));
    // 子数组存在则运行子数组中的第二个元素（执行函数）
    getDescribe ? getDescribe[1]() : console.log("此人比较神秘！");
}
```

上面我们定义了一个`describeForNameMap`数组，数组内的每一个元素代表一个判断条件与其执行函数的集合（也是一个数组），之后我们通过数组的`find`方法查找`describeForNameMap`数组中符合判断条件的子数组即可。

## 3️⃣ 抽离分支

上面例子中我们定义的这个`describeForNameMap`对象是一个独立的结构，我们完全可以将它抽离出去：

```
const describeForNameMap = {
    小刘: () => console.log("刘哥哥"),
    小红: () => console.log("小红妹妹"),
    陈龙: () => console.log("大师"),
    李龙: () => console.log("师傅"),
    大鹏: () => console.log("恶人"),
};

function getUserDescribe(name) {
    describeForNameMap[name] ? describeForNameMap[name]() : console.log("此人比较神秘！");
}
const describeForNameMap = [
    [
        (name) => name.length > 3, // 判断条件
        () => console.log("名字太长") // 执行函数
    ],
    [
        (name) => name.length < 2, 
        () => console.log("名字太短")
    ],
    [
        (name) => name[0] === "陈", 
        () => console.log("小陈")
    ],
    [
        (name) => name === "大鹏", 
        () => console.log("管理员")
    ],
    [
        (name) => name[0] === "李" && name !== "李鹏",
        () => console.log("小李"),
    ],
];
    
function getUserDescribe(name) {
    // 获取符合条件的子数组
    const getDescribe = describeForNameMap.find((item) => item[0](name));
    // 子数组存在则运行子数组中的第二个元素（执行函数）
    getDescribe ? getDescribe[1]() : console.log("此人比较神秘！");
}
```

> 通过模块化的开发也可以将这个`map`对象写进一个单独的`js`文件，之后在需要使用的地方导入即可。

## 4️⃣ 争议

这样一来整个`getUserDescribe`函数就变得非常简洁，有的同学可能会问这有什么用呢？这不是更加麻烦了吗？如果真的嫌`if else`不好看，那我就使用`if return`不用`else`就好了：

```
function getUserDescribe(name) {
    if (name === "小刘") {
        console.log("刘哥哥");
        return;
    }
    if (name === "小红") {
        console.log("小红妹妹");
        return;
    }
    if (name === "陈龙") {
        console.log("大师");
        return;
    }
    if (name === "李龙") {
        console.log("师傅");
        return;
    }
    if (name === "大鹏") {
        console.log("恶人");
        return;
    }
    console.log("此人比较神秘！");
}
```

试想一下，如果你`getUserDescribe`函数中有1000个判断分支，并且还具有大量的根据判断结果来执行的处理代码，并且`getUserDescribe`函数会返回这个处理后的判断结果的值。

这时`getUserDescribe`函数的**重点**在于**对判断结果的处理**，而不在于这个结果是通过什么分支获取的，例如：

```
function getUserDescribe(name) {
    let str; // 存储判断结果
    if (name.length > 3) {
        str = "名字太长";
    } else if (name.length < 2) {
        str = "名字太短";
    } else if (name[0] === "陈") {
        str = "小陈";
    } else if (name[0] === "李" && name !== "李鹏") {
        str = "小李";
    } else if (name === "李鹏") {
        str = "管理员";
    } else {
        str = "此人比较神秘！";
    }
    // 对判断结果str的一些处理
    // ......
    console.log(str);
    return str;
}
```

如果你不进行分支优化，`getUserDescribe`函数就会被大量的 `if` 分支抢占空间，使得`getUserDescribe`函数的重点迷失（`getUserDescribe`函数**重点在于对判断结果的处理**，而不在于这个结果是通过什么分支获取的），这时你再看一下我们优化后的代码：

```
const describeForNameMap = [
    [(name) => name.length > 3, () => "名字太长"],
    [(name) => name.length < 2, () => "名字太短"],
    [(name) => name[0] === "陈", () => "小陈"],
    [(name) => name === "大鹏", () => "管理员"],
    [(name) => name[0] === "李" && name !== "李鹏", () => "小李"],
];

function getUserDescribe(name) {
    let str; // 存储判断结果
    const getDescribe = describeForNameMap.find((item) => item[0](name));
    if (getDescribe) {
        str = getDescribe[1]();
    } else {
        str = "此人比较神秘！";
    }
    // 对判断结果str的一些处理
    // ......
    console.log(str);
    return str;
}
```

查看优化后的`getUserDescribe`函数我们能够知道，它从`describeForNameMap`获取了一个值赋值给了`str`（`describeForNameMap`是如何返回值的我们并不关心），之后对`str`作了一些处理。这就突出了`getUserDescribe`函数的重点（**对判断结果str进行处理**）。

> 在这个例子中`describeForNameMap`子数组的第二个元素完全可以直接使用一个值：`[(name) => name.length > 3, "名字太长"]`，但为了整体代码的可扩展性，推荐还是使用函数，因为函数可以接收参数，方便应对之后更复杂的场景。

## 🔼 结语

**分支优化**在各种语言中都有不同的实现方式和应用场景，本篇通过`JavaScript`介绍了两种代码分支优化的思想，代码的实现非常简单，重点在于这种思想的应用。

其实关于分支优化这个问题一直存在争议，目前存在两种观点：

- **观点1**：压根不需要多此一举去优化它，并且优化后的代码因为多创建了一个`对象/数组`，对`对象/数组`进行检索反而比单纯的`if else`还是废性能。
- **观点2**：分支优化后的代码`可读性/可维护性`更好，并且引入`对象/数组`所带来的性能问题在当今时代根本不值一提。

你是什么观点呢？