import { LoginDTO } from "common/dto/LoginDTO";
import { RegistrationDTO } from "common/dto/RegistrationDTO";
import AuthService from "services/AuthService";
import { setAuth } from "store/slices/authSlice";
import { AppDispatch, useAppDispatch } from "store/store";

export const loginUser = async (dispatch: AppDispatch, loginDTO: LoginDTO) => {
  try {
    const response = await AuthService.login(loginDTO);
    localStorage.setItem("accessToken", response.data.accessToken);
    localStorage.setItem("refreshToken", response.data.refreshToken);
    dispatch(setAuth({ isAuth: true, userId: response.data.userId }));
    return true;
  } catch (error: any) {
    console.log(error?.message);
    return false;
  }
};

export const registerUser = async (
  dispatch: AppDispatch,
  registerDTO: RegistrationDTO
) => {
  try {
    const response = await AuthService.registration(registerDTO);
    localStorage.setItem("accessToken", response.data.accessToken);
    localStorage.setItem("refreshToken", response.data.refreshToken);
    dispatch(setAuth({ isAuth: true, userId: response.data.userId }));
    return true;
  } catch (error: any) {
    console.log(error?.message);
    return false;
  }
};

export const logoutUser = async (dispatch: AppDispatch) => {
  try {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
    dispatch(setAuth({ isAuth: false, userId: null }));
    return true;
  } catch (error: any) {
    console.log(error?.message);
    return false;
  }
};

export const checkAuth = async (
  dispatch: AppDispatch,
  refreshToken: string
) => {
  try {
    const response = await AuthService.checkOrRefreshToken(refreshToken);
    localStorage.setItem("accessToken", response.data.accessToken);
    localStorage.setItem("refreshToken", response.data.refreshToken);
    dispatch(setAuth({ isAuth: true, userId: response.data.userId }));
  } catch (error: any) {
    console.log(error?.message);
  }
};
