import { Component, type ErrorInfo, type ReactNode } from 'react';

interface Props { children:ReactNode }
interface State { failed:boolean }
export class AppErrorBoundary extends Component<Props,State> {
  state:State={failed:false};
  static getDerivedStateFromError():State { return {failed:true}; }
  componentDidCatch(error:Error,info:ErrorInfo) {
    // Never expose sensitive app state or user details in rendered errors.
    if(import.meta.env.DEV)console.error('Rendering error:',error,info.componentStack);
  }
  render(){
    if(this.state.failed)return <main className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <section role="alert" className="w-full max-w-lg bg-white rounded-xl border p-6 space-y-4">
        <h1 className="text-2xl font-semibold">Something went wrong</h1>
        <p className="text-gray-700">This page could not be displayed. Your account has not been signed out.</p>
        <div className="flex gap-3 flex-wrap">
          <button type="button" onClick={()=>this.setState({failed:false})} className="rounded bg-gray-900 text-white px-4 py-2">Try again</button>
          <button type="button" onClick={()=>window.location.assign('/')} className="rounded border px-4 py-2">Return to home</button>
        </div>
      </section>
    </main>;
    return this.props.children;
  }
}
