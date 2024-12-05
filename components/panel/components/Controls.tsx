/** @format */
import { useShallow } from "zustand/react/shallow"

import { useCardStore } from "@/stores/cards"
import useUiStore from "@/stores/uiStore"
import usePositions from "@/hooks/usePositions"

import { Button } from "@/components/ui/button"
import {
  LayersIcon,
  CornerTopLeftIcon,
  DotFilledIcon,
  CheckIcon,
  ChevronDownIcon,
  ExitFullScreenIcon,
  CrumpledPaperIcon,
} from "@radix-ui/react-icons"
import { FitScreenIcon } from "@/components/Icons"

import { getRectById } from "@/utils/positions"
import { use } from "react"

export default function Controls() {
  const {
    deleteSelected,
    writeThisFile,
    fileName,
    organize,
    focus,
    focused,
    focusPrevious,
    focusNext,
    foldSelected,
    toggleGroupMode,
    getCanvaSize,
    logState,
  } = useCardStore(
    useShallow((s) => ({
      deleteSelected: s.deleteSelected,
      writeThisFile: s.writeThisFile,
      fileName: s.fileName,
      organize: s.organize,
      focus: s.focus,
      focused: s.focused,
      focusPrevious: s.focusPrevious,
      focusNext: s.focusNext,
      foldSelected: s.foldSelected,
      toggleGroupMode: s.toggleGroupMode,
      getCanvaSize: s.getCanvaSize,
      logState: s.logState,
    }))
  )

  const {
    toggleSelect,
    select,
    selectAll,
    deselectAll,
    anySelected,
    center,
    fitScreen,
    topLeft,
    zoomToFit,
    uiState,
  } = useUiStore(
    useShallow((s) => ({
      toggleSelect: s.toggleSelect,
      select: s.select,
      selectAll: s.selectAll,
      deselectAll: s.deselectAll,
      anySelected: s.anySelected,
      center: s.center,
      fitScreen: s.fitScreen,
      topLeft: s.topLeft,
      zoomToFit: s.zoomToFit,
      uiState: s.uiState,
    }))
  )

  const cards = useCardStore((s) => s.cards);

  const updatePositions = usePositions()

  const handleSave = () => {
    console.log("cards from saved :", cards)
  }

  const focusOff = () => {
    console.log("focused", focused)
    const id = focused
    const rndId = focused + "-rnd"
    focus(id, rndId)
  }

  const handleCenter = (e) => {
    if (!fitScreen) {
      getCanvaSize()
    }
    setTimeout(() => center(), 500)
  }

  const handleZoomToFit = () => {
    zoomToFit()
  }

  if (fileName) {
    return (
      <>
        <Button
          id="originButton"
          onPointerDown={topLeft}
          className="animate-in fade-in slide-in-from-left-5 duration-100"
        >
          origin
          <CornerTopLeftIcon className="fill-white duration-300 ml-2  h-4 w-4" />
        </Button>
        <Button
          onPointerDown={toggleSelect}
          className={` animate-in fade-in slide-in-from-left-5 duration-300 overflow-hidden `}
        >
          select
          <CheckIcon />
        </Button>
        {select && (
          <>
            <Button
              onPointerDown={selectAll}
              className="animate-in fade-in slide-in-from-left-5 duration-300  "
            >
              all
            </Button>
            <Button
              onPointerDown={deselectAll}
              className="animate-in fade-in slide-in-from-left-5 duration-300 "
            >
              deselect
            </Button>
            <Button
              onPointerDown={() => toggleGroupMode(true)}
              className="animate-in fade-in slide-in-from-left-5 h-9 duration-300 "
              // disabled={anySelected !== 0 ? false : true}
              disabled
            >
              group
            </Button>

            <Button
              onPointerDown={deleteSelected}
              className="group animate-in hover:text-red-500 fade-in slide-in-from-left-5 transition-all duration-300  "
            >
              delete
              <CrumpledPaperIcon className=" ml-2 mt-[2px] h-4 w-4 transition-all duration-0 " />
            </Button>
            <Button
              onPointerDown={foldSelected}
              className="animate-in fade-in slide-in-from-left-5 transition-all duration-300  "
              disabled
            >
              fold / unfold
            </Button>
          </>
        )}
        <Button onPointerDown={organize}
          id="organize_button"
          disabled
        >
          organize
          <LayersIcon className="ml-2 h-4 w-4" />
        </Button>
        <Button
          id="FitButton"
          onPointerDown={handleZoomToFit}
          className="animate-in fade-in slide-in-from-left-5 duration-100"
          disabled
        >
          fit
          <FitScreenIcon className="fill-white duration-300 ml-2  h-4 w-4" />
        </Button>
        <Button
          onPointerDown={handleSave}
          id="saveButton"
          className="group animate-in fade-in slide-in-from-left-5 duration-100 "
        // disabled
        >
          save
          <DotFilledIcon className="group-hover:animate-wiggle ml-2 mt-[2px] h-4 w-4" />
        </Button>
      </>
    )
  }
}
