import { ROLES } from "common/types/role.enum";
import { GetServerSideProps, GetServerSidePropsContext } from "next";
import {
  checkAuthAndReturnUserId,
  getRefrechedAccessAndRefreshToken,
} from "proxy/fetches/authApi";
import { getUserRole } from "proxy/fetches/fetchUser";

export function requireAuthentication(gssp: GetServerSideProps) {
  return async (ctx: GetServerSidePropsContext) => {
    const { req } = ctx;

    const refreshToken = req?.cookies?.refreshToken || "";

    const { accessToken: newAccessToken, refreshToken: newRefreshToken } =
      await getRefrechedAccessAndRefreshToken(refreshToken);

    const userId = (await checkAuthAndReturnUserId(newRefreshToken)) || null;

    if (!userId) {
      return {
        redirect: {
          permanent: false,
          destination: "/login",
        },
      };
    }

    if (req.url?.includes("admin") && newAccessToken) {
      const role = await getUserRole(userId, newAccessToken);

      if (role !== "ADMIN") {
        return {
          redirect: {
            permanent: true,
            destination: "/",
          },
        };
      }
    }

    return await gssp(ctx);
  };
}
