import { View, Text, Dimensions } from "react-native";
import React, { useEffect, useState } from "react";
import { styles } from "../../constants/styles";
import { BASE_URL } from "../../config";

const itemWidth = Dimensions.get("window").width;

const CommentItem = ({ item }) => {
  const [userDet, setUserDet] = useState();

  useEffect(() => {
    const fetchUserDet = async () => {
      const formData = new FormData();
      formData.append("name", item?.user);

      try {
        const res = await fetch(`${BASE_URL}/profile.php`, {
          method: "POST",
          body: formData,
        });

        const data = await res.json();

        setUserDet(data?.data[0]);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchUserDet();
  }, []);

  return (
    <View
      style={[
        styles.chatBubbleRight,
        { maxWidth: itemWidth, alignSelf: "center", width: itemWidth * 0.85 },
      ]}
    >
      <Text
        style={[
          styles.smallTxt,
          {
            textAlign: "left",
            color: "#eee",
            marginBottom: 8,
            fontSize: itemWidth * 0.04,
            fontWeight: "500",
          },
        ]}
      >
        {userDet?.fname} {userDet?.lname}
      </Text>

      <Text className={`float-right ${"text-[#fff]"}`}>{item?.comment}</Text>
    </View>
  );
};

export default CommentItem;
