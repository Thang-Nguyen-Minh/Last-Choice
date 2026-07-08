export type CourseItem = {
  id: string
  title: string
  price: number
}

export type CartState = {
  items: CourseItem[]
  couponCode: string
  discountRate: number
  total: number
}

export type CartAction =
  | { type: 'ADD_COURSE'; payload: CourseItem }
  | { type: 'REMOVE_COURSE'; payload: { id: string } }
  | { type: 'APPLY_COUPON'; payload: { code: string } }

export const availableCourses: CourseItem[] = [
  { id: 'react', title: 'React State Mastery', price: 1200000 },
  { id: 'ts', title: 'TypeScript Pro', price: 900000 },
  { id: 'testing', title: 'Testing Strategy', price: 750000 },
]

const couponRates: Record<string, number> = {
  SAVE10: 0.1,
  VIP20: 0.2,
}

export const initialCartState: CartState = {
  items: [],
  couponCode: '',
  discountRate: 0,
  total: 0,
}

function calculateTotal(items: CourseItem[], discountRate: number): number {
  const subtotal = items.reduce((sum, item) => sum + item.price, 0)
  return Math.max(0, subtotal - subtotal * discountRate)
}

export function formatMoney(value: number): string {
  return new Intl.NumberFormat('vi-VN', {
    style: 'currency',
    currency: 'VND',
    maximumFractionDigits: 0,
  }).format(value)
}

export function cartReducer(state: CartState, action: CartAction): CartState {
  switch (action.type) {
    case 'ADD_COURSE': {
      const exists = state.items.some((item) => item.id === action.payload.id)

      if (exists) {
        return state
      }

      const items = [...state.items, action.payload]
      return { ...state, items, total: calculateTotal(items, state.discountRate) }
    }
    case 'REMOVE_COURSE': {
      const items = state.items.filter((item) => item.id !== action.payload.id)
      return { ...state, items, total: calculateTotal(items, state.discountRate) }
    }
    case 'APPLY_COUPON': {
      const couponCode = action.payload.code.trim().toUpperCase()
      const discountRate = couponRates[couponCode] ?? 0
      return { ...state, couponCode, discountRate, total: calculateTotal(state.items, discountRate) }
    }
    default: {
      return state
    }
  }
}
