import { WithApolloClient, WithExpoFonts, WithGestureHandler } from '@wrappers';
import { Navigation } from '@navigation';
import { LoadingHandler } from './src/wrappers/LoadingHandler';

const App = () => (
  <WithApolloClient>
    <WithGestureHandler>
      <WithExpoFonts>
        <LoadingHandler>
          <Navigation />
        </LoadingHandler>
      </WithExpoFonts>
    </WithGestureHandler>
  </WithApolloClient>
);

export default App;
