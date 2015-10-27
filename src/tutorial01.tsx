import * as React from "react";
import * as ReactDOM from "react-dom";

class CommentBox extends React.Component<React.Props<any>, {}> {
    render(): JSX.Element {
        return (
            <div className="commentBox">
                Hello, world!I am a CommentBox.
                </div>
        );
    }
}

ReactDOM.render(
    <CommentBox />,
    document.getElementById("content")
);
