import { useState, useEffect } from 'react'
import reactLogo from './assets/react.svg'
import './App.css'
import Cell from './components/Cell'


function App() {
  const WIDTH = 3
  const PLAYER_ONE = 1
  const PLAYER_TWO = 2
  const GAME_END = 3
  
  const [gameState, setGameState] = useState(PLAYER_ONE)
  const [activeBoard, setActiveBoard] = useState(initializeBoard())
  const [gameWinner, setGameWinner] = useState(0)
  
  useEffect(()=>{
    checkRow()
    checkCol()
    checkDiag()
    checkTie()
  },[activeBoard])

  function checkRow(){
    for(let i =0;i<7;i++){
      if(i==0 || i==3 || i==6){
        let valTwo = activeBoard[i+1]['status']
        let valOne = activeBoard[i]['status']
        let valThree = activeBoard[i+2]['status']

        if(valTwo == valOne && valThree == valOne && valOne!='Empty'){
          handleGameWinner(valOne)
          return console.log(`Player ${valOne} has won the game`)
        }
      }
    }
  }

  function checkCol(){
    for(let i =0;i<3;i++){
      if(i==0 || i==1 || i==2){
        let valOne = activeBoard[i]['status']
        let valTwo = activeBoard[i+WIDTH]['status']
        let valThree = activeBoard[i+WIDTH+WIDTH]['status']

        if(valTwo == valOne && valThree == valOne && valOne!='Empty'){
          handleGameWinner(valOne)
          return console.log(`Player ${valOne} has won the game`)
        }
      }
    }
  }

  function checkDiag(){
    for(let i =0;i<8;i++){
      if(i==0 || i==2){
        let valOne = activeBoard[i]['status']
        let valTwo = activeBoard[4]['status']
        let valThree = i === 0 ? activeBoard[8]['status'] : activeBoard[6]['status']

        if(valTwo == valOne && valThree == valOne && valOne!='Empty'){
          handleGameWinner(valOne)
          return console.log(`Player ${valOne} has won the game`)
        }
      }
    }
  }

  function checkTie(){
    for(let i = 0; i<9;i++){
      if(activeBoard[i]['status'] == 'Empty'){
        return 
      }
    }
    handleGameWinner(0)
  }

  function initializeBoard() {
    return new Array(9).fill({}).map(() => {
      return { 
        status: 'Empty' 
      }
    })
  }

  function updateBoard(cellId){
    let updatedboard = activeBoard.map((cell,index)=>{
      if(cellId==index){
        return {status: gameState}
      }
      else{
        return cell
      }
    })
    setActiveBoard(updatedboard)
  }

  function handleClick(cellId){
    updateBoard(cellId)
    const state = gameState === PLAYER_ONE ? PLAYER_TWO : PLAYER_ONE
    setGameState(state)
  }

  function getGameState(){
    return gameState
  }

  function createCell(i){
    return (
      <div key={i} className='col-4'>
        <Cell getGameState={getGameState} clickFunction={handleClick} ind={i}/>
      </div>
      )
  }

  function createBoard(){
    let boardArr =[];
    for(let i = 0; i<WIDTH*WIDTH;i++){
      boardArr.push(createCell(i))
    }
    return boardArr
  }

  function handleGameDisplay(){
    
    if(gameState>PLAYER_TWO){
      let winner = gameWinner === 0 ? "It's a Tie" : `Player ${gameWinner == 1 ? 'X' : 'O'} Won.`
      return(
        <div>
          <h1>Game Over. {winner}</h1>
          <button onClick={gameReset}>Play Again</button>
        </div>
      )
    }
    const currPlayer = gameState === 1 ? 'X' : 'O'
    return(
      <div className='row'>
        <h1>Player {currPlayer}'s Turn</h1>
        {createBoard()}
    </div>
    )

  }

  function handleGameWinner(winner){
    setGameWinner(winner)
    setGameState(GAME_END)
  }

  function gameReset(){
    setGameState(PLAYER_ONE)
    setGameWinner(0)
    setActiveBoard(initializeBoard())
  }

  return (
    <div className="App">
      {handleGameDisplay()}
    </div>
  )
}

export default App
