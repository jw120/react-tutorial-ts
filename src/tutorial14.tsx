import * as React from "react";
import * as ReactDOM from "react-dom";
import * as marked from "marked";

// Data for the comments (later to be replaced with a fetch from the server)

interface IComment {
    author: string;
    text: string;
}

// Component structure
// - CommentBox (uses url as props, takes comment data as state, passes as props to CommentList)
//  - CommentList (uses comment data as props to generate Comments, passing author)
//    - Comment (uses author and child text nodes)
//  - CommentForm

interface DataProps extends React.Props<any> {
    data: IComment[];
}

interface BoxProps extends React.Props<any> {
    url: string;
    pollInterval: number;
}

interface DataState {
    data: IComment[];
}

class CommentBox extends React.Component<BoxProps, DataState> {
    constructor(props: BoxProps) {
        super(props);
        this.state = {
            data: []
        };
    }
    loadCommentsFromServer(): void {
        let request = new XMLHttpRequest();
        /*console.log("loadCommentsFromServer called");*/
        request.onload = () => {
            /*console.log("onload entered", this.props);*/
            if (request.status >= 200 && request.status < 400) {
                this.setState({ data: request.response });
                console.log("State set to ", this.state);
            } else {
                console.error(this.props.url, request.status, request.statusText);
            }
        };
        request.onerror = (ev: Event) => {
            console.error(this.props.url, ev.type);
        };
        request.open("GET", this.props.url, true);
        request.responseType = "json";
        request.send();
    };
    componentDidMount(): void {
        this.loadCommentsFromServer();
        setInterval(this.loadCommentsFromServer.bind(this), this.props.pollInterval);
    }
    render(): JSX.Element {
        return (
            <div className="commentBox">
                <h1>Comments</h1>
                <CommentList data={this.state.data} />
                <CommentForm />
                </div>
        );
    }
}

class CommentList extends React.Component<DataProps, {}> {
    render(): JSX.Element {
        let commentNodes = this.props.data.map((comment: IComment, index: number) => {
            return (
                <Comment author={comment.author} key={index}>
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
    <CommentBox url="/api/comments" pollInterval={3000} />,
    document.getElementById("content")
);
