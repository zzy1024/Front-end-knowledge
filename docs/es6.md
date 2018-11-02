# ES6知识备忘

## 1.let和const变量

let表示变量，const表示常量，常量不可变，不可变是指常量指向的地址不变

## 2.字符串替换

用··表示，字符串替换可用${name}替换，例如
```javascript
const name = 'kenan';
Console.log(`my name is ${name}`); //my name is kenan.

```

```javascript
// 1.includes：判断是否包含然后直接返回布尔值
    const str = 'hahay'
    console.log(str.includes('y')) // true

    // 2.repeat: 获取字符串重复n次
    const str = 'he'
    console.log(str.repeat(3)) // 'hehehe'
    //如果你带入小数, Math.floor(num) 来处理
    // s.repeat(3.1) 或者 s.repeat(3.9) 都当做成 s.repeat(3) 来处理

    // 3. startsWith 和 endsWith 判断是否以 给定文本 开始或者结束
    const str =  'hello world!'
    console.log(str.startsWith('hello')) // true
    console.log(str.endsWith('!')) // true
    
    // 4. padStart 和 padEnd 填充字符串，应用场景：时分秒
    setInterval(() => {
        const now = new Date()
        const hours = now.getHours().toString()
        const minutes = now.getMinutes().toString()
        const seconds = now.getSeconds().toString()
        console.log(`${hours.padStart(2, 0)}:${minutes.padStart(2, 0)}:${seconds.padStart(2, 0)}`)
    }, 1000)
```
## 3.函数

函数可用缩写的形式，变量可设置默认值

```javascript
var people = (name = 'zzy') => {
	const fullName = 'hello ' + name;
	return fullName;
}
people(); //输出hello zzy
people('torry'); //输出 hello torry
```
## 4.对象

对象可简化赋值，Es5对象提供了Object.assign()这个方法来实现浅复制
Object.assign() 可以把任意多个源对象自身可枚举的属性拷贝给目标对象，然后返回目标对象。第一参数即为目标对象。
在实际项目中，我们为了不改变源对象。一般会把目标对象传为{}

## 5.对象和数组可解构赋值例如

```javascript
var people = {
	name: 'kenan',
	age: 20
};
const {name, age} = people;
console.log(`${name} ---- ${age}`);

```
## 6.展开运算符

三个点...就是展开运算符，组装对象或数组

```javascript
//数组
    const color = ['red', 'yellow']
    const colorful = [...color, 'green', 'pink']
    console.log(colorful) //[red, yellow, green, pink]
```

有时候我们想获取数组或者对象除了前几项或者除了某几项的其他项

```javascript
//数组
    const number = [1,2,3,4,5]
    const [first, ...rest] = number
    console.log(rest) //2,3,4,5
    //对象
    const user = {
        username: 'lux',
        gender: 'female',
        age: 19,
        address: 'peking'
    }
    const { username, ...rest } = user
    console.log(rest); //{"address": "peking", "age": 19, "gender": "female"
}
```
对于 Object 而言，还可以用于组合成新的 Object 。(ES2017 stage-2 proposal) 当然如果有重复的属性名，右边覆盖左边

```javascript
const first = {
        a: 1,
        b: 2,
        c: 6,
    }
    const second = {
        c: 3,
        d: 4
    }
    const total = { ...first, ...second }
    console.log(total) // { a: 1, b: 2, c: 3, d: 4 }
```

## 7.class 类

类都具有constructor默认方法，如果不写程序也会自动加上
由于类的方法都定义在prototype对象上面，所以类的新方法可以添加在prototype对象上面。Object.assign方法可以很方便地一次向类添加多个方法。

```javascript
class Point {
  constructor(){
    // ...
  }
}

Object.assign(Point.prototype, {
  toString(){},
  toValue(){}
});
```
另外，类的内部所有定义的方法，都是不可枚举的（non-enumerable）。

```javascript
class Point {
  constructor(x, y) {
    // ...
  }

  toString() {
    // ...
  }
}

Object.keys(Point.prototype)
// []
Object.getOwnPropertyNames(Point.prototype)
// ["constructor","toString"]
```
### 类的继承

class类的继承通过extends关键字继承，子类中必须调用super方法，用来新建父类的this对象，否则新建实例时会报错。
这是因为子类自己的this对象，必须先通过父类的构造函数完成塑造，得到与父类同样的实例属性和方法，然后再对其进行加工，加上子类自己的实例属性和方法。如果不调用super方法，子类就得不到this对象。

```javascript
class ColorPoint extends Point {
  constructor(x, y, color) {
    super(x, y); // 调用父类的constructor(x, y)
    this.color = color;
  }

  toString() {
    return this.color + ' ' + super.toString(); // 调用父类的toString()
  }
}
```
Object.getPrototypeOf()方法可以用来从子类上获取父类。可以使用这个方法判断，一个类是否继承了另一个类。

### Mixin 模式的实现

```javascript
//Mixin 指的是多个对象合成一个新的对象，新对象具有各个组成成员的接口。它的最简单实现如下。

const a = {
  a: 'a'
};
const b = {
  b: 'b'
};
const c = {...a, ...b}; // {a: 'a', b: 'b'}
//上面代码中，c对象是a对象和b对象的合成，具有两者的接口。

//下面是一个更完备的实现，将多个类的接口“混入”（mix in）另一个类。

function mix(...mixins) {
  class Mix {}

  for (let mixin of mixins) {
    copyProperties(Mix.prototype, mixin); // 拷贝实例属性
    copyProperties(Mix.prototype, Reflect.getPrototypeOf(mixin)); // 拷贝原型属性
  }

  return Mix;
}

function copyProperties(target, source) {
  for (let key of Reflect.ownKeys(source)) {
    if ( key !== "constructor"
      && key !== "prototype"
      && key !== "name"
    ) {
      let desc = Object.getOwnPropertyDescriptor(source, key);
      Object.defineProperty(target, key, desc);
    }
  }
}
//上面代码的mix函数，可以将多个对象合成为一个类。使用的时候，只要继承这个类即可。

class DistributedEdit extends mix(Loggable, Serializable) {
  // ...
}
```
## 8.promise
promise可以获取异步操作的消息，有三种状态pending（进行中）、fulfilled（已成功）和rejected（已失败）。
下面时一个Promise实现ajax的例子：

```javascript
const getJson = function(url){
  const promise = new Promise(function(resolve, reject){
      const handler = function(){
          if(this.readyState !== 4){
              return;
          }
          if(this.status === 200){
              resolve(this.response);
          }else{
              reject(new Error(this.statusText))
          }
        }
      const client = new XMLHttpRequest();
      client.open("GET", url);
      client.onreadystatechange = handler;
      client.responseType = "json";
      client.setRequestHeader("Accept", "application/json");
      client.send();
  });
  return promise;
};

getJson("/posts.json").then(function(json) {
  console.log('Contents: ' + json);
}, function(error) {
  console.error('出错了', error);
});
```





