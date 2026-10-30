
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
  ImagePlus,
  Leaf,
  Loader2,
  LockKeyhole,
  Mail,
  UserRound,
  Check,
  X,
} from "lucide-react";
import { toast } from "sonner";
import { authClient } from "@/lib/auth-client";

export default function RegisterPage() {
  const router = useRouter();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [photoURL, setPhotoURL] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const hasUppercase = /[A-Z]/.test(password);
  const hasLowercase = /[a-z]/.test(password);
  const hasMinLength = password.length >= 6;

  const passwordValid =
    hasUppercase && hasLowercase && hasMinLength;

  const handleRegister = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!name.trim() || !email.trim() || !password) {
      toast.error("Please fill in all required fields.");
      return;
    }

    if (!passwordValid) {
      toast.error(
        "Password must contain uppercase, lowercase letters and at least 6 characters.",
      );
      return;
    }

    if (photoURL.trim()) {
      try {
        const parsedURL = new URL(photoURL.trim());

        if (!["http:", "https:"].includes(parsedURL.protocol)) {
          toast.error("Please enter a valid photo URL.");
          return;
        }
      } catch {
        toast.error("Please enter a valid photo URL.");
        return;
      }
    }

    try {
      setLoading(true);

      const { error } = await authClient.signUp.email({
        name: name.trim(),
        email: email.trim(),
        password,
        image: photoURL.trim() || undefined,
      });

      if (error) {
        toast.error(error.message || "Registration failed.");
        return;
      }

      toast.success("Account created successfully! Welcome to GoodTogether.");
      router.push("/");
      router.refresh();
    } catch {
      toast.error("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="relative flex min-h-screen items-center justify-center overflow-hidden bg-background px-5 py-12 sm:px-8">
      {/* Background decoration */}
      <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
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

        <div className="grid overflow-hidden rounded-[32px] border border-forest/10 bg-card shadow-2xl shadow-forest/10 dark:border-white/10 lg:grid-cols-2">
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
                Join our community
              </span>

              <h1 className="mt-7 text-4xl font-black uppercase leading-[1.05] text-white xl:text-5xl">
                Be part of something{" "}
                <span className="text-lime">good.</span>
              </h1>

              <p className="mt-6 max-w-sm text-sm leading-8 text-on-forest/75">
                Create your account, meet inspiring people, discover volunteer
                opportunities, and help build a kinder community.
              </p>
            </div>

            <p className="relative text-xs font-semibold tracking-wide text-on-forest/50">
              Your time matters. Your kindness makes a difference.
            </p>
          </div>

          {/* Register form */}
          <div className="flex items-center justify-center px-6 py-10 sm:px-10 sm:py-12 xl:px-14">
            <div className="w-full max-w-[390px]">
              <Link href="/" className="mb-7 flex items-center gap-3 lg:hidden">
                <span className="grid h-11 w-11 place-items-center rounded-xl bg-forest text-lime dark:bg-lime dark:text-forest">
                  <HeartHandshake size={25} />
                </span>
                <span className="text-xl font-black text-foreground">
                  Good<span className="text-forest dark:text-lime">Together</span>
                </span>
              </Link>

              <div>
                <p className="text-xs font-black uppercase tracking-[2.5px] text-forest dark:text-lime">
                  Start making a difference
                </p>

                <h2 className="mt-3 text-3xl font-black tracking-tight text-foreground sm:text-4xl">
                  Create account
                </h2>

                <p className="mt-3 text-sm leading-7 text-muted-foreground">
                  Join GoodTogether and make your kindness count.
                </p>
              </div>

              <form onSubmit={handleRegister} className="mt-7 space-y-4">
                {/* Name */}
                <div>
                  <label
                    htmlFor="name"
                    className="mb-2 block text-sm font-bold text-foreground"
                  >
                    Full name
                  </label>

                  <div className="relative">
                    <UserRound
                      size={18}
                      className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground"
                    />

                    <input
                      id="name"
                      type="text"
                      autoComplete="name"
                      placeholder="Your full name"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      required
                      className="h-12 w-full rounded-xl border border-forest/15 bg-background pl-11 pr-4 text-sm text-foreground outline-none transition placeholder:text-muted-foreground/60 focus:border-forest focus:ring-4 focus:ring-forest/10 dark:border-white/10 dark:focus:border-lime dark:focus:ring-lime/10"
                    />
                  </div>
                </div>

                {/* Email */}
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

                {/* Photo URL */}
                <div>
                  <label
                    htmlFor="photoURL"
                    className="mb-2 block text-sm font-bold text-foreground"
                  >
                    Photo URL{" "}
                    <span className="font-normal text-muted-foreground">
                      (Optional)
                    </span>
                  </label>

                  <div className="relative">
                    <ImagePlus
                      size={18}
                      className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground"
                    />

                    <input
                      id="photoURL"
                      type="url"
                      placeholder="https://example.com/photo.jpg"
                      value={photoURL}
                      onChange={(e) => setPhotoURL(e.target.value)}
                      className="h-12 w-full rounded-xl border border-forest/15 bg-background pl-11 pr-4 text-sm text-foreground outline-none transition placeholder:text-muted-foreground/60 focus:border-forest focus:ring-4 focus:ring-forest/10 dark:border-white/10 dark:focus:border-lime dark:focus:ring-lime/10"
                    />
                  </div>
                </div>

                {/* Password */}
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
                      autoComplete="new-password"
                      placeholder="Create a password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                      className="h-12 w-full rounded-xl border border-forest/15 bg-background pl-11 pr-12 text-sm text-foreground outline-none transition placeholder:text-muted-foreground/60 focus:border-forest focus:ring-4 focus:ring-forest/10 dark:border-white/10 dark:focus:border-lime dark:focus:ring-lime/10"
                    />

                    <button
                      type="button"
                      aria-label={showPassword ? "Hide password" : "Show password"}
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground transition hover:text-foreground"
                    >
                      {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                    </button>
                  </div>

                  <div className="mt-3 space-y-2 rounded-xl bg-muted/60 p-3 dark:bg-muted/30">
                    <p className="mb-2 text-[10px] font-black uppercase tracking-[1.5px] text-muted-foreground">
                      Password requirements
                    </p>

                    <p className="flex items-center gap-2 text-xs">
                      {hasUppercase ? (
                        <Check size={14} className="text-green-600" />
                      ) : (
                        <X size={14} className="text-muted-foreground" />
                      )}
                      <span className={hasUppercase ? "text-green-600" : "text-muted-foreground"}>
                        At least one uppercase letter (A-Z)
                      </span>
                    </p>

                    <p className="flex items-center gap-2 text-xs">
                      {hasLowercase ? (
                        <Check size={14} className="text-green-600" />
                      ) : (
                        <X size={14} className="text-muted-foreground" />
                      )}
                      <span className={hasLowercase ? "text-green-600" : "text-muted-foreground"}>
                        At least one lowercase letter (a-z)
                      </span>
                    </p>

                    <p className="flex items-center gap-2 text-xs">
                      {hasMinLength ? (
                        <Check size={14} className="text-green-600" />
                      ) : (
                        <X size={14} className="text-muted-foreground" />
                      )}
                      <span className={hasMinLength ? "text-green-600" : "text-muted-foreground"}>
                        At least 6 characters
                      </span>
                    </p>
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="flex h-13 w-full items-center justify-center gap-2 rounded-xl bg-forest px-5 text-sm font-black uppercase tracking-[1.3px] text-lime shadow-lg shadow-forest/15 transition duration-300 hover:-translate-y-0.5 hover:bg-forest-mid hover:shadow-xl disabled:cursor-not-allowed disabled:opacity-60 dark:bg-lime dark:text-forest dark:hover:bg-lime-bright"
                >
                  {loading ? (
                    <>
                      <Loader2 size={18} className="animate-spin" />
                      Creating account...
                    </>
                  ) : (
                    <>
                      Create account
                      <ArrowRight size={17} />
                    </>
                  )}
                </button>
              </form>

              <p className="mt-7 text-center text-sm text-muted-foreground">
                Already have an account?{" "}
                <Link
                  href="/login"
                  className="font-black text-forest underline-offset-4 transition hover:underline dark:text-lime"
                >
                  Sign in
                </Link>
              </p>

              <p className="mt-6 text-center text-xs leading-6 text-muted-foreground/70">
                Join a community where every small act of kindness matters.
              </p>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
