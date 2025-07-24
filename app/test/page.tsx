import { testAction } from './actions'
import { Button } from '@/components/ui/button'

export default function TestPage() {
  if (process.env.NODE_ENV !== 'development') {
    return null
  }

  return (
    <div className="container mx-auto p-8">
      <h1 className="text-3xl font-bold mb-8">Test Page</h1>
      <p className="text-muted-foreground mb-6">
        This page only exists in development and is used for testing server functionality.
      </p>
      
      <div className="space-y-4">
        <div>
          <h2 className="text-xl font-semibold mb-2">Server Actions</h2>
          <form action={testAction}>
            <Button type="submit">Click me</Button>
          </form>
        </div>
      </div>
    </div>
  )
}