# Front-end-knowledge
前端知识备忘录


## 技巧

### 获取随机颜色值：

```javascript
function getRandomColor() { 
  let rgb = [] 
  for (let i = 0; i < 3; ++i) { 
	  let color = Math.floor(Math.random() * 256).toString(16) 
	  color = color.length === 1 ? '0' + color : color 
	  rgb.push(color) 
  } 
  return '#' + rgb.join('') 
}
```

