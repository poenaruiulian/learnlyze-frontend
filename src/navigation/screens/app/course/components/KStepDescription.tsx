import { colors, icons, sizes, strings } from '@constants';
import { WebView } from 'react-native-webview';
import { TouchableOpacity, useWindowDimensions } from 'react-native';
import { useReducer } from 'react';
import { KModal, KSpacer } from '@components';
import { View, Text, Icon } from '@defaults';
import { impactAsync, ImpactFeedbackStyle } from 'expo-haptics';

type KStepDescription = {
  stepId: number;
  description: string;
};
export const KStepDescription = ({ ...props }: KStepDescription) => {
  const [isFullScreen, toggleFullScreen] = useReducer(s => !s, false);

  const { height, width } = useWindowDimensions();

  return (
    <TouchableOpacity
      style={[{ flex: 1, alignItems: 'flex-end' }]}
      onPress={() => {
        impactAsync(ImpactFeedbackStyle.Soft).then(toggleFullScreen);
      }}>
      <KSpacer />
      <View
        padding={sizes.s10}
        borderRadius={sizes.s10}
        style={{
          backgroundColor: colors.eastBay,
          width: '90%',
        }}>
        <View row gap={5} centerH>
          <Icon icon={icons.lesson} color={colors.white80} />
          <Text semiBold bodyM white80>
            {strings.course.step.title}
          </Text>
        </View>
        <Text semiBold bodyS white50>
          {strings.course.step.description}
        </Text>
      </View>
      <KModal
        closeModal={toggleFullScreen}
        isModalVisible={isFullScreen}
        style={{
          height: height / 1.5,
        }}>
        <WebView
          originWhitelist={['*']}
          style={{
            height,
            width: width - 48,
            backgroundColor: colors.transparent,
            alignSelf: 'flex-end',
          }}
          source={{
            html: `
          <!DOCTYPE html>
          <html lang="en">
            <head>
              <meta name="viewport" content="width=device-width, initial-scale=0.8">
              <link rel="preconnect" href="https://fonts.googleapis.com">
              <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
              <link href="https://fonts.googleapis.com/css2?family=Raleway:ital,wght@0,100..900;1,100..900&display=swap" rel="stylesheet">
              <style>
                body { 
                  font-family: Raleway;
                  color: ${colors.white50};
                  background: transparent;
                }
                h1, h2, h3, h4, h5, h6, i, b, em, strong {
                 color: ${colors.tulipTree80};
                }
              </style>
            </head>
            <body>
              ${props.description}
            </body>
          </html>`,
          }}
          injectedJavaScript={`
    (function() {
      const height = document.body.scrollHeight;
      window.ReactNativeWebView.postMessage(JSON.stringify({
        height: height
      }));
      true;
    })();
  `}
          scalesPageToFit={false}
          pointerEvents="auto"
          scrollEnabled={false}
          showsVerticalScrollIndicator={false}
        />
      </KModal>
    </TouchableOpacity>
  );
};
