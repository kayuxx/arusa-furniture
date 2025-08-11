-- CreateEnum
CREATE TYPE "Currencies" AS ENUM ('usd', 'dzd');

-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "email" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "hashedPassword" TEXT NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "UserPreferences" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "currency" "Currencies" NOT NULL DEFAULT 'usd',

    CONSTRAINT "UserPreferences_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "BagProducts" (
    "id" TEXT NOT NULL,
    "productId" TEXT NOT NULL,
    "variationId" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "quantity" DECIMAL(65,30) NOT NULL,

    CONSTRAINT "BagProducts_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE INDEX "User_email_idx" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "UserPreferences_userId_key" ON "UserPreferences"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "BagProducts_productId_key" ON "BagProducts"("productId");

-- CreateIndex
CREATE UNIQUE INDEX "BagProducts_variationId_key" ON "BagProducts"("variationId");

-- AddForeignKey
ALTER TABLE "UserPreferences" ADD CONSTRAINT "UserPreferences_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "BagProducts" ADD CONSTRAINT "BagProducts_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
