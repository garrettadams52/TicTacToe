import {useState} from 'react'

function Cell(props){
    const [cellStatus, setCellStatus] = useState('H')

    function updateStatus(){
        if(cellStatus!='H'){
            return alert("Invalid Move")
        }
        const gameState = props.getGameState()
        props.clickFunction(props.ind)
        return setCellStatus(
            gameState === 1 ? 'X' : 'O'
        )
    }


    return(
        <div>
            <button onClick={updateStatus}>{cellStatus}</button>
        </div>
    )

}

export default Cell