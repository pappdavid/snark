import { CringeScore } from './CringeScore'

interface ReviewComment {
  file: string
  line?: number | null
  severity: string
  comment: string
}

interface SnarkReviewProps {
  review: {
    prTitle: string
    cringeScore?: number
    summary?: string
    comments?: ReviewComment[]
    therapy?: string
  }
}

export function SnarkReview({ review }: SnarkReviewProps) {
  const severityConfig: Record<string, { label: string; bg: string; border: string; text: string }> = {
    critical: { label: '🚨 Critical', bg: 'bg-red-950', border: 'border-red-800', text: 'text-red-300' },
    high: { label: '⚠️ High', bg: 'bg-orange-950', border: 'border-orange-800', text: 'text-orange-300' },
    medium: { label: '📝 Medium', bg: 'bg-yellow-950', border: 'border-yellow-800', text: 'text-yellow-300' },
    low: { label: '💭 Low', bg: 'bg-blue-950', border: 'border-blue-800', text: 'text-blue-300' },
    info: { label: 'ℹ️ Info', bg: 'bg-gray-900', border: 'border-gray-700', text: 'text-gray-400' },
  }

  return (
    <div className="space-y-6">
      <div className="bg-gray-900 border border-gray-800 rounded-xl p-6">
        <div className="flex items-start justify-between gap-4 flex-wrap">
          <div>
            <h2 className="text-lg font-bold text-white mb-1">{review.prTitle}</h2>
            <p className="text-gray-500 text-sm">AI Code Review by Snark™</p>
          </div>
          {review.cringeScore !== undefined && (
            <CringeScore score={review.cringeScore} size="lg" />
          )}
        </div>
      </div>

      {review.summary && (
        <div className="bg-gray-900 border border-gray-800 rounded-xl p-6">
          <h3 className="font-bold text-gray-300 mb-4 text-sm uppercase tracking-wider">
            📋 Review Summary
          </h3>
          <div className="prose prose-invert prose-sm max-w-none">
            {review.summary.split('\n\n').map((paragraph, i) => (
              <p key={i} className="text-gray-300 leading-relaxed mb-3 last:mb-0">
                {paragraph}
              </p>
            ))}
          </div>
        </div>
      )}

      {review.comments && review.comments.length > 0 && (
        <div>
          <h3 className="font-bold text-gray-300 mb-4 text-sm uppercase tracking-wider">
            🔍 Specific Issues ({review.comments.length})
          </h3>
          <div className="space-y-4">
            {review.comments.map((comment, i) => {
              const config = severityConfig[comment.severity] ?? severityConfig.info
              return (
                <div key={i} className={`border ${config.border} ${config.bg} rounded-xl p-5`}>
                  <div className="flex items-center gap-2 mb-3">
                    <span className={`text-xs font-bold ${config.text} uppercase`}>
                      {config.label}
                    </span>
                    <span className="text-gray-600">·</span>
                    <code className="text-gray-400 text-xs font-mono bg-gray-800 px-2 py-0.5 rounded">
                      {comment.file}
                      {comment.line ? `:${comment.line}` : ''}
                    </code>
                  </div>
                  <div className="text-gray-300 text-sm leading-relaxed whitespace-pre-wrap">
                    {comment.comment}
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      )}

      {review.therapy && (
        <div className="bg-purple-950 border border-purple-800 rounded-xl p-6">
          <h3 className="font-bold text-purple-300 mb-3 text-sm uppercase tracking-wider">
            🛋️ Therapy Recommendation
          </h3>
          <p className="text-gray-300 text-sm leading-relaxed">{review.therapy}</p>
        </div>
      )}
    </div>
  )
}
