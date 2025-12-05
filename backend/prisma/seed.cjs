/* eslint-disable */
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const categories = ['Shoes'];
const brands = ['Nike'];

function rand(min, max) { return Math.floor(Math.random() * (max - min + 1)) + min; }

async function main() {
  console.log('Seeding data...');
  const localImages = [
    '/images/nike-4971495_1280.jpg',
    '/images/nike-4971495_1280 (1).jpg',
    '/images/nike-running-shoe-white-blue-red-plwsxleqzmrlnvmy.png',
    '/images/nike-shoes-a-njhocwop9vqar7ib.png',
    '/images/nike-shoes-for-flat-feet-png-pke-ouds2nbrizz5vvgx.png',
    '/images/nike-shoes-for-flat-feet-png-pke-ouds2nbrizz5vvgx (1).png',
    '/images/nike-winter-shoes-png-06122024-1lq0p32p2cgqdj54.png',
    '/images/sneakers-5979353_1280.jpg',
  ];

  for (let i = 0; i < localImages.length; i++) {
    const img = localImages[i];
    const category = 'Shoes';
    const brand = 'Nike';
    await prisma.product.create({
      data: {
        name: `${brand} ${category} ${i + 1}`,
        description: `Premium ${brand} ${category.toLowerCase()} with modern cushioning and durable outsole.`,
        price: rand(90, 200),
        category,
        brand,
        rating: Math.round((Math.random() * 5) * 10) / 10,
        stock: rand(5, 40),
        images: {
          create: [
            { url: img },
            { url: '/images/nike-4971495_1280.jpg' },
          ],
        },
      },
    });
  }

  console.log('Seed complete');
}

main().finally(() => prisma.$disconnect());

