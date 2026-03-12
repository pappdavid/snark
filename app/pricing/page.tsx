import { PricingCard } from '@/components/PricingCard'
import Link from 'next/link'
import { Button } from '@/components/ui/button'

export default function PricingPage() {
  return (
    <div className="min-h-screen bg-gray-950 text-white">
      <nav className="border-b border-gray-800 px-6 py-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <span className="text-2xl">🐍</span>
            <span className="text-xl font-bold text-white">Snark</span>
          </Link>
          <Link href="/login">
            <Button size="sm" className="bg-indigo-600 hover:bg-indigo-700 text-white">
              Sign In
            </Button>
          </Link>
        </div>
      </nav>

      <div className="px-6 py-24">
        <div className="max-w-5xl mx-auto">
          <h1 className="text-4xl font-black text-center mb-4">
            Choose Your Tier of Humiliation
          </h1>
          <p className="text-gray-400 text-center mb-16 max-w-2xl mx-auto">
            Every plan includes our patented Cringe Score™ technology and at least one existential crisis per month.
          </p>

          <div className="grid md:grid-cols-3 gap-6 mb-16">
            <PricingCard
              name="Free"
              price="$0"
              period="forever"
              description="For developers who aren't sure they can handle the truth yet."
              features={[
                '3 reviews per month',
                'Basic snark level',
                'Cringe Score™',
                'GitHub integration',
                'Public shame (open source only)',
              ]}
              cta="Start Free"
              href="/login"
            />
            <PricingCard
              name="Pro"
              price="$12"
              period="per month"
              description="For developers who know they have problems and want detailed feedback."
              features={[
                'Unlimited reviews',
                'Full snark level control',
                'Detailed inline comments',
                'Therapy recommendations',
                'PR history & analytics',
                'Priority roasting queue',
                'Private repos supported',
              ]}
              cta="Get Roasted Pro"
              href="/login"
              highlighted
            />
            <PricingCard
              name="Team"
              price="$49"
              period="per month"
              description="For entire teams who want to publicly rank each other by code quality."
              features={[
                'Up to 10 seats',
                'Everything in Pro',
                'Team leaderboard (most cringe)',
                'Slack notifications',
                'Custom snark personas',
                'Org-wide insights',
                'Dedicated shame channel',
              ]}
              cta="Shame My Whole Team"
              href="/login"
            />
          </div>

          <div className="text-center">
            <h2 className="text-2xl font-black mb-4">Frequently Asked Questions</h2>
            <div className="grid md:grid-cols-2 gap-6 text-left max-w-3xl mx-auto">
              {[
                {
                  q: 'Will Snark make my developers cry?',
                  a: 'That depends entirely on the quality of their code. We have seen tears. We do not apologize.',
                },
                {
                  q: 'Is the feedback actually useful?',
                  a: 'Yes. Despite the snark, every review includes genuine actionable feedback. We are mean, not useless.',
                },
                {
                  q: 'Can I adjust how mean it is?',
                  a: 'Yes! Pro and Team plans include a Snark Level slider from "Mildly Rude" to "Absolutely Savage."',
                },
                {
                  q: 'What if my team hates me after signing up?',
                  a: 'That was probably already happening. Now you just have data to explain why.',
                },
              ].map((faq) => (
                <div key={faq.q} className="bg-gray-900 border border-gray-800 rounded-xl p-5">
                  <h3 className="font-bold mb-2 text-sm">{faq.q}</h3>
                  <p className="text-gray-400 text-sm">{faq.a}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
