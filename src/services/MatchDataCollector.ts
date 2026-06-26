// src/services/MatchDataCollector.ts

import { FootballApiService } from "./FootballApiService";
import { Fixture, Team, League } from "../types";

// ============================================================
// PUBLIC INTERFACES – Exposed to the PredictionEngine
// ============================================================

/** Complete data set required for match analysis */
export interface MatchAnalysisData {
  fixture: Fixture;
  homeTeam: Team;
  awayTeam: Team;
  league: League;
  venue: Venue;
  kickoffTime: string; // ISO date string
  recentHomeMatches: Fixture[];
  recentAwayMatches: Fixture[];
  headToHead: HeadToHead;
  leagueStandings: LeagueStanding[];
  teamStatistics: TeamStatistics[];
  injuries: Injury[];
  form: Form;
  metadata: Metadata;
}

// ---- Supporting Data Structures ----

export interface Venue {
  id?: number;
  name: string;
  city: string;
  capacity?: number;
}

export interface HeadToHead {
  totalMatches: number;
  homeWins: number;
  awayWins: number;
  draws: number;
  homeGoals: number;
  awayGoals: number;
  recentMatches: Fixture[]; // last 5–10 H2H fixtures
}

export interface LeagueStanding {
  position: number;
  teamId: number;
  teamName: string;
  played: number;
  wins: number;
  draws: number;
  losses: number;
  goalsFor: number;
  goalsAgainst: number;
  points: number;
  /** Recent form as string of W/D/L, e.g. "WWDLW" */
  form?: string;
}

export interface TeamStatistics {
  teamId: number;
  /** Matches played in current season */
  played: number;
  goalsScored: number;
  goalsConceded: number;
  cleanSheets: number;
  /** Average possession percentage */
  possessionAvg: number;
  /** Shots per game */
  shotsPerGame: number;
  /** Shots on target per game */
  shotsOnTargetPerGame: number;
  /** Corners per game */
  cornersPerGame: number;
  /** Yellow cards per game */
  yellowCardsPerGame: number;
  /** Red cards per game */
  redCardsPerGame: number;
}

export interface Injury {
  playerName: string;
  /** Type of injury or reason */
  reason: string;
  /** Status: "doubtful", "out", "suspended" */
  status: "doubtful" | "out" | "suspended";
  /** Expected return date, if known */
  expectedReturn?: string;
}

export interface Form {
  /** Last 5 results (home matches only) */
  home: string[];
  /** Last 5 results (away matches only) */
  away: string[];
  /** Last 5 results overall */
  overall: string[];
}

export interface Metadata {
  dataSource: string;
  lastUpdated: string; // ISO date string
  /** Any additional notes about data completeness */
  notes?: string;
}

// ============================================================
// DATA COLLECTOR SERVICE
// ============================================================

/**
 * MatchDataCollector
 *
 * Sole responsibility: gather all relevant data for a given fixture.
 * No prediction logic – only data aggregation.
 * Designed to be the single source of truth for the PredictionEngine.
 *
 * Currently, only loadFixture() is implemented using FootballApiService.
 * All other data loads are stubbed with TODO comments for future implementation.
 */
export class MatchDataCollector {
  /**
   * Public entry point: collect all data for a fixture.
   */
  public static async collect(fixtureId: number): Promise<MatchAnalysisData> {
    const collector = new MatchDataCollector(fixtureId);
    await collector.loadFixture();
    await collector.loadRecentMatches();
    await collector.loadHeadToHead();
    await collector.loadStandings();
    await collector.loadTeamStatistics();
    await collector.loadVenue();
    await collector.loadInjuries();
    await collector.loadMetadata();
    return collector.buildData();
  }

  // ------------------------------------------------------------------
  // PRIVATE STATE
  // ------------------------------------------------------------------

  private readonly fixtureId: number;
  private data: Partial<MatchAnalysisData> = {};

  private constructor(fixtureId: number) {
    this.fixtureId = fixtureId;
  }

  // ------------------------------------------------------------------
  // DATA LOADING METHODS
  // ------------------------------------------------------------------

  /**
   * Loads the core fixture data using the existing FootballApiService.
   * This is the only method that makes an actual API call for now.
   */
  private async loadFixture(): Promise<void> {
    const fixture = await FootballApiService.getMatchDetails(
      String(this.fixtureId)
    );
    this.data.fixture = fixture;
    this.data.homeTeam = fixture.teams.home;
    this.data.awayTeam = fixture.teams.away;
    this.data.league = fixture.league;
    this.data.kickoffTime = fixture.date;
  }

  /**
   * Loads recent matches for both teams.
   * FUTURE: Fetch from a dedicated endpoint that returns historical results.
   */
  private async loadRecentMatches(): Promise<void> {
    // TODO: Implement - fetch last N matches for home and away teams
    // e.g., from FootballApiService.getTeamFixtures(teamId, limit)
    this.data.recentHomeMatches = [];
    this.data.recentAwayMatches = [];
  }

  /**
   * Loads head-to-head data between the two teams.
   * FUTURE: Fetch from a dedicated H2H endpoint.
   */
  private async loadHeadToHead(): Promise<void> {
    // TODO: Implement - fetch H2H history
    this.data.headToHead = {
      totalMatches: 0,
      homeWins: 0,
      awayWins: 0,
      draws: 0,
      homeGoals: 0,
      awayGoals: 0,
      recentMatches: [],
    };
  }

  /**
   * Loads current league standings for both teams.
   * FUTURE: Fetch standings for the specific league.
   */
  private async loadStandings(): Promise<void> {
    // TODO: Implement - fetch league standings
    this.data.leagueStandings = [];
  }

  /**
   * Loads detailed team statistics (goals, corners, cards, etc.).
   * FUTURE: Fetch season aggregates per team.
   */
  private async loadTeamStatistics(): Promise<void> {
    // TODO: Implement - fetch team statistics
    this.data.teamStatistics = [];
  }

  /**
   * Loads venue information (stadium name, city, capacity).
   * FUTURE: Extract from fixture or a venue endpoint.
   */
  private async loadVenue(): Promise<void> {
    // TODO: Implement - fetch venue details
    this.data.venue = {
      name: "Unknown Stadium",
      city: "Unknown City",
    };
  }

  /**
   * Loads injury and suspension information for both teams.
   * FUTURE: Fetch from a dedicated injury endpoint.
   */
  private async loadInjuries(): Promise<void> {
    // TODO: Implement - fetch injuries/suspensions
    this.data.injuries = [];
  }

  /**
   * Loads metadata about the data (source, last updated, etc.).
   */
  private async loadMetadata(): Promise<void> {
    this.data.metadata = {
      dataSource: "FootballApiService (mock)",
      lastUpdated: new Date().toISOString(),
      notes: "Not all data is fully implemented yet.",
    };
  }

  // ------------------------------------------------------------------
  // RESULT ASSEMBLY
  // ------------------------------------------------------------------

  /**
   * Assembles the final MatchAnalysisData object.
   * Throws if required fields are missing.
   */
  private buildData(): MatchAnalysisData {
    const {
      fixture,
      homeTeam,
      awayTeam,
      league,
      venue,
      kickoffTime,
      recentHomeMatches,
      recentAwayMatches,
      headToHead,
      leagueStandings,
      teamStatistics,
      injuries,
      form,
      metadata,
    } = this.data;

    if (!fixture || !homeTeam || !awayTeam || !league) {
      throw new Error(
        `Incomplete data for fixture ${this.fixtureId}: missing fixture or teams.`
      );
    }

    return {
      fixture,
      homeTeam,
      awayTeam,
      league,
      venue: venue!,
      kickoffTime: kickoffTime!,
      recentHomeMatches: recentHomeMatches || [],
      recentAwayMatches: recentAwayMatches || [],
      headToHead: headToHead!,
      leagueStandings: leagueStandings || [],
      teamStatistics: teamStatistics || [],
      injuries: injuries || [],
      form: form || { home: [], away: [], overall: [] },
      metadata: metadata!,
    };
  }
}
