import { ROLES } from "common/types/role.enum";
import { GetServerSideProps, GetServerSidePropsContext } from "next";
import { checkAuthAndReturnUserId } from "proxy/fetches/authApi";
import { getUserRole } from "proxy/fetches/fetchUser";

export function requireAuthentication(gssp: GetServerSideProps) {
  return async (ctx: GetServerSidePropsContext) => {
    const { req } = ctx;

    const refreshToken = req?.cookies?.refreshToken || "";
    const accessToken = req?.cookies?.accessToken || "";

    const userId = (await checkAuthAndReturnUserId(refreshToken)) || null;

    if (!userId) {
      return {
        redirect: {
          permanent: false,
          destination: "/login",
        },
      };
    }

    if (req.url?.includes("admin") && accessToken) {
      const role = await getUserRole(userId, accessToken);

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
