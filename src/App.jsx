import { useState, useEffect } from 'react'
import './App.css'
import Die from './components/Die'
import GameStats from './components/GameStats'
import { nanoid } from 'nanoid'
import Confetti from "react-confetti"

function App() {
	const [dice, setDice] = useState(allNewDice());
	const [tenzies, setTenzies] = useState(false);
	const [rollCount, setRollCount] = useState(0);
	const [time, setTime] = useState(0);
	const [running, setRunning] = useState(false);
	const [bestRolls, setBestRolls] = useState(
		JSON.parse(localStorage.getItem("bestRolls")) || 0
	);
	const [bestTime, setBestTime] = useState(
		JSON.parse(localStorage.getItem("bestTime")) || 0
	);

	useEffect(() => {
        const allHeld = dice.every((die) => die.isHeld);
        const firstValue = dice[0].value;
        const allSameValue = dice.every((die) => die.value === firstValue);
        if (allHeld && allSameValue) {
			setTenzies(true);
			setRunning(false);
			setRecords();
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

	useEffect(() => {
        localStorage.setItem("bestRolls", JSON.stringify(bestRolls));
        }, [bestTime]);

        useEffect(() => {
        localStorage.setItem("bestTime", JSON.stringify(bestTime));
        }, [bestTime]);

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
			setTime(0);
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

	function setRecords() {
        if (!bestRolls || rollCount < bestRolls) {
                setBestRolls(rollCount);
        }

        if (!bestTime || time < bestTime) {
			setBestTime(time);
        }
        }

        const diceElements = dice.map(die => (
        <Die 
			key={die.id} 
			value={die.value} 
			isHeld={die.isHeld} 
			holdDice={() => holdDice(die.id)}
        />
	));

	return (
        <main>
			{tenzies &&
					<Confetti
							width={window.innerWidth}
							height={window.innerHeight}
					/>}

			<h1 className="title">Tenzies</h1>
			<p className="instructions">Roll until all dice are the same. 
			Click each die to freeze it at its current value between rolls.</p>

			<div className="dice-container">
				{diceElements}
			</div>

			{tenzies && <h2 className='congrats-msg'>🎉 You Win! 🎉</h2>}
			<button className="roll-dice" onClick={rollDice}>
				{tenzies ? "🎲 New Game 🎲" : "🎲 Roll 🎲"}
			</button>
                
			<GameStats
				time={time}
				bestTime={bestTime}
				rolls={rollCount}
				bestRolls={bestRolls}
			/>
        </main>
	)
}

export default App