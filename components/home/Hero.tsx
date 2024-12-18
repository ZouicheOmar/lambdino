/** @format */
import Image from "next/image"

export default function Hero() {
  return (
    <>
      <div className="w-full flex flex-col items-center gap-10">
        <Image
          className="relative dark:drop-shadow-[0.5rem_0_0.5rem_#64748b75] light:invert"
          src="/logo.svg"
          alt="Mess board Logo"
          width={700}
          height={37}
          priority
        />
        <p className="text-3xl md:text-5xl font-semibold text-center">
          Your personal repo for small text data
        </p>
        <p className="text-2xl lg:w-1/3 opacity-70 text-center">
          Free from the constraint of keeping everything tidy
        </p>
        <button className="text-lg border rounded bg-secondary px-2 py-1">
          try it out
        </button>
      </div>
    </>
  )
}
