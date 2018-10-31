# ES6知识备忘

## 1.let和const变量

Let表示变量，const表示常量，常量不可变，不可变是指常量指向的地址不变

## 2.字符串替换

用··表示，字符串替换可用¥{name}替换，例如
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
Object.assign() 可以把任意多个源对象自身可枚举的属性拷贝给目标对象，然后返回目标对象。第一参数即为目标对象。在实际项目中，我们为了不改变源对象。一般会把目标对象传为{}