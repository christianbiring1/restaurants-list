// @ts-nocheck
import { z } from "zod";
import { publicProcedure, router } from "../trpc";
import { prisma } from "../prisma";

export const restaurantRouter = router({
  getAll: publicProcedure
    .input(
      z
        .object({
          category: z.string().optional(),
          search: z.string().optional(),
        })
        .optional()
    )
    .query(async ({ input }) => {
      const where = {
        ...(input?.category && input.category !== "entire"
          ? { category: input.category }
          : {}),
        ...(input?.search
          ? { name: { contains: input.search, mode: "insensitive" } }
          : {}),
      };

      console.log("categories >>>>>", input);

      const restaurants = await prisma.restaurant.findMany({
        where,
        include: {
          favorites: true,
        },
      });

      return restaurants.map((restaurant) => ({
        ...restaurant,
        isFavorite: restaurant.favorites.length > 0,
      }));
    }),

  toggleFavoriteRestaurant: publicProcedure
    .input(z.object({ id: z.string() }))
    .mutation(async ({ input }) => {
      const favorite = await prisma.favorite.findFirst({
        where: { restaurantId: input.id },
      });

      if (favorite) {
        await prisma.favorite.delete({
          where: { id: favorite.id },
        });
        return { isFavorite: false };
      } else {
        await prisma.favorite.create({
          data: { restaurantId: input.id },
        });
        return { isFavorite: true };
      }
    }),
});
