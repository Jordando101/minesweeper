import React from 'react';
import ReactDOM from 'react-dom';
export default


class NewGameOptions extends React.Component{
    constructor(props){
        super(props)
        console.log("I was constructed")
        this.state = {
            size: props.size
        };
    }

    handleChange = (e) =>{
        this.setState({
            size : e.target.value,
        })
    };

    handleClick= ()=> {
        let input = this.state.size;
        //alert('New Game Button Pressed: '+ input);

        if(parseInt(input) && parseInt(input) >= 2 && parseInt(input) <= 50){
            let size = parseInt(input);
            this.props.startNewGame(size);
        }
        else{
            alert('Please enter a valid board size!! (Must be an integer greater than 2)')
        }
    }


    render(){
        console.log('rendering NewgameOptions')

        return (<div>
            <input  onChange={this.handleChange} type="text"/>
            <button onClick ={this.handleClick}>New Game</button>
        </div>)
    }
}



