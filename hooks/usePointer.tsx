/** @format */
import { useCallback, useEffect } from "react"
import useUiStore from "@/stores/uiStore"
import { useCardStore } from "@/stores/cards"
import { getRectById } from "../utils/positions"

export default function usePointer() {
  const selectModeOff = useUiStore((s) => s.selectModeOff)
  const setMx = useUiStore((s) => s.setMx)
  const setMy = useUiStore((s) => s.setMy)
  const groupSelected = useCardStore((s) => s.groupSelected)
  const groupMode = useCardStore((s) => s.groupMode)

  const handlePointerDown = useCallback((e) => {
    setMx(e.nativeEvent.clientX)
    setMy(e.nativeEvent.clientY)

    if (groupMode) {
      const boardRect = getRectById("board")
      if (boardRect !== undefined) {
        const point = {
          x: e.nativeEvent.clientX - boardRect.x,
          y: e.nativeEvent.clientY - boardRect.y - 30,
        }

        groupSelected(point)
      } else {
        console.log("board bounding rect is undefined")
      }
    }

    if (
      !e.target.id.includes("select") &&
      !e.target.id.includes("mousePointer")
    ) {
      selectModeOff()
    }
  }, [])

  const handlePointerMove = (e) => {
    if (groupMode) {
      setMx(e.nativeEvent.clientX)
      setMy(e.nativeEvent.clientY)
    }
  }

  useEffect(() => {
    document.addEventListener("pointermove", handlePointerMove);
    return () => document.removeEventListener("pointermove", handlePointerMove);
  }, [])

  return { handlePointerDown, handlePointerMove }
}
