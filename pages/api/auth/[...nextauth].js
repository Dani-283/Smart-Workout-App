import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import config from "src/config";

const options = {
  providers: [
    GoogleProvider({
      clientId: config.googleId,
      clientSecret: config.googleSecret,
    }),
  ],
  debug: false,
};

export default (req, res) => NextAuth(req, res, options);
