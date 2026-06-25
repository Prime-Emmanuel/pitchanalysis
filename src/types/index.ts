export interface Team {
  id: number;
  name: string;
  logo: string;
}

export interface Fixture {
  id: number;
  date: string;
  status: {
    short: string;
    long: string;
  };
  league: {
    id: number;
    name: string;
    country: string;
    logo: string;
  };
  teams: {
    home: Team;
    away: Team;
  };
  goals: {
    home: number | null;
    away: number | null;
  };
}
