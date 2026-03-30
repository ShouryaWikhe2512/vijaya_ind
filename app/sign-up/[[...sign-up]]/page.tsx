import { SignUp } from "@clerk/nextjs";

export default function SignUpPage() {
  return (
    <main className="min-h-screen bg-muted flex items-center justify-center px-4 py-10">
      <SignUp signInUrl="/sign-in" fallbackRedirectUrl="/" />
    </main>
  );
}
