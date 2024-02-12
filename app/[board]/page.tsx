/** @format */
"use client"
import {useContext, useEffect, useRef, useState} from "react"
import Link from "next/link"

export default function Page({params}) {
  const {board} = params
  return (
    <div className="z-10 max-w-5xl w-full items-center justify-between  text-sm flex flex-col gap-6 lg:flex ">
      <div className="w-full flex justify-between">
        <p className="text-xl">
          <Link href="/" className="hover:underline ">
            Home
          </Link>{" "}
          / Board
        </p>
        <p className="text-xl">{board}</p>
      </div>
      <div className="w-full flex flex-col gap-2 items-center"></div>
    </div>
  )
}
