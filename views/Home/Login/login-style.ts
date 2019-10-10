import { StyleSheet } from "react-native";

export const loginStyle = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  },
  form: {
    flexDirection: "column",
    width: "100%",
    height: "100%",
    justifyContent: "center",
    alignItems: "center"
  },
  text: {
    height: 60,
    width: "75%",
    marginBottom: 15
  },
  buttons: {
    flexDirection: "row"
  },
  loginRegisterButton: {
    marginLeft: 4,
    marginRight: 4
  },
  title: {
    fontSize: 32,
    marginBottom: 32,
    fontWeight: 'bold',
    width: '100%',
    textAlign: 'center'
  }
});
