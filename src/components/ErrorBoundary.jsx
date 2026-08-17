import { Component } from 'react'
import { UpdatePrompt } from './UpdatePrompt'
import { isChunkLoadError } from '../utils/appVersion'

export class ErrorBoundary extends Component {
  constructor(props) {
    super(props)
    this.state = { requiredUpdate: false, error: null }
  }

  static getDerivedStateFromError(error) {
    if (import.meta.env.DEV) {
      return { requiredUpdate: false, error: null }
    }
    if (isChunkLoadError(error)) {
      return { requiredUpdate: true, error: null }
    }
    return { requiredUpdate: false, error }
  }

  componentDidCatch(error) {
    if (import.meta.env.DEV) {
      console.warn('HRC FarmConnect recovered from a render error.', error)
    }
  }

  clearError = () => {
    this.setState({ requiredUpdate: false, error: null })
  }

  render() {
    if (this.state.requiredUpdate || this.state.error) {
      return <UpdatePrompt required={Boolean(this.state.requiredUpdate)} onDismiss={this.clearError} />
    }

    return (
      <>
        {this.props.children}
        <UpdatePrompt />
      </>
    )
  }
}
