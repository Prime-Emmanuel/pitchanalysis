// src/services/PredictionEngine.ts

import { Fixture } from "../types";
import { FootballApiService } from "./FootballApiService";

// ============================================================
// PUBLIC INTERFACES – Exposed to the rest of the application
// ============================================================

/**
 * The complete prediction result returned by the engine.
 * All fields are explicitly typed; no "any" is used.
 */
export interface PredictionResult {
  /** The fixture this prediction applies to */
  fixtureId: number;

  // ---- Winner & Draw Probabilities ----
  winnerPrediction: "home" | "away" | "draw";
  homeWinProbability: number; // 0–1
  awayWinProbability: number; // 0–1
  drawProbability: number; // 0–1

  // ---- Goals ----
  expectedGoals: {
    home: number;
    away: number;
    total: number;
  };
  /** Probability of over 1.5 total goals (0–1) */
  over15Probability: number;
  /** Probability of over 2.5 total goals (0–1) */
  over25Probability: number;
  /** Probability of over 3.5 total goals (0–1) */
  over35Probability: number;
  /** Probability of under 2.5 total goals (0–1) */
  under25Probability: number;
  firstHalfGoals: {
    home: number;
    away: number;
    total: number;
  };
  secondHalfGoals: {
    home: number;
    away: number;
    total: number;
  };

  // ---- Both Teams to Score ----
  bothTeamsToScore: boolean;
  bothTeamsToScoreProbability: number; // 0–1

  // ---- Set Pieces ----
  expectedCorners: {
    home: number;
    away: number;
    total: number;
  };
  expectedYellowCards: {
    home: number;
    away: number;
    total: number;
  };
  expectedRedCards: {
    home: number;
    away: number;
    total: number;
  };

  // ---- Confidence & Risk ----
  /** Overall confidence in the prediction (0–1) */
  confidenceScore: number;
  riskLevel: "low" | "medium" | "high";

  // ---- Human-readable insight ----
  insight: string;

  /** ISO timestamp when the analysis was performed */
  analysisTimestamp: string;
}

// ============================================================
// SUPPORTING INTERFACES – Used internally by the engine
// ============================================================

/** Represents a team's recent form (last N matches) */
export interface TeamForm {
  teamId: number;
  teamName: string;
  matches: Fixture[];
  /** Points per game (e.g., 2.1) */
  ppg: number;
  /** Goals scored per game */
  goalsScoredPerGame: number;
  /** Goals conceded per game */
  goalsConcededPerGame: number;
  /** Win rate (0–1) */
  winRate: number;
  /** Loss rate (0–1) */
  lossRate: number;
  /** Draw rate (0–1) */
  drawRate: number;
  /** Number of matches used in this form calculation */
  sampleSize: number;
}

/** Historical head-to-head data between two teams */
export interface HeadToHeadData {
  totalMatches: number;
  homeWins: number;
  awayWins: number;
  draws: number;
  /** Goals scored by the home team across all H2H matches */
  homeGoals: number;
  /** Goals scored by the away team across all H2H matches */
  awayGoals: number;
  /** Average total goals per H2H match */
  avgTotalGoals: number;
  /** Percentage of H2H matches where both teams scored */
  bothTeamsScoredRate: number;
  /** Most recent H2H fixtures (up to 5) */
  recentFixtures: Fixture[];
}

/** Aggregated goal statistics for a team */
export interface GoalStatistics {
  teamId: number;
  /** Average goals scored per match (home/away split) */
  homeGoalsScoredAvg: number;
  awayGoalsScoredAvg: number;
  /** Average goals conceded per match (home/away split) */
  homeGoalsConcededAvg: number;
  awayGoalsConcededAvg: number;
  /** Total goals scored in last N matches */
  totalGoalsScored: number;
  /** Total goals conceded in last N matches */
  totalGoalsConceded: number;
  /** Number of matches in the sample */
  sampleSize: number;
}

/** Aggregated corner statistics for a team */
export interface CornerStatistics {
  teamId: number;
  /** Average corners taken per match (home/away split) */
  homeCornersForAvg: number;
  awayCornersForAvg: number;
  /** Average corners conceded per match (home/away split) */
  homeCornersAgainstAvg: number;
  awayCornersAgainstAvg: number;
  sampleSize: number;
}

/** Aggregated card statistics for a team */
export interface CardStatistics {
  teamId: number;
  /** Average yellow cards per match (home/away split) */
  homeYellowAvg: number;
  awayYellowAvg: number;
  /** Average red cards per match (home/away split) */
  homeRedAvg: number;
  awayRedAvg: number;
  sampleSize: number;
}

/** Contextual information about the match (venue, competition, etc.) */
export interface MatchContext {
  fixtureId: number;
  homeTeamId: number;
  awayTeamId: number;
  leagueId: number;
  /** "home" or "away" or "neutral" */
  venue: "home" | "away" | "neutral";
  /** Day of week (0 = Sunday, 6 = Saturday) */
  dayOfWeek: number;
  /** Is this a derby or rivalry match? */
  isDerby: boolean;
  /** Days since each team's last match */
  daysSinceLastMatch: {
    home: number;
    away: number;
  };
}

/** Attacking strength metrics for a team */
export interface AttackStrength {
  teamId: number;
  /** Expected goals (xG) per match */
  xGPerMatch: number;
  /** Shots per match */
  shotsPerMatch: number;
  /** Shots on target per match */
  shotsOnTargetPerMatch: number;
  /** Conversion rate (goals / shots) */
  conversionRate: number;
  /** Goals scored per match (actual) */
  goalsPerMatch: number;
  sampleSize: number;
}

/** Defensive strength metrics for a team */
export interface DefenseStrength {
  teamId: number;
  /** Expected goals against (xGA) per match */
  xGAPerMatch: number;
  /** Shots conceded per match */
  shotsConcededPerMatch: number;
  /** Shots on target conceded per match */
  shotsOnTargetConcededPerMatch: number;
  /** Clean sheet rate (0–1) */
  cleanSheetRate: number;
  /** Goals conceded per match (actual) */
  goalsConcededPerMatch: number;
  sampleSize: number;
}

// ============================================================
// PREDICTION ENGINE – Main Class
// ============================================================

/**
 * PredictionEngine
 *
 * Responsible for analyzing a football fixture and producing a structured
 * prediction result. The engine is designed to be modular: each analysis
 * step is encapsulated in its own private method, making it easy to
 * replace or enhance individual algorithms over time.
 *
 * The current implementation provides the architectural skeleton.
 * All calculation methods throw "Not implemented" and are ready for
 * future algorithm integration.
 */
export class PredictionEngine {
  // ------------------------------------------------------------------
  // PUBLIC API
  // ------------------------------------------------------------------

  /**
   * The single public entry point for the engine.
   * Given a fixture ID, it loads all necessary data, runs the analysis
   * pipeline, and returns a complete PredictionResult.
   */
  public static async analyzeMatch(fixtureId: number): Promise<PredictionResult> {
    const engine = new PredictionEngine(fixtureId);

    // 1. Load core fixture data
    await engine.loadFixture();

    // 2. Load supporting data
    await engine.loadRecentMatches();
    await engine.loadHeadToHead();
    await engine.loadTeamStatistics();

    // 3. Build contextual information
    await engine.buildMatchContext();

    // 4. Calculate team strengths
    await engine.calculateAttackStrength();
    await engine.calculateDefenseStrength();

    // 5. Generate predictions
    await engine.calculateExpectedGoals();
    await engine.calculateWinnerProbability();
    await engine.calculateCornerPrediction();
    await engine.calculateCardPrediction();

    // 6. Confidence & insight
    await engine.calculateConfidence();
    await engine.generateInsight();

    // 7. Assemble and return the final result
    return engine.buildPrediction();
  }

  // ------------------------------------------------------------------
  // PRIVATE STATE
  // ------------------------------------------------------------------

  private readonly fixtureId: number;
  private fixture: Fixture | null = null;
  private homeTeamForm: TeamForm | null = null;
  private awayTeamForm: TeamForm | null = null;
  private headToHead: HeadToHeadData | null = null;
  private homeGoalStats: GoalStatistics | null = null;
  private awayGoalStats: GoalStatistics | null = null;
  private homeCornerStats: CornerStatistics | null = null;
  private awayCornerStats: CornerStatistics | null = null;
  private homeCardStats: CardStatistics | null = null;
  private awayCardStats: CardStatistics | null = null;
  private matchContext: MatchContext | null = null;
  private homeAttack: AttackStrength | null = null;
  private awayAttack: AttackStrength | null = null;
  private homeDefense: DefenseStrength | null = null;
  private awayDefense: DefenseStrength | null = null;

  // ---- Prediction state (accumulated during analysis) ----
  private winnerPrediction: "home" | "away" | "draw" = "draw";
  private homeWinProb = 0.333;
  private awayWinProb = 0.333;
  private drawProb = 0.334;
  private expectedGoalsHome = 0;
  private expectedGoalsAway = 0;
  private over15Prob = 0;
  private over25Prob = 0;
  private over35Prob = 0;
  private under25Prob = 0;
  private firstHalfGoalsHome = 0;
  private firstHalfGoalsAway = 0;
  private secondHalfGoalsHome = 0;
  private secondHalfGoalsAway = 0;
  private btts = false;
  private bttsProb = 0;
  private expectedCornersHome = 0;
  private expectedCornersAway = 0;
  private expectedYellowHome = 0;
  private expectedYellowAway = 0;
  private expectedRedHome = 0;
  private expectedRedAway = 0;
  private confidence = 0;
  private riskLevel: "low" | "medium" | "high" = "medium";
  private insight = "";

  private constructor(fixtureId: number) {
    this.fixtureId = fixtureId;
  }

  // ------------------------------------------------------------------
  // DATA LOADING METHODS
  // ------------------------------------------------------------------

  /**
   * Loads the core fixture data using the existing FootballApiService.
   */
  private async loadFixture(): Promise<void> {
    // FUTURE: Extend to fetch additional fixture metadata
    this.fixture = await FootballApiService.getMatchDetails(
      String(this.fixtureId)
    );
  }

  /**
   * Loads recent match data for both teams.
   * In the future, this will fetch the last N matches from the API.
   */
  private async loadRecentMatches(): Promise<void> {
    // FUTURE: Fetch recent matches for home and away teams from the API
    // For now, we leave the form objects as null.
    // throw new Error("Not implemented");
  }

  /**
   * Loads head-to-head data between the two teams.
   */
  private async loadHeadToHead(): Promise<void> {
    // FUTURE: Fetch H2H data from the API
    // throw new Error("Not implemented");
  }

  /**
   * Loads detailed team statistics (goals, corners, cards).
   */
  private async loadTeamStatistics(): Promise<void> {
    // FUTURE: Fetch team-level statistics from the API
    // throw new Error("Not implemented");
  }

  // ------------------------------------------------------------------
  // CONTEXT BUILDING
  // ------------------------------------------------------------------

  /**
   * Builds the MatchContext object using the loaded fixture data.
   */
  private async buildMatchContext(): Promise<void> {
    if (!this.fixture) {
      throw new Error("Fixture not loaded");
    }

    const matchDate = new Date(this.fixture.date);

    this.matchContext = {
      fixtureId: this.fixture.id,
      homeTeamId: this.fixture.teams.home.id,
      awayTeamId: this.fixture.teams.away.id,
      leagueId: this.fixture.league.id,
      venue: "home", // FUTURE: Determine from fixture data
      dayOfWeek: matchDate.getDay(),
      isDerby: false, // FUTURE: Check if teams are local rivals
      daysSinceLastMatch: {
        home: 7, // FUTURE: Calculate from actual data
        away: 7,
      },
    };
  }

  // ------------------------------------------------------------------
  // STRENGTH CALCULATION METHODS
  // ------------------------------------------------------------------

  /**
   * Calculates attacking strength metrics for both teams.
   */
  private async calculateAttackStrength(): Promise<void> {
    // FUTURE: Implement using goal statistics and xG data
    // throw new Error("Not implemented");
  }

  /**
   * Calculates defensive strength metrics for both teams.
   */
  private async calculateDefenseStrength(): Promise<void> {
    // FUTURE: Implement using goal statistics and xGA data
    // throw new Error("Not implemented");
  }

  // ------------------------------------------------------------------
  // PREDICTION METHODS – The core algorithms will live here
  // ------------------------------------------------------------------

  /**
   * Calculates expected goals for home and away teams.
   */
  private async calculateExpectedGoals(): Promise<void> {
    // FUTURE: Use Poisson distribution based on attack/defense strengths
    // throw new Error("Not implemented");
  }

  /**
   * Calculates win/draw probabilities.
   */
  private async calculateWinnerProbability(): Promise<void> {
    // FUTURE: Use expected goals to derive match outcome probabilities
    // throw new Error("Not implemented");
  }

  /**
   * Calculates expected corner counts.
   */
  private async calculateCornerPrediction(): Promise<void> {
    // FUTURE: Use corner statistics and team styles
    // throw new Error("Not implemented");
  }

  /**
   * Calculates expected card counts.
   */
  private async calculateCardPrediction(): Promise<void> {
    // FUTURE: Use card statistics and referee tendencies
    // throw new Error("Not implemented");
  }

  // ------------------------------------------------------------------
  // CONFIDENCE & INSIGHT
  // ------------------------------------------------------------------

  /**
   * Calculates an overall confidence score and risk level for the prediction.
   */
  private async calculateConfidence(): Promise<void> {
    // FUTURE: Combine multiple factors (data completeness, form stability, etc.)
    // throw new Error("Not implemented");
  }

  /**
   * Generates a human-readable insight summary.
   */
  private async generateInsight(): Promise<void> {
    // FUTURE: Use prediction data to craft a natural-language summary
    // throw new Error("Not implemented");
  }

  // ------------------------------------------------------------------
  // RESULT ASSEMBLY
  // ------------------------------------------------------------------

  /**
   * Builds the final PredictionResult object from all computed values.
   * This is the single place where the result is constructed.
   */
  private buildPrediction(): PredictionResult {
    return {
      fixtureId: this.fixtureId,

      winnerPrediction: this.winnerPrediction,
      homeWinProbability: this.homeWinProb,
      awayWinProbability: this.awayWinProb,
      drawProbability: this.drawProb,

      expectedGoals: {
        home: this.expectedGoalsHome,
        away: this.expectedGoalsAway,
        total: this.expectedGoalsHome + this.expectedGoalsAway,
      },
      over15Probability: this.over15Prob,
      over25Probability: this.over25Prob,
      over35Probability: this.over35Prob,
      under25Probability: this.under25Prob,

      firstHalfGoals: {
        home: this.firstHalfGoalsHome,
        away: this.firstHalfGoalsAway,
        total: this.firstHalfGoalsHome + this.firstHalfGoalsAway,
      },
      secondHalfGoals: {
        home: this.secondHalfGoalsHome,
        away: this.secondHalfGoalsAway,
        total: this.secondHalfGoalsHome + this.secondHalfGoalsAway,
      },

      bothTeamsToScore: this.btts,
      bothTeamsToScoreProbability: this.bttsProb,

      expectedCorners: {
        home: this.expectedCornersHome,
        away: this.expectedCornersAway,
        total: this.expectedCornersHome + this.expectedCornersAway,
      },
      expectedYellowCards: {
        home: this.expectedYellowHome,
        away: this.expectedYellowAway,
        total: this.expectedYellowHome + this.expectedYellowAway,
      },
      expectedRedCards: {
        home: this.expectedRedHome,
        away: this.expectedRedAway,
        total: this.expectedRedHome + this.expectedRedAway,
      },

      confidenceScore: this.confidence,
      riskLevel: this.riskLevel,

      insight: this.insight,

      analysisTimestamp: new Date().toISOString(),
    };
  }
}
