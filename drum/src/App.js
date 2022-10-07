import './App.css';
import React, { useState } from 'react'

const KeyPress = {
  Q: {
    text: "Q",
    id: "Heater-1",
    audio:'https://s3.amazonaws.com/freecodecamp/drums/Heater-1.mp3 '
  },
  W: {
    text: "W",
    id: "Heater-2",
    audio:'https://s3.amazonaws.com/freecodecamp/drums/Heater-2.mp3'
  },
  E:{
    text: "E",
    id: "Heater-3",
    audio:'https://s3.amazonaws.com/freecodecamp/drums/Heater-3.mp3'
  },
  A:{
    text: "A",
    id: "Heater-4_1",
    audio:'https://s3.amazonaws.com/freecodecamp/drums/Heater-4_1.mp3'
  },
  S:{
    text: "S",
    id: "Heater-6",
    audio:'https://s3.amazonaws.com/freecodecamp/drums/Heater-6.mp3'
  },
  D:{
    text: "D",
    id: "Dsc_Oh",
    audio:'https://s3.amazonaws.com/freecodecamp/drums/Dsc_Oh.mp3'

  },
  Z:{
    text: "Z",
    id: "Kick_n_Hat",
    audio:'https://s3.amazonaws.com/freecodecamp/drums/Kick_n_Hat.mp3'
  },
  X:{
    text: "X",
    id: "RP4_KICK_1",
    audio:'https://s3.amazonaws.com/freecodecamp/drums/RP4_KICK_1.mp3'
  },
  C:{
    text: "C",
    id: "Cev_H2",
    audio:'https://s3.amazonaws.com/freecodecamp/drums/Cev_H2.mp3'
  }
}
class Drum extends React.Component{
  constructor(){
    super();
    this.state = {
      text: "",
      audio: ""
    }
  }
  handlePress = (e) => {
    const upper = e.key.toUpperCase()
    const audio = document.getElementById(upper)
    this.setState({
      text: KeyPress[upper].id
    })
    this.Play(audio) 
  }

  handleClick = (e) => {
    const audio = e.target.querySelector("audio")
    const {id} = e.target;
    this.setState({
      text: id
    })
    this.Play(audio)
  }

  Play = (a) => {
    a.play()
  }
  componentDidMount(){
    document.addEventListener('keydown', (e) => {
      this.handlePress(e);
    })
  }
    render(){
      return(
        <div id="display">
          <div className='label'>
            <p>{this.state.text}</p>
          </div>
          {/* {(this.state.isPlaying) && this.state.id} */}
          {Object.keys(KeyPress).map((item) => (
              <div className='drum-pad' key={KeyPress[item].id} id={KeyPress[item].id} onClick={this.handleClick}>{KeyPress[item].text}
              <audio className="clip" id={KeyPress[item].text} src={KeyPress[item].audio}></audio></div>
          ))}
        </div>
      )
    }
  }

function App(){
  return (
    <div id="drum-machine">
        <Drum />
    </div>
  );
}


export default App;
