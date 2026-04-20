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
    // 🔥 LOGIN + REGISTER LOGIC
    async signIn({ user, account }) {
      const googleId = account?.providerAccountId;
      const email = user.email;

      if (!googleId) return false;

      // cek apakah sudah ada akun
      const { data: existing } = await supabase
        .from("users")
        .select("*")
        .eq("google_id", googleId)
        .single();

      let growId: string;
      let isNewUser = false;

      if (!existing) {
        // 🟢 USER BARU → AUTO REGISTER
        growId = generateGrowID(email || "");
        isNewUser = true;

        await supabase.from("users").insert([
          {
            google_id: googleId,
            email,
            grow_id: growId,
          },
        ]);
      } else {
        // 🔵 USER LAMA → LOGIN
        growId = existing.grow_id;
      }

      (user as any).growId = growId;
      (user as any).isNewUser = isNewUser;

      return true;
    },

    // 🔐 SIMPAN KE JWT
    async jwt({ token, user }) {
      if (user) {
        token.growId = (user as any).growId;
        token.isNewUser = (user as any).isNewUser;
      }
      return token;
    },

    // 📦 KIRIM KE FRONTEND
    async session({ session, token }) {
      (session.user as any).growId = token.growId;
      (session.user as any).isNewUser = token.isNewUser;
      return session;
    },

    // 🚀 REDIRECT LOGIC (INI PENTING)
    async redirect({ baseUrl, token }: any) {
      // 🟢 USER BARU → ke register/bind page
      if (token?.isNewUser) {
        return `${baseUrl}/player/growid/login/validate`;
      }

      // 🔵 USER LAMA → dashboard
      return `${baseUrl}/player/growid/login/dashboard`;
    },
  },
});

export { handler as GET, handler as POST };
