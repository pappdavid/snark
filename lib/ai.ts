import OpenAI from 'openai'

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
})

const SNARK_LEVELS: Record<number, string> = {
  1: 'mildly critical but constructive',
  2: 'somewhat sarcastic but still professional',
  3: 'noticeably snarky with light humor',
  4: 'clearly snarky with sharp observations',
  5: 'moderately brutal with pointed remarks',
  6: 'quite savage with heavy sarcasm',
  7: 'very brutal with little mercy',
  8: 'extremely savage, barely holding back',
  9: 'almost no filter, savage commentary',
  10: 'absolutely savage, maximum brutality',
}

function getSystemPrompt(snarkLevel: number): string {
  const snarkDescription = SNARK_LEVELS[snarkLevel] ?? SNARK_LEVELS[5]
  
  return `You are Snark, a cynical senior software engineer who has survived 20+ years of enterprise codebases, startup disasters, and "move fast and break things" philosophies. You review code with brutal honesty and dark humor. Your tone is ${snarkDescription}.

Your reviews must:
1. Be genuinely useful — every piece of snark must contain actionable feedback
2. Use dramatic sighs ("Oh... oh no." or "I need a moment.") for truly bad code
3. Make sarcastic comparisons to ancient bad practices ("I haven't seen this since jQuery was cool")
4. Reference developer suffering with dark humor ("your future self will hate you for this")
5. Give a "Cringe Score" from 1-10 (1=surprisingly decent, 10=my eyes are bleeding)
6. End with a "Therapy Recommendation" — a book, course, or activity the developer needs

Output MUST be valid JSON with this exact structure:
{
  "cringeScore": <number 1-10>,
  "summary": "<overall review as a multi-paragraph string with \\n\\n between paragraphs>",
  "comments": [
    {
      "file": "<filename>",
      "line": <line number or null>,
      "severity": "<critical|high|medium|low|info>",
      "comment": "<specific snarky feedback with actual fix suggestion>"
    }
  ],
  "therapy": "<personalized recommendation for the developer>"
}

Remember: you're mean but not cruel. You want them to improve. You're like the tough-love coach that screams at you because they believe you can be better.`
}

export interface ReviewInput {
  prTitle: string
  prBody: string
  diff: string
  snarkLevel?: number
}

export interface ReviewComment {
  file: string
  line: number | null
  severity: 'critical' | 'high' | 'medium' | 'low' | 'info'
  comment: string
}

export interface ReviewResult {
  cringeScore: number
  summary: string
  comments: ReviewComment[]
  therapy: string
}

const MAX_DIFF_LENGTH = 15000

export async function generateSnarkReview(input: ReviewInput): Promise<ReviewResult> {
  const { prTitle, prBody, diff, snarkLevel = 5 } = input

  const userPrompt = `Review this pull request:

**PR Title**: ${prTitle}

**PR Description**: 
${prBody || '(No description provided. Bold move.)'}

**Code Diff**:
\`\`\`diff
${diff.slice(0, MAX_DIFF_LENGTH)}
\`\`\`

Please review this code with your signature brutally honest style. Give a Cringe Score, detailed comments on specific issues, and a therapy recommendation.`

  const response = await openai.chat.completions.create({
    model: 'gpt-4o',
    messages: [
      { role: 'system', content: getSystemPrompt(snarkLevel) },
      { role: 'user', content: userPrompt },
    ],
    response_format: { type: 'json_object' },
    temperature: 0.8,
    max_tokens: 4000,
  })

  const content = response.choices[0].message.content
  if (!content) throw new Error('No response from AI')

  const result = JSON.parse(content) as ReviewResult
  
  return {
    cringeScore: Math.min(10, Math.max(1, Math.round(result.cringeScore))),
    summary: result.summary ?? 'No summary available.',
    comments: Array.isArray(result.comments) ? result.comments : [],
    therapy: result.therapy ?? 'Please seek professional help.',
  }
}
