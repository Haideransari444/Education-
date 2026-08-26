import { Component, type ErrorInfo, type ReactNode } from 'react'

interface Props {
  children: ReactNode
}

interface State {
  failed: boolean
}

export class IntegrationErrorBoundary extends Component<Props, State> {
  state: State = { failed: false }

  static getDerivedStateFromError(): State {
    return { failed: true }
  }

  componentDidCatch(error: Error, info: ErrorInfo) {
    if (import.meta.env.DEV) console.error('Visualizer failed', error, info)
  }

  render() {
    if (this.state.failed)
      return (
        <section className="integration-error" role="alert">
          <h2>Visualizer unavailable.</h2>
          <p>
            The lesson shell is still safe. Reset this visualizer and retry.
          </p>
          <button onClick={() => this.setState({ failed: false })}>
            retry
          </button>
        </section>
      )
    return this.props.children
  }
}
