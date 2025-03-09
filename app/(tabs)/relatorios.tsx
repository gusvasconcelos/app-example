import React, { useState, useEffect } from "react";
import { StyleSheet, View, Dimensions, ScrollView } from "react-native";
import { Card } from "@/components/ui/card";
import { Heading } from "@/components/ui/heading";
import { Text } from "@/components/ui/text";
import { Box } from "@/components/ui/box";
import { FontAwesome } from "@expo/vector-icons";
import ParallaxScrollView from "@/components/ParallaxScrollView";
import { LineChart, BarChart, PieChart } from "react-native-chart-kit";
import { mockProducts } from "@/data/mockData";

const screenWidth = Dimensions.get("window").width;

export default function RelatoriosScreen() {
  const [vendasDiarias, setVendasDiarias] = useState({
    labels: ["Seg", "Ter", "Qua", "Qui", "Sex", "Sáb", "Dom"],
    datasets: [
      {
        data: [20, 45, 28, 80, 99, 43, 50],
        color: (opacity = 1) => `rgba(134, 65, 244, ${opacity})`,
        strokeWidth: 2,
      },
    ],
    legend: ["Vendas diárias"],
  });

  const [produtosEstoque, setProdutosEstoque] = useState({
    labels: ["Em estoque", "Baixo estoque", "Sem estoque"],
    data: [0.7, 0.2, 0.1],
  });

  const [categoriaVendas, setCategoriaVendas] = useState([
    {
      name: "Notebooks",
      population: 45,
      color: "#FF5733",
      legendFontColor: "#7F7F7F",
      legendFontSize: 12,
    },
    {
      name: "Monitores",
      population: 28,
      color: "#33FF57",
      legendFontColor: "#7F7F7F",
      legendFontSize: 12,
    },
    {
      name: "Periféricos",
      population: 80,
      color: "#3357FF",
      legendFontColor: "#7F7F7F",
      legendFontSize: 12,
    },
    {
      name: "Componentes",
      population: 99,
      color: "#F3FF33",
      legendFontColor: "#7F7F7F",
      legendFontSize: 12,
    },
    {
      name: "Outros",
      population: 43,
      color: "#FF33F3",
      legendFontColor: "#7F7F7F",
      legendFontSize: 12,
    },
  ]);

  const chartConfig = {
    backgroundGradientFrom: "#fff",
    backgroundGradientTo: "#fff",
    decimalPlaces: 0,
    color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
    labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
    style: {
      borderRadius: 16,
    },
    propsForDots: {
      r: "6",
      strokeWidth: "2",
      stroke: "#ffa726",
    },
  };

  useEffect(() => {
    const totalProdutos = mockProducts.length;
    const baixoEstoque = mockProducts.filter(
      (p) => p.estoque > 0 && p.estoque <= 10
    ).length;
    const semEstoque = mockProducts.filter((p) => p.estoque === 0).length;
    const comEstoque = totalProdutos - baixoEstoque - semEstoque;

    setProdutosEstoque({
      labels: ["Em estoque", "Baixo estoque", "Sem estoque"],
      data: [
        comEstoque / totalProdutos,
        baixoEstoque / totalProdutos,
        semEstoque / totalProdutos,
      ],
    });
  }, []);

  const totalProdutos = mockProducts.length;
  const valorTotalEstoque = mockProducts.reduce(
    (total, produto) => total + produto.preco * produto.estoque,
    0
  );
  const vendasTotais = vendasDiarias.datasets[0].data.reduce(
    (a, b) => a + b,
    0
  );
  const ticketMedio = valorTotalEstoque / vendasTotais;

  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: "#4A6572", dark: "#1D3D47" }}
      headerImage={
        <FontAwesome
          name="bar-chart"
          size={80}
          color="#ffffff"
          style={styles.headerIcon}
        />
      }
    >
      <Box className="items-center mb-5 mt-2">
        <Heading size="xl">Relatórios</Heading>
      </Box>

      {/* Cards de resumo */}
      <View style={styles.cardsContainer}>
        <Card style={styles.summaryCard}>
          <FontAwesome name="cubes" size={24} color="#4A6572" />
          <Text className="text-lg font-bold mt-2">{totalProdutos}</Text>
          <Text className="text-sm">Produtos</Text>
        </Card>

        <Card style={styles.summaryCard}>
          <FontAwesome name="shopping-cart" size={24} color="#4A6572" />
          <Text className="text-lg font-bold mt-2">{vendasTotais}</Text>
          <Text className="text-sm">Vendas</Text>
        </Card>

        <Card style={styles.summaryCard}>
          <FontAwesome name="money" size={24} color="#4A6572" />
          <Text className="text-lg font-bold mt-2">
            R$ {valorTotalEstoque.toFixed(2).replace(".", ",")}
          </Text>
          <Text className="text-sm">Em Estoque</Text>
        </Card>

        <Card style={styles.summaryCard}>
          <FontAwesome name="ticket" size={24} color="#4A6572" />
          <Text className="text-lg font-bold mt-2">
            R$ {ticketMedio.toFixed(2).replace(".", ",")}
          </Text>
          <Text className="text-sm">Ticket Médio</Text>
        </Card>
      </View>

      {/* Gráfico de status de estoque */}
      <Card className="p-5 mx-3 mb-5">
        <Heading size="md" className="mb-4">
          Status de Estoque
        </Heading>
        <View style={styles.chartContainer}>
          <PieChart
            data={[
              {
                name: "Em estoque",
                population: Math.round(produtosEstoque.data[0] * 100),
                color: "#4CAF50",
                legendFontColor: "#7F7F7F",
                legendFontSize: 12,
              },
              {
                name: "Baixo estoque",
                population: Math.round(produtosEstoque.data[1] * 100),
                color: "#FFC107",
                legendFontColor: "#7F7F7F",
                legendFontSize: 12,
              },
              {
                name: "Sem estoque",
                population: Math.round(produtosEstoque.data[2] * 100),
                color: "#F44336",
                legendFontColor: "#7F7F7F",
                legendFontSize: 12,
              },
            ]}
            width={screenWidth - 50}
            height={220}
            chartConfig={chartConfig}
            accessor="population"
            backgroundColor="transparent"
            paddingLeft="15"
            absolute
          />
        </View>
      </Card>

      {/* Produtos mais vendidos */}
      <Card className="p-5 mx-3 mb-5">
        <Heading size="md" className="mb-4">
          Produtos Mais Vendidos
        </Heading>
        <ScrollView>
          {mockProducts.slice(0, 5).map((produto, index) => (
            <View key={produto.id} style={styles.productItem}>
              <View style={styles.productRank}>
                <Text className="font-bold text-white">{index + 1}</Text>
              </View>
              <View style={styles.productInfo}>
                <Text className="font-bold">{produto.nome}</Text>
                <Text>
                  Vendas: {Math.floor(Math.random() * 50) + 10} unidades
                </Text>
                <Text>
                  Valor: R$ {produto.preco.toFixed(2).replace(".", ",")}
                </Text>
              </View>
            </View>
          ))}
        </ScrollView>
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
  cardsContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    paddingHorizontal: 15,
    marginBottom: 15,
  },
  summaryCard: {
    width: "48%",
    padding: 15,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 10,
  },
  chart: {
    marginVertical: 8,
    borderRadius: 16,
  },
  chartContainer: {
    alignItems: "center",
    justifyContent: "center",
  },
  productItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },
  productRank: {
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: "#4A6572",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 15,
  },
  productInfo: {
    flex: 1,
  },
});
