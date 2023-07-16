import { Item } from "@prisma/client";
import MenuCard from "./MenuCard";

export default function Menu({ menu }: { menu: Item[] }) {
  return (
    <main className="bg-white mt-5">
      <div>
        <div className="mt-4 pb-1 mb-1">
          <h1 className="font-bold text-4xl">Menu</h1>
        </div>

        {menu.length > 0 ? (
          menu.map((menu) => (
            <div className="flex flex-wrap justify-between">
              <MenuCard item={menu} key={menu.id} />
            </div>
          ))
        ) : (
          <div className="flex flex-wrap justify-between">
            <p>This restaurant doesn't have a menu at present.</p>
          </div>
        )}
      </div>
    </main>
  );
}
