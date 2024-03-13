"use client";

import { signIn } from "next-auth/react";
import Image from "next/image";
import { useState } from "react";

interface SignInButtonProps {
  provider: {
    id: string;
    name: string;
  };
}

export default function SignInButton({ provider }: SignInButtonProps) {
  const [loading, setLoading] = useState(false);

  function getIconSignIn(providerName: string) {
    switch (providerName) {
      case "GitHub":
        return (
          <Image
            src="/assets/icons/github.svg"
            alt="github"
            width={30}
            height={30}
          />
        );
      case "Google":
        return (
          <Image
            src="/assets/icons/google.svg"
            alt="google"
            width={30}
            height={30}
          />
        );

      default:
        break;
    }
  }

  function onSignIn() {
    setLoading(true);
    signIn(provider.id, {
      callbackUrl: "/",
    }).finally(() => {
      setLoading(false);
    });
  }

  return (
    <button
      onClick={onSignIn}
      className="flex items-center gap-3 rounded-md border border-stone-400 bg-white px-4 py-3 font-medium text-black"
    >
      {getIconSignIn(provider.name)}
      <span>{loading ? "Loading..." : `Sign in with ${provider.name}`}</span>
    </button>
  );
}
