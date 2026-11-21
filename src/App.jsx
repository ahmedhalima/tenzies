import {useEffect, useRef, useState} from "react";
import './App.css'
import Die from "./components/Die.jsx";
import {nanoid} from "nanoid";
import Confetti from "react-confetti";

function App() {
    function generateAllNewDice() {
        return new Array(10).fill({})
            .map(() => ({
                value: (Math.ceil(Math.random() * 6)),
                isHeld: false,
                id: nanoid()
            }));
    }

    const [dice, setDice] = useState(() => generateAllNewDice());

    const diceElements = dice.map((item) =>
        <Die hold={() => hold(item.id)} isHeld={item.isHeld} key={item.id} value={item.value}/>
    );

    const btnRef = useRef(null);



    const allHeld = dice.every((item) => item.isHeld === true);
    const allSameValue = new Set(dice.map(item => item.value)).size === 1;
    let gameWon = allHeld && allSameValue;

    useEffect(function () {
        if (gameWon) {
            btnRef.current.focus();
        }
    }, [gameWon]);


    function rollDice() {
        if (gameWon) {
            setDice(generateAllNewDice());
            return;
        }
        const newDice = dice.map((item) => {
            return item.isHeld ? item : {...item, value: (Math.ceil(Math.random() * 6))}
        });
        setDice(newDice);
    }

    function hold(id) {
        const newDice = dice.map((item) => {
            return item.id === id ? {...item, isHeld: !item.isHeld} : item;
        });
        setDice(newDice);
    }


    return (
        <main>
            { gameWon ? <Confetti /> : '' }
            <h1 className="title">Tenzies</h1>
            <p className="instructions">Roll until all dice are the same. Click each die to freeze it at its current
                value between rolls.</p>
            <div className="dice-container">
                {diceElements}
            </div>

            <button ref={btnRef} className="roll-dice" onClick={rollDice}>
                { gameWon ? 'New Game' : 'roll' }
            </button>
        </main>
    )
}

export default App
