import Header from "./components/Header";
import RestaurantCard from "./components/RestaurantCard";
import { Metadata } from "next";
import { Cuisine, Location, PRICE, PrismaClient } from "@prisma/client";

export const metadata: Metadata = {
  title: "Open Table",
};

const prisma = new PrismaClient();

export interface RestaurantCardType {
  id: number;
  name: string;
  main_image: string;
  description: string;
  open_time: string;
  close_time: string;
  slug: string;
  cuisine: Cuisine;
  location: Location;
  price: PRICE;
}

const fetchRestaurants = async (): Promise<RestaurantCardType[]> => {
  const restaurants = await prisma.restaurant.findMany({
    select: {
      id: true,
      name: true,
      main_image: true,
      description: true,
      open_time: true,
      close_time: true,
      slug: true,
      cuisine: true,
      location: true,
      price: true,
    },
  });
  return restaurants;
};
export default async function Home() {
  const restaurants = await fetchRestaurants();
  //console.log({ restaurants });
  return (
    <>
      <main>
        <Header />
        <div className="py-3 px-36 mt-10 flex flex-wrap justify-center">
          {restaurants.map((restaurant) => (
            <RestaurantCard restaurant={restaurant} key={restaurant.id} />
          ))}
        </div>
      </main>
    </>
  );
}
