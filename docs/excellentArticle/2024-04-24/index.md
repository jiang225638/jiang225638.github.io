# 一文掌握 TS 高级类型编程

[程序员成长指北](javascript:void(0);) *2024-04-24 08:46* *北京*

以下文章来源于全栈前端精选 ，作者Nealyang



**全栈前端精选**.

内容为王，精选为则。从前端到全栈，定期分享前端、客户端、Node、面试、职场感悟等相关高质量文章。小白的大神养成记，你我共勉！

![img](/assets/excellentArticle/2024-04-24/300.png)

**程序员成长指北**

专注 Node.js 技术栈分享，从 前端 到 Node.js 再到 后端数据库，祝您成为优秀的高级 Node.js 全栈工程师。一个有趣的且乐于分享的人。座右铭：今天未完成的，明天更不会完成。

101篇原创内容



公众号

**大厂技术** **高级前端** **Node进阶**

```
点击上方 程序员成长指北，关注公众号回复1，加入高级Node交流群
```

## **前言**

或许现在很多同学都在用 TypeScript，但是更可能大多数的同学并不会 TypeScript，他们用的，只不过是给 js 加了一些“注释”，然后洋洋得意“TypeScript 不过如此”

![medium-zoom](/assets/excellentArticle/2024-04-24/640.jpeg)

但是偶尔看到一些“别人的代码”又会虎躯一震~ “什么？这还是我用的 TypeScript 嘛？”

```
export interface StoreCreator {
  <S, A extends Action, Ext extends {} = {}, StateExt extends {} = {}>(
    reducer: Reducer<S, A>,
    enhancer?: StoreEnhancer<Ext, StateExt>
  ): Store<S, A, UnknownIfNonSpecific<StateExt>> & Ext;
  <
    S,
    A extends Action,
    Ext extends {} = {},
    StateExt extends {} = {},
    PreloadedState = S
  >(
    reducer: Reducer<S, A, PreloadedState>,
    preloadedState?: PreloadedState | undefined,
    enhancer?: StoreEnhancer<Ext>
  ): Store<S, A, UnknownIfNonSpecific<StateExt>> & Ext;
}
```

其实究其原因，无非就是我们没有真正去了解何为 TypeScript。我们常说 TypeScript 是 js 的超集，确实如此，我们通过 TS 可以使用到很多 js 还在提案中的功能（当然，如今有了 Babel。。。）![medium-zoom](/assets/excellentArticle/2024-04-24/640-1713929828532-1.webp)

所以 TypeScript 并不是什么神奇的东西，它只是在 js 基础上加了一些注释，让我们更容易理解代码的含义。所以！致使我们看不懂上面的代码。。。

如果你还是类型编程的小白（type-challenges simple 级别有压力者）,那么我们就来重新认识一下 TypeScript。

**TypeScript = 预实现 JS 提案+类型编程**

JavaScript 就像是一辆正在行驶的汽车，而 TypeScript 就像是这辆车的 GPS 和安全带。预实现 JavaScript 提案，就好比 GPS 里已经更新了一些还没正式开放的道路（即将来的 JavaScript 新特性），允许你提前探索和尝试；而类型编程，则像是安全带，它在你行驶过程中提供了额外的安全保障，确保你不会因为一些错误而“偏离道路”。

## **什么是类型编程**

类型编程是 TypeScript 中一种强大的功能，它通过类型定义和操作使得开发者能以编程的方式抽象和转换数据结构。简单点来理解就是循环、条件等各种 JS 里面有的语法它都有，其中也包括变量。

假设你正在开发一款游戏，你需要定义一个玩家（Player）类型，它具备一些基本属性和能力。

```
type Player = {
  name: string;
  health: number;
  inventory: string[];
};

function heal(player: Player, amount: number): Player {
  return {
    ...player,
    health: player.health + amount,
  };
}
```

上面的代码或许让你比较自信~嚯~这不就是我写的代码么。但是如果稍微复杂一些,比如：

```
type IntersectionToObj<T> = {
  [K in keyof T]: T[K];
};
type PartialByKeys<T, K = any> = IntersectionToObj<
  {
    [P in keyof T as P extends K ? P : never]?: T[P];
  } & {
    [P in Exclude<keyof T, K>]: T[P];
  }
>;
```

为什么类型编程这么的“炫酷”（实用，可能很多同学还未感受到），实际的开发和使用中，我们使用的很少呢？

究其原因主要是对于多数日常开发任务来说，基本的类型注解提供了足够的安全性和便利性。在没有遇到需要复杂类型转换和操作的场景时，简单地使用类型注解已经可以极大地提高代码的质量和可维护性。因此，许多开发者可能没有迫切的需求去深入学习类型编程的高级概念。但是随着项目规模的增长和功能的复杂，类型编程的能力变得日益重要。掌握了类型编程的开发者能够编写出更加强大、灵活和可复用的代码，同时提升整个代码库的健壮性和可维护性。

## **类型别名 （Type Aliases）**

类型别名允许你给一个类型起一个新名字。这不仅使类型更易于引用，也可以用来创建更复杂的类型。

```
type Point = {
  x: number;
  y: number;
};

function logPoint(p: Point) {
  console.log(`${p.x}, ${p.y}`);
}
```

在这个例子中，我们定义了一个 Point 类型，并在 logPoint 函数中使用它。类型别名使得代码更清晰、更具可读性

## **类型编程基础**

### **接口（Interfaces）**

接口是定义对象形状的另一种方式，它们非常类似于类型别名，但它们更专注于对象结构的描述。接口还支持扩展（继承），这使得它们在描述复杂对象时更有优势。

```
interface Person {
  name: string;
  age: number;
}

interface Employee extends Person {
  salary: number;
}

const employee: Employee = {
  name: 'John Doe',
  age: 30,
  salary: 50000,
};
```

这里，Employee 接口扩展了 Person 接口，添加了 salary 属性。接口的扩展性提供了一种强大的方式来构建和维护类型系统。

### **泛型（Generics）**

> ❝
>
> 类型编程中的变量

泛型允许我们在定义函数或类时不指定具体的类型，而是使用类型变量（type variables）作为占位符。这些类型变量可以在函数或类被实例化时被具体的类型替换。这样，同一个函数或类就可以用于多种不同类型的数据，而不需要为每种数据类型编写重复的代码。

```
class Wrapper<T> {
  value: T;

  constructor(value: T) {
    this.value = value;
  }
}

let wrapper1 = new Wrapper<string>('myString'); // 类型为 Wrapper<string>
let wrapper2 = new Wrapper<number>(100); // 类型为 Wrapper<number>
```

在这个例子中，Wrapper 类是一个泛型类，它有一个类型参数 T。我们可以创建 Wrapper 类的实例，用于存储任何类型的数据

### **类型守卫**

很多文章会把类型收窄和类型守卫混为一谈，他两密切相关，但是概念和侧重点不同。类型收窄指的是任何减少类型可能性的过程，这可以通过类型守卫来实现，但不限于此。类型收窄可以通过条件检查、类型断言、控制流分析等多种方式实现，并且是 TypeScript 类型系统中的一个核心概念。其目的是让编译器能够更精确地知道在某个特定的代码块中变量的类型。

类型守卫则是实现类型收窄的一种具体方式。它是一种运行时检查，可以让 `TypeScript` 编译器在某个作用域中识别出一个更具体的类型。类型守卫通常是一些表达式或函数，它们返回一个布尔值，用于检查某个变量是否为特定的类型或是否满足某个类型断言。

总结来说，类型收窄是指在代码的某个流程中，通过某些手段减少变量的可能类型，而类型守卫则是实现类型收窄的一种机制。类型守卫通常被用作类型收窄的手段之一。

#### **typeof 类型守卫**

使用 typeof 操作符可以检查一个变量是否为 JavaScript 的七种原始类型之一（`number、string、boolean、bigint、symbol、undefined、object`）。

```
function padLeft(value: string, padding: string | number) {
  // typeof 类型守卫
  if (typeof padding === 'number') {
    return new Array(padding + 1).join(' ') + value;
  }
  if (typeof padding === 'string') {
    return padding + value;
  }
  throw new Error(`Expected string or number, got '${padding}'.`);
}
```

这里可能很多人会比较疑惑，typeof 这不是 Js 里的么？这里需要区分下，ts 类型编程中的关键字和 ts 中的关键字还有不一样的，包括后面要说到的 `instanceof` 和 `in`

**JavaScript 中的 typeof**

在 JavaScript 中，typeof 是一个操作符，用于获取一个变量的基础类型。它返回一个表示变量数据类型的字符串。

```
console.log(typeof 'hello'); // "string"
console.log(typeof 42); // "number"
console.log(typeof true); // "boolean"
console.log(typeof undefined); // "undefined"
console.log(typeof {}); // "object"
console.log(typeof function () {}); // "function"
console.log(typeof Symbol('sym')); // "symbol"
```

JavaScript 中的 typeof 返回的类型有："number", "string", "boolean", "undefined", "object", "function", 和 "symbol"。注意 null 会被错误地认为是 "object" 类型，这是 JavaScript 历史遗留的一个 bug。

**TypeScript 中的 typeof 类型守卫**

在 TypeScript 中，typeof 不仅可以用在运行时代码中判断变量类型，还可以用作类型守卫。当用在类型守卫上时，typeof 会被 TypeScript 的类型检查器识别，并在编译时进行类型收窄。

在这个上下文中，typeof 可以识别两种形式：一种是在 if 语句中作为类型断言使用，另一种是在类型别名或其他类型注解中使用。

从上面的例子看起来好像，但是放到下面这个例子就不一样了

```
const person = { name: 'Nealyang', age: '18' };
type Kevin = typeof person;

// type Kevin = {
//   name: string;
//   age: string;
// }

function identity<Type>(arg: Type): Type {
  return arg;
}

type result = typeof identity;
// type result = <Type>(arg: Type) => Type
```

#### **instanceof 类型守卫**

instanceof 操作符用于类的实例，它检查一个实例是否属于某个类。

```
class Bird {
  fly() {
    console.log('Flying');
  }
}

class Fish {
  swim() {
    console.log('Swimming');
  }
}

function move(pet: Bird | Fish) {
  // instanceof 类型守卫
  if (pet instanceof Bird) {
    pet.fly();
  } else if (pet instanceof Fish) {
    pet.swim();
  }
}

const myBird = new Bird();
const myFish = new Fish();
move(myBird);
move(myFish);
```

#### **in 类型守卫**

使用 in 操作符可以检查一个对象是否拥有某个特定的属性。

```
function move(pet: Bird | Fish) {
  // in 类型守卫
  if ('fly' in pet) {
    pet.fly();
  } else {
    pet.swim();
  }
}
```

#### **自定义类型守卫**

自定义类型守卫通常是通过定义一个函数来实现，这个函数返回一个类型谓词，形式为`parameterName is Type`。

假设有这么一个字段，它可能字符串也可能是数字：

```
type numOrStrProp = number | string;
const isString = (arg: unknown): boolean => typeof arg === 'string';
function useIt(numOrStr: number | string) {
  if (isString(numOrStr)) {
    console.log(numOrStr.length);
  }
}
```

看着没有任何问题的代码，但是 Ts 并不能准确推断出正确类型。

![medium-zoom](/assets/excellentArticle/2024-04-24/640-1713929828533-2.webp)

这个时候就该使用 `is` 关键字了：

```
export const isString = (arg: unknown): arg is string =>
  typeof arg === 'string';
```

这只是以原始类型为成员的联合类型，我们完全可以扩展到各种场景上，先看一个简单的假值判断：

```
export type Falsy = false | '' | 0 | null | undefined;

export const isFalsy = (val: unknown): val is Falsy => !val;
```

#### **字面量类型守卫**

字面量类型是 TypeScript 中一种特殊的子类型，可以用来确保变量的值与特定的字符串或数字字面量相匹配。

```
type Action = { type: 'INCREMENT' } | { type: 'DECREMENT' };

function performAction(action: Action) {
  // 字面量类型守卫
  switch (action.type) {
    case 'INCREMENT':
      // 做一些递增的操作
      break;
    case 'DECREMENT':
      // 做一些递减的操作
      break;
  }
}
```

#### **类型守卫使用场景**

类型守卫在处理联合类型（union types）或者更复杂的类型组合时尤其有用。在实际应用中，类型守卫经常出现在以下场景：

- 在函数中处理不同类型的参数；
- 在运行时检查某个对象是否符合接口或类的实例；
- 在 Redux 或类似状态管理库中处理不同类型的 action；
- 在处理 JSON 数据或第三方 API 的响应时确保类型安全。
- 类型守卫的使用可以大大增加代码的可读性和稳定性，它允许开发者撰写出既灵活又安全的类型逻辑，确保在编译时和运行时都不会遇到意外的类型错误。

### **keyof**

> ❝
>
> keyof 和索引类型是捆绑的一般，为了区分开，所以这里分开介绍，但是结合一起看，会更加清晰。

对一个对象类型使用 keyof 操作符，跟 JavaScript 中的 Object.keys() 类似，区别就是 keyof 会返回该对象属性名组成的一个字符串或者数字字面量的联合。

```
type Person = {
  name: string;
  age: number;
};
type Keys = keyof Person;
// type Keys = "name" | "age"
```

keyof 关键字非常有用，因为它允许你基于对象类型的属性名来创建类型，这在处理对象和属性时提供了很高的类型安全性。

```
function getProperty<T, K extends keyof T>(obj: T, key: K) {
  return obj[key]; // 安全地返回 obj 中 key 的属性值
}

const person: Person = {
  name: 'Alice',
  age: 25,
};

const name = getProperty(person, 'name'); // 正确
const age = getProperty(person, 'age'); // 正确
// const unknown = getProperty(person, "unknown"); // 错误：类型 '"unknown"' 不能赋值给类型 '"name" | "age"'
```

但如果这个类型有一个 string 或者 number 类型的索引签名，keyof 则会直接返回这些类型：

```
type Arrayish = { [n: number]: unknown };
type A = keyof Arrayish;
// type A = number

type Mapish = { [k: string]: boolean };
type M = keyof Mapish;
// type M = string | number
```

注意在这个例子中，M 是 string | number，这是因为 JavaScript 对象的属性名会被强制转为一个字符串，所以 obj[0] 和 obj["0"] 是一样的。

简单可以理解为 string 可以包含 number，但是 number 不能转 string。

## **类型编程进阶**

### **索引类型**

索引类型（Index Types）在 TypeScript 中是用来描述那些能够通过索引获取值的类型，如数组和特定结构的对象。

索引类型通常和一下两个高级特性密切相关：

#### **索引类型查询（keyof）**

索引类型查询使用 keyof 关键字来获取一个类型的所有属性键组成的联合类型。例如：

```
interface Person {
  name: string;
  age: number;
}

type PersonKeys = keyof Person; // 'name' | 'age'
// 代码上面上面在 keyof 部分已经介绍过
```

#### **索引访问类型（Indexed Access Types）**

索引访问类型，也称作查找类型（Lookup Types），使用 Type[KeyType] 的语法来获取一个类型的子类型。例如：

```
type Age = Person['age']; // number
```

#### **索引签名（Index Signatures）**

索引签名用于描述那些索引签名未知但类型已知的对象。它们允许你定义对象的索引类型和对应的返回值类型。有两种索引签名：字符串索引签名和数字索引签名。

```
interface StringDictionary {
  [index: string]: string | number;
}

interface NumberDictionary {
  [index: number]: string;
}

const strDict: StringDictionary = {};
strDict['a'] = 'foo'; // Ok
strDict['b'] = 42; // Ok

const numDict: NumberDictionary = {};
numDict[0] = 'bar'; // Ok
// numDict[1] = 100;  // Error, Type 'number' is not assignable to type 'string'.
```

### **映射类型**

映射类型（Mapped Types）是一种泛型类型，它能够根据旧的类型创建新的类型——它“映射”过一个已有的类型的属性，生成另一个类型。

映射类型通常与索引签名的语法结合使用，允许你指定一个属性键的集合并为这些键指定值的类型。基本的映射类型看起来像这样：

```
type Keys = 'option1' | 'option2';
type Flags = { [K in Keys]: boolean };
```

![medium-zoom](/assets/excellentArticle/2024-04-24/640-1713929828533-3.webp)Keys 是包含 'option1' 和 'option2' 的联合类型。Flags 是一个映射类型，它创建了一个新的类型，该类型有两个属性：option1 和 option2，它们的值类型都是 boolean。

映射类型的基本语法也就是这样：`{ [P in K]: T }`

- P 是我们要遍历的属性名。
- K 是属性名的集合，通常是字符串字面量的联合类型或 string/number/symbol 类型的子类型。
- T 是属性的类型。

所以他天然适合跟索引类型一起使用：

```
interface Person {
  name: string;
  age: number;
}

// Readonly 映射类型，使所有属性变为只读
type ReadonlyPerson = { readonly [P in keyof Person]: Person[P] };

// Partial 映射类型，使所有属性变为可选
type PartialPerson = { [P in keyof Person]?: Person[P] };

// Record 映射类型，创建一个对象类型，其属性键来自 K，属性值类型为 T
type ThreeStringProps = Record<'prop1' | 'prop2' | 'prop3', string>;
```

> ❝
>
> 如上例子记住核心字段：`in`、`keyof`，在 TypeScript 类型编程中，非常普遍。

#### **映射修饰符**

映射类型还支持以下修饰符：

- readonly —— 使属性变为只读。
- ? —— 使属性变为可选。
- -readonly —— 移除只读属性。
- -? —— 移除可选属性。

后买那我们实现 TypeScript 内置的工具类型的时候会使用到。

### **条件类型**

条件类型让类型具有了判断的能力，它们在类型系统中引入了一种选择机制，允许根据条件定义类型。

条件类型跟 JavaScript 中的三元表达式近乎一样，我们也可以理解为这是 TypeScript 类型编程中的 ifElse

```
T extends U ? X : Y
```

这里的 T 是一个类型变量，U 是一个检查类型（你可以理解成，如果成如果 T 类型可以赋值给 U），X 和 Y 是两种可能的类型。如果 T 扩展或等于 U，则条件类型的结果是 X，否则是 Y。

举个栗子：

```
type IsString<T> = T extends string ? 'yes' : 'no';
```

在这个例子中，IsString 是一个条件类型，它检查 T 是否可被赋值给 string。如果可以，它的结果类型将是字面量类型 "yes"，否则是 "no"。

```
type T1 = IsString<string>; // "yes"
type T2 = IsString<number>; // "no"
```

#### **infer 关键字**

infer 关键字是在条件类型中使用的，它允许你在条件的真分支中声明一个类型变量，然后可以在该分支中使用这个类型。说白了就是做变量类型提取的。

**从函数类型中提取返回类型**

```
type ReturnType<T> = T extends (...args: any[]) => infer R ? R : never;
```

在这个 ReturnType 类型定义中，T 是一个泛型参数，它被期望是一个函数类型。这个条件类型检查 T 是否可以赋值给 (...args: any[]) => infer R 这样的函数类型。如果可以，TypeScript 将会推断这个函数的返回类型，并将其捕获到 R 中。然后 ReturnType就会被解析为 R，否则解析为 any。

**从 Promise 中提取解决的类型**

```
type UnpackPromise<T> = T extends Promise<infer U> ? U : T;
```

**从数组类型中提取元素类型**

```
type ElementType<T> = T extends (infer U)[] ? U : T;
```

在这个例子中，ElementType 类型检查 T 是否是一个数组类型。如果是，它使用 infer U 来捕获数组的元素类型，然后将 ElementType解析为该元素类型。如果 T 不是数组类型，那么结果类型就是 T 自己。

#### **分布式条件类型**

在泛型上下文中，条件类型被认为是“分布式”的，当 T 是一个联合类型时，条件类型会被应用于联合类型中的每一个成员，并最后组合成一个联合类型。

```
type ToArray<T> = T extends any ? T[] : never;
type StrOrNumArray = ToArray<string | number>;
// type StrOrNumArray = string[] | number[]
```

这里，ToArray 条件类型检查 T 是否可被赋值给 any，这个总是为真，所以它将 T 转换为一个数组 T[]。对于 StrOrNumArray，由于 T 是 string | number，ToArray 类型将分别应用于 string 和 number，结果是 string[] | number[]。

条件类型在 TypeScript 的类型定义中**非常有用**，尤其是在创建通用的工具类型或者处理库的类型定义时。例如，TypeScript 标准库中就包含了很多内置的条件类型，如 `Exclude`, `Extract`, `ReturnType`, `InstanceType` 等。

条件类型可以用于创建复杂的类型推断，类型转换，以及根据输入类型动态选择输出类型的类型。这也是 TypeScript 类型编程中非常核心的功能之一。

### **模板字面量类型**

模板字面量类型（Template Literal Types）是 TypeScript4.1 引入的新的类型。说白了是一种字符串类型的补充，可以构造出几乎无限多的字符串类型，这使得你能够更精确地描述字符串的形状和模式。

模板字面量类型使用反引号（`）来定义，就像 JavaScript 中的模板字符串一样。类型中可以包含字符串文字部分和插值部分，插值部分通过 ${} 包裹一个类型。

```
type World = 'world';
type Greeting = `hello ${World}`;
```

在这个例子中，Greeting 的类型是 "hello world" 这个具体的字符串。![medium-zoom](/assets/excellentArticle/2024-04-24/640-1713929828533-4.webp)

客官稍安勿躁。。我还有花活。。。

```
type EmailLocaleIDs = `welcome_email_${'en' | 'es' | 'fr'}`;
type FooterLocaleIDs = `footer_${'en' | 'es' | 'fr'}`;
```

在这里，EmailLocaleIDs 类型能够表示 "welcome_email_en"、"welcome_email_es" 或 "welcome_email_fr" 中的任何一个。FooterLocaleIDs 也类似。

**分布式字符串类型有木有！**

```
type LocaleMessageIDs = `${'welcome_email' | 'footer'}_${'en' | 'es' | 'fr'}`;
// LocaleMessageIDs 类型会包含每种可能的组合，如 "welcome_email_en"、"footer_fr" 等。
```

#### **映射类型与模板字面量类型**

模板字面量类型可以与映射类型相结合，以便在对象键或其他映射类型上构造复杂的类型。

```
type PropEventSource<Type> = {
  on(
    eventName: `${string & keyof Type}Changed`,
    callback: (newValue: any) => void
  ): void;
};

declare function makeWatchedObject<T>(obj: T): T & PropEventSource<T>;

const person = makeWatchedObject({
  firstName: 'Homer',
  age: 42,
  location: 'Springfield',
});

// 使用它
person.on('firstNameChanged', (newName) => {
  console.log(`new name is ${newName.toUpperCase()}`);
});

person.on('ageChanged', (newAge) => {
  if (newAge < 0) {
    console.log('warning! negative age');
  }
});
```

在这个例子中，PropEventSource 类型使用模板字面量类型创建了一个监听事件的类型，其事件名是基于对象的键和字符串 'Changed' 的组合。

可以见得，并非“就这”，还很强大，模板字符串使得类型定义可以精确到模板字符串的级别。这对于需要强类型约束的字符串模式，如类、样式名、路由路径等场景非常有帮助，并且在构建类型安全的 API 时它们也发挥着重要作用。

## **内置类型编程实现**

> ❝
>
> 很多内置的类型工具我们在上面都举例过了，这里也罗列（常用的）出来做个汇总

### **Partial**

将类型 T 的所有属性变为可选（optional）。

```
type Partial<T> = {
  [P in keyof T]?: T[P];
};
```

### **Required**

将类型 T 的所有属性变为必需的（non-optional）。

```
type Required<T> = {
  [P in keyof T]-?: T[P];
};
```

### **Readonly**

将类型 T 的所有属性设置为只读，这样就无法修改这些属性。

```
type Readonly<T> = {
  readonly [P in keyof T]: T[P];
};
```

### **Record<K, T>**

创建一个类型，其属性键为 K，属性值为 T。

```
type Record<K extends keyof any, T> = {
  [P in K]: T;
};
```

### **Pick<T, K>**

从类型 T 中选取一组属性 K（K 必须是 T 的属性）来构造类型。

```
type Pick<T, K extends keyof T> = {
  [P in K]: T[P];
};
```

### **Exclude<T, U>**

从类型 T 中排除那些可以赋值给 U 的类型。

```
type Exclude<T, U> = T extends U ? never : T;
```

### **Omit<T, K>**

从类型 T 中排除一组属性 K 后的类型。

```
type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;
```

### **Extract<T, U>**

从类型 T 中提取那些可以赋值给 U 的类型

```
type Extract<T, U> = T extends U ? T : never;
```

### **NonNullable**

从类型 T 中排除 null 和 undefined。

```
type NonNullable<T> = T extends null | undefined ? never : T;
```

### **ReturnType**

获取函数类型 T 的返回类型。

```
type ReturnType<T> = T extends (...args: any[]) => infer R ? R : any;
```

### **InstanceType**

获取构造函数类型 T 的实例类型。

```
type InstanceType<T> = T extends new (...args: any[]) => infer R ? R : any;
```

### **Parameters**

获取函数类型 T 的参数类型作为一个元组。

```
type Parameters<T> = T extends (...args: infer P) => any ? P : any;
```

### **ConstructorParameters**

获取构造函数类型 T 的参数类型作为一个元组。

```
type ConstructorParameters<T> = T extends new (...args: infer P) => any
  ? P
  : any;
```

## **类型编程的实际应用**

### **自定义 render**

需求：编写一个 render 方法，传入一个组件，以及该组件对应的 Props，需要约束传入的组件必须带有 ref 或者制定一个 dom 节点（属性约束）

```
const CUS_DOM_OPT_PANEL_ID = '__@custom_dom_opt_panel_id__';

interface WithRef {
  domRef: RefObject<HTMLElement>;
}

interface WithDom {
  targetNode: HTMLElement;
}

type TExtends = WithRef | WithDom;

function customRender<P extends TExtends>(Comp: Rax.FC<P>, props: P, cusWrapId?: string) {
  let parentDiv: HTMLDivElement = getElementById(cusWrapId || CUS_DOM_OPT_PANEL_ID);
  if (parentDiv) {
    parentDiv.remove();
  }
  parentDiv = document.createElement('div');
  parentDiv.style.position = 'absolute';
  parentDiv.setAttribute('id', CUS_DOM_OPT_PANEL_ID);
  document.body.appendChild(parentDiv);
  // @ts-ignore
  render(<Comp {...props} />, parentDiv, { driver: DriverUniversal });
}
```

### **自定义类型**

本案例来自神光的《TypeScript 类型体操通关秘籍》小册

![medium-zoom](/assets/excellentArticle/2024-04-24/640-1713929828533-5.webp)

需求非常简单，首先我们不可能枚举出每一列的情况，就是求对象中只有一个字段可以是 'desc' | 'asc'，其他字段都必须是 false。

神光在小册中给出的解决方案非常的不错，感兴趣的可以去看看，这里我们换个思路

```
type SortOrder = "desc" | "asc";
type MyTableSort = "a" | "b" | "c";
```

首先定义出来我们要的一些字段

```
type ExclusiveSort<T extends string, K extends T> = {
  [P in T]: P extends K ? SortOrder : false;
};
```

ExclusiveSort 是一个映射类型，它用于创建一个对象类型，其中只有一个属性（K）可以被设置为 SortOrder 类型（"desc" 或 "asc"），而所有其他属性都必须是 false。这里的 T extends string 约束表明 T 必须是基于字符串的类型，具体为 MyTableSort 联合类型。K extends T 表示 K 是 T 联合类型中的一个成员。在映射类型的定义中，[P in T] 部分是一个类型变量 P 遍历 T 联合类型中的每一个成员。对于每个成员，我们使用了一个条件类型 P extends K ? SortOrder : false。这里的含义是，如果 P 等于当前的 K（即 P 正在被遍历为当前可排序的属性），则该属性的类型是 SortOrder；否则，属性的类型必须是 false。

```
type Sortable<T extends string> = {
  [K in T]: ExclusiveSort<T, K>;
}[T];
```

在映射类型 [K in T]: ExclusiveSort<T, K> 中，我们对于 T 类型的每个字段 K，都创建了一个 ExclusiveSort<T, K> 类型。这意味着对于 T 中的每个字段，我们都会有一个对象类型，其中该字段是 SortOrder 类型，其他字段都是 false。

然后，通过在这个映射类型后面加上 [T]，我们得到一个从映射类型中提取所有成员类型并组成一个联合类型的操作。这个联合类型表示所有可能的排序状态组合。

```
type ValidSort = Sortable<MyTableSort>;

let validSortA: ValidSort = { a: 'asc', b: false, c: false }; // OK
let validSortB: ValidSort = { a: false, b: 'desc', c: false }; // OK
```

至此就完成了上面的需要的类型约束。

> ❝
>
> 解法不止一种个，小册中的写法

```
type GenerateType<Keys extends string> = {
    [Key in Keys]: {
        [Key2 in Key]: 'desc' | 'asc'
    } & {
        [Key3 in Exclude<Keys, Key>]: false
    }
}[Keys]
```

## **type-challenges**

类型变成其实也需要一种变成思维的养成，甚至比我们常规的编码更加抽象一些。但是其大致章法也就这些，所以如上你掌握了基础知识，可以参与下github 上的type-challenges 挑战，实操几道题后，你就掌握了类型编程的大致思路。基本上medium 级别的的就已经能应对 99.9%日常需求了~

## **参考文档**

- TypeScript 的另一面：类型编程
- 冴羽 Ts 网站
- 《TypeScript 类型体操通关秘籍》
- type-challenges