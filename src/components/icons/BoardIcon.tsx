import type { SVGProps } from 'react'

type IconProps = Omit<SVGProps<SVGSVGElement>, 'color'> & {
  size?: number
  color?: string
}

export function BoardIcon({ size = 24, color = 'currentColor', ...props }: IconProps) {
  return (
    <svg
      width={size}
      height={(size * 48) / 54}
      viewBox="0 0 54 48"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
      {...props}
    >
      <path
        d="M0 6.85714C0 3.075 3.02695 0 6.75 0H47.25C50.973 0 54 3.075 54 6.85714V41.1429C54 44.925 50.973 48 47.25 48H6.75C3.02695 48 0 44.925 0 41.1429V6.85714ZM6.75 13.7143V41.1429H23.625V13.7143H6.75ZM47.25 13.7143H30.375V41.1429H47.25V13.7143Z"
        fill={color}
      />
    </svg>
  )
}
