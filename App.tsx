import { WithApolloClient, WithExpoFonts } from '@wrappers';
import { Navigation } from '@navigation';

const App = () => (
  <WithApolloClient>
    <WithExpoFonts>
      <Navigation />
    </WithExpoFonts>
  </WithApolloClient>
);

export default App;
