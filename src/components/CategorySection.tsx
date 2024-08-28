import {
  fetchCategoriesByType,
  fetchMediaByType,
  selectMediaByCategory,
} from "@/lib/utils";

import { Categories } from "./Categories";

export async function CategorySection({
  media,
}: {
  media: "tvShow" | "movie";
}) {
  const categories = await fetchCategoriesByType(media);
  const showsByCategory = await selectMediaByCategory(media);

  return (
    <Categories
      category={categories}
      showsByCategory={showsByCategory}
      media={media}
    />
  );
}
