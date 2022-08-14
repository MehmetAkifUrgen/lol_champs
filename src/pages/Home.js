import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  Button,
  TextInput,
  Image,
  FlatList,
  Share,
  ImageBackground,
  Platform,
  KeyboardAvoidingView,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { filter } from "lodash";
import { Animated } from "react-native";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import Swiper from "react-native-swiper";
import AppLoading from "expo-app-loading";
import { useFonts } from "expo-font";
import * as ScreenOrientation from "expo-screen-orientation";
import { Icon } from "react-native-elements";
import { Menu, Provider } from "react-native-paper";
import { useAsyncStorage } from "@react-native-async-storage/async-storage";
import { AdMobBanner } from "expo-ads-admob";
import Item from "../components/home/item";
import Heroes from "../components/home/heroes";
import Loading from "../components/home/loading";
import Modal from "react-native-modal";
import LanguageItem from "../components/LanguageItem";

export default function App({ navigation }) {
  let [fontsLoaded] = useFonts({
    josefin: require("../../assets/JosefinSans-Medium.ttf"),
  });

  const onShare = async () => {
    await Share.share({
      title: "App link",
      message: "https://sparc.world",
      url: "https://sparc.world",
    });
  };

  function getAccount() {
    
   
  }

  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerStyle: {
        backgroundColor: "black",
      },
      headerTintColor: "white",
      headerRight: () => menu(),
      headerLeft: () => (
        <Icon
          onPress={onShare}
          style={{ marginLeft: 10 }}
          name="share"
          color="white"
        />
      ),
    });
  }, [navigation]);

  const [data, setData] = useState([]);
  const [newData, setnewData] = useState([]);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [query, setQuery] = useState("");
  const [progress, setProgress] = useState(false);
  const startAnimated = new Animated.Value(0);
  const [version, setVersion] = useState([]);
  const opaAnimated = new Animated.Value(1);
  const [control, setControl] = useState(false);
  const icon = `http://ddragon.leagueoflegends.com/cdn/${version[0]}/img/champion/`;
  const [visible, setVisible] = useState(false);
  const [language, setLanguage] = useState("en_US");
  const { getItem, setItem } = useAsyncStorage("language");

  const openMenu = () => setVisible(true);

  const closeMenu = () => setVisible(false);

  const readItemFromStorage = async () => {
    const item = await getItem();
    setLanguage(item);
  };

  const writeItemToStorage = async (newValue) => {
    await setItem(newValue);
    setValue(newValue);
  };

  const getVersion = () => {
    fetch("https://ddragon.leagueoflegends.com/api/versions.json", {
      method: "GET",
    })
      .then((response) => response.json())
      .then((json) => {
        setVersion(json), setControl(true);
      })
      .catch((err) => {
        setIsLoading(false), setError(err);
      });
  };

  function menu() {
    return (
      <Icon
        style={styles.menuIcon}
        onPress={openMenu}
        size={wp("7%")}
        color="white"
        name="language"
      ></Icon>
    );
  }

  const getChampionsName = () => {
    fetch(
      `http://ddragon.leagueoflegends.com/cdn/${version[0]}/data/en_US/champion.json`,
      {
        method: "GET",
      }
    )
      .then((response) => response.json())
      .then((json) => {
        setData(json.data);
        setnewData(json.data), setIsLoading(false), setControl(true);
      })
      .catch((err) => {
        setIsLoading(false), setError(err);
      });
  };

  useEffect(() => {
    readItemFromStorage();
  }, []);

  async function normalYap() {
    await ScreenOrientation.lockAsync(
      ScreenOrientation.OrientationLock.PORTRAIT
    );
  }

  useEffect(() => {
    normalYap();
    getVersion();
    setIsLoading(true);
    getAccount
    if (version[0] != null) {
      getChampionsName();
    }
  }, [control]);

  if (isLoading) {
    return <Loading />;
  }

  if (error) {
    getChampionsName();
    setControl(true);
    setError(false);
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <Text style={{ fontSize: 18 }}>
          Error fetching data... Check your network connection!
        </Text>
      </View>
    );
  }

  const heroes = Object.values(data).map((value, index) => {
    return (
      <Heroes
        keys={index}
        defaultSource={require("../../assets/jarvan.jpg")}
        source={{
          uri: `http://ddragon.leagueoflegends.com/cdn/img/champion/splash/${
            value.length == 0
              ? "Jarvan"
              : Object.values(data)[
                  Math.floor(Math.random() * Object.values(data).length)
                ]["id"]
          }_0.jpg`,
        }}
      />
    );
  });

  const gonder = (champ, image) => {
    setQuery("");
    setControl(!control);
    setProgress(false);

    AsyncStorage.setItem("hero", champ).then(() => {
      // console.log("TOKEN ==>>", champ)
    });
    AsyncStorage.setItem("version", version[0]).then(() => {
      // console.log("TOKEN ==>>", version[0])
    });
    AsyncStorage.setItem("language", language).then(() => {
      // console.log("TOKEN ==>>", version[0])
    });

    navigation.navigate("Detail", { champ });
  };

  const renderItem = ({ item }) => {
    return (
      <Item
        onPress={() => gonder(item.id, item.image.full)}
        uri={`http://ddragon.leagueoflegends.com/cdn/img/champion/splash/${item.id}_0.jpg`}
        name={item.name}
      />
    );
  };

  const handleSearch = (text) => {
    const formattedQuery = text.toLowerCase();
    const filteredData = filter(Object.values(newData), (hero) => {
      return contains(hero, formattedQuery);
    });
    setData(filteredData);
    setQuery(text);
  };

  const contains = ({ id, name }, query) => {
    if (id.toLowerCase().includes(query)) {
      return true;
    }

    return false;
  };

  if (!fontsLoaded) {
    return <AppLoading />;
  } else {
    return (
      <Provider>
        <View style={styles.container}>
          {/* <ImageBackground
            style={styles.image_background}
            source={require("../../assets/splash.png")}
          ></ImageBackground> */}
          <Modal isVisible={visible}>
            <View
              style={{
                flex: 1,
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <LanguageItem
                text="English"
                onPress={() => {
                  setLanguage("en_US"), setVisible(false);
                }}
              />
              <LanguageItem
                text="Deutsch"
                onPress={() => {
                  setLanguage("de_De"), setVisible(false);
                }}
              />
              <LanguageItem
                text="Español"
                onPress={() => {
                  setLanguage("es_ES"), setVisible(false);
                }}
              />
              <LanguageItem
                text="Français"
                onPress={() => {
                  setLanguage("fr_FR"), setVisible(false);
                }}
              />
              <LanguageItem
                text="Türkçe"
                onPress={() => {
                  setLanguage("tr_TR"), setVisible(false);
                }}
              />
              <LanguageItem
                text="Italiano"
                onPress={() => {
                  setLanguage("it_IT"), setVisible(false);
                }}
              />
              <Button color={"red"} title="Close" onPress={closeMenu} />
            </View>
          </Modal>
          <KeyboardAvoidingView
            behavior={Platform.OS === "ios" ? "padding" : "height"}
            style={styles.text_Input_Viewport}
          >
            <TextInput
              value={query}
              onChangeText={(queryText) => handleSearch(queryText)}
              placeholder="Search"
              style={[styles.text_Input, { fontFamily: "josefin" }]}
            />
            <Icon
              style={styles.icon}
              onPress={() => {
                setQuery(""), setData(newData);
              }}
              name="times"
              type="font-awesome"
            ></Icon>
          </KeyboardAvoidingView>

          <FlatList
            contentContainerStyle={styles.flat_list}
            data={Object.values(data)}
            renderItem={renderItem}
            refreshing={true}
            keyExtractor={(item) => item.key}
            numColumns={1}
            horizontal={false}
            initialNumToRender={4}
          />
          
          <AdMobBanner
            bannerSize="fullBanner"
            adUnitID="ca-app-pub-7956816566156883/3507936293"
            servePersonalizedAds // true or false
          />
        </View>
      </Provider>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "black",
  },
  // header: {
  //   height: "25%",
  //   width: "100%",
  // },
  headerText: {
    color: "black",
    fontSize: 20,
  },
  input: {
    padding: 4,
    fontSize: 15,
    backgroundColor: "white",
    color: "#9642f7",
    borderWidth: 2,
    borderRadius: 10,
    borderColor: "#46c8fb",
  },
  hero: {
    width: wp("30%"),
    height: hp("25%"),
    marginHorizontal: "0.6%",
    alignItems: "center",
    marginBottom: "2%",
    justifyContent: "center",
  },
  text: {
    fontSize: hp("2%"),
    color: "white",
    textAlign: "center",
    width: wp("30%"),
  },
  flat_list: {
    justifyContent: "center",
    alignItems: "center",
  },
  text_Input: {
    backgroundColor: "#fff",
  },
  text_Input_Viewport: {
    marginHorizontal: "20%",
    marginTop: "4%",
    marginBottom: "4%",
    backgroundColor: "#fff",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",

    borderRadius: wp("1%"),
    borderWidth: 1,
    shadowColor: "black",
    elevation: 8,
  },
  image_background: {
    width: "100%",
    height: "100%",
    resizeMode: "cover",
    position: "absolute",
  },
  icon: {},
  menu: {
    position: "relative",
    zIndex: 100,
  },
  menuIcon: {
    width: wp("7%"),
    zIndex: 100,
  },
});
