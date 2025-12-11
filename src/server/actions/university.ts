"use server";

import { searchUniversities } from "@/server/db/university";

export async function searchUniversitiesAction(query: string) {
  return searchUniversities(query);
}

