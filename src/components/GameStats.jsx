import React from 'react'

export default function GameStats(props) {
    // Time variables for current time
    const minutes = ("0" + Math.floor((props.time / 60000) % 60)).slice(-2);
    const seconds = ("0" + Math.floor((props.time / 1000) % 60)).slice(-2);
    const milliseconds = ("0" + ((props.time / 10) % 100)).slice(-2);

    // Time variables for the best props.time
    const bestMinutes = ("0" + Math.floor((props.bestTime / 60000) % 60)).slice(-2);
    const bestSeconds = ("0" + Math.floor((props.bestTime / 1000) % 60)).slice(-2);
    const bestMilliseconds = ("0" + ((props.bestTime / 10) % 100)).slice(-2);

    return (
        <ul className='game-stats'>
            <li>
                <p>🎲 Dice rolls:</p>
                <span>{props.rolls}</span>
            </li>
            <li>
                <p>⏲ Time elapsed:</p>
                <span>{minutes}:{seconds}:{milliseconds}</span>
            </li>
            <li>
                <p>🎲 Best Rolls:</p>
                <span>{props.bestRolls}</span>
            </li>
            <li>
                <p>⏲ Best Time:</p>
                <span>{bestMinutes}:{bestSeconds}:{bestMilliseconds}</span>
            </li>
        </ul>
    )
}