-- CreateTable
CREATE TABLE "DescriptionHistory" (
    "id" TEXT NOT NULL,
    "documentType" TEXT NOT NULL,
    "identifier" TEXT,
    "description" TEXT NOT NULL,
    "extractedData" JSONB,
    "validationErrors" JSONB,
    "performance" JSONB,
    "fileName" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "DescriptionHistory_pkey" PRIMARY KEY ("id")
);
