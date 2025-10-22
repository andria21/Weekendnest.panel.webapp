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
import { useFormState, useFormStatus } from "react-dom";
import { registerAction } from "@/actions/auth/register";
import { toast } from "sonner";
import { useActionState } from "react";

function RegisterButton() {
  const { pending } = useFormStatus();

  return (
    <Button type="submit" className="w-full cursor-pointer" disabled={pending}>
      {pending ? "Registering..." : "Register"}
    </Button>
  );
}

export default function Register() {
  const [state, formAction] = useActionState(registerAction, {
    success: false,
    message: "",
  });

  if (state.success) {
    toast.success(state.message || "User registered successfully");
  } else if (state.message && !state.success) {
    toast.error(state.message);
  }
  return (
    <div className="flex justify-center items-center mt-4">
      <Card className="w-full max-w-lg">
        <CardHeader>
          <CardTitle>Register</CardTitle>
          <CardDescription>
            Enter your details below to create your account
          </CardDescription>
        </CardHeader>

        <CardContent>
          <form action={formAction}>
            <div className="flex flex-col gap-6">
              {/* First / Last Name */}
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

              {/* Title */}
              <div className="grid gap-2">
                <Label htmlFor="title">Title</Label>
                <select
                  id="title"
                  name="title"
                  className="border border-input bg-background rounded-md px-3 py-2"
                  required
                >
                  <option value="">Select Title</option>
                  <option value="0">Mr</option>
                  <option value="1">Ms</option>
                  <option value="2">Mrs</option>
                  <option value="3">Dr</option>
                </select>
              </div>

              {/* Email */}
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

              {/* Date of Birth */}
              <div className="grid gap-2">
                <Label>Date of Birth</Label>
                <div className="grid grid-cols-3 gap-2">
                  <Input
                    id="dobDay"
                    name="dobDay"
                    type="number"
                    placeholder="DD"
                    min="1"
                    max="31"
                    required
                  />
                  <Input
                    id="dobMonth"
                    name="dobMonth"
                    type="number"
                    placeholder="MM"
                    min="1"
                    max="12"
                    required
                  />
                  <Input
                    id="dobYear"
                    name="dobYear"
                    type="number"
                    placeholder="YYYY"
                    min="1900"
                    max="2100"
                    required
                  />
                </div>
              </div>

              {/* Mobile Phone */}
              <div className="grid gap-2">
                <Label htmlFor="mobilePhone">Mobile Phone</Label>
                <Input
                  id="mobilePhone"
                  name="mobilePhone"
                  type="tel"
                  placeholder="+04-3--853203"
                  required
                />
              </div>
            </div>

            <CardFooter className="flex-col gap-2 p-0 mt-6">
              <RegisterButton />
            </CardFooter>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
