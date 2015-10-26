import * as React from "react";
import * as ReactDOM from "react-dom";

// Component structure
// - CommentBox
//  - CommentList
//    - Comment
//  - CommentForm

class CommentBox extends React.Component<React.Props<any>, {}> {
	render() {
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
	render() {
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
	render() {
		return (
			<div className="comment">
				<h2 className="commentAuthor">
					{this.props.author}
				</h2>
				{this.props.children}
			</div>
		);
	}
}

class CommentForm extends React.Component<React.Props<any>, {}> {
	render() {
		return (
			<div className="commentForm">
				Hello, world! I am a CommentForm.
			</div>
		);
	}
}



ReactDOM.render(
  <CommentBox />,
  document.getElementById("content")
);