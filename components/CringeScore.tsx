interface CringeScoreProps {
  score: number
  size?: 'sm' | 'md' | 'lg'
}

export function CringeScore({ score, size = 'md' }: CringeScoreProps) {
  const getColor = (s: number) => {
    if (s >= 9) return 'text-red-400'
    if (s >= 7) return 'text-orange-400'
    if (s >= 5) return 'text-yellow-400'
    if (s >= 3) return 'text-lime-400'
    return 'text-green-400'
  }

  const getBg = (s: number) => {
    if (s >= 9) return 'bg-red-950 border-red-800'
    if (s >= 7) return 'bg-orange-950 border-orange-800'
    if (s >= 5) return 'bg-yellow-950 border-yellow-800'
    if (s >= 3) return 'bg-lime-950 border-lime-800'
    return 'bg-green-950 border-green-800'
  }

  const getLabel = (s: number) => {
    if (s >= 9) return 'Certified Disaster'
    if (s >= 7) return 'Concerning'
    if (s >= 5) return 'Questionable'
    if (s >= 3) return 'Acceptable'
    return 'Surprisingly Decent'
  }

  const getEmoji = (s: number) => {
    if (s >= 9) return '🔥'
    if (s >= 7) return '😱'
    if (s >= 5) return '😬'
    if (s >= 3) return '🤔'
    return '😌'
  }

  const sizeClasses = {
    sm: 'text-sm px-3 py-1.5',
    md: 'text-base px-4 py-2',
    lg: 'text-xl px-5 py-3',
  }

  return (
    <div className={`inline-flex items-center gap-2 border rounded-lg ${getBg(score)} ${sizeClasses[size]}`}>
      <span className={`font-black ${getColor(score)} ${size === 'lg' ? 'text-3xl' : size === 'md' ? 'text-2xl' : 'text-lg'}`}>
        {score}
      </span>
      <div>
        <div className={`text-xs font-medium ${getColor(score)}`}>Cringe Score™</div>
        <div className="text-xs text-gray-500">
          {getEmoji(score)} {getLabel(score)}
        </div>
      </div>
    </div>
  )
}
