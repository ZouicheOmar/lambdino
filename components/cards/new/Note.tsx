/** @format */
import { useState, useCallback } from "react"

import { useShallow } from "zustand/react/shallow"
import { useCardStore } from "@/stores/cards"

import BottomIcons from "./components/BottomIcons"
import NRND from "@/components/cards/new/NRND"

const Head = (props) => {
  return (
    <div className="card-head"> <input placeholder="card title" /> </div>
  )
}

const Body = (props) => {
  return (
    <div className="card-body"> <textarea placeholder="card textarea and body" /> </div>
  )
}

const Note = (props) => {
  return (
    <>
      <NRND>
        <Head />
        <Body />
      </NRND>
    </>
  )
}

export default Note
