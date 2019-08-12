import React from "react";
//import { conditionalExpression } from "@babel/types";
//import ReactDOM from 'react-dom';

class BlogPost extends React.Component{
    constructor(){
        super()
        this.state = [
            {
                title: "Wass",
                text: "Mihoy min yoy"
            }
        ]
        //this.title = {value : "Wassup"};
        //this.text = {value : "type somethin booi"};
        
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    static staticMethod() {
        return 'static method has been called.';
    }

    handleChange(event) {
        this.setState({ [event.target.name] : event.target.value});
    }

    handleSubmit(event) {
        alert('A title was submitted: ' + this.state.title);
        alert('Some text was submitted: ' + this.state.text);
        this.state.push({title: this.state.title, text: this.state.text})
        event.preventDefault();
    }

    render() {
        return (
            <div>
            <form onSubmit={this.handleSubmit}>
                <label>
                    Title:
                    <input type="text" name="title" value={this.state.title} onChange={this.handleChange} />
                </label>
                <label>
                    Text:
                    <input type="text" name="text" value={this.state.text} onChange={this.handleChange} />
                </label>
                <input type="submit" value="Submit" />
            </form>
            {this.state.map((item) =>
                <li key={item.title}>
                    title: {item.title}<br />
                    text: {item.text}
                </li>
            )}
            </div>
        );
    }
}
/*
function AddToList(BlogList/*){
    //console.log("This is going to the console, please print,because I'm losing my mind")
    /*
    var NewBlog = new BlogPost();
    NewBlog.render()
    //BlogList.push(NewBlog);
}
function Blog(){
    var BlogList = [];
    var NewBlog = new BlogPost();
    BlogList.push(NewBlog.render());
    return(
        <div>
            <button onClick={AddToList(BlogList)/*)}>
                Add to list
            </button>
            {BlogList.map((item, index) => (
                <h1 key={index}>{item}</h1>
            ))}
        </div>
    )
}
*/
export default BlogPost