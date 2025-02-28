/*
  Warnings:

  - You are about to drop the column `heigth` on the `Portfolio` table. All the data in the column will be lost.
  - You are about to drop the column `width` on the `Portfolio` table. All the data in the column will be lost.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Portfolio" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "image" TEXT NOT NULL,
    "preview" BOOLEAN NOT NULL,
    "weddingId" TEXT NOT NULL,
    CONSTRAINT "Portfolio_weddingId_fkey" FOREIGN KEY ("weddingId") REFERENCES "Wedding" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Portfolio" ("id", "image", "preview", "weddingId") SELECT "id", "image", "preview", "weddingId" FROM "Portfolio";
DROP TABLE "Portfolio";
ALTER TABLE "new_Portfolio" RENAME TO "Portfolio";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
