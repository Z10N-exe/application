/* eslint-disable */
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const fs = require('fs');
const path = require('path');

function rand(min, max) { return Math.floor(Math.random() * (max - min + 1)) + min; }

function getFrontendImagesDir() {
  return path.resolve(__dirname, '../../frontend/images');
}

function listImages() {
  const dir = getFrontendImagesDir();
  if (!fs.existsSync(dir)) return [];
  const exts = new Set(['.jpg', '.jpeg', '.png', '.webp', '.gif', '.svg']);
  return fs.readdirSync(dir)
    .filter((f) => exts.has(path.extname(f).toLowerCase()))
    .map((f) => `/images/${f}`);
}

async function main() {
  console.log('Seeding data from frontend/images...');
  const images = listImages();

  // Remove existing products and images to drop placeholders
  await prisma.productImage.deleteMany();
  await prisma.product.deleteMany();

  for (let i = 0; i < images.length; i++) {
    const img = images[i];
    await prisma.product.create({
      data: {
        name: `Nike Shoes ${i + 1}`,
        description: `Premium Nike shoes designed for comfort and performance. Model ${i + 1}.`,
        price: rand(80, 220),
        category: 'Shoes',
        brand: 'Nike',
        rating: Math.round((Math.random() * 5) * 10) / 10,
        stock: rand(5, 50),
        images: {
          create: [{ url: img }],
        },
      },
    });
  }

  console.log(`Seed complete: ${images.length} products created.`);
}

main().finally(() => prisma.$disconnect());

