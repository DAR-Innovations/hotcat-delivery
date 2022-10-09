import { GetServerSideProps, GetServerSidePropsContext } from "next";

export function requireAuthentication(gssp: GetServerSideProps) {
  return async (ctx: GetServerSidePropsContext) => {
    const { req } = ctx;

    const accessToken = req?.cookies?.accessToken;

    if (!accessToken) {
      return {
        redirect: {
          permanent: false,
          destination: "/login",
        },
      };
    }

    return await gssp(ctx);
  };
}
