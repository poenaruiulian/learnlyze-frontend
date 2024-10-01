import { Text, View } from '@defaults';
import { WithExpoFonts } from '@wrappers';

const App = () => (
  <WithExpoFonts>
    <View flex center>
      <Text body headingL>
        Hello
      </Text>
    </View>
  </WithExpoFonts>
);

export default App;
