import type { SVGProps } from 'react'

type IconProps = Omit<SVGProps<SVGSVGElement>, 'color'> & {
  size?: number
  color?: string
}

export function CheckMarkIcon({ size = 24, color = 'currentColor', ...props }: IconProps) {
  return (
    <svg
      width={size}
      height={(size * 37) / 52}
      viewBox="0 0 52 37"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
      {...props}
    >
      <path
        d="M50.9119 1.08381C52.3627 2.5289 52.3627 4.87572 50.9119 6.32081L21.201 35.9162C19.7502 37.3613 17.3943 37.3613 15.9435 35.9162L1.08805 21.1185C-0.362683 19.6734 -0.362683 17.3266 1.08805 15.8815C2.53878 14.4364 4.89477 14.4364 6.3455 15.8815L18.5781 28.0549L45.6661 1.08381C47.1168 -0.361272 49.4728 -0.361272 50.9236 1.08381H50.9119Z"
        fill={color}
      />
    </svg>
  )
}
