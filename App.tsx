import { Text, View } from '@defaults';
import { WithExpoFonts } from '@wrappers';

const App = () => (
  <WithExpoFonts>
    <View flex center>
      <Text red bold>
        Hello
      </Text>
    </View>
  </WithExpoFonts>
);

export default App;
