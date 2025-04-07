import { Text, View, StyleSheet, Image } from "react-native";
import { colors } from "../utils/colors";
import { Ionicons } from "@expo/vector-icons";
import { useApi } from "../context/apiProvider";
import * as Sharing from "expo-sharing";
import * as FileSystem from "expo-file-system";
import { useState, useEffect } from "react";

//componenti
import SlashScreen from "./slashScreen";

export default function Profile() {
  const { currentUser } = useApi();
  const { attachments } = useApi();
  const [showSlash, setShowSlash] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowSlash(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  if (showSlash) {
    return <SlashScreen />;
  }

  //Per gestire il download
  const handleDownload = async (fileUrl) => {
    try {
      const fileName = fileUrl.split("/").pop(); 
      const localPath = FileSystem.documentDirectory + fileName;
      const downloadResult = await FileSystem.downloadAsync(
        fileUrl, 
        localPath 
      );
  
      //Per condividere
      if (await Sharing.isAvailableAsync()) {
        await Sharing.shareAsync(downloadResult.uri);
      } else {
        console.log("La condivisione non è disponibile su questo dispositivo");
      }
    } catch (error) {
      console.error("Errore durante il download/condivisione:", error);
    }
  };

  let star = <Ionicons name="star" size={20} color={colors.primary} />;
  let halfStar = <Ionicons name="star-half" size={20} color={colors.primary} />;
  let person = (
    <Ionicons name="person-circle-outline" size={20} color={colors.primary} />
  );
  let mail = <Ionicons name="mail-outline" size={20} color={colors.primary} />;
  let iban = (
    <Ionicons name="receipt-outline" size={20} color={colors.primary} />
  );

  return (
    <View>
      <Text style={styles.title}>Profilo</Text>
      <View style={styles.firstContainer}>
        <View style={styles.imageContainer}>
          <Image
            source={require("../../assets/photo-profile.png")}
            style={styles.image}
          />
        </View>
        <View style={styles.textContainer}>
          <Text style={styles.importantText}>Agente di riferimento</Text>
          <Text style={styles.text}>Giulio Bianchi</Text>
          <Text style={styles.text}>Milano, ITA</Text>
          <View style={styles.stars}>
            {star}
            {star}
            {star}
            {star}
            {halfStar}
          </View>
        </View>
      </View>
      <Text style={styles.title}>Dati personali</Text>
      <View style={styles.secondContainer}>
        <View style={styles.thirdContainer}>
          <Text style={styles.icon}>{person}</Text>
          <Text style={styles.text}>{currentUser.name}</Text>
        </View>
        <View style={styles.thirdContainer}>
          <Text style={styles.icon}>{mail}</Text>
          <Text style={styles.text}>{currentUser.email}</Text>
        </View>
        <View style={styles.thirdContainer}>
          <Text style={styles.icon}>{iban}</Text>
          <Text style={styles.text}>{currentUser.iban}</Text>
        </View>
      </View>
      <View style={styles.fourthContainer}>
        <Text style={styles.title}>Allegati</Text>
        {attachments.map((attachment, index) => (
          <View style={styles.attachment} key={index}>
            <Text style={styles.text}>{attachment.name}</Text>
            <Ionicons
              name="download-outline"
              size={20}
              color={colors.primary}
              onPress={() => handleDownload(attachment.url)}
            />
          </View>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  title: {
    fontSize: 25,
    fontWeight: "bold",
    color: colors.primary,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 80,
    textAlign: "center",
    marginBottom: 20,
  },
  firstContainer: {
    flexDirection: "row",
    marginTop: 20,
  },
  imageContainer: {
    flex: 1,
    alignItems: "center",
    marginLeft: 20,
  },
  image: {
    width: 130,
    height: 140,
    borderRadius: 65,
    elevation: 5
  },
  textContainer: {
    flex: 1,
    paddingTop: 10,
  },
  importantText: {
    fontSize: 20,
    fontWeight: "bold",
    color: colors.primary,
  },
  text: {
    fontSize: 15,
    fontWeight: "bold",
    marginVertical: 5,
    marginRight: 10,
  },
  stars: {
    flexDirection: "row",
    marginTop: 20,
  },
  secondContainer: {
    marginHorizontal: 20,
    paddingHorizontal: 20,
    justifyContent: "start",
    backgroundColor: colors.secondary,
    borderRadius: 15,
    width: "90%",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 7,
    },
    shadowOpacity: 0.25,
    shadowRadius: 10,
    elevation: 5,
  },
  thirdContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  icon: {
    marginRight: 7,
  },
  fourthContainer: {
    alignItems: "center",
  },
  attachment: {
    flexDirection: "row",
    alignItems: "center",
  },
});
