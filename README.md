# express.places
Web UI for places app

## Pre-requisites
* MongoDB instance or container
* Mongo container has network alias _placesdb_ (default)
* OK to store documents in _geo_ db, _places_ collection

## Standard deployment 

1. Copy _.env.example_ to _.env_ and modify as appropriate
1. npm install
1. npm start

## Docker network deployment

1. Modify Dockerfile if needed
1. docker build ...
1. docker run ... { -p 3000:3000 } ...
1. docker network add ... --alias placesapp ...

## Use

*  Browse to http://host:3000/places (default, if exposed)