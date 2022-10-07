import './App.css';
import React, { useEffect, useRef, useState } from 'react';



function Clock() {
  let audio = document.getElementById("beep");
  console.log(audio)
  const [timerLabel , setTimerLabel] = useState("Session")
  const [Break ,setBreak] = useState(5)
  const [session, setSession] = useState(25)
  const [Timer, setTimer] = useState(1500)
  const [startStop, setStartStop] = useState(false)
  const sessionInter = useRef(null)
  const breakInter = useRef(null)
  const breakInc = () => {
    if(Break < 60){
      setBreak(Break + 1)
      if (timerLabel === "Break") setTimer((Break + 1)*60)
    }
  }
  const breakDec = () => {
    if(Break > 1){
      setBreak(Break - 1)
      if (timerLabel === "Break") setTimer((Break - 1)*60)
    }
  }
  const sessionInc = () =>{
    if(session < 60 && timerLabel === "Session"){
      setSession(session + 1)
      if (timerLabel === "Session") setTimer((session + 1)*60)
  }
}
  const sessionDec = () => {
    if(session > 1 && timerLabel === "Session"){
      setSession(session - 1);
      if(timerLabel === "Session") setTimer((session - 1)*60)
    }
  }
  const handleStart = () => {
    setStartStop(true)
    if(timerLabel === "Session"){ 
      sessionStart()
    }
    else {
      breakStart()
    }
  }
  const handleStop = () => {
    clearInterval(sessionInter.current)
    clearInterval(breakInter.current)
    setStartStop(false)
  }
  const handleReset = () =>{
    audio.pause()
    audio.currentTime = 0
    handleStop();
    setTimerLabel("Session")
    setBreak(5)
    setSession(25)
    setTimer(1500)
  }
  const sessionStart = () => {
    sessionInter.current = setInterval(() => {
      setTimer((timer) => timer - 1)
      }, 1000)
  }
  const sessionStop = () => {
    clearInterval(sessionInter.current)
  }
  const breakStart = () => {
    breakInter.current = setInterval(() => {
      setTimer((timer) => timer - 1)
    }, 1000)
  }
  const breakStop = () => {
    clearInterval(breakInter.current)
  }
  const count = () => {
    let min = 0, sec = 0;
    if(Timer >= 0){

      min = Math.floor(Timer/60);
      sec = Timer%60
    }
    min = (min >= 10)? min: `0${min}`
    sec = (sec >= 10)? sec: `0${sec}`
    return `${min}:${sec}`
  }
  useEffect(() => {
    if(Timer === 3)
      audio.play()
    if(Timer < 0){
      if(timerLabel === "Session"){
        sessionStop()
        setTimerLabel("Break")
        setTimer(Break*60)
        breakStart();
      }
      if(timerLabel === "Break"){
          console.log("a")
          breakStop()
          setTimerLabel("Session")
          sessionStart();
          setTimer(session*60)
    }
    }
  })

  return (
      <div id="clock">
        <div className='container'>
          {/* {console.log(audio)} */}
          <div id="timer-label">{timerLabel}</div>
          <div id="time-left">{count()}</div>
          <div className='timer-btns'>
            <button id="start_stop" onClick={(startStop)? handleStop : handleStart}>{(startStop)?"Stop":"Start"}</button>
            <button id="reset" onClick={handleReset}>Reset</button>
          </div>
        </div>
        <div className='break-session'>
          <div className='break'>
            <div id="break-label">Break-Length</div>
            <div id="break-length">{Break}</div>
            <div className='break-btns'>
              <button id="break-decrement" onClick={breakDec}>-</button>
              <button id="break-increment" onClick={breakInc}>+</button>
            </div>
          </div>
          <div className='session'>
            <div id="session-label">Session Length</div>
            <div id="session-length">{session}</div>
            <div className='session-btns'>
              <button id="session-decrement" onClick={sessionDec}>-</button>
              <button id="session-increment" onClick={sessionInc}>+</button>
            </div>
          </div>
        </div>
      </div>
    );
  }


export default Clock;
