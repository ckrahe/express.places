# express.places
Web UI for Places app

## Prerequisites
* MongoDB instance or container
* Mongo container has network alias _placesdb_ (default)
* OK to store documents in _geo_ db, _places_ collection

## Docker Compose deployment

This is the easiest deployment method, and it's done not here but in docker.places.
It assembles the Docker network comprised of each Places container, relying on the
Dockerfile and supporting files within each. Check it out.

## Manual network deployment

I used this method when I was learning about Docker networks but before I leveraged Docker Compose.

1. docker build ... { --build-arg PORT_ARG=_port_ } { --build-arg _name_=_value_} ...
1. docker run ... { -p _port_:_port_ } ...
1. docker network connect ... --alias placesapp ...

## Container customization

This method, the one I created first, is the most labor-intensive.  It doesn't use Dockerfile at all, instead
relying on you to first build a container from the standard node image.

1. Copy _.env.example_ to _.env_ and modify as appropriate
1. npm install
1. npm start

## Use

*  Browse to http://host:3000/places (default, if exposed)