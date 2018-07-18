import React from 'react';
import {getData, postData} from './sagas/backendSaga'
export default

class ReplayGame extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            searchBoxTextValue : "Enter GameID",
            gameId : '123'
        }
    }

    handleSearchClick = () =>{
         let retrievedGame = getData('http://localhost:8080/logGame/' + this.state.gameId);
         this.setState({
             retrievedGame
         })
        this.displayOldGame;
    }

    displayOldGame = () => {
        //Show the old Game, maybe in a new tab?
        alert
    }

    handleChange= (e) =>{
        this.setState({
            searchBoxTextValue : e.target.value,
            gameId: e.target.value,
        })
    }

    render(){
        return <div>
            <input  onChange={this.handleChange}  value = {this.state.searchBoxTextValue} type="text"/>
            <button onClick={this.handleSearchClick}>Search</button>
        </div>
    }
}


