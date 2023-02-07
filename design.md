# Design of SDK

## Authentication

- The SDK supports OAuth2Bearer authentication with personal access tokens

## Configuration

- The SDK is configured by a `Config` object
- ACCESS_TOKEN and BASE_URL as environment variables

## Types

- SDK exports all used types

## Client Class

- Client class is the main class of the SDK. It is used to create an instance of the SDK.
- Client class handles error responses from the API
- It is not required to catch errors from the API, as the SDK will return error with the error message from the API
- Client class exposes
  - `listMovies` - returns a list of movies
  - `getMovie` - returns a movie by id
  - `getMovieQuotes` - returns a list of quotes for a movie

