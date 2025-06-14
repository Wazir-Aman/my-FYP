"use client";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { useEffect, useState } from "react";
import { onValue, ref } from "firebase/database";
import { database } from "@/lib/firebase"; // update the path to your firebase config

export default function SensorChart() {
  const [dataPoints, setDataPoints] = useState<any[]>([]);

  useEffect(() => {
    const sensorRef = ref(database, "SensorData");
    const unsubscribe = onValue(sensorRef, (snapshot) => {
      const sensorData = snapshot.val();
      const now = new Date().toLocaleTimeString();
      const point = {
        time: now,
        temperature: sensorData?.temperature || 0,
        humidity: sensorData?.humidity || 0,
        light: sensorData?.light || 0,
      };
      setDataPoints((prev) => [...prev.slice(-9), point]); // Keep last 10 readings
    });

    return () => unsubscribe();
  }, []);

  return (
    <div className="w-full h-72">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={dataPoints}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="time" />
          <YAxis domain={[0, 100]} />
          <Tooltip />
          <Line type="monotone" dataKey="temperature" stroke="#f97316" name="Temperature" />
          <Line type="monotone" dataKey="humidity" stroke="#3b82f6" name="Humidity" />
          <Line type="monotone" dataKey="light" stroke="#22c55e" name="Light" />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
