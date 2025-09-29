// app/register/page.tsx
"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useFormStatus } from "react-dom";
import { registerAction } from "@/actions/auth"; // Import the server action
import { useActionState } from "react";

// Helper component to show loading state
function RegisterButton() {
  const { pending } = useFormStatus();

  return (
    <Button type="submit" className="w-full cursor-pointer" disabled={pending}>
      {pending ? "Registering..." : "Register"}
    </Button>
  );
}

export default function Register() {
  // Initial state for the form responses
  const initialState = {
    success: false,
    message: "",
  };

  // useActionState hooks the state up to the server action
  const [state, formAction] = useActionState(registerAction, initialState);

  return (
    <div className="flex justify-center items-center mt-30">
      <Card className="w-full max-w-lg">
        <CardHeader>
          <CardTitle>Register </CardTitle>
          <CardDescription>
            Enter your details below to create your account
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form action={formAction}>
            <div className="flex flex-col gap-6">
              <div className="grid grid-cols-2 gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="firstName">First Name</Label>
                  <Input
                    id="firstName"
                    name="firstName"
                    type="text"
                    placeholder="John"
                    required
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="lastName">Last Name</Label>
                  <Input
                    id="lastName"
                    name="lastName"
                    type="text"
                    placeholder="Doe"
                    required
                  />
                </div>
              </div>

              <div className="grid gap-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="m@example.com"
                  required
                />
              </div>

              {/* Password */}
              <div className="grid gap-2">
                <div className="flex items-center">
                  <Label htmlFor="password">Password</Label>
                </div>
                <Input id="password" name="password" type="password" required />
              </div>
            </div>

            {state.message && (
              <p
                aria-live="polite"
                className={`mt-4 text-sm ${
                  state.success ? "text-green-500" : "text-red-500"
                }`}
              >
                {state.message}
              </p>
            )}

            <CardFooter className="flex-col gap-2 p-0 mt-6">
              <RegisterButton />
            </CardFooter>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
