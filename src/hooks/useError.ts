import { useStore } from '@store';
import { useShallow } from 'zustand/react/shallow';
import { ErrorModel, GenericError, RootInfo } from '@constants';
import { FetchResult } from '@apollo/client';

export const useError = () => {
  const { hasError, setHasError, error, setError } = useStore(
    useShallow((rootInfo: RootInfo) => rootInfo)
  );

  const handleError = (response: FetchResult<any>) => {
    if (response.errors && response.errors[0]) {
      let errorData = response.errors[0].extensions;
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
