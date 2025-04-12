import {
  ApolloClient,
  ApolloLink,
  ApolloProvider,
  HttpLink,
  InMemoryCache,
} from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import { routes } from '@constants';
import { useRoot } from '@hooks';
import React, { useEffect, useState } from 'react';

const createApolloClient = (token: string | null) => {
  const httpLink = new HttpLink({
    uri: routes.graphQL,
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
