import React from "react";
import "./Navbar.css";

const Navbar = props => (
    <nav>
        <ul>
            <li className="brand animated lightSpeedIn">
                <a href="/clicky-game/">{props.title}</a>
            </li>

            <li id="rw">{props.rightWrong}</li>

            <li id="cur-sco">Current Score: {props.currentScore}</li>

            <li id="top-sco">High Score: {props.highScore}</li>
        </ul>
    </nav>
);

export default Navbar;