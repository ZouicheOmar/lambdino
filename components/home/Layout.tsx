/** @format */

export default function Layout({children}) {
  return (
    <div className="z-10 mb-40 w-full flex flex-col pt-12 lg:pt-0 items-center gap-6 text-sm lg:flex">
      {children}
    </div>
  )
}
