import { useMutation } from '@tanstack/react-query'
import { supabase } from '../lib/supabase'
import { getDeviceId } from '../lib/device'
import { RegionSlug } from '../types'

export function useRewardClaim(regionSlug: RegionSlug) {
  const deviceId = getDeviceId()

  return useMutation({
    mutationFn: async (phoneNumber: string) => {
      const { error } = await supabase.from('reward_claims').insert({
        device_id: deviceId,
        region_slug: regionSlug,
        phone_number: phoneNumber,
        status: 'pending',
      })
      if (error) throw error
    },
  })
}
