import { Card } from "@/components/ui/card"
import { Heading } from "@/components/ui/heading"
import { HStack } from "@/components/ui/hstack"
import { VStack } from "@/components/ui/vstack"
import { Link, LinkText } from "@/components/ui/link"
import { Text } from "@/components/ui/text"
import { Icon } from "@/components/ui/icon"
import { StyleSheet } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { Box } from "@/components/ui/box"
import { useRouter } from 'expo-router';
import { Pressable } from 'react-native';

export default function HomeScreen() {
  const router = useRouter();

  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: '#4A6572', dark: '#1D3D47' }}
      headerImage={
        <FontAwesome name="cubes" size={120} color="#ffffff" style={styles.stockIcon} />
      }>
      <Box className="items-center mb-5 mt-2">
        <Heading size="xl">InovaStock</Heading>
      </Box>

      <HStack className="flex-wrap justify-between px-3">
        <Card className="p-5 rounded-lg w-[48%] mb-4">
          <Pressable onPress={() => router.push('/(tabs)/produtos')}>
            <Box className="items-center justify-center h-20 w-20 rounded-full bg-primary-0 mb-4 self-center">
              <FontAwesome name="list" size={30} color="#4A6572" />
            </Box>
          </Pressable>
          <Heading size="md" className="mb-2 text-center">
            Produtos
          </Heading>
          <Text size="sm" className="text-center mb-4">
            Gerencie todos os produtos do seu inventário
          </Text>
          <Pressable onPress={() => router.push('/(tabs)/produtos')}>
            <HStack className="items-center justify-center">
              <Text size="sm" className="font-semibold text-primary-600 no-underline">
                Acessar
              </Text>
              <Icon as={FontAwesome} name="arrow-right" size="sm" className="text-primary-600 ml-1" />
            </HStack>
          </Pressable>
        </Card>

        <Card className="p-5 rounded-lg w-[48%] mb-4">
          <Pressable onPress={() => router.push('/(tabs)/entradas')}>
            <Box className="items-center justify-center h-20 w-20 rounded-full bg-success-100 mb-4 self-center">
              <FontAwesome name="truck" size={30} color="#2E7D32" />
            </Box>
          </Pressable>
          <Heading size="md" className="mb-2 text-center">
            Entradas
          </Heading>
          <Text size="sm" className="text-center mb-4">
            Registre novas entradas de mercadorias
          </Text>
          <Pressable onPress={() => router.push('/(tabs)/entradas')}>
            <HStack className="items-center justify-center">
              <Text size="sm" className="font-semibold text-primary-600 no-underline">
                Acessar
              </Text>
              <Icon as={FontAwesome} name="arrow-right" size="sm" className="text-primary-600 ml-1" />
            </HStack>
          </Pressable>
        </Card>

        <Card className="p-5 rounded-lg w-[48%] mb-4">
          <Pressable onPress={() => router.push('/(tabs)/saidas')}>
            <Box className="items-center justify-center h-20 w-20 rounded-full bg-warning-100 mb-4 self-center">
              <FontAwesome name="shopping-cart" size={30} color="#ED6C02" />
            </Box>
          </Pressable>
          <Heading size="md" className="mb-2 text-center">
            Saídas
          </Heading>
          <Text size="sm" className="text-center mb-4">
            Controle as saídas de produtos do estoque
          </Text>
          <Pressable onPress={() => router.push('/(tabs)/saidas')}>
            <HStack className="items-center justify-center">
              <Text size="sm" className="font-semibold text-primary-600 no-underline">
                Acessar
              </Text>
              <Icon as={FontAwesome} name="arrow-right" size="sm" className="text-primary-600 ml-1" />
            </HStack>
          </Pressable>
        </Card>

        <Card className="p-5 rounded-lg w-[48%] mb-4">
          <Pressable onPress={() => router.push('/(tabs)/relatorios')}>
            <Box className="items-center justify-center h-20 w-20 rounded-full bg-info-100 mb-4 self-center">
              <FontAwesome name="bar-chart" size={30} color="#0288D1" />
            </Box>
          </Pressable>
          <Heading size="md" className="mb-2 text-center">
            Relatórios
          </Heading>
          <Text size="sm" className="text-center mb-4">
            Visualize relatórios e estatísticas
          </Text>
          <Pressable onPress={() => router.push('/(tabs)/relatorios')}>
            <HStack className="items-center justify-center">
              <Text size="sm" className="font-semibold text-primary-600 no-underline">
                Acessar
              </Text>
              <Icon as={FontAwesome} name="arrow-right" size="sm" className="text-primary-600 ml-1" />
            </HStack>
          </Pressable>
        </Card>
      </HStack>

      <Card className="p-5 rounded-lg mx-3 mb-5">
        <Heading size="md" className="mb-4">
          Resumo do Estoque
        </Heading>
        <VStack space="md">
          <HStack className="justify-between py-2 border-b border-gray-200">
            <Text>Total de Produtos:</Text>
            <Text className="font-semibold">10</Text>
          </HStack>
          <HStack className="justify-between py-2 border-b border-gray-200">
            <Text>Produtos com Estoque Baixo:</Text>
            <Text className="font-semibold text-error-600">2</Text>
          </HStack>
          <HStack className="justify-between py-2">
            <Text>Movimentações Hoje:</Text>
            <Text className="font-semibold">5</Text>
          </HStack>
        </VStack>
      </Card>
    </ParallaxScrollView>
  );
}

const styles = StyleSheet.create({
  stockIcon: {
    position: 'absolute',
    bottom: 20,
    right: 20,
  },
});