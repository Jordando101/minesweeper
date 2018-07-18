import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import NewGameOptions from './NewGameOptions'
import Board from './Board'
import Game from './Game'
import ReplayGame from "./ReplayGame";

//Component that handles all things related to the board
//TODO: Button sizes need to not change
//TODO: Allow users to drop flags on bombs

ReactDOM.render(<Game/> , document.getElementById('root'));




registerServiceWorker();


