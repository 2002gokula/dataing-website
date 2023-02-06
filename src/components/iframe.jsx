import React, { useEffect, useRef, useState } from "react"
import Head from "next/head"

const subdomain = "graphity" // Replace with your custom subdomain
import { useRouter } from "next/router"

export default function RpmFrame({ userName, setRpmFrame }) {
  const frame = useRef(null)
  const [value, setValue] = useState("")
  const router = useRouter()

  useEffect(() => {
    if (frame.current === null || frame.current === undefined) return
    frame.current.setAttribute(
      "src",
      `https://${subdomain}.readyplayer.me/avatar?clearCache&frameApi&quality=low`
    )
    // frame.current.setAttribute("src", `https://${subdomain}.readyplayer.me/avatar?frameApi&darkTheme`);

    function subscribe(event) {
      const json = parse(event)

      if (json?.source !== "readyplayerme") {
        return
      }

      // Susbribe to all events sent from Ready Player Me once frame is ready
      if (json.eventName === "v1.frame.ready") {
        frame.current?.contentWindow?.postMessage(
          JSON.stringify({
            target: "readyplayerme",
            type: "subscribe",
            eventName: "v1.**",
          }),
          "*"
        )
        console.log("Frame is ready")
      }

      // Get avatar GLB URL
      if (json.eventName === "v1.avatar.exported") {
        setValue(json.data.url)
        // onOpen();
      }

      // Get user id
      if (json.eventName === "v1.user.set") {
        console.log(`User with id ${json.data.id} set: ${JSON.stringify(json)}`)
      }
    }

    function parse(event) {
      try {
        return JSON.parse(event.data)
      } catch (error) {
        return null
      }
    }

    window.addEventListener("message", subscribe)
    document.addEventListener("message", subscribe)

    return () => {
      window.removeEventListener("message", subscribe)
      document.removeEventListener("message", subscribe)
    }
  }, [])

  useEffect(() => {
    if (value == null || value == "") return
    updateValues()
  }, [value])

  async function updateValues() {
    await localStorage.setItem("avatarUrl", value)
    await localStorage.setItem(
      "metaverseLink",
      "https://prod2.streetverse.world/5q2DqBn/gentle-kooky-walkabout?name=" +
        userName +
        "&avatarUrl=" +
        value.split("/")[3].split(".")[0]
    )
    await setRpmFrame(false)
    await router.push("/avatar-upload")
  }
  return (
    <div>
      <Head>
        <title></title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <button
        onClick={() => setRpmFrame(false)}
        className="fixed bottom-2 rounded-[10px] left-4 z-30 px-8 py-4 bg-[#e34030] text-white cursor-pointer"
      >
        Cancel
      </button>
      <div
        className={
          value == ""
            ? "rounded-2xl z-40 fixed top-[2%] left-[2%] h-[90%] w-[96%] shadow-xl  "
            : ""
        }
      >
        <iframe
          width="100%"
          height="100%"
          ref={frame}
          id="frame"
          className="frame"
          allow="camera *; microphone *; clipboard-write"
        ></iframe>
      </div>
    </div>
  )
}