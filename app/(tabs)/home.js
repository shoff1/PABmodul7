// import { Heading, FlatList, Box, Text, Image } from "@gluestack-ui/themed";
// import { Header } from "../../components";
// import { ScrollView, TouchableOpacity } from "react-native";
// import datas from "../../datas";
// import { Link } from "expo-router";

// const Home = () => {
//   const renderitem = ({ item }) => {
//     return (
//       <Link
//         href={{
//           pathname: "/news-detail",
//           params: item,
//         }}
//         asChild
//       >
//         <TouchableOpacity activeOpacity={0.5}>
//           <Box
//             p={"$4"}
//             borderBottomColor={"$coolGray300"}
//             borderBottomWidth={1}
//             flexDirection="row"
//             flex={1}
//           >
//             <Box flex={1} mr={"$4"}>
//               <Image
//                 source={{ uri: item.image }}
//                 w="$full"
//                 h="$full"
//                 alt="Image Data"
//               />
//             </Box>
//             <Box flex={1.8}>
//               <Text fontSize={"$sm"}>{item.date}</Text>
//               <Heading lineHeight={"$md"} fontSize={"$md"}>
//                 {item.title}
//               </Heading>
//             </Box>
//           </Box>
//         </TouchableOpacity>
//       </Link>
//     );
//   };

//   return (
//     <>
//       <Header title={"News"} />
//       <Box py={"$4"} bg="$red700">
//         <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
//           {datas.slice(14).map((item, index) => {
//             return (
//               <Link
//                 href={{
//                   pathname: "/news-detail",
//                   params: item,
//                 }}
//                 key={index}
//                 asChild
//               >
//                 <TouchableOpacity activeOpacity={0.5}>
//                   <Box w={"$48"} mr={"$4"} ml={index == 0 ? "$4" : "0"}>
//                     <Image
//                       source={{ uri: item.image }}
//                       w="$full"
//                       alt="Image Data"
//                       mb={"$2"}
//                     />
//                     <Text fontSize={"$xs"} color="$textLight300">
//                       {item.date}
//                     </Text>
//                     <Heading
//                       fontSize={"$sm"}
//                       lineHeight={"$xs"}
//                       ellipsizeMode="tail"
//                       numberOfLines={2}
//                       color="$textLight50"
//                     >
//                       {item.title}
//                     </Heading>
//                   </Box>
//                 </TouchableOpacity>
//               </Link>
//             );
//           })}
//         </ScrollView>
//       </Box>
//       <FlatList
//         data={datas}
//         renderItem={renderitem}
//         keyExtractor={(item) => item.id}
//         showsVerticalScrollIndicator={false}
//       />
//     </>
//   );
// };

// export default Home;

import {
  Heading,
  FlatList,
  Box,
  Divider,
  Spinner,
  Center,
} from "@gluestack-ui/themed";
import { Categories, Header, NewsItem } from "../../components";
import { useEffect, useState } from "react";

const Home = () => {
  const [isLoadingNews, setIsLoadingNews] = useState(true);
  const [isFetching, setIsFetching] = useState(false);
  const [news, setNews] = useState([]);
  const [activeCategoryNews, setActiveCategoryNews] = useState("terbaru");

  const getNews = (categoryName) => {
    fetch(`https://api-berita-indonesia.vercel.app/cnn/${categoryName}/`)
      .then((response) => response.json())
      .then((json) => setNews(json.data.posts))
      .catch((error) => console.error(error))
      .finally(() => {
        setIsLoadingNews(false);
        setIsFetching(false);
      });
  };

  const categoriesHandler = (categoryName) => {
    setIsLoadingNews(true);
    setActiveCategoryNews(categoryName);
    getNews(categoryName);
  };

  useEffect(() => {
    getNews(activeCategoryNews);
  }, []);

  const onRefresh = () => {
    setIsFetching(true);
    getNews(activeCategoryNews);
  };

  const renderitem = ({ item }) => {
    return <NewsItem item={item} />;
  };

  return (
    <>
      <Header title={"News"} />
      <Box py={"$4"} bg={"$red700"}>
        <Heading ml={"$4"} lineHeight={"$lg"} mb={"$4"} color="$white">
          CNN Indonesia | Berita Terbaru, Terkini Indonesia dan Dunia
        </Heading>
        <Categories onChange={categoriesHandler} />
      </Box>
      <Divider />
      {isLoadingNews ? (
        <Center flex={1}>
          <Spinner size={"large"} color={"$black"} />
        </Center>
      ) : (
        <FlatList
          data={news}
          renderItem={renderitem}
          keyExtractor={(item) => item.link}
          showsVerticalScrollIndicator={false}
          refreshing={isFetching}
          onRefresh={onRefresh}
        />
      )}
    </>
  );
};

export default Home;