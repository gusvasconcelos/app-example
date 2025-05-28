import { Stack } from 'expo-router/stack';
import React from 'react';

export default function AuthLayout() {
  return (
    <Stack>
      <Stack.Screen 
        name="login" 
        options={{ 
          title: 'Login',
          headerShown: false 
        }} 
      />
    </Stack>
  );
} 