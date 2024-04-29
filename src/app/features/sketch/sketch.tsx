"use client"
import { motion, useAnimationControls } from "framer-motion"
import { cloneElement, forwardRef, useEffect, useRef, useState } from "react"
import { Svg2Roughjs } from "svg2roughjs"

export function Sketch({
  draw,
  dashed,
  className,
}: {
  className?: string
  dashed?: true
  draw: React.ReactElement
}) {
  const [initial, setInitial] = useState(true)
  const input = useRef<HTMLDivElement>(null)
  const output = useRef<SVGSVGElement>(null)
  const controls = useAnimationControls()

  useEffect(() => {
    if (!output.current || !input.current) return

    const rough = new Svg2Roughjs(output.current, undefined, {
      strokeWidth: 5,
      stroke: "#000",
      simplification: 0.8,
      fillWeight: 5,
      fillStyle: "zigzag",
      strokeLineDash: dashed ? [10, 15] : undefined,
      roughness: 2.5,
      bowing: 1.5,
      disableMultiStrokeFill: true,
      disableMultiStroke: true,
    })
    rough.svg = input.current.children[0] as SVGSVGElement
    rough.randomize = false
    rough.seed = 1

    const handleInterval = () => {
      // Change the seed to control the 1 of 3 frames
      rough.seed = Math.max((rough.seed! + 1) % 5, 1)

      // Refresh the sketch
      void (async () => {
        await rough.sketch()
        void controls.start({ rotateZ: rough.seed! % 2 == 0 ? -1 : 1 })

        // Animate the sketch into first view
        if (initial)
          await controls.start(
            { opacity: 1, scale: [0.95, 1], rotateZ: [-12, 0] },
            { type: "spring" },
          )
      })()
    }
    handleInterval()
    setInitial(false)
    const interval = setInterval(handleInterval, 400)

    return () => {
      clearInterval(interval)
    }
  }, [output, draw, controls, initial])

  const Child = forwardRef((props, ref) => {
    return cloneElement(draw, { ...props, ref })
  })
  Child.displayName = "Sketch"

  return (
    <div className={className}>
      <div className="relative">
        <div className="absolute left-1/2 top-0 w-full -translate-x-1/2">
          <motion.svg
            ref={output}
            initial={{ opacity: 0 }}
            animate={controls}
          />
        </div>
        <div className="opacity-0" ref={input}>
          <Child />
        </div>
      </div>
    </div>
  )
}
