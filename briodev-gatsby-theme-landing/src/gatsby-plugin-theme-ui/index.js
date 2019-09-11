import { tailwind } from "@theme-ui/presets"
import VSDark from '@theme-ui/prism/presets/vs-dark.json'

const themePreset = tailwind


export default {
  ...themePreset,
  colors: {
    ...themePreset.colors,
  },

  styles: {
    ...themePreset.styles,
    pre: {
      ...VSDark
    },
    code: {
      fontFamily: "monospace",
      fontSize: ".75em"
    },
    a: {
      color: `orange.7`,
      textDecoration: 'none',
      ':hover, :focus': {
        color: `orange.5`,
      },
    },
  }
}

