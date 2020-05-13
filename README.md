# express.places
Web UI for Places app

## Prerequisites
* MongoDB instance or container
* Mongo container has network alias _placesdb_ (default)
* OK to store documents in _geo_ db, _places_ collection

## Standard deployment 

1. Copy _.env.example_ to _.env_ and modify as appropriate
1. npm install
1. npm start

## Docker network deployment

1. docker build ... { --build-arg PORT_ARG=_port_ } { --build-arg _name_=_value_} ...
1. docker run ... { -p _port_:_port_ } ...
1. docker network connect ... --alias placesapp ...

_See Dockerfile for other build-args and defaults_

## Use

*  Browse to http://host:3000/places (default, if exposed)