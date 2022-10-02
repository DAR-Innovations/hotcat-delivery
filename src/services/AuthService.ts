import axios, { AxiosResponse } from "axios";
import { AuthDTO } from "common/dto/AuthDTO";
import { LoginDTO } from "common/dto/LoginDTO";
import { RegistrationDTO } from "common/dto/RegistrationDTO";
import { API_URL } from "proxy";

export default class AuthService {
  static async login(loginDTO: LoginDTO): Promise<AxiosResponse<AuthDTO>> {
    return axios.post<AuthDTO>(`${API_URL}/auth/login`, loginDTO, {
      withCredentials: true,
    });
  }

  static async registration(
    registrationDTO: RegistrationDTO
  ): Promise<AxiosResponse<AuthDTO>> {
    return axios.post<AuthDTO>(`${API_URL}/auth/register`, registrationDTO, {
      withCredentials: true,
    });
  }

  static async logout(): Promise<void> {}

  static async checkOrRefreshToken(
    refreshToken: string
  ): Promise<AxiosResponse<AuthDTO>> {
    return axios.post<AuthDTO>(
      `${API_URL}/auth/token`,
      {
        refreshToken: refreshToken,
      },
      { withCredentials: true }
    );
  }
}
