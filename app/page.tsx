'use client'



import {
  LoginLink,
  RegisterLink,
} from "@kinde-oss/kinde-auth-nextjs/components";

export default function HomePage() {
  return (
    <main
      dir="rtl"
      className="relative min-h-screen overflow-hidden bg-[#f5faf7] px-4 flex items-center justify-center dark:bg-[#070b0a]"
    >
      {/* Background Glow */}
      <div className="pointer-events-none absolute -top-40 -right-40 h-96 w-96 rounded-full bg-emerald-400/20 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-40 -left-40 h-96 w-96 rounded-full bg-green-400/10 blur-3xl" />

      <div className="relative z-10 w-full max-w-md">

        {/* Logo & Heading */}
        <div className="mb-8 text-center">
          <img
            src="/tanva-logo.png"
            alt="تانوا"
            className="mx-auto mb-5 h-auto w-36"
          />

          <h1 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-white">
            به تن وا خوش آمدید
          </h1>

        </div>

        {/* Glass Card */}
        <div
          className="
            rounded-3xl
            border border-white/70
            bg-white/55
            p-6
            shadow-[0_20px_60px_rgba(0,0,0,0.08)]
            backdrop-blur-2xl
            dark:border-white/10
            dark:bg-white/[0.06]
            dark:shadow-black/30
          "
        >
          <div className="space-y-3">

            {/* Login */}
            <LoginLink
              className="
                flex w-full items-center justify-center
                rounded-2xl
                bg-emerald-600
                px-4 py-3.5
                text-sm font-semibold
                text-white
                shadow-lg shadow-emerald-600/20
                transition-all duration-200
                hover:-translate-y-0.5
                hover:bg-emerald-700
                hover:shadow-emerald-600/30
                active:translate-y-0
              "
            >
              ورود به حساب
            </LoginLink>

            {/* Register */}
            <RegisterLink
              className="
                flex w-full items-center justify-center
                rounded-2xl
                border border-gray-200/80
                bg-white/50
                px-4 py-3.5
                text-sm font-semibold
                text-gray-700
                backdrop-blur-xl
                transition-all duration-200
                hover:-translate-y-0.5
                hover:bg-white/80
                dark:border-white/10
                dark:bg-white/[0.04]
                dark:text-gray-200
                dark:hover:bg-white/[0.08]
              "
            >
              ساخت حساب جدید
            </RegisterLink>

          </div>

        </div>

        {/* Footer */}
        <p className="mt-6 text-center text-xs text-gray-400 dark:text-gray-600">
          با تغذیه بهتر در سلامتی رو وا کن
        </p>

      </div>
    </main>
  );
}
