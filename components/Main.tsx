/** @format */
"use client"

import useHotkey from "@/hooks/useHotkey"
import useZoom from "@/hooks/useZoom"
import useScroll from "@/hooks/useScroll"
import usePointer from "@/hooks/usePointer"

export default function Main({children}) {
  useHotkey()
  const handleWheel = useScroll()
  const {handlePointerDown, handlePointerMove} = usePointer()
  useZoom()

  return (
    <main
      className="flex h-screen flex-col  gap-10"
      onWheel={handleWheel}
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      id="mainWrapper"
    >
      {children}
    </main>
  )
}
