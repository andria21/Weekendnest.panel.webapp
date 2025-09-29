// "use client";

// import { Button } from "@/components/ui/button";
// import {
//   Card,
//   CardAction,
//   CardContent,
//   CardDescription,
//   CardHeader,
//   CardTitle,
// } from "@/components/ui/card";
// import { Input } from "@/components/ui/input";
// import { Label } from "@/components/ui/label";
// import Link from "next/link";

// export default function Login() {
//   return (
//     <div className="flex justify-center items-center mt-30">
//       <Card className="w-full max-w-sm">
//         <CardHeader>
//           <CardTitle>Login to your account</CardTitle>
//           <CardDescription>
//             Enter your email below to login to your account
//           </CardDescription>
//         </CardHeader>
//         <CardContent>
//           <form>
//             <div className="flex flex-col gap-6">
//               <div className="grid gap-2">
//                 <Label htmlFor="email">Email</Label>
//                 <Input
//                   id="email"
//                   type="email"
//                   placeholder="m@example.com"
//                   required
//                 />
//               </div>
//               <div className="grid gap-2">
//                 <div className="flex items-center">
//                   <Label htmlFor="password">Password</Label>
//                 </div>
//                 <Input id="password" type="password" required />
//               </div>
//             </div>

//             <Button type="submit" className="w-full cursor-pointer mt-6">
//               Login
//             </Button>
//           </form>
//         </CardContent>
//       </Card>
//     </div>
//   );
// }

// app/login/page.tsx
"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useFormStatus } from "react-dom";
import { loginAction } from "@/actions/auth"; // Import the server action
import { useActionState } from "react";

// Helper component to show loading state
function LoginButton() {
  const { pending } = useFormStatus();

  return (
    <Button
      type="submit"
      className="w-full cursor-pointer mt-6"
      disabled={pending}
    >
      {pending ? "Logging In..." : "Login"}
    </Button>
  );
}

export default function Login() {
  // Initial state for the form response
  const initialState = {
    success: false,
    message: "",
  };

  // useActionState hooks the state up to the server action
  const [state, formAction] = useActionState(loginAction, initialState);

  return (
    <div className="flex justify-center items-center mt-30">
      <Card className="w-full max-w-sm">
        <CardHeader>
          <CardTitle>Login to your account</CardTitle>
          <CardDescription>
            Enter your email below to login to your account
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form action={formAction}>
            <div className="flex flex-col gap-6">
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
              <div className="grid gap-2">
                <div className="flex items-center">
                  <Label htmlFor="password">Password</Label>
                </div>
                <Input id="password" name="password" type="password" required />
              </div>
            </div>

            {/* Display status message */}
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

            <LoginButton />
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
