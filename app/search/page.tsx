import Header from "./components/Header";
import RestaurantCard from "./components/RestaurantCard";
import SearchSideBar from "./components/SearchSideBar";
import { Metadata } from "next";
import { Cuisine, Location, PRICE, PrismaClient } from "@prisma/client";

export const metadata: Metadata = {
  title: "Search Restaurant|Open Table",
};

export interface RestaurantSearch {
  id: number;
  name: string;
  main_image: string;
  price: PRICE;
  slug: string;
  location: Location;
  cuisine: Cuisine;
}

const prisma = new PrismaClient();

const fetchRestaurantByCity = async (
  city: string | undefined
): Promise<RestaurantSearch[]> => {
  if (!city)
    return prisma.restaurant.findMany({
      select: {
        id: true,
        name: true,
        main_image: true,
        price: true,
        slug: true,
        location: true,
        cuisine: true,
      },
    });
  return prisma.restaurant.findMany({
    where: {
      location: {
        name: {
          equals: city.toLowerCase(),
        },
      },
    },
    select: {
      id: true,
      name: true,
      main_image: true,
      price: true,
      slug: true,
      location: true,
      cuisine: true,
    },
  });
};

const fetchLocation = async () => {
  return prisma.location.findMany();
};
const fetchCuisine = async () => {
  return prisma.cuisine.findMany();
};

export default async function Search({
  searchParams,
}: {
  searchParams: { city?: string; cuisine?: string; price?: PRICE };
}) {
  const restaurant = await fetchRestaurantByCity(searchParams.city);
  const locations = await fetchLocation();
  const cuisines = await fetchCuisine();
  //console.log({ restaurant });
  //console.log({ locations });
  //console.log({ cuisines });
  return (
    <>
      <Header />
      <div className="flex py-4 m-auto sm:w-9/12 md:w-2/3 justify-between items-start">
        <SearchSideBar
          locations={locations}
          cuisines={cuisines}
          searchParameters={searchParams}
        />
        <div className="md:w-5/6">
          {restaurant.length ? (
            <>
              {restaurant.map((restaurant) => (
                <RestaurantCard restaurants={restaurant} />
              ))}
            </>
          ) : (
            <p className="text-2xl">No restaurant Found</p>
          )}
        </div>
      </div>
    </>
  );
}
