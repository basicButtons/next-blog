# ts学习

any unknown 的区别

any不会进行类型检测，但是unknown会进行类型检测

```typescript
let hd:any = "houdunren.com"
let a:string = hd

let xj : unknown = "houdunren"
let b:string = xj as string

console.log(b)

let hd:string = "99"
let a: number = hd as unknown as number
// 这个地方unknown当作一个中间层
```

void和never的区别

void 可以为 null undefined 多用于函数返回值

// 默认情况下  null 和 undefined 是任何类型的子类型，但是可以通过tsconfig文件来设置。strictNullCheck

但是 never 是什么都没有，比如抛出异常。



as const 转换类类型为值类型

! 非空断言



