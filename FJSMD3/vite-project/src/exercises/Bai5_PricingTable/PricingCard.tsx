import { formatPlanPrice } from './pricingUtils'

type PricingCardProps = {
  title: string
  price: number
  features: string[]
  highlight?: boolean
}

function PricingCard({ title, price, features, highlight = false }: PricingCardProps) {
  return (
    <article
      className={`flex h-full flex-col rounded-lg border bg-white p-5 shadow-sm ${
        highlight ? 'border-teal-700 ring-2 ring-teal-100' : 'border-zinc-200'
      }`}
    >
      <div className="flex items-start justify-between gap-3">
        <div>
          <h3 className="text-xl font-bold text-zinc-950">{title}</h3>
          <p className="mt-2 text-2xl font-bold text-teal-700">{formatPlanPrice(price)}</p>
        </div>
        {highlight ? (
          <span className="rounded-lg bg-amber-100 px-3 py-1 text-xs font-semibold text-amber-900">Phổ biến</span>
        ) : null}
      </div>

      <ul className="mt-5 flex flex-1 flex-col gap-3 text-sm text-zinc-700">
        {features.map((feature) => (
          <li key={feature} className="flex gap-2">
            <span aria-hidden="true" className="mt-1 h-2 w-2 rounded-full bg-rose-500" />
            <span>{feature}</span>
          </li>
        ))}
      </ul>
    </article>
  )
}

export default PricingCard
