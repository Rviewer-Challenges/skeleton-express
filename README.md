<img align="left"  width="150" height="150" src=".github/rviewer_logo--dark.png" />

## Getting Started

Within the [Makefile](Makefile) you can handle the entire flow to get everything up & running:

1. Install `make` on your computer, if you do not already have it.
2. Install the Yarn dependencies: `make deps`
3. Start the application: `make up`

As you could see on the [Makefile](Makefile) script, you could just avoid those steps and just execute `make up`, as
**deps** are dependant of it.

Once these steps are finished, you could access to the application navigating
into [http://localhost:8000/users](http://localhost:8000/users).

## Description

With this API you can create playlists for your user account with Spotlist
Functions include:
  - create a new list 
  - add new songs to an already existing list
  - find and display all your current lists
  - find a single list and display it

You must be authorized to interact with your lists, do this by using a Basic authorization header to your calls, using the "name" and "password" linked to your account. 

Passwords are strength protected, so make sure to use a strong password.

Enjoy and start creating some cool playlists with Spotlist!

## Endpoints

(GET) - get all lists for a user
`/:userid/lists`

(POST) - create a new list for a user
`/:userid/lists` 
body = {
  "name": 'your list name',
  "songs": [can be empty or array of songs]
}

(GET) - get a specific list for a user
`/:userid/:listId` 

(POST) - add song to a list
`/:userid/lists/:listid/songs`
body = {
    "artist": "your new artist",
    "title": "your new title"
}


