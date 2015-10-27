import * as React from "react";
import * as ReactDOM from "react-dom";
import * as marked from "marked";

// Component structure
// - CommentBox (holds server data as props and comment array as state, passes as props to CommentList)
//  - CommentList (takes comment array as props to generate Comments, passing author)
//    - Comment (uses author and child text nodes)
//  - CommentForm (takes callback to CommentBox to handle comment submission)

interface IComment {
	author: string;
	text: string;
}

interface BoxProps extends React.Props<any> {
	url: string;
	pollInterval: number;
}

interface DataProps extends React.Props<any> {
	data: IComment[];
}

interface DataState {
	data: IComment[];
}

class CommentBox extends React.Component<BoxProps, DataState> {
	constructor(props: BoxProps) {
		super(props);
		this.state = {
			data: []
		}
	}
	loadCommentsFromServer() {
		let request = new XMLHttpRequest();
		request.onload = () => {
			if (request.status >= 200 && request.status < 400) {
				this.setState({ data: request.response });
			} else {
				console.error(this.props.url, request.status, request.statusText);
			}
		}
		request.onerror = (ev: Event) => {
			console.error(this.props.url, ev.type);
		}
		request.open('GET', this.props.url, true);
		request.responseType = 'json';
		request.send();
	};
	componentDidMount() {
		this.loadCommentsFromServer();
		setInterval(this.loadCommentsFromServer.bind(this), this.props.pollInterval);
	}
	handleCommentSubmit(comment: IComment) {
		let request = new XMLHttpRequest();
		request.onreadystatechange = function() {
			if (request.readyState === 4) { // if request complete
				if (request.status === 200 || request.status === 201) {
					this.setState({data: JSON.parse(request.response)});
				} else {
					console.log("Error posting to ", this.props.url, `(${request.readyState},${request.status})`, request.responseText);
				}
			}
		}.bind(this);
		request.open('POST', "/api/comments", true);
		request.setRequestHeader('Content-Type', 'application/json; charset=UTF-8');
		request.send(JSON.stringify(comment));
	}
	render() {
		return (
			<div className="commentBox">
				<h1>Comments</h1>
				<CommentList data={this.state.data} />
				<CommentForm onCommentSubmit={this.handleCommentSubmit.bind(this)}/>
			</div>
		);
  	}
}

class CommentList extends React.Component<DataProps, {}> {
	render() {
		let commentNodes = this.props.data.map((comment: IComment, index: number) => {
			return (
				<Comment author={comment.author} key={index}>
					{comment.text}
				</Comment>
			)
		})
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
	rawMarkup() {
		let rawMarkup = marked(this.props.children.toString(), { sanitize: true });
		return { __html: rawMarkup };
	}

	render() {
		return (
			<div className="comment">
				<h2 className="commentAuthor">
					{this.props.author}
				</h2>
				<span dangerouslySetInnerHTML={this.rawMarkup()} />
			</div>
		);
	}
}

interface CommentFormProps extends React.Props<any> {
	onCommentSubmit: (comment: IComment) => void
}

class CommentForm extends React.Component<CommentFormProps, {}> {
	handleSubmit(e: React.FormEvent) {
		e.preventDefault();
		// Find the DOM nodes for our child input elements
		let authorNode = ReactDOM.findDOMNode<HTMLInputElement>(this.refs["author"]);
		let textNode = ReactDOM.findDOMNode<HTMLInputElement>(this.refs["text"]);
		// Extract their texte
		let author = authorNode.value.trim();
		let text = textNode.value.trim();
		if (!text || !author) {
			return;
		}
		console.log("CommentForm sending comment", text, "by", author);
		this.props.onCommentSubmit({author: author, text: text});
		authorNode.value = "";
		textNode.value = "";
	}
	render() {
		return (
			<form className="commentForm" onSubmit={this.handleSubmit.bind(this)}>
				<input type="text" placeholder="Your name" ref="author"/>
				<input type="text" placeholder="Say something..." ref="text"/>
				<input type="submit" value="Post" />
			</form>
		);
	}
}

ReactDOM.render(
  <CommentBox url="/api/comments" pollInterval={3000} />,
  document.getElementById("content")
);
