import Script from "next/script"

import { CreatePost } from "~/app/_components/create-post"
import { api } from "~/trpc/server"
import { Sketch } from "./features/sketch/sketch"
import { UnderlineSketch } from "./features/sketch/drawings/Underline"
import { LeftArrowSketch } from "./features/sketch/drawings/left-arrow"
import { OoFaceSketch } from "./features/sketch/drawings/oo-face"
import { SmileFaceSketch } from "./features/sketch/drawings/smile-face"
import { SpiderSketch } from "./features/sketch/drawings/spider"

export default async function Home() {
  return (
    <>
      <Script src="https://tally.so/widgets/embed.js" />

      <main className="flex min-h-screen flex-col items-center justify-center bg-amber-50 text-black">
        <h1 className="mb-32 font-comic text-4xl font-bold">
          help us bring spidey to life!
        </h1>

        <div className="relative flex flex-col gap-2">
          <Sketch
            className="absolute -top-12 right-full mr-16"
            draw={<OoFaceSketch />}
          />
          <Sketch
            className="absolute -top-20 left-4"
            draw={<SmileFaceSketch />}
          />
          <Sketch
            className="absolute -top-16 right-6"
            draw={<SpiderSketch />}
          />
          <button
            className="rounded-xl bg-brand px-4 py-2 text-2xl font-semibold text-amber-50 hover:opacity-80 active:translate-y-0.5"
            data-tally-hide-title="1"
            data-tally-open="waB099"
            data-tally-layout="modal"
            data-tally-emoji-text="🫶"
            data-tally-emoji-animation="rubber-band"
            data-tally-auto-close="1000"
          >
            join the waitlist
          </button>
          <Sketch
            className="absolute -top-20 left-full -rotate-[50deg]"
            draw={<LeftArrowSketch />}
          />
          <Sketch className="self-center" draw={<UnderlineSketch />} />
        </div>

        <p className="mt-5 font-comic text-sm font-bold">
          if you join, we&apos;ll give you 2 months of free access when we
          launch!!!!
        </p>
      </main>
    </>
  )
}

async function CrudShowcase() {
  const latestPost = await api.post.getLatest()

  return (
    <div className="w-full max-w-xs">
      {latestPost ? (
        <p className="truncate">Your most recent post: {latestPost.name}</p>
      ) : (
        <p>You have no posts yet.</p>
      )}

      <CreatePost />
    </div>
  )
}
