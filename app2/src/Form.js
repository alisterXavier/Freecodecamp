import React from 'react'
import FormComponent from './FormComponent'

const disable = {
  color: "grey",
  textDecoration: "line-through"
};

class Form extends React.Component {
  constructor() {
    super();
    this.state = {
      First: '',
      Last: '',
      Age:'',
      gender:'',
      destination: '',
      kosher:false,
      vegetarian:false,
      Nonvegetarian:false,
      lactoseFree:false
    };
    this.handleChange = this.handleChange.bind(this);
   }

   handleChange(e){
     const {name,type,value, checked} = e.target;
     type === 'checkbox' ?
     this.setState({
        [name] : checked
      }) :
      this.setState({
       [name]: value
     })
    }

    render() {
      return(
        <FormComponent handle={this.handleChange} {...this.state} styles={disable}/>
      )
  }
}
export default Form;
