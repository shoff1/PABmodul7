import { Link } from "expo-router";
import { TouchableOpacity } from "react-native";
import { Box, Image, Text, Heading } from "@gluestack-ui/themed";
import { memo } from "react";
import { format } from "date-fns";

const NewsItem = ({ item }) => {
  const newsItem = {
    link: item.link,
    title: item.title,
    date: item.pubDate,
    desc: item.description.replace(/[^\w ]/g, ""),
    image: item.thumbnail,
  };
  return (
    <Link
      href={{
        pathname: "/news-detail",
        params: newsItem,
      }}
      asChild
    >
      <TouchableOpacity activeOpacity={0.5}>
        <Box
          p={"$4"}
          borderBottomColor={"$coolGray300"}
          borderBottomWidth={1}
          flexDirection="row"
          flex={1}
        >
          <Box flex={1} mr={"$4"}>
            <Image
              source={{ uri: item.thumbnail }}
              w="$full"
              h="$full"
              alt="Image Data"
              role="img"
            />
          </Box>
          <Box flex={1.8}>
            <Text fontSize={"$sm"}>
              {format(new Date(item.pubDate), "dd MMMM yyyy")}
            </Text>
            <Heading lineHeight={"$md"} fontSize={"$md"}>
              {item.title}
            </Heading>
          </Box>
        </Box>
      </TouchableOpacity>
    </Link>
  );
};

export default memo(NewsItem);


