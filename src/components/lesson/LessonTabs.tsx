const tabs = ['intuition', 'visual', 'math', 'code', 'experiment'] as const
export type LessonTab = (typeof tabs)[number]
export function LessonTabs({
  active,
  onChange,
}: {
  active: LessonTab
  onChange: (tab: LessonTab) => void
}) {
  return (
    <div className="lesson-tabs" role="tablist" aria-label="Lesson views">
      {tabs.map((tab) => (
        <button
          key={tab}
          role="tab"
          aria-selected={active === tab}
          onClick={() => onChange(tab)}
        >
          {tab}
        </button>
      ))}
    </div>
  )
}
