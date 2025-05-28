import React, { createContext, useContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { API_BASE_URL } from '@/config/api';
import { router } from 'expo-router';

interface AuthContextType {
  access_token: string | null;
  expires_in: number | null;
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [access_token, setAccessToken] = useState<string | null>(null);
  const [expires_in, setExpiresIn] = useState<number | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadStoredAuth();
  }, []);

  const loadStoredAuth = async () => {
    try {
      const storedToken = await AsyncStorage.getItem('access_token');
      const storedExpiresIn = await AsyncStorage.getItem('expires_in');
      
      if (storedToken) {
        setAccessToken(storedToken);
      }
      if (storedExpiresIn) {
        setExpiresIn(parseInt(storedExpiresIn, 10));
      }
    } catch (error) {
      console.error('Error loading stored auth:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const login = async (email: string, password: string) => {
    try {
      setIsLoading(true);
      
      const response = await fetch(`${API_BASE_URL}/v1/auth/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      if (response.status !== 200) {
        throw new Error('Credenciais inválidas');
      }

      const data = await response.json();
      
      setAccessToken(data.access_token);
      setExpiresIn(data.expires_in);
      await AsyncStorage.setItem('access_token', data.access_token);
      await AsyncStorage.setItem('expires_in', data.expires_in.toString());
      
      setTimeout(() => {
        router.replace('/(tabs)');
      }, 100);
      
    } catch (error) {
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const logout = async () => {
    try {
      await AsyncStorage.removeItem('access_token');
      await AsyncStorage.removeItem('expires_in');
      setAccessToken(null);
      setExpiresIn(null);
    } catch (error) {
      console.error('Error during logout:', error);
    }
  };

  return (
    <AuthContext.Provider value={{ access_token, expires_in, login, logout, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
};
