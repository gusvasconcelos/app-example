import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Alert,
  TextInput,
  View,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { Card } from "@/components/ui/card";
import { Heading } from "@/components/ui/heading";
import { VStack } from "@/components/ui/vstack";
import { Text } from "@/components/ui/text";
import { Box } from "@/components/ui/box";
import { Button, ButtonText } from "@/components/ui/button";
import { FontAwesome } from "@expo/vector-icons";
import ParallaxScrollView from "@/components/ParallaxScrollView";
import { mockProducts } from "@/data/mockData";
import {
  Select,
  SelectItem,
  SelectDragIndicatorWrapper,
  SelectContent,
  SelectBackdrop,
  SelectPortal,
  SelectIcon,
  SelectInput,
  SelectTrigger,
  SelectDragIndicator,
} from "@/components/ui/select";

export default function SaidasScreen() {
  const [cartItems, setCartItems] = useState<
    { id: string; nome: string; preco: number; quantidade: number }[]
  >([]);
  const [selectedProduct, setSelectedProduct] = useState("");
  const [quantity, setQuantity] = useState("");
  const [total, setTotal] = useState(0);

  useEffect(() => {
    const newTotal = cartItems.reduce((sum, item) => {
      return sum + item.preco * item.quantidade;
    }, 0);
    setTotal(newTotal);
  }, [cartItems]);

  const addToCart = () => {
    if (!selectedProduct || !quantity || parseInt(quantity) <= 0) {
      Alert.alert(
        "Erro",
        "Selecione um produto e informe uma quantidade válida"
      );
      return;
    }

    const product = mockProducts.find((p) => p.id === selectedProduct);
    if (!product) {
      Alert.alert("Erro", "Produto não encontrado");
      return;
    }

    const existingItemIndex = cartItems.findIndex(
      (item) => item.id === product.id
    );

    if (existingItemIndex >= 0) {
      const updatedItems = [...cartItems];
      updatedItems[existingItemIndex].quantidade += parseInt(quantity);
      setCartItems(updatedItems);
    } else {
      setCartItems([
        ...cartItems,
        {
          id: product.id,
          nome: product.nome,
          preco: product.preco,
          quantidade: parseInt(quantity),
        },
      ]);
    }

    setSelectedProduct("");
    setQuantity("");
  };

  const removeFromCart = (id: string) => {
    setCartItems(cartItems.filter((item) => item.id !== id));
  };

  const handleSubmit = () => {
    if (cartItems.length === 0) {
      Alert.alert("Erro", "Adicione pelo menos um produto ao carrinho");
      return;
    }

    Alert.alert(
      "Sucesso",
      `Saída registrada com sucesso!\nTotal: R$ ${total.toFixed(2).replace(".", ",")}`,
      [
        {
          text: "OK",
          onPress: () => {
            setCartItems([]);
            setTotal(0);
          },
        },
      ]
    );
  };

  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: "#4A6572", dark: "#1D3D47" }}
      headerImage={
        <FontAwesome
          name="shopping-cart"
          size={80}
          color="#ffffff"
          style={styles.headerIcon}
        />
      }
    >
      <Box className="items-center mb-5 mt-2">
        <Heading size="xl">Saídas de Estoque</Heading>
      </Box>

      <Card className="p-5 mx-3 mb-5">
        <VStack space="md">
          <Box className="flex-row items-center justify-between mb-4">
            <Text className="text-lg font-bold">Adicionar Produto</Text>
          </Box>

          <Box>
            <Text className="mb-1">Selecione o Produto</Text>
            <Select
              onValueChange={setSelectedProduct}
              selectedValue={selectedProduct}
            >
              <SelectTrigger
                variant="outline"
                size="md"
                style={styles.selectTrigger}
              >
                <SelectInput placeholder="Selecione um produto" />
                <SelectIcon
                  style={styles.selectIcon}
                  as={FontAwesome}
                  name="chevron-down"
                />
              </SelectTrigger>
              <SelectPortal>
                <SelectBackdrop />
                <SelectContent>
                  <SelectDragIndicatorWrapper>
                    <SelectDragIndicator />
                  </SelectDragIndicatorWrapper>
                  {mockProducts.map((product) => (
                    <SelectItem
                      key={product.id}
                      label={product.nome}
                      value={product.id}
                    />
                  ))}
                </SelectContent>
              </SelectPortal>
            </Select>
          </Box>

          <Box>
            <Text className="mb-1">Quantidade</Text>
            <TextInput
              value={quantity}
              onChangeText={setQuantity}
              placeholder="0"
              keyboardType="numeric"
              style={styles.input}
            />
          </Box>

          <Button onPress={addToCart} className="mt-4">
            <ButtonText>Adicionar ao Carrinho</ButtonText>
          </Button>
        </VStack>
      </Card>

      <Card className="p-5 mx-3 mb-5">
        <Heading size="md" className="mb-4">
          Carrinho de Produtos
        </Heading>

        {cartItems.length === 0 ? (
          <Text className="text-center py-4">Nenhum produto adicionado</Text>
        ) : (
          <ScrollView style={styles.cartList}>
            {cartItems.map((item) => (
              <Box key={item.id} style={styles.cartItem}>
                <View style={styles.cartItemInfo}>
                  <Text className="font-bold">{item.nome}</Text>
                  <Text>Qtd: {item.quantidade}</Text>
                  <Text>
                    Valor un.: R$ {item.preco.toFixed(2).replace(".", ",")}
                  </Text>
                  <Text>
                    Subtotal: R${" "}
                    {(item.preco * item.quantidade)
                      .toFixed(2)
                      .replace(".", ",")}
                  </Text>
                </View>
                <TouchableOpacity
                  onPress={() => removeFromCart(item.id)}
                  style={styles.removeButton}
                >
                  <FontAwesome name="trash" size={20} color="#ff4d4d" />
                </TouchableOpacity>
              </Box>
            ))}
          </ScrollView>
        )}

        <Box style={styles.totalContainer}>
          <Text className="font-bold text-lg">Total:</Text>
          <Text className="font-bold text-lg">
            R$ {total.toFixed(2).replace(".", ",")}
          </Text>
        </Box>

        <Button onPress={handleSubmit} className="mt-4">
          <ButtonText>Finalizar Saída</ButtonText>
        </Button>
      </Card>
    </ParallaxScrollView>
  );
}

const styles = StyleSheet.create({
  headerIcon: {
    position: "absolute",
    bottom: 20,
    right: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 4,
    padding: 10,
    fontSize: 16,
    width: "100%",
  },
  select: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 4,
    padding: 10,
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  selectTrigger: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingRight: 10,
  },
  selectIcon: {
    position: "absolute",
    right: 10,
    fontSize: 16,
    color: "#666",
  },
  cartList: {
    maxHeight: 300,
  },
  cartItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },
  cartItemInfo: {
    flex: 1,
  },
  removeButton: {
    padding: 10,
  },
  totalContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 15,
    paddingTop: 15,
    borderTopWidth: 1,
    borderTopColor: "#eee",
  },
});
