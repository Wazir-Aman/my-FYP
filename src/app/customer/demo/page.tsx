"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Leaf, ArrowLeft, Thermometer, Droplets, Sun, Info } from "lucide-react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Switch } from "@/components/ui/switch"
import { Slider } from "@/components/ui/slider"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"

export default function CustomerDemo() {
  const [mounted, setMounted] = useState(false)

  // Mock sensor data 
  const [temperature, setTemperature] = useState(24.5)
  const [humidity, setHumidity] = useState(65)
  const [soilMoisture, setSoilMoisture] = useState(42)
  const [lightIntensity, setLightIntensity] = useState(75)

  // Demo controls
  const [autoMode, setAutoMode] = useState(true)
  const [ventilation, setVentilation] = useState(false)
  const [irrigation, setIrrigation] = useState(false)
  const [lighting, setLighting] = useState(true)

  useEffect(() => {
    setMounted(true)

    // Simulate data changes
    const interval = setInterval(() => {
      // Random fluctuations to simulate real sensor data
      setTemperature((prev) => +(prev + (Math.random() * 0.6 - 0.3)).toFixed(1))
      setHumidity((prev) => Math.max(40, Math.min(80, Math.round(prev + (Math.random() * 4 - 2)))))
      setSoilMoisture((prev) => Math.max(30, Math.min(70, Math.round(prev + (Math.random() * 3 - 1.5)))))
      setLightIntensity((prev) => Math.max(50, Math.min(100, Math.round(prev + (Math.random() * 5 - 2.5)))))
    }, 5000)

    return () => clearInterval(interval)
  }, [])

  if (!mounted) return null

  return (
    <div className="flex min-h-screen flex-col">
      <header className="fixed top-0 z-50 w-full border-b bg-green-400 backdrop-blur">
        <div className="container mx-auto flex h-16 items-center justify-between px-4">

          {/* Logo and Brand */}
          <div className="flex items-center gap-2 max-w-[70%]">
            <Image
              src="/logo.png"
              alt="AutoGreenHouse Logo"
              width={100}
              height={30}
              className="object-contain"
            />
            <span className="text-lg font-bold truncate">AutoGreenHouse</span>
          </div>

          {/* Back Button */}
          <Link href="/customer">
            <Button
              variant="ghost"
              size="sm"
              className="text-sm px-2 py-1 hidden sm:flex items-center"
            >
              <ArrowLeft className="mr-1 h-4 w-4" />
              Back to Customer Portal
            </Button>

            {/* Icon-only button for mobile */}
            <Button
              variant="ghost"
              size="icon"
              className="sm:hidden"
              aria-label="Back"
            >
              <ArrowLeft className="h-4 w-4" />
            </Button>
          </Link>
        </div>
      </header>


      <main className="flex-1 container py-6 pt-16">
        <div className="mb-6">
          <h1 className="text-3xl font-bold mb-2">Admin Dashboard Demo</h1>
          <p className="text-muted-foreground">
            This is a demonstration of the admin dashboard interface. Try adjusting the controls to see how the system
            works.
          </p>
        </div>

        <Alert className="mb-6 bg-green-50 dark:bg-green-950/20 border-green-200">
          <Info className="h-4 w-4 text-green-600" />
          <AlertTitle>Demo Mode</AlertTitle>
          <AlertDescription>
            This is a simulation. In a real system, these controls would affect your actual greenhouse environment.
          </AlertDescription>
        </Alert>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium flex items-center">
                <Thermometer className="mr-2 h-4 w-4 text-green-600" />
                Temperature
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{temperature}°C</div>
              <p className="text-xs text-muted-foreground">Optimal range: 22-26°C</p>
              <div
                className={`mt-2 text-xs ${temperature > 26 || temperature < 22 ? "text-amber-500" : "text-green-500"}`}
              >
                {temperature > 26
                  ? "Above optimal range"
                  : temperature < 22
                    ? "Below optimal range"
                    : "Within optimal range"}
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium flex items-center">
                <Droplets className="mr-2 h-4 w-4 text-green-600" />
                Humidity
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{humidity}%</div>
              <p className="text-xs text-muted-foreground">Optimal range: 60-70%</p>
              <div className={`mt-2 text-xs ${humidity > 70 || humidity < 60 ? "text-amber-500" : "text-green-500"}`}>
                {humidity > 70 ? "Above optimal range" : humidity < 60 ? "Below optimal range" : "Within optimal range"}
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium flex items-center">
                <Droplets className="mr-2 h-4 w-4 text-green-600" />
                Soil Moisture
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{soilMoisture}%</div>
              <p className="text-xs text-muted-foreground">Optimal range: 40-60%</p>
              <div
                className={`mt-2 text-xs ${soilMoisture > 60 || soilMoisture < 40 ? "text-amber-500" : "text-green-500"}`}
              >
                {soilMoisture > 60
                  ? "Above optimal range"
                  : soilMoisture < 40
                    ? "Below optimal range"
                    : "Within optimal range"}
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium flex items-center">
                <Sun className="mr-2 h-4 w-4 text-green-600" />
                Light Intensity
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{lightIntensity}%</div>
              <p className="text-xs text-muted-foreground">Optimal range: 60-90%</p>
              <div
                className={`mt-2 text-xs ${lightIntensity > 90 || lightIntensity < 60 ? "text-amber-500" : "text-green-500"}`}
              >
                {lightIntensity > 90
                  ? "Above optimal range"
                  : lightIntensity < 60
                    ? "Below optimal range"
                    : "Within optimal range"}
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>System Mode</CardTitle>
              <CardDescription>Toggle between automatic and manual control</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <div className="font-medium">Automatic Control</div>
                  <div className="text-sm text-muted-foreground">Let the system optimize conditions automatically</div>
                </div>
                <Switch checked={autoMode} onCheckedChange={setAutoMode} />
              </div>
            </CardContent>
          </Card>

          <Card className={`mt-4 ${autoMode ? "opacity-50 pointer-events-none" : ""}`}>
            <CardHeader>
              <CardTitle>Manual Controls</CardTitle>
              <CardDescription>
                {autoMode
                  ? "Disable automatic mode to access manual controls"
                  : "Manually adjust your greenhouse environment"}
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div className="font-medium">Temperature Control</div>
                <div className="flex flex-col space-y-2">
                  <div className="flex justify-between">
                    <span className="text-sm">Target: {temperature.toFixed(1)}°C</span>
                    <span className="text-sm text-muted-foreground">Range: 18-30°C</span>
                  </div>
                  <Slider
                    value={[temperature]}
                    min={18}
                    max={30}
                    step={0.1}
                    onValueChange={(value) => setTemperature(value[0])}
                    disabled={autoMode}
                  />
                </div>
              </div>

              <div className="space-y-4">
                <div className="font-medium">Humidity Control</div>
                <div className="flex flex-col space-y-2">
                  <div className="flex justify-between">
                    <span className="text-sm">Target: {humidity}%</span>
                    <span className="text-sm text-muted-foreground">Range: 40-80%</span>
                  </div>
                  <Slider
                    value={[humidity]}
                    min={40}
                    max={80}
                    step={1}
                    onValueChange={(value) => setHumidity(value[0])}
                    disabled={autoMode}
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="flex items-center justify-between space-x-2 rounded-md border p-4">
                  <div className="space-y-0.5">
                    <div className="text-sm font-medium">Ventilation</div>
                  </div>
                  <Switch checked={ventilation} onCheckedChange={setVentilation} disabled={autoMode} />
                </div>
                <div className="flex items-center justify-between space-x-2 rounded-md border p-4">
                  <div className="space-y-0.5">
                    <div className="text-sm font-medium">Irrigation</div>
                  </div>
                  <Switch checked={irrigation} onCheckedChange={setIrrigation} disabled={autoMode} />
                </div>
                <div className="flex items-center justify-between space-x-2 rounded-md border p-4">
                  <div className="space-y-0.5">
                    <div className="text-sm font-medium">Lighting</div>
                  </div>
                  <Switch checked={lighting} onCheckedChange={setLighting} disabled={autoMode} />
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button disabled={autoMode} className="w-full bg-green-600 hover:bg-green-700">
                Apply Changes
              </Button>
            </CardFooter>
          </Card>

          <Card className="mt-4">
            <CardHeader>
              <CardTitle>Data Visualization</CardTitle>
              <CardDescription>View historical data trends</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[300px] w-full bg-muted/30 rounded-md flex items-center justify-center">
                <p className="text-muted-foreground">Chart visualization would appear here</p>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:justify-between">
          <Link href="/customer">
            <Button variant="outline" className="w-full cursor-pointer hover:bg-gray-200 sm:w-auto">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Customer Portal
            </Button>
          </Link>
          <Link href="/">
            <Button className="w-full sm:w-auto bg-green-600 cursor-pointer hover:bg-green-700">
              Learn More About Purchasing
            </Button>
          </Link>
        </div>

      </main>

      <footer className="border-t bg-black">
        <div className="container flex flex-col gap-4 py-6 md:flex-row md:items-center md:justify-between">
          <div className="flex items-center px-2 gap-2">
            <Leaf className="h-5 w-5 text-green-600" />
            <p className="text-sm text-white text-muted-foreground">© 2025 AutoGreenHouse. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
