export interface Movie {
  id: string;
  name: string;
  runtimeInMinutes: number;
  budgetInMillions: number;
  boxOfficeRevenueInMillions: number;
  academyAwardNominations: number;
  academyAwardWins: number;
  rottenTomatoesScore: number;
}

export interface Character {
  name?: string;
  wikiUrl: string;
  race: string;
  birth?: string | number | null;
  gender?: string;
  death?: string | number;
  hair?: string;
  height?: string;
  realm?: string;
  spouse?: string;
}

export interface Quote {
  dialog: string;
  movie: Movie;
  character: Character;
}
