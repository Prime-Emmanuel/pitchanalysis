import { Fixture } from "../types";

export interface ApiStatusResponse {
  get: string;
  parameters: any[];
  errors: any[];
  results: number;
  paging: { current: number; total: number };
  response: {
    account: {
      firstname: string;
      lastname: string;
      email: string;
    };
    subscription: {
      plan: string;
      end: string;
      active: boolean;
    };
    requests: {
      current: number;
      limit_day: number;
    };
  };
}

export class FootballApiService {
  private static get apiKey(): string {
    const key = import.meta.env.VITE_API_FOOTBALL_KEY;
    if (!key) {
      throw new Error("Missing API-Football Key. Please set VITE_API_FOOTBALL_KEY in your environment to view real fixtures.");
    }
    return key;
  }

  private static readonly baseUrl = "https://v3.football.api-sports.io";

  private static async fetchFromApi<T>(endpoint: string): Promise<T> {
    try {
      const response = await fetch(`${this.baseUrl}${endpoint}`, {
        method: "GET",
        headers: {
          "x-rapidapi-host": "v3.football.api-sports.io",
          "x-rapidapi-key": this.apiKey,
        },
      });

      if (response.status === 429) {
        throw new Error("Rate limit exceeded. Please try again later.");
      }

      if (!response.ok) {
        throw new Error(`Network error: API request failed with status ${response.status}`);
      }

      const data = await response.json();
      
      // Log the raw JSON response to the console as requested
      console.log(`Raw API Response for ${endpoint}:`, data);

      if (data.errors && Object.keys(data.errors).length > 0) {
        const errorMsg = Array.isArray(data.errors) ? data.errors[0] : Object.values(data.errors)[0];
        throw new Error(`API Error: ${errorMsg}`);
      }

      return data.response as T;
    } catch (error) {
      console.error(`Error fetching ${endpoint}:`, error);
      throw error;
    }
  }

  public static async testConnection(): Promise<ApiStatusResponse["response"]> {
    return this.fetchFromApi<ApiStatusResponse["response"]>("/status");
  }

  public static async getTodaysMatches(): Promise<Fixture[]> {
    const today = new Date().toISOString().split("T")[0];
    return this.fetchFromApi<Fixture[]>(`/fixtures?date=${today}`);
  }

  public static async getMatchDetails(fixtureId: string): Promise<Fixture> {
    const fixtures = await this.fetchFromApi<Fixture[]>(`/fixtures?id=${fixtureId}`);
    if (!fixtures || fixtures.length === 0) {
      throw new Error("Match not found");
    }
    return fixtures[0];
  }
}
