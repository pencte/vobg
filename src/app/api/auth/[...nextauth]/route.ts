import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import { supabase } from "@/lib/supabase";

function generateGrowID(email: string) {
  return "GT_" + email.split("@")[0] + "_" + Math.floor(Math.random() * 9999);
}

const handler = NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
  ],

  session: {
    strategy: "jwt",
  },

  callbacks: {
    async signIn({ user, account }) {
      const googleId = account?.providerAccountId;
      const email = user.email;

      // cek user di supabase
      const { data: existing } = await supabase
        .from("users")
        .select("*")
        .eq("google_id", googleId)
        .single();

      let growId = "";

      if (!existing) {
        growId = generateGrowID(email || "");

        await supabase.from("users").insert([
          {
            google_id: googleId,
            email,
            grow_id: growId,
          },
        ]);
      } else {
        growId = existing.grow_id;
      }

      (user as any).growId = growId;

      return true;
    },

    async jwt({ token, user }) {
      if (user?.growId) {
        token.growId = (user as any).growId;
      }
      return token;
    },

    async session({ session, token }) {
      (session.user as any).growId = token.growId;
      return session;
    },

    async redirect() {
      return "/player/growid/login/dashboard";
    },
  },
});

export { handler as GET, handler as POST };
