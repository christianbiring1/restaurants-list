import { PrismaClient, StoreCategory } from "@prisma/client";

const prisma = new PrismaClient();

const restaurants = [
  {
    rating: 4.2,
    rating_count: 139,
    category: StoreCategory.YAKITORI,
    city: "osaka",
    desc: "Enjoy the highest quality Omakase with unlimited sake at a reasonable price.",
    id: "4dc2e1d1-fe89-4a29-b86a-f8bb0ce1395d",
    images: [
      "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?q=80&w=1887&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1628294896516-344152572ee8?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    ],
    name: "Kagurazaka Ishikawa Sushi Haru Nakanoshima Sushi",
    price_range: "3000 ~ 5000",
    featured: {
      text: "Top Yakitori Restaurant in Nakanoshima",
      icon: "stars-02",
    },
  },
  {
    rating: 4.5,
    rating_count: 200,
    category: StoreCategory.SUSHI,
    city: "tokyo",
    desc: "Provides fresh seafood and authentic sushi.",
    id: "6ac3e2d1-ge98-5a29-c86a-g9cc1de2396d",
    images: [
      "https://images.unsplash.com/photo-1553621042-f6e147245754?q=80&w=1450&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      "https://images.unsplash.com/photo-1636425730695-febe95eda12e?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1yZWxhdGVkfDN8fHxlbnwwfHx8fHw%3D",
      "https://images.unsplash.com/photo-1579584425555-c3ce17fd4351?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8c3VzaGl8ZW58MHx8MHx8fDA%3D",
    ],
    name: "Sushi Ginza Ishikawa",
    price_range: "4000 ~ 6000",
    featured: {
      text: "Top Sushi Restaurant in Tokyo",
      icon: "stars-02",
    },
  },
  {
    rating: 4.7,
    rating_count: 180,
    category: StoreCategory.RAMEN,
    city: "kyoto",
    desc: "Rich broth with a variety of toppings.",
    id: "7bd4f3e2-hf98-6b39-d87b-h0dd2ee2397e",
    images: [
      "https://images.unsplash.com/photo-1586190848861-99aa4a171e90?q=80&w=1887&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1618889482923-38250401a84e?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OHx8cmFtZW58ZW58MHx8MHx8fDA%3D",
      "https://images.unsplash.com/photo-1591814468924-caf88d1232e1?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1yZWxhdGVkfDl8fHxlbnwwfHx8fHw%3D",
    ],
    name: "Ichiran Ramen",
    price_range: "2000 ~ 4000",
    featured: {
      text: "Kyoto's Famous Ramen Spot",
      icon: "stars-02",
    },
  },
  {
    rating: 4.3,
    rating_count: 220,
    category: StoreCategory.TEMPURA,
    city: "nagoya",
    desc: "Crispy and delicious tempura.",
    id: "8ce5g4f3-jg09-7c40-e98c-i1ee3ff3408f",
    images: [
      "https://images.unsplash.com/photo-1593357849627-cbbc9fda6b05?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      "https://images.unsplash.com/photo-1602273660127-a0000560a4c1?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1yZWxhdGVkfDl8fHxlbnwwfHx8fHw%3D",
    ],
    name: "Tempura Matsuya",
    price_range: "3000 ~ 5000",
    featured: {
      text: "Best Tempura in Nagoya",
      icon: "stars-02",
    },
  },
  {
    rating: 4.6,
    rating_count: 190,
    category: StoreCategory.SOBA,
    city: "fukuoka",
    desc: "Chewy noodles with rich broth.",
    id: "9df6h5g4-kh10-8d41-f09d-j2ff4gg4519g",
    images: [
      "https://images.unsplash.com/photo-1636933242310-15d6318326f5?q=80&w=1374&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      "https://images.unsplash.com/photo-1657375624237-d1d1ce037c64?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1yZWxhdGVkfDV8fHxlbnwwfHx8fHw%3D",
    ],
    name: "Udon Taro",
    price_range: "2000 ~ 4000",
    featured: {
      text: "Fukuoka's Best Udon Restaurant",
      icon: "stars-02",
    },
  },
];

async function main() {
  console.log(`Start seeding ...`);

  // Clear existing data
  await prisma.favorite.deleteMany();
  await prisma.restaurant.deleteMany();

  // Seed restaurants
  for (const restaurant of restaurants) {
    const { id, ...data } = restaurant;
    await prisma.restaurant.create({
      data: {
        id,
        ...data,
        featured: data.featured as any,
      },
    });
  }

  // Add some favorites
  await prisma.favorite.create({
    data: {
      restaurantId: "4dc2e1d1-fe89-4a29-b86a-f8bb0ce1395d",
    },
  });

  await prisma.favorite.create({
    data: {
      restaurantId: "7bd4f3e2-hf98-6b39-d87b-h0dd2ee2397e",
    },
  });

  console.log(`Seeding finished.`);
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
