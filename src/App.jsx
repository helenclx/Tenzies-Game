import { useState, useEffect } from 'react'
import './App.css'
import Die from './Die'
import { nanoid } from 'nanoid'
import Confetti from "react-confetti"

function App() {
    const [dice, setDice] = useState(allNewDice());
    const [tenzies, setTenzies] = useState(false);
    const [rollCount, setRollCount] = useState(0);
    const [time, setTime] = useState(0);
    const [running, setRunning] = useState(false);
    
    useEffect(() => {
        const allHeld = dice.every((die) => die.isHeld);
        const firstValue = dice[0].value;
        const allSameValue = dice.every((die) => die.value === firstValue);
        if (allHeld && allSameValue) {
            setTenzies(true);
            setRunning(false);
        }
    }, [dice]);

    useEffect(() => {
        let interval;
        if (running) {
            interval = setInterval(() => {
                setTime((prevTime) => prevTime + 10);
            }, 10);
        } else if (!running) {
            clearInterval(interval);
        }
        return () => clearInterval(interval);
    }, [running]);

    function generateNewDie() {
        return {
            value: Math.ceil(Math.random() * 6),
            isHeld: false,
            id: nanoid()
        };
    }
    
    function allNewDice() {
        const newDice = []
        for (let i = 0; i < 10; i++) {
            newDice.push(generateNewDie());
        }
        return newDice;
    }
    
    function rollDice() {
        if(!tenzies) {
            setRollCount((prevCount) => prevCount + 1);
            setRunning(true);

            setDice((oldDice) => oldDice.map(die => {
                return die.isHeld ? 
                    die :
                    generateNewDie();
            }));
        } else {
            setTenzies(false);
            setDice(allNewDice());
            setRollCount(0);
            setRunning(false);
        }
    }
    
    function holdDice(id) {
        setRunning(true);
        
        setDice((oldDice) => oldDice.map(die => {
            return die.id === id ? 
                {...die, isHeld: !die.isHeld} :
                die;
        }));
    }
    
    const diceElements = dice.map(die => (
        <Die 
            key={die.id} 
            value={die.value} 
            isHeld={die.isHeld} 
            holdDice={() => holdDice(die.id)}
        />
    ));

    const displayHours = ("0" + Math.floor((time / 60000) % 60)).slice(-2) + ":";
    
    return (
        <main>
            {tenzies && <Confetti />}
            <h1 className="title">Tenzies</h1>
            <p className="instructions">Roll until all dice are the same. 
            Click each die to freeze it at its current value between rolls.</p>
            <div className="dice-container">
                {diceElements}
            </div>
            <button 
                className="roll-dice" 
                onClick={rollDice}
            >
                {tenzies ? "🎲 New Game 🎲" : "🎲 Roll 🎲"}
            </button>
            <p className='game-stats'>🎲 Dice roll count: {rollCount}</p>
            <p className='game-stats'>
                ⏲ Time elapsed: {displayHours > 0 && displayHours}
                {("0" + Math.floor((time / 1000) % 60)).slice(-2)}:
                {("0" + ((time / 10) % 100)).slice(-2)}
            </p>
        </main>
    )
}

export default App
