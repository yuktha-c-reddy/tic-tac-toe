import React, { useRef, useState } from "react";
import './TicTacToe.css';
import circle_icon from "./circle.png";
import cross_icon from "./cross.png";
import clickSound from "./click.wav";
import resetClickSound from "./reset.wav";

let data = ["","","","","","","","",""];
var winner;

const TicTacToe = () => {
    let [count,setCount]= useState(0) ;
    let [lock ,setLock] = useState(false);
    let titleRef = useRef(null);
    let box1 = useRef(null);
    let box2 = useRef(null);
    let box3 = useRef(null);
    let box4 = useRef(null);
    let box5 = useRef(null);
    let box6 = useRef(null);
    let box7 = useRef(null);
    let box8 = useRef(null);
    let box9 = useRef(null);
    let box_array=[box1,box2,box3,box4,box5,box6,box7,box8,box9];
    const clickSoundAudioRef = useRef(null);
    const resetClickAudioRef = useRef(null);
    const AudioRef = useRef(null);
    const [currentPlayer, setCurrentPlayer] = useState('X');

    const toggle = (e, num) => {
      if (lock || data[num] !== '') {
        return false;
      }
    
      // Check the current player and set the icon accordingly
      const currentPlayerIcon = currentPlayer === 'X' ? cross_icon : circle_icon;
    
      e.target.innerHTML = `<img src='${currentPlayerIcon}'>`;
      //e.target.innerHTML = `<span class="player-icon"${currentPlayerIcon}</span>`;
      data[num] = currentPlayer;
    
      // Switch to the other player's turn
      setCurrentPlayer(currentPlayer === 'X' ? 'O' : 'X');
    
      checkWin();
      clickSoundAudioRef.current.play();
    };
    
    
    const checkWin = () => {
      if (data[0]===data[1] && data[1]===data[2] && data[2]!==""){
        winner= data[2];
        won();
      }
      else if (data[3]===data[4] && data[4]===data[5] && data[5]!==""){
        winner=data[5];
        won();
      }
      else if (data[6]===data[7] && data[7]===data[8] && data[8]!==""){
        winner=data[8];
        won(data[8]);
      }
      else if (data[0]===data[3] && data[3]===data[6] && data[6]!==""){
        winner=data[6];
        won(data[6]);
      }
      else if (data[1]===data[4] && data[4]===data[7] && data[7]!==""){
        winner=data[7];
        won(data[7]);
      }
      else if (data[2]===data[5] && data[5]===data[8] && data[8]!==""){
        winner=data[8];
        won(data[8]);
      }
      else if (data[0]===data[4] && data[4]===data[8] && data[8]!==""){
        winner=data[8];
        won(data[8]);
      }
      else if (data[0]===data[1] && data[1]===data[2] && data[2]!==""){
        winner=data[2];
        won(data[2]);
      }
      else if (data[2]===data[4] && data[4]===data[6] && data[6]!==""){
        winner=data[6];
        won(data[6]);
      }
      else if (!data.includes("")) {
        titleRef.current.innerHTML = "It's a Draw!";
        setLock(true);
      }
    
    }
    const won = () => {
      setLock(true);
      if(winner==='X')
      {
        titleRef.current.innerHTML = `Congratulations!  <img src=${cross_icon}> wins`;
      }
      else if(winner==='O'){
        titleRef.current.innerHTML = `Congratulations!  <img src=${circle_icon}> wins`;
      }
      else {
        titleRef.current.innerHTML = `Its a draw ! `;
      }
    
    }

    const reset = () => {
      winner="";
      setLock(false);
      data = ["","","","","","","","",""];
      titleRef.current.innerHTML = `Tic Tac Toe Using React`;
      box_array.map((e)=> {
        e.current.innerHTML="";
      });
      resetClickAudioRef.current.play();
    };
   
    return(
        <div className="container">
         <audio ref={AudioRef}>
           <source src={clickSound} type="audio/wav" />
           Your browser does not support the audio element.
        </audio>
        <audio ref={clickSoundAudioRef}>
          <source src={clickSound} type="audio/wav" />
           Your browser does not support the audio element.
       </audio>
       <audio ref={resetClickAudioRef}>
          <source src={resetClickSound} type="audio/wav" />
            Your browser does not support the audio element.
       </audio>
         
         <h1 className="title" ref={titleRef}> Tic Tac Toe Using React</h1>
         <p className="turn-message">It is {currentPlayer}'s turn</p>
         <div className="board">
           <div className="row1">
             <div className="boxes" ref={box1} onClick={(e)=> {toggle(e,0)}}> </div>
             <div className="boxes" ref={box2} onClick={(e)=> {toggle(e,1)}}></div>
             <div className="boxes" ref={box3} onClick={(e)=> {toggle(e,2)}}></div>
           </div>
           <div className="row2">
             <div className="boxes" ref={box4}  onClick={(e)=> {toggle(e,3)}}></div>
             <div className="boxes"  ref={box5} onClick={(e)=> {toggle(e,4)}}></div>
             <div className="boxes" ref={box6} onClick={(e)=> {toggle(e,5)}}></div>
           </div>
           <div className="row3">
             <div className="boxes"  ref={box7} onClick={(e)=> {toggle(e,6)}}></div>
             <div className="boxes" ref={box8} onClick={(e)=> {toggle(e,7)}}></div>
             <div className="boxes" ref={box9} onClick={(e)=> {toggle(e,8)}}></div>
           </div>
         </div>
         <button className="reset" onClick={()=>{reset()}}>Reset</button>
        </div>
    )
}

export default TicTacToe; 

