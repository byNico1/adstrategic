"use client"



type AnimatedStatValueProps = {
  value: string
  className?: string
}

export function AnimatedStatValue({ value, className }: AnimatedStatValueProps) {
  return (
    <span
      className={className}
      style={{ fontVariantNumeric: "tabular-nums" }}
      aria-label={value}
    >
      {value}
    </span>
  )
}
