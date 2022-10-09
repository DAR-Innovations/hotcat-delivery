import { LoginDTO } from "common/dto/LoginDTO";
import { RegistrationDTO } from "common/dto/RegistrationDTO";
import Cookies from "js-cookie";
import AuthService from "services/AuthService";
import { setAuth } from "store/slices/authSlice";
import { AppDispatch } from "store/store";

export const getAccessAndRefreshToken = () => {
  const accessToken = Cookies.get("accessToken");
  const refreshToken = Cookies.get("refreshToken");

  return { accessToken, refreshToken };
};

export const loginUser = async (dispatch: AppDispatch, loginDTO: LoginDTO) => {
  try {
    const response = await AuthService.login(loginDTO);

    Cookies.set("accessToken", response.data.accessToken, {
      sameSite: "Strict",
    });
    Cookies.set("refreshToken", response.data.refreshToken, {
      sameSite: "Strict",
    });

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
    Cookies.set("accessToken", response.data.accessToken, {
      sameSite: "Strict",
    });
    Cookies.set("refreshToken", response.data.refreshToken, {
      sameSite: "Strict",
    });
    dispatch(setAuth({ isAuth: true, userId: response.data.userId }));
    return true;
  } catch (error: any) {
    console.log(error?.message);
    return false;
  }
};

export const logoutUser = async (dispatch: AppDispatch) => {
  try {
    Cookies.remove("accessToken");
    Cookies.remove("refreshToken");
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
    Cookies.set("accessToken", response.data.accessToken, {
      sameSite: "Strict",
    });
    Cookies.set("refreshToken", response.data.refreshToken, {
      sameSite: "Strict",
    });
    dispatch(setAuth({ isAuth: true, userId: response.data.userId }));
  } catch (error: any) {
    console.log(error?.message);
  }
};
