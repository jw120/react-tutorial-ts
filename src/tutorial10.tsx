import * as React from "react";
import * as ReactDOM from "react-dom";
import * as marked from "marked";

// Data for the comments (later to be replaced with a fetch from the server)

interface IComment {
    author: string;
    text: string;
}

let data: IComment[] = [
    { author: "Pete Hunt", text: "This is one comment" },
    { author: "Jordan Walke", text: "This is *another* comment" },
    { author: "Eve Smith", text: "This is a **final** comment" }
];

// Component structure
// - CommentBox (takes comment data as props, passes to CommentList)
//  - CommentList (uses comment data as props to generate Comments, passing author)
//    - Comment (uses author and child text nodes)
//  - CommentForm

interface DataProps extends React.Props<any> {
    data: IComment[];
}

class CommentBox extends React.Component<DataProps, {}> {
    render(): JSX.Element {
        return (
            <div className="commentBox">
                <h1>Comments</h1>
                <CommentList data={this.props.data} />
                <CommentForm />
                </div>
        );
    }
}

class CommentList extends React.Component<DataProps, {}> {
    render(): JSX.Element {
        let commentNodes = this.props.data.map((comment: IComment) => {
            return (
                <Comment author={comment.author}>
                    {comment.text}
                    </Comment>
            );
        });
        return (
            <div className="commentList">
                    {commentNodes}
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
    <CommentBox data={data} />,
    document.getElementById("content")
);
