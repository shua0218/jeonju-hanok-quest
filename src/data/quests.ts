import { Quest } from '../types'

export const region1Quests: Quest[] = [
  { id: 1, regionSlug: 'region1', order: 1, title: '완판본문화관을 방문해 입구에서 인증사진 찍기' },
  { id: 2, regionSlug: 'region1', order: 2, title: '완판본문화관에서 한지 체험에 참여한 후 완성한 작품을 들고 사진 찍기' },
  { id: 3, regionSlug: 'region1', order: 3, title: '한벽문화관을 방문해 건물 앞에서 인증사진 찍기' },
  { id: 4, regionSlug: 'region1', order: 4, title: '한벽문화관 전시를 관람한 후 전시 안내판 앞에서 사진 찍기' },
  { id: 5, regionSlug: 'region1', order: 5, title: '전주천 산책로에 설치된 QR코드를 찾아 스캔하고 인증하기' },
  { id: 6, regionSlug: 'region1', order: 6, title: '전주천 징검다리를 건넌 후 단체 인증사진 찍기' },
  { id: 7, regionSlug: 'region1', order: 7, title: '보물단지 사장님과 인증사진 찍기' },
  { id: 8, regionSlug: 'region1', order: 8, title: '전주천 포토존에서 인증사진 찍기' },
  { id: 9, regionSlug: 'region1', order: 9, title: '연쌍화차 방문해 쌍화차 체험 후 영수증 인증하기' },
  { id: 10, regionSlug: 'region1', order: 10, title: '전주천 산책로에 설치된 안내 지도를 찾아 인증사진 찍기' },
]

export const region2Quests: Quest[] = [
  { id: 11, regionSlug: 'region2', order: 1, title: '관광안내소에서 한옥마을 리플릿을 받은 후 인증사진 찍기' },
  { id: 12, regionSlug: 'region2', order: 2, title: '전주공예품전시관을 방문해 입구에서 인증사진 찍기' },
  { id: 13, regionSlug: 'region2', order: 3, title: '공예품전시관 또는 인근 공방에서 한지·자개·매듭 체험을 하고 완성한 작품을 들고 사진 찍기' },
  { id: 14, regionSlug: 'region2', order: 4, title: '전주부채문화관을 방문해 입구에서 인증사진 찍기' },
  { id: 15, regionSlug: 'region2', order: 5, title: '전통 부채 꾸미기 체험에 참여한 후 직접 만든 부채를 들고 사진 찍기' },
  { id: 16, regionSlug: 'region2', order: 6, title: '전주전통술박물관을 방문해 입구에서 인증사진 찍기' },
  { id: 17, regionSlug: 'region2', order: 7, title: '향교길 공방에서 가죽공예, 자수, 반지 만들기 등의 체험을 하고 결과물과 함께 사진 찍기' },
  { id: 18, regionSlug: 'region2', order: 8, title: '오목대 정상에 올라 표지석과 함께 인증사진 찍기' },
  { id: 19, regionSlug: 'region2', order: 9, title: '전주향교 정문 앞에서 인증사진 찍기' },
  { id: 20, regionSlug: 'region2', order: 10, title: '자만벽화마을 입구 안내판 앞에서 인증사진 찍기' },
]

export const REQUIRED_COUNT = 3

export function getQuestsByRegion(slug: 'region1' | 'region2') {
  return slug === 'region1' ? region1Quests : region2Quests
}
