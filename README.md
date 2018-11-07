# TypeScript是JavaScript的超集，所以你不需要通过一个大的重写来迁移到它。你可以慢慢地做，一次一个模块。

# 类型化签名肯定比未类型化的签名长，但是并不是混乱的。
它们是提高代码的可理解性的重要文档。我们可以更深入地理解代码，而不必深入到实现或读取文档中。
我的个人经验是，我可以更快地阅读类型化代码，因为类型提供了更多的上下文来理解代码。

对比
```
jQuery.ajax(url,settings)
```
```
ajax(url: string, setting?:JQueryAjaxSettings):JQueryXHR

interface JQueryAjaxSettings{
    async?: boolean;
    cache?: boolean;
    contentType?: any;
    headers?:{[key:string]:any;};
}

interface JQueryXHR{
    responseJSON:any;
}
```

# TypeScript的设计目的应该是解决JavaScript的“痛点”：弱类型和没有命名空间，导致很难模块化，不适合开发大型程序。另外它还提供了一些语法糖来帮助大家更方便地实践面向对象的编程。

# registerServiceWorker是干什么的？
> 主要是用于在生产环境中为用户在本地创建一个service worker 来缓存资源到本地，提升应用的访问速度，具体看下面这段注释。

#箭头函数           
> 箭头函数能保存函数创建时的 this值，而不是调用时的值
```
let deck = {
    suits: ["hearts", "spades", "clubs", "diamonds"],
    cards: Array(52),
    createCardPicker: function() {
        return function() {                                          //    function()   换为    () => 
            let pickedCard = Math.floor(Math.random() * 52);
            let pickedSuit = Math.floor(pickedCard / 13);

            return {suit: this.suits[pickedSuit], card: pickedCard % 13};
        }
    }
}

let cardPicker = deck.createCardPicker();
let pickedCard = cardPicker();
alert("card: " + pickedCard.card + " of " + pickedCard.suit);

如果我们尝试运行这个程序，会发现它并没有弹出对话框而是报错了。
因为我们只是独立的调用了 cardPicker()。 顶级的非方法式调用会将 this视为window。 
（注意：在严格模式下， this为undefined而不是window）。
```

#typescript 重载
```
let suits = ["hearts", "spades", "clubs", "diamonds"];

function pickCard(x: {suit: string; card: number; }[]): number;
function pickCard(x: number): {suit: string; card: number; };
function pickCard(x): any {
    if (typeof x == "object") {
        let pickedCard = Math.floor(Math.random() * x.length);
        return pickedCard;
    }
    else if (typeof x == "number") {
        let pickedSuit = Math.floor(x / 13);
        return { suit: suits[pickedSuit], card: x % 13 };
    }
}

let myDeck = [{ suit: "diamonds", card: 2 }, { suit: "spades", card: 10 }, { suit: "hearts", card: 4 }];
let pickedCard1 = myDeck[pickCard(myDeck)];
alert("card: " + pickedCard1.card + " of " + pickedCard1.suit);

let pickedCard2 = pickCard(15);
alert("card: " + pickedCard2.card + " of " + pickedCard2.suit);
```
```
重载的pickCard函数在调用的时候会进行正确的类型检查。

为了让编译器能够选择正确的检查类型，它与JavaScript里的处理流程相似。 它查找重载列表，尝试使用第一个重载定义。 如果匹配的话就使用这个。 因此，在定义重载的时候，一定要把最精确的定义放在最前面。

注意，function pickCard(x): any并不是重载列表的一部分，因此这里只有两个重载：一个是接收对象另一个接收数字。 以其它参数调用 pickCard会产生错误。
```