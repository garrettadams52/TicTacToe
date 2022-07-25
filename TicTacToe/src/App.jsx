import { useState, useEffect } from 'react'
import reactLogo from './assets/react.svg'
import './App.css'
import Cell from './components/Cell'


function App() {
  const WIDTH = 3
  const GAME_START = 0
  const PLAYER_ONE = 1
  const PLAYER_TWO = 2
  const GAME_END = 3
  
  const [gameState, setGameState] = useState(PLAYER_ONE)
  
  useEffect(()=>{

  },[])

  function handleClick(){
    const state = gameState === PLAYER_ONE ? PLAYER_TWO : PLAYER_ONE
    setGameState(state)
  }

  function getGameState(){
    return gameState
  }

  function createCell(i){
    return (
      <div key={i} className='col-4'>
        <Cell getGameState={getGameState} clickFunction={handleClick} ind={i+1}/>
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

  return (
    <div className="App row">
      {createBoard()}
    </div>
  )
}

export default App
