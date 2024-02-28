/** @format */

import Drawer from "../drawer/Drawer"
import Controls from "./components/Controls"
import LogOutButton from "./components/LogOutButton"

const Panel = () => {
  return (
    <div
      className="fixed top-0 left-0 w-[9rem] px-[8px] text-sm h-full z-20 py-2"
      onPointerDown={(e) => e.stopPropagation()}
    >
      <div className="w-full h-fit  p-0 bg-neutral-900/70 flex flex-col gap-2 py-[4px] px-[4px] rounded">
        <Drawer />
        <Controls />
        <LogOutButton />
      </div>
    </div>
  )
}

export default Panel
