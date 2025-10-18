"use client";

import { useRouter } from "next/navigation";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";

export function LoginForm() {
  const router = useRouter();

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    // In a real app, you'd handle authentication here.
    // For this prototype, we'll just navigate to the dashboard.
    router.push("/dashboard");
  };

  const handleGoogleSignIn = () => {
    // In a real app, you'd trigger Firebase Google Sign-In here.
    router.push("/dashboard");
  };
  
  const GoogleIcon = (props: React.SVGProps<SVGSVGElement>) => (
    <svg role="img" viewBox="0 0 24 24" {...props}>
      <path
        fill="currentColor"
        d="M12.48 10.92v3.28h7.84c-.24 1.84-.85 3.18-1.73 4.1-1.02 1.02-2.62 1.62-4.55 1.62-3.87 0-7-3.13-7-7s3.13-7 7-7c1.93 0 3.57.72 4.9 2.02l2.35-2.34C18.16 2.51 15.65 1 12.48 1 5.83 1 1 5.83 1 12.5S5.83 24 12.48 24c4.35 0 7.84-2.73 7.84-7.65 0-.54-.05-.99-.12-1.43H12.48z"
      ></path>
    </svg>
  );

  return (
    <form onSubmit={handleSubmit}>
      <div className="grid gap-4">
        <div className="grid gap-2">
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            type="email"
            placeholder="m@example.com"
            required
            defaultValue="guest@finara.ai"
          />
        </div>
        <div className="grid gap-2">
          <div className="flex items-center">
            <Label htmlFor="password">Password</Label>
            <a
              href="#"
              className="ml-auto inline-block text-sm underline"
              onClick={(e) => e.preventDefault()}
            >
              Forgot your password?
            </a>
          </div>
          <Input id="password" type="password" required defaultValue="password" />
        </div>
        <Button type="submit" className="w-full">
          Login
        </Button>
        <Button variant="outline" className="w-full" type="button" onClick={handleGoogleSignIn}>
          <GoogleIcon className="mr-2 h-4 w-4" />
          Login with Google
        </Button>
      </div>
      <div className="mt-4 text-center text-sm">
        Don&apos;t have an account?{" "}
        <a
          href="#"
          className="underline"
          onClick={(e) => e.preventDefault()}
        >
          Sign up
        </a>
      </div>
    </form>
  );
}
