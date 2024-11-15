import React from 'react';
import { StyleSheet, Dimensions, ScrollView } from 'react-native';
import { Block, theme } from 'galio-framework';

import { Card } from '../components';
import articles from '../constants/articles';

const { width } = Dimensions.get('screen');

class Home extends React.Component {
  renderArticles = () => {
    return (
        <ScrollView
            showsVerticalScrollIndicator={false}
            contentContainerStyle={styles.articles}>
          <Block flex>
            <Card
                item={
                  {
                    title: 'Ice cream is made with carrageenan …',
                    image: "assets/imgs/coffee_1.jpg",
                    cta: 'View article',
                    horizontal: true
                  }
                }
                horizontal
            />
            <Block flex row>
              <Card item={articles[1]} style={{ marginRight: theme.SIZES.BASE }} />
              <Card item={articles[2]} />
            </Block>
          </Block>
        </ScrollView>
    );
  }

  render() {
    return (
        <Block flex center style={styles.home}>
          {this.renderArticles()}
        </Block>
    );
  }
}

const styles = StyleSheet.create({
  home: {
    width: width,
  },
  articles: {
    width: width - theme.SIZES.BASE * 2,
    paddingVertical: theme.SIZES.BASE,
  },
});

export default Home;
