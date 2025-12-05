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

function listWomenImages() {
  const dir = path.join(getFrontendImagesDir(), 'women');
  if (!fs.existsSync(dir)) return [];
  const exts = new Set(['.jpg', '.jpeg', '.png', '.webp', '.gif', '.svg']);
  return fs.readdirSync(dir)
    .filter((f) => exts.has(path.extname(f).toLowerCase()))
    .map((f) => `/women/${f}`);
}

async function main() {
  console.log('Seeding data from frontend/images...');
  const images = listImages();
  const womenImages = listWomenImages();

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
        stock: Math.random() < 0.25 ? 0 : rand(5, 50),
        images: {
          create: [{ url: img }],
        },
      },
    });
  }

  for (let i = 0; i < womenImages.length; i++) {
    const img = womenImages[i];
    const name = (names[i % names.length] + ` Women SE ${i + 1}`).replace('Nike ', 'Nike');
    await prisma.product.create({
      data: {
        name,
        description: `${name} designed specifically for women with supportive comfort and style.`,
        price: rand(80, 220),
        category: 'Women',
        brand: 'Nike',
        rating: Math.round((Math.random() * 5) * 10) / 10,
        stock: Math.random() < 0.25 ? 0 : rand(5, 50),
        images: { create: [{ url: img }] },
      },
    });
  }

  console.log(`Seed complete: ${images.length} products created.`);
}

main().finally(() => prisma.$disconnect());

