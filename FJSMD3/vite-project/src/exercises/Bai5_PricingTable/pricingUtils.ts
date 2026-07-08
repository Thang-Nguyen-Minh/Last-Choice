export type PricingPlan = {
  id: string
  title: string
  price: number
  highlight?: boolean
  features: string[]
}

export function formatPlanPrice(price: number): string {
  if (!Number.isFinite(price) || price <= 0) {
    return 'Liên hệ'
  }

  return new Intl.NumberFormat('vi-VN', {
    style: 'currency',
    currency: 'VND',
    maximumFractionDigits: 0,
  }).format(price)
}

export const pricingPlans: PricingPlan[] = [
  {
    id: 'basic-plan',
    title: 'Basic',
    price: 150000,
    features: ['Hỗ trợ qua Email 24/7', 'Tối đa 3 dự án', 'Dung lượng lưu trữ 5GB'],
  },
  {
    id: 'pro-plan',
    title: 'Pro',
    price: 450000,
    highlight: true,
    features: ['Ưu tiên hỗ trợ 24/7', 'Không giới hạn dự án', 'Dung lượng lưu trữ 50GB', 'Báo cáo nâng cao'],
  },
  {
    id: 'enterprise-plan',
    title: 'Enterprise',
    price: 0,
    features: ['Bảo mật chuyên biệt', 'Dedicated Server', 'Tích hợp API tùy biến', 'SLA cam kết 99.9%'],
  },
]
