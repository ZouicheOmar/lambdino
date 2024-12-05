/** @format */
"use client"

import useHotkey from "@/hooks/useHotkey"
import useZoom from "@/hooks/useZoom"
import useScroll from "@/hooks/useScroll"
import usePointer from "@/hooks/usePointer"
import React from "react"

export default function Main({ children }: { children: React.ReactNode }) {
  useHotkey()
  const handleWheel = useScroll()
  const { handlePointerDown, handlePointerMove } = usePointer()
  useZoom()

  return (
    <main
      className="flex h-screen flex-col  gap-10"
    >
      <div
        className="fixed w-full h-full top-0 left-0 m-0 pl-[11rem] pt-[2rem] box-border flex bg-slate-800"
        onWheel={handleWheel}
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        id="mainWrapper"
      >
        {children}
      </div>
    </main>
  )
}
