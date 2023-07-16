import Link from "next/link";
import Price from "../../components/Price";
import { RestaurantSearch } from "../page";

export default function RestaurantCard({
  restaurants,
}: {
  restaurants: RestaurantSearch;
}) {
  return (
    <div className="border-b flex pb-5 ml-4">
      <img
        src={`${restaurants.main_image}`}
        alt=""
        className="md:w-44 rounded sm:w-4"
      />
      <div className="pl-5">
        <h2 className="md:text-3xl sm:w-2">{restaurants.name}</h2>
        <div className="flex items-start">
          <div className="flex mb-2">*****</div>
          <p className="ml-2 text-sm">Awesome</p>
        </div>
        <div className="mb-9">
          <div className="font-light flex text-reg">
            <Price price={restaurants.price} />
            <p className="mr-4 capitalize">{restaurants.cuisine.name}</p>
            <p className="mr-4 capitalize">{restaurants.location.name}</p>
          </div>
        </div>
        <div className="text-red-600">
          <Link href={`/restaurant/${restaurants.slug}`}>
            View more information
          </Link>
        </div>
      </div>
    </div>
  );
}
