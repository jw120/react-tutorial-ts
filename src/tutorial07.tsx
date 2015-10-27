import * as React from "react";
import * as ReactDOM from "react-dom";
import * as marked from "marked";

// Component structure
// - CommentBox
//  - CommentList
//    - Comment
//  - CommentForm

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

class CommentList extends React.Component<React.Props<any>, {}> {
    render(): JSX.Element {
        return (
            <div className="commentList">
                        <Comment author="Pete Hunt">This is one comment</Comment>
                        <Comment author="Jordan Walke">This is *another* comment</Comment>
                </div>
        );
    }
}

interface CommentProps extends React.Props<any> {
    author: string;
}

class Comment extends React.Component<CommentProps, {}> {

    // Workround XSS prevention. Use marked (with sanitize on to ignore HTML as input) to generate our comment HTML
    rawMarkup(): { __html: string } {
        let rawMarkup = marked(this.props.children.toString(), { sanitize: true });
        return { __html: rawMarkup };
    }

    render(): JSX.Element {
        return (
            <div className="comment">
                <h2 className="commentAuthor">
                    {this.props.author}
                    </h2>
                <span dangerouslySetInnerHTML={this.rawMarkup() } />
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

ReactDOM.render(
    <CommentBox />,
    document.getElementById("content")
);
