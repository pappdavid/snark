import Link from 'next/link'
import { Button } from '@/components/ui/button'

interface PricingCardProps {
  name: string
  price: string
  period: string
  description: string
  features: string[]
  cta: string
  href: string
  highlighted?: boolean
}

export function PricingCard({
  name,
  price,
  period,
  description,
  features,
  cta,
  href,
  highlighted = false,
}: PricingCardProps) {
  return (
    <div
      className={`rounded-xl p-6 flex flex-col ${
        highlighted
          ? 'bg-indigo-950 border-2 border-indigo-500 relative'
          : 'bg-gray-900 border border-gray-800'
      }`}
    >
      {highlighted && (
        <div className="absolute -top-3 left-1/2 -translate-x-1/2">
          <span className="bg-indigo-500 text-white text-xs font-bold px-3 py-1 rounded-full">
            Most Popular
          </span>
        </div>
      )}

      <div className="mb-6">
        <h3 className="text-lg font-bold text-white mb-1">{name}</h3>
        <div className="flex items-baseline gap-1 mb-2">
          <span className="text-4xl font-black text-white">{price}</span>
          <span className="text-gray-500 text-sm">/{period}</span>
        </div>
        <p className="text-gray-400 text-sm">{description}</p>
      </div>

      <ul className="space-y-3 mb-8 flex-1">
        {features.map((feature) => (
          <li key={feature} className="flex items-start gap-2 text-sm">
            <span className="text-green-400 mt-0.5">✓</span>
            <span className="text-gray-300">{feature}</span>
          </li>
        ))}
      </ul>

      <Link href={href}>
        <Button
          className={`w-full ${
            highlighted
              ? 'bg-indigo-600 hover:bg-indigo-700 text-white'
              : 'bg-gray-800 hover:bg-gray-700 text-white border border-gray-700'
          }`}
        >
          {cta}
        </Button>
      </Link>
    </div>
  )
}
