export type Question = {
  Points: number;
  Question: string;
  Category: string;
  Answer: string;
  Disabled?: boolean;
  DailyDouble?: boolean;
};

export type Team = {
  id: string;
  name: string;
  score: number;
};

export type CellPoints = {
  rowId: string;
  cellIndex: number;
  points: number;
  teamId: string;
};
