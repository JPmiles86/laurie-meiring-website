-- CreateTable
CREATE TABLE "ai_content" (
    "id" TEXT NOT NULL,
    "tenantId" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "contentType" TEXT NOT NULL,
    "title" TEXT,
    "status" TEXT NOT NULL DEFAULT 'draft',
    "currentVersionId" TEXT,
    "parentContentId" TEXT,
    "metadata" JSONB NOT NULL DEFAULT '{}',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "publishedAt" TIMESTAMP(3),
    "archivedAt" TIMESTAMP(3),

    CONSTRAINT "ai_content_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ai_content_versions" (
    "id" TEXT NOT NULL,
    "contentId" TEXT NOT NULL,
    "versionNumber" INTEGER NOT NULL,
    "contentData" JSONB NOT NULL,
    "generationParams" JSONB,
    "instructions" TEXT[],
    "parentVersionId" TEXT,
    "changeSummary" TEXT,
    "createdBy" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "isPublished" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "ai_content_versions_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ai_content_interactions" (
    "id" TEXT NOT NULL,
    "contentId" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "interactionType" TEXT NOT NULL,
    "duration" INTEGER,
    "sequence" INTEGER NOT NULL,
    "contextData" JSONB NOT NULL DEFAULT '{}',
    "emotionalState" TEXT,
    "outcome" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "ai_content_interactions_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ai_learning_patterns" (
    "id" TEXT NOT NULL,
    "tenantId" TEXT NOT NULL,
    "userId" TEXT,
    "patternType" TEXT NOT NULL,
    "pattern" JSONB NOT NULL,
    "confidence" DOUBLE PRECISION NOT NULL,
    "usageCount" INTEGER NOT NULL DEFAULT 0,
    "successRate" DOUBLE PRECISION,
    "context" JSONB NOT NULL DEFAULT '{}',
    "exampleContentIds" TEXT[],
    "negativeExamples" TEXT[],
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "lastUsed" TIMESTAMP(3),

    CONSTRAINT "ai_learning_patterns_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "user_content_preferences" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "preferenceType" TEXT NOT NULL,
    "preferenceValue" JSONB NOT NULL,
    "strength" DOUBLE PRECISION NOT NULL,
    "context" JSONB NOT NULL DEFAULT '{}',
    "learnedFrom" TEXT[],
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "user_content_preferences_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ai_content_critiques" (
    "id" TEXT NOT NULL,
    "contentId" TEXT NOT NULL,
    "versionId" TEXT,
    "userId" TEXT NOT NULL,
    "critiqueType" TEXT NOT NULL,
    "specificFocus" TEXT,
    "severity" TEXT NOT NULL,
    "originalText" TEXT,
    "suggestedText" TEXT,
    "reasoning" TEXT,
    "wasAccepted" BOOLEAN,
    "actualResolution" TEXT,
    "learningWeight" DOUBLE PRECISION NOT NULL DEFAULT 1.0,
    "similarCritiques" TEXT[],
    "effectiveness" DOUBLE PRECISION,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "resolvedAt" TIMESTAMP(3),

    CONSTRAINT "ai_content_critiques_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "content_quality_scores" (
    "id" TEXT NOT NULL,
    "contentId" TEXT NOT NULL,
    "versionId" TEXT,
    "scoreType" TEXT NOT NULL,
    "qualityDimensions" JSONB NOT NULL,
    "overallScore" DOUBLE PRECISION NOT NULL,
    "confidenceScore" DOUBLE PRECISION NOT NULL,
    "scoringReasons" TEXT[],
    "improvementSuggestions" TEXT[],
    "comparativeRank" INTEGER,
    "scoredAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "scoredBy" TEXT,

    CONSTRAINT "content_quality_scores_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "content_performance_data" (
    "id" TEXT NOT NULL,
    "aiContentId" TEXT NOT NULL,
    "publishedPostId" TEXT,
    "generationParams" JSONB NOT NULL,
    "userModifications" JSONB NOT NULL,
    "performanceMetrics" JSONB NOT NULL,
    "attributionScore" DOUBLE PRECISION,
    "timeframe" TEXT NOT NULL,
    "benchmarkComparison" JSONB NOT NULL,
    "successFactors" TEXT[],
    "recordedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "content_performance_data_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "content_workflow_state" (
    "id" TEXT NOT NULL,
    "contentId" TEXT NOT NULL,
    "currentState" TEXT NOT NULL,
    "stateHistory" JSONB NOT NULL,
    "blockers" TEXT[],
    "nextActions" TEXT[],
    "stateMetadata" JSONB NOT NULL DEFAULT '{}',
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "content_workflow_state_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ai_instruction_history" (
    "id" TEXT NOT NULL,
    "contentId" TEXT NOT NULL,
    "versionId" TEXT,
    "instructionType" TEXT,
    "instructionText" TEXT NOT NULL,
    "appliedAt" TIMESTAMP(3),
    "createdBy" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "ai_instruction_history_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ai_generation_sessions" (
    "id" TEXT NOT NULL,
    "contentId" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "sessionStart" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "sessionEnd" TIMESTAMP(3),
    "totalDuration" INTEGER,
    "actionsCount" INTEGER NOT NULL DEFAULT 0,
    "generationsCount" INTEGER NOT NULL DEFAULT 0,
    "critiquesCount" INTEGER NOT NULL DEFAULT 0,
    "finalOutcome" TEXT,
    "sessionMetadata" JSONB NOT NULL DEFAULT '{}',

    CONSTRAINT "ai_generation_sessions_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ai_content_relationships" (
    "id" TEXT NOT NULL,
    "parentContentId" TEXT NOT NULL,
    "childContentId" TEXT NOT NULL,
    "relationshipType" TEXT NOT NULL,
    "strength" DOUBLE PRECISION NOT NULL DEFAULT 1.0,
    "metadata" JSONB NOT NULL DEFAULT '{}',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "ai_content_relationships_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "ai_content_tenantId_idx" ON "ai_content"("tenantId");

-- CreateIndex
CREATE INDEX "ai_content_status_idx" ON "ai_content"("status");

-- CreateIndex
CREATE INDEX "ai_content_contentType_idx" ON "ai_content"("contentType");

-- CreateIndex
CREATE INDEX "ai_content_versions_contentId_idx" ON "ai_content_versions"("contentId");

-- CreateIndex
CREATE UNIQUE INDEX "ai_content_versions_contentId_versionNumber_key" ON "ai_content_versions"("contentId", "versionNumber");

-- CreateIndex
CREATE INDEX "ai_content_interactions_contentId_userId_idx" ON "ai_content_interactions"("contentId", "userId");

-- CreateIndex
CREATE INDEX "ai_content_interactions_interactionType_idx" ON "ai_content_interactions"("interactionType");

-- CreateIndex
CREATE INDEX "ai_learning_patterns_tenantId_patternType_idx" ON "ai_learning_patterns"("tenantId", "patternType");

-- CreateIndex
CREATE INDEX "ai_learning_patterns_confidence_idx" ON "ai_learning_patterns"("confidence");

-- CreateIndex
CREATE INDEX "user_content_preferences_userId_preferenceType_idx" ON "user_content_preferences"("userId", "preferenceType");

-- CreateIndex
CREATE INDEX "ai_content_critiques_contentId_critiqueType_idx" ON "ai_content_critiques"("contentId", "critiqueType");

-- CreateIndex
CREATE INDEX "ai_content_critiques_userId_critiqueType_idx" ON "ai_content_critiques"("userId", "critiqueType");

-- CreateIndex
CREATE INDEX "content_quality_scores_contentId_scoreType_idx" ON "content_quality_scores"("contentId", "scoreType");

-- CreateIndex
CREATE INDEX "content_quality_scores_overallScore_idx" ON "content_quality_scores"("overallScore");

-- CreateIndex
CREATE INDEX "content_performance_data_aiContentId_idx" ON "content_performance_data"("aiContentId");

-- CreateIndex
CREATE INDEX "content_performance_data_recordedAt_idx" ON "content_performance_data"("recordedAt");

-- CreateIndex
CREATE UNIQUE INDEX "content_workflow_state_contentId_key" ON "content_workflow_state"("contentId");

-- CreateIndex
CREATE INDEX "content_workflow_state_currentState_idx" ON "content_workflow_state"("currentState");

-- CreateIndex
CREATE INDEX "ai_instruction_history_contentId_idx" ON "ai_instruction_history"("contentId");

-- CreateIndex
CREATE INDEX "ai_generation_sessions_contentId_idx" ON "ai_generation_sessions"("contentId");

-- CreateIndex
CREATE INDEX "ai_generation_sessions_userId_sessionStart_idx" ON "ai_generation_sessions"("userId", "sessionStart");

-- CreateIndex
CREATE UNIQUE INDEX "ai_content_relationships_parentContentId_childContentId_key" ON "ai_content_relationships"("parentContentId", "childContentId");

-- AddForeignKey
ALTER TABLE "ai_content" ADD CONSTRAINT "ai_content_tenantId_fkey" FOREIGN KEY ("tenantId") REFERENCES "tenants"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ai_content" ADD CONSTRAINT "ai_content_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ai_content" ADD CONSTRAINT "ai_content_parentContentId_fkey" FOREIGN KEY ("parentContentId") REFERENCES "ai_content"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ai_content_versions" ADD CONSTRAINT "ai_content_versions_contentId_fkey" FOREIGN KEY ("contentId") REFERENCES "ai_content"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ai_content_versions" ADD CONSTRAINT "ai_content_versions_parentVersionId_fkey" FOREIGN KEY ("parentVersionId") REFERENCES "ai_content_versions"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ai_content_interactions" ADD CONSTRAINT "ai_content_interactions_contentId_fkey" FOREIGN KEY ("contentId") REFERENCES "ai_content"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ai_learning_patterns" ADD CONSTRAINT "ai_learning_patterns_tenantId_fkey" FOREIGN KEY ("tenantId") REFERENCES "tenants"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ai_content_critiques" ADD CONSTRAINT "ai_content_critiques_contentId_fkey" FOREIGN KEY ("contentId") REFERENCES "ai_content"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ai_content_critiques" ADD CONSTRAINT "ai_content_critiques_versionId_fkey" FOREIGN KEY ("versionId") REFERENCES "ai_content_versions"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "content_quality_scores" ADD CONSTRAINT "content_quality_scores_contentId_fkey" FOREIGN KEY ("contentId") REFERENCES "ai_content"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "content_quality_scores" ADD CONSTRAINT "content_quality_scores_versionId_fkey" FOREIGN KEY ("versionId") REFERENCES "ai_content_versions"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "content_performance_data" ADD CONSTRAINT "content_performance_data_aiContentId_fkey" FOREIGN KEY ("aiContentId") REFERENCES "ai_content"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "content_workflow_state" ADD CONSTRAINT "content_workflow_state_contentId_fkey" FOREIGN KEY ("contentId") REFERENCES "ai_content"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ai_instruction_history" ADD CONSTRAINT "ai_instruction_history_contentId_fkey" FOREIGN KEY ("contentId") REFERENCES "ai_content"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ai_generation_sessions" ADD CONSTRAINT "ai_generation_sessions_contentId_fkey" FOREIGN KEY ("contentId") REFERENCES "ai_content"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ai_content_relationships" ADD CONSTRAINT "ai_content_relationships_parentContentId_fkey" FOREIGN KEY ("parentContentId") REFERENCES "ai_content"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ai_content_relationships" ADD CONSTRAINT "ai_content_relationships_childContentId_fkey" FOREIGN KEY ("childContentId") REFERENCES "ai_content"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
