"use client"

import CountUp from "react-countup"

import { parseStatValue } from "@/src/lib/parse-stat-value"

type AnimatedStatValueProps = {
  value: string
  className?: string
}

export function AnimatedStatValue({ value, className }: AnimatedStatValueProps) {
  const { target, prefix, suffix, decimals, useGrouping } = parseStatValue(value)

  return (
    <span
      className={className}
      style={{ fontVariantNumeric: "tabular-nums" }}
      aria-label={value}
    >
      <CountUp
        start={0}
        end={target}
        prefix={prefix}
        suffix={suffix}
        decimals={decimals}
        separator={useGrouping ? "," : ""}
        duration={2}
        enableScrollSpy
        scrollSpyOnce
      />
    </span>
  )
}
