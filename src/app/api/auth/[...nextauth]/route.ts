import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import { supabase } from "@/lib/supabase";

function generateGrowID(email: string) {
  return (
    "GT_" +
    email.split("@")[0] +
    "_" +
    Math.floor(Math.random() * 9999)
  );
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
    // 🔥 LOGIN + AUTO REGISTER (GTPS LOGIC)
    async signIn({ user, account }) {
      const googleId = account?.providerAccountId;
      const email = user.email;

      if (!googleId) return false;

      // cek user di supabase
      const { data: existing } = await supabase
        .from("users")
        .select("*")
        .eq("google_id", googleId)
        .single();

      let growId: string;

      if (!existing) {
        // 🟢 AUTO REGISTER (SAMA KAYA REGISTER BUTTON)
        growId = generateGrowID(email || "");

        await supabase.from("users").insert([
          {
            google_id: googleId,
            email,
            grow_id: growId,
          },
        ]);
      } else {
        // 🔵 AUTO LOGIN
        growId = existing.grow_id;
      }

      (user as any).growId = growId;

      return true;
    },

    // 🔐 SIMPAN KE JWT TOKEN
    async jwt({ token, user }) {
      if (user) {
        token.growId = (user as any).growId;
      }
      return token;
    },

    // 📦 KIRIM KE FRONTEND
    async session({ session, token }) {
      (session.user as any).growId = token.growId;
      return session;
    },

    // 🚀 REDIRECT SETELAH LOGIN
    async redirect() {
      return "/player/growid/login/dashboard";
    },
  },
});

export { handler as GET, handler as POST };
