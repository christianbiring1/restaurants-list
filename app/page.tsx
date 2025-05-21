// import { SearchBar } from "@/components/search-bar";
// import { CategoryFilter } from "@/components/category-filter";
// import { RestaurantList } from "@/components/restaurant-list";

import { SearchBar } from "./components/search-bar";
import { CategoryFilter } from "./components/category-filter";
import { RestaurantList } from "./components/restaurant-list";

export default function Home() {
  return (
    <main className="container mx-auto px-4 py-6">
      <div className="max-w-5xl mx-auto">
        <div className="mb-6">
          <SearchBar />
        </div>
        <div className="mb-6">
          <CategoryFilter />
        </div>
        <RestaurantList />
      </div>
    </main>
  );
}
