/** @format */

import {useState, useEffect} from "react"
import {useAuth} from "@clerk/nextjs"
// import {useShallow} from "zustand/react/shallow"

import {useCardStore} from "@/stores/cards"
import useUiStore from "@/stores/uiStore"

import {closeDrawer} from "@/utils/positions"

import putBoard from "@/utils/putBoard"

import {Button} from "@/components/ui/button"
import {
  Drawer as DrawerMenu,
  DrawerClose,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer"
import {Dialog, DialogContent, DialogTrigger} from "@/components/ui/dialog"
import {Tabs, TabsContent, TabsList, TabsTrigger} from "@/components/ui/tabs"
import {
  CheckCircledIcon,
  Cross2Icon,
  EyeOpenIcon,
  FileIcon,
} from "@radix-ui/react-icons"
import {Toaster, toast} from "sonner"
import {useUserStore} from "@/stores/user"
import {Input} from "../ui/input"
import {Badge} from "../ui/badge"

const FilesList = () => {
  const getCards = useCardStore((s) => s.getCards)
  const selectModeOff = useUiStore((s) => s.selectModeOff)
  const topLeft = useUiStore((s) => s.topLeft)

  const handleSelectItem = (e, item) => {
    selectModeOff()
    getCards(item)
    closeDrawer()
    topLeft()
  }

  const boards = useCardStore((s) => s.boards)
  useEffect(() => {}, [])

  return (
    <TabsContent value="files">
      <div className="flex flex-col gap-3 ">
        <ul className="list-disc w-full list-inside ">
          {boards.length ? (
            boards.map((item, index) => (
              <li
                // className="hover:bg-accent rounded cursor-pointer transition-colors h-[1.5rem] px-2 flex items-center justify-between"
                className="hover:bg-accent rounded cursor-pointer transition-colors px-2 py-1 flex items-center justify-between"
                key={index}
                onClick={(e) => handleSelectItem(e, item)}
              >
                <span className="flex items-center gap-1">
                  <FileIcon />
                  {item}
                </span>
                {/* <Button variant="outline" size="icon">
                  <Cross2Icon className="h-4 w-4" />
                </Button> */}
              </li>
            ))
          ) : (
            <p className="text-start p-6">
              No boards here, please create a new board
            </p>
          )}
        </ul>
      </div>
    </TabsContent>
  )
}

const ImageList = () => {
  const {getImagesList, imagesList, cards} = useCardStore()

  useEffect(() => {
    getImagesList()
  }, [])

  const handlePointerDown = (e) => {
    e.target.dataset.active = e.target.dataset.active === "on" ? "off" : "on"
    console.log("toggle select mode")
  }

  return (
    <TabsContent value="images" className=" flex flex-col gap-3 ">
      <div className="flex flex-col gap-3 ">
        {imagesList.length !== 0 && (
          <div className="w-full text-base items-center flex justify-end px-1">
            <CheckCircledIcon
              data-active="off"
              onPointerDown={handlePointerDown}
              className="scale-110 data-[active=on]:text-indigo-500  transition-colors duration-300 cursor-pointer"
            />
          </div>
        )}

        <ul className="list-disc w-full list-inside ">
          {imagesList.map((item, index) => {
            return (
              <Dialog key={item}>
                <li className="hover:bg-neutral-800 rounded cursor-pointer transition-colors h-[1.5rem] px-2 flex justify-between items-center">
                  <span className="w-[10rem]  text-nowrap overflow-hidden">
                    {"image"}
                  </span>
                  <span>boardName</span>
                  <DialogTrigger asChild>
                    <EyeOpenIcon className="text-neutral-500 cursor-pointer hover:text-neutral-200 transition-colors duration-100" />
                  </DialogTrigger>
                </li>
                <DialogContent className="p-0 ">
                  <div className="p-1 rounded-[8px]   bg-neutral-300 transition-all duration-100">
                    <img
                      id={`${item}-image`}
                      src={`http://localhost:${
                        import.meta.env.VITE_PORT
                      }/${item}`}
                      // alt={cards[item].title || "image card"}
                      alt={"image card"}
                      className=" object-scale-down rounded-[6px]"
                    />
                  </div>
                </DialogContent>
              </Dialog>
            )
          })}
        </ul>
      </div>
    </TabsContent>
  )
}

const BodyFiles = () => {
  return (
    <Tabs defaultValue="files" className="relative grow p-1 border rounded-lg">
      <TabsList className="w-full bg-transparent">
        <TabsTrigger
          value="files"
          className="w-full data-[state=inactive]:opacity-25 translate-all duration-300"
        >
          Files
        </TabsTrigger>
        <TabsTrigger
          value="images"
          className="w-full data-[state=inactive]:opacity-25 translate-all duration-300"
        >
          Images
        </TabsTrigger>
      </TabsList>
      <FilesList />
      {/* <ImageList /> */}
    </Tabs>
  )
}

const BodyCreateNewFile = () => {
  const createFile = useCardStore((state) => state.createFile)
  const createBoard = useCardStore((state) => state.createBoard)
  const boards = useCardStore((state) => state.boards)
  const [value, setValue] = useState("")
  const [errorMessage, setErrorMessage] = useState("")
  const userId = useUserStore((s) => s.userId)

  const handlecreateFile = async (e) => {
    e.preventDefault()
    console.log(boards)
    if (boards.includes(value)) {
      setValue("")
      setErrorMessage("a board with this name already exists")
      return
    }
    createBoard(value)
  }

  const handleChange = (e) => {
    setErrorMessage("")
    setValue(e.target.value)
  }

  return (
    <div className="w-full p-3 gap-2 border rounded-lg">
      <span>Add a new board</span>
      <form
        className="w-full flex md:flex-col py-1 justify-start  gap-2 "
        onSubmit={handlecreateFile}
      >
        <Input
          type="text"
          placeholder="my new board"
          value={value}
          onChange={handleChange}
        />
        <Button type="submit">add</Button>
      </form>
      {errorMessage && (
        <p className="mt-1 animate-in fade-in-10 duration-500 bg-destructive/35 border rounded border-destructive text-destructive-foreground p-1 text-sm">
          {errorMessage}
        </p>
      )}
    </div>
  )
}

const BodyLeft = () => {
  return (
    <div className="flex flex-col gap-3 w-full md:w-2/5">
      <BodyFiles />
      <BodyCreateNewFile />
    </div>
  )
}

const BodyRight = () => {
  return (
    <div className="w-full md:w-3/5 md:h-full ">
      <div className="w-full h-full flex flex-col gap-6 p-3 border rounded-lg">
        {/* <p>
          This is mess board, add basic text cards, markdown cards, some code
          snippets and images.
          <br />
        </p> */}
        <div>
          <p> ⌨ Controls </p>
          <ul className="pl-2">
            {/* <li>
              <Badge variant="shortcut">ctrl</Badge>+
              <Badge variant="shortcut">Q</Badge>
              or W or E : focus on card with a shortcut
            </li>
            <li>
              {" "}
              <Badge variant="shortcut">ctrl</Badge>+
              <Badge variant="shortcut">J</Badge> or{" "}
              <Badge variant="shortcut">K</Badge> : toggle focus between cards
            </li> 
            <li>
              {" "}
              <Badge variant="shortcut">ctrl</Badge>+
              <Badge variant="shortcut">Z</Badge> : fit screen
            </li>
            */}
            <li>
              {" "}
              <Badge variant="shortcut">ctrl</Badge>+
              <Badge variant="shortcut">S</Badge> : save board
            </li>
            <li>
              {" "}
              <Badge variant="shortcut">ctrl</Badge>+
              <Badge variant="shortcut">G</Badge> : open / close drawer
            </li>
            <li>
              {" "}
              <Badge variant="shortcut">ctrl</Badge>+
              <Badge variant="shortcut">O</Badge> : go to boards top-left corner
            </li>
          </ul>
        </div>
      </div>
    </div>
  )
}

const Trigger = () => {
  return (
    <DrawerTrigger asChild>
      <Button
        onPointerDown={() => console.log("clicked")}
        id="drawerMenu"
        className="animate-in fade-in slide-in-from-left-5 duration-100 outline-none"
      >
        Mess Board
      </Button>
    </DrawerTrigger>
  )
}

const BodyHeader = () => {
  const fileName = useCardStore((s) => s.fileName)
  return (
    <DrawerHeader className=" flex justify-between">
      <DrawerTitle className="inline-flex items-center justify-start gap-1 content-center">
        {fileName === "" ? (
          <span>Empty Mess</span>
        ) : (
          <>
            <FileIcon />
            <span>{fileName}</span>
          </>
        )}
      </DrawerTitle>
    </DrawerHeader>
  )
}

const BodyFooter = () => {
  return (
    <DrawerFooter className="flex-none h-fit mb-0">
      <p className="w-full text-sm text-center text-neutral-700">
        Built by @Razal,{" "}
        <a href="https://www.ozdocs.fr/" target="_blank">
          ozdocs.com
        </a>
      </p>
    </DrawerFooter>
  )
}

const Body = () => {
  return (
    <>
      <DrawerContent
        className="text-sm border-none  ring-none outline-none h-full "
        onPointerDown={() => console.log("clicked on drawer body")}
      >
        <BodyHeader />
        <div className="flex flex-col md:flex-row flex-grow min-w-full h-full gap-3 px-4 py-0  ">
          <BodyLeft />
          <BodyRight />
        </div>
        <BodyFooter />
        <CloseButton />
      </DrawerContent>
    </>
  )
}

const CloseButton = () => {
  return (
    <DrawerClose asChild>
      <Button
        className="absolute top-1 right-1 bg-none border-none"
        id="drawer_close_button"
      >
        <Cross2Icon />
      </Button>
    </DrawerClose>
  )
}

export default function Drawer() {
  return (
    <DrawerMenu>
      <Trigger />
      <Body />
      <Toaster />
    </DrawerMenu>
  )
}
