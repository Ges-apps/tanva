import {
  LoginLink,
  RegisterLink,
} from "@kinde-oss/kinde-auth-nextjs/components";

export default function HomePage() {
  return (
    <main className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-[#0b0f17] px-4">
      <div className="w-full max-w-md">

        <div className="text-center mb-8">
          <img
            src="/tanva-logo.png"
            alt="Tanva"
            className="w-40 h-auto mx-auto mb-6"
          />

          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
            Welcome to Tanva
          </h1>

          <p className="mt-2 text-gray-500 dark:text-gray-400">
            Track your nutrition, understand your habits.
          </p>
        </div>

        <div className="bg-white dark:bg-[#111827] rounded-2xl p-6 shadow-xl border border-gray-200 dark:border-gray-800">

          <LoginLink className="w-full flex items-center justify-center rounded-xl bg-emerald-600 px-4 py-3 font-medium text-white hover:bg-emerald-700 transition">
            ورود
          </LoginLink>

          <RegisterLink className="w-full flex items-center justify-center rounded-xl border border-gray-300 dark:border-gray-700 px-4 py-3 mt-3 font-medium text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-800 transition">
            ثبت نام
          </RegisterLink>

        </div>

      </div>
    </main>
  );
}