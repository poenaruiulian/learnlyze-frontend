import { WithApolloClient, WithExpoFonts, WithGestureHandler } from '@wrappers';
import { Navigation } from '@navigation';

const App = () => (
  <WithApolloClient>
    <WithGestureHandler>
      <WithExpoFonts>
        <Navigation />
      </WithExpoFonts>
    </WithGestureHandler>
  </WithApolloClient>
);

export default App;
