import React, { useEffect, useReducer } from 'react';
import { useError } from '@hooks';
import { useNavigation } from '@react-navigation/native';
import { ErrorCodes } from '@constants';
import { KModal } from '@components';
import { AuthNavigationType } from '../navigation/type';

export const ErrorHandler = ({ children }: { children: React.ReactNode }) => {
  const { hasError, setHasError, error, setError } = useError();
  const { goBack } = useNavigation<AuthNavigationType>();

  const [isModalVisible, toggleModalVisible] = useReducer(s => !s, false);

  useEffect(() => {
    if (hasError) {
      setHasError(false);
      setError(null);
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => error && toggleModalVisible(), 500);

    return () => clearTimeout(timer);
  }, [error]);

  const closeModal = () => {
    toggleModalVisible();

    switch (error?.code) {
      case ErrorCodes.emailAlreadyInUse:
        goBack();
        break;
      default:
        break;
    }

    setHasError(false);
    setError(null);
  };

  return (
    <>
      {children}
      <KModal
        message={error?.message}
        description={error?.description}
        closeModal={closeModal}
        isModalVisible={isModalVisible}
      />
    </>
  );
};
