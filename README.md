# Coffee Crowds ([website](http://www.coffeecrowds.com))
Web application that utilizes user input to track which coffee shops are busy around the Greater Houston Area.

## Prerequisites
- Node.js
- nodemon

## Installation
1. Grab the source code from GitLab

```
$ git clone git@gitlab.com:teodizzo/coffee-crowds.git
```

2. Remove the ".example" extension from the ".env.example" file and include the proper information for your MongoDB database

3. cd into root dir and run nodemon to spin up the server (server.js)

```
  $ nodemon
```

3. View application running at http://localhost:3000

## TODO
- User sessions (login/logout)
- Build simple UI for web interaction
- Figure out how to hook up front end to RESTful API that is built instead of reinventing the wheels that you've already built

## Completed Items
- Set up RESTful API (Users, CoffeeShops, Checkins)
- Set up domain on DigitalOcean VPS as a virtual host

## Enhancements
- Price ratings ($-$$$$)
- Ability for User to flag an inaccurate Checkin or malicious User
- Admin functionality on the front end

## Slogans
"Stop guessing where to go to enjoy that cup of coffee"

"Because nobody enjoys driving around trying to find a place to enjoy their coffee"

"Less searching, more sipping"

"Stop wasting time and find a place to work/study"
