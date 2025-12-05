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
    .map((f) => `/${f}`);
}

async function main() {
  console.log('Seeding data from frontend/images...');
  const images = listImages();

  // Remove existing products and images to drop placeholders
  await prisma.productImage.deleteMany();
  await prisma.product.deleteMany();

  const names = [
    'Nike Air Max 90',
    'Nike Air Force 1',
    'Nike Dunk Low',
    'Nike Air Zoom Pegasus',
    'Nike Blazer Mid',
    'Nike Vaporfly 3',
    'Nike React Infinity Run',
    'Nike Air Zoom Alphafly',
    'Nike LeBron',
    'Nike Zoom Freak',
    'Nike Metcon',
    'Nike Jordan 1',
    'Nike Cortez',
    'Nike SB Dunk',
    'Nike Air Huarache',
    'Nike Free RN'
  ];
  const categories = ['Running', 'Lifestyle', 'Basketball', 'Training'];

  for (let i = 0; i < images.length; i++) {
    const img = images[i];
    const name = names[i % names.length] + ` SE ${i + 1}`;
    const category = categories[i % categories.length];
    await prisma.product.create({
      data: {
        name,
        description: `${name} engineered for comfort and performance across ${category.toLowerCase()} sessions.`,
        price: rand(80, 220),
        category,
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

