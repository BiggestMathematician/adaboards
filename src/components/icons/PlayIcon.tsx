import type { SVGProps } from 'react'

type IconProps = Omit<SVGProps<SVGSVGElement>, 'color'> & {
  size?: number
  color?: string
}

export function PlayIcon({ size = 16, color = 'currentColor', ...props }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
      {...props}
    >
      <path
        d="M24 3.42857C24 1.5375 22.4625 0 20.5714 0H3.42857C1.5375 0 0 1.5375 0 3.42857V20.5714C0 22.4625 1.5375 24 3.42857 24H20.5714C22.4625 24 24 22.4625 24 20.5714V3.42857ZM17.1429 12C17.1429 12.3589 16.9929 12.6964 16.7304 12.9429L10.7304 18.5143C10.3554 18.8625 9.80893 18.9536 9.34286 18.75C8.87679 18.5464 8.57143 18.0804 8.57143 17.5714V6.42857C8.57143 5.91964 8.87679 5.45357 9.34286 5.25C9.80893 5.04643 10.3554 5.1375 10.7304 5.48571L16.7304 11.0571C16.9929 11.2982 17.1429 11.6411 17.1429 12Z"
        fill={color}
      />
    </svg>
  )
}
