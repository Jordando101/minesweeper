import React from 'react';
import ReactDOM from 'react-dom';
import Board from './Board'
import NewGameOptions from './NewGameOptions'
import {getData, postData} from './sagas/backendSaga'
import ReplayGame from './ReplayGame'
export default

class Game extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            size : this.props.size,
        }
    }

    static defaultProps={
        size: 5,
    }

    startNewGame=(newGameSize)=> {
        this.setState({
            size : newGameSize,
            shouldSetupNewBoard : true,
        });
    }

    showState = () => {
        alert('Show State Called: size=' + this.state.size)
    }

    //Callback for board to check if it needs to start a new game
    boardShouldStartNewGame = () =>{
        return this.state.shouldSetupNewBoard;
    }

    componentDidUpdate(){
        console.log('Game: setting shouldSetupNewBoard to false. Was previously: ' + this.state.shouldSetupNewBoard)
        this.state.shouldSetupNewBoard = false;
        console.log('Game: shouldSetupNewBoard now equals ' + this.state.shouldSetupNewBoard)
    }

    render(){
        console.log('rendering Game with size = ' + this.state.size +' and shouldSetupNewBoard = '+ this.state.shouldSetupNewBoard)
        let componentsToRender = <div>
                                    <Board size={this.state.size} shouldStartNewGame={this.boardShouldStartNewGame}></Board>
                                    <NewGameOptions startNewGame={this.startNewGame}/>
                                    {/*<button onClick = {this.showState}>Show State</button>*/}
                                    {/*<button onClick={() => getData('http://localhost:8080/logGame/123')}>SendGetRequest</button>*/}
                                    {/*<button onClick={() => postData('http://localhost:8080/logGame', '{"gameBoard": "Just a string", "moves":"moves string", "gameId":"123456"}')}>SendPostRequest</button>*/}
                                    <ReplayGame></ReplayGame>
                                </div>
        return(componentsToRender)

    }

}
