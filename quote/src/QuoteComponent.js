import React from "react"
import QuoteGen from "./Quote";

const tweet = {
    position: "absolute",
    bottom: "115px",
    right: "15px",
    padding: "10px 20px",
    backgroundColor: "rgb(73, 73, 73)",
    borderRadius: "10px 10px 10px 0px",
    color: "white"
}
class QuoteComponent extends React.Component{
    constructor(){
        super();
        this.state = {
            quote: '',
            author: '',
            apiquote: {},
            distweet:false
        }
    }
    async componentDidMount(){
        const url = await fetch('https://type.fit/api/quotes').then(response => response.json());
        
        this.setState({
            apiquote: url,
            quote:url[0].text,
            author: url[0].author
        })
    }
    newQuote = () => {
        const random = Math.floor(Math.random() * this.state.apiquote.length)
        this.setState({
            quote: this.state.apiquote[random].text,
            author: this.state.apiquote[random].author
        })
        console.log(random)
    }    
    hover = () =>{
        this.setState({
            distweet:true
        })
    }
    unhover = () =>{
        this.setState({
            distweet:false
        })
    }
    render(){
        return(
            <QuoteGen {...this.state} newQuote={this.newQuote} tweet={tweet} hover={this.hover} unhover={this.unhover}/>
        )
    }
}

export default QuoteComponent