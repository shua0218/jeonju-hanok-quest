import { useState } from 'react'
import { Gift, X } from 'lucide-react'

interface PhoneModalProps {
  onClose: () => void
  onSubmit: (phone: string) => void
  submitting: boolean
}

export default function PhoneModal({ onClose, onSubmit, submitting }: PhoneModalProps) {
  const [phone, setPhone] = useState('')
  const [error, setError] = useState('')

  const handleSubmit = () => {
    const cleaned = phone.replace(/[^0-9]/g, '')
    if (!/^01[0-9]{8,9}$/.test(cleaned)) {
      setError('올바른 휴대폰 번호를 입력해주세요.')
      return
    }
    setError('')
    onSubmit(cleaned)
  }

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-black/50 px-4">
      <div className="w-full max-w-sm bg-hanok-bg rounded-t-2xl sm:rounded-2xl p-5 pb-8">
        <div className="flex justify-between items-start mb-3">
          <div className="flex items-center gap-2">
            <Gift size={22} className="text-hanok-terracotta" />
            <h2 className="text-lg font-bold text-hanok-ink">축하합니다!</h2>
          </div>
          <button onClick={onClose} aria-label="닫기">
            <X size={20} className="text-hanok-ink" />
          </button>
        </div>

        <p className="text-sm text-hanok-ink/80 mb-4 leading-relaxed">
          퀘스트 3개를 달성하셨어요. 전화번호를 남겨주시면 지역 상품권을 보내드립니다.
        </p>

        <input
          type="tel"
          inputMode="numeric"
          placeholder="010-0000-0000"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          className="w-full px-4 py-3 rounded-xl border border-hanok-tile/30 bg-white text-hanok-ink mb-1 focus:outline-none focus:ring-2 focus:ring-hanok-terracotta"
        />
        {error && <p className="text-xs text-red-500 mb-2">{error}</p>}

        <button
          onClick={handleSubmit}
          disabled={submitting}
          className="w-full mt-3 py-3 rounded-xl bg-hanok-terracotta text-white font-bold active:scale-95 transition-transform disabled:opacity-50"
        >
          {submitting ? '전송 중...' : '상품권 신청하기'}
        </button>
      </div>
    </div>
  )
}
