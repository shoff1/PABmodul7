import { Center, ScrollView, Spinner } from "@gluestack-ui/themed";
import { useEffect, useState } from "react";
import CategoryButton from "./category-button";

const Categories = ({ onChange }) => {
  const [categories, setCategories] = useState([]);
  const [activeCategory, setActiveCategory] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  const categoryButtonHandler = (index) => {
    setActiveCategory(index);
    onChange(categories[index].name);
  };

  const getCategories = () => {
    fetch("https://api-berita-indonesia.vercel.app/")
      .then((response) => response.json())
      .then((json) => setCategories(json.endpoints[2].paths))
      .catch((error) => console.error(error))
      .finally(() => setIsLoading(false));
  };

  useEffect(() => {
    getCategories();
  }, []);

  return (
    <>
      {isLoading ? (
        <Center>
          <Spinner size={"large"} color={"$white"} />
        </Center>
      ) : (
        <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
          {categories.map((category, index) => {
            return (
              <CategoryButton
                title={category.name}
                isFirst={index == 0 ? true : false}
                isActive={index == activeCategory ? true : false}
                onPress={() => categoryButtonHandler(index)}
                key={index}
              />
            );
          })}
        </ScrollView>
      )}
    </>
  );
};

export default Categories;
