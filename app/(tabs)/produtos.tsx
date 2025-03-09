import React, { useState } from 'react';
import { FlatList, StyleSheet } from 'react-native';
import { Card } from "@/components/ui/card";
import { Heading } from "@/components/ui/heading";
import { VStack } from "@/components/ui/vstack";
import { Text } from "@/components/ui/text";
import { Box } from "@/components/ui/box";
import { FontAwesome } from '@expo/vector-icons';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { mockProducts } from '@/data/mockData';

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