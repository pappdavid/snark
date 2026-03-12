import { Octokit } from '@octokit/rest'

export function getOctokit(accessToken: string) {
  return new Octokit({ auth: accessToken })
}

export async function getUserRepositories(accessToken: string) {
  const octokit = getOctokit(accessToken)
  const { data } = await octokit.repos.listForAuthenticatedUser({
    sort: 'updated',
    per_page: 100,
  })
  return data
}

export async function getPullRequestDiff(
  accessToken: string,
  owner: string,
  repo: string,
  pullNumber: number
) {
  const octokit = getOctokit(accessToken)
  const { data } = await octokit.pulls.get({
    owner,
    repo,
    pull_number: pullNumber,
    mediaType: { format: 'diff' },
  })
  return data as unknown as string
}

export async function postReviewComment(
  accessToken: string,
  owner: string,
  repo: string,
  pullNumber: number,
  body: string
) {
  const octokit = getOctokit(accessToken)
  return octokit.issues.createComment({
    owner,
    repo,
    issue_number: pullNumber,
    body,
  })
}

export function formatReviewForGitHub(review: {
  cringeScore: number
  summary: string
  therapy: string
  comments: Array<{ file: string; line: number | null; severity: string; comment: string }>
}): string {
  const scoreEmoji = review.cringeScore >= 8 ? '🔥' : review.cringeScore >= 5 ? '😬' : '😌'
  
  let body = `## 🐍 Snark Code Review\n\n`
  body += `**Cringe Score: ${review.cringeScore}/10 ${scoreEmoji}**\n\n`
  body += `### Summary\n\n${review.summary}\n\n`
  
  if (review.comments.length > 0) {
    body += `### Issues Found\n\n`
    for (const comment of review.comments) {
      const severityEmoji: Record<string, string> = {
        critical: '🚨',
        high: '⚠️',
        medium: '📝',
        low: '💭',
        info: 'ℹ️',
      }
      const emoji = severityEmoji[comment.severity] ?? '📝'
      
      body += `**${emoji} ${comment.severity.toUpperCase()}** — \`${comment.file}\`${comment.line ? ` (line ${comment.line})` : ''}\n\n`
      body += `${comment.comment}\n\n`
      body += `---\n\n`
    }
  }
  
  body += `### 🛋️ Therapy Recommendation\n\n${review.therapy}\n\n`
  body += `---\n*Powered by [Snark](https://snark.dev) — We review your code. We judge your life choices.*`
  
  return body
}
