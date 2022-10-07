import React from "react"

function QuoteGen(props){
        return(
            <div>
                <p id="text">{props.quote}</p>
                <p id="author">-{props.author}</p>
                <button id="new-quote" onClick={props.newQuote}>New Quote</button>
                <a href="twitter.com/intent/tweet" id="tweet-quote" onMouseOver={props.hover} onMouseOut={props.unhover}>
                    <i className="fab fa-twitter fa-2x"></i>
                </a>
                <p id="tweet" style={props.distweet ? props.tweet : {display: "none"}}>Tweet</p>
            </div>
        )
    }

export default QuoteGen