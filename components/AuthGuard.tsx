import React, { useEffect } from 'react';
import { router } from 'expo-router';
import { useAuth } from '@/contexts/AuthContext';
import { Box } from '@/components/ui/box';
import { Text } from '@/components/ui/text';
import { ActivityIndicator } from 'react-native';

interface AuthGuardProps {
  children: React.ReactNode;
}

export const AuthGuard: React.FC<AuthGuardProps> = ({ children }) => {
  const { access_token, expires_in, isLoading } = useAuth();

  useEffect(() => {
    if (!isLoading && (!access_token || expires_in < Date.now())) {
      router.replace('/auth/login');
    }
  }, [access_token, expires_in, isLoading]);

  if (isLoading) {
    return (
      <Box className="flex-1 items-center justify-center">
        <ActivityIndicator size="large" color="#4A6572" />
        <Text className="mt-4">Carregando...</Text>
      </Box>
    );
  }

  if (!access_token) {
    return null;
  }

  return <>{children}</>;
}; 