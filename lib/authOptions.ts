import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";

export const authOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
      authorization: {
        url: "https://accounts.google.com/o/oauth2/v2/auth",
        params: {
          scope: "openid email profile https://www.googleapis.com/auth/calendar",
          access_type: "offline", // Ensures refresh token is returned
          prompt: "consent", // Forces user to select an account every time
        },
      },
    }),
  ],
  callbacks: {
    async signIn({ user, account, profile }:any) {
      console.log("User signed in:", user);
        console.log("Account:", account);
        console.log("Profile:", profile);

        user.accessToken = account.access_token;


      return true;
    },
    async jwt({ token, user , trigger , session }:any) {
  
        if (user) {
          token.user = user;
        }
        return token;
      },
    async session({ session, token }:any) {
        session.user = token.user;
      return session;
    },
  },
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
