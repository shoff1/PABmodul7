// import { Heading, Text, Center } from "@gluestack-ui/themed";
// import { Header } from "../components";
// import { useLocalSearchParams } from "expo-router";

// const NewsDetail = () => {
//   const params = useLocalSearchParams();
//   return (
//     <>
//       <Header title={"News"} withBack={true} />
//       <Center flex={1} padding={"$4"}>
//         <Heading>News Detail</Heading>
//         <Text textAlign="center">{params.title}</Text>
//       </Center>
//     </>
//   );
// };

// export default NewsDetail;

import {
  Box,
  Heading,
  Text,
  Image,
  Divider,
  ScrollView,
  Button,
  ButtonText,
} from "@gluestack-ui/themed";
import { Header } from "../components";
import { Link, useLocalSearchParams } from "expo-router";
import { format } from "date-fns";

const NewsDetail = () => {
  const params = useLocalSearchParams();
  return (
    <>
      <Header title={"News"} withBack={true} />
      <ScrollView>
        <Image
          source={{ uri: params.image }}
          w={"$full"}
          h={"$48"}
          alt="News Image"
          role="img"
        />
        <Box p={"$4"}>
          <Text mb={"$1"}>{format(new Date(params.date), "dd MMMM yyyy")}</Text>
          <Heading lineHeight={"$xl"} fontSize={"$2xl"}>
            {params.title}
          </Heading>
          <Divider my={"$4"} />
          <Text marginBottom={"$4"}>{params.desc}</Text>
          <Link
            href={{
              pathname: "/web",
              params: { link: params.link },
            }}
            asChild
          >
            <Button backgroundColor="$red700" borderRadius={"$full"}>
              <ButtonText>Read More</ButtonText>
            </Button>
          </Link>
        </Box>
      </ScrollView>
    </>
  );
};

export default NewsDetail;