# Coderbook

## Objectives

To test your abilities in full stack web development using the M.E.R.N. stack.

In full stack development it's help to contemplate the flow of data.

The flow of full stack will always be from `Client > Server` then `Server > Client`.

### Client > Server

At a high level, when users are inserting data into our database, the flow will be like the following.

`Input > Handler > Submit Handler > Action > API > Controller > Handler > Database`

### Server > Client

At a high level, when our user is requesting data the flow of the data wil lbe like so.

`Database > Handler > Controller > REST response > Action > Reducer > Component > User Interface`

### Requirements

#### User

- As a user I can register an account.
- As a user I can see my account information on my profile page.
- As a user I update my account.
- As a user I can delete my account

#### Post

- As a user I can create a post.
- As a user I can view all posts on the homepage.
- As a user I can view all my posts on my profile.
- As a user I can update my own posts.
- As a user I can delete my own posts.

#### Comment

- As a user I can comment on a post.
- As a user I can view all the comments of a post.
- As a user I can see the number of comments on a post.
- As a user I can update a comment which I've made.
- As a user I can delete my comments on a post.

#### Reaction

- As a user I can react to a post
- As a user I can view all the reactions on a post
- As a user I can see the number of reactions on a post.
- As a user I can delete my reactions on a post.
