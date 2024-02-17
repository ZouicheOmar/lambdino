/** @format */
"use client"

import useScroll from "@/hooks/useScroll"
import useHotkey from "@/hooks/useHotkey"
import useZoom from "@/hooks/useZoom"
import usePointer from "@/hooks/usePointer"
import useInitBoard from "@/hooks/useInitBoard"

import Panel from "@/components/panel/Panel"
import Board from "@/components/board/Board"
import {Toaster} from "@/components/ui/sonner"

export default function Page() {
  useHotkey()
  useZoom()
  useInitBoard()

  const handleWheel = useScroll()
  const {handlePointerDown, handlePointerMove} = usePointer()

  return (
    <div
      className="fixed w-full h-full bg-zinc-800 top-0 left-0 m-0 pl-[11rem] pt-[2rem] box-border flex"
      onWheel={handleWheel}
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      id="mainWrapper"
    >
      <Panel />
      <Board />
      <Toaster />
    </div>
  )
}
