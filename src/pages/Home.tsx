import { Link } from 'react-router-dom'
import { MapPin, ArrowRight } from 'lucide-react'

export default function Home() {
  return (
    <div className="min-h-screen w-full max-w-md mx-auto bg-hanok-bg flex flex-col px-5 pt-14 pb-8">
      <div className="text-center mb-10">
        <p className="text-hanok-terracotta font-semibold text-sm mb-1">전주한옥마을</p>
        <h1 className="text-2xl font-extrabold text-hanok-ink">QUEST</h1>
        <p className="text-sm text-hanok-ink/70 mt-3 leading-relaxed">
          외곽 지역을 걸으며 퀘스트를 완료하고
          <br />
          지역 상품권을 받아가세요
        </p>
      </div>

      <div className="flex flex-col gap-4">
        <Link
          to="/region1"
          className="flex items-center justify-between p-5 rounded-2xl bg-white border border-hanok-tile/20 shadow-sm active:scale-[0.98] transition-transform"
        >
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-full bg-hanok-wood/10 flex items-center justify-center">
              <MapPin size={20} className="text-hanok-wood" />
            </div>
            <div>
              <p className="font-bold text-hanok-ink">1구역</p>
              <p className="text-xs text-hanok-ink/60">완판본문화관 · 한벽문화관 · 전주천</p>
            </div>
          </div>
          <ArrowRight size={18} className="text-hanok-ink/40" />
        </Link>

        <Link
          to="/region2"
          className="flex items-center justify-between p-5 rounded-2xl bg-white border border-hanok-tile/20 shadow-sm active:scale-[0.98] transition-transform"
        >
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-full bg-hanok-terracotta/10 flex items-center justify-center">
              <MapPin size={20} className="text-hanok-terracotta" />
            </div>
            <div>
              <p className="font-bold text-hanok-ink">2구역</p>
              <p className="text-xs text-hanok-ink/60">공예품전시관 · 오목대 · 전주향교</p>
            </div>
          </div>
          <ArrowRight size={18} className="text-hanok-ink/40" />
        </Link>
      </div>

      <p className="text-center text-xs text-hanok-ink/40 mt-auto pt-10">
        각 구역별 퀘스트 10개 중 3개를 완료하면 지역 상품권을 드립니다
      </p>
    </div>
  )
}
