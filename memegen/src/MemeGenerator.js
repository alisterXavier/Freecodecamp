import React from "react";

class MemeGenerator extends React.Component{
    constructor(){
        super();
        this.state={
            Loading: false,
            submit: false,
            Top: "",
            Bottom: "",
            image:"",
            allMemeImgs:[]
        }
        this.handleChange = this.handleChange.bind(this)
        // this.handleSubmit = this.handleSubmit.bind(this)
    }
    handleChange(e){
        const {name, value} = e.target;
        this.setState({
            [name]: value
        })
    }
    handleSubmit = (e) => {
        const random = Math.floor(Math.random() * this.state.allMemeImgs.length)
        console.log(random)
        this.setState({
            image: this.state.allMemeImgs[random].url,
        })
        setTimeout(() => {
            this.setState({submit:true})
            }, 100)
        e.preventDefault()
    }
    async componentDidMount(){
        const meme = await fetch("https://api.imgflip.com/get_memes").then(Response =>  Response.json());
        this.setState({
                Loading: true,
                allMemeImgs: meme.data.memes
            })
        }
        render(){
            return (
                <main>
                    <form className="form" onSubmit={this.handleSubmit}>
                    {/* {console.log(this.state.Loading && this.state.allMemeImgs)} */}
                    <input className="Text" type="text" name="Top" placeholder="Top Text" onChange={this.handleChange} />
                    <input className="Text" type="text" name="Bottom" placeholder="Bottom Text" onChange={this.handleChange} />
                    <button className="Gen">Gen</button>
                </form>
                <div className="Meme">
                    <img alt=""  className={this.state.submit && "active"} src={this.state.image} />
                    <h1 className="TopText">{this.state.submit && this.state.Top}</h1>
                    <h1 className="BottomText">{this.state.submit && this.state.Bottom}</h1>
                </div>
                </main>
        )
    }
}

export default MemeGenerator;