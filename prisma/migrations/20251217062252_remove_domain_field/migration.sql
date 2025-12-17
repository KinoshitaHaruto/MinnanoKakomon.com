/*
  Warnings:

  - You are about to drop the column `domain` on the `University` table. All the data in the column will be lost.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_University" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "prefecture" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);
INSERT INTO "new_University" ("createdAt", "id", "name", "prefecture", "updatedAt") SELECT "createdAt", "id", "name", "prefecture", "updatedAt" FROM "University";
DROP TABLE "University";
ALTER TABLE "new_University" RENAME TO "University";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
