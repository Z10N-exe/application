/* eslint-disable */
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const categories = ['Shoes', 'Apparel', 'Accessories'];
const brands = ['Nike', 'Adidas', 'Puma', 'New Balance'];

function rand(min, max) { return Math.floor(Math.random() * (max - min + 1)) + min; }

async function main() {
  console.log('Seeding data...');
  for (let i = 1; i <= 50; i++) {
    const category = categories[rand(0, categories.length - 1)];
    const brand = brands[rand(0, brands.length - 1)];
    const product = await prisma.product.create({
      data: {
        name: `${brand} ${category} ${i}`,
        description: `High-quality ${category.toLowerCase()} by ${brand}. Model ${i}.`,
        price: rand(50, 300),
        category,
        brand,
        rating: Math.round((Math.random() * 5) * 10) / 10,
        stock: rand(0, 100),
        images: {
          create: [
            { url: `https://picsum.photos/seed/${brand}-${i}/800/600` },
            { url: `https://picsum.photos/seed/${brand}-${i}-2/800/600` },
          ],
        },
      },
    });
  }

  console.log('Seed complete');
}

main().finally(() => prisma.$disconnect());

