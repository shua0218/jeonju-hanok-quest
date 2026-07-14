// src/pages/Home.tsx

import { Link } from 'react-router-dom'
import { regionInfo } from '../data/quests'

export default function Home() {
  return (
    <div className="mobile-container bg-background min-h-screen flex flex-col">
      {/* 메인 헤더 배너 영역: 3번째 사진을 배경으로 지정 */}
      <div 
        className="relative h-64 flex flex-col justify-end p-6 text-white bg-cover bg-center"
        style={{ backgroundImage: `linear-gradient(to bottom, rgba(0,0,0,0.1), rgba(0,0,0,0.7)), url('/main-bg.jpg')` }}
      >
        <div className="relative z-10">
          <span className="bg-primary/90 text-white text-xs font-bold px-2.5 py-1 rounded-full mb-2 inline-block">
            전주 한옥마을 투어
          </span>
          <h1 className="text-2xl font-black drop-shadow-md leading-tight">
            한옥마을 골목길<br />퀘스트 챌린지
          </h1>
          <p className="text-xs text-slate-200 mt-1 drop-shadow-sm">
            지정된 장소에서 사진을 찍어 인증하고 지역 상품권을 받아보세요!
          </p>
        </div>
      </div>

      {/* 구역 선택 리스트 */}
      <div className="flex-1 p-4 space-y-4">
        <h2 className="text-base font-bold text-foreground px-1 mb-2">도전할 구역을 선택하세요</h2>
        
        {Object.entries(regionInfo).map(([slug, info]) => (
          <Link
            key={slug}
            to={`/${slug}`}
            className="block overflow-hidden rounded-xl border border-border bg-card shadow-sm active:scale-[0.99] transition-transform"
          >
            <div className="relative h-36 bg-cover bg-center" style={{ backgroundImage: `url('${info.image}')` }}>
              <div className="absolute inset-0 bg-black/40 flex flex-col justify-end p-4">
                <span className="text-xs font-bold text-primary-foreground bg-primary px-2 py-0.5 rounded w-fit mb-1">
                  {info.label}
                </span>
                <h3 className="text-lg font-bold text-white leading-tight">
                  {info.desc}
                </h3>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  )
}
