import { Fixture } from "../types";

const BASE_URL = "https://v3.football.api-sports.io";

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

export class FootballApiService {
  private static get apiKey(): string {
    const key = import.meta.env.VITE_API_FOOTBALL_KEY;
    if (!key) {
      throw new Error("Missing VITE_API_FOOTBALL_KEY");
    }
    return key;
  }

  // -------------------------
  // CORE REQUEST
  // -------------------------
  private static async request(endpoint: string) {
    const res = await fetch(`${BASE_URL}${endpoint}`, {
      headers: {
        "x-apisports-key": this.apiKey,
      },
    });

    if (!res.ok) {
      throw new Error(`API error: ${res.status}`);
    }

    const data = await res.json();

    console.log("API RESPONSE:", endpoint, data);

    if (data.errors && Object.keys(data.errors).length > 0) {
      throw new Error("API returned error");
    }

    return data;
  }

  // -------------------------
  // STATUS
  // -------------------------
  static async testConnection(): Promise<ApiStatusResponse["response"]> {
    const data = await this.request("/status");
    return data.response;
  }

  // -------------------------
  // TODAY MATCHES
  // -------------------------
  static async getTodaysMatches(): Promise<Fixture[]> {
    const today = new Date().toISOString().split("T")[0];

    const data = await this.request(`/fixtures?date=${today}`);

    return (data.response || []).map((item: any) => ({
      id: item.fixture?.id,
      date: item.fixture?.date,

      status: {
        short: item.fixture?.status?.short,
        long: item.fixture?.status?.long,
      },

      league: {
        name: item.league?.name,
        logo: item.league?.logo,
      },

      teams: {
        home: {
          name: item.teams?.home?.name,
          logo: item.teams?.home?.logo,
        },
        away: {
          name: item.teams?.away?.name,
          logo: item.teams?.away?.logo,
        },
      },

      goals: {
        home: item.goals?.home,
        away: item.goals?.away,
      },
    }));
  }

  // -------------------------
  // MATCH DETAILS
  // -------------------------
  static async getMatchDetails(id: string): Promise<Fixture> {
    const data = await this.request(`/fixtures?id=${id}`);

    const item = data.response?.[0];

    if (!item) {
      throw new Error("Match not found");
    }

    return {
      id: item.fixture?.id,
      date: item.fixture?.date,

      status: {
        short: item.fixture?.status?.short,
        long: item.fixture?.status?.long,
      },

      league: {
        name: item.league?.name,
        logo: item.league?.logo,
      },

      teams: {
        home: {
          name: item.teams?.home?.name,
          logo: item.teams?.home?.logo,
        },
        away: {
          name: item.teams?.away?.name,
          logo: item.teams?.away?.logo,
        },
      },

      goals: {
        home: item.goals?.home,
        away: item.goals?.away,
      },
    };
  }
}
