import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { supabase } from '../lib/supabase'
import { getDeviceId } from '../lib/device'
import { RegionSlug, Submission } from '../types'

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

      if (error) {
        console.error('제출 기록 조회 실패:', error)
        throw error
      }
      return data as Submission[]
    },
  })
}

export function useUploadSubmission(regionSlug: RegionSlug) {
  const queryClient = useQueryClient()
  const deviceId = getDeviceId()

  return useMutation({
    mutationFn: async ({ questId, file }: { questId: number; file: File }) => {
      try {
        // 1. 기존에 같은 퀘스트로 제출한 기록(DB) 삭제
        await supabase
          .from('submissions')
          .delete()
          .eq('device_id', deviceId)
          .eq('quest_id', questId)

        const ext = file.name.split('.').pop()
        // 파일명 중복을 피하기 위해 타임스탬프 포함
        const path = `${deviceId}/${regionSlug}/quest-${questId}-${Date.now()}.${ext}`

        // 2. Storage에 이미지 업로드 (안전하게 고치기 위해 upsert: true 설정)
        const { error: uploadError } = await supabase.storage
          .from('quest-photos')
          .upload(path, file, { 
            cacheControl: '3600', 
            upsert: true // 기존 같은 경로 파일이 있어도 덮어쓰도록 설정하여 오류 방지
          })

        if (uploadError) {
          console.error('Supabase Storage 업로드 에러:', uploadError)
          throw uploadError
        }

        // 3. Public URL 생성
        const { data: publicUrlData } = supabase.storage
          .from('quest-photos')
          .getPublicUrl(path)

        if (!publicUrlData?.publicUrl) {
          throw new Error('Public URL을 가져오는데 실패했습니다.')
        }

        // 4. DB에 최종 데이터 insert
        const { error: insertError } = await supabase.from('submissions').insert({
          device_id: deviceId,
          quest_id: questId,
          region_slug: regionSlug,
          photo_url: publicUrlData.publicUrl,
        })

        if (insertError) {
          console.error('DB Insert 에러:', insertError)
          throw insertError
        }
      } catch (err) {
        alert('사진 업로드 중 오류가 발생했습니다. 개발자 도구(F12)의 콘솔창을 확인해주세요.')
        throw err
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['submissions', regionSlug, deviceId] })
    },
  })
}
