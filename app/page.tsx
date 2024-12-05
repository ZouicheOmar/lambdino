/** @format */
"use client"

import useScroll from "@/hooks/useScroll"
import useHotkey from "@/hooks/useHotkey"
import useZoom from "@/hooks/useZoom"
import usePointer from "@/hooks/usePointer"
import useInitBoard from "@/hooks/useInitBoard"

import Panel from "@/components/panel/Panel"
import Board from "@/components/board/Board"
import { Toaster } from "@/components/ui/sonner"
import useUiStore from "@/stores/uiStore"
import { useEffect } from "react"
import Main from "@/components/Main"

export default function Page() {
  useHotkey()
  useZoom()
  useInitBoard();
  const handleWheel = useScroll()
  const { handlePointerDown, handlePointerMove } = usePointer()

  return (
    <Main>
      <Panel />
      <Board />
      <Toaster />
    </Main>
  )
}
