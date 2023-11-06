import { useLocalSearchParams } from "expo-router";
import { Header } from "../components";
import { WebView } from "react-native-webview";
import { Spinner } from "@gluestack-ui/themed";

const Web = () => {
  const params = useLocalSearchParams();
  return (
    <>
      <Header title={"Read"} withBack={true} />
      <WebView
        source={{ uri: params.link }}
        startInLoadingState={true}
        renderLoading={() => <Spinner size={"large"} color={"$black"} />}
      />
    </>
  );
};

export default Web;