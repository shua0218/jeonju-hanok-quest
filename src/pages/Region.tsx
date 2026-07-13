import { useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { ChevronLeft } from 'lucide-react'
import QuestCard from '../components/QuestCard'
import ProgressBar from '../components/ProgressBar'
import PhoneModal from '../components/PhoneModal'
import { getQuestsByRegion, REQUIRED_COUNT } from '../data/quests'
import { useSubmissions, useUploadSubmission } from '../hooks/useSubmissions'
import { useRewardClaim } from '../hooks/useRewardClaim'
import { RegionSlug } from '../types'

export default function Region() {
  const { slug } = useParams<{ slug: string }>()
  const regionSlug = (slug === 'region2' ? 'region2' : 'region1') as RegionSlug
  const quests = getQuestsByRegion(regionSlug)

  const { data: submissions = [] } = useSubmissions(regionSlug)
  const uploadMutation = useUploadSubmission(regionSlug)
  const rewardMutation = useRewardClaim(regionSlug)

  const [uploadingId, setUploadingId] = useState<number | null>(null)
  const [showPhoneModal, setShowPhoneModal] = useState(false)
  const [claimed, setClaimed] = useState(false)

  const completedIds = new Set(submissions.map((s) => s.quest_id))
  const completedCount = completedIds.size
  const eligible = completedCount >= REQUIRED_COUNT

  const handleUpload = (questId: number, file: File) => {
    setUploadingId(questId)
    uploadMutation.mutate(
      { questId, file },
      {
        onSuccess: () => {
          setUploadingId(null)
          const nextCount = completedIds.has(questId) ? completedCount : completedCount + 1
          if (nextCount >= REQUIRED_COUNT && !claimed) {
            setShowPhoneModal(true)
          }
        },
        onError: () => setUploadingId(null),
      }
    )
  }

  const handlePhoneSubmit = (phone: string) => {
    rewardMutation.mutate(phone, {
      onSuccess: () => {
        setClaimed(true)
        setShowPhoneModal(false)
      },
    })
  }

  const regionLabel = regionSlug === 'region1' ? '1구역' : '2구역'

  return (
    <div className="mobile-container bg-background pb-10">
      <div className="sticky top-0 z-10 bg-background/95 backdrop-blur px-4 pt-5 pb-3 border-b border-border">
        <div className="flex items-center gap-2 mb-3">
          <Link to="/" aria-label="뒤로가기">
            <ChevronLeft size={22} className="text-foreground" />
          </Link>
          <h1 className="text-lg font-bold text-foreground">{regionLabel} 퀘스트</h1>
        </div>
        <ProgressBar completed={completedCount} total={quests.length} required={REQUIRED_COUNT} />
        {claimed && (
          <p className="text-xs font-semibold text-accent mt-2">
            상품권 신청이 완료되었습니다. 곧 연락드릴게요!
          </p>
        )}
        {!claimed && eligible && (
          <button
            onClick={() => setShowPhoneModal(true)}
            className="w-full mt-3 py-2.5 rounded-lg bg-primary text-primary-foreground text-sm font-bold active:scale-95 transition-transform"
          >
            상품권 신청하기
          </button>
        )}
      </div>

      <div className="flex flex-col gap-2.5 px-4 pt-4">
        {quests.map((q) => (
          <QuestCard
            key={q.id}
            quest={q}
            completed={completedIds.has(q.id)}
            uploading={uploadingId === q.id}
            onUpload={(file) => handleUpload(q.id, file)}
          />
        ))}
      </div>

      {showPhoneModal && (
        <PhoneModal
          onClose={() => setShowPhoneModal(false)}
          onSubmit={handlePhoneSubmit}
          submitting={rewardMutation.isPending}
        />
      )}
    </div>
  )
}
