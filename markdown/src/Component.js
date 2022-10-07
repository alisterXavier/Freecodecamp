import React, { PureComponent } from "react";
import Editor from "./Editor";
import Preview from "./Preview";
// a heading element (H1 size), a sub heading element (H2 size), 
// a link, inline code, a code block, a list item, a blockquote, an image, 
// and bolded text
const initialText=`
 # Heading level 1
 ## Heading level 2 
 **Bold Text**

 This is inline 

 To display a block of code use '\ \` '\ before and after 
 \`\`\`
 Block of Code
 \`\`\`
 
 Adding a number at the beginning makes an ordered list (1., 2.)
 1. First item 
 2. Second item 
 3. Third item 

 Adding " - " at the beginning makes it an unordered list
 - First item 
 - Second item 
 - Third item 

 Text prefixed with \'>\' displays a BlockQuote
 > Block Quotes!
 
 --------This is an image -----------------

 ![Image Description](https://a.rgbimg.com/users/b/br/bredmaker/600/mjbmZiG.jpg)

----This is a link ----

 [Doodle](https://www.google.com/doodles)
 `;

class Component extends React.Component{
    constructor(){
        super();
        this.state = {
            text: initialText
        }
    }   

    handleChange = (e) => {
        this.setState({
            text: e.target.value
        })
        console.log(this.state)
    }

    render(){
        return (
            <div className='container'>
                <Editor handle={this.handleChange} {...this.state}/>
                <Preview {...this.state}/>
            </div>
        )
    }
    
}

export default Component