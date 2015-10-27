import * as React from "react";
import * as ReactDOM from "react-dom";

// Component structure
// - CommentBox
//  - CommentList
//    - Comment
//  - CommentForm

class CommentList extends React.Component<React.Props<any>, {}> {
    render(): JSX.Element {
        return (
            <div className="commentList">
                Hello, world!I am a CommentList.
                </div>
        );
    }
}

class CommentForm extends React.Component<React.Props<any>, {}> {
    render(): JSX.Element {
        return (
            <div className="commentForm">
                Hello, world!I am a CommentForm.
                </div>
        );
    }
}

class CommentBox extends React.Component<React.Props<any>, {}> {
    render(): JSX.Element {
        return (
            <div className="commentBox">
                <h1>Comments</h1>
                <CommentList />
                <CommentForm />
                </div>
        );
    }
}

ReactDOM.render(
    <CommentBox />,
    document.getElementById("content")
);
