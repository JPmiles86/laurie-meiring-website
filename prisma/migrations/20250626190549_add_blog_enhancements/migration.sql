/*
  Warnings:

  - You are about to drop the column `keyName` on the `api_keys` table. All the data in the column will be lost.
  - You are about to drop the column `tenantId` on the `api_keys` table. All the data in the column will be lost.
  - Added the required column `keyHash` to the `api_keys` table without a default value. This is not possible if the table is not empty.
  - Added the required column `name` to the `api_keys` table without a default value. This is not possible if the table is not empty.
  - Added the required column `userId` to the `api_keys` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "api_keys" DROP CONSTRAINT "api_keys_tenantId_fkey";

-- DropIndex
DROP INDEX "api_keys_tenantId_provider_key";

-- AlterTable
ALTER TABLE "ai_generations" ADD COLUMN     "contentType" TEXT NOT NULL DEFAULT 'generation',
ADD COLUMN     "editsByUser" TEXT,
ADD COLUMN     "isUsed" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "performanceData" JSONB NOT NULL DEFAULT '{}',
ADD COLUMN     "status" TEXT NOT NULL DEFAULT 'generated',
ADD COLUMN     "usedInPostId" TEXT,
ADD COLUMN     "userFeedback" TEXT,
ADD COLUMN     "userRating" INTEGER;

-- AlterTable
ALTER TABLE "api_keys" DROP COLUMN "keyName",
DROP COLUMN "tenantId",
ADD COLUMN     "keyHash" TEXT NOT NULL,
ADD COLUMN     "name" TEXT NOT NULL,
ADD COLUMN     "userId" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "posts" ADD COLUMN     "headline" TEXT,
ADD COLUMN     "subheadline" TEXT,
ADD COLUMN     "summary" TEXT;

-- CreateTable
CREATE TABLE "ai_usage" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "provider" TEXT NOT NULL,
    "action" TEXT NOT NULL,
    "tokensUsed" INTEGER NOT NULL DEFAULT 0,
    "metadata" JSONB NOT NULL DEFAULT '{}',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "ai_usage_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ai_feedback" (
    "id" TEXT NOT NULL,
    "aiGenerationId" TEXT NOT NULL,
    "tenantId" TEXT NOT NULL,
    "feedbackType" TEXT NOT NULL,
    "rating" INTEGER,
    "comments" TEXT,
    "suggestions" TEXT,
    "wasUseful" BOOLEAN,
    "improvementNotes" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "ai_feedback_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "blog_ideas" (
    "id" TEXT NOT NULL,
    "tenantId" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "category" TEXT,
    "tags" TEXT[],
    "priority" TEXT NOT NULL DEFAULT 'medium',
    "status" TEXT NOT NULL DEFAULT 'idea',
    "source" TEXT NOT NULL DEFAULT 'manual',
    "aiPrompt" TEXT,
    "publishedPostId" TEXT,
    "userNotes" TEXT,
    "seasonality" TEXT,
    "targetAudience" TEXT,
    "estimatedReadTime" INTEGER,
    "keywords" TEXT[],
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "blog_ideas_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "ai_usage_userId_provider_idx" ON "ai_usage"("userId", "provider");

-- CreateIndex
CREATE INDEX "ai_usage_userId_createdAt_idx" ON "ai_usage"("userId", "createdAt");

-- CreateIndex
CREATE INDEX "ai_feedback_tenantId_feedbackType_idx" ON "ai_feedback"("tenantId", "feedbackType");

-- CreateIndex
CREATE INDEX "ai_feedback_aiGenerationId_idx" ON "ai_feedback"("aiGenerationId");

-- CreateIndex
CREATE INDEX "blog_ideas_tenantId_status_idx" ON "blog_ideas"("tenantId", "status");

-- CreateIndex
CREATE INDEX "blog_ideas_tenantId_priority_idx" ON "blog_ideas"("tenantId", "priority");

-- CreateIndex
CREATE INDEX "blog_ideas_tenantId_createdAt_idx" ON "blog_ideas"("tenantId", "createdAt");

-- CreateIndex
CREATE INDEX "ai_generations_tenantId_contentType_status_idx" ON "ai_generations"("tenantId", "contentType", "status");

-- AddForeignKey
ALTER TABLE "ai_feedback" ADD CONSTRAINT "ai_feedback_aiGenerationId_fkey" FOREIGN KEY ("aiGenerationId") REFERENCES "ai_generations"("id") ON DELETE CASCADE ON UPDATE CASCADE;
