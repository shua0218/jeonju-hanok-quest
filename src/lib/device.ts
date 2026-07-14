const DEVICE_KEY = 'hanok_quest_device_id'

export function getDeviceId(): string {
  let id = localStorage.getItem(DEVICE_KEY)
  if (!id) {
    // crypto.randomUUID가 없을 경우를 대비한 안전한 무작위 문자열 생성식
    if (typeof crypto !== 'undefined' && crypto.randomUUID) {
      id = crypto.randomUUID()
    } else {
      id = Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15)
    }
    localStorage.setItem(DEVICE_KEY, id)
  }
  return id
}
