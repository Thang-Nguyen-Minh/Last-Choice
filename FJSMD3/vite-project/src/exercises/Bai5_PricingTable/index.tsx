import PricingCard from './PricingCard'
import { pricingPlans } from './pricingUtils'

function Bai5PricingTable() {
  return (
    <section className="grid gap-6">
      <div className="max-w-3xl">
        <p className="text-sm font-semibold uppercase text-teal-700">Bài 5 - Pricing Table</p>
        <h3 className="mt-2 text-2xl font-bold text-zinc-950">Bảng giá dịch vụ hệ thống</h3>
        <p className="mt-3 text-sm leading-6 text-zinc-600">
          Component cha quản lý dữ liệu gói dịch vụ, component con nhận props và xử lý bẫy dữ liệu giá không hợp lệ bằng nhãn Liên hệ.
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        {pricingPlans.map((plan) => (
          <PricingCard
            key={plan.id}
            title={plan.title}
            price={plan.price}
            features={plan.features}
            highlight={plan.highlight}
          />
        ))}
      </div>
    </section>
  )
}

export default Bai5PricingTable
