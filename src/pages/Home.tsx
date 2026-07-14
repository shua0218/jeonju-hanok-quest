
import { Link } from 'react-router-dom'
import { MapPin, Camera, Gift, ChevronRight } from 'lucide-react'
import { regionInfo } from '../data/quests'

const steps = [
  { icon: MapPin, title: '퀘스트 장소 방문', desc: '1구역 또는 2구역의\n퀘스트 장소를 방문하세요' },
  { icon: Camera, title: '인증사진 촬영', desc: '퀘스트에 맞는\n인증사진을 찍어 올려주세요' },
  { icon: Gift, title: '상품권 수령', desc: '3개 이상 인증 시\n지역상품권을 드립니다' },
]

const regions = [
  { slug: 'region1', ...regionInfo.region1, count: 10 },
  { slug: 'region2', ...regionInfo.region2, count: 10 },
]

export default function Home() {
  return (
    <div className="mobile-container bg-background flex flex-col">
      <div className="relative h-64 w-full overflow-hidden">
        <img
          src="https://loremflickr.com/800/600/hanok,sunset,korea?lock=100"
          alt="전주한옥마을 노을"
          className="absolute inset-0 h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/50 to-transparent" />
        <div className="absolute bottom-5 left-5 right-5">
          <p className="text-primary font-bold text-sm mb-1">전주한옥마을</p>
          <h1 className="text-foreground text-3xl font-extrabold tracking-tight">QUEST</h1>
          <p className="text-foreground/70 text-sm mt-1">외곽지역을 탐험하고 상품권 받자!</p>
        </div>
      </div>

      <div className="px-5 py-6">
        <h2 className="text-sm font-bold text-muted-foreground mb-3">이용 방법</h2>
        <div className="grid grid-cols-3 gap-3">
          {steps.map((step) => {
            const Icon = step.icon
            return (
              <div
                key={step.title}
                className="flex flex-col items-center text-center bg-card border border-border rounded-lg p-3"
              >
                <div className="w-9 h-9 rounded-full bg-primary/10 flex items-center justify-center mb-2">
                  <Icon size={16} className="text-primary" />
                </div>
                <p className="text-xs font-semibold text-card-foreground mb-1">{step.title}</p>
                <p className="text-[10px] text-muted-foreground leading-tight whitespace-pre-line">
                  {step.desc}
                </p>
              </div>
            )
          })}
        </div>
      </div>

      <div className="px-5 pb-10">
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-sm font-bold text-muted-foreground">구역 선택</h2>
          <span className="text-xs text-accent font-semibold">
            3개 이상 인증 시 상품권 지급!
          </span>
        </div>

        <div className="flex flex-col gap-4">
          {regions.map((region) => (
            <Link
              key={region.slug}
              to={`/${region.slug}`}
              className="relative rounded-lg overflow-hidden h-36 border border-border block active:scale-[0.98] transition-transform"
            >
              <img
                src={region.image}
                alt={region.label}
                className="absolute inset-0 h-full w-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/10 to-transparent" />

              <span className="absolute top-3 right-3 bg-primary text-primary-foreground text-xs font-bold px-2.5 py-1 rounded-full">
                퀘스트 {region.count}개
              </span>

              <div className="absolute bottom-3 left-4 right-4 flex items-center justify-between">
                <div>
                  <p className="text-white font-bold text-lg leading-tight">{region.label}</p>
                  <p className="text-white/80 text-[11px] mt-0.5">{region.desc}</p>
                </div>
                <ChevronRight className="text-white shrink-0" size={20} />
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}

