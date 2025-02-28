/*
  Warnings:

  - Added the required column `heigth` to the `Portfolio` table without a default value. This is not possible if the table is not empty.
  - Added the required column `width` to the `Portfolio` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Portfolio" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "image" TEXT NOT NULL,
    "width" TEXT NOT NULL,
    "heigth" TEXT NOT NULL,
    "preview" BOOLEAN NOT NULL,
    "weddingId" TEXT NOT NULL,
    CONSTRAINT "Portfolio_weddingId_fkey" FOREIGN KEY ("weddingId") REFERENCES "Wedding" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Portfolio" ("id", "image", "preview", "weddingId") SELECT "id", "image", "preview", "weddingId" FROM "Portfolio";
DROP TABLE "Portfolio";
ALTER TABLE "new_Portfolio" RENAME TO "Portfolio";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
