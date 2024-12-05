/** @format */
import { useEffect } from "react"

import { useCardStore } from "@/stores/cards"
import { useUserStore } from "@/stores/user"

export default function useInitBoard() {
  const setBoards = useCardStore((s) => s.setBoards);
  const boards = useCardStore((s) => s.boards);
  const getCards = useCardStore((s) => s.getCards)
  useEffect(() => {
    setBoards()
    boards.length && getCards(boards[0]);
  }, [boards])
}
