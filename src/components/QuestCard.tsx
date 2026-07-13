import { useRef } from 'react'
import { Camera, CheckCircle2, Loader2 } from 'lucide-react'
import { Quest } from '../types'

interface QuestCardProps {
  quest: Quest
  completed: boolean
  uploading: boolean
  onUpload: (file: File) => void
}

export default function QuestCard({ quest, completed, uploading, onUpload }: QuestCardProps) {
  const inputRef = useRef<HTMLInputElement>(null)

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) onUpload(file)
    e.target.value = ''
  }

  return (
    <div
      className={`flex items-center gap-3 p-3 rounded-lg border transition-colors ${
        completed ? 'bg-primary/10 border-primary' : 'bg-card border-border'
      }`}
    >
      <div className="flex items-center justify-center w-7 h-7 rounded-full bg-secondary text-secondary-foreground text-xs font-bold shrink-0">
        {quest.order}
      </div>

      <p className="flex-1 text-sm text-card-foreground leading-snug">{quest.title}</p>

      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        capture="environment"
        className="hidden"
        onChange={handleFileChange}
      />

      <button
        type="button"
        disabled={uploading}
        onClick={() => inputRef.current?.click()}
        className={`shrink-0 flex items-center justify-center w-10 h-10 rounded-full ${
          completed ? 'bg-accent text-accent-foreground' : 'bg-muted text-muted-foreground'
        } active:scale-95 transition-transform disabled:opacity-50`}
        aria-label="사진 첨부"
      >
        {uploading ? (
          <Loader2 size={18} className="animate-spin" />
        ) : completed ? (
          <CheckCircle2 size={20} />
        ) : (
          <Camera size={18} />
        )}
      </button>
    </div>
  )
}
