/** @format */

import Image from "next/image"

export default function Illustrations() {
  return (
    <div className="w-screen bg-slate-800 p-10 md:p-15 flex flex-col items-center gap-10">
      <p className="text-xl md:w-1/2">
        When an idea comes to mind, or by stumbling on an interesting article
        you want to read later, or by discovering a website, or a beautiful
        image, and you lack time to find the a proper way to organize all this,
        use mess board. Paste your link, save your image, your note or code
        snippet
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 place-items-center  w-fit">
        <div className="flex flex-col items-center gap-2 bg-slate-600 p-2 w-fit h-fit rounded">
          <span className="text-xl font-semibold">
            save text data in note cards
          </span>
          <Image
            src="/homescreenshot2.png"
            width={400}
            height={400}
            alt="screenshot"
            className="rounded shadow-xl"
          />
        </div>
        <div className="flex flex-col items-center gap-2 bg-slate-600 p-2 w-fit h-fit rounded">
          <span className="text-xl font-semibold">even code snippets</span>
          <Image
            src="/homescreenshot3.png"
            width={400}
            height={400}
            alt="screenshot"
            className="rounded shadow-xl"
          />
        </div>
        <div className="flex flex-col items-center gap-2 bg-slate-600 p-2 w-fit h-fit rounded">
          <span className="text-xl font-semibold">or markdown</span>
          <Image
            src="/homescreenshot4.png"
            width={400}
            height={400}
            alt="screenshot"
            className="rounded shadow-xl"
          />
        </div>
        <div className="flex flex-col items-center gap-2 bg-slate-600 p-2 w-fit h-fit rounded">
          <span className="text-xl font-semibold">
            keep urls to your favorite sites
          </span>
          <Image
            src="/homescreenshot.png"
            width={400}
            height={400}
            alt="screenshot"
            className="rounded shadow-xl"
          />
        </div>
        {/* <div>and even images and markdown ...</div> */}
      </div>
      <div className="grid grid-cols-1 gap-6 place-items-center  w-fit">
        <div className="flex flex-col gap-2 bg-slate-600 p-2 w-fit h-fit rounded">
          <span className="text-xl font-semibold ">
            Resize your cards to the size that suits
          </span>
          <Image
            src="/gib.gif"
            width={700}
            height={400}
            alt="screenshot"
            className="rounded shadow-xl"
          />
        </div>

        <div className="flex flex-col gap-2 bg-slate-600 p-2 w-fit h-fit rounded">
          <span className="text-xl font-semibold">
            Drag and drop cards freely
          </span>
          <Image
            src="/gifa.gif"
            width={700}
            height={400}
            alt="screenshot"
            className="rounded shadow-xl"
          />
        </div>
      </div>
    </div>
  )
}
