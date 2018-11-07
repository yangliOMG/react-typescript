import * as React from 'react';
import './Hello.css';

export interface Props {
    name: string;
    enthusiasmLevel?: number;
    onIncrement?: () => void;
    onDecrement?: () => void;
}

// function Hello({ name, enthusiasmLevel = 1, onIncrement, onDecrement }: Props) {
//     if (enthusiasmLevel <= 0) {
//         throw new Error('You could be a little more enthusiastic. :D');
//     }

//     return (
//         <div className="hello">
//             <div className="greeting">
//                 Hello {name + getExclamationMarks(enthusiasmLevel)}
//             </div>
//             <div>
//                 <button onClick={onDecrement}>-</button>
//                 <button onClick={onIncrement}>+</button>
//             </div>
//         </div>
//     );
// }
//↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑SFC--无状态函数组件↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑

// 当我们的组件实例具有某种状态或需要处理生命周期钩子时，类很有用。
// 但是，这个例子事实上并不用考虑状态，所以写SFC更好，
// 但知道如何写一个类是很重要的。

//↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓类↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓
class Hello extends React.Component<Props> {
    constructor(props: Props) {
        super(props);
    }

    render() {
        const { name, enthusiasmLevel = 1 } = this.props;

        enum Color {Red , Green , Blue }
        let c: Color = Color.Blue;

        let myAdd: (x: number, y: number, z?: number) => number =
            function(x: number, y: number, z=1): number { return z ? x + y + z : x + y; };

        let myName: (a: string, ...rest: string[]) => string = 
            function(a: string, ...rest: string[]): string { return a + rest.join("/") }

        console.log(typeof c,c);
        console.log(myAdd(1,2,3));
        console.log(myName('qwer','asdf'));


        interface Card {
            suit: string;
            card: number;
        }
        interface Deck {
            suits: string[];
            cards: number[];
            createCardPicker(this: Deck): () => Card;
        }
        let deck: Deck = {
            suits: ["hearts", "spades", "clubs", "diamonds"],
            cards: Array(52),
            // NOTE: The function now explicitly specifies that its callee must be of type Deck
            createCardPicker: function(this: Deck) {
                return () => {
                    let pickedCard = Math.floor(Math.random() * 52);
                    let pickedSuit = Math.floor(pickedCard / 13);
        
                    return {suit: this.suits[pickedSuit], card: pickedCard % 13};
                }
            }
        }
        let cardPicker = deck.createCardPicker();
        let pickedCard = cardPicker();
        console.log("card: " + pickedCard.card + " of " + pickedCard.suit);


        return (
            <div className="hello">
                <div className="greeting">
                    Hello {name + getExclamationMarks(enthusiasmLevel)}
                </div>
                <button onClick={this.props.onDecrement}>-</button>
                <button onClick={this.props.onIncrement}>+</button>
            </div>
        );
    }
}
//↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑redux的数据使用↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑
//↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓this.state的数据使用↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓
// interface State {
//     currentEnthusiasm: number;
// }

// class Hello extends React.Component<Props, State> {
//     constructor(props: Props) {
//         super(props);
//         this.state = { currentEnthusiasm: props.enthusiasmLevel || 1 };
//     }

//     onIncrement = () => this.updateEnthusiasm(this.state.currentEnthusiasm + 1);
//     onDecrement = () => this.updateEnthusiasm(this.state.currentEnthusiasm - 1);

//     render() {
//         const { name } = this.props;
//         if (this.state.currentEnthusiasm <= 0) {
//             throw new Error('You could be a little more enthusiastic. :D');
//         }

//         return (
//             <div className="hello">
//                 <div className="greeting">
//                     Hello {name + getExclamationMarks(this.state.currentEnthusiasm)}
//                 </div>
//                 <button onClick={this.onDecrement}>-</button>
//                 <button onClick={this.onIncrement}>+</button>
//             </div>
//         );
//     }

//     updateEnthusiasm(currentEnthusiasm: number) {
//         this.setState({ currentEnthusiasm });
//     }
// }
export default Hello;


function getExclamationMarks(numChars: number) {
    return Array(numChars + 1).join('!');
}