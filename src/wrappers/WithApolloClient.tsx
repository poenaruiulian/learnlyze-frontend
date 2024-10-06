import React, { useEffect, useState } from 'react';
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  HttpLink,
  ApolloLink,
} from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import { useRoot } from '@hooks';
import { HTTPRoutes } from '@config';

const createApolloClient = (token: string | null) => {
  const httpLink = new HttpLink({
    uri: HTTPRoutes.graphQL,
  });

  // Create an authentication link
  const authLink = setContext((_, { headers }) => ({
      headers: {
        ...headers,
        Authorization: token ? `Bearer ${token}` : '',
      },
    }));

  return new ApolloClient({
    link: ApolloLink.from([authLink, httpLink]),
    cache: new InMemoryCache(),
  });
};

export const WithApolloClient = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const { token } = useRoot();
  const [client, setClient] = useState(() => createApolloClient(token));

  useEffect(() => {
    const newClient = createApolloClient(token);
    setClient(newClient);
  }, [token]);

  return <ApolloProvider client={client}>{children}</ApolloProvider>;
};
