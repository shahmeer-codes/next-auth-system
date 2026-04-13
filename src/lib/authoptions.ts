import connectdb from "@/lib/db.connect";
import user from "@/model/user";
import bcrypt from "bcryptjs";
import { NextAuthOptions } from "next-auth";
import CredentialsProvider  from "next-auth/providers/credentials";
const authOptions: NextAuthOptions = {
  providers: [
     CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials,req){
        const email=credentials?.email
        const password=credentials?.password
        if(!email || !password){
            throw Error("username or email not found")
        }
        await connectdb()
        const exist_user=await user.findOne({email})
        if(!exist_user){
            throw Error("user does not exist")
        }
        const pwd_is_match= await bcrypt.compare(password,exist_user.password)
        if(!pwd_is_match){
            throw Error("wrong password")
        }
        return {
            id:exist_user._id.toString(),
            name:exist_user.name,
            email:exist_user.email,
            image:exist_user.image
        }
      }
    })
  ],
  callbacks:{
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.name = user.name;
        token.email = user.email;
        token.image = user.image;
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.id as string;
        session.user.name = token.name as string;
        session.user.email = token.email as string;
        session.user.image = token.image as string;
      }
      return session;
    }},
  session:{
    strategy:"jwt",//what strategy should i used to save in that case i use jwt
    maxAge:1000*60*60*24*30  //session expire time (ms,s,min,hour,days)
  },
  pages:{
    signIn:"/login", //which page for login
    error:"/login"   //after error i go to which page
  },
  secret:process.env.NEXT_SECRET_KEY //any secret key that combine with password for encryption
};

export default authOptions;