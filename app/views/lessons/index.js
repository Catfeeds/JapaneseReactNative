import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { FlatList, Platform, StyleSheet, View } from 'react-native';

import { iOSColors } from 'react-native-typography';
import { IndicatorViewPager, PagerTabIndicator } from 'rn-viewpager';
import { SafeAreaView } from 'react-navigation';
import Ionicons from 'react-native-vector-icons/Ionicons';

import AdMob from '../../elements/admob';
import LessonItem from '../../elements/lesson-item';

import { range } from '../../utils/helpers';
import I18n from '../../utils/i18n';

import { config } from '../../config';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F7F7F7',
  },
  tabIndicatorText: {
    ...Platform.select({
      ios: {
        fontSize: 16,
      },
      android: {
        fontSize: 12,
      },
    }),
    paddingBottom: 6,
    color: iOSColors.gray,
  },
  tabIndicatorSelectedText: {
    ...Platform.select({
      ios: {
        fontSize: 16,
      },
      android: {
        fontSize: 12,
      },
    }),
    paddingBottom: 6,
    color: iOSColors.tealBlue,
  },
});

const lessonGroup = [
  {
    text: I18n.t('app.main.beginning_one'),
    list: range(1, 14), // [1, 13]
  },
  {
    text: I18n.t('app.main.beginning_two'),
    list: range(14, 26), // [14, 25]
  },
  {
    text: I18n.t('app.main.advanced_one'),
    list: range(26, 39), // [26, 38]
  },
  {
    text: I18n.t('app.main.advanced_two'),
    list: range(39, 51), // [39, 50]
  },
];

type Props = {};
export default class Main extends Component<Props> {
  static propTypes = {
    navigation: PropTypes.shape({}).isRequired,
    screenProps: PropTypes.shape({
      isPremium: PropTypes.bool,
    }).isRequired,
  };

  static navigationOptions = {
    headerBackTitle: null,
    title: 'みんなの日本語',
    tabBarIcon: ({ tintColor, focused }) => (
      <Ionicons
        name={focused ? 'ios-list' : 'ios-list-outline'}
        size={24}
        color={tintColor}
      />
    ),
  };

  state = {};

  componentDidMount() {
    // TODO:
    setTimeout(() => {
      this.setState({ androidFix: Math.random() });
    }, 1);
  }

  renderTabIndicator = () => (
    <PagerTabIndicator
      tabs={lessonGroup}
      textStyle={styles.tabIndicatorText}
      selectedTextStyle={styles.tabIndicatorSelectedText}
    />
  );

  render() {
    const {
      screenProps: { isPremium },
    } = this.props;

    return (
      <SafeAreaView style={styles.container}>
        <IndicatorViewPager
          key={this.state.androidFix}
          style={{ flex: 1 }}
          indicator={this.renderTabIndicator()}
        >
          {lessonGroup.map(group => (
            <View key={group.text}>
              <FlatList
                style={styles.list}
                data={group.list}
                keyExtractor={(item, index) => `${index}-${item}`}
                renderItem={({ item, index }) => (
                  <LessonItem
                    index={index}
                    item={item}
                    navigation={this.props.navigation}
                  />
                )}
              />
            </View>
          ))}
        </IndicatorViewPager>

        {!isPremium && (
          <AdMob
            unitId={config.admob[`japanese-${Platform.OS}-lessons-banner`]}
          />
        )}
      </SafeAreaView>
    );
  }
}
