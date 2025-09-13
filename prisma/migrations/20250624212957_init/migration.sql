-- CreateEnum
CREATE TYPE "Role" AS ENUM ('SUPER_ADMIN', 'ADMIN', 'EDITOR', 'VIEWER');

-- CreateEnum
CREATE TYPE "PostStatus" AS ENUM ('DRAFT', 'PUBLISHED', 'SCHEDULED', 'ARCHIVED', 'TRASH');

-- CreateTable
CREATE TABLE "tenants" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "domain" TEXT NOT NULL,
    "subdomain" TEXT NOT NULL,
    "config" JSONB NOT NULL DEFAULT '{}',
    "storageConfig" JSONB NOT NULL DEFAULT '{}',
    "planTier" TEXT NOT NULL DEFAULT 'starter',
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "tenants_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "users" (
    "id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "passwordHash" TEXT,
    "role" "Role" NOT NULL DEFAULT 'EDITOR',
    "tenantId" TEXT NOT NULL,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "lastLogin" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "api_keys" (
    "id" TEXT NOT NULL,
    "tenantId" TEXT NOT NULL,
    "provider" TEXT NOT NULL,
    "encryptedKey" TEXT NOT NULL,
    "keyName" TEXT,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "usageCount" INTEGER NOT NULL DEFAULT 0,
    "lastUsed" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "api_keys_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "posts" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "content" TEXT NOT NULL,
    "excerpt" TEXT,
    "status" "PostStatus" NOT NULL DEFAULT 'DRAFT',
    "publishDate" TIMESTAMP(3),
    "authorId" TEXT NOT NULL,
    "tenantId" TEXT NOT NULL,
    "featuredImage" TEXT,
    "metaDescription" TEXT,
    "metaKeywords" TEXT,
    "readingTime" INTEGER,
    "viewCount" INTEGER NOT NULL DEFAULT 0,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "posts_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "post_versions" (
    "id" TEXT NOT NULL,
    "postId" TEXT NOT NULL,
    "content" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "version" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "post_versions_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "categories" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "description" TEXT,
    "tenantId" TEXT NOT NULL,
    "color" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "categories_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "tags" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "tenantId" TEXT NOT NULL,
    "useCount" INTEGER NOT NULL DEFAULT 0,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "tags_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "post_categories" (
    "postId" TEXT NOT NULL,
    "categoryId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "post_categories_pkey" PRIMARY KEY ("postId","categoryId")
);

-- CreateTable
CREATE TABLE "post_tags" (
    "postId" TEXT NOT NULL,
    "tagId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "post_tags_pkey" PRIMARY KEY ("postId","tagId")
);

-- CreateTable
CREATE TABLE "media" (
    "id" TEXT NOT NULL,
    "filename" TEXT NOT NULL,
    "originalName" TEXT NOT NULL,
    "mimeType" TEXT NOT NULL,
    "size" INTEGER NOT NULL,
    "url" TEXT NOT NULL,
    "path" TEXT NOT NULL,
    "alt" TEXT,
    "caption" TEXT,
    "tenantId" TEXT NOT NULL,
    "uploadedById" TEXT NOT NULL,
    "isPublic" BOOLEAN NOT NULL DEFAULT false,
    "metadata" JSONB NOT NULL DEFAULT '{}',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "media_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "post_media" (
    "postId" TEXT NOT NULL,
    "mediaId" TEXT NOT NULL,
    "order" INTEGER NOT NULL DEFAULT 0,

    CONSTRAINT "post_media_pkey" PRIMARY KEY ("postId","mediaId")
);

-- CreateTable
CREATE TABLE "ai_generations" (
    "id" TEXT NOT NULL,
    "tenantId" TEXT NOT NULL,
    "postId" TEXT,
    "provider" TEXT NOT NULL,
    "model" TEXT NOT NULL,
    "promptType" TEXT NOT NULL,
    "prompt" TEXT NOT NULL,
    "response" TEXT NOT NULL,
    "tokensUsed" INTEGER,
    "cost" DECIMAL(10,6),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "ai_generations_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "feature_usage" (
    "id" TEXT NOT NULL,
    "tenantId" TEXT NOT NULL,
    "feature" TEXT NOT NULL,
    "usageCount" INTEGER NOT NULL DEFAULT 0,
    "lastUsed" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "monthYear" TEXT NOT NULL,

    CONSTRAINT "feature_usage_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "tenants_domain_key" ON "tenants"("domain");

-- CreateIndex
CREATE UNIQUE INDEX "tenants_subdomain_key" ON "tenants"("subdomain");

-- CreateIndex
CREATE UNIQUE INDEX "users_email_tenantId_key" ON "users"("email", "tenantId");

-- CreateIndex
CREATE UNIQUE INDEX "api_keys_tenantId_provider_key" ON "api_keys"("tenantId", "provider");

-- CreateIndex
CREATE INDEX "posts_tenantId_status_publishDate_idx" ON "posts"("tenantId", "status", "publishDate");

-- CreateIndex
CREATE INDEX "posts_tenantId_authorId_idx" ON "posts"("tenantId", "authorId");

-- CreateIndex
CREATE UNIQUE INDEX "posts_slug_tenantId_key" ON "posts"("slug", "tenantId");

-- CreateIndex
CREATE UNIQUE INDEX "post_versions_postId_version_key" ON "post_versions"("postId", "version");

-- CreateIndex
CREATE UNIQUE INDEX "categories_slug_tenantId_key" ON "categories"("slug", "tenantId");

-- CreateIndex
CREATE UNIQUE INDEX "tags_slug_tenantId_key" ON "tags"("slug", "tenantId");

-- CreateIndex
CREATE INDEX "media_tenantId_mimeType_idx" ON "media"("tenantId", "mimeType");

-- CreateIndex
CREATE INDEX "ai_generations_tenantId_provider_idx" ON "ai_generations"("tenantId", "provider");

-- CreateIndex
CREATE INDEX "ai_generations_tenantId_createdAt_idx" ON "ai_generations"("tenantId", "createdAt");

-- CreateIndex
CREATE UNIQUE INDEX "feature_usage_tenantId_feature_monthYear_key" ON "feature_usage"("tenantId", "feature", "monthYear");

-- AddForeignKey
ALTER TABLE "users" ADD CONSTRAINT "users_tenantId_fkey" FOREIGN KEY ("tenantId") REFERENCES "tenants"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "api_keys" ADD CONSTRAINT "api_keys_tenantId_fkey" FOREIGN KEY ("tenantId") REFERENCES "tenants"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "posts" ADD CONSTRAINT "posts_authorId_fkey" FOREIGN KEY ("authorId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "posts" ADD CONSTRAINT "posts_tenantId_fkey" FOREIGN KEY ("tenantId") REFERENCES "tenants"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "post_versions" ADD CONSTRAINT "post_versions_postId_fkey" FOREIGN KEY ("postId") REFERENCES "posts"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "categories" ADD CONSTRAINT "categories_tenantId_fkey" FOREIGN KEY ("tenantId") REFERENCES "tenants"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "tags" ADD CONSTRAINT "tags_tenantId_fkey" FOREIGN KEY ("tenantId") REFERENCES "tenants"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "post_categories" ADD CONSTRAINT "post_categories_postId_fkey" FOREIGN KEY ("postId") REFERENCES "posts"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "post_categories" ADD CONSTRAINT "post_categories_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "categories"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "post_tags" ADD CONSTRAINT "post_tags_postId_fkey" FOREIGN KEY ("postId") REFERENCES "posts"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "post_tags" ADD CONSTRAINT "post_tags_tagId_fkey" FOREIGN KEY ("tagId") REFERENCES "tags"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "media" ADD CONSTRAINT "media_tenantId_fkey" FOREIGN KEY ("tenantId") REFERENCES "tenants"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "media" ADD CONSTRAINT "media_uploadedById_fkey" FOREIGN KEY ("uploadedById") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "post_media" ADD CONSTRAINT "post_media_postId_fkey" FOREIGN KEY ("postId") REFERENCES "posts"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "post_media" ADD CONSTRAINT "post_media_mediaId_fkey" FOREIGN KEY ("mediaId") REFERENCES "media"("id") ON DELETE CASCADE ON UPDATE CASCADE;
