import React, { useState, useEffect } from 'react';
import {StyleSheet, Dimensions, ScrollView, Alert, Text, TouchableOpacity, View} from 'react-native';
import { Block, theme, DeckSwiper,Slider,Switch } from 'galio-framework';
import { DrawerItem as DrawerCustomItem } from "../components";


import { Card } from '../components';
import articles from '../constants/articles';
import {useNavigation} from "@react-navigation/native";
import Icon from "react-native-vector-icons/FontAwesome";
//import Icon from "../components/Icon";
import Profile from "./Profile";

const { width } = Dimensions.get('screen');

const navigationIcons = [
    "https://cdn.builder.io/api/v1/image/assets/TEMP/1db491ae641ea0b841ef0b5bff6ba1f5620e7e09c07c3d20e8cd68448eca408d?placeholderIfAbsent=true&apiKey=943829ccec224c679bdb3c2bb116d9a9",
    "https://cdn.builder.io/api/v1/image/assets/TEMP/c0351fc3333300c3ce22940203e575a85eb1f724cfa2d251fbbea67ddc4a0a42?placeholderIfAbsent=true&apiKey=943829ccec224c679bdb3c2bb116d9a9",
    "https://cdn.builder.io/api/v1/image/assets/TEMP/c503cab87724c0b1219a109fbab6e8a3d0d2c65825235796f4c7ddfed79cb9c3?placeholderIfAbsent=true&apiKey=943829ccec224c679bdb3c2bb116d9a9",
];
function Home({
                  drawerPosition,
                  navigation,
                  profile,
                  focused,
                  state,
                  ...rest
              }){
    const screens = ["Home","Profile", "Account","Task","My Task","Request Process","Request in Progress","Request Completed","Logout", "Elements", "Articles"];
    const [username, setUsername] = useState(""); // State untuk menyimpan username
    const apiUrl = process.env.EXPO_PUBLIC_API_URL;
    return(

        <View style={styles.backroundhome}>
            <ScrollView>
            <View style={styles.navigationBar}>
                {navigationIcons.map((uri, index) => (
                    <Icon key={index} uri={uri} />
                ))}

            </View>


            <View style={styles.contentSection}>
                <View style={styles.cardContainer2}>
                    <ScrollView
                        horizontal={true}
                        showsHorizontalScrollIndicator={false}>
                    <View style={styles.card}/>
                    <View style={styles.card}/>
                    </ScrollView>
                </View>
            </View>



            <View style={styles.mainContent}>


                <View style={styles.cardContainer}>
                    <View style={styles.usercontainer}>

                        <View style={styles.usernameContainer}>
                            <Text><Icon size={36} name="user"/>    test</Text>
                        </View>
                    </View>

                        <View style={styles.balancecontainer}>
                            <View style={styles.balancelabelContainer}>
                                <Text>Wallet</Text>
                            </View>
                            <View style={styles.balanceContainer}>
                                <Text>RP 200000</Text>
                            </View>
                        </View>



                </View>



                <View style={styles.favoritesSection}>
                    <View style={styles.favoritesHeader}>
                        <Text>Favorit Anda</Text>
                    </View>
                    <ScrollView
                        horizontal={true}
                        showsHorizontalScrollIndicator={false}>
                        <View style={styles.favoritesGrid}>
                            {/*{screens.map((item, index) => (
                                <Icon key={index} icon={item.icon} label={item.label} />
                            ))}*/}
                        </View>
                    </ScrollView>
                </View>


            </View>

            </ScrollView>
        </View>

        /*<View class="flex overflow-hidden flex-col pt-4 mx-auto w-full bg-cyan-50 max-w-[480px] max-sm:max-w-[545px]"
        style={styles.backroundhome}>
        <Block>
            <ScrollView
                showsVerticalScrollIndicator={false}>
            <Block>
                <ScrollView
                    horizontal={true}
                    showsHorizontalScrollIndicator={false}>

                    <TouchableOpacity style={styles.logoutButton}>
                        <Text style={styles.buttonText}>Menu</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.logoutButton}>
                        <Text style={styles.buttonText}>Menu</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.logoutButton}>
                        <Text style={styles.buttonText}>Menu</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.logoutButton}>
                        <Text style={styles.buttonText}>Menu</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.logoutButton}>
                        <Text style={styles.buttonText}>Menu</Text>
                    </TouchableOpacity>
                </ScrollView>
            </Block>
                <Block>

                </Block>
            <Block>
                <ScrollView
                    horizontal={true}
                    showsHorizontalScrollIndicator={false}>
                    <TouchableOpacity style={styles.logoutButton}>
                        <Text style={styles.buttonText}>Menu</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.logoutButton}>
                        <Text style={styles.buttonText}>Menu</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.logoutButton}>
                        <Text style={styles.buttonText}>Menu</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.logoutButton}>
                        <Text style={styles.buttonText}>Menu</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.logoutButton}>
                        <Text style={styles.buttonText}>Menu</Text>
                    </TouchableOpacity>
                </ScrollView>
            </Block>
            <Block>
                <ScrollView
                    horizontal={true}
                    showsHorizontalScrollIndicator={false}>
                    <TouchableOpacity style={styles.logoutButton}>
                        <Text style={styles.buttonText}>Menu</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.logoutButton}>
                        <Text style={styles.buttonText}>Menu</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.logoutButton}>
                        <Text style={styles.buttonText}>Menu</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.logoutButton}>
                        <Text style={styles.buttonText}>Menu</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.logoutButton}>
                        <Text style={styles.buttonText}>Menu</Text>
                    </TouchableOpacity>
                </ScrollView>
            </Block>
            </ScrollView>
        </Block>
        </View>*/
    )
}


/*class Home extends React.Component {

  renderArticles = () => {
    return (
        <ScrollView
            showsVerticalScrollIndicator={false}
            contentContainerStyle={styles.articles}>
          <Block flex>
              <Block>
                  <TouchableOpacity style={styles.logoutButton}>
                      <Text style={styles.buttonText}>Menu</Text>
                  </TouchableOpacity>
              </Block>
            <Card
                item={
                  {
                    //title: 'Ice cream is made with carrageenan …',
                    image: "assets/imgs/coffee_1.jpg",
                    //cta: 'View article',
                    horizontal: true
                  }
                }
                horizontal={false}
            />
              <Card
                  item={
                      {
                          title: 'Ice cream is made with carrageenan …',
                          image: "assets/imgs/coffee_1.jpg",
                          cta: 'View article',
                          horizontal: true
                      }
                  }
              />
            <Block flex row>
              <Card item={articles[1]} style={{ marginRight: theme.SIZES.BASE }} />
              <Card item={articles[2]} />
            </Block>

          </Block>
        </ScrollView>
    );
  }

  renderuser(){
      const screens = ["Home","Profile", "Account","Task","My Task","Request Process","Request in Progress","Request Completed","Logout", "Elements", "Articles"];
      return(
          <Block>
              <Text style={styles.title}>Dashboard</Text>
              <View style={styles.fixToText}>
                  {/!*{screens.map((item, index) => {
                      return (
                          <TouchableOpacity
                              title={item}
                              key={index}
                              navigation={navigation}
                              focused={state.index === index ? true : false}
                          />
                      );
                  })}*!/}
                  <TouchableOpacity style={styles.logoutButton}>

                  </TouchableOpacity>
                  <TouchableOpacity style={styles.logoutButton}>
                      <Text style={styles.buttonText}>Menu</Text>
                  </TouchableOpacity>
                  <TouchableOpacity style={styles.logoutButton}>
                      <Text style={styles.buttonText}>Menu</Text>
                  </TouchableOpacity>
                  <TouchableOpacity style={styles.logoutButton}>
                      <Text style={styles.buttonText}>Menu</Text>
                  </TouchableOpacity>

              </View>
          </Block>

      )
  }
  renderselection(){

      return(
          <Block>
              <ScrollView
                  horizontal={true}
                  showsHorizontalScrollIndicator={true}>
                  <Block>

                  </Block>
              </ScrollView>
          </Block>
      )
  }

  render() {
    return (

        <Block flex center style={styles.home}>
            <Block>
                {this.renderuser()}
            </Block>

          {this.renderArticles()}
        </Block>

    );
  }
}*/

const styles = StyleSheet.create({
  backroundhome:{
    backgroundColor:"#befdff",
    display: "flex",
    marginLeft: "auto",
    marginRight: "auto",
    maxWidth: 480,
    width: "100%",
    paddingTop: 15,
    flexDirection: "column",
    overflow: "hidden",
    alignItems: "stretch",

  },
  navigationBar: {
      display: "flex",
      alignItems: "stretch",
      gap: 5,
  },
  backgroundcarduser:{
    backgroundColor:"#afafaf"

  },
  backgroundcardmenu:{
      backgroundColor:"#afafaf",
      borderTopLeftRadius: 31,
      borderTopRightRadius: 31,
      borderBottomRightRadius: 0,
      borderBottomLeftRadius: 0,
      borderColor: "rgba(13, 13, 13, 1)",
      borderStyle: "solid",
      borderWidth: 1,
      display: "flex",
      minHeight: 683,
      marginTop: 195,
      width: "100%",
  },
  home: {
    width: width,
  },
  articles: {
    width: width - theme.SIZES.BASE * 2,
    paddingVertical: theme.SIZES.BASE,
  },
  title: {
      fontSize: 28,
      marginBottom: 24,
      textAlign: "center",
      fontWeight: "bold",
  },
  welcomeText: {
      fontSize: 18,
      marginBottom: 16,
      textAlign: "center",
      color: "#333",
  },
  logoutButton: {
      backgroundColor: "#10B981",
      padding: 15,
      borderRadius: 5,
      alignItems: "center",
      marginTop: 20,
      marginLeft:10,
      marginRight:10,
  },
  buttonText: {
      color: "#fff",
      fontSize: 18,
  },
  fixToText: {
      flexDirection: 'row',
      justifyContent: 'space-between',
  },
    contentSection: {
        display: "flex",
        marginTop: 11,
        alignItems: "stretch",
        gap: 17,
    },
    cardContainer2: {
        display: "flex",
        alignItems: "stretch",
        gap: 15,
        flexGrow: 1,
        flexShrink: 1,
        flexBasis: "auto",
    },
    card: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        backgroundColor:"#e3e3e3",
        borderRadius: 5,
        borderColor: "rgba(0, 0, 0, 1)",
        borderStyle: "solid",
        borderWidth: 1,
        display: "flex",
        width: 337,
        flexShrink: 0,
        marginRight: 40,
        marginLeft : 40,
        maxWidth: "100%",
        height: 106,
    },
    container: {
        display: "flex",
        marginLeft: "auto",
        marginRight: "auto",
        maxWidth: 480,
        width: "100%",
        paddingTop: 15,
        flexDirection: "column",
        overflow: "hidden",
        alignItems: "stretch",
    },
    headerIconsContainer: {
        display: "flex",
        alignItems: "stretch",
        gap: 5,
    },
    mainContent: {
        backgroundColor:"#e3e3e3",
        borderTopLeftRadius: 31,
        borderTopRightRadius: 31,
        borderBottomRightRadius: 0,
        borderBottomLeftRadius: 0,
        borderColor: "rgba(13, 13, 13, 1)",
        borderStyle: "solid",
        borderWidth: 1,
        display: "flex",
        marginTop: 100,
        width: "100%",
        paddingLeft: 41,
        paddingRight: 41,
        paddingBottom: 604,
        flexDirection: "column",
        alignItems: "stretch",
        fontFamily: "Inter, sans-serif",
        fontWeight: "400",
    },
    cardContainer: {
        backgroundColor:"#e3e3e3",
        borderRadius: 16,
        borderColor: "rgba(0, 0, 0, 1)",
        borderStyle: "solid",
        borderWidth: 1,
        zIndex: 10,
        display: "flex",
        marginTop: -57,
        marginBottom: -121,
        width: "100%",
        paddingLeft: 23,
        paddingRight: 23,
        paddingTop: 13,
        paddingBottom: 13,
        flexDirection: "column",
        alignItems: "stretch",
    },
    usercontainer: {
        display: "flex",
        alignItems: "stretch",
        gap: 16,
        fontSize: 12,
    },
    usernameContainer: {
        marginTop: "auto",
        marginBottom: "auto",
    },
    balancecontainer: {
        backgroundColor:"#efecec",
        borderRadius: 36,
        borderColor: "rgba(0, 0, 0, 1)",
        borderStyle: "solid",
        borderWidth: 1,
        display: "flex",
        marginTop: 18,
        paddingLeft: 22,
        paddingRight: 59,
        paddingTop: 15,
        paddingBottom: 15,
        flexDirection: "column",
    },
    balancelabelContainer: {
        color: "rgb(203,203,203)",
        fontSize: 12,
    },
    balanceContainer: {
        backgroundColor:"#f1efef",
        color: "rgba(0, 0, 0, 1)",
        fontSize: 15,
        marginTop: 7,
    },
    favoritesSection: {
        backgroundColor:"#f1efef",
        borderColor: "rgba(0, 0, 0, 1)",
        borderStyle: "solid",
        borderWidth: 1,
        display: "flex",
        marginTop: 150,
        width: "100%",
        padding: 14,
        flexDirection: "column",
        alignItems: "stretch",
    },
    favoritesHeader: {
        backgroundColor:"#f1efef",
        fontSize: 12,
        color: "rgba(0, 0, 0, 1)",
        fontWeight: "400",
    },
    favoritesGrid: {
        display: "flex",
        marginTop: 26,
        marginLeft: 10,
        alignItems: "stretch",
        gap: 29,
        fontWeight: "700",
        textAlign: "center",
    },
});

export default Home;
