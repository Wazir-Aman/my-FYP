"use client"




import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import {
  Leaf,
  LogOut,
  Thermometer,
  Droplets,
  Sun,
  Wind,
  Bell,
  Settings,
  Home,
  LineChart,
  AlertTriangle,
  ChevronDown,
} from "lucide-react"

import Image from "next/image";
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Switch } from "@/components/ui/switch"
import { Slider } from "@/components/ui/slider"
import SensorChart from "@/components/SensorChart";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

// Import our custom sidebar components
import {
  SidebarProvider,
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarTrigger,
} from "@/components/custom/sidebar"

import { ref, onValue } from "firebase/database";
import { database } from "@/lib/firebase"; // adjust path if different

export default function AdminDashboard() {
  const router = useRouter()
  const [mounted, setMounted] = useState(false)

  // Mock sensor data
  const [temperature, setTemperature] = useState(0)
  const [humidity, setHumidity] = useState(0)
  const [lightIntensity, setLightIntensity] = useState(0)
  const [soil1, setSoil1] = useState(0)
  const [soil2, setSoil2] = useState(0)
  const [soil3, setSoil3] = useState(0)
  const [soil4, setSoil4] = useState(0)

  // Control states
  // const [autoMode, setAutoMode] = useState(true)
  // const [ventilation, setVentilation] = useState(false)
  // const [irrigation, setIrrigation] = useState(false)
  // const [lighting, setLighting] = useState(true)
  // const [fanmotor, setfanmotor] = useState(true)

  useEffect(() => {
    setMounted(true)
    const sensorRef = ref(database, "SensorData")
    const unsubscribe = onValue(sensorRef, (snapshot) => {
      const data = snapshot.val()
      if (data) {
        setTemperature(data.temperature || 0)
        setHumidity(data.humidity || 0)
        setLightIntensity(data.light || 0)
        setSoil1(data.soil1 || 0)
        setSoil2(data.soil2 || 0)
        setSoil3(data.soil3 || 0)
        setSoil4(data.soil4 || 0)
      }
    })

    return () => unsubscribe()
  }, [])

  const handleLogout = () => {
    router.push("/admin/login")
  }

  if (!mounted) return null

  return (
    <SidebarProvider defaultOpen={true}>
      <Sidebar>
        <SidebarHeader>
          <div className="flex items-center gap-2 px-0 py-2">
            <Image
              src="/logo.png"
              alt="AutoGreenHouse Logo"
              width={100}
              height={40}
            />
            
            <span className="text-sm font-bold">AutoGreenHouse</span>
          </div>
        </SidebarHeader>
        <SidebarContent>
          <SidebarMenu>
            <SidebarMenuItem >
              <SidebarMenuButton href="/admin/dashboard" icon={Home} isActive>
                Dashboard
              </SidebarMenuButton>
            </SidebarMenuItem>
            <SidebarMenuItem>
              <SidebarMenuButton href="#" icon={LineChart}>
                Analytics
              </SidebarMenuButton>
            </SidebarMenuItem>
            <SidebarMenuItem>
              <SidebarMenuButton href="#" icon={Bell}>
                Alerts
              </SidebarMenuButton>
            </SidebarMenuItem>
            <SidebarMenuItem>
              <SidebarMenuButton href="#" icon={Settings}>
                Settings
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarContent>
        <SidebarFooter>
          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton icon={LogOut} onClick={handleLogout}>
                Logout
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarFooter>
      </Sidebar>

      <div className="flex-1 flex flex-col">
        <header className="sticky top-0 z-40 border-b bg-green-400 backdrop-blur">
          <div className="container flex h-16 items-center justify-between">
            <div className="flex items-center gap-2">
              <SidebarTrigger />
              <h1 className="text-xl font-semibold">Admin Dashboard</h1>
            </div>
            <div className="flex items-center gap-4">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" size="sm" className="gap-1 cursor-pointer hover:bg-gray-200">
                    <Bell className="h-4 w-4" />
                    <span className="sr-only md:not-sr-only md:inline   ">Notifications</span>
                    <span className="relative flex h-2 w-2">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
                    </span>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuLabel>Notifications</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem>
                    <AlertTriangle className="mr-2 h-4 w-4 text-amber-500" />
                    <span>Humidity levels rising</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <Thermometer className="mr-2 h-4 w-4 text-green-500" />
                    <span>Temperature optimal</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" size="sm" className="gap-1 hover:bg-gray-200  cursor-pointer">
                    Admin
                    <ChevronDown className="h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuLabel>Admin Account</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem>Profile</DropdownMenuItem>
                  <DropdownMenuItem>Settings</DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={handleLogout}>
                    <LogOut className="mr-2 h-4 w-4" />
                    <span>Logout</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        </header>

        <main className="flex-1 container py-6">
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
                  {humidity > 70
                    ? "Above optimal range"
                    : humidity < 60
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
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium flex items-center">
                  <Droplets className="mr-2 h-4 w-4 text-green-600" />
                  Soil Moisture 1
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{soil1}%</div>
                <p className="text-xs text-muted-foreground">Optimal range: 40-60%</p>
                <div
                  className={`mt-2 text-xs ${soil1 > 60 || soil1 < 40 ? "text-amber-500" : "text-green-500"}`}
                >
                  {soil1 > 60
                    ? "Above optimal range"
                    : soil1 < 40
                      ? "Below optimal range"
                      : "Within optimal range"}
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium flex items-center">
                  <Droplets className="mr-2 h-4 w-4 text-green-600" />
                  Soil Moisture 2
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{soil2}%</div>
                <p className="text-xs text-muted-foreground">Optimal range: 40-60%</p>
                <div
                  className={`mt-2 text-xs ${soil2 > 60 || soil2 < 40 ? "text-amber-500" : "text-green-500"}`}
                >
                  {soil2 > 60
                    ? "Above optimal range"
                    : soil2 < 40
                      ? "Below optimal range"
                      : "Within optimal range"}
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium flex items-center">
                  <Droplets className="mr-2 h-4 w-4 text-green-600" />
                  Soil Moisture 3
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{soil3}%</div>
                <p className="text-xs text-muted-foreground">Optimal range: 40-60%</p>
                <div
                  className={`mt-2 text-xs ${soil3 > 60 || soil3 < 40 ? "text-amber-500" : "text-green-500"}`}
                >
                  {soil3 > 60
                    ? "Above optimal range"
                    : soil3 < 40
                      ? "Below optimal range"
                      : "Within optimal range"}
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium flex items-center">
                  <Droplets className="mr-2 h-4 w-4 text-green-600" />
                  Soil Moisture 4
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{soil4}%</div>
                <p className="text-xs text-muted-foreground">Optimal range: 40-60%</p>
                <div
                  className={`mt-2 text-xs ${soil4 > 60 || soil4 < 40 ? "text-amber-500" : "text-green-500"}`}
                >
                  {soil4 > 60
                    ? "Above optimal range"
                    : soil4 < 40
                      ? "Below optimal range"
                      : "Within optimal range"}
                </div>
              </CardContent>
            </Card>
            
          </div>

          <div className="mt-6">
            <Tabs defaultValue="controls">
              <TabsList className="grid w-full grid-cols-2 bg-gray-100">
                <TabsTrigger value="charts">Charts & Analytics</TabsTrigger>
                <TabsTrigger value="alerts">Alerts & Logs</TabsTrigger>
              </TabsList>
              <TabsContent value="charts" className="mt-4">
                <Card>
                  <CardHeader>
                    <CardTitle>Environmental Trends</CardTitle>
                    <CardDescription>Temperature and humidity over the last 24 hours</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="h-[300px] w-full bg-muted/30 rounded-md flex items-center justify-center">
                      {/* <p className="text-muted-foreground">Chart visualization would appear here</p> */}
                      <SensorChart />
                    </div>
                    
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="alerts" className="mt-4">
                <Card>
                  <CardHeader>
                    <CardTitle>System Alerts</CardTitle>
                    <CardDescription>Recent alerts and system logs</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex items-start space-x-4 rounded-md border p-4">
                        <AlertTriangle className="h-5 w-5 text-amber-500 mt-0.5" />
                        <div className="space-y-1">
                          <p className="text-sm font-medium">Humidity Alert</p>
                          <p className="text-sm text-muted-foreground">Humidity levels rising above optimal range</p>
                          <p className="text-xs text-muted-foreground">Today, 10:42 AM</p>
                        </div>
                      </div>
                      <div className="flex items-start space-x-4 rounded-md border p-4">
                        <Thermometer className="h-5 w-5 text-green-500 mt-0.5" />
                        <div className="space-y-1">
                          <p className="text-sm font-medium">Temperature Optimal</p>
                          <p className="text-sm text-muted-foreground">Temperature returned to optimal range</p>
                          <p className="text-xs text-muted-foreground">Today, 9:15 AM</p>
                        </div>
                      </div>
                      <div className="flex items-start space-x-4 rounded-md border p-4">
                        <Wind className="h-5 w-5 text-blue-500 mt-0.5" />
                        <div className="space-y-1">
                          <p className="text-sm font-medium">Ventilation Activated</p>
                          <p className="text-sm text-muted-foreground">Automatic ventilation system activated</p>
                          <p className="text-xs text-muted-foreground">Yesterday, 4:30 PM</p>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button variant="outline" className="w-full">
                      View All Logs
                    </Button>
                  </CardFooter>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </main>
      </div>
    </SidebarProvider>
  )
}
