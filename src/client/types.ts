import { AuthClient } from '../auth/types';
import { Movie, Quote } from '../models';
import { Method } from 'axios';

type RequestBody =
  | {
      [key: string]: unknown;
    }
  | string;

export interface RequestOptions {
  auth?: string | AuthClient;
  data?: RequestBody;
  headers?: Record<string, string>;
  queryParameters?: { [key: string]: string }; // API doesn't support arrays & objects
  method?: Method;
  baseUrl?: string;
  resource?: string;
}

export interface ListMoviesOptions extends RequestOptions {
  // GET Request doesn't contain a body, "never" here prevents users from setting it
  data?: never;
  queryParameters?: Record<keyof Movie, string>;
}

export interface GetMovieOptions extends RequestOptions {
  data?: never;
  movieId: string;
  queryParameters?: Record<string, string>;
}

export interface GetMovieQuotesOptions extends RequestOptions {
  data?: never;
  movieId: string;
  queryParameters?: Record<keyof Quote, string>;
}

export interface TheOneApiResponse<T> {
  docs: T[];
  total: number;
  limit: number;
  offset: number;
  page: number;
  pages: number;
}

/**
 * Base shape for a Response. This interface is extended
 * to provide the specific shape for the responses
 * of each resource+verb.
 */
export interface Response<T> {
  status: string;
  body?: TheOneApiResponse<T>;
  headers?: Record<string, unknown>;
}

export interface ErrorResponse {
  // String literal unions provide a predefined set of
  // possible status codes that we can get. This helps
  // the TS language server to be able to narrow down
  // the types through control flow analysis.
  status: '400' | '401' | '404' | '500';
  body: {
    errorCode: string;
    message: string;
  };
}
