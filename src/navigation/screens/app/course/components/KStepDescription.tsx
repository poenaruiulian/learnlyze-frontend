import { colors, sizes } from '@constants';
import { WebView, WebViewMessageEvent } from 'react-native-webview';

type KStepDescription = {
  stepId: number;
  description: string;
  handleMessage: (event: WebViewMessageEvent, id: string) => void;
};
export const KStepDescription = ({ ...props }: KStepDescription) => (
  <WebView
    originWhitelist={['*']}
    style={{
      height: '100%',
      width: '90%',
      backgroundColor: colors.biscay,
      borderRadius: sizes.s10,
      marginTop: sizes.s10,
      padding: sizes.s10,
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
                strong {
                  color: ${colors.tulipTree80};
                }
                em {
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
    onMessage={event => props.handleMessage(event, props.stepId.toString())}
    scalesPageToFit={false}
    scrollEnabled={false}
    showsVerticalScrollIndicator={false}
  />
);
