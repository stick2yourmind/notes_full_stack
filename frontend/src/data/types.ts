export interface Note {
  title: string;
  description: string;
  updatedAt: string;
  archived: boolean;
  id: number;
  categories: number[]
}

export interface NoteResponse {
  title: string;
  description: string;
  updatedAt: string;
  archived: boolean;
  id: number;
  categories?: Category[]
}

export interface Category {
  title: string;
  updatedAt: string;
  archived: boolean;
  id: number;
}
