type FaqItemProps = {
  index: number
  question: string
  answer: string
  isOpen: boolean
  onToggle: (index: number) => void
}

function FaqItem({ index, question, answer, isOpen, onToggle }: FaqItemProps) {
  const panelId = `faq-panel-${index}`

  return (
    <article className="rounded-lg border border-zinc-200 bg-white shadow-sm">
      <button
        type="button"
        aria-expanded={isOpen}
        aria-controls={panelId}
        onClick={() => onToggle(index)}
        className="flex w-full items-center justify-between gap-4 rounded-lg px-4 py-4 text-left font-semibold text-zinc-950 transition hover:bg-[#f7f5ef] focus:outline-none focus:ring-2 focus:ring-teal-300"
      >
        <span>{question}</span>
        <span aria-hidden="true" className="text-xl text-teal-700">
          {isOpen ? '-' : '+'}
        </span>
      </button>
      {isOpen ? (
        <div id={panelId} className="border-t border-zinc-200 px-4 py-4 text-sm leading-6 text-zinc-700">
          {answer}
        </div>
      ) : null}
    </article>
  )
}

export default FaqItem
