import {
  View,
  Text,
  SafeAreaView,
  StyleSheet,
  Image,
  TextInput,
  TouchableOpacity,
  Pressable,
} from "react-native";
import React, { useState } from "react";
import { themeColors } from "../theme";
import { sendPasswordResetEmail } from "firebase/auth";
import { auth } from "../config/firebase";
import logo from "../assets/images/logobetter.png";
import { useNavigation } from "@react-navigation/native";
const ForgetPasswordScreen = () => {
  const [email, setEmail] = useState("");
  const [isPasswordReset, setIsPasswordReset] = useState(false);
  const navigation = useNavigation();
  const resetPassword = async () => {
    try {
      await sendPasswordResetEmail(auth, email);
      setIsPasswordReset(true);
    } catch (error) {
      alert(error)
    }
  };
  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <View style={styles.header}>
          <Image style={styles.logo} source={logo} />
          <Text style={styles.logoText}>مرشد</Text>
        </View>

        <View style={styles.inputContainer}>
          <Text style={styles.inputTitle}>كلمة المرور</Text>
          <TextInput
            style={styles.input}
            placeholder="البريد الالكتروني"
            placeholderTextColor="#fff"
            keyboardType="email-address"
            value={email}
            onChangeText={(e) => setEmail(e)}
          />
        </View>
        {isPasswordReset && (
          <View style={styles.passwordResetContainer}>
            <Text style={styles.sentLinkText}>
              تم إرسال رابط إعادة تعيين كلمة المرور لبريدك الإلكتروني بنجاح
            </Text>
          </View>
        )}
      </View>

      <View style={styles.bottomContainer}>
        <TouchableOpacity
          style={styles.button}
          disabled={!email}
          onPress={
            !isPasswordReset
              ? resetPassword
              : () => navigation.navigate("Login")
          }
        >
          <Text style={styles.buttonText}>
            {!isPasswordReset ? "استرجاع" : "تسجيل الدخول"}
          </Text>
        </TouchableOpacity>
        {!isPasswordReset && (
          <View style={styles.textContainer}>
            <Pressable onPress={() => navigation.navigate("Login")}>
              <Text style={styles.linkText}>تسجيل الدخول</Text>
            </Pressable>

            <Text style={styles.text}>لديك حساب؟ </Text>
          </View>
        )}
      </View>
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  container: {
    flex: 1,
    backgroundColor: themeColors.bg,
    paddingHorizontal: 20,
  },
  header: {
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 30,
    marginTop: 20,
  },
  logo: {
    objectFit: "contain",
    height: 70,
    width: 70,
  },
  logoText: {
    color: themeColors.lightb,
    fontSize: 25,
    fontWeight: "400",
  },
  inputContainer: {
    height: "28%",
    justifyContent: "center",
  },
  inputTitle: {
    fontSize: 22,
    color: "#fff",
    fontWeight: "300",
    textAlign: "center",
  },
  input: {
    backgroundColor: "rgba(238,238,238,0.2)",
    borderRadius: 8,
    padding: 12,
    marginTop: 50,
    color: "#fff",
  },
  bottomContainer: {
    height: "20%",
    width: "100%",
    position: "absolute",
    bottom: 0,
    paddingHorizontal: 20,
  },
  button: {
    backgroundColor: themeColors.lightb,
    padding: 13,
    borderRadius: 8,
    marginTop: 16,
    justifyContent: "center",
    alignItems: "center",
  },
  buttonText: {
    fontSize: 20,
    color: "#000",
  },
  textContainer: {
    flexDirection: "row",
    justifyContent: "center",
    paddingTop: 15,
  },
  linkText: {
    textDecorationLine: "underline",
    color: themeColors.lightb,
    fontSize: 17,
    fontWeight: "400",
  },
  text: {
    color: "#fff",
    fontSize: 17,
  },
  sentLinkText: {
    color: "#16a016",
    textAlign: "center",
    fontSize: 21,
  },
  passwordResetContainer: {
    paddingVertical: 10,
  },
});
export default ForgetPasswordScreen;
