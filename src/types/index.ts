export type RegionSlug = 'region1' | 'region2'

export interface Quest {
  id: number
  regionSlug: RegionSlug
  order: number
  title: string
}

export interface Submission {
  id: string
  device_id: string
  quest_id: number
  region_slug: RegionSlug
  photo_url: string
  created_at: string
}

export interface RewardClaim {
  id: string
  device_id: string
  region_slug: RegionSlug
  phone_number: string
  created_at: string
  status: 'pending' | 'issued'
}
