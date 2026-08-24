import { useState } from 'react'
import {
  LessonTabs,
  type LessonTab,
} from '../../../components/lesson/LessonTabs'
import type { Vector2 } from '../../../visualization/math/vector2'
import { CodeView } from './CodeView'
import { ExperimentView } from './ExperimentView'
import { IntuitionView } from './IntuitionView'
import { MathView } from './MathView'
import { OperationsView } from './OperationsView'
const DEFAULT_VECTOR = { x: 3, y: 2 }
export function VectorsLesson() {
  const [tab, setTab] = useState<LessonTab>('intuition')
  const [v, setV] = useState<Vector2>(DEFAULT_VECTOR)
  return (
    <>
      <header className="lesson-header">
        <p className="eyebrow">01 / foundations</p>
        <h1>vectors</h1>
        <p>A vector represents a quantity with direction and magnitude.</p>
        <LessonTabs active={tab} onChange={setTab} />
      </header>
      <div className="vector-lesson-content">
        {tab === 'intuition' && (
          <IntuitionView
            value={v}
            onChange={setV}
            onReset={() => setV(DEFAULT_VECTOR)}
          />
        )}{' '}
        {tab === 'visual' && <OperationsView />}
        {tab === 'math' && (
          <MathView v={v} a={{ x: 2, y: 1 }} b={{ x: 1, y: 2 }} />
        )}
        {tab === 'code' && <CodeView />}
        {tab === 'experiment' && <ExperimentView />}
      </div>
    </>
  )
}
