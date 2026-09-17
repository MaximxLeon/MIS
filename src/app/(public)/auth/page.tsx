// app/auth/page.tsx
import { AuthPage } from "@/features/auth/ui";
import Image from "next/image";

export default function Page() {
  return (
    <main className="flex min-h-dvh items-start justify-center bg-bg p-0 md:items-center md:p-4">
      <div className="flex min-h-dvh w-full flex-col overflow-hidden bg-card shadow md:min-h-[75dvh] md:max-w-2xl md:rounded-2xl lg:w-[65vw] lg:max-w-6xl lg:flex-row">
        <section className="relative hidden w-full lg:block lg:w-1/2">
          <Image
            src="/assets/authHD.png"
            alt="AuthLogo"
            fill
            priority
            sizes="50vw"
            className="object-contain p-8"
          />
        </section>

        <section className="flex w-full flex-1 items-start justify-center p-6 pt-8 sm:p-10 lg:w-1/2 lg:items-center lg:p-8">
          <AuthPage />
        </section>
      </div>
    </main>
  );
}
