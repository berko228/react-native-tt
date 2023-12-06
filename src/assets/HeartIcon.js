import * as React from "react"
import Svg, { Path } from "react-native-svg"

function HeartIcon({strokeColor,fillColor}) {
  return (
    <Svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
    >
      <Path
        d="M12 21.35l-5.47-3.88C3.16 14.52 2 12.86 2 10.5 2 7.42 4.42 5 7.5 5c1.55 0 3.03.82 4.5 2.03C13.47 5.82 14.95 5 16.5 5c3.08 0 5.5 2.42 5.5 5.5 0 2.36-1.16 4.02-4.53 6.97L12 21.35z"
        fill={fillColor}
        stroke={strokeColor}
        strokeWidth={2}
      />
    </Svg>
  )
}

export default HeartIcon
