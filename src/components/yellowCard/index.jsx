import { WebView } from "react-native-webview";

const YellowCardWebView = ({ route, navigation }) => {
  return <WebView source={{ uri: route.params.yellowCardUrl ?? '' }} />;
};

export default YellowCardWebView;
