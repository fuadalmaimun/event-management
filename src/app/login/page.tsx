"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  ArrowLeft,
  ArrowRight,
  Eye,
  EyeOff,
  HeartHandshake,
  Leaf,
  Loader2,
  LockKeyhole,
  Mail,
} from "lucide-react";
import { authClient } from "@/lib/auth-client";
import { toast } from "sonner";

export default function LoginPage() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [googleLoading, setGoogleLoading] = useState(false);

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!email.trim() || !password) {
      toast.error("Please enter your email and password.");
      return;
    }

    try {
      setLoading(true);

      const { error } = await authClient.signIn.email({
        email: email.trim(),
        password,
      });

      if (error) {
        toast.error("Invalid email or password.");
        return;
      }

      toast.success("Welcome back! Login successful.");
      router.push("/");
      router.refresh();
    } catch {
      toast.error("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
    try {
      setGoogleLoading(true);

      await authClient.signIn.social({
        provider: "google",
        callbackURL: "/",
      });
    } catch {
      toast.error("Google login failed. Please try again.");
      setGoogleLoading(false);
    }
  };

  return (
    <main className="relative flex min-h-screen items-center justify-center overflow-hidden bg-background px-5 py-12 sm:px-8">
      {/* Background decoration */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 overflow-hidden"
      >
        <div className="absolute -left-40 -top-40 h-96 w-96 rounded-full bg-lime/15 blur-3xl" />
        <div className="absolute -bottom-40 -right-40 h-96 w-96 rounded-full bg-forest/10 blur-3xl dark:bg-lime/10" />
        <div className="gt-dots absolute right-10 top-10 hidden h-40 w-40 opacity-40 sm:block" />
      </div>

      <div className="relative z-10 w-full max-w-[1050px]">
        <Link
          href="/"
          className="mb-8 inline-flex items-center gap-2 text-sm font-bold text-muted-foreground transition hover:text-forest dark:hover:text-lime"
        >
          <ArrowLeft size={17} />
          Back to home
        </Link>

        <div className="gt-enter grid overflow-hidden rounded-[32px] border border-forest/10 bg-card shadow-2xl shadow-forest/10 dark:border-white/10 lg:grid-cols-2">
          {/* Left panel */}
          <div className="relative hidden flex-col justify-between overflow-hidden bg-forest p-10 text-on-forest lg:flex xl:p-14">
            <div aria-hidden className="absolute inset-0">
              <div className="gt-grid absolute inset-0 opacity-70" />
              <div className="absolute -right-20 -top-20 h-72 w-72 rounded-full border-[30px] border-lime/10" />
              <div className="absolute -bottom-20 -left-20 h-72 w-72 rounded-full border-[30px] border-lime/10" />
            </div>

            <Link href="/" className="relative flex items-center gap-3">
              <span className="grid h-12 w-12 place-items-center rounded-2xl bg-lime text-forest">
                <HeartHandshake size={27} />
              </span>
              <span className="text-2xl font-black tracking-tight text-white">
                Good<span className="text-lime">Together</span>
              </span>
            </Link>

            <div className="relative py-12">
              <span className="inline-flex items-center gap-2 rounded-full bg-lime/15 px-4 py-2 text-[10px] font-black uppercase tracking-[2px] text-lime ring-1 ring-lime/25">
                <Leaf size={14} />
                Welcome back
              </span>

              <h1 className="mt-7 text-4xl font-black uppercase leading-[1.05] text-white xl:text-5xl">
                Good things happen <span className="text-lime">together.</span>
              </h1>

              <p className="mt-6 max-w-sm text-sm leading-8 text-on-forest/75">
                Your community is waiting. Sign in to discover opportunities,
                connect with volunteers, and continue making a difference.
              </p>
            </div>

            <p className="relative text-xs font-semibold tracking-wide text-on-forest/50">
              Small actions. Big changes. A better world.
            </p>
          </div>

          {/* Login form */}
          <div className="flex items-center justify-center px-6 py-10 sm:px-10 sm:py-14 xl:px-14">
            <div className="w-full max-w-[390px]">
              <Link href="/" className="mb-8 flex items-center gap-3 lg:hidden">
                <span className="grid h-11 w-11 place-items-center rounded-xl bg-forest text-lime dark:bg-lime dark:text-forest">
                  <HeartHandshake size={25} />
                </span>
                <span className="text-xl font-black text-foreground">
                  Good
                  <span className="text-forest dark:text-lime">Together</span>
                </span>
              </Link>

              <div>
                <p className="text-xs font-black uppercase tracking-[2.5px] text-forest dark:text-lime">
                  Your community awaits
                </p>

                <h2 className="mt-3 text-3xl font-black tracking-tight text-foreground sm:text-4xl">
                  Welcome back!
                </h2>

                <p className="mt-3 text-sm leading-7 text-muted-foreground">
                  Sign in to your account and keep spreading kindness.
                </p>
              </div>

              <form onSubmit={handleLogin} className="mt-8 space-y-5">
                <div>
                  <label
                    htmlFor="email"
                    className="mb-2 block text-sm font-bold text-foreground"
                  >
                    Email address
                  </label>

                  <div className="relative">
                    <Mail
                      size={18}
                      className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground"
                    />

                    <input
                      id="email"
                      type="email"
                      autoComplete="email"
                      placeholder="you@example.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                      className="h-12 w-full rounded-xl border border-forest/15 bg-background pl-11 pr-4 text-sm text-foreground outline-none transition placeholder:text-muted-foreground/60 focus:border-forest focus:ring-4 focus:ring-forest/10 dark:border-white/10 dark:focus:border-lime dark:focus:ring-lime/10"
                    />
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="password"
                    className="mb-2 block text-sm font-bold text-foreground"
                  >
                    Password
                  </label>

                  <div className="relative">
                    <LockKeyhole
                      size={18}
                      className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground"
                    />

                    <input
                      id="password"
                      type={showPassword ? "text" : "password"}
                      autoComplete="current-password"
                      placeholder="Enter your password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                      className="h-12 w-full rounded-xl border border-forest/15 bg-background pl-11 pr-12 text-sm text-foreground outline-none transition placeholder:text-muted-foreground/60 focus:border-forest focus:ring-4 focus:ring-forest/10 dark:border-white/10 dark:focus:border-lime dark:focus:ring-lime/10"
                    />

                    <button
                      type="button"
                      aria-label={
                        showPassword ? "Hide password" : "Show password"
                      }
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground transition hover:text-foreground"
                    >
                      {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                    </button>
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={loading || googleLoading}
                  className="flex h-13 w-full items-center justify-center gap-2 rounded-xl bg-forest px-5 text-sm font-black uppercase tracking-[1.3px] text-lime shadow-lg shadow-forest/15 transition duration-300 hover:-translate-y-0.5 hover:bg-forest-mid hover:shadow-xl disabled:cursor-not-allowed disabled:opacity-60 dark:bg-lime dark:text-forest dark:hover:bg-lime-bright"
                >
                  {loading ? (
                    <>
                      <Loader2 size={18} className="animate-spin" />
                      Signing in...
                    </>
                  ) : (
                    <>
                      Sign in
                      <ArrowRight size={17} />
                    </>
                  )}
                </button>
              </form>

              <div className="my-6 flex items-center gap-4">
                <div className="h-px flex-1 bg-border" />
                <span className="text-[10px] font-bold uppercase tracking-[2px] text-muted-foreground">
                  Or continue with
                </span>
                <div className="h-px flex-1 bg-border" />
              </div>

              <button
                type="button"
                onClick={handleGoogleLogin}
                disabled={loading || googleLoading}
                className="flex h-13 w-full items-center justify-center gap-3 rounded-xl border border-forest/15 bg-background text-sm font-bold text-foreground transition hover:border-forest/40 hover:bg-muted/50 disabled:cursor-not-allowed disabled:opacity-60 dark:border-white/10 dark:hover:border-lime/40"
              >
                {googleLoading ? (
                  <Loader2 size={19} className="animate-spin" />
                ) : (
                  <svg
                    viewBox="0 0 48 48"
                    className="h-5 w-5"
                    aria-hidden="true"
                  >
                    <path
                      fill="#EA4335"
                      d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5Z"
                    />
                    <path
                      fill="#4285F4"
                      d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.76 7.18l7.73 6C44.42 38.05 46.98 31.9 46.98 24.55Z"
                    />
                    <path
                      fill="#FBBC05"
                      d="M10.53 28.59A14.4 14.4 0 0 1 9.75 24c0-1.59.27-3.13.76-4.59l-7.98-6.19A23.9 23.9 0 0 0 0 24c0 3.87.93 7.52 2.56 10.78l7.97-6.19Z"
                    />
                    <path
                      fill="#34A853"
                      d="M24 48c6.48 0 11.93-2.13 15.91-5.8l-7.73-6c-2.14 1.45-4.88 2.3-8.18 2.3-6.26 0-11.57-4.22-13.46-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48Z"
                    />
                  </svg>
                )}
                Continue with Google
              </button>

              <p className="mt-8 text-center text-sm text-muted-foreground">
                Don&apos;t have an account?{" "}
                <Link
                  href="/register"
                  className="font-black text-forest underline-offset-4 transition hover:underline dark:text-lime"
                >
                  Create account
                </Link>
              </p>

              <p className="mt-8 text-center text-xs leading-6 text-muted-foreground/70">
                By continuing, you agree to be part of a community built on
                kindness.
              </p>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
