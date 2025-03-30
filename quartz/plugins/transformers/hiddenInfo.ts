import { QuartzTransformerPlugin } from "../types"
import { visit } from "unist-util-visit"
import { Node } from "unist"
import { headingRange } from "mdast-util-heading-range"

const HiddenInfo: QuartzTransformerPlugin = () => {
  return {
    name: "HiddenInfoAST",
    markdownPlugins() {
      return [
        () => {
          return (tree) => {
            headingRange(tree, "Hidden Information", (start, nodes, end) => {
              return [
                start,
                {
                  type: "html",
                  value: `<div class="hidden-info"><div class="hidden-info-lock">🔒 Hidden Information — click to unlock</div><div class="hidden-info-body" style="display:none;">`,
                },
                ...nodes,
                {
                  type: "html",
                  value: `</div></div>`,
                },
                end,
              ]
            })
          }
        },
      ]
    },
  }
}

export default HiddenInfo
