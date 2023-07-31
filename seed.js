const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

async function seed() {
  try {
    // Clear existing data (optional, uncomment if needed)
    // await prisma.product.deleteMany();
    // await prisma.category.deleteMany();

    // Seed Categories
    const categories = await prisma.category.createMany({
      data: [
        {
          name: 'shirts',
          slug: 'shirts',
        },
        {
          name: 'gadgets',
          slug: 'gadgets',
        },
        {
          name: 'housing',
          slug: 'housing',
        }
      ],
      skipDuplicates: true,
    });

    console.log('Categories seeded successfully:', categories);

    // Seed Products
    const products = await prisma.product.createMany({
      data: [
        {
          id:"22",
          name: 'Black shirt 1',
          description: 'Description for black shirt 1',
          price: 9.99,
          categoryName: 'shirts',
          imageUrl: 'https://e8j6t2m5.rocketcdn.me/wp-content/uploads/2022/12/Untitled-1-937x1406.jpg',
          tags: ['men', 'shirt'],
        },
        {
          id:"33",
          name: 'Green shirt',
          description: 'Description for green shirt',
          price: 4.99,
          categoryName: 'shirt',
          imageUrl: 'https://www.musclefitbasics.com/cdn/shop/products/darkgreen.jpg?v=1591928016',
          tags: ['tag3', 'tag4'],
        },
        {
            id:"44",
            name: 'Washing Machine',
            description: 'Description for Washing Machine',
            price: 299.99,
            categoryName: 'housing',
            imageUrl: 'https://images.unsplash.com/photo-1626806787461-102c1bfaaea1?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1171&q=80',
            tags: ['machine', 'washing', 'housing'],
          },
      ],
      skipDuplicates: true,
    });

    console.log('Products seeded successfully:', products);
  } catch (error) {
    console.error('Error seeding data:', error);
  } finally {
    await prisma.$disconnect();
  }
}

seed();
