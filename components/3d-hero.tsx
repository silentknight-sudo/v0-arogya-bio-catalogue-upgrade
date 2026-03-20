"use client"

import { useRef, useEffect, useState } from "react"
import { Canvas, useFrame } from "@react-three/fiber"
import { OrbitControls, Environment, Text3D } from "@react-three/drei"
import * as THREE from "three"

function RotatingShape() {
  const meshRef = useRef<THREE.Mesh>(null)

  useFrame(() => {
    if (meshRef.current) {
      meshRef.current.rotation.x += 0.003
      meshRef.current.rotation.y += 0.005
    }
  })

  return (
    <mesh ref={meshRef} scale={1.5}>
      <icosahedronGeometry args={[1, 4]} />
      <meshStandardMaterial
        color="#5cb85c"
        emissive="#5cb85c"
        emissiveIntensity={0.3}
        wireframe
      />
    </mesh>
  )
}

function FloatingParticles() {
  const particlesRef = useRef<THREE.Points>(null)

  useEffect(() => {
    if (particlesRef.current) {
      const geometry = particlesRef.current.geometry
      const positions = new Float32Array(300 * 3)

      for (let i = 0; i < 300; i++) {
        positions[i * 3] = (Math.random() - 0.5) * 10
        positions[i * 3 + 1] = (Math.random() - 0.5) * 10
        positions[i * 3 + 2] = (Math.random() - 0.5) * 10
      }

      geometry.setAttribute("position", new THREE.BufferAttribute(positions, 3))
    }
  }, [])

  useFrame(() => {
    if (particlesRef.current) {
      particlesRef.current.rotation.x += 0.0002
      particlesRef.current.rotation.y += 0.0003
    }
  })

  return (
    <points ref={particlesRef}>
      <bufferGeometry />
      <pointsMaterial size={0.05} color="#d9a968" sizeAttenuation={true} />
    </points>
  )
}

export function Hero3D() {
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    // Detect if device is mobile
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768)
    }
    
    checkMobile()
    window.addEventListener("resize", checkMobile)
    
    return () => window.removeEventListener("resize", checkMobile)
  }, [])

  return (
    <div className="w-full h-screen relative overflow-hidden">
      <Canvas
        camera={{ position: [0, 0, 5], fov: 75 }}
        className="w-full h-full"
        style={{ touchAction: isMobile ? "auto" : "none" }}
      >
        {!isMobile && (
          <OrbitControls 
            enableZoom={false} 
            autoRotate 
            autoRotateSpeed={2}
            enablePan={false}
            enableRotate={false}
            touches={{
              ONE: THREE.TOUCH.ROTATE,
              TWO: THREE.TOUCH.DOLLY_PAN
            }}
          />
        )}
        <Environment preset="sunset" />
        
        <ambientLight intensity={0.6} />
        <pointLight position={[10, 10, 10]} intensity={0.8} />
        
        <RotatingShape />
        <FloatingParticles />
      </Canvas>

      <div className="absolute inset-0 flex flex-col items-center justify-center text-center pointer-events-none z-10">
        <h1 className="text-6xl md:text-7xl font-bold text-primary mb-4 drop-shadow-xl">
          Arogyabio
        </h1>
        <p className="text-xl md:text-2xl text-primary/80 max-w-2xl drop-shadow-lg mb-8">
          Ancient Wisdom, Modern Wellness
        </p>
        <div className="flex gap-4 pointer-events-auto">
          <button className="px-8 py-3 bg-primary text-primary-foreground rounded-full font-semibold hover:bg-primary/90 transition-all hover:scale-105">
            Explore
          </button>
          <button className="px-8 py-3 bg-primary/30 backdrop-blur-md text-primary rounded-full font-semibold hover:bg-primary/50 transition-all border border-primary/50">
            Learn More
          </button>
        </div>
      </div>
    </div>
  )
}
