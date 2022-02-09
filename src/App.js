import React, { useEffect, useRef } from 'react';
import { marked } from 'marked';
import "./App.css";
import $ from 'jquery';
import Prism from 'prismjs';
import Highlight from 'react-highlight'


marked.setOptions({
  breaks: true,
  highlight: function (code) {
    return Prism.highlight(code, Prism.languages.javascript, 'javascript');
  }
});

// INSERTS target="_blank" INTO HREF TAGS (required for Codepen links)
const renderer = new marked.Renderer();
renderer.link = function (href, title, text) {
  return `<a target="_blank" href="${href}">${text}</a>`;
};




function Editor(props){


    return (<div className='editor-div' >
      <div className='edit-tag-div'><>Editor</><i onClick={props.enlargeEditor} className={props.preview?"fa fa-arrows-alt":"fa fa-compress-alt"} /></div>
      <textarea id="editor" value={props.input} onChange={props.handleChange} className={'textarea' + props.theClass}></textarea>
    </div>)

} 


function Preview(props){
  
    const myRef = useRef(<div></div>)
    useEffect(()=>{
      // myRef.current.innerHTML =   props.text;
      //<Highlight language="javascript"  innerHTML={true}> {props.text} </Highlight>
      // const value = props.text.match(/\s/g)
      // console.log(value);
    },[props.text])
    

      console.log("here", props.text);
    return (<div style={props.thisStyle} className='preview-div' >
      <div className='prev-tag-div'><>Previewer</> <i onClick={props.enlargePreview} className={props.editor?"fa fa-arrows-alt":"fa fa-compress-alt"} /></div>
      <div id="preview" ref={myRef} 
      
      dangerouslySetInnerHTML={{
        __html: props.text
      }}
      className={'output' + props.theClass}>
       
      </div>
    </div>)
  
} 










export default class App extends React.Component{
 constructor(props){
   super(props)
   this.state = {input:placeHolder,output:"",editor:true,preview:true};
   this.handleChange = this.handleChange.bind(this);
   this.enlargePreview =  this.enlargePreview.bind(this);
   this.enlargeEditor = this.enlargeEditor.bind(this);
 }

 handleChange(event){
  this.setState({input:event.target.value})
 }

 enlargePreview(){
   this.setState({editor: !this.state.editor})
 }

 enlargeEditor(){
   this.setState({preview: !this.state.preview})
 }
 

 render(){
   
  
  const propPrev = this.state.editor===false? " max-preview":"";
  const propEditor = this.state.preview ===false? ' max-editor':"";
  const style = this.state.editor===false?{marginTop:"30px"}:{}; 
  
   return (<div className='app-div'> 
  
  { this.state.editor && <Editor enlargeEditor={this.enlargeEditor} preview={this.state.preview} theClass={propEditor} input={this.state.input} handleChange={this.handleChange}/>}
  { this.state.preview && <Preview thisStyle={style} enlargePreview={this.enlargePreview} editor={this.state.editor} theClass={propPrev} text={marked(this.state.input, { renderer: renderer })}/>}
  
  </div>)
 }
}



const placeHolder= `# Welcome to my React Markdown Previewer!

## This is a sub-heading...
### And here's some other cool stuff:

Heres some code, \`<div></div>\`, between 2 backticks.

\`\`\`
// this is multi-line code:

function anotherExample(firstLine, lastLine) {
  if (firstLine == '\`\`\`' && lastLine == '\`\`\`') {
    return multiLineCode;
  }
}
\`\`\`

You can also make text **bold**... whoa!
Or _italic_.
Or... wait for it... **_both!_**
And feel free to go crazy ~~crossing stuff out~~.

There's also [links](https://www.freecodecamp.org), and
> Block Quotes!

And if you want to get really crazy, even tables:

Wild Header | Crazy Header | Another Header?
------------ | ------------- | -------------
Your content can | be here, and it | can be here....
And here. | Okay. | I think we get it.

- And of course there are lists.
  - Some are bulleted.
     - With different indentation levels.
        - That look like this.

1. And there are numbered lists too.
1. Use just 1s if you want!
1. And last but not least, let's not forget embedded images:

![freeCodeCamp Logo](https://cdn.freecodecamp.org/testable-projects-fcc/images/fcc_secondary.svg)
`;