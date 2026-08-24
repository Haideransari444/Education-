import { CoordinatePlane } from '../../../visualization/primitives/CoordinatePlane'
import { DraggablePoint } from '../../../visualization/primitives/DraggablePoint'
import { ProjectionLines } from '../../../visualization/primitives/ProjectionLines'
import { VectorArrow } from '../../../visualization/primitives/VectorArrow'
import type { Vector2 } from '../../../visualization/math/vector2'

export function VectorPlot({
  vectors,
  draggable,
  onChange,
  projections = false,
  title = 'Vector graph',
}: {
  vectors: Array<{
    value: Vector2
    label: string
    muted?: boolean
    start?: Vector2
    dashed?: boolean
  }>
  draggable?: number
  onChange?: (value: Vector2) => void
  projections?: boolean
  title?: string
}) {
  return (
    <CoordinatePlane
      xMin={-5}
      xMax={5}
      yMin={-4}
      yMax={4}
      title={title}
      description={`${vectors.map((v) => `${v.label} equals ${v.value.x}, ${v.value.y}`).join('. ')}. Use arrow keys on a focused endpoint to adjust it.`}
    >
      {projections && vectors[0] && <ProjectionLines end={vectors[0].value} />}{' '}
      {vectors.map((item, index) => (
        <VectorArrow
          key={`${item.label}-${index}`}
          start={item.start}
          end={item.value}
          label={item.label}
          selected={index === draggable}
          muted={item.muted}
          dashed={item.dashed}
        />
      ))}
      {draggable !== undefined && vectors[draggable] && onChange && (
        <DraggablePoint
          value={vectors[draggable].value}
          onChange={onChange}
          label={`endpoint for ${vectors[draggable].label}`}
        />
      )}
    </CoordinatePlane>
  )
}
