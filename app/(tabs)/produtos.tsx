import React, { useState } from 'react';
import { FlatList, StyleSheet, Dimensions } from 'react-native';
import { Card } from "@/components/ui/card";
import { Heading } from "@/components/ui/heading";
import { VStack } from "@/components/ui/vstack";
import { Text } from "@/components/ui/text";
import { Box } from "@/components/ui/box";
import { FontAwesome } from '@expo/vector-icons';
import ParallaxScrollView from '@/components/ParallaxScrollView';

const mockProducts = [
  { id: '1', nome: 'Notebook Dell Inspiron', preco: 3499.90, estoque: 12 },
  { id: '2', nome: 'Monitor LG 24"', preco: 899.90, estoque: 25 },
  { id: '3', nome: 'Teclado Mecânico Redragon', preco: 249.90, estoque: 30 },
  { id: '4', nome: 'Mouse Logitech G502', preco: 349.90, estoque: 18 },
  { id: '5', nome: 'Headset Hyperx Cloud II', preco: 599.90, estoque: 8 },
  { id: '6', nome: 'SSD Kingston 480GB', preco: 299.90, estoque: 45 },
  { id: '7', nome: 'Memória RAM Corsair 8GB', preco: 199.90, estoque: 32 },
  { id: '8', nome: 'Placa de Vídeo GTX 1660', preco: 1899.90, estoque: 5 },
  { id: '9', nome: 'Gabinete Gamer', preco: 349.90, estoque: 15 },
  { id: '10', nome: 'Fonte 650W', preco: 399.90, estoque: 20 },
];

export default function ProdutosScreen() {
  const [products] = useState(mockProducts);
  const numColumns = 2;

  const renderProduct = ({ item }: { item: any }) => (
    <Card className="p-3 m-1" style={styles.gridItem}>
      <VStack space="xs">
        <Text className="font-bold text-md" numberOfLines={2}>{item.nome}</Text>
        <Text className="font-bold text-primary-600">
          R$ {item.preco.toFixed(2).replace('.', ',')}
        </Text>
        <Text className={item.estoque <= 10 ? "text-error-600" : ""}>
          Estoque: {item.estoque} {item.estoque <= 10 && <FontAwesome name="warning" size={14} color="#d32f2f" />}
        </Text>
      </VStack>
    </Card>
  );

  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: '#4A6572', dark: '#1D3D47' }}
      headerImage={
        <FontAwesome name="list" size={80} color="#ffffff" style={styles.headerIcon} />
      }>
      <Box className="items-center mb-5 mt-2">
        <Heading size="xl">Produtos</Heading>
      </Box>

      <Box className="mb-5 px-2">
        <FlatList
          data={products}
          renderItem={renderProduct}
          keyExtractor={item => item.id}
          numColumns={numColumns}
          scrollEnabled={false}
          columnWrapperStyle={styles.row}
        />
      </Box>
    </ParallaxScrollView>
  );
}

const styles = StyleSheet.create({
  headerIcon: {
    position: 'absolute',
    bottom: 20,
    right: 20,
  },
  gridItem: {
    flex: 1,
    maxWidth: '50%',
  },
  row: {
    flex: 1,
    justifyContent: 'space-between',
  }
});