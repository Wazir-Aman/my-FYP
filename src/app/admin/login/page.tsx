"use client"

import React from "react"

import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Leaf, ArrowLeft, Lock } from "lucide-react"

import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "@/lib/firebase"; // adjust if path differs

import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useToast } from "@/hooks/use-toast"

export default function AdminLogin() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()
  const { toast } = useToast()

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    try {
      await signInWithEmailAndPassword(auth, email, password);

      toast({
        title: "Login successful",
        description: "Redirecting to admin dashboard...",
      });

      setTimeout(() => {
        router.push("/admin/dashboard");
      }, 1000);
    } catch (error: any) {
      toast({
        title: "Login failed",
        description: "Invalid email or password. Please try again.",
        variant: "destructive",
      });
      setIsLoading(false);
    }



  }

  return (
    <div className="flex min-h-screen flex-col">
      <header className="sticky top-0 z-50 w-full border-b bg-green-400 backdrop-blur">
  <div className="container flex h-16 items-center justify-between px-4">
    <div className="flex items-center gap-2 min-w-0">
      <Image
        src="/logo.png"
        alt="AutoGreenHouse Logo"
        width={100}
        height={32}
        className="w-auto h-8 sm:h-10"
      />
      <span className="text-base sm:text-xl font-bold truncate">
        AutoGreenHouse
      </span>
    </div>
    <Link href="/" className="shrink-0">
      <Button
        variant="ghost"
        size="sm"
        className="text-xs sm:text-sm px-2 sm:px-4 py-1"
      >
        <ArrowLeft className="mr-1 h-3 w-3 sm:h-4 sm:w-4" />
        Back to Home
      </Button>
    </Link>
  </div>
</header>


      <main className="flex-1 flex items-center justify-center p-4 bg-gradient-to-b from-green-50 to-white dark:from-green-950/20 dark:to-background">
        <Card className="w-full max-w-md">
          <CardHeader className="space-y-1">
            <div className="flex items-center justify-center mb-2">
              <Lock className="h-10 w-10 text-green-600" />
            </div>
            <CardTitle className="text-2xl text-center">Admin Login</CardTitle>
            <CardDescription className="text-center">
              Enter your credentials to access the admin dashboard
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleLogin} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="admin@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
              <div className="space-y-2">
                <div className="flex items-center">
                  <Label htmlFor="password">Password</Label>
                  <Link href="#" className="ml-auto inline-block text-sm underline">

                  </Link>
                  <span className="text-green-600 underline cursor-pointer" onClick={() => {
                    toast({
                      title: "Password Recovery",
                      description: "Please contact the system administrator to reset your password.",
                    });
                  }}>
                    Forget Password?
                  </span>
                </div>
                <Input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
              <Button type="submit" className="w-full bg-green-600 cursor-pointer hover:bg-green-700" disabled={isLoading}>
                {isLoading ? "Logging in..." : "Login"}
              </Button>
            </form>
          </CardContent>
          <CardFooter className="flex flex-col space-y-4">

            <div className="text-sm text-center text-muted-foreground">
              <p>
                Don&apos;t have admin access?{" "}
                <Link href="/customer" className="underline text-green-600">
                  Visit the customer portal
                </Link>
              </p>
            </div>
          </CardFooter>
        </Card>
      </main>
      <footer className="border-t bg-black">
        <div className="container flex flex-col gap-4  py-6 md:flex-row md:items-center md:justify-between">
          <div className="flex items-center gap-2">
            <Leaf className="h-5 w-5 text-green-600" />
            <p className="text-sm text-white text-muted-foreground">© 2025 AutoGreenHouse. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
