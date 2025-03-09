import React from 'react';
import { Stack } from 'expo-router';
import { StyleSheet } from 'react-native';
import { Box } from "@/components/ui/box";
import { VStack } from "@/components/ui/vstack";
import { Heading } from "@/components/ui/heading";
import { Text } from "@/components/ui/text";
import { AlertCircleIcon, Icon } from "@/components/ui/icon";

export default function NotFoundScreen() {
  return (
    <>
      <Stack.Screen options={{ title: 'Página não encontrada' }} />
      <Box 
        className="flex-1 items-center justify-center p-6"
        style={styles.container}
      >
        <VStack space="xl" className="items-center">
          <Icon
            as={AlertCircleIcon}
            className='text-error-500'
          />
          
          <Heading size="2xl" className="text-center">
            Ops! Página não encontrada
          </Heading>
          
          <Text className="text-center text-lg mb-6">
            A página que você está procurando não existe ou foi movida.
          </Text>
        </VStack>
      </Box>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'rgba(0, 0, 0, 0.02)'
  }
});
