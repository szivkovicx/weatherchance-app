"use client";

// React
import { useState } from 'react';

// Components
import { LocationInput, InfoCircle, EnvironmentSlider } from "@/components"

// Types
import { APIResponse } from '@/types';

export default function Home() {
  const [data, setData] = useState<APIResponse>();

  return (
    <main>
      <div style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column',
        position: "absolute",
        top: "50%",
        left: "50%",
        transform: "translateX(-50%) translateY(-50%)",
        gap: 30,
        borderRadius: 20,
        padding: 20,
        borderStyle: 'solid',
        borderColor: "rgba(0, 0, 255, .3)",
        borderWidth: 5,
        boxShadow: '12px 12px 2px 1px rgba(0, 0, 255, .2)'
      }}>
          <div style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            flexDirection: 'column'
          }}>
            <h1 style={{
              fontWeight: 'normal'
            }}>🌦 WeatherChance</h1>
            <LocationInput onSearch={(data) => setData(data)} />
          </div>
          {data && <InfoCircle data={data} />}
          {data && <EnvironmentSlider data={data} />}        
      </div>
    </main>
  )
}
