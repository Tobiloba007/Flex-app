import React, { useMemo, useCallback } from "react";
import { WebView } from "react-native-webview";
import { generateOnRampURL } from "@coinbase/cbpay-js";
import "react-native-url-polyfill/auto";

const CoinbaseWebView = ({ route, navigation }) => {
  const coinbaseURL = useMemo(() => {
    const { amount, address, project } = route.params;
  if (!amount || !address || !project) {
    return null;
  }
    const options = {
      appId: project.id,
      addresses: { [address]: [project.network] },
      assets: ["USDC"],
      handlingRequestedUrls: true,
      presetCryptoAmount: amount,
    };

    return generateOnRampURL(options);
  }, [route.params.amount, route.params.address, route.params.project]);
  const onMessage = useCallback((event) => {
    // console.log("onMessage", event.nativeEvent.data);
    try {
      const { data } = JSON.parse(event.nativeEvent.data);
      if (data.eventName === "request_open_url") {
        viewUrlInSecondWebview(data.url);
      }
    } catch (error) {
      console.error(error);
    }
  }, []);

  return <WebView source={{ uri: coinbaseURL ?? '' }} onMessage={onMessage} />;
};

export default CoinbaseWebView;
