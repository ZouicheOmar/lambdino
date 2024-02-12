/** @format */

export default async function Home() {
  return (
    <div className="z-10 max-w-5xl w-full flex flex-col gap-6 text-sm lg:flex">
      <div className="w-full flex flex-col gap-6">
        <p>Boards list simulation</p>
        <div className="flex gap-2 flex-col">
          <ul className="list-disc list-inside">
            TODOS
            <li>Structure the calls to looks like OG messboard</li>
            <li>Refactor all the needed Dynamodb methods</li>
            <li>configure reading and writing to be maximum 400kb </li>
            <li>cached data and fetch calls</li>
          </ul>

          <ul className="list-disc list-inside text-neutral-400">
            <span className="text-white">DONE</span>
            <li>Add item to dynamo db</li>
            <li>Query tables from dynamodb</li>
            <li>Sort the process.env variables...</li>
            <li>Add json to dynamodb</li>
            <li>
              look for the writing and reading capacity
              <br />
              <span className="text-xs text-neutral-400">
                If i need to get a board with 20 cards and the reading capacity
                is only 5, will I have a problem ?
              </span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  )
}
