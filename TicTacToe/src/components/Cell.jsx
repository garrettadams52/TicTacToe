import {useState} from 'react'

function Cell(props){
    const [cellStatus, setCellStatus] = useState('')

    function updateStatus(){
        if(cellStatus!=''){
            return alert("Invalid Move")
        }
        const gameState = props.getGameState()
        props.clickFunction()
        return setCellStatus(gameState)
    }

    return(
        <div>
            <button onClick={updateStatus}>State: {cellStatus}</button>
        </div>
    )

}

export default Cell