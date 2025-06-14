import Link from "next/link"
import Image from "next/image"
import { ArrowRight, Leaf, Lock, LineChart } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"

export default function LandingPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <header className="sticky top-0 z-50 w-full border-b bg-green-400 backdrop-blur">
        <div className="container flex h-16 items-center justify-between">
          <div className="flex items-center gap-2">
            <Image
              src="/logo.png"
              alt="AutoGreenHouse Logo"
              width={120}
              height={40}
            />
            <span className="text-xl font-bold">AutoGreenHouse</span>
          </div>
          <nav className="flex items-center gap-4">
            <Link href="/customer" className="text-sm font-medium hover:underline">
              Features
            </Link>
            <Link href="/customer" className="text-sm font-medium hover:underline">
              How It Works
            </Link>
            <Link href="/customer" className="text-sm font-medium hover:underline">
              Demo
            </Link>
            <Link href="/admin/login">
              <Button className="cursor-pointer hover:bg-gray-200" variant="outline" size="sm">
                Admin Login
              </Button>
            </Link>
          </nav>
        </div>
      </header>
      <main className="flex-1">
        <section className="w-full py-12 md:py-24 lg:py-32 bg-gradient-to-b from-green-50 to-white dark:from-green-950/20 dark:to-background">
          <div className="container px-4 md:px-6">
            <div className="grid gap-6 lg:grid-cols-2 lg:gap-12 xl:grid-cols-2">
              <div className="flex flex-col justify-center space-y-4">
                <div className="space-y-2">
                  <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none">
                    Smart Greenhouse Automation
                  </h1>
                  <p className="max-w-[600px] text-muted-foreground md:text-xl">
                    {"Monitor and control your greenhouse environment with precision. Optimize growth conditions automatically."}
                  </p>
                </div>
                <div className="flex flex-col gap-2 min-[400px]:flex-row">
                  <Link href="/customer">
                    <Button className="cursor-pointer bg-green-600 hover:bg-green-700">
                      Customer Portal
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </Link>
                  <Link href="/admin/login">
                    <Button className="cursor-pointer hover:bg-gray-200" variant="outline">
                      Admin Dashboard
                      <Lock className="ml-2 h-4 w-4" />
                    </Button>
                  </Link>
                </div>
              </div>
              <div className="flex items-center justify-center">
                <Image
                  src="/background.jpg"
                  width={600}
                  height={400}
                  alt="Greenhouse Dashboard"
                  className="rounded-lg object-cover shadow-lg"
                />
              </div>
            </div>
          </div>
        </section>

        <section className="w-full py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                  Choose Your Access Level
                </h2>
                <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  {"Whether you're exploring our system or managing your greenhouse, we have the right interface for you."}
                </p>
              </div>
            </div>
            <div className="mx-auto grid max-w-5xl items-center gap-6 py-12 lg:grid-cols-2 lg:gap-12">
              <Card className="border-green-200 shadow-md hover:shadow-lg transition-shadow">
                <CardHeader>
                  <CardTitle className="text-2xl">Customer Portal</CardTitle>
                  <CardDescription>Explore our system and view live sensor data</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center gap-2">
                      <LineChart className="h-5 w-5 text-green-600" />
                      <span>View live sensor data (read-only)</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Leaf className="h-5 w-5 text-green-600" />
                      <span>Learn how the system works</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <ArrowRight className="h-5 w-5 text-green-600" />
                      <span>Try our interactive demo</span>
                    </div>
                    <Image
                      src="/customer_dashboard.png?height=200&width=350"
                      width={350}
                      height={200}
                      alt="Customer Portal Preview"
                      className="rounded-lg object-cover mt-4"
                    />
                  </div>
                </CardContent>
                <CardFooter>
                  <Link href="/customer" className="w-full">
                    <Button className="cursor-pointer w-full bg-green-600 hover:bg-green-700">Enter Customer Portal</Button>
                  </Link>
                </CardFooter>
              </Card>
              <Card className="border-green-200 shadow-md hover:shadow-lg transition-shadow">
                <CardHeader>
                  <CardTitle className=" text-2xl">Admin Dashboard</CardTitle>
                  <CardDescription>Full control for verified system owners</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center gap-2">
                      <Lock className="h-5 w-5 text-green-600" />
                      <span>Secure access for verified admins</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <LineChart className="h-5 w-5 text-green-600" />
                      <span>Control Actuators like fan, light, window and water pump</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <ArrowRight className="h-5 w-5 text-green-600" />
                      <span>View historical data </span>
                    </div>
                    <Image
                      src="/admin_dashboard.png?height=200&width=350"
                      width={350}
                      height={200}
                      alt="Admin Dashboard Preview"
                      className="rounded-lg object-cover mt-4"
                    />
                  </div> 
                </CardContent>
                <CardFooter>
                  <Link href="/admin/login" className="w-full">
                    <Button variant="outline" className="cursor-pointer w-full hover:bg-gray-200">
                      Admin Login
                    </Button>
                  </Link>
                </CardFooter>
              </Card>
            </div>
          </div>
        </section>
      </main>
      <footer className="border-t bg-black">
        <div className="container flex flex-col gap-4 py-10 md:flex-row md:items-center md:justify-between md:py-8">
          <div className="flex items-center gap-2">
            <Leaf className="h-5 w-5 text-green-600" />
            <p className="text-sm text-white text-muted-foreground">{"© 2025 AutoGreenHouse. All rights reserved."}</p>
          </div>
          <nav className="flex gap-4 text-sm text-white text-muted-foreground">
            <Link href="#" className="hover:underline">
              Terms
            </Link>
            <Link href="#" className="hover:underline">
              Privacy
            </Link>
            <Link href="#" className="hover:underline">
              Contact
            </Link>
          </nav>
        </div>
      </footer>
    </div>
  )
}
