import { useStore } from '@store';
import { useShallow } from 'zustand/react/shallow';
import { ErrorModel, GenericError, RootInfo } from '@constants';
import { FetchResult } from '@apollo/client';

export const useError = () => {
  const { hasError, setHasError, error, setError } = useStore(
    useShallow((rootInfo: RootInfo) => rootInfo)
  );

  const handleError = (response: FetchResult<any>) => {
    const errorResponse = { ...response };

    let errorData;

    if (response?.errors && response?.errors[0]) {
      errorData = response.errors[0].extensions;
      errorData = errorData
        ? {
            message: errorData.message,
            description: errorData.description,
            code: errorData.code,
          }
        : GenericError;

      setError(errorData as ErrorModel);
      setHasError(true);

      return null;
    }

    if (errorResponse) {
      if (
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-expect-error
        errorResponse?.cause?.extensions?.stacktrace[0] &&
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-expect-error
        errorResponse?.cause?.message
      ) {
        errorData = {
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          // @ts-expect-error
          message: errorResponse.cause.message,
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          // @ts-expect-error
          description: errorResponse.cause.extensions.stacktrace[0],
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          // @ts-expect-error
          code: errorResponse.cause.extensions.code,
        };

        setError(errorData as ErrorModel);
        setHasError(true);

        return null;
      }

      if (errorResponse.toString().includes('ApolloError')) {
        errorData = {
          message: GenericError.message,
          description: errorResponse.toString().split('ApolloError: ')[1],
          code: GenericError.code,
        };

        setError(errorData as ErrorModel);
        setHasError(true);

        return null;
      }
    }

    return response;
  };

  return {
    handleError,

    hasError,
    setHasError,
    error,
    setError,
  };
};
