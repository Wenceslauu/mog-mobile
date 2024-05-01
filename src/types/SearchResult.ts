export interface SearchResult {
  type: "profile" | "routine" | "exercise";
  name: string;
  image?: string;
}