import { ClipboardCopyIcon } from "@heroicons/react/outline"
import { useEffect, useState } from "react"

export function CopyButton({ code }: any) {
  let [copyCount, setCopyCount] = useState(0)
  let copied = copyCount > 0

  useEffect(() => {
    if (copyCount > 0) {
      let timeout = setTimeout(() => setCopyCount(0), 1000)
      return () => {
        clearTimeout(timeout)
      }
    }
  }, [copyCount])

  return (
    <button
      type="button"
      className={`group/button absolute top-3.5 right-4 overflow-hidden rounded-full py-1 pl-2 pr-3 text-2xs font-medium opacity-0 backdrop-blur transition focus:opacity-100 group-hover:opacity-100 ${copied
        ? 'bg-teal-400/80 ring-1 ring-inset ring-teal-200/20'
        : 'bg-vulcan-200 hover:bg-vulcan-100'}`}
      onClick={() => {
        window.navigator.clipboard.writeText(code).then(() => {
          setCopyCount((count) => count + 1)
        })
      }}
    >
      <span
        aria-hidden={copied}
        className={`pointer-events-none flex items-center gap-0.5 text-whisper-400 transition duration-300 ${copied && '-translate-y-1.5 opacity-0'}`}
      >
        <ClipboardCopyIcon className="h-5 w-5 fill-whisper-500/20 stroke-whisper-500 transition-colors group-hover/button:stroke-whisper-400" />
        Copy
      </span>
      <span
        aria-hidden={!copied}
        className={`pointer-events-none absolute inset-0 flex items-center justify-center text-whisper-400 transition duration-300 ${!copied && 'translate-y-1.5 opacity-0'}`}
      >
        Copied!
      </span>
    </button>
  )
}