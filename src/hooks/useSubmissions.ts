import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { supabase } from '../lib/supabase'
import { getDeviceId } from '../lib/device'
import { RegionSlug, Submission } from '../types'

const BUCKET = 'quest-photos'

export function useSubmissions(regionSlug: RegionSlug) {
  const deviceId = getDeviceId()

  return useQuery({
    queryKey: ['submissions', regionSlug, deviceId],
    queryFn: async (): Promise<Submission[]> => {
      const { data, error } = await supabase
        .from('submissions')
        .select('*')
        .eq('region_slug', regionSlug)
        .eq('device_id', deviceId)
        .order('created_at', { ascending: true })

      if (error) throw error
      return data as Submission[]
    },
  })
}

export function useUploadSubmission(regionSlug: RegionSlug) {
  const queryClient = useQueryClient()
  const deviceId = getDeviceId()

  return useMutation({
    mutationFn: async ({ questId, file }: { questId: number; file: File }) => {
      const ext = file.name.split('.').pop() || 'jpg'
      const path = `${deviceId}/${regionSlug}/quest-${questId}-${Date.now()}.${ext}`

      // 1. Storage에 사진 업로드 (관리자도 볼 수 있도록 공용 버킷에 저장)
      const { error: uploadError } = await supabase.storage
        .from(BUCKET)
        .upload(path, file, {
          cacheControl: '3600',
          upsert: true,
          contentType: file.type || 'image/jpeg',
        })

      if (uploadError) throw uploadError

      const { data: publicUrlData } = supabase.storage
        .from(BUCKET)
        .getPublicUrl(path)

      const photoUrl = publicUrlData.publicUrl

      // 2. 같은 퀘스트의 기존 제출 기록이 있으면 삭제 (다시 찍기 = 교체)
      await supabase
        .from('submissions')
        .delete()
        .eq('device_id', deviceId)
        .eq('region_slug', regionSlug)
        .eq('quest_id', questId)

      // 3. 새 제출 기록 저장
      const { error: insertError } = await supabase.from('submissions').insert({
        device_id: deviceId,
        quest_id: questId,
        region_slug: regionSlug,
        photo_url: photoUrl,
      })

      if (insertError) throw insertError
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['submissions', regionSlug, deviceId],
      })
    },
  })
}
