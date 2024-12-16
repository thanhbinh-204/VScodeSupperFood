import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';
import React from 'react';

const CustomHeader = ({ leftIcon, title, rightIcon, onPressLeftIcon, onPressRightIcon }) => {
  let renderLeftIcon, renderTitle, renderRightIcon;
  if (leftIcon) {
    renderLeftIcon = (
      <TouchableOpacity onPress={onPressLeftIcon}>
        <Image source={leftIcon} style={styles.sizeIcon} />
      </TouchableOpacity>
    );
  } else {
    renderLeftIcon = <View style={styles.placeholder} />;
  }
  if (title) {
    renderTitle = <Text style={styles.text}>{title}</Text>;
  } else {
    renderTitle = <Text style={styles.placeholdertitle} />;
  }
  if (rightIcon) {
    renderRightIcon = (
      <TouchableOpacity onPress={onPressRightIcon}>
        <Image source={rightIcon} style={styles.sizeIcon} />
      </TouchableOpacity>
    );
  } else {
    renderRightIcon = <View style={styles.placeholder} />;
  }
  return (
    <View style={styles.container}>
      {renderLeftIcon}
      {renderTitle}
      {renderRightIcon}
    </View>
  );
};

export default CustomHeader;


const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    margin: 10,
  },
  sizeIcon: {
    width: 25,
    height: 25,
  },
  text: {
    flex: 10,
    fontSize: 16,
    fontWeight: '500',
    color: '#000',
    textAlign: 'center',
    fontStyle: 'normal',
    justifyContent: 'center',
    fontFamily: 'Lato',
    lineHeight: 22,
  },
  placeholder: {
    flex: 0,
    width: 10,
    height: 10,
  },
  placeholdertitle: {
    flex: 10,
    width: 20,
    height: 20,
  },
});