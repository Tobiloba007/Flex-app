import {
  View,
  Text,
  SafeAreaView,
  Image,
  Dimensions,
  TextInput,
  Pressable,
  ScrollView,
  Alert,
  ActivityIndicator,
} from "react-native";
import React, { useEffect, useState } from "react";
import { styles } from "../../constants/styles";
import { Ionicons } from "@expo/vector-icons";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Entypo } from "@expo/vector-icons";
import { colors } from "../../../colors";
import { useNavigation } from "@react-navigation/native";
import * as ImagePicker from "expo-image-picker";
import { BASE_URL } from "../../config";
import axios from "axios";
import { launchImageLibrary } from "react-native-image-picker";

const itemWidth = Dimensions.get("window").width;
const itemHeight = Dimensions.get("window").height;

const EditProfile = () => {
  const [user, setUser] = useState();
  const [fname, setFname] = useState(user?.fname);
  const [lname, setLname] = useState(user?.lname);
  // const [email, setEmail] = useState("");
  const [phone, setPhone] = useState(user?.phone);
  const [instagram, setInstagram] = useState(user?.instagram);
  const [location, setLocation] = useState(user?.location);
  const [address, setAddress] = useState(user?.address);
  const [description, setDescription] = useState(user?.description);
  const [facebook, setFacebook] = useState(user?.facebook);
  const [twitter, setTwitter] = useState(user?.twitter);
  const [website, setWebsite] = useState(user?.website);
  const [image_url, setImage_url] = useState(null);
  const [image, setImage] = useState(null);

  const [loading, setLoading] = useState(false);
  const [userUpdated, setUserUpdated] = useState(false);

  const navigation = useNavigation();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const storedItems = await AsyncStorage.getItem("user_data");

        if (storedItems !== null) {
          const parsedItems = JSON.parse(storedItems);
          setUser(parsedItems);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();

    setUserUpdated(false);
  }, [userUpdated]);

  const pickImage = async () => {
    // let result = await ImagePicker.launchImageLibraryAsync({
    //   mediaTypes: ImagePicker.MediaTypeOptions.All,
    //   allowsEditing: true,
    //   aspect: [1, 2],
    //   quality: 1,
    //   base64: true,
    // });

    // if (!result?.canceled) {
    //   setImage_url(result?.assets[0]?.base64);
    //   setImage(result?.assets[0]?.uri);
    // }

    const result = await launchImageLibrary({
      mediaType: "photo",
      includeBase64: true,
    });

    if (!result?.canceled) {
      setImage_url(result?.assets[0]?.base64);
      setImage(result?.assets[0].uri);
    }
  };

  const getUserProfile = async () => {
    const formData = new FormData();
    formData.append("user_id", user?.id);

    try {
      const res = await fetch(`${BASE_URL}/account_details.php`, {
        method: "POST",
        body: formData,
      });

      const data = await res.json();

      const userData = data.data[0];
      console.log(userData);

      await AsyncStorage.setItem("user_data", JSON.stringify(userData)).then(
        () => {
          console.log("User data stored in AsyncStorage.");
        }
      );

      setUserUpdated(true);
    } catch (error) {
      console.log(error);
    }
  };

  const handleEditProfile = async () => {
    setLoading(true);

    const formData = new FormData();
    formData.append("email", user?.email);
    phone && formData.append("phone", phone);
    instagram && formData.append("instagram", instagram);
    location && formData.append("location", location);
    address && formData.append("address", address);
    description && formData.append("description", description);
    facebook && formData.append("facebook", facebook);
    twitter && formData.append("twitter", twitter);
    website && formData.append("website", website);
    image_url && formData.append("image_url", image_url);
    formData.append("previous_image", user?.image);

    const userData = {
      email: user?.email,
      phone,
      instagram,
      location,
      address,
      description,
      facebook,
      twitter,
      website,
      image_url,
    };

    try {
      // const res = await fetch(`${BASE_URL}/account_edit.php`, {
      //   method: "POST",
      //   headers: {
      //     "Content-Type": "application/json",
      //   },
      //   body: JSON.stringify(formData),
      // });

      // const data = await res.json();
      // console.log(data);

      const res = await axios.post(`${BASE_URL}/account_edit.php`, userData);

      // console.log(res.data);

      getUserProfile();
      Alert.alert("Profile updated successfully");

      setLoading(false);

      console.log(JSON.stringify(formData));
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  };

  useEffect(() => {
    if (image_url) {
      handleEditProfile();
    }
  }, [image_url]);

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "white" }}>
      <ScrollView>
        <View style={[styles.container, { padding: itemWidth * 0.06 }]}>
          <View
            style={[
              styles.column,
              { alignItems: "stretch", gap: itemHeight * 0.03 },
            ]}
          >
            <View style={styles.rowSpace}>
              <View style={styles.row}>
                <Ionicons
                  name="arrow-back-sharp"
                  size={24}
                  color="black"
                  onPress={() => navigation.goBack()}
                />

                <MaterialCommunityIcons
                  name="home-outline"
                  size={24}
                  color="black"
                  onPress={() => navigation.goBack()}
                />
              </View>

              <View style={styles.profileImg}>
                <Image
                  source={{ uri: image || user?.image }}
                  style={{ width: "100%", height: "100%", borderRadius: 50 }}
                />
                <Entypo
                  name="camera"
                  size={24}
                  color={colors.primary}
                  style={{
                    position: "absolute",
                    right: 0,
                    bottom: 0,
                    backgroundColor: "#CDEAFC",
                    padding: 2,
                  }}
                  onPress={pickImage}
                />
              </View>

              <View style={{ width: "25%" }}></View>
            </View>

            <Text style={styles.mediumTxt}>Edit Profile</Text>

            <View style={{ gap: itemHeight * 0.02 }}>
              <TextInput
                style={[
                  styles.input,
                  { backgroundColor: "#CDEAFC", borderRadius: 30 },
                ]}
                placeholder="First Name"
                defaultValue={`${user?.fname}`}
                onChangeText={(value) => setFname(value)}
                editable={false}
              />

              <TextInput
                style={[
                  styles.input,
                  { backgroundColor: "#CDEAFC", borderRadius: 30 },
                ]}
                placeholder="Last Name"
                defaultValue={`${user?.lname}`}
                onChangeText={(value) => setLname(value)}
                editable={false}
              />

              <TextInput
                style={[
                  styles.input,
                  { backgroundColor: "#CDEAFC", borderRadius: 30 },
                ]}
                placeholder="Email"
                editable={false}
                value={`${user?.email}`}
              />

              <TextInput
                style={[
                  styles.input,
                  { backgroundColor: "#CDEAFC", borderRadius: 30 },
                ]}
                placeholder="Phone"
                defaultValue={`${user?.phone}`}
                onChangeText={(value) => setPhone(value)}
              />

              <TextInput
                style={[
                  styles.input,
                  { backgroundColor: "#CDEAFC", borderRadius: 30 },
                ]}
                placeholder="Your Twitter link"
                defaultValue={user?.twitter || ""}
                onChangeText={(value) => setTwitter(value)}
              />

              <TextInput
                style={[
                  styles.input,
                  { backgroundColor: "#CDEAFC", borderRadius: 30 },
                ]}
                placeholder="Your Facebook link"
                defaultValue={user?.facebook || ""}
                onChangeText={(value) => setFacebook(value)}
              />

              <TextInput
                style={[
                  styles.input,
                  { backgroundColor: "#CDEAFC", borderRadius: 30 },
                ]}
                placeholder="Description"
                defaultValue={user?.description || ""}
                onChangeText={(value) => setDescription(value)}
              />

              <TextInput
                style={[
                  styles.input,
                  { backgroundColor: "#CDEAFC", borderRadius: 30 },
                ]}
                placeholder="Instagram"
                defaultValue={user?.instagram || ""}
                onChangeText={(value) => setInstagram(value)}
              />

              <TextInput
                style={[
                  styles.input,
                  { backgroundColor: "#CDEAFC", borderRadius: 30 },
                ]}
                placeholder="Location"
                defaultValue={user?.location || ""}
                onChangeText={(value) => setLocation(value)}
              />

              <Pressable
                onPress={handleEditProfile}
                style={[styles.button, { width: "100%", borderRadius: 30 }]}
              >
                {loading ? (
                  <ActivityIndicator color={colors.white} />
                ) : (
                  <Text style={styles.buttonTxt}>Save</Text>
                )}
              </Pressable>
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default EditProfile;
