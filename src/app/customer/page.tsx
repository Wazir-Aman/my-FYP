"use client"
import Link from "next/link"
import Image from "next/image"
import { ArrowLeft, Leaf, LineChart, Menu, X, Droplets, Thermometer, Info, ExternalLink } from "lucide-react"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function CustomerPortal() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <div className="flex min-h-screen flex-col">
      <header className="sticky top-0 z-50 w-full border-b bg-green-400 backdrop-blur overflow-x-hidden">
        <div className="container mx-auto max-w-screen-xl flex h-16 items-center justify-between px-4">
          {/* Logo and Title */}
          <div className="flex items-center gap-2">
            <Image src="/logo.png" alt="AutoGreenHouse Logo" width={80} height={30} />
            <span className="text-base font-semibold sm:text-lg">AutoGreenHouse</span>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-4 text-sm sm:text-base">
            <Link href="/" className="font-medium hover:underline whitespace-nowrap">Home</Link>
            <Link href="#how-it-works" className="font-medium hover:underline whitespace-nowrap">How It Works</Link>
            <Link href="#demo" className="font-medium hover:underline whitespace-nowrap">Demo</Link>
            <Link href="#purchase" className="font-medium hover:underline whitespace-nowrap">Purchase</Link>
          </nav>

          {/* Mobile Menu Toggle */}
          <div className="md:hidden">
            <button onClick={() => setIsOpen(!isOpen)} aria-label="Toggle menu">
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="md:hidden bg-green-300 border-t">
            <nav className="flex flex-col p-4 gap-2 text-sm sm:text-base">
              <Link href="/" className="font-medium hover:underline">Home</Link>
              <Link href="#how-it-works" className="font-medium hover:underline">How It Works</Link>
              <Link href="#demo" className="font-medium hover:underline">Demo</Link>
              <Link href="#purchase" className="font-medium hover:underline">Purchase</Link>
            </nav>
          </div>
        )}
      </header>

      <main className="flex-1">
        <section className="w-full py-12 md:py-24 lg:py-32 bg-gradient-to-b from-green-50 to-white dark:from-green-950/20 dark:to-background overflow-x-hidden">
          <div className="container max-w-screen-xl mx-auto px-4 md:px-6">
            <div className="flex flex-col items-start gap-4">
              <Link href="/">
                <Button variant="ghost" size="sm" className="gap-1">
                  <ArrowLeft className="cursor-pointer h-4 w-4" />
                  Back to Home
                </Button>
              </Link>
              <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">Customer Portal</h1>
              <p className="max-w-[700px] text-muted-foreground md:text-xl">
                {"Explore our greenhouse automation system and see real-time sensor data."}
              </p>
            </div>
          </div>
        </section>

        <section className="w-full py-12 md:py-24 lg:py-32">
  <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    <div className="grid gap-16 lg:grid-cols-2">
      {/* LEFT COLUMN: Sensor Data */}
      <div>
        <h2 className="text-2xl font-bold mb-6">Live Sensor Data</h2>
        <div className="grid gap-4 md:grid-cols-2">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg font-medium flex items-center">
                <Thermometer className="mr-2 h-5 w-5 text-green-600" />
                Temperature
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">24.5°C</div>
              <p className="text-xs text-muted-foreground">{"Optimal range: 22-26°C"}</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg font-medium flex items-center">
                <Droplets className="mr-2 h-5 w-5 text-green-600" />
                Humidity
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">65%</div>
              <p className="text-xs text-muted-foreground">{"Optimal range: 60-70%"}</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg font-medium flex items-center">
                <LineChart className="mr-2 h-5 w-5 text-green-600" />
                Soil Moisture
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">42%</div>
              <p className="text-xs text-muted-foreground">{"Optimal range: 40-60%"}</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg font-medium flex items-center">
                <Info className="mr-2 h-5 w-5 text-green-600" />
                System Status
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-xl font-medium text-green-600">Optimal</div>
              <p className="text-xs text-muted-foreground">{"All systems functioning normally"}</p>
            </CardContent>
          </Card>
        </div>

        <div className="mt-8">
          <Card>
            <CardHeader>
              <CardTitle>24-Hour Trend</CardTitle>
              <CardDescription>Temperature and humidity over the last 24 hours</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[200px] w-full bg-muted/30 rounded-md flex items-center justify-center">
                <p className="text-muted-foreground">{"Chart visualization would appear here"}</p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* RIGHT COLUMN: Tabs, Demo, Purchase */}
      <div>
        <h2 className="text-2xl font-bold mb-6" id="how-it-works">How It Works</h2>
        <Tabs defaultValue="sensors">
          <TabsList className="grid w-full grid-cols-3 bg-gray-100">
            <TabsTrigger value="sensors">Sensors</TabsTrigger>
            <TabsTrigger value="automation">Automation</TabsTrigger>
            <TabsTrigger value="control">Control</TabsTrigger>
          </TabsList>

          <TabsContent value="sensors" className="p-4 border rounded-md mt-2">
            <h3 className="text-lg font-medium mb-2">Advanced Sensor Network</h3>
            <p className="mb-4">{"Our system uses high-precision sensors to monitor:"}</p>
            <ul className="space-y-2 mb-4">
              <li className="flex items-start gap-2">
                <Thermometer className="h-5 w-5 text-green-600 mt-0.5" />
                <span>Temperature sensors with ±0.1°C accuracy</span>
              </li>
              <li className="flex items-start gap-2">
                <Droplets className="h-5 w-5 text-green-600 mt-0.5" />
                <span>Humidity sensors for air and soil moisture monitoring</span>
              </li>
              <li className="flex items-start gap-2">
                <LineChart className="h-5 w-5 text-green-600 mt-0.5" />
                <span>Light intensity and spectrum analysis</span>
              </li>
            </ul>
            <Image
              src="/placeholder.svg?height=200&width=400"
              width={400}
              height={200}
              alt="Sensor Network Diagram"
              className="rounded-md"
            />
          </TabsContent>

          <TabsContent value="automation" className="p-4 border rounded-md mt-2">
            <h3 className="text-lg font-medium mb-2">Smart Automation</h3>
            <p className="mb-4">{"Our AI-driven system automatically adjusts:"}</p>
            <ul className="space-y-2 mb-4">
              <li className="flex items-start gap-2">
                <Thermometer className="h-5 w-5 text-green-600 mt-0.5" />
                <span>Climate control based on plant-specific requirements</span>
              </li>
              <li className="flex items-start gap-2">
                <Droplets className="h-5 w-5 text-green-600 mt-0.5" />
                <span>Irrigation schedules optimized for water conservation</span>
              </li>
              <li className="flex items-start gap-2">
                <LineChart className="h-5 w-5 text-green-600 mt-0.5" />
                <span>Ventilation and air circulation for optimal growth</span>
              </li>
            </ul>
            <Image
              src="/placeholder.svg?height=200&width=400"
              width={400}
              height={200}
              alt="Automation System Diagram"
              className="rounded-md"
            />
          </TabsContent>

          <TabsContent value="control" className="p-4 border rounded-md mt-2">
            <h3 className="text-lg font-medium mb-2">Remote Control</h3>
            <p className="mb-4">{"As an admin, you'll have full control over:"}</p>
            <ul className="space-y-2 mb-4">
              <li className="flex items-start gap-2">
                <Thermometer className="h-5 w-5 text-green-600 mt-0.5" />
                <span>Manual overrides for all automated systems</span>
              </li>
              <li className="flex items-start gap-2">
                <Droplets className="h-5 w-5 text-green-600 mt-0.5" />
                <span>Custom scheduling and profile creation</span>
              </li>
              <li className="flex items-start gap-2">
                <LineChart className="h-5 w-5 text-green-600 mt-0.5" />
                <span>Real-time alerts and notifications</span>
              </li>
            </ul>
            <Image
              src="/placeholder.svg?height=200&width=400"
              width={400}
              height={200}
              alt="Control Interface Preview"
              className="rounded-md"
            />
          </TabsContent>
        </Tabs>

        <div className="mt-8" id="demo">
          <Card>
            <CardHeader>
              <CardTitle>Interactive Demo</CardTitle>
              <CardDescription>Try our simulation to see how the admin dashboard works</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="mb-4">{"Experience a fully interactive demo of our admin dashboard with simulated data."}</p>
              <Link href="/customer/demo">
                <Button className="cursor-pointer w-full bg-green-600 hover:bg-green-700">
                  Launch Demo
                  <ExternalLink className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            </CardContent>
          </Card>
        </div>

        <div className="mt-8" id="purchase">
          <Card className="bg-green-50 dark:bg-green-950/20 border-green-200">
            <CardHeader>
              <CardTitle>Ready to Get Started?</CardTitle>
              <CardDescription>Purchase your AutoGreenHouse system today by contacting our sales team.</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="mb-4">{"Our complete system includes all hardware, software, and a 1-year warranty."}</p>
              <div className="flex flex-col gap-4 sm:flex-row">
                <Button className="cursor-pointer bg-green-600 hover:bg-green-700">Purchase Now</Button>
                <Button className="cursor-pointer hover:bg-gray-200" variant="outline">Contact Sales</Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
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
          <nav className="flex gap-4 text-sm text-white text-muted-foregroun">
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
