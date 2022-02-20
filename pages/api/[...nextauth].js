import NextAuth from "next-auth"

export default NextAuth({
  callbacks:{
    session({session,user,token}) {
      return session
    }
  }
})