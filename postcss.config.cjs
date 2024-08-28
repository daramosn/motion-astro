module.exports = {
  plugins: [
    require('postcss-functions')({
      functions: {
        customClamp: (minValue, maxValue, atMinWidth, atMaxWidth) => {
          maxValue = Number(maxValue.slice(0, -2))
          minValue = Number(minValue.slice(0, -2))
          atMinWidth = Number(atMinWidth.slice(0, -2))
          atMaxWidth = Number(atMaxWidth.slice(0, -2))
          const slope = (maxValue - minValue) / (atMaxWidth - atMinWidth)
          const intercept = minValue - slope * atMinWidth
          const preferredValue = slope * 100

          return `clamp(${minValue}px, 
              ${preferredValue.toFixed(3)}vw + ${intercept.toFixed(3)}px
              , ${maxValue}px)`
        },
        bodyWidth: (min, body) => {
          return `max(${min}, calc(100% - ${body}) / 2);`
        }
      }
    })
  ]
}
