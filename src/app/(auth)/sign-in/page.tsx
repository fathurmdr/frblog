import { getProviders } from "next-auth/react";
import Link from "next/link";
import SignInButton from "@/components/SignInButton";

export default async function SignIn({
  searchParams,
}: {
  searchParams: { [key: string]: string | undefined };
}) {
  const providers = await getProviders();

  function getError() {
    const { error } = searchParams;
    if (error?.includes("try")) {
      const availableProvider = error.split("-")[1];

      return `You already have an account with ${availableProvider}. Try signing in with ${availableProvider}.`;
    }
    return "";
  }

  return (
    <main className="flex h-screen w-full flex-col items-center justify-center bg-white-2">
      <h1 className="mb-4 text-center text-4xl font-semibold italic text-black">
        <Link href="/">FR Blog</Link>
      </h1>
      <div className="flex w-full min-w-80 max-w-sm flex-col gap-3 p-6 sm:w-fit">
        {providers &&
          Object.values(providers).map((provider) => (
            <SignInButton key={provider.id} provider={provider} />
          ))}
        <span className="text-center text-sm text-meta-1">{getError()}</span>
      </div>
    </main>
  );
}
