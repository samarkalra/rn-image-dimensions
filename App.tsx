import React, {Ref, useRef, useState} from 'react';
import {View, Text, Image, Dimensions} from 'react-native';
import {tajMahal} from './src/assets/images/images';
import FastImage from 'react-native-fast-image';

const win = Dimensions.get('window');

export type ImageDimensions = {
  width: number;
  height: number;
};

const window = Dimensions.get('window');

export const IMAGE_HEIGHT = window.width / 2;
export const IMAGE_HEIGHT_SMALL = window.width / 7;

const App = () => {
  const [remoteImageDimensions, setRemoteImageDimensions] = useState<
    ImageDimensions | undefined
  >();
  const [localImageDimensions, setLocalImageDimensions] = useState<
    ImageDimensions | undefined
  >();

  React.useEffect(() => {
    // retrieve dimensions of remote image
    Image.getSize(
      'https://cdn.britannica.com/86/170586-050-AB7FEFAE/Taj-Mahal-Agra-India.jpg',
      (width, height) => {
        console.log('Remote Image Size:', width, height);
        const actualRemoteImageWidth = width;
        const actualRemoteImageHeight = height;
        const ratio = win.width / actualRemoteImageWidth;
        setRemoteImageDimensions({
          width: win.width,
          height: actualRemoteImageHeight * ratio,
        });
      },
    );

    // retrieve dimensions of static image
    const localImage = require('./src/assets/images/taj_mahal.jpeg');
    const source = Image.resolveAssetSource(localImage);
    console.log('Local Image Size:', source.width, source.height);
    const actualLocalImageWidth = source.width;
    const actualLocalImageHeight = source.height;
    const r = win.width / actualLocalImageWidth;
    setLocalImageDimensions({
      width: win.width,
      height: actualLocalImageHeight * r,
    });
  }, []);

  return (
    <View
      style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
      }}>
      <Text>Remote Image</Text>
      <FastImage
        source={{
          uri: 'https://cdn.britannica.com/86/170586-050-AB7FEFAE/Taj-Mahal-Agra-India.jpg',
        }}
        style={{
          ...remoteImageDimensions,
          marginBottom: 20,
        }}
        resizeMode="contain"
      />

      <Text>Local Image</Text>
      <FastImage
        source={tajMahal}
        style={{
          ...localImageDimensions,
        }}
        resizeMode="contain"
      />
      <View style={{flexDirection: 'row'}}>
        <FastImage
          style={{flex: 1, aspectRatio: 1600 / 1063, borderWidth: 1}}
          source={require('./src/assets/images/taj_mahal.jpeg')}
          resizeMode={FastImage.resizeMode.contain}
        />
      </View>
    </View>
  );
};

export default App;
