import { Shield, Activity, Database } from "lucide-react";

export function About() {
  return (
    <div className="container mx-auto px-4 py-12 max-w-3xl">
      <h1 className="text-3xl font-bold tracking-tight mb-6">About PitchAnalytics</h1>
      
      <div className="prose prose-invert max-w-none">
        <p className="text-lg text-text-muted mb-8">
          PitchAnalytics is a professional, no-nonsense football analytics platform built for Version 1.0. 
          Our mission is strictly to deliver real, unaltered football fixture data directly from official feeds.
        </p>

        <div className="space-y-8 mt-12">
          <div className="flex gap-4">
            <div className="mt-1 bg-primary/10 p-3 rounded-xl h-fit">
              <Database className="h-6 w-6 text-primary" />
            </div>
            <div>
              <h3 className="text-xl font-semibold mb-2">Real Data Only</h3>
              <p className="text-text-muted">
                We strictly prohibit the use of simulated, mock, or placeholder data. 
                Every fixture, team logo, and score displayed on this platform is fetched from the official API-Football provider.
              </p>
            </div>
          </div>

          <div className="flex gap-4">
            <div className="mt-1 bg-primary/10 p-3 rounded-xl h-fit">
              <Shield className="h-6 w-6 text-primary" />
            </div>
            <div>
              <h3 className="text-xl font-semibold mb-2">Architectural Integrity</h3>
              <p className="text-text-muted">
                This platform is built with a focus on core functionality. We have deliberately omitted features such as user authentication, premium tiers, or predictive algorithms to ensure the foundational data display is perfectly robust.
              </p>
            </div>
          </div>

          <div className="flex gap-4">
            <div className="mt-1 bg-primary/10 p-3 rounded-xl h-fit">
              <Activity className="h-6 w-6 text-primary" />
            </div>
            <div>
              <h3 className="text-xl font-semibold mb-2">API Requirements</h3>
              <p className="text-text-muted">
                To run this platform, a valid <code>VITE_API_FOOTBALL_KEY</code> must be provided in the environment configuration. Without it, the service intentionally halts rather than providing false information.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
