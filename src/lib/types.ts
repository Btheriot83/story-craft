export type ActPhase = "beginning" | "middle" | "ending";

export type Citation = {
  title: string;
  url: string;
  note?: string;
};

export type Beat = {
  id: string;
  order: number;
  name: string;
  act_phase: ActPhase;
  purpose: string;
  duration_hint_sec?: [number, number];
  must?: string[];
  avoid?: string[];
  reveal_role?: string;
  citations?: Citation[];
};

export type BeatSheet = {
  id: string;
  genre: string;
  version: string;
  spoken_minutes_target?: { min: number; max: number };
  word_count_guide?: { min: number; max: number; ideal?: number };
  ending_strength_required?: string;
  ending_fail_modes?: string[];
  beats: Beat[];
};

export type GenreRecord = {
  id: string;
  display_name: string;
  slug: string;
  short_definition: string;
  sibling_notes?: string;
  beat_sheet_id: string;
  checklist: string;
  research: string;
  example: string;
  spoken_minutes_target: { min: number; max: number };
  word_count_guide: { min: number; max: number };
  ending_contract: string;
};

export type GenresFile = {
  version: string;
  genres: GenreRecord[];
};
