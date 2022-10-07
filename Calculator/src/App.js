import React, { useEffect, useState } from "react";
import './App.css';

const  operator = ['*','/','-','.','+'];
function Calc(){
  let [display, setDisplay] = useState('');

  const handleClick = (e) => {
    const text = e.target.innerText 
    if(text === "C"){
      setDisplay("");
      return;
    }
    else if(text === "="){
      setDisplay(eval(display).toString())
      return;
    }
    else if(operator.includes(text) && operator.includes(display.slice(-1))){
      if(text === "-")
        setDisplay(display + text);
       else{
        setDisplay(display.slice(0,-1) + text)
        if(operator.includes(display.slice(-2,-1)))
          setDisplay(display.slice(0,-2) + text)
      }
      return;
    }
    else if(text === "."){
      let splitt = display.split(/[\/\*\-\+]/)
      if(splitt[splitt.length-1].split("").some(item => {return (item===".")}))
        return;
      }
    if(text === "0" && display.length < 1){
        return;
    }
    setDisplay(display + text)
  }
  return(
      <div className="calculator">
        <div id="display">
          {(display === '') ? 0 : display}
        </div>
        <div className="buttons">
          <div id="numbers">
            <button type="button" id="seven" onClick={handleClick}>7</button>
            <button type="button" id="eight" onClick={handleClick}>8</button>
            <button type="button" id="nine" onClick={handleClick}>9</button>
            <button type="button" id="four" onClick={handleClick}>4</button>
            <button type="button" id="five" onClick={handleClick}>5</button>
            <button type="button" id="six" onClick={handleClick}>6</button>
            <button type="button" id="one" onClick={handleClick}>1</button>
            <button type="button" id="two" onClick={handleClick}>2</button>
            <button type="button" id="three" onClick={handleClick}>3</button>
            <button type="button" id="clear" onClick={handleClick}>C</button>
            <button type="button" id="zero" onClick={handleClick}>0</button>
            <button type="button" id="decimal" onClick={handleClick}>.</button>
          </div>
          <div id="signs">
            <button type="button" id="subtract" onClick={handleClick}>-</button>
            <button type="button" id="divide" onClick={handleClick}>/</button>
            <button type="button" id="multiply" onClick={handleClick}>*</button>
            <button type="button" id="add" onClick={handleClick}>+</button>
            <button type="button" id="equals" onClick={handleClick}>=</button>
          </div>
        </div>
      </div>
    )
};

function App() {
  return (
    <div>
      <Calc />
    </div>
  );
}

export default App;
