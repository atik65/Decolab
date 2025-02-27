import axios from "axios";
import CredentialsProvider from "next-auth/providers/credentials";
import { Session, User, Account, Profile } from "next-auth";
import { JWT } from "next-auth/jwt";
/**
 * Takes a token and returns a new token with updated
 * `accessToken` and `accessTokenExpires`. If an error occurs,
 * returns the old token and an error property
 */

interface Token {
  accessToken: string;
  accessTokenExpires?: number; // this is optional
  refreshToken: string;
}

interface Credentials {
  email: string;
  password: string;
}

interface SigninData {
  email: string;
  password: string;
}

async function refreshAccessToken(token: Token) {
  try {
    //refresh token API URL
    const url = `${process.env.NEXT_PUBLIC_API_URL}/dj-rest-auth/token/refresh/`;
    const response = await axios.post(url, { refresh: token.refreshToken });
    const refreshedTokens = response.data;

    // console.log("refreshedTokens :>> ", refreshedTokens);

    if (response.status === 200) {
      return {
        ...token,
        accessToken: refreshedTokens.access,
        // accessTokenExpires: Date.now() + 1 * 1000,
        refreshToken: refreshedTokens.refresh || token.refreshToken,
      };
    } else {
      throw refreshedTokens;
    }

    // if (response.status !== 200) {
    //   throw refreshedTokens;
    // }

    // return {
    //   ...token,
    //   accessToken: refreshedTokens.access,
    //   // accessTokenExpires: Date.now() + 1 * 1000,
    //   refreshToken: refreshedTokens.refresh_token ?? token.refreshToken, // Fall back to old refresh token
    // };
  } catch (error) {
    // console.log("error in refresh token :>> ", error);
    // console.log(error.message)
    // console.log(111);

    return {
      ...token,
      error: "RefreshAccessTokenError",
    };
  }
}

export const authOptions = {
  session: {
    strategy: "jwt",
  },

  pages: {
    signIn: "/login",
  },

  providers: [
    CredentialsProvider({
      credentials: {
        email: {},
        password: {},
      },
      async authorize(
        credentials: Record<"email" | "password", string> | undefined,
        req: any
      ) {
        if (!credentials) {
          throw new Error("Credentials not found");
        }

        const { email, password } = credentials;

        try {
          const res = await axios.post(
            `${process.env.NEXT_PUBLIC_API_URL}/login/`,
            {
              phone_or_email: email,
              password: password,
            }
          );
          // console.log("res from auth handler :>> ", res.data);

          const user = res.data;

          // console.log("user :>> ", user);

          if (user) {
            return user;
          }

          // return null;
        } catch (err: any) {
          console.log("err in log in :>> ", err?.response);
          throw new Error(err?.response?.data?.error || "Login Failed");
          //   return null;
        }
      },
    }),
  ],

  callbacks: {
    async signIn(data: {
      user: User;
      account: Account;
      credentials?: Record<string, string>;
      profile?: Profile;
    }): Promise<boolean> {
      const { user, account, credentials, profile } = data;

      // console.log("data from sign in callback :>> ", data);

      if (account.provider === "credentials") {
        return !!user; // Return true if user exists
      }
      return false;
    },

    async jwt({ token, user, account }: any) {
      //   console.log("token from jwt callback :>> ", token);
      //   console.log("user from jwt callback :>> ", user);

      if (user && account?.provider === "credentials") {
        // token = user;
        return {
          accessToken: user?.access,
          refreshToken: user?.refresh,
          user: user,
        };
      }
      return await refreshAccessToken(token);
      // return token;
    },

    async session({ session, token }: any) {
      // console.log("session from session callback :>> ", session);
      // console.log("token from session callback :>> ", token);
      session = token;
      token.user.access_token = token.accessToken;
      session.user = token.user;

      session.accessToken = token.accessToken;
      session.error = token.error;

      // console.log("session form session callback :>> ", session);
      return session;
    },
  },
};
