import type { SVGProps } from 'react'

type IconProps = Omit<SVGProps<SVGSVGElement>, 'color'> & {
  size?: number
  color?: string
}

export function AddIcon({ size = 18, color = 'currentColor', ...props }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 30 30"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
      {...props}
    >
      <path
        d="M4.28571 0C1.92188 0 0 1.92188 0 4.28571V25.7143C0 28.0781 1.92188 30 4.28571 30H25.7143C28.0781 30 30 28.0781 30 25.7143V4.28571C30 1.92188 28.0781 0 25.7143 0H4.28571ZM13.3929 20.8929V16.6071H9.10714C8.21652 16.6071 7.5 15.8906 7.5 15C7.5 14.1094 8.21652 13.3929 9.10714 13.3929H13.3929V9.10714C13.3929 8.21652 14.1094 7.5 15 7.5C15.8906 7.5 16.6071 8.21652 16.6071 9.10714V13.3929H20.8929C21.7835 13.3929 22.5 14.1094 22.5 15C22.5 15.8906 21.7835 16.6071 20.8929 16.6071H16.6071V20.8929C16.6071 21.7835 15.8906 22.5 15 22.5C14.1094 22.5 13.3929 21.7835 13.3929 20.8929Z"
        fill={color}
      />
    </svg>
  )
}
