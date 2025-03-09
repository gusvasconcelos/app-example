import React, { useState } from 'react';
import { StyleSheet, Alert } from 'react-native';
import { Card } from "@/components/ui/card";
import { Heading } from "@/components/ui/heading";
import { VStack } from "@/components/ui/vstack";
import { Text } from "@/components/ui/text";
import { Box } from "@/components/ui/box";
import { Input, InputField } from "@/components/ui/input";
import { Button, ButtonText } from "@/components/ui/button";
import { Select, SelectDragIndicator, SelectDragIndicatorWrapper, SelectContent, SelectBackdrop, SelectIcon, SelectInput, SelectItem, SelectPortal, SelectTrigger } from "@/components/ui/select";
import { FontAwesome } from '@expo/vector-icons';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { mockProducts } from '@/data/mockData';
import { ChevronDownIcon } from '@/components/ui/icon';

export default function EntradasScreen() {
  const [selectedProduct, setSelectedProduct] = useState("");
  const [newProductName, setNewProductName] = useState("");
  const [price, setPrice] = useState("");
  const [quantity, setQuantity] = useState("");
  const [isNewProduct, setIsNewProduct] = useState(false);

  const handleSubmit = () => {
    if (isNewProduct) {
      if (!newProductName || !price || !quantity) {
        Alert.alert("Erro", "Preencha todos os campos");
        return;
      }
      
      Alert.alert(
        "Sucesso", 
        `Novo produto adicionado: ${newProductName}\nPreço: R$ ${parseFloat(price).toFixed(2).replace('.', ',')}\nQuantidade: ${quantity}`
      );
      
      setNewProductName("");
      setPrice("");
      setQuantity("");
    } else {
      if (!selectedProduct || !quantity) {
        Alert.alert("Erro", "Selecione um produto e informe a quantidade");
        return;
      }
      
      const product = mockProducts.find(p => p.id === selectedProduct);
      if (product) {
        Alert.alert(
          "Sucesso", 
          `Estoque atualizado: ${product.nome}\nQuantidade adicionada: ${quantity}`
        );
      }
      
      setSelectedProduct("");
      setQuantity("");
    }
  };

  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: '#4A6572', dark: '#1D3D47' }}
      headerImage={
        <FontAwesome name="truck" size={80} color="#ffffff" style={styles.headerIcon} />
      }>
      <Box className="items-center mb-5 mt-2">
        <Heading size="xl">Entradas de Estoque</Heading>
      </Box>

      <Card className="p-5 mx-3 mb-5">
        <VStack space="md">
          <Box className="flex-column items-center justify-between mb-4">
            <Text className="text-lg font-bold">Tipo de Entrada</Text>
            <Box className="flex-row">
              <Button
                variant={isNewProduct ? "outline" : "solid"}
                onPress={() => setIsNewProduct(false)}
                className="mr-2"
              >
                <ButtonText>
                    Produto Existente
                </ButtonText>
              </Button>
              <Button 
                variant={isNewProduct ? "solid" : "outline"}
                onPress={() => setIsNewProduct(true)}
              >
                <ButtonText>
                    Novo Produto
                </ButtonText>
              </Button>
            </Box>
          </Box>

          {isNewProduct ? (
            <VStack space="md">
              <Box>
                <Text className="mb-1">Nome do Produto</Text>
                <Input>
                    <InputField
                        value={newProductName}
                        onChangeText={setNewProductName}
                        placeholder="Digite o nome do produto"
                    />
                </Input>
              </Box>
              <Box>
                <Text className="mb-1">Preço (R$)</Text>
                <Input>
                    <InputField
                        value={price}
                        onChangeText={setPrice}
                        placeholder="0,00"
                        keyboardType="numeric"
                    />
                </Input>
              </Box>
              <Box>
                <Text className="mb-1">Quantidade</Text>
                <Input>
                    <InputField
                        value={quantity}
                        onChangeText={setQuantity}
                        placeholder="0"
                        keyboardType="numeric"
                    />
                </Input>
              </Box>
            </VStack>
          ) : (
            <VStack space="md">
              <Box>
                <Text className="mb-1">Selecione o Produto</Text>
                <Select onValueChange={setSelectedProduct} selectedValue={selectedProduct}>
                  <SelectTrigger variant="outline" size="md">
                    <SelectInput placeholder="Selecione um produto" />
                    <SelectIcon className="mr-3" as={ChevronDownIcon} />
                  </SelectTrigger>
                  <SelectPortal>
                    <SelectBackdrop />
                    <SelectContent>
                      <SelectDragIndicatorWrapper>
                        <SelectDragIndicator />
                      </SelectDragIndicatorWrapper>
                      {mockProducts.map(product => (
                        <SelectItem key={product.id} label={product.nome} value={product.id} />
                      ))}
                    </SelectContent>
                  </SelectPortal>
                </Select>
              </Box>
              <Box>
                <Text className="mb-1">Quantidade a Adicionar</Text>
                <Input>
                    <InputField
                        value={quantity}
                        onChangeText={setQuantity}
                        placeholder="0"
                        keyboardType="numeric"
                    />
                </Input>
              </Box>
            </VStack>
          )}

          <Button onPress={handleSubmit} className="mt-4">
            <ButtonText>
                {isNewProduct ? "Cadastrar Produto" : "Adicionar ao Estoque"}
            </ButtonText>
          </Button>
        </VStack>
      </Card>

      <Card className="p-5 mx-3 mb-5">
        <Heading size="md" className="mb-4">
          Últimas Entradas
        </Heading>
        <VStack space="md">
          <Box className="p-3 border-b border-gray-200">
            <Text className="font-bold">Notebook Dell Inspiron</Text>
            <Text>Quantidade: 5</Text>
            <Text className="text-gray-500">Hoje, 14:30</Text>
          </Box>
          <Box className="p-3 border-b border-gray-200">
            <Text className="font-bold">Memória RAM Corsair 8GB</Text>
            <Text>Quantidade: 10</Text>
            <Text className="text-gray-500">Ontem, 09:15</Text>
          </Box>
          <Box className="p-3">
            <Text className="font-bold">SSD Kingston 480GB</Text>
            <Text>Quantidade: 8</Text>
            <Text className="text-gray-500">22/05/2023, 16:45</Text>
          </Box>
        </VStack>
      </Card>
    </ParallaxScrollView>
  );
}

const styles = StyleSheet.create({
  headerIcon: {
    position: 'absolute',
    bottom: 20,
    right: 20,
  },
});