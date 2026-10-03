"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function NotFound() {
  const router = useRouter();
  const [countdown, setCountdown] = useState(10);

  useEffect(() => {
    const timer = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          router.push("/");
          return 0;
        }

        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [router]);

  return (
    <main className="relative min-h-screen overflow-hidden bg-[#0b0f17]">
      <Image
        src="/404-gym.jpg"
        alt="404"
        fill
        priority
        className="object-cover object-center"
      />

      <div className="absolute inset-0 bg-black/45" />

      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-black/20" />

      <div className="relative z-10 flex min-h-screen items-end justify-center px-6 pb-12 text-center">
        <div className="max-w-xl">

          <p className="mt-3 text-white/80">
            صفحه‌ای که به دنبال آن هستید وجود ندارد.
          </p>

          <p className="mt-6 text-sm text-white/80">
            انتقال به صفحه اصلی در{" "}
            <span className="font-bold text-emerald-400">
              {countdown}
            </span>{" "}
            ثانیه...
          </p>

          <Link
            href="/"
            className="mt-5 inline-flex rounded-xl bg-emerald-500 px-6 py-3 font-semibold text-white transition hover:bg-emerald-600"
          >
            بازگشت به خانه
          </Link>
        </div>
      </div>
    </main>
  );
}