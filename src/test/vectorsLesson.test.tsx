import { fireEvent, render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import { VectorsLesson } from '../lessons/foundations/vectors/VectorsLesson'
describe('vectors lesson', () => {
  it('updates magnitude when x changes', () => {
    render(<VectorsLesson />)
    const input = screen.getByLabelText('v x')
    fireEvent.change(input, { target: { value: '0' } })
    expect(screen.getByText('2.000')).toBeInTheDocument()
  })
  it('reset restores defaults', () => {
    render(<VectorsLesson />)
    const input = screen.getByLabelText('v x')
    fireEvent.change(input, { target: { value: '1' } })
    fireEvent.click(screen.getByRole('button', { name: 'reset' }))
    expect(input).toHaveValue(3)
  })
  it('ignores invalid numeric input safely', () => {
    render(<VectorsLesson />)
    const input = screen.getByLabelText('v x')
    fireEvent.change(input, { target: { value: 'not-a-number' } })
    expect(screen.getAllByText(/3.606/).length).toBeGreaterThan(0)
  })
})
