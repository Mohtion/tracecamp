import React from "react";

class blog_post {
    constructor(title, text){
        this.title = title;
        this.text = text;
    }
}

function Blog(){
    return(
        <form>
            <label>
                Name:
                <input type="text" name="name" />
            </label>
            <input type="submit" value="Submit" />
        </form>
    )
}

export default Blog;