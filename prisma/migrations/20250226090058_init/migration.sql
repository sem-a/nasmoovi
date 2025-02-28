/*
  Warnings:

  - You are about to alter the column `heigth` on the `Portfolio` table. The data in that column could be lost. The data in that column will be cast from `String` to `Int`.
  - You are about to alter the column `width` on the `Portfolio` table. The data in that column could be lost. The data in that column will be cast from `String` to `Int`.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Portfolio" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "image" TEXT NOT NULL,
    "width" INTEGER NOT NULL,
    "heigth" INTEGER NOT NULL,
    "preview" BOOLEAN NOT NULL,
    "weddingId" TEXT NOT NULL,
    CONSTRAINT "Portfolio_weddingId_fkey" FOREIGN KEY ("weddingId") REFERENCES "Wedding" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Portfolio" ("heigth", "id", "image", "preview", "weddingId", "width") SELECT "heigth", "id", "image", "preview", "weddingId", "width" FROM "Portfolio";
DROP TABLE "Portfolio";
ALTER TABLE "new_Portfolio" RENAME TO "Portfolio";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
