"use server";

import { searchUniversities, listUniversities } from "@/server/db/university";

export async function searchUniversitiesAction(query: string) {
  return searchUniversities(query);
}

export async function getUniversitiesAction() {
  return listUniversities();
}

