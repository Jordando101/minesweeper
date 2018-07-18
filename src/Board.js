import React from 'react';
import ReactDOM from 'react-dom';
import {postData} from "./sagas/backendSaga";
export default

class Board extends React.Component {
    constants = {
        isAMine : 'X',
        notAMine : ':)',
    }



    constructor(props){
        super(props);

        let size = this.props.size;
        const boardArray = this.getNewBoardArray(size, .2)
        let displayValues = this.getEmptyDisplayValues(size)

        let history = []  //Will hold history and send to Spring backend.
        //history.push(boardArray); //First entry will hold board setup. History will be populated with user moves

        this.state = {
            boardArray,
            size,
            displayValues,
            history,
        }
    }





    handleClick(i,j){
        this.state.history.push({
            row: i,
            col: j,
        })

        if(this.isAMine(i, j)){
            this.endGame();
        }
        else{
            this.revealNeighbors(i,j);
        }
    }

    endGame(){
        // debugger;
        this.revealCompleteBoard()
        let url = 'http://localhost:8080/logGame'
        let gameBoard = this.state.boardArray
        let moves = ''
        let history = this.state.history
        for(let i= 0; i < history.length; i++) {
            moves += '('+ history[i].row + ','+ history[i].col + ')'
            if(!history.length === i){
                moves += ', ';
            }
        }
        let gameId = Math.floor(Math.random()*10000000)
        let data = '{"gameBoard":"' + gameBoard +'", "moves":"' + moves +'", "gameId":"' + gameId + '"}';

        postData(url, data, {headers: {'Content-Type': 'application/json',}});

        alert("Game over! You clicked a mine! You lose! Better luck next time! If you wish to replay your game, your game ID is " + gameId);

    }


    revealNeighbors(i,j){
        if(this.isAMine(i,j) || this.indexIsOutOfBounds(i,j)){
            //If square isMine or passed values are out of array bounds
            //Do Nothing
        }
        else {
            //First update current cell
            let oldDisplay = this.state.displayValues;
            oldDisplay[i][j] = this.getNeighborCount(i, j)
            this.setState({
                displayValues: oldDisplay,
            });
            //Recursively check squares adjacent
            if(oldDisplay[i][j] === 0 ){
                for(let row = i - 1; row <= i+1; row++){
                    for(let col = j-1; col <= j+1; col++){
                        if(!this.indexIsOutOfBounds(row,col) && '' === oldDisplay[row][col])
                            this.revealNeighbors(row,col);
                    }
                }
            }
        }
    }

    indexIsOutOfBounds(i,j){
        if(i < 0 || i >= this.props.size || j < 0 || j >= this.props.size) { //Don't go out of array bounds
            return true;
        }
        else{
            return false;
        }
    }

    isAMine(i, j){
        if(this.indexIsOutOfBounds(i,j)){ return false;}
        return this.state.boardArray[i][j] === this.constants.isAMine;
    }

    revealCompleteBoard = ()=>{
        for(let i = 0 ; i < this.state.size; i++){
            for(let j = 0; j < this.state.size; j++){
                this.state.displayValues[i][j] = this.isAMine(i,j) ? this.constants.isAMine : this.getNeighborCount(i,j)
            }
        }
        this.setState({
            displayValues : this.state.displayValues
        })
    }

    //Returns number of adjacent bombs
    getNeighborCount(i,j){
        //Don't need to count
        let count = 0;
        for(let row = i - 1; row <= i+1; row++){
            for(let col = j-1; col <= j+1; col++){
                if(this.isAMine(row,col))
                    count++;
            }
        }
        return count;
    }


    getRandomInt(max) {
        return Math.floor(Math.random() * Math.floor(max));
    }

    getNewBoardArray(size, minePercent){
        const boardArray = [];
        let minesPlaced = 0;
        const minesToBePlaced = Math.max((size**2)*minePercent, 2);

        console.log(minesToBePlaced);

        for(let i = 0; i < size; i++){
            //Fill board with not mines
            boardArray.push(Array(size).fill(this.constants.notAMine));
        }
        while(minesPlaced < minesToBePlaced){
            //Place Mines
            const row = this.getRandomInt(size);
            const col = this.getRandomInt(size);
            if(boardArray[row][col] !== this.constants.isAMine){
                boardArray[row][col] = this.constants.isAMine;
                minesPlaced++;
            }
        }
        return boardArray;
    }

    getEmptyDisplayValues(size){
        let displayValues = []
        for(let i = 0; i < size; i++){
            displayValues.push([]);
            let currRow = displayValues[i];
            for(let j = 0; j< size; j++) {
                currRow.push('')
            }
        }
        return displayValues;
    }

    getSquareValue(i,j){
        return this.state.displayValues[i][j];
    }

    createNewBoard(){
        //alert('Updating sate: Old state size = ' + this.state.size +' Props size = ' + this.props.size);
        const boardArray = this.getNewBoardArray(this.props.size, .2)
        let displayValues = this.getEmptyDisplayValues(this.props.size)
        this.state.size = this.props.size;
        this.state.displayValues = displayValues
        this.state.boardArray = boardArray
    }




    render() {
        console.log('Board: Rendering Board. ShouldStartNewGame?= ' + this.props.shouldStartNewGame())
        debugger;

        if(this.state.size !== this.props.size || this.props.shouldStartNewGame()){
            //TODO: THis seems clunky....
            //TODO: ASK SUNNY: It seems tough with deprecations (componentWIllREceiveProps) to tell whether a render is caused by change to state or props...any advice?
            this.createNewBoard();
        }


        let ret =[];
        for(let i = 0; i < this.props.size; i++){
            let row = [];
            for(let j = 0; j < this.props.size; j ++){
            debugger;
                row.push(<button className='button' id={""+i+""+j}
                                 onClick={()=> this.handleClick(i,j)}>
                    {this.getSquareValue(i,j)}
                </button>)
            }
            ret.push(<tr>{row}</tr>);
        }

        return  <div>
            {ret}
            <button onClick = {this.revealCompleteBoard}>Reveal Board</button>
        </div>;
    }
}