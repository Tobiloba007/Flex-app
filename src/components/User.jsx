import { useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

const User = () => {
  const [user, setUser] = useState(null);
  const userId = "245";
  const userId2 = "246";

  const fetchData = async () => {
    try {
      const storedItems = await AsyncStorage.getItem("user_data");
      // console.log(storedItems);

      const parsedItems = JSON.parse(storedItems);
      setUser(parsedItems);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return { user, userId, userId2 };
};

export default User;
