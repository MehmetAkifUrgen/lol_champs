import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  ActivityIndicator,
  Image,
  ScrollView,
  SafeAreaView,
  ImageBackground,
  TouchableOpacity,
  Animated,
  BackHandler,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Swiper from "react-native-swiper";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";

import { BarChart } from "react-native-chart-kit";
import * as ScreenOrientation from "expo-screen-orientation";
import { AdMobInterstitial, AdMobRewarded } from "expo-ads-admob";
import AppLoading from "expo-app-loading";
import { useFonts } from "expo-font";
import { Icon } from "react-native-elements";
import LinearGradient from "react-native-linear-gradient";

export default function Detail({ route, navigation }) {
  let [fontsLoaded] = useFonts({
    josefin: require("../../assets/JosefinSans-Medium.ttf"),
  });

  const [data, setData] = useState([]);
  const [deger, setValue] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [control, setControl] = useState(null);
  const [skin, setSkin] = useState([]);
  const headAnimated = new Animated.Value(0.7);
  const [kostum, setKostum] = useState(false);
  const [versions, setVersions] = useState("");
  const [much, setMuch] = useState([]);
  const getChampionsDetail = () => {
    AsyncStorage.getItem("hero", (error, value) => {
      AsyncStorage.getItem("version", (errorr, version) => {
        setVersions(version);
        AsyncStorage.getItem("language", (errorrr, language) => {
          if (!error) {
            setValue(value);
            if (value !== null) {
              if (language == null) {
                fetch(
                  `http://ddragon.leagueoflegends.com/cdn/${version}/data/en_US/champion/${value}.json`,
                  {
                    method: "GET",
                  }
                )
                  .then((response) => response.json())
                  .then((json) => {
                    setData(json.data),
                      setnewData(data[deger]),
                      setIsLoading(false),
                      setControl(true);
                  })
                  .catch((err) => {
                    setIsLoading(false), setError(err);
                  });
              } else {
                fetch(
                  `http://ddragon.leagueoflegends.com/cdn/${version}/data/${language}/champion/${value}.json`,
                  {
                    method: "GET",
                  }
                )
                  .then((response) => response.json())
                  .then((json) => {
                    setData(json.data),
                      setnewData(data[deger]),
                      setIsLoading(false),
                      setControl(true);
                  })
                  .catch((err) => {
                    setIsLoading(false), setError(err);
                  });
              }
            }
          }
        });
      });
    });
  };

  React.useLayoutEffect(() => {
    if(kostum){
      navigation.setOptions({
        headerShown:false
      })
    }
    else {
      navigation.setOptions({
       headerStyle:{
         backgroundColor:'black'
       },
       headerTintColor:'white',
        title: data.length==0 ? "Loading" :  data[deger].name,
        headerRight: () => (
          <TouchableOpacity
            onPress={() => setKostum(true)}
            style={{
              justifyContent: "center",
              alignItems: "center",
              marginRight:5
            }}
          >
            <Text
              style={{
                color: "white",
                fontSize: hp("2%"),
                fontFamily: "josefin",
              }}
            >
              Skins
            </Text>
          </TouchableOpacity>
        ),
      });
    }
    
   
    
  }, [navigation,data,kostum]);

  async function changeScreenOrientation() {
    await ScreenOrientation.lockAsync(
      ScreenOrientation.OrientationLock.LANDSCAPE
    );
  }
  async function odul() {
    await AdMobInterstitial.setAdUnitID(
      "ca-app-pub-7956816566156883/7255609618"
    );
    await AdMobInterstitial.requestAdAsync({ servePersonalizedAds: true });
    await AdMobInterstitial.showAdAsync();
  }
  async function normalYap() {
    await ScreenOrientation.lockAsync(
      ScreenOrientation.OrientationLock.PORTRAIT
    );
  }
  const gecis = async () => {
    await AdMobInterstitial.setAdUnitID(
      "ca-app-pub-7956816566156883/1548676078"
    );
    await AdMobInterstitial.requestAdAsync({ servePersonalizedAds: true });
    await AdMobInterstitial.showAdAsync();
  };

  const headAnimations = () => {
    Animated.timing(headAnimated, {
      toValue: 1,
      duration: 8000,
      useNativeDriver: false,
    }).start();
  };

  useEffect(() => {
    setIsLoading(true);
    getChampionsDetail();
  }, []);
  useEffect(() => {
    headAnimations();
  });

  if (isLoading) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" color="black" />
      </View>
    );
  }

  if (error) {
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

  if (kostum) {
    odul();
    BackHandler.addEventListener("hardwareBackPress", function () {
      setKostum(false);
    });

    changeScreenOrientation();

    const costum = data[deger].skins.map((value, index) => {
      skin.push(value.num);

      return (
        <View
          style={{
            flex: 1,
            flexDirection: "column",
            justifyContent: "flex-end",
          }}
          key={index}
        >
          <Image
            style={{ width: "100%", height: "100%", position: "absolute" }}
            resizeMode="stretch"
            source={{
              uri: `http://ddragon.leagueoflegends.com/cdn/img/champion/splash/${deger}_${value.num}.jpg`,
            }}
          ></Image>
          {/* <Icon
            style={{
              alignItems: "flex-start",
              zIndex: 2,
              marginTop: hp("4%"),
              marginLeft: wp("4%"),
              width: hp("6%"),
            }}
            name="arrow-circle-left"
            type="font-awesome"
            color="black"
            size={hp("6%")}
            onPress={() => setKostum(false)}
          /> */}
          <View
            style={{
              alignItems: "center",
              zIndex: 3,
              position: "relative",
              marginBottom: hp("2%"),
            }}
          >
            <Text
              style={{
                color: "white",
                fontSize: hp("3%"),
                fontFamily: "josefin",
              }}
            >
              {" "}
              {value.name == "default" ? deger : value.name}
            </Text>
          </View>
        </View>
      );
    });
    return (
      <Swiper showsButtons={true} showsPagination={false}>
        {costum}
      </Swiper>
    );
  }

  if (control) {
    data[deger].skins.map((value, index) => {
      skin.push(value.num);
    });

    normalYap();

    const rol = data[deger].tags.map((index) => {
      const icon = {
        Assassin: require("../../assets/Assassin.png"),
        Fighter: require("../../assets/Fighter.png"),
        Mage: require("../../assets/Mage.png"),
        Marksman: require("../../assets/Marksman.png"),
        Support: require("../../assets/Support.png"),
        Tank: require("../../assets/Tank.png"),
      };
      var index1 = "";
      index == "Mage" ? (index1 = "Mage") : null;
      index == "Assassin" ? (index1 = "Assasin") : null;
      index == "Marksman" ? (index1 = "Marksman") : null;
      index == "Support" ? (index1 = "Support") : null;
      index == "Tank" ? (index1 = "Tank") : null;
      index == "Fighter" ? (index1 = "Fighter") : null;
      return (
        <View
          key={index}
          style={{
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            marginTop: hp("2%"),
            marginHorizontal: wp("3%"),
          }}
        >
          <Text
            style={{
              color: "white",
              fontSize: hp("2%"),
              fontFamily: "josefin",
            }}
          >
            {" "}
            {index1}{" "}
          </Text>
          <Image
            style={{ width: 50, height: 50 }}
            resizeMode="stretch"
            source={icon[index]}
          ></Image>
        </View>
      );
    });
    const datas = {
      labels: ["ATTACK", "DEFENSE", "MAGIC", "DIFFUCULTY"],
      datasets: [
        {
          data: [
            data[deger].info.attack * 10,
            data[deger].info.defense * 10,
            data[deger].info.magic * 10,
            data[deger].info.difficulty * 10,
          ],
        },
      ],
    };
    const dot = () => {
      return <View style={styles.dot}></View>;
    };

    if (!fontsLoaded) {
      return <AppLoading />;
    } else {
      var e_skill = data[deger].spells[2].description;
      var e_skill_replace = e_skill.replace(/<br><br>/g, ""); //replace every "like" with blank ""
      var q_skill = data[deger].spells[0].description;
      var q_skill_replace = q_skill.replace(/<br><br>/g, ""); //replace every "like" with blank ""
      var w_skill = data[deger].spells[1].description;
      var w_skill_replace = w_skill.replace(/<br><br>/g, ""); //replace every "like" with blank ""
      var r_skill = data[deger].spells[3].description;
      var r_skill_replace = r_skill.replace(/<br><br>/g, ""); //replace every "like" with blank ""
      var p_skill = data[deger].passive.description;
      var p_skill_replace = p_skill.replace(/<br><br>/g, ""); //replace every "like" with blank ""
      r_skill_replace = r_skill_replace.replace(/<keywordMajor>/g, "");
      r_skill_replace = r_skill_replace.replace("</keywordMajor>", "");
      w_skill_replace = w_skill_replace.replace(`<font color='#9b0f5f'>`, "");
      w_skill_replace = w_skill_replace.replace(`</font>`, "");
      p_skill_replace = p_skill_replace.replace(`<font color='#9b0f5f'>`, "");
      p_skill_replace = p_skill_replace.replace(`</font>`, "");
      q_skill_replace = q_skill_replace.replace(/<br>/g, "");
      var s_skill = data[deger].lore;
      var s_skill_replace = s_skill.replace(/<i>/g, ""); //replace every "like" with blank ""
      s_skill_replace = s_skill_replace.replace("</i>", "");
      e_skill_replace = e_skill_replace.replace("<OnHit>", "");
      e_skill_replace = e_skill_replace.replace("</OnHit>", "");
      p_skill_replace = p_skill_replace.replace(`<font color='#669900'>`, "");
      p_skill_replace = p_skill_replace.replace(`<font color='#669900'>`, "");
      p_skill_replace = p_skill_replace.replace(`</font>`, "");
      e_skill_replace = e_skill_replace.replace(`<font color='#669900'>`, "");
      e_skill_replace = e_skill_replace.replace(`</font>`, "");
      e_skill_replace = e_skill_replace.replace(`<font color='#FFFFFF'>`, "");
      p_skill_replace = p_skill_replace.replace(`<font color='#FFF673'>`, "");
      q_skill_replace = q_skill_replace.replace(`<font color='#FFF673'>`, "");
      w_skill_replace = w_skill_replace.replace(`<font color='#FFF673'>`, "");
      p_skill_replace = p_skill_replace.replace(`<font color='#fe5c50'>`, "");
      p_skill_replace = p_skill_replace.replace(`<font color='#8484fb'>`, "");
      p_skill_replace = p_skill_replace.replace(`<font color='#fe5c50'>`, "");
      p_skill_replace = p_skill_replace.replace(`<font color='#8484fb'>`, "");
      p_skill_replace = p_skill_replace.replace(`</font>`, "");
      p_skill_replace = p_skill_replace.replace(`</font>`, "");
      p_skill_replace = p_skill_replace.replace(`<font color='#FFF673'>`, "");
      q_skill_replace = q_skill_replace.replace(`<font color='#00DD33'>`, "");
      q_skill_replace = q_skill_replace.replace(`<font color='#FFF673'>`, "");
      q_skill_replace = q_skill_replace.replace(`</font>`, "");
      q_skill_replace = q_skill_replace.replace(`</font>`, "");
      q_skill_replace = q_skill_replace.replace(`</font>`, "");
      w_skill_replace = w_skill_replace.replace(`<font color='#00DD33'>`, "");
      w_skill_replace = w_skill_replace.replace(`</font>`, "");
      e_skill_replace = e_skill_replace.replace(`< color='#00DD33'>`, "");
      r_skill_replace = r_skill_replace.replace(`<font color='#91d7ee'>`, "");
      r_skill_replace = r_skill_replace.replace(`<font color='#91d7ee'>`, "");
      r_skill_replace = r_skill_replace.replace(`<font color='#00DD33'>`, "");
      r_skill_replace = r_skill_replace.replace(`</font>`, "");
      r_skill_replace = r_skill_replace.replace(`</font>`, "");
      r_skill_replace = r_skill_replace.replace(`</font>`, "");
      w_skill_replace = w_skill_replace.replace(`<br>`, "");
      e_skill_replace = e_skill_replace.replace(`<br>`, "");
      w_skill_replace = w_skill_replace.replace(`<font color='#91d7ee'>`, "");
      p_skill_replace = p_skill_replace.replace(`<font color='#ee91d7'>`, "");
      p_skill_replace = p_skill_replace.replace("<scaleArmor>", "");
      p_skill_replace = p_skill_replace.replace("</scaleArmor>", "");
      p_skill_replace = p_skill_replace.replace("<scaleMR>", "");
      p_skill_replace = p_skill_replace.replace("</scaleMR>", "");
      q_skill_replace = q_skill_replace.replace("<magicDamage>", "");
      q_skill_replace = q_skill_replace.replace("</magicDamage>", "");
      q_skill_replace = q_skill_replace.replace("<spellName>", "");
      q_skill_replace = q_skill_replace.replace("</spellName>", "");
      q_skill_replace = q_skill_replace.replace("<spellName>", "");
      q_skill_replace = q_skill_replace.replace("</spellName>", "");
      w_skill_replace = w_skill_replace.replace("<spellPassive>", "");
      w_skill_replace = w_skill_replace.replace("</spellPassive>", "");
      w_skill_replace = w_skill_replace.replace("<scaleArmor>", "");
      w_skill_replace = w_skill_replace.replace("</scaleArmor>", "");
      w_skill_replace = w_skill_replace.replace("<scaleMR>", "");
      w_skill_replace = w_skill_replace.replace("</scaleMR>", "");
      w_skill_replace = w_skill_replace.replace("<spellActive>", "");
      w_skill_replace = w_skill_replace.replace("</spellActive>", "");
      w_skill_replace = w_skill_replace.replace("<li>", "");
      w_skill_replace = w_skill_replace.replace("<li>", "");
      w_skill_replace = w_skill_replace.replace("</li>", "");
      w_skill_replace = w_skill_replace.replace("</li>", "");
      e_skill_replace = e_skill_replace.replace("<scaleArmor>", "");
      e_skill_replace = e_skill_replace.replace("</scaleArmor>", "");
      e_skill_replace = e_skill_replace.replace("<scaleMR>", "");
      e_skill_replace = e_skill_replace.replace("</scaleMR>", "");
      e_skill_replace = e_skill_replace.replace("<status>", "");
      e_skill_replace = e_skill_replace.replace("</status>", "");
      r_skill_replace = r_skill_replace.replace("<status>", "");
      r_skill_replace = r_skill_replace.replace("</status>", "");
      r_skill_replace = r_skill_replace.replace("<status>", "");
      r_skill_replace = r_skill_replace.replace("</status>", "");
      r_skill_replace = r_skill_replace.replace("<magicDamage>", "");
      r_skill_replace = r_skill_replace.replace("</magicDamage>", "");
      p_skill_replace = p_skill_replace.replace(`<font color='#BBFFFF'>`, "");
      r_skill_replace = r_skill_replace.replace(`<font color='#cd90ee'>`, "");
      p_skill_replace = p_skill_replace.replace("<mainText>", "");
      p_skill_replace = p_skill_replace.replace("</mainText>", "");
      p_skill_replace = p_skill_replace.replace("<status>", "");
      p_skill_replace = p_skill_replace.replace("</status>", "");
      p_skill_replace = p_skill_replace.replace("<status>", "");
      p_skill_replace = p_skill_replace.replace("</status>", "");
      p_skill_replace = p_skill_replace.replace("<status>", "");
      p_skill_replace = p_skill_replace.replace("</status>", "");
      q_skill_replace = q_skill_replace.replace(`<font color='#FF3300'>`, "");
      w_skill_replace = w_skill_replace.replace(`<font color='#FF3300'>`, "");
      e_skill_replace = e_skill_replace.replace(`<font color='#FF3300'>`, "");
      p_skill_replace = p_skill_replace.replace("<passive>", "");
      p_skill_replace = p_skill_replace.replace("</passive>", "");
      p_skill_replace = p_skill_replace.replace("<passive>", "");
      p_skill_replace = p_skill_replace.replace("</passive>", "");
      p_skill_replace = p_skill_replace.replace("<i>", "");
      p_skill_replace = p_skill_replace.replace("</i>", "");
      p_skill_replace = p_skill_replace.replace("<i>", "");
      p_skill_replace = p_skill_replace.replace("</i>", "");
      p_skill_replace = p_skill_replace.replace(`<font color='#FF9900'>`, "");
      p_skill_replace = p_skill_replace.replace(`<font color='#FF9900'>`, "");
      p_skill_replace = p_skill_replace.replace(`<font color='#FF9900'>`, "");
      p_skill_replace = p_skill_replace.replace(`<font color='#FF9900'>`, "");
      p_skill_replace = p_skill_replace.replace("<br>", "");
      p_skill_replace = p_skill_replace.replace("<br>", "");
      p_skill_replace = p_skill_replace.replace("<br>", "");
      e_skill_replace = e_skill_replace.replace("<passive>", "");
      e_skill_replace = e_skill_replace.replace("</passive>", "");
      e_skill_replace = e_skill_replace.replace("<active>", "");
      e_skill_replace = e_skill_replace.replace("</active>", "");
      p_skill_replace = p_skill_replace.replace("<speed>", "");
      p_skill_replace = p_skill_replace.replace("</speed>", "");
      p_skill_replace = p_skill_replace.replace("<keywordName>", "");
      p_skill_replace = p_skill_replace.replace("</keywordName>", "");
      q_skill_replace = q_skill_replace.replace("<OnHit>", "");
      q_skill_replace = q_skill_replace.replace("</OnHit>", "");
      q_skill_replace = q_skill_replace.replace("<status>", "");
      q_skill_replace = q_skill_replace.replace("</status>", "");
      p_skill_replace = p_skill_replace.replace(`<font color='#C200E1'>`, "");
      q_skill_replace = q_skill_replace.replace(`<font color='#6655CC'>`, "");
      e_skill_replace = e_skill_replace.replace(`<font color='#99FF99'>`, "");
      r_skill_replace = p_skill_replace.replace("<factionIonia1>", "");
      r_skill_replace = p_skill_replace.replace("</factionIonia1>", "");
      w_skill_replace = w_skill_replace.replace(`<font color='#FF9900'>`, "");
      w_skill_replace = w_skill_replace.replace(`<font color='#FF9900'>`, "");
      w_skill_replace = w_skill_replace.replace(`<font color='#FF9900'>`, "");
      w_skill_replace = w_skill_replace.replace(`<font color='#FF9900'>`, "");
      p_skill_replace = p_skill_replace.replace(`<physicalDamage>`, "");
      p_skill_replace = p_skill_replace.replace(`</physicalDamage>`, "");
      r_skill_replace = r_skill_replace.replace(`<physicalDamage>`, "");
      r_skill_replace = r_skill_replace.replace(`</physicalDamage>`, "");
      return (
        <View style={styles.container}>
          <View style={styles.header}>
            <Animated.Image
              style={{
                width: "96%",
                height: "100%",
                position: "absolute",
                borderRadius:25,
                transform: [{ scale: headAnimated }],
              }}
              resizeMode="stretch"
              source={{
                uri: `http://ddragon.leagueoflegends.com/cdn/img/champion/splash/${deger}_1.jpg`,
              }}
            ></Animated.Image>
            {/* <Icon
              style={{
                alignItems: "flex-start",
                justifyContent: "flex-start",
                zIndex: 2,
                marginTop: hp("4%"),
                marginLeft: wp("4%"),
                width: wp("8%"),
              }}
              name="arrow-circle-left"
              color="black"
              size={wp("8%")}
              type="font-awesome"
              onPress={() => navigation.navigate("Home")}
            /> */}
          </View>

          <Swiper activeDotColor="white" dot={dot()} style={styles.wrapper}>
            <ScrollView style={{flex:1, marginBottom:'10%'}}>
              {/* <ImageBackground
                style={{
                  width: "100%",
                  height: "100%",
                  position: "absolute",
                  opacity: 0.3,
                }}
                resizeMode="cover"
                source={{
                  uri: `http://ddragon.leagueoflegends.com/cdn/img/champion/loading/${deger}_${
                    skin[skin.length - 1]
                  }.jpg`,
                }}
              ></ImageBackground> */}
              <View style={styles.info}>
                

                <View style={{ flexDirection: "row" }}>{rol}</View>
                <View
                  style={{
                    alignItems: "center",
                    marginTop: hp("2%"),
                    backgroundColor: "black",
                    padding: 10,
                    borderRadius: 10,
                  }}
                >
                  <Text
                    style={{
                      color: "white",
                      fontFamily: "josefin",
                      textDecorationLine: "underline",
                      fontSize: hp("2%"),
                    }}
                  >
                    Story
                  </Text>
                  <Text
                    style={{
                      color: "white",
                      textAlign: "justify",
                      fontSize: hp("2%"),
                      marginTop: hp("2%"),
                      fontFamily: "josefin",
                    }}
                  >
                    {" "}
                    {s_skill_replace}{" "}
                  </Text>
                </View>

                <View
                  style={{
                    alignItems: "center",
                    marginTop: hp("2%"),
                    backgroundColor: "black",
                    padding: 10,
                    borderRadius: 10,
                  }}
                >
                  <Text
                    style={{
                      color: "white",
                      fontFamily: "josefin",
                      textDecorationLine: "underline",
                      fontSize: hp("2%"),
                    }}
                  >
                    If You Play
                  </Text>
                  <Text
                    style={{
                      color: "white",
                      textAlign: "justify",
                      fontSize: hp("2%"),
                      marginTop: hp("2%"),
                      fontFamily: "josefin",
                    }}
                  >
                    {" "}
                    {data[deger].allytips}{" "}
                  </Text>
                </View>
                <View
                  style={{
                    alignItems: "center",
                    marginTop: hp("2%"),
                    backgroundColor: "black",
                    padding: 10,
                    borderRadius: 10,
                  }}
                >
                  <Text
                    style={{
                      color: "white",
                      fontFamily: "josefin",
                      textDecorationLine: "underline",
                      fontSize: hp("2%"),
                    }}
                  >
                    If Againist to Play
                  </Text>
                  <Text
                    style={{
                      color: "white",
                      textAlign: "justify",
                      fontSize: hp("2%"),
                      marginTop: hp("2%"),
                      fontFamily: "josefin",
                    }}
                  >
                    {" "}
                    {data[deger].enemytips}{" "}
                  </Text>
                </View>
              </View>
            </ScrollView>

            <View
              style={{
                flex: 1,
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              {/* <ImageBackground
                style={{
                  width: "100%",
                  height: "100%",
                  position: "absolute",
                  opacity: 0.3,
                }}
                resizeMode="cover"
                source={{
                  uri: `http://ddragon.leagueoflegends.com/cdn/img/champion/splash/${deger}_${
                    skin[skin.length - 2]
                  }.jpg`,
                }}
              ></ImageBackground> */}
              <BarChart
                data={datas}
                width={wp("100%")}
                height={hp("60%")}
                withHorizontalLabels={false}
                fromZero={true}
                withInnerLines={false}
                chartConfig={{
                  backgroundGradientToOpacity: 0.7,
                  backgroundGradientFrom: "darkblue",
                  backgroundGradientTo: "darkred",
                  backgroundGradientFromOpacity: 0.4,
                  fillShadowGradientOpacity: 0.7,

                  color: (opacity = 0.1) => `rgba(255, 255, 255, ${opacity})`,
                  labelColor: (opacity = 0.1) =>
                    `rgba(255, 255, 255, ${opacity})`,
                }}
              />
            </View>
            <ScrollView style={{ flex: 1 ,marginBottom:'10%'}}>
              {/* <ImageBackground
                style={{
                  width: "100%",
                  height: "100%",
                  position: "absolute",
                  opacity: 0.3,
                }}
                resizeMode="cover"
                source={{
                  uri: `http://ddragon.leagueoflegends.com/cdn/img/champion/splash/${deger}_${
                    skin[skin.length - 3]
                  }.jpg`,
                }}
              ></ImageBackground> */}
              <View style={{ marginTop: hp("3%"), padding: wp("2.5%") }}>
                <View
                  style={{
                    flexDirection: "row",
                    width: wp("96%"),
                    alignItems: "center",
                    height: hp("15%"),
                    justifyContent: "space-around",
                  }}
                >
                  <Image
                    resizeMode="stretch"
                    style={{
                      width: wp("14%"),
                      height: hp("8%"),
                      borderRadius: 10,
                    }}
                    source={{
                      uri: `http://ddragon.leagueoflegends.com/cdn/${versions}/img/passive/${data[deger].passive.image.full}`,
                    }}
                  ></Image>
                  <View style={[styles.skills, { justifyContent: "center" }]}>
                    <Text
                      style={[
                        styles.specsText,
                        { fontFamily: "josefin", color: "#ffe5b4" },
                      ]}
                    >
                      {" "}
                      Passive{" "}
                    </Text>
                  </View>
                  <View style={[styles.skills, { justifyContent: "center" }]}>
                    <Text
                      style={[
                        styles.specsText,
                        { textAlign: "center", fontFamily: "josefin" },
                      ]}
                    >
                      {" "}
                      {data[deger].passive.name}{" "}
                    </Text>
                  </View>
                  <View style={[styles.skills, { justifyContent: "center" }]}>
                    <Text
                      style={[
                        styles.specsText,
                        { fontFamily: "josefin", color: "#ffe5b4" },
                      ]}
                    >
                      {" "}
                      {data[deger].name}{" "}
                    </Text>
                  </View>
                </View>
                <Text
                  style={[
                    styles.specsText,
                    { fontFamily: "josefin", textAlign: "justify" },
                  ]}
                >
                  {" "}
                  {p_skill_replace}{" "}
                </Text>
              </View>
              <View style={{ marginTop: hp("3%"), padding: wp("2.5%") }}>
                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "space-around",
                    width: wp("96%"),
                    alignItems: "center",
                    height: hp("15%"),
                  }}
                >
                  <Image
                    resizeMode="stretch"
                    style={{
                      width: wp("14%"),
                      height: hp("8%"),
                      borderRadius: 10,
                    }}
                    source={{
                      uri: `http://ddragon.leagueoflegends.com/cdn/${versions}/img/spell/${data[deger].spells[0].id}.png`,
                    }}
                  ></Image>
                  <View style={[styles.skills]}>
                    <Text
                      style={[
                        styles.specsText,
                        { fontFamily: "josefin", color: "#ffe5b4" },
                      ]}
                    >
                      {" "}
                      Q{" "}
                    </Text>
                    <Text
                      style={[
                        styles.specsText,
                        { textAlign: "center", fontFamily: "josefin" },
                      ]}
                    >
                      {" "}
                      {data[deger].spells[0].name}{" "}
                    </Text>
                  </View>

                  <View style={[styles.skills]}>
                    <Text style={[styles.specsText, { fontFamily: "josefin" }]}>
                      Cooldown
                    </Text>
                    <Text
                      style={[
                        styles.specsText,
                        { textAlign: "center", fontFamily: "josefin" },
                      ]}
                    >
                      {" "}
                      {data[deger].spells[0].cooldownBurn}{" "}
                    </Text>
                  </View>
                  <View style={styles.skills}>
                    <Text style={[styles.specsText, { fontFamily: "josefin" }]}>
                      Range
                    </Text>
                    <Text
                      style={[
                        styles.specsText,
                        { textAlign: "center", fontFamily: "josefin" },
                      ]}
                    >
                      {" "}
                      {data[deger].spells[0].rangeBurn}{" "}
                    </Text>
                  </View>
                </View>
                <Text
                  style={[
                    styles.specsText,
                    { fontFamily: "josefin", textAlign: "justify" },
                  ]}
                >
                  {" "}
                  {q_skill_replace}{" "}
                </Text>
                <Text style={[styles.specsText, { fontFamily: "josefin" }]}>
                  {" "}
                  Mana Cost : {data[deger].spells[0].costBurn}{" "}
                </Text>
              </View>
              <View style={{ marginTop: hp("3%"), padding: wp("2.5%") }}>
                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "space-around",
                    width: wp("96%"),
                    alignItems: "center",
                    height: hp("15%"),
                  }}
                >
                  <Image
                    resizeMode="stretch"
                    style={{
                      width: wp("14%"),
                      height: hp("8%"),
                      borderRadius: 10,
                    }}
                    source={{
                      uri: `http://ddragon.leagueoflegends.com/cdn/${versions}/img/spell/${data[deger].spells[1].id}.png`,
                    }}
                  ></Image>
                  <View style={styles.skills}>
                    <Text
                      style={[
                        styles.specsText,
                        { fontFamily: "josefin", color: "#ffe5b4" },
                      ]}
                    >
                      {" "}
                      W{" "}
                    </Text>
                    <Text
                      style={[
                        styles.specsText,
                        { textAlign: "center", fontFamily: "josefin" },
                      ]}
                    >
                      {" "}
                      {data[deger].spells[1].name}{" "}
                    </Text>
                  </View>

                  <View style={[styles.skills]}>
                    <Text style={[styles.specsText, { fontFamily: "josefin" }]}>
                      Cooldown
                    </Text>
                    <Text
                      style={[
                        styles.specsText,
                        { textAlign: "center", fontFamily: "josefin" },
                      ]}
                    >
                      {" "}
                      {data[deger].spells[1].cooldownBurn}{" "}
                    </Text>
                  </View>
                  <View style={styles.skills}>
                    <Text style={[styles.specsText, { fontFamily: "josefin" }]}>
                      Range
                    </Text>
                    <Text
                      style={[
                        styles.specsText,
                        { textAlign: "center", fontFamily: "josefin" },
                      ]}
                    >
                      {" "}
                      {data[deger].spells[1].rangeBurn}{" "}
                    </Text>
                  </View>
                </View>
                <Text
                  style={[
                    styles.specsText,
                    { fontFamily: "josefin", textAlign: "justify" },
                  ]}
                >
                  {" "}
                  {w_skill_replace}{" "}
                </Text>
                <Text style={[styles.specsText, { fontFamily: "josefin" }]}>
                  {" "}
                  Mana Cost : {data[deger].spells[1].costBurn}{" "}
                </Text>
              </View>
              <View style={{ marginTop: hp("3%"), padding: wp("2.5%") }}>
                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "space-around",
                    width: wp("96%"),
                    alignItems: "center",
                    height: hp("15%"),
                  }}
                >
                  <Image
                    resizeMode="stretch"
                    style={{
                      width: wp("14%"),
                      height: hp("8%"),
                      borderRadius: 10,
                    }}
                    source={{
                      uri: `http://ddragon.leagueoflegends.com/cdn/${versions}/img/spell/${data[deger].spells[2].id}.png`,
                    }}
                  ></Image>
                  <View style={styles.skills}>
                    <Text
                      style={[
                        styles.specsText,
                        { fontFamily: "josefin", color: "#ffe5b4" },
                      ]}
                    >
                      {" "}
                      E{" "}
                    </Text>
                    <Text
                      style={[
                        styles.specsText,
                        { textAlign: "center", fontFamily: "josefin" },
                      ]}
                    >
                      {" "}
                      {data[deger].spells[2].name}{" "}
                    </Text>
                  </View>

                  <View style={[styles.skills]}>
                    <Text style={[styles.specsText, { fontFamily: "josefin" }]}>
                      Cooldown
                    </Text>
                    <Text
                      style={[
                        styles.specsText,
                        { textAlign: "center", fontFamily: "josefin" },
                      ]}
                    >
                      {" "}
                      {data[deger].spells[2].cooldownBurn}{" "}
                    </Text>
                  </View>
                  <View style={styles.skills}>
                    <Text style={[styles.specsText, { fontFamily: "josefin" }]}>
                      Range
                    </Text>
                    <Text
                      style={[
                        styles.specsText,
                        { textAlign: "center", fontFamily: "josefin" },
                      ]}
                    >
                      {" "}
                      {data[deger].spells[2].rangeBurn}{" "}
                    </Text>
                  </View>
                </View>
                <Text
                  style={[
                    styles.specsText,
                    { fontFamily: "josefin", textAlign: "justify" },
                  ]}
                >
                  {" "}
                  {e_skill_replace}{" "}
                </Text>
                <Text style={[styles.specsText, { fontFamily: "josefin" }]}>
                  {" "}
                  Mana Cost : {data[deger].spells[2].costBurn}{" "}
                </Text>
              </View>
              <View style={{ marginTop: hp("3%"), padding: wp("2.5%") }}>
                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "space-around",
                    width: wp("96%"),
                    alignItems: "center",
                    height: hp("15%"),
                  }}
                >
                  <Image
                    resizeMode="stretch"
                    style={{
                      width: wp("14%"),
                      height: hp("8%"),
                      borderRadius: 10,
                    }}
                    source={{
                      uri: `http://ddragon.leagueoflegends.com/cdn/${versions}/img/spell/${data[deger].spells[3].id}.png`,
                    }}
                  ></Image>
                  <View style={styles.skills}>
                    <Text
                      style={[
                        styles.specsText,
                        { fontFamily: "josefin", color: "#ffe5b4" },
                      ]}
                    >
                      {" "}
                      R{" "}
                    </Text>
                    <Text
                      style={[
                        styles.specsText,
                        { textAlign: "center", fontFamily: "josefin" },
                      ]}
                    >
                      {" "}
                      {data[deger].spells[3].name}{" "}
                    </Text>
                  </View>

                  <View style={[styles.skills]}>
                    <Text style={[styles.specsText, { fontFamily: "josefin" }]}>
                      Cooldown
                    </Text>
                    <Text
                      style={[
                        styles.specsText,
                        { textAlign: "center", fontFamily: "josefin" },
                      ]}
                    >
                      {" "}
                      {data[deger].spells[3].cooldownBurn}{" "}
                    </Text>
                  </View>
                  <View style={styles.skills}>
                    <Text style={[styles.specsText, { fontFamily: "josefin" }]}>
                      Range
                    </Text>
                    <Text
                      style={[
                        styles.specsText,
                        { textAlign: "center", fontFamily: "josefin" },
                      ]}
                    >
                      {" "}
                      {data[deger].spells[3].rangeBurn}{" "}
                    </Text>
                  </View>
                </View>
                <Text
                  style={[
                    styles.specsText,
                    { fontFamily: "josefin", textAlign: "justify" },
                  ]}
                >
                  {" "}
                  {r_skill_replace}{" "}
                </Text>
                <Text style={[styles.specsText, { fontFamily: "josefin" }]}>
                  {" "}
                  Mana Cost : {data[deger].spells[3].costBurn}{" "}
                </Text>
              </View>
            </ScrollView>
          </Swiper>
        </View>
      );
    }
  }

  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <ActivityIndicator size="large" color="black" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "black",
  },
  left: {
    width: "20%",
    marginTop: "10%",
  },

  header: {
    width: "100%",
    height: "25%",
    justifyContent:'center',
    alignItems:'center',
    marginTop:'2%'
  },
  info: {
    flex: 1,
    marginHorizontal: "2%",
    alignItems: "center",
    justifyContent: "center",
    padding: wp("1%"),
  },
  wrapper: {},
  specs: {
    flexDirection: "column",
    alignItems: "center",
  },
  specsText: {
    color: "white",
    fontSize: hp("1.8%"),
    marginBottom: hp("1.5%"),
    textAlign: "center",
  },
  stats: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  skills: {
    width: wp("28%"),
    height: hp("15%"),
    justifyContent: "space-between",
    padding: wp("1.5%"),
    alignItems: "stretch",
    
  },
  dot: {
    width: wp("3%"),
    height: hp("1%"),
    backgroundColor: "#ffe5b4",
    borderRadius: wp("1%"),
  },
});
