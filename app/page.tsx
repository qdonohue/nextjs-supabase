import { ThemeSwitcher } from "@/components/theme-switcher";
import { Checkbox } from "@/components/ui/checkbox";
import { AuthButton } from "@/components/auth-button";

export default function Home() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-background to-muted">
      <div className="w-full max-w-2xl p-8 space-y-8">
        <div className="text-center space-y-4">
          <h1 className="text-6xl font-bold bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
            Quinn's Placeholder Project
          </h1>
          <p className="text-muted-foreground text-lg">
            A Next.js + Supabase starter template
          </p>
        </div>

        <div className="bg-card rounded-lg border p-6 space-y-4">
          <h2 className="text-xl font-semibold mb-4">Setup Checklist</h2>
          <div className="space-y-3">
            <div className="flex items-center space-x-3">
              <Checkbox id="vercel" />
              <label htmlFor="vercel" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                Remember to create a Vercel project
              </label>
            </div>
            <div className="flex items-center space-x-3">
              <Checkbox id="supabase" />
              <label htmlFor="supabase" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                Remember to connect Supabase
              </label>
            </div>
            <div className="flex items-center space-x-3">
              <Checkbox id="env" />
              <label htmlFor="env" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                Remember to duplicate the anon key to NEXT_PUBLIC_SUPABASE_PUBLISHABLE_OR_ANON_KEY in .env.local
              </label>
            </div>
          </div>
        </div>

        <div className="flex justify-center items-center gap-4">
          <AuthButton />
          <ThemeSwitcher />
        </div>
      </div>
    </main>
  );
}
