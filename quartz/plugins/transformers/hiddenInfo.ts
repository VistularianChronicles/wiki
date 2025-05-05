import { QuartzTransformerPlugin } from "../types"
import { visit } from "unist-util-visit"
import { Node } from "unist"
import { headingRange } from "mdast-util-heading-range"

// const HiddenInfo: QuartzTransformerPlugin = () => {
//   return {
//     name: "HiddenInfoAST",
//     markdownPlugins() {
//       return [
//         () => {
//           return (tree) => {
//             headingRange(tree, "Hidden Information", (start, nodes, end) => {
//               return [
//                 start,
//                 {
//                   type: "html",
//                   value: `<div class="hidden-info"><div class="hidden-info-lock">🔒 Hidden Information — click to unlock</div><div class="hidden-info-body" style="display:none;">`,
//                 },
//                 ...nodes,
//                 {
//                   type: "html",
//                   value: `</div></div>`,
//                 },
//                 end,
//               ]
//             })
//           }
//         },
//       ]
//     },
//   }
// }

// export default HiddenInfo


// import { QuartzTransformerPlugin } from "./types"
// import { headingRange } from "mdast-util-heading-range"

// ✱ NEW – central place to register extra sections + passwords
const protectedSections = [
  { title: "Hidden Information", slug: "hidden-information" },   // existing
  { title: "Mera Lup",    slug: "mera-lup"   },        // add more…
  { title: "Comfrey Dewgold",      slug: "comfrey-dewgold"     },
  { title: "Mimosa Beetlebite",      slug: "mimosa-beetlebite"     },
  { title: "Saoirse Hashim",      slug: "saoirse-hashim"     },
]

const HiddenInfo: QuartzTransformerPlugin = () => ({
  name: "HiddenInfoAST",
  markdownPlugins() {
    return [
      () => (tree) => {
        protectedSections.forEach(({ title, slug }) => {
          headingRange(tree, title, (start, nodes, end) => [
            start,
            {
              type: "html",
              value: `
<div class="hidden-info" data-section="${slug}">
  <div class="hidden-info-lock">🔒 ${title} — click to unlock</div>
  <div class="hidden-info-body" style="display:none;">`,
            },
            ...nodes,
            {
              type: "html",
              value: `</div></div>`,
            },
            end,
          ])
        })
      },
    ]
  },
})

export default HiddenInfo
