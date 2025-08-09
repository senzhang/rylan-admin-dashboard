import { Component, type ReactNode } from 'react'
export class ErrorBoundary extends Component<{children: ReactNode}, {hasError: boolean}> {
  constructor(props: any){ super(props); this.state={hasError:false} }
  static getDerivedStateFromError(){ return { hasError: true } }
  componentDidCatch(err: any){ console.error(err) }
  render(){ return this.state.hasError ? <div className="p-6">Something went wrong.</div> : this.props.children }
}
