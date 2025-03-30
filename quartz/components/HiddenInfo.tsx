import { QuartzComponentConstructor } from "./types"

export default (() => {
  const HiddenInfo = () => {
    // force the component to render something
    return <div id="hidden-info-script-hook" style={{ display: "none" }}></div>
  }

  HiddenInfo.afterDOMLoaded = `
    console.log("[HiddenInfo] script attached!")

    document.addEventListener("nav", () => {
      console.log("[HiddenInfo] nav triggered")

      document.querySelectorAll(".hidden-info").forEach(wrapper => {
        const lock = wrapper.querySelector(".hidden-info-lock")
        const body = wrapper.querySelector(".hidden-info-body")

        if (lock && body) {
          console.log("[HiddenInfo] found section")
          const clickHandler = () => {
            console.log("[HiddenInfo] lock clicked")
            const passcode = prompt("Enter passcode to reveal:")
            if (passcode === "OAScribe") {
              body.style.display = "block"
              lock.style.display = "none"
            } else {
              alert("Incorrect password.")
            }
          }

          lock.addEventListener("click", clickHandler)

          window.addCleanup(() => {
            lock.removeEventListener("click", clickHandler)
          })
        }
      })
    })
  `

  return HiddenInfo
}) satisfies QuartzComponentConstructor
