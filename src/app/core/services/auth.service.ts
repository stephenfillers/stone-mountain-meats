import { Injectable, signal } from '@angular/core';

import {
  CognitoIdentityProviderClient,
  InitiateAuthCommand,
  AuthFlowType,
  AuthenticationResultType,
} from '@aws-sdk/client-cognito-identity-provider';
import { environment } from '../../../environments/environment';

export interface AuthTokens {
  idToken: string;
  accessToken: string;
  refreshToken: string;
}

const TOKEN_KEY = 'auth_tokens';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  authEnv = environment.auth;
  isAuthenticated = signal(false);

  private userPoolId = this.authEnv.userPoolId;
  private clientId = this.authEnv.clientId;
  private region = this.authEnv.region;

  private client = new CognitoIdentityProviderClient({ region: this.region });

  /**
   * Signs in a user using AWS Cognito.
   * @param username - The user's username.
   * @param password - The user's password.
   * @returns The authentication result or error.
   */
  async signIn(username: string, password: string): Promise<AuthTokens> {
    const command = new InitiateAuthCommand({
      AuthFlow: AuthFlowType.USER_PASSWORD_AUTH,
      ClientId: this.clientId,
      AuthParameters: {
        USERNAME: username,
        PASSWORD: password,
      },
    });

    try {
      const response = await this.client.send(command);
      const authResult = response.AuthenticationResult;

      if (
        authResult &&
        typeof authResult.IdToken === 'string' &&
        typeof authResult.AccessToken === 'string' &&
        typeof authResult.RefreshToken === 'string'
      ) {
        return {
          idToken: authResult.IdToken,
          accessToken: authResult.AccessToken,
          refreshToken: authResult.RefreshToken,
        };
      } else {
        throw new Error('Authentication succeeded but tokens are missing.');
      }
    } catch (error) {
      throw error;
    }
  }

  setTokens(tokens: AuthTokens): void {
    localStorage.setItem(TOKEN_KEY, JSON.stringify(tokens));
    this.isAuthenticated.set(true);
  }

  getTokens(): AuthTokens | null {
    const raw = localStorage.getItem(TOKEN_KEY);
    return raw ? (JSON.parse(raw) as AuthTokens) : null;
  }

  /**
   * Remove tokens and update auth state.
   */
  clearTokens(): void {
    localStorage.removeItem(TOKEN_KEY);
    this.isAuthenticated.set(false);
  }
}
