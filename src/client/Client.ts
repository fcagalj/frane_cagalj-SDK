import { AuthClient, AuthHeader } from '../auth/types';
import { Movie, Quote } from '../models';
import { OAuth2Bearer } from '../auth/auth';
import axios from 'axios';
import { BASE_URL } from '../config';
import { buildQueryString } from '../utils';
import {
  ErrorResponse,
  GetMovieOptions,
  GetMovieQuotesOptions,
  ListMoviesOptions,
  RequestOptions,
  Response,
  TheOneApiResponse,
} from './types';
import { ENDPOINTS } from './lib';

export class Client {
  auth?: AuthClient;
  defaultRequestOptions?: Partial<RequestOptions>;
  baseUrl: string = BASE_URL;
  constructor({
    baseUrl,
    auth,
    ...requestOptions
  }: Omit<RequestOptions, 'method' | 'resource' | 'queryParameters'>) {
    this.auth = typeof auth === 'string' ? new OAuth2Bearer(auth) : auth;

    this.baseUrl = baseUrl || this.baseUrl;

    this.defaultRequestOptions = {
      ...requestOptions,
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        ...requestOptions?.headers,
      },
    };
  }

  _getAuthHeader(
    auth?: AuthClient | string,
  ): Promise<AuthHeader> | AuthHeader | null {
    let authClient: AuthClient | undefined;
    if (auth) {
      authClient = typeof auth === 'string' ? new OAuth2Bearer(auth) : auth;
    } else {
      authClient = this.auth;
    }
    if (!authClient) {
      return null;
    }
    return authClient.getAuthHeader();
  }

  async _request<T>({
    baseUrl,
    auth,
    method,
    headers,
    resource,
    queryParameters,
    ...requestOptions
  }: RequestOptions): Promise<Response<T> | ErrorResponse> {
    const authHeader = await this._getAuthHeader(auth);

    if (!authHeader) {
      return {
        status: '401',
        body: {
          errorCode: 'AUTH_REQUIRED',
          message: 'Authentication is required to make this request',
        },
      };
    }
    const baseUrlString = baseUrl || this.baseUrl;
    if (!baseUrlString || !baseUrlString.startsWith('http')) {
      return {
        status: '400',
        body: {
          errorCode: 'BAD_REQUEST',
          message: 'baseUrl is required to make this request',
        },
      };
    }

    const url = new URL(baseUrl || this.baseUrl + resource);
    if (queryParameters) {
      url.search = buildQueryString(queryParameters);
    }

    const axiosParams = {
      url: url.toString(),
      headers: {
        ...authHeader,
        ...headers,
      },
      method,
      ...requestOptions,
    };

    try {
      const { data, status, headers } = await axios(axiosParams);

      if (!data.docs) {
        return {
          status: '500',
          body: {
            errorCode: 'SERVER_ERROR_NO_DATA',
            message: 'Server error, no data',
          },
        };
      }
      return {
        status: status.toString(),
        body: data,
        headers,
      };
    } catch (e) {
      let message = 'Server error';
      if (axios.isAxiosError(e)) {
        message =
          e.response?.data?.fault?.message || e.message || 'Server error';
      }
      return {
        status: '500',
        body: {
          errorCode: 'SERVER_ERROR',
          message,
        },
      };
    }
  }

  async listMovies(
    input?: ListMoviesOptions,
  ): Promise<TheOneApiResponse<Movie> | ErrorResponse> {
    const res = await this._request<Movie>({
      method: 'GET',
      resource: '/movie',
      ...input,
    });

    if (res.status !== '200') {
      return res as ErrorResponse;
    }

    return res!.body!;
  }

  async getMovie({
    movieId,
    ...input
  }: GetMovieOptions): Promise<Movie | ErrorResponse> {
    const resource = ENDPOINTS.GET.getMovie(movieId);

    const res = await this._request<Movie>({
      method: 'GET',
      resource,
      ...input,
    });

    if (res.status !== '200') {
      return res as ErrorResponse;
    }

    return res!.body!.docs[0];
  }

  async getMovieQuotes({
    movieId,
    ...input
  }: GetMovieQuotesOptions): Promise<TheOneApiResponse<Quote> | ErrorResponse> {
    const resource = ENDPOINTS.GET.getMovieQuotes(movieId);

    const res = await this._request<Quote>({
      method: 'GET',
      resource,
      ...input,
    });

    if (res.status !== '200') {
      return res as ErrorResponse;
    }

    return res!.body!;
  }
}
