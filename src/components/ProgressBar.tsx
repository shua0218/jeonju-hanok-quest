interface ProgressBarProps {
  completed: number
  total: number
  required: number
}

export default function ProgressBar({ completed, total, required }: ProgressBarProps) {
  const percent = Math.min(100, (completed / total) * 100)
  const reached = completed >= required

  return (
    <div className="w-full">
      <div className="flex items-center justify-between mb-1">
        <span className="text-sm font-semibold text-hanok-ink">
          진행률 {completed} / {total}
        </span>
        <span className={`text-xs font-bold ${reached ? 'text-hanok-terracotta' : 'text-hanok-tile'}`}>
          {reached ? '상품권 지급 대상!' : `${required}개 달성 시 상품권 지급`}
        </span>
      </div>
      <div className="w-full h-3 bg-white rounded-full overflow-hidden border border-hanok-tile/30">
        <div
          className="h-full bg-hanok-terracotta transition-all duration-500"
          style={{ width: `${percent}%` }}
        />
      </div>
    </div>
  )
}
