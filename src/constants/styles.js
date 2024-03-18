import { Dimensions, StyleSheet } from "react-native";
import { colors } from "../../colors";

const itemHeight = Dimensions.get("window").height;
const itemWidth = Dimensions.get("window").width;

export const styles = StyleSheet.create({
  container: { height: "auto", flex: 1 },

  profileIcon: {
    height: itemWidth * 0.1,
    width: itemWidth * 0.1,
    borderRadius: 50,
    objectFit: "cover",
  },

  row: { flexDirection: "row", alignItems: "center", gap: 15 },

  circularBtn: {
    backgroundColor: colors.white,
    borderRadius: 100,
    alignItems: "center",
    justifyContent: "center",
    height: itemWidth * 0.11,
    width: itemWidth * 0.11,
    elevation: 5,
    shadowColor: "#ccc", // Optional: Shadow color
    shadowOffset: { width: 5, height: 5 }, // Spread - Adjust width and height for desired spread
    shadowOpacity: 0.5,
    shadowRadius: 5,
  },

  button: {
    borderRadius: 6,
    backgroundColor: colors.primary,
    justifyContent: "center",
    alignItems: "center",
    width: itemWidth * 0.6,
    height: itemHeight * 0.06,
  },

  buttonTxt: { color: colors.white, fontWeight: "700" },

  input: {
    height: itemHeight * 0.06,
    width: "100%",
    backgroundColor: "#9D9D9D21",
    color: "black",
    paddingHorizontal: 10,
    paddingVertical: 2,
    borderRadius: 6,
    fontWeight: "500",
  },

  column: {
    flexDirection: "column",
    alignItems: "center",
  },

  mediumTxt: {
    fontWeight: "900",
    fontSize: itemWidth * 0.055,
    textAlign: "center",
  },

  smallTxt: {
    textAlign: "center",
    fontSize: itemWidth * 0.035,
    fontWeight: "600",
  },

  channelUpload: {
    borderWidth: 2,
    borderColor: "gray",
    borderRadius: 100,
    width: itemWidth * 0.2,
    height: itemWidth * 0.2,
    flexDirection: "column",
    justifyContent: "center",
    marginTop: 30,
    gap: 4,
    borderStyle: "dashed",
  },

  bgImg: { height: itemHeight * 0.82, width: itemWidth, paddingHorizontal: 15 },

  chatBar: {
    backgroundColor: colors.white,
    height: itemHeight * 0.09,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    gap: 15,
    elevation: 5,
    shadowColor: "#ccc",
    shadowOffset: { width: 5, height: 5 },
    shadowOpacity: 0.5,
    shadowRadius: 5,
    paddingHorizontal: 16,
    borderBottomWidth: 0,
  },

  msgInputCon: {
    position: "absolute",
    bottom: 0,
    width: itemWidth,
    padding: 12,
    backgroundColor: colors.white,
    paddingHorizontal: 20,
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },

  // bottom nav
  bottomCon: {
    backgroundColor: colors.white,
    padding: 20,
    paddingHorizontal: 25,
    flexDirection: "row",
    position: "absolute",
    bottom: 0,
    width: itemWidth,
    elevation: 5,
    shadowColor: "#ccc",
    shadowOffset: { width: 5, height: 5 },
    shadowOpacity: 0.5,
    shadowRadius: 5,
    borderTopWidth: 1,
    borderTopColor: colors.soft,
    justifyContent: "space-between",
  },

  bottomItem: { alignItems: "center" },

  acceptBtn: {
    backgroundColor: colors.primary,
    width: "48%",
    textAlign: "center",
    padding: 4,
    borderRadius: 20,
    color: colors.white,
  },

  chatBubbleRight: {
    padding: 10,
    borderRadius: 15,
    backgroundColor: colors.primary,
    maxWidth: 280,
    alignSelf: "flex-end",
    marginTop: 4,
    marginBottom: 4,

    // Tail point styles
    borderTopRightRadius: 0,
    borderBottomRightRadius: 15,
  },

  chatBubbleLeft: {
    padding: 10,
    borderRadius: 15,
    backgroundColor: "lightgray",
    maxWidth: 280,
    alignSelf: "flex-start",
    marginTop: 4,
    marginBottom: 4,

    // Tail point styles
    borderTopLeftRadius: 0,
    borderBottomLeftRadius: 15,
  },

  pinInput: {
    height: 15,
    width: 15,
    borderRadius: 50,
    borderWidth: 2,
    borderColor: "#E3E3E3",
  },

  pinCon: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 26,
    justifyContent: "flex-end",
    alignItems: "center",
    width: "70%",
    marginTop: 70,
    marginBottom: 40,
  },

  pinBtn: {
    width: 60,
    height: 60,
    backgroundColor: "#E3E3E3",
    borderRadius: 50,
    alignItems: "center",
    justifyContent: "center",
  },

  LikeComCon: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 6,
    paddingTop: 12,
    paddingBottom: 4,
    gap: 20,
  },

  likeCon: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    backgroundColor: "rgba(0, 0, 0, 0.1)",
    paddingHorizontal: 10,
    paddingVertical: 2,
    borderRadius: 10,
  },
});
