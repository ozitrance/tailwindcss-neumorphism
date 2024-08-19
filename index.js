const Color = require('color')
const _ = require('lodash')
const plugin = require('tailwindcss/plugin')

const invalidKeywords = [
  'currentcolor',
  'transparent',
  'unset',
  'initial',
  'inherit',
]

const flattenColorPalette = function (colors) {
  const result = _(colors)
    .flatMap((color, name) => {
      if (!_.isObject(color)) {
        return [[name, color]]
      }

      return _.map(color, (value, key) => {
        const suffix = key === 'default' ? '' : `-${key}`
        return [`${name}${suffix}`, value]
      })
    })
    .fromPairs()
    .value()

  return result
}

const generateShades = (color, theme) => {
  try {
    return {
      baseColor: Color(color).hex(),
      shadowColor: Color(color).isDark()
        ? Color(color).darken(theme('neumorphismShadow').shadowColor[0]).hex()
        : Color(color).darken(theme('neumorphismShadow').shadowColor[1]).hex(),
      highlightColor: Color(color).isLight()
        ? Color(color)
            .lighten(theme('neumorphismShadow').highlightColor[1])
            .hex()
        : Color(color)
            .lighten(theme('neumorphismShadow').highlightColor[0])
            .hex(),
      shadowGradient: Color(color).isDark()
        ? Color(color)
            .darken(theme('neumorphismShadow').shadowGradient[0])
            .hex()
        : Color(color)
            .darken(theme('neumorphismShadow').shadowGradient[1])
            .hex(),
      highlightGradient: Color(color).isLight()
        ? Color(color)
            .lighten(theme('neumorphismShadow').highlightGradient[1])
            .hex()
        : Color(color)
            .lighten(theme('neumorphismShadow').highlightGradient[0])
            .hex(),
    }
  } catch {
    return false
  }
}

module.exports = plugin(
  function ({ addUtilities, e, theme, variants }) {
    const nmFlatPairs = []
    _.forEach(
      flattenColorPalette(theme('neumorphismColor', theme('backgroundColor'))),
      (color, colorKey) => {
        if (invalidKeywords.includes(color.toLowerCase())) return []
        let shades = generateShades(color, theme)
        if (!shades) {
          console.log(
            `tailwind-neumorphism: Something went wrong generating shades of '${colorKey}' (${color}), (${theme}). Skipping.`
          )
          return false
        }

        _.forEach(theme('neumorphismSize'), (size, sizeKey) => {
          nmFlatPairs.push([
            sizeKey.toLowerCase() === 'default'
              ? `.${e(`nm-flat-${colorKey}`)}`
              : `.${e(`nm-flat-${colorKey}-${sizeKey}`)}`,
            {
              background: shades.baseColor,
              boxShadow: `${size} ${size} calc(${size} * 2) ${shades.shadowColor}, calc(${size} * -1) calc(${size} * -1) calc(${size} * 2) ${shades.highlightColor}`,
            },
          ])
        })
      }
    )

    addUtilities(
      _.fromPairs(nmFlatPairs),
      variants('neumorphismFlat', ['responsive', 'hover', 'focus'])
    )

    const nmConcavePairs = []
    _.forEach(
      flattenColorPalette(theme('neumorphismColor', theme('backgroundColor'))),
      (color, colorKey) => {
        if (invalidKeywords.includes(color.toLowerCase())) return []
        let shades = generateShades(color, theme)
        if (!shades) {
          console.log(
            `tailwind-neumorphism: Something went wrong generating shades of '${colorKey}' (${color}), (${theme}). Skipping.`
          )
          return false
        }

        _.forEach(theme('neumorphismSize'), (size, sizeKey) => {
          nmConcavePairs.push([
            sizeKey.toLowerCase() === 'default'
              ? `.${e(`nm-concave-${colorKey}`)}`
              : `.${e(`nm-concave-${colorKey}-${sizeKey}`)}`,
            {
              background: `linear-gradient(145deg, ${shades.shadowGradient}, ${shades.highlightGradient})`,
              boxShadow: `${size} ${size} calc(${size} * 2) ${shades.shadowColor}, calc(${size} * -1) calc(${size} * -1) calc(${size} * 2) ${shades.highlightColor}`,
            },
          ])
        })
      }
    )

    addUtilities(
      _.fromPairs(nmConcavePairs),
      variants('neumorphismConcave', ['responsive', 'hover', 'focus'])
    )

    const nmConvexPairs = []
    _.forEach(
      flattenColorPalette(theme('neumorphismColor', theme('backgroundColor'))),
      (color, colorKey) => {
        if (invalidKeywords.includes(color.toLowerCase())) return []
        let shades = generateShades(color, theme)
        if (!shades) {
          console.log(
            `tailwind-neumorphism: Something went wrong generating shades of '${colorKey}' (${color}), (${theme}). Skipping.`
          )
          return false
        }

        _.forEach(theme('neumorphismSize'), (size, sizeKey) => {
          nmConvexPairs.push([
            sizeKey.toLowerCase() === 'default'
              ? `.${e(`nm-convex-${colorKey}`)}`
              : `.${e(`nm-convex-${colorKey}-${sizeKey}`)}`,
            {
              background: `linear-gradient(145deg, ${shades.highlightGradient}, ${shades.shadowGradient})`,
              boxShadow: `${size} ${size} calc(${size} * 2) ${shades.shadowColor}, calc(${size} * -1) calc(${size} * -1) calc(${size} * 2) ${shades.highlightColor}`,
            },
          ])
        })
      }
    )

    addUtilities(
      _.fromPairs(nmConvexPairs),
      variants('neumorphismConvex', ['responsive', 'hover', 'focus'])
    )

    const nmInsetPairs = []
    _.forEach(
      flattenColorPalette(theme('neumorphismColor', theme('backgroundColor'))),
      (color, colorKey) => {
        if (invalidKeywords.includes(color.toLowerCase())) return []
        let shades = generateShades(color, theme)
        if (!shades) {
          console.log(
            `tailwind-neumorphism: Something went wrong generating shades of '${colorKey}' (${color}), (${theme}). Skipping.`
          )
          return false
        }

        _.forEach(theme('neumorphismSize'), (size, sizeKey) => {
          nmInsetPairs.push([
            sizeKey.toLowerCase() === 'default'
              ? `.${e(`nm-inset-${colorKey}`)}`
              : `.${e(`nm-inset-${colorKey}-${sizeKey}`)}`,
            {
              background: shades.baseColor,
              boxShadow: `inset ${size} ${size} calc(${size} * 2) ${shades.shadowColor}, inset calc(${size} * -1) calc(${size} * -1) calc(${size} * 2) ${shades.highlightColor}`,
            },
          ])
        })
      }
    )

    addUtilities(
      _.fromPairs(nmInsetPairs),
      variants('neumorphismInset', ['responsive', 'hover', 'focus'])
    )
  },
  {
    theme: {
      neumorphismSize: {
        xs: '0.05em',
        sm: '0.1em',
        default: '0.2em',
        lg: '0.4em',
        xl: '0.8em',
      },
      neumorphismShadow: {
        shadowColor: [0.3, 0.25],
        highlightColor: [0.25, 0.2],
        shadowGradient: [0.2, 0.15],
        highlightGradient: [0.05, 0.1],
      },
    },
  }
)
