import { Link } from "react-router-dom";
import { ArrowRight, Activity, Shield, Zap } from "lucide-react";

export function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[calc(100vh-4rem)] py-12 px-4 text-center">
      <div className="inline-flex items-center rounded-full border border-primary/20 bg-primary/10 px-3 py-1 text-sm text-primary mb-8">
        <Activity className="mr-2 h-4 w-4" />
        <span>Platform Version 1.0</span>
      </div>
      
      <h1 className="max-w-3xl text-4xl font-bold tracking-tight sm:text-6xl mb-6">
        Professional Football <br />
        <span className="text-primary">Analytics Platform</span>
      </h1>
      
      <p className="max-w-2xl text-lg text-text-muted mb-10">
        Access real-time football fixtures, match details, and comprehensive data. 
        Built for professionals who require accurate, up-to-date sports intelligence without the noise.
      </p>
      
      <Link 
        to="/today"
        className="inline-flex items-center justify-center rounded-md bg-primary px-8 py-3 text-sm font-medium text-white transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background"
      >
        View Today's Matches
        <ArrowRight className="ml-2 h-4 w-4" />
      </Link>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-24 w-full max-w-5xl text-left">
        <div className="flex flex-col gap-3 p-6 rounded-2xl bg-surface border border-surface-hover">
          <div className="h-10 w-10 rounded-lg bg-primary/20 flex items-center justify-center text-primary mb-2">
            <Zap className="h-5 w-5" />
          </div>
          <h3 className="font-semibold text-lg">Real-time Data</h3>
          <p className="text-sm text-text-muted">Direct connection to official match feeds ensuring you see fixtures exactly as they happen.</p>
        </div>
        
        <div className="flex flex-col gap-3 p-6 rounded-2xl bg-surface border border-surface-hover">
          <div className="h-10 w-10 rounded-lg bg-primary/20 flex items-center justify-center text-primary mb-2">
            <Shield className="h-5 w-5" />
          </div>
          <h3 className="font-semibold text-lg">No Hallucinations</h3>
          <p className="text-sm text-text-muted">We do not simulate data or use placeholders. If a match isn't happening, we don't show it.</p>
        </div>
        
        <div className="flex flex-col gap-3 p-6 rounded-2xl bg-surface border border-surface-hover">
          <div className="h-10 w-10 rounded-lg bg-primary/20 flex items-center justify-center text-primary mb-2">
            <Activity className="h-5 w-5" />
          </div>
          <h3 className="font-semibold text-lg">Clean Interface</h3>
          <p className="text-sm text-text-muted">A professional, distraction-free environment focused purely on the fixtures you need.</p>
        </div>
      </div>
    </div>
  );
}
