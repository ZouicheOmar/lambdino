/** @format */

import Footer from "@/components/Footer"

export default function Page() {
  return (
    <>
      <div className="md:p-10 mt-[4rem] max-w-5xl mb-[10rem] flex mx-auto flex-col gap-4">
        <p className="font-mono text-3xl">about/</p>
        <div className="bg-secondary/45  p-2 rounded">
          <p className="text-lg font-semibold">What is Mess Board</p>
          <p className="text-pretty">
            Mess board is a tool to save whatever text, code snippets, images,
            urls you want to store, without the burden of keeping tidy organized
            folders
          </p>
        </div>
        <div className="bg-secondary/45 p-2 rounded">
          <p className="text-lg font-semibold">How to use</p>
          <p className="text-pretty">
            Simply create a board and put whatever you want on it, arrange it
            freely
          </p>
        </div>
        <div className="bg-secondary/45  p-2 rounded">
          <p className="text-lg font-semibold">Supported data types</p>
          <ul className="list-disc list-inside">
            <li>text</li>
            <li>code</li>
            <li>markdown</li>
            <li>images (jpeg, png, webp, gif)</li>
          </ul>
        </div>

        <div className="bg-secondary/45  p-2 rounded">
          <p className="text-lg font-semibold">Contact and support</p>
          <p className="text-pretty">
            feel free to reach out via
            <a
              href="mailto:zouiche.dev.omar@gmail.com?subject = Feedback&body = Message"
              target="blank"
              rel="noreferrer"
              className="text-indigo-300"
            >
              {" "}
              email{" "}
            </a>
            or
            <a
              href="https://www.linkedin.com/in/omar-zouiche-aaab27274/"
              target="blank"
              rel="noreferrer"
              className="text-indigo-300"
            >
              {" "}
              linkedin{" "}
            </a>
          </p>
        </div>
      </div>
    </>
  )
}
