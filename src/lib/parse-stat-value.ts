export type ParsedStatValue = {
  target: number
  prefix: string
  suffix: string
  /** Number of digits after the decimal in the source string */
  decimals: number
  /** Whether the numeric portion used thousand separators */
  useGrouping: boolean
}

/**
 * Parses display strings like "97%", "1,500,000+", "150+" into
 * animatable parts while preserving prefix/suffix/formatting.
 */
export function parseStatValue(raw: string): ParsedStatValue {
  const match = raw.trim().match(/^([^0-9.-]*)(-?[0-9][0-9,]*(?:\.[0-9]+)?)(.*)$/)

  if (!match) {
    return { target: 0, prefix: "", suffix: raw, decimals: 0, useGrouping: false }
  }

  const [, prefix = "", numeric = "0", suffix = ""] = match
  const useGrouping = numeric.includes(",")
  const cleaned = numeric.replace(/,/g, "")
  const decimalIndex = cleaned.indexOf(".")
  const decimals = decimalIndex >= 0 ? cleaned.length - decimalIndex - 1 : 0
  const target = Number(cleaned)

  return {
    target: Number.isFinite(target) ? target : 0,
    prefix,
    suffix,
    decimals,
    useGrouping,
  }
}

export function formatStatNumber(
  value: number,
  { decimals, useGrouping }: Pick<ParsedStatValue, "decimals" | "useGrouping">
): string {
  return value.toLocaleString("en-US", {
    useGrouping,
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  })
}
