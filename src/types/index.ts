export interface University {
  id: string;
  name: string;
  domain?: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface Faculty {
  id: string;
  name: string;
  universityId: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface Department {
  id: string;
  name: string;
  facultyId: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface Course {
  id: string;
  name: string;
  professor?: string;
  rakutanScore?: number;
  departmentId: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export type PostType = "REVIEW" | "EXAM_LOG" | "QUESTION";

export interface Post {
  id: string;
  content: string;
  type: PostType;
  courseId: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export type ResourceType = "NOTE" | "PAST_EXAM";

export interface Resource {
  id: string;
  title: string;
  url: string;
  type: ResourceType;
  courseId: string;
  createdAt?: Date;
  updatedAt?: Date;
}

