import { useEffect, useState } from "react";
import { FootballApiService, ApiStatusResponse } from "../services/FootballApiService";
import { CheckCircle, XCircle, Loader2, Activity } from "lucide-react";

export function ApiTest() {
  const [status, setStatus] = useState<ApiStatusResponse["response"] | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function testApi() {
      try {
        setLoading(true);
        const data = await FootballApiService.testConnection();
        setStatus(data);
        setError(null);
      } catch (err: any) {
        setError(err.message || "Failed to test API connection");
      } finally {
        setLoading(false);
      }
    }

    testApi();
  }, []);

  return (
    <div className="container mx-auto px-4 py-12 max-w-2xl">
      <h1 className="text-3xl font-bold tracking-tight mb-8 flex items-center gap-3">
        <Activity className="h-8 w-8 text-primary" />
        API Connection Test
      </h1>

      <div className="bg-surface border border-surface-hover rounded-2xl p-8 shadow-sm">
        {loading ? (
          <div className="flex flex-col items-center justify-center py-8">
            <Loader2 className="h-8 w-8 animate-spin text-primary mb-4" />
            <p className="text-text-muted">Testing API connection...</p>
          </div>
        ) : error ? (
          <div className="flex flex-col items-center justify-center py-4 text-center">
            <XCircle className="h-12 w-12 text-red-500 mb-4" />
            <h3 className="text-xl font-bold text-red-500 mb-2">Connection Failed</h3>
            <p className="text-text-muted mb-6">{error}</p>
            <div className="text-xs text-text-muted bg-background/50 p-4 rounded-lg text-left font-mono w-full">
              Check your .env file and ensure you have:<br />
              VITE_API_FOOTBALL_KEY="your_api_key_here"
            </div>
          </div>
        ) : status ? (
          <div className="flex flex-col items-center justify-center py-4 text-center">
            <CheckCircle className="h-12 w-12 text-green-500 mb-4" />
            <h3 className="text-xl font-bold text-green-500 mb-2">Connection Successful</h3>
            <p className="text-text-muted mb-8">Successfully authenticated with API-Football.</p>

            <div className="w-full text-left space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-background/50 rounded-xl p-4 border border-surface-hover">
                  <span className="text-xs text-text-muted uppercase font-bold tracking-wider mb-1 block">Account</span>
                  <div className="font-medium">{status.account.firstname} {status.account.lastname}</div>
                  <div className="text-sm text-text-muted">{status.account.email}</div>
                </div>

                <div className="bg-background/50 rounded-xl p-4 border border-surface-hover">
                  <span className="text-xs text-text-muted uppercase font-bold tracking-wider mb-1 block">Subscription</span>
                  <div className="font-medium">{status.subscription.plan}</div>
                  <div className="text-sm flex items-center gap-2">
                    <span className={status.subscription.active ? "text-green-500" : "text-red-500"}>
                      {status.subscription.active ? "Active" : "Inactive"}
                    </span>
                    <span className="text-text-muted">until {status.subscription.end}</span>
                  </div>
                </div>

                <div className="bg-background/50 rounded-xl p-4 border border-surface-hover md:col-span-2">
                  <span className="text-xs text-text-muted uppercase font-bold tracking-wider mb-1 block">Requests</span>
                  <div className="flex items-end justify-between mb-2">
                    <span className="font-medium text-lg">{status.requests.current} <span className="text-sm text-text-muted font-normal">/ {status.requests.limit_day}</span></span>
                  </div>
                  <div className="w-full bg-surface-hover rounded-full h-2">
                    <div 
                      className="bg-primary h-2 rounded-full transition-all" 
                      style={{ width: `${Math.min((status.requests.current / status.requests.limit_day) * 100, 100)}%` }}
                    />
                  </div>
                </div>
              </div>
              
              <div className="text-xs text-center text-text-muted mt-8">
                Raw JSON payload logged to browser console.
              </div>
            </div>
          </div>
        ) : null}
      </div>
    </div>
  );
}
