-- CreateTable
CREATE TABLE "clubs" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "location" JSONB NOT NULL,
    "contactInfo" JSONB NOT NULL,
    "courtDetails" JSONB NOT NULL,
    "playInfo" JSONB NOT NULL,
    "amenities" TEXT[],
    "images" TEXT[],
    "description" TEXT,
    "listingType" TEXT NOT NULL,
    "upcomingEvents" TEXT[],
    "tenantId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "clubs_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "clubs_tenantId_idx" ON "clubs"("tenantId");

-- AddForeignKey
ALTER TABLE "clubs" ADD CONSTRAINT "clubs_tenantId_fkey" FOREIGN KEY ("tenantId") REFERENCES "tenants"("id") ON DELETE CASCADE ON UPDATE CASCADE;
