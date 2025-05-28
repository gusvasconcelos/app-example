import React, { useState } from 'react';
import { StyleSheet, Alert, KeyboardAvoidingView, Platform } from 'react-native';
import { Card } from "@/components/ui/card";
import { Heading } from "@/components/ui/heading";
import { VStack } from "@/components/ui/vstack";
import { Text } from "@/components/ui/text";
import { Box } from "@/components/ui/box";
import { Input, InputField } from "@/components/ui/input";
import { Button, ButtonText } from "@/components/ui/button";
import { FontAwesome } from '@expo/vector-icons';
import { useAuth } from '@/contexts/AuthContext';
import { router } from 'expo-router';
import { ScrollView } from 'react-native';
import { EyeIcon, EyeOffIcon, Icon } from '@/components/ui/icon';
import { Pressable } from 'react-native';

export default function LoginScreen() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { login } = useAuth();

  const handleLogin = async () => {
    if (!email || !password) {
      Alert.alert('Erro', 'Por favor, preencha todos os campos');
      return;
    }

    if (!email.includes('@')) {
      Alert.alert('Erro', 'Por favor, insira um email válido');
      return;
    }

    try {
      setIsLoading(true);
      await login(email, password);
    } catch (error) {
      Alert.alert(
        'Erro no Login',
        error instanceof Error ? error.message : 'Erro ao fazer login. Tente novamente.'
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <KeyboardAvoidingView 
      style={styles.container} 
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <ScrollView 
        contentContainerStyle={styles.scrollContainer}
        keyboardShouldPersistTaps="handled"
      >
        <Box className="items-center mb-8">
          <FontAwesome name="cubes" size={80} color="#4A6572" />
          <Heading size="2xl" className="mt-4 text-center">
            InovaStock
          </Heading>
          <Text className="text-center text-gray-600 mt-2">
            Faça login para continuar
          </Text>
        </Box>

        <Card className="p-6 mx-4">
          <VStack space="lg">
            <Heading size="lg" className="text-center mb-4">
              Entrar
            </Heading>

            <Box>
              <Text className="mb-2 font-medium">Email</Text>
              <Input>
                <InputField
                  value={email}
                  onChangeText={setEmail}
                  placeholder="seu@email.com"
                  keyboardType="email-address"
                  autoCapitalize="none"
                  autoCorrect={false}
                />
              </Input>
            </Box>

            <Box>
              <Text className="mb-2 font-medium">Senha</Text>
              <Input>
                <InputField
                  value={password}
                  onChangeText={setPassword}
                  placeholder="Sua senha"
                  secureTextEntry={!showPassword}
                />
                <Pressable 
                  onPress={() => setShowPassword(!showPassword)}
                  style={styles.eyeIcon}
                >
                  <Icon 
                    as={showPassword ? EyeOffIcon : EyeIcon} 
                    size="md" 
                    className="text-gray-400"
                  />
                </Pressable>
              </Input>
            </Box>

            <Button 
              onPress={handleLogin} 
              className="mt-4"
              disabled={isLoading}
            >
              <ButtonText>
                {isLoading ? 'Entrando...' : 'Entrar'}
              </ButtonText>
            </Button>

          </VStack>
        </Card>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
  },
  scrollContainer: {
    flexGrow: 1,
    justifyContent: 'center',
    paddingVertical: 20,
  },
  eyeIcon: {
    position: 'absolute',
    right: 12,
    top: '50%',
    transform: [{ translateY: -12 }],
  },
}); 