import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

async function seed() {

  try {
    // Clear existing data (optional, uncomment if needed)
    // await prisma.product.deleteMany();
    // await prisma.category.deleteMany();

    // Seed Categories
    // const categories = await prisma.category.upsert({

    //   create: [
    //     {
    //       name: 'shirts',
    //       slug: 'shirts',
    //     },
    //     {
    //       name: 'pants',
    //       slug: 'pants',
    //     },
    //     {
    //       name: 'shoes',
    //       slug: 'shoes',
    //     },
    //   ],
    // });

    // console.log('Categories seeded successfully:', categories);

    // Seed Products
    const shirts = await prisma.product.upsert({
      create: [
        {
          id: "1",
          name: "Summer Black",
          description: "The eternal must-have basic, our men’s T-shirts make the most out of a variety of designs, colours, prints, and textures. For any man and occasion, there is that perfect T-shirt.",
          price: 9.99,
          categoryName: "t-shirts",
          imageUrl: "https://images.unsplash.com/photo-1576566588028-4147f3842f27?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8c2hpcnRzfGVufDB8fDB8fHww&auto=format&fit=crop&w=400&q=60",
          tags: ["men", "shirts"],
        },
        {
          id: "2",
          name: "Floral Delight",
          description: "A vibrant and stylish women’s T-shirt featuring floral patterns and a comfortable fit. Perfect for casual outings and daily wear.",
          price: 12.99,
          categoryName: "t-shirts",
          imageUrl: "https://images.unsplash.com/photo-1519722417352-7d6959729417?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OHx8dCUyMHNoaXJ0cyUyMHdvbWVufGVufDB8fDB8fHww&auto=format&fit=crop&w=400&q=60",
          tags: ["women", "shirts"],
        },
        {
          id: "3",
          name: "Classic White",
          description: "A timeless classic white T-shirt for men and women. Versatile and goes well with any outfit.",
          price: 8.99,
          categoryName: "t-shirts",
          imageUrl: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OHx8dCUyMHNoaXJ0cyUyMG1lbnxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=400&q=60",
          tags: ["men", "women", "shirts"],
        },
        {
          id: "4",
          name: "Graphic Print",
          description: "A trendy and eye-catching graphic print T-shirt for men and women. Perfect for expressing your unique style.",
          price: 14.99,
          categoryName: "t-shirts",
          imageUrl: "https://images.unsplash.com/photo-1503341504253-dff4815485f1?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fHQlMjBzaGlydHMlMjBtZW58ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=400&q=60",
          tags: ["men", "women", "shirts"],
        },
        {
          id: "5",
          name: "Striped Elegance",
          description: "A sophisticated striped T-shirt for men and women. Ideal for both casual and semi-formal occasions.",
          price: 10.99,
          categoryName: "t-shirts",
          imageUrl: "https://images.unsplash.com/photo-1547401774-359f462a706a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTR8fHQlMjBzaGlydHMlMjBzdHJpcGVkfGVufDB8fDB8fHww&auto=format&fit=crop&w=400&q=60",
          tags: ["men", "women", "shirts"],
        },
        {
          id: "6",
          name: "Sporty V-neck",
          description: "A comfortable and sporty V-neck T-shirt for men and women. Great for workouts and active lifestyles.",
          price: 11.99,
          categoryName: "t-shirts",
          imageUrl: "https://images.unsplash.com/photo-1593415227861-8b9bea3bcab3?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8dCUyMHNoaXJ0cyUyMHYlMjBuZWNrfGVufDB8fDB8fHww&auto=format&fit=crop&w=400&q=60",
          tags: ["men", "women", "shirts"],
        },
        {
          id: "7",
          name: "Casual Polo",
          description: "A classic polo T-shirt for men and women. Perfect for a casual yet refined look.",
          price: 13.99,
          categoryName: "t-shirts",
          imageUrl: "https://images.unsplash.com/photo-1625910513413-c23b8bb81cba?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8cG9sbyUyMHNoaXJ0fGVufDB8fDB8fHww&auto=format&fit=crop&w=400&q=60",
          tags: ["men", "shirts"],
        },
        {
          id: "8",
          name: "Feminine Lace",
          description: "An elegant and feminine lace T-shirt for women. Adds a touch of sophistication to any outfit.",
          price: 16.99,
          categoryName: "t-shirts",
          imageUrl: "https://images.unsplash.com/photo-1604006852748-903fccbc4019?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTJ8fHBvbG8lMjBzaGlydHxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=400&q=60",
          tags: ["women", "shirts"],
        },
        {
          id: "9",
          name: "Vintage Retro",
          description: "A cool and retro-style men’s T-shirt. Perfect for vintage fashion enthusiasts.",
          price: 12.99,
          categoryName: "t-shirts",
          imageUrl: "https://images.unsplash.com/photo-1618354691373-d851c5c3a990?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=715&q=80",
          tags: ["men", "shirts"],
        },
        {
          id: "10",
          name: "Athletic Tank",
          description: "A comfortable and breathable athletic tank top for men and women. Ideal for intense workouts.",
          price: 9.99,
          categoryName: "t-shirts",
          imageUrl: "https://images.unsplash.com/photo-1581655353564-df123a1eb820?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTV8fHBvbG8lMjBzaGlydHxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=400&q=60",
          tags: ["men", "women", "shirts"],
        },
        {
          id: "11",
          name: "Classic Denim",
          description: "Timeless and versatile denim pants for men and women. Goes well with any casual or semi-formal outfit.",
          price: 29.99,
          categoryName: "pants",
          imageUrl: "https://plus.unsplash.com/premium_photo-1674828601362-afb73c907ebe?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8cGFudHN8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=400&q=60",
          tags: ["men", "women", "pants"],
        },
        {
          id: "12",
          name: "Athletic Joggers",
          description: "Comfortable and stylish jogger pants for men and women. Ideal for workouts and casual wear.",
          price: 24.99,
          categoryName: "pants",
          imageUrl: "https://images.unsplash.com/photo-1624378439575-d8705ad7ae80?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8cGFudHN8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=400&q=60",
          tags: ["men", "women", "pants"],
        },
        {
          id: "13",
          name: "Formal Dress Pants",
          description: "Elegant and tailored dress pants for men and women. Suitable for formal occasions and office wear.",
          price: 34.99,
          categoryName: "pants",
          imageUrl: "https://images.unsplash.com/photo-1624378439575-d8705ad7ae80?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8cGFudHMlMjBmb3JtYWx8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=400&q=60",
          tags: ["men", "women", "pants"],
        },
        {
          id: "14",
          name: "Casual Chinos",
          description: "Classic and comfortable chino pants for women. Perfect for a smart-casual look.",
          price: 22.99,
          categoryName: "pants",
          imageUrl: "https://images.unsplash.com/photo-1517445312882-bc9910d016b7?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8Q2FzdWFsJTIwcGFudHN8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=400&q=60",
          tags: ["women", "pants"],
        },
        {
          id: "15",
          name: "Relaxed Cargo",
          description: "Spacious and rugged cargo pants for men. Ideal for outdoor adventures and travel.",
          price: 27.99,
          categoryName: "pants",
          imageUrl: "https://images.unsplash.com/photo-1548883354-7622d03aca27?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8Y2FyZ28lMjBwYW50c3xlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=400&q=60",
          tags: ["men", "pants"],
        },
        {
          id: "16",
          name: "Yoga Leggings",
          description: "Stretchy and comfortable yoga leggings for women. Perfect for yoga and active lifestyles.",
          price: 19.99,
          categoryName: "pants",
          imageUrl: "https://images.unsplash.com/photo-1590411914259-ab083f58d04b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTF8fGNhcmdvJTIwcGFudHN8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=400&q=60",
          tags: ["women", "pants"],
        },
        {
          id: "17",
          name: "Formal Slacks",
          description: "Sophisticated and tailored formal slacks for men and women. Great for business meetings and events.",
          price: 31.99,
          categoryName: "pants",
          imageUrl: "https://images.unsplash.com/photo-1506629082955-511b1aa562c8?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8c2xhY2tzJTIwcGFudHN8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=400&q=60",
          tags: ["men", "women", "pants"],
        },
        {
          id: "18",
          name: "Stylish Culottes",
          description: "Fashionable and trendy culottes for women. Adds a touch of style to any outfit.",
          price: 25.99,
          categoryName: "pants",
          imageUrl: "https://images.unsplash.com/photo-1588544622467-6df9eef29c7a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTl8fEN1bG90dGVzJTIwcGFudHN8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=400&q=60",
          tags: ["women", "pants"],
        }
    ,
        {
          id: "21",
          name: "Sleek Sneakers",
          description: "Sleek and trendy sneakers for men and women. Provides great comfort and a fashionable look.",
          price: 49.99,
          categoryName: "shoes",
          imageUrl: "https://images.unsplash.com/photo-1525966222134-fcfa99b8ae77?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8c2hvZXN8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=400&q=60",
          tags: ["men", "women", "shoes"],
        },
        {
          id: "22",
          name: "Classic Loafers",
          description: "Elegant and comfortable loafers for men and women. Perfect for formal occasions and everyday use.",
          price: 39.99,
          categoryName: "shoes",
          imageUrl: "https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OHx8c2hvZXN8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=400&q=60",
          tags: ["men", "women", "shoes"],
        },
        {
          id: "23",
          name: "Casual Canvas",
          description: "Casual and lightweight canvas shoes for men and women. Great for everyday wear and outdoor activities.",
          price: 29.99,
          categoryName: "shoes",
          imageUrl: "https://images.unsplash.com/photo-1491553895911-0055eca6402d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTJ8fHNob2VzfGVufDB8fDB8fHww&auto=format&fit=crop&w=400&q=60",
          tags: ["men", "women", "shoes"],
        },
        {
          id: "24",
          name: "Sporty Running Shoes",
          description: "Sporty and supportive running shoes for men and women. Perfect for jogging and active lifestyles.",
          price: 59.99,
          categoryName: "shoes",
          imageUrl: "https://images.unsplash.com/photo-1600185365926-3a2ce3cdb9eb?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fHNob2VzfGVufDB8fDB8fHww&auto=format&fit=crop&w=400&q=60",
          tags: ["men", "women", "shoes"],
        },
        {
          id: "25",
          name: "Chic Heels",
          description: "Chic and stylish high heels for women. Elevate your formal and evening attire with these glamorous shoes.",
          price: 49.99,
          categoryName: "shoes",
          imageUrl: "https://images.unsplash.com/photo-1596703263926-eb0762ee17e4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=735&q=80",
          tags: ["women", "shoes"],
        },
        {
          id: "26",
          name: "Comfortable Sandals",
          description: "Comfortable and airy sandals for men and women. Perfect for warm weather and casual outings.",
          price: 34.99,
          categoryName: "shoes",
          imageUrl: "https://images.unsplash.com/photo-1603487742131-4160ec999306?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8c2FuZGFsc3xlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=400&q=60",
          tags: ["men", "women", "shoes"],
        },
        {
          id: "27",
          name: "Formal Oxford Shoes",
          description: "Sophisticated and classic Oxford shoes for women. Ideal for formal events and business attire.",
          price: 59.99,
          categoryName: "shoes",
          imageUrl: "https://images.unsplash.com/photo-1582897085656-c636d006a246?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8Ym9vdHN8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=400&q=60",
          tags: ["women", "shoes"],
        },
        {
          id: "28",
          name: "Casual Slip-Ons",
          description: "Casual and easy-to-wear slip-on shoes for men. Perfect for laid-back and comfortable days.",
          price: 32.99,
          categoryName: "shoes",
          imageUrl: "https://images.unsplash.com/photo-1599012307605-23a0ebe4d321?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MjB8fGJvb3RzfGVufDB8fDB8fHww&auto=format&fit=crop&w=400&q=60",
          tags: ["men", "shoes"],
        },
        {
          id: "29",
          name: "Stylish Ankle Boots",
          description: "Stylish and versatile ankle boots for men and women. Adds an edge to your fall and winter outfits.",
          price: 44.99,
          categoryName: "shoes",
          imageUrl: "https://images.unsplash.com/photo-1605812860427-4024433a70fd?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8Ym9vdHN8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=400&q=60",
          tags: ["men", "women", "shoes"],
        },
        {
          id: "30",
          name: "Athletic Cross Trainers",
          description: "Athletic and supportive cross trainers for women. Perfect for night outs and other events.",
          price: 54.99,
          categoryName: "shoes",
          imageUrl: "https://plus.unsplash.com/premium_photo-1673367751802-ed858d3950d2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTl8fGJvb3RzfGVufDB8fDB8fHww&auto=format&fit=crop&w=400&q=60",
          tags: ["women", "shoes"],
        },   
      ],
    });

    console.log('shirts	database seeded successfully' + shirts);
    console.log('pants database seeded successfully' + pants);
    console.log('shoes database seeded successfully' + shoes);
  } catch (error) {
    console.error('Error seeding data:', error);
  } 
}

seed();
