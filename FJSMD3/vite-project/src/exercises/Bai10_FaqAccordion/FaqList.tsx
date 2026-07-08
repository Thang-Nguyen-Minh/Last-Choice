import { useState } from 'react'
import { faqs } from './faqData'
import FaqItem from './FaqItem'
import { getNextActiveIndex } from './faqLogic'

function FaqList() {
  const [activeIndex, setActiveIndex] = useState<number | null>(null)

  function handleToggle(clickedIndex: number) {
    setActiveIndex((currentIndex) => getNextActiveIndex(currentIndex, clickedIndex))
  }

  return (
    <div className="grid gap-3">
      {faqs.map((faq, index) => (
        <FaqItem
          key={faq.question}
          index={index}
          question={faq.question}
          answer={faq.answer}
          isOpen={activeIndex === index}
          onToggle={handleToggle}
        />
      ))}
    </div>
  )
}

export default FaqList
