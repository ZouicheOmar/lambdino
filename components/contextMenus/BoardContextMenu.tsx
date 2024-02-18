/** @format */
import {useCardStore} from "@/stores/cards"

// import InsertImageDialog from "./InsertImage";
// import { ContextMenu, ContextMenuTrigger } from "./ui/context-menu";
import UploadImageDialog from "../dialogs/UploadImage"
import {ContextMenuContent, ContextMenuItem} from "../ui/context-menu"
import {Link2Icon} from "@radix-ui/react-icons"

export default function BoardContextMenu() {
  // const { addCard, addNoteCard, addCodeCard, addMDCard } = useCardStore();
  const addCard = useCardStore((s) => s.addCard)
  const openBoard = useCardStore((s) => s.openBoard)

  if (openBoard) {
    return (
      <ContextMenuContent className="p-0 gap-0 divide-x-0 shadow-lg overflow-hidden bg-neutral-900 w-40 rounded">
        <ContextMenuItem
          className="focus:bg-neutral-800 rounded-none"
          onSelect={() => addCard("url")}
        >
          <span>url</span>
          <Link2Icon className="ml-2  h-4 w-4" />
        </ContextMenuItem>
        <ContextMenuItem
          className="focus:bg-neutral-800 justify-between px-2 py-1 rounded-none w-full text-sm hover:bg-neutral-800"
          onSelect={() => addCard("note")}
        >
          <span>add note</span>
        </ContextMenuItem>
        <ContextMenuItem
          className="focus:bg-neutral-l justify-between px-2 py-1  w-full text-sm hover:bg-neutral-800 rounded-none"
          onSelect={() => addCard("code")}
        >
          <span>add code</span>
        </ContextMenuItem>
        <ContextMenuItem
          className="focus:bg-neutral-l justify-between px-2 py-1  w-full text-sm hover:bg-neutral-800 rounded-none"
          onSelect={() => addCard("markdown")}
        >
          <span>add markdown</span>
        </ContextMenuItem>
        <ContextMenuItem asChild>
          <UploadImageDialog />
        </ContextMenuItem>
      </ContextMenuContent>
    )
  }
}
