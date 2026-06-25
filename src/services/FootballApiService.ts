import { Fixture } from "../types";

export interface ApiStatusResponse {
  get: string;
  parameters: any;
  errors: any;
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

const BASE_URL = "https://v3.football.api-sports.io";

export class FootballApiService {
  private static get apiKey(): string {
    const key = import.meta.env.VITE_API_FOOTBALL_KEY;
    if (!key) {
      throw new Error("Missing VITE_API_FOOTBALL_KEY in environment variables");
    }
    return key;
  }

  // CORE FETCH
  private static async request(endpoint: string) {
    const res = await fetch(`${BASE_URL}${endpoint}`, {
      method: "GET",
      headers: {
        "x-rapidapi-host": "v3.football.api-sports.io",
        "x-apisports-key": this.apiKey,
      },
    });

    if (res.status === 429) {
      throw new Error("Rate limit exceeded (API-Football)");
    }

    if (!res.ok) {
      throw new Error(`API error: ${res.status}`);
    }

    const data = await res.json();

    console.log("API RESPONSE:", endpoint, data);

    if (data.errors && Object.keys(data.errors).length > 0) {
      throw new Error("API returned an error");
    }

    return data.response;
  }

  // STATUS CHECK
  static async testConnection(): Promise<ApiStatusResponse["response"]> {
    return this.request("/status");
  }

  // TODAY MATCHES
  static async getTodaysMatches(): Promise<Fixture[]> {
    const today = new Date().toISOString().split("T")[0];

    const data = await this.request(`/fixtures?date=${today}`);

    return data.map((item: any) => ({
      id: item.fixture.id,
      date: item.fixture.date,
      status: item.fixture.status?.long,
      homeTeam: item.teams.home.name,
      awayTeam: item.teams.away.name,
      score: item.goals,
    }));
  }

  // MATCH DETAILS
  static async getMatchDetails(id: string): Promise<Fixture> {
    const data = await this.request(`/fixtures?id=${id}`);

    if (!data || data.length === 0) {
      throw new Error("Match not found");
    }

    const item = data[0];

    return {
      id: item.fixture.id,
      date: item.fixture.date,
      status: item.fixture.status?.long,
      homeTeam: item.teams.home.name,
      awayTeam: item.teams.away.name,
      score: item.goals,
    };
  }
}
