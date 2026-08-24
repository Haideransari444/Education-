interface NumericControlProps {
  label: string
  value: number
  onChange: (value: number) => void
  min?: number
  max?: number
  step?: number
  disabled?: boolean
}

export function NumericControl({
  label,
  value,
  onChange,
  min = -Infinity,
  max = Infinity,
  step = 0.1,
  disabled,
}: NumericControlProps) {
  return (
    <label className="numeric-control">
      <span>{label}</span>
      <input
        aria-label={label}
        type="number"
        value={Number(value.toFixed(3))}
        min={min}
        max={max}
        step={step}
        disabled={disabled}
        onChange={(event) => {
          const parsed = event.currentTarget.valueAsNumber
          if (Number.isFinite(parsed))
            onChange(Math.max(min, Math.min(max, parsed)))
        }}
      />
    </label>
  )
}
