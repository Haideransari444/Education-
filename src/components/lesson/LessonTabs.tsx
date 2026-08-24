import { useState } from 'react'

const tabs = ['intuition', 'visual', 'math', 'code', 'experiment'] as const

export function LessonTabs() {
  const [active, setActive] = useState<(typeof tabs)[number]>('intuition')
  return (
    <div className="lesson-tabs" role="tablist" aria-label="Lesson views">
      {tabs.map((tab) => (
        <button
          key={tab}
          role="tab"
          aria-selected={active === tab}
          onClick={() => setActive(tab)}
        >
          {tab}
        </button>
      ))}
    </div>
  )
}
