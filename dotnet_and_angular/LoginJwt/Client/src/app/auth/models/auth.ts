export interface EmailLoginDetails {
  email: string;
  password: string;
  rememberMe: boolean;
}

export interface UserDto {
  id: string;
  userName: string | null;
}

export interface LoginResponse {
  success: boolean;
  user?: UserDto;
  emailConfirmed?: boolean;
  requires2fa?: boolean;
  accessToken?: string;
  isLockedOut?: boolean;
}
