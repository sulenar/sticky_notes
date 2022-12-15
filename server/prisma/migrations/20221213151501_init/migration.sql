-- CreateTable
CREATE TABLE "notes" (
    "id" SERIAL NOT NULL,
    "note_name" TEXT NOT NULL,
    "note_description" TEXT NOT NULL,

    CONSTRAINT "notes_pkey" PRIMARY KEY ("id")
);
