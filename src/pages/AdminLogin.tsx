import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { LogIn } from 'lucide-react'
import { supabase } from '../lib/supabase'

export default function AdminLogin() {
  const navigate = useNavigate()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const handleLogin = async () => {
    setError('')
    setLoading(true)
    const { error } = await supabase.auth.signInWithPassword({ email, password })
    setLoading(false)
    if (error) {
      setError('로그인에 실패했습니다. 이메일/비밀번호를 확인해주세요.')
      return
    }
    navigate('/admin')
  }

  return (
    <div className="mobile-container bg-background flex flex-col justify-center px-6">
      <div className="text-center mb-8">
        <p className="text-primary font-bold text-sm mb-1">전주한옥마을 QUEST</p>
        <h1 className="text-2xl font-extrabold text-foreground">관리자 로그인</h1>
      </div>

      <div className="flex flex-col gap-3">
        <input
          type="email"
          placeholder="이메일"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full px-4 py-3 rounded-lg border border-input bg-card text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
        />
        <input
          type="password"
          placeholder="비밀번호"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && handleLogin()}
          className="w-full px-4 py-3 rounded-lg border border-input bg-card text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
        />
        {error && <p className="text-xs text-destructive">{error}</p>}

        <button
          onClick={handleLogin}
          disabled={loading}
          className="w-full mt-2 py-3 rounded-lg bg-primary text-primary-foreground font-bold flex items-center justify-center gap-2 active:scale-95 transition-transform disabled:opacity-50"
        >
          <LogIn size={16} />
          {loading ? '로그인 중...' : '로그인'}
        </button>
      </div>
    </div>
  )
}
