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

  rowSpace: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },

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
    fontSize: itemWidth * 0.05,
    textAlign: "center",
  },

  smallTxt: {
    textAlign: "center",
    fontSize: itemWidth * 0.034,
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
    zIndex: 999,
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
    height: itemWidth * 0.035,
    width: itemWidth * 0.035,
    borderRadius: 50,
    borderWidth: 2,
    borderColor: "#E3E3E3",
  },

  pinCon: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    width: itemWidth * 0.57,
    marginVertical: itemHeight * 0.06,
  },

  pinWrap: {
    width: "100%",
    flexDirection: "row",
    flexWrap: "wrap",
    gap: itemWidth * 0.06,
    justifyContent: "flex-end",
  },

  pinBtn: {
    width: itemWidth * 0.14,
    height: itemWidth * 0.14,
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
    paddingTop: itemHeight * 0.01,
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

  buyButton: {
    flexDirection: "row",
    gap: 5,
    alignItems: "center",
    backgroundColor: "rgba(236, 236, 236, 0.8)",
    padding: 2,
    paddingHorizontal: 4,
    borderRadius: 4,
  },

  btcOfferTxt: {
    fontSize: itemWidth * 0.075,
    width: itemWidth * 0.5,
    textAlign: "left",
    fontWeight: "500",
  },

  btcButton: {
    flexDirection: "row",
    borderWidth: 2,
    borderColor: "lightgrey",
    borderRadius: 10,
    borderLeftWidth: 0,
    paddingRight: 8,
    paddingVertical: 2,
    gap: 5,
  },

  btcImgCon: {
    backgroundColor: "#F9AA4B",
    width: 20,
    height: 20,
    borderRadius: 50,
    alignItems: "center",
    justifyContent: "center",
    padding: 6,
  },

  paymentMethodBox: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "lightgray",
    padding: 10,
    borderRadius: 10,
    gap: 10,
  },

  paymentMethodIconBox: {
    backgroundColor: "rgba(2, 156, 252, 0.71)",
    paddingHorizontal: 20,
    paddingVertical: 4,
    borderRadius: 10,
  },

  radio: {
    width: 15,
    height: 15,
    borderRadius: 50,
    borderWidth: 1,
    borderColor: "#333",
  },

  box: {
    backgroundColor: "white",
    padding: 10,
    gap: 6,
    width: "100%",
    paddingVertical: 15,
  },

  sideMenu: {
    backgroundColor: "white",
    elevation: 5,
    height: itemHeight * 0.4,
    width: itemWidth * 0.55,
    position: "absolute",
    zIndex: 999,
    top: 0,
  },

  textButton: {
    backgroundColor: colors.primary,
    color: "white",
    paddingHorizontal: 10,
    paddingVertical: 2,
    borderRadius: 4,
  },

  profileImg: {
    width: itemWidth * 0.2,
    height: itemWidth * 0.2,
    borderRadius: 50,
    borderWidth: 5,
    borderColor: '#CDEAFC'
  },
});
