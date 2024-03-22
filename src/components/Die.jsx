import React from 'react'

export default function Die(props) {
    const styles = {
        backgroundColor: props.isHeld ? "#59E391" : "white"
    };

    const diceOne = (
        <div className="first-face">
            <span className="pip"></span>
        </div>
    );

    const diceTwo = (
        <div className="second-face">
            <span className="pip"></span>
            <span className="pip"></span>
        </div>
    );

    const diceThree = (
        <div className="third-face">
            <span className="pip"></span>
            <span className="pip"></span>
            <span className="pip"></span>
        </div>
    );

    const diceFour = (
        <div className="fourth-face">
            <div className="column">
                <span className="pip"></span>
                <span className="pip"></span>
            </div>
            <div className="column">
                <span className="pip"></span>
                <span className="pip"></span>
            </div>
        </div>
    );

    const diceFive = (
        <div className="fifth-face">
            <div className="column">
                <span className="pip"></span>
                <span className="pip"></span>
            </div>
            <div className="column">
                <span className="pip"></span>
            </div>
            <div className="column">
                <span className="pip"></span>
                <span className="pip"></span>
            </div>
        </div>
    );

    const diceSix = (
        <div className="sixth-face">
            <div className="column">
                <span className="pip"></span>
                <span className="pip"></span>
                <span className="pip"></span>
            </div>
            <div className="column">
                <span className="pip"></span>
                <span className="pip"></span>
                <span className="pip"></span>
            </div>
        </div>
    );

    let diceFace;
    switch (props.value) {
        case 1:
            diceFace = diceOne;
            break;
        case 2:
            diceFace = diceTwo;
            break;
        case 3:
            diceFace = diceThree;
            break;
        case 4:
            diceFace = diceFour;
            break;
        case 5:
            diceFace = diceFive;
            break;
        case 6:
            diceFace = diceSix;
    }

    return (
        <button
            className="die-wrapper"
            style={styles}
            onClick={props.holdDice}
            aria-label={`Dice value of ${props.value}`}
        >
            {/* <h2 className="die-num">{props.value}</h2> */}
            {diceFace}
        </button>
    )
}