import React from "react";

function FormComponent(props){
    return (
        <main>
          <form >
          {console.log(props.destination)}
          <input placeholder='First'name="First" value={props.First} onChange={props.handle}/><br/>
          <input placeholder='Last' name="Last" value={props.Last} onChange={props.handle}/><br/>
          <input placeholder='Age' name="Age" value={props.Age} onChange={props.handle}/><br/>
          <label><input type="radio" name="gender" value="Male" onChange={props.handle}/> Male<br/></label>
          <label><input type="radio" name="gender" value="Female" onChange={props.handle}/> Female<br/></label>
          <select name="destination" onChange={props.handle}>
            <option name="destination">Japan</option>
            <option name="destination">London</option>
            <option name="destination">Canada</option>
            <option name="destination">Los Angeles</option>
          </select><br/>
          <label><input type="checkbox" name="kosher" onChange={props.handle} checked={props.kosher}/>kosher</label><br/>
          <label style={props.Nonvegetarian ? props.styles : null}><input type="checkbox" name="vegetarian" onChange={props.handle} disabled={props.Nonvegetarian} checked={props.vegetarian}/>vegetarian</label><br/>
          <label style={props.vegetarian ? props.styles: null}><input type="checkbox" name="Nonvegetarian" onChange={props.handle} disabled={props.vegetarian} checked={props.Nonvegetarian}/>Non-vegetarian</label><br/>
          <label><input type="checkbox" name="lactoseFree"onChange={props.handle} checked={props.lactoseFree}/>lactose free</label><br/>
          <button>Submit</button>
        </form>

        <div>
          <hr />
          <h3 >Name: {props.First +" "+ props.Last}</h3>  
          <h3 >Age: {props.Age}</h3>  
          <h3 >Gender: {props.gender}</h3>  
          <h3 >Destination: {props.destination}</h3>  
          <h3 >Dietary:</h3>
            <h4 style={{display: !props.Nonvegetarian && "none"}}>{props.Nonvegetarian && "NonVeg"}</h4>  
            <h4 style={{display: !props.lactoseFree && "none"}}>{props.lactoseFree && "Lactose-Free"}</h4>  
            <h4 style={{display: !props.kosher && "none"}}>{props.kosher && "Kosher"}</h4>  
            <h4 style={{display: !props.vegetarian && "none"}}>{props.vegetarian && "Veg"}</h4>  
        </div>
      </main>
    );
}

export default FormComponent;