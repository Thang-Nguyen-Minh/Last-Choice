export type Faq = {
  question: string
  answer: string
}

export const faqs: Faq[] = [
  {
    question: 'Một project có thể nộp nhiều bài không?',
    answer: 'Có. Dashboard tab giúp giảng viên mở một project duy nhất và xem từng bài độc lập.',
  },
  {
    question: 'Vì sao activeIndex nằm ở FaqList?',
    answer: 'FaqList là cha chung nên biết item nào đang mở và có thể đóng item cũ khi item mới được chọn.',
  },
  {
    question: 'FaqItem cần nhận props gì?',
    answer: 'FaqItem nhận question, answer, isOpen và onToggle để chỉ tập trung hiển thị một item.',
  },
  {
    question: 'Click lại câu đang mở thì sao?',
    answer: 'State activeIndex được đổi về null, vì vậy toàn bộ câu trả lời sẽ đóng lại.',
  },
  {
    question: 'Accordion này có dễ mở rộng không?',
    answer: 'Có. Chỉ cần thêm dữ liệu vào mảng FAQ, component cha sẽ render thêm item tương ứng.',
  },
]
