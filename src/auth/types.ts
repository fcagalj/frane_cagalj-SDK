export interface AuthHeader {
  Authorization: string;
}

export abstract class AuthClient {
  abstract getAuthHeader(
    url?: string,
    method?: string,
  ): Promise<AuthHeader> | AuthHeader;
}
