// Mock data for development
export interface University {
  id: string;
  name: string;
  domain?: string;
}

export interface Faculty {
  id: string;
  name: string;
  universityId: string;
}

export interface Department {
  id: string;
  name: string;
  facultyId: string;
}

export interface Course {
  id: string;
  name: string;
  professor?: string;
  rakutanScore?: number;
  departmentId: string;
}

// Mock Universities
export const mockUniversities: University[] = [
  { id: "1", name: "名古屋大学", domain: "nagoya-u.ac.jp" },
  { id: "2", name: "東京大学", domain: "u-tokyo.ac.jp" },
  { id: "3", name: "京都大学", domain: "kyoto-u.ac.jp" },
  { id: "4", name: "大阪大学", domain: "osaka-u.ac.jp" },
  { id: "5", name: "早稲田大学", domain: "waseda.jp" },
];

// Mock Faculties
export const mockFaculties: Faculty[] = [
  { id: "1", name: "工学部", universityId: "1" },
  { id: "2", name: "情報学部", universityId: "1" },
  { id: "3", name: "理学部", universityId: "1" },
  { id: "4", name: "文学部", universityId: "1" },
  { id: "5", name: "経済学部", universityId: "1" },
];

// Mock Departments
export const mockDepartments: Department[] = [
  { id: "1", name: "情報工学科", facultyId: "2" },
  { id: "2", name: "機械工学科", facultyId: "1" },
  { id: "3", name: "電気電子工学科", facultyId: "1" },
  { id: "4", name: "数学科", facultyId: "3" },
  { id: "5", name: "物理学科", facultyId: "3" },
];

// Mock Courses
export const mockCourses: Course[] = [
  {
    id: "1",
    name: "データ構造とアルゴリズム",
    professor: "山田太郎",
    rakutanScore: 4.5,
    departmentId: "1",
  },
  {
    id: "2",
    name: "オペレーティングシステム",
    professor: "佐藤花子",
    rakutanScore: 3.2,
    departmentId: "1",
  },
  {
    id: "3",
    name: "データベースシステム",
    professor: "鈴木一郎",
    rakutanScore: 4.8,
    departmentId: "1",
  },
  {
    id: "4",
    name: "機械設計基礎",
    professor: "田中次郎",
    rakutanScore: 3.5,
    departmentId: "2",
  },
  {
    id: "5",
    name: "線形代数",
    professor: "高橋三郎",
    rakutanScore: 4.0,
    departmentId: "4",
  },
];

// Helper functions
export function getUniversityById(id: string): University | undefined {
  return mockUniversities.find((u) => u.id === id);
}

export function getFacultiesByUniversityId(universityId: string): Faculty[] {
  return mockFaculties.filter((f) => f.universityId === universityId);
}

export function getDepartmentsByFacultyId(facultyId: string): Department[] {
  return mockDepartments.filter((d) => d.facultyId === facultyId);
}

export function getCoursesByDepartmentId(departmentId: string): Course[] {
  return mockCourses.filter((c) => c.departmentId === departmentId);
}

export function getCourseById(courseId: string): Course | undefined {
  return mockCourses.find((c) => c.id === courseId);
}

export function searchUniversities(query: string): University[] {
  if (!query) return [];
  const lowerQuery = query.toLowerCase();
  return mockUniversities.filter(
    (u) =>
      u.name.toLowerCase().includes(lowerQuery) ||
      u.domain?.toLowerCase().includes(lowerQuery)
  );
}

