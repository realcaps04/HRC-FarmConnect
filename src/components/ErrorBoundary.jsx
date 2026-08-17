import { Component } from 'react'
import { UpdatePrompt } from './UpdatePrompt'
import { isChunkLoadError } from '../utils/appVersion'

export class ErrorBoundary extends Component {
  constructor(props) {
    super(props)
    this.state = { requiredUpdate: false }
  }

  static getDerivedStateFromError(error) {
    if (isChunkLoadError(error)) {
      return { requiredUpdate: true }
    }
    return { requiredUpdate: false, error }
  }

  componentDidCatch(error) {
    if (isChunkLoadError(error)) {
      this.setState({ requiredUpdate: true })
    }
  }

  render() {
    if (this.state.requiredUpdate) {
      return <UpdatePrompt required />
    }

    if (this.state.error) {
      return this.props.fallback || <UpdatePrompt required />
    }

    return (
      <>
        {this.props.children}
        <UpdatePrompt />
      </>
    )
  }
}
