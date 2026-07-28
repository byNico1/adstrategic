import { electricianConfig } from "./electrician"
import type { NicheConfig } from "./types"

const nicheRegistry: Record<string, NicheConfig> = {
  [electricianConfig.slug]: electricianConfig,
}

export function getNicheConfig(slug: string): NicheConfig | undefined {
  return nicheRegistry[slug]
}

export function getAllNicheSlugs(): string[] {
  return Object.keys(nicheRegistry)
}

export function getAllNiches(): NicheConfig[] {
  return Object.values(nicheRegistry)
}

export type { NicheConfig }
