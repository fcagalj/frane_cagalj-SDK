# The One (The Lord of the Rings) API SDK for TypeScript

## Introduction

A TypeScript SDK for The One (The Lord of the Rings) API. This library is built with TypeScript developers in mind, but it also works with JavaScript.

### Features

- Full type information for requests and responses
- OAuth2 support
- Supports Node.js 18+. **Doesn't work in browser environments due to the The One (The Lord of the Rings) API not supporting CORS**

## Installing

```
npm install the-lord-of-the-rings-api-ts-sdk
```

## Client

To set up the client you need to authenticate with authentication token

```typescript

import { Client } from "the-lord-of-the-rings-api-ts-sdk";

const client = new Client({ auth: 'MY-BEARER-TOKEN' });
```
## Examples

### Listing movies

```typescript
import { Client } from "the-lord-of-the-rings-api-ts-sdk";

const client = new Client({ auth: ACCESS_TOKEN });

const moviesRes = await client.listMovies();

if (!('docs' in moviesRes)) {
    throw new Error(moviesRes.body.message);
}

const movies = moviesRes.docs;
```

### Getting a movie

```typescript
import { Client } from "the-lord-of-the-rings-api-ts-sdk";

const client = new Client({ auth: ACCESS_TOKEN });

const movieRes = await client.getMovie({ movieId: movies[0]._id });

if (!('_id' in movieRes)) {
    throw new Error(movieRes.body.message);
}

console.log(`Movie: ${movieRes.name} (${movieRes.budgetInMillions} M$)`);


```
### Getting a movie quotes

```typescript
import { Client } from "the-lord-of-the-rings-api-ts-sdk";

const client = new Client({ auth: ACCESS_TOKEN });

const quotesRes = await client.getMovieQuotes({ movieId: movieRes._id });

if (!('docs' in quotesRes)) {
    throw new Error('No movies to list');
}

const quotes = quotesRes.docs;

```

## Sorting 

Pass the `sort` parameter to the `queryParameters` method to sort the results.

```typescript   
import { Client } from "the-lord-of-the-rings-api-ts-sdk";
    
const client = new Client({ auth: ACCESS_TOKEN });

    
const moviesRes = await client.listMovies({ sort: 'name:desc' });
```

## Filtering

Filter results by passing the value to any available key parameter to the `queryParameters`.

```typescript   
import { Client } from "the-lord-of-the-rings-api-ts-sdk";
    
const client = new Client({ auth: ACCESS_TOKEN });

    
const moviesRes = await client.listMovies({ name: 'hobbit' });
```
## Pagination
You can paginate results by passing the `limit`, `page`  and `offset` parameter to the `queryParameters` method.

```typescript   
import { Client } from "the-lord-of-the-rings-api-ts-sdk";
    
const client = new Client({ auth: ACCESS_TOKEN });

const moviesRes = await client.listMovies({
    queryParameters: { page: '2', offset: '3' },
});
```

## Contributing

### Live development

```
npm run build:watch
```

### Building

```
npm run build
```

### Testing

```
npm run test
```

