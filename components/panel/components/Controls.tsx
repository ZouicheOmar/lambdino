/** @format */
import {useCardStore} from "@/stores/cards"
import useUiStore from "@/stores/uiStore"

import usePositions from "@/hooks/usePositions"

import {useShallow} from "zustand/react/shallow"

import {Button} from "@/components/ui/button"
import {
  LayersIcon,
  CornerTopLeftIcon,
  DotFilledIcon,
  CheckIcon,
  ChevronDownIcon,
  ExitFullScreenIcon,
  CrumpledPaperIcon,
} from "@radix-ui/react-icons"
import {FitScreenIcon} from "@/components/Icons"
import {getRectById} from "@/utils/positions"

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

  const updatePositions = usePositions()

  const handleSave = () => {
    // updatePositions()
    writeThisFile()
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
        <Button onPointerDown={logState}>
          cards state
          <LayersIcon className="ml-2 h-4 w-4" />
        </Button>
        {/* <Button onPointerDown={organize} id="organize_button">
          organize
          <LayersIcon className="ml-2 h-4 w-4" />
        </Button> */}
        <Button
          id="originButton"
          onPointerDown={topLeft}
          className="animate-in fade-in slide-in-from-left-5 duration-100"
        >
          origin
          <CornerTopLeftIcon className="fill-white duration-300 ml-2  h-4 w-4" />
        </Button>
        <Button
          id="FitButton"
          onPointerDown={handleZoomToFit}
          className="animate-in fade-in slide-in-from-left-5 duration-100"
        >
          fit
          <FitScreenIcon className="fill-white duration-300 ml-2  h-4 w-4" />
        </Button>
        <Button
          onPointerDown={handleSave}
          id="saveButton"
          className="group animate-in fade-in slide-in-from-left-5 duration-100 "
        >
          save
          <DotFilledIcon className="group-hover:animate-wiggle ml-2 mt-[2px] h-4 w-4" />
        </Button>
        <Button
          onPointerDown={toggleSelect}
          className={` animate-in fade-in slide-in-from-left-5 duration-300 overflow-hidden `}
        >
          select
          <CheckIcon
          //   className={`${
          //      select && "stroke-indigo-500"
          //   } transition-colors duration-300 ml-2  h-4 w-4`}
          />
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
              //  disabled={anySelected !== 0 ? false : true}
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
              //  disabled={anySelected !== 0 ? false : true}
            >
              delete
              <CrumpledPaperIcon className=" ml-2 mt-[2px] h-4 w-4 transition-all duration-0 " />
            </Button>
            <Button
              onPointerDown={foldSelected}
              className="animate-in fade-in slide-in-from-left-5 transition-all duration-300  "
              //  disabled={anySelected !== 0 ? false : true}
            >
              fold / unfold
            </Button>
          </>
        )}
        {/* {focused && (
          <span className="w-full flex justify-around">
            <Button variant="outline" size="icon" OnPointerDown={focusPrevious}>
              <ChevronDownIcon className="rotate-90" />
            </Button>
            <Button variant="outline" size="icon" onPointerDown={focusOff}>
              <ExitFullScreenIcon />
            </Button>
            <Button variant="outline" size="icon" OnPointerDown={focusNext}>
              <ChevronDownIcon className="-rotate-90" />
            </Button>
          </span>
        )} */}
      </>
    )
  }
}
