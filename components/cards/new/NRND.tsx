import useUiStore from "@/stores/uiStore";
import { Resizable } from "re-resizable"
import { useEffect, useRef, useState } from "react"

export default function NRND(props) {

  const ref = useRef(null);
  const handleref = useRef(null);
  const [rect, setrect] = useState(null);
  const mouseposition = useUiStore((s) => s.mouseposition);

  const [isdrag, setisdrag] = useState<boolean>(false);
  const [isresize, setisresize] = useState<boolean>(false);
  const [pos, setpos] = useState({ x: 0, y: 0 });
  const [shift, setshift] = useState(null); // x: number, y: number

  //quueee du css ?


  //setup
  useEffect(() => {
    const x = Math.floor(Math.random() * 300);
    const y = Math.floor(Math.random() * 300);
    setpos({ x: x, y: y });
    ref.current.style.transform = `translate(${x}px, ${y}px)`
  }, [])

  function drag() {
    ref.current.style.transform = `translate(${mouseposition.x - shift.x + rect.x}px, ${mouseposition.y - shift.y + rect.y}px)`
  }

  function resize() {
    const w = mouseposition.x - rect.left + 4;
    const h = mouseposition.y - rect.top + 4;
    ref.current.style.width = w + "px";;
    ref.current.style.height = h + "px";
  }

  useEffect(() => {
    if (!isdrag) return;
    drag();
  }, [isdrag, mouseposition.x, mouseposition.y])

  useEffect(() => {
    if (!isresize) return;
    resize();
  }, [isresize, mouseposition.x, mouseposition.y])

  function hpointerdown(e: PointerEvent) {
    e.stopPropagation();
    const rect = ref.current.getBoundingClientRect();
    const shift = { x: e.clientX, y: e.clientY };
    setrect(rect);
    setshift(shift);
    if (e.target === handleref.current) {
      setisresize(true);
      return;
    }
    setisdrag(true);
  }
  function hpointerup(e: PointerEvent) {
    setisdrag(false);
    setisresize(false);
  }

  return (
    <div
      className="card"
      onPointerDown={hpointerdown}
      onPointerUp={hpointerup}
      ref={ref}
    >
      {props.children}
      <span className="card-resizehandle" ref={handleref} />
    </div>
  )
}
