
// Re-export Prisma types to ensure consistency across the app
export type {
  University,
  Faculty,
  Department,
  Course,
  Post,
  Resource,
} from "@prisma/client";

// Custom types not in Prisma schema
export type PostType = "REVIEW" | "EXAM_LOG" | "QUESTION";
export type ResourceType = "NOTE" | "PAST_EXAM";
