# express.places
Web UI for places app

## Pre-requisites
* MongoDB instance or container
* OK to store documents in _geo_ db, _places_ collection

## Standard deployment 

1. Copy _.env.example_ to _.env_ and modify as appropriate
1. npm install
1. npm start

## Docker deployment

1. Modify Dockerfile if needed
1. docker build ...
1. docker run --name placesapp ...