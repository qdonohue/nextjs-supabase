import { testAction, initSupabaseAction, stopSupabaseAction } from './actions'
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
      
      <div className="space-y-6">
        <div>
          <h2 className="text-xl font-semibold mb-4">Supabase Local Development</h2>
          <div className="flex gap-2">
            <form action={initSupabaseAction}>
              <Button type="submit" variant="default">Start Supabase</Button>
            </form>
            <form action={stopSupabaseAction}>
              <Button type="submit" variant="outline">Stop Supabase</Button>
            </form>
          </div>
          <p className="text-sm text-muted-foreground mt-2">
            Start/stop local Supabase development environment. Check server console for output.
          </p>
        </div>

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