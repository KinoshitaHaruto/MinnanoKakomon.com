
# Project Context & Architecture

This document serves as a knowledge base for AI assistants working on this project.

## Project Overview
Next.js application for sharing university exam information.
- **Root**: `src/app`
- **Data Access**: `src/server/db` (Prisma)
- **Auth**: `src/auth.ts` (Auth.js v5)

## Architecture

### Data Access Layer
- **Prisma Client**: `src/lib/prisma.ts` initializes the global client.
- **Functions**: Located in `src/server/db/`. Each entity (University, Faculty, etc.) has its own file exporting helper functions like `getUniversityById` or `searchUniversities`.
- **Mock Data**: **REMOVED**. All data is now fetched from the SQLite database.

### Database Schema (Key Models)
- **University**: `id`, `name`, `domain`, `prefecture`.
- **Faculty**: Belongs to `University`.
- **Department**: Belongs to `Faculty`.
- **Course**: Belongs to `Department`. Contains `rakutanScore` and `professor`.
- **User**: Auth.js user model. Includes `universityId` (nullable) for verification.

### Authentication
- Uses **Auth.js v5 (beta)**.
- **Provider**: Google.
- **Adapter**: Prisma Adapter.
- **Session**: Stored in database.
- **Components**: `SignInButton`, `SignOutButton`, `UserAvatar` in `src/components/auth/`.

## Development Workflows

### Database Seeding
- Data is managed in CSV files: `prisma/data/*.csv`.
- Seed script: `prisma/seed.ts`.
- Command: `npx prisma db seed`.

### Recent Changes Log
- **Migration to SQLite**: Replaced in-memory mock data with `prisma/schema.prisma` and SQLite.
- **CSV Seeding**: Implemented a seed script that reads from CSVs to populate Universities -> Courses.
- **Auth Implementation**: Added Google Auth and Prisma Adapter.
- **Prefecture Field**: Added `prefecture` to University model (map search support).

## Next Steps
1. **Post Implementation**: Create Server Actions to allow users to add Reviews (`Post`) or Exams.
2. **Map Search Feature**: Use the `prefecture` field to implement a Japan map UI for selecting universities.
3. **User Profile**: Allow users to set their University/Faculty/Department after signup.
