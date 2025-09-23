"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useAuth } from "@/stores/useAuth";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function Login() {
  const router = useRouter();
  const { login, init, user, initialized } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    init();
  }, [init]);

  useEffect(() => {
    if (initialized && user) {
      router.push("/"); // redirect once logged in
    }
  }, [initialized, user, router]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    const ok = await login(email.trim(), password);
    setLoading(false);

    if (ok) {
      router.push("/");
    } else {
      setError("Invalid credentials. Try demo@demo.com / password123");
    }
  };

  return (
    <div className="flex justify-center items-center mt-30">
      <Card className="w-full max-w-sm">
        <CardHeader>
          <CardTitle>Login to your account</CardTitle>
          <CardDescription>
            Enter your email below to login to your account
          </CardDescription>
          <CardAction>
            <Link href="/register">
              <Button variant="link" className="cursor-pointer">
                Sign Up
              </Button>
            </Link>
          </CardAction>
        </CardHeader>
        <CardContent>
          <form>
            <div className="flex flex-col gap-6">
              <div className="grid gap-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="m@example.com"
                  required
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div className="grid gap-2">
                <div className="flex items-center">
                  <Label htmlFor="password">Password</Label>
                  <a
                    href="#"
                    className="ml-auto inline-block text-sm underline-offset-4 hover:underline"
                  >
                    Forgot your password?
                  </a>
                </div>
                <Input
                  id="password"
                  type="password"
                  required
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
            </div>
            {error && <p className="text-sm text-destructive">{error}</p>}

            <Button
              type="submit"
              className="w-full cursor-pointer mt-6"
              onClick={(e) => {
                e.preventDefault();
                void handleSubmit(e as unknown as React.FormEvent);
              }}
              disabled={loading}
            >
              Login
            </Button>
          </form>
        </CardContent>
        {/* <CardFooter className="flex-col gap-2"></CardFooter> */}
      </Card>
    </div>
  );
}
