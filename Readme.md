# React Tutorial in TypeScript

Done as a learning exercise, following https://facebook.github.io/react/docs/tutorial.html

## Using

For the versions (<=v12) which do not need the server

* npm run build
* open the appropriate public/index.vXX.html file in the browser

For the server versions

* npm run build
* npm start
* open http://127.0.0.1:3000/index.v14.html

## Versions

Numbering follows the filenames in the tutorial. We skip files that are only intermediate steps

* v01 - Single component (CommentBox)
* (v02 - Omitted, just adds CommentList and CommentForm without composing)
* v03 - CommentBox composed from CommentList and CommentForm
* (v04 - Omitted, adds a Comment class that uses props)
* v05 - Uses the Comment class
* (v06 - Omitted, used marked library for comments incorrectly)
* v07 - Used marked library to format comments
* (v08 - Omitted, adds data array for props)
* (v09 - Omitted, connect data array to CommentList)
* v10 - Complete rendering of comments from the data array)
* (v11 - Omitted, pass url to CommentBox instead of props)
* (v12 - Omitted, changes CommentBox to have data as state)
* (v13 - Omitted, get comments from api once)
* v14 - Uses server to get comments with polling (make changes by editting comments.json)
* (v15 - Omitted, adds CommentForm)
* (v16 - Omitted, adds local part of comment form submission)
* (v17 - Omitted, adds handler to CommentBox)
* (v18 - Omitted, connects CommentForm to CommentBox handler)
* v19 - Submits new comments to server



## TODO

* Props types?
* webpack dev-server
* understand purpose of T in Props<T>
