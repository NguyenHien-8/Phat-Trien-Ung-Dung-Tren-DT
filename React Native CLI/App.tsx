import React, { useState } from 'react'; 
import { 
  LineChart, 
  BarChart, 
  PieChart, 
  ProgressChart, 
  ContributionGraph, 
  StackedBarChart 
} from 'react-native-chart-kit';

import { 
  SafeAreaView, 
  ScrollView, 
  StyleSheet, 
  Text, 
  View, 
  Dimensions, 
  Alert, 
  TouchableOpacity,
  Platform,   
  StatusBar,   
  Image
} from 'react-native';

const screenWidth = Dimensions.get('window').width; 

const chartConfig = {
  backgroundGradientFrom: '#ffffff', 
  backgroundGradientTo: '#ffffff',
  color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`, 
  labelColor: (opacity = 1) => `rgba(30, 30, 30, ${opacity})`, 
  strokeWidth: 2, 
  barPercentage: 0.8, 
  useShadowColorFromDataset: false, 
  decimalPlaces: 0, 
  propsForDots: {
    r: '5', 
    strokeWidth: '2', 
    stroke: '#e51e1e', 
  },
};

const App = () => {
  const [showCharts, setShowCharts] = useState(false);

  // --- Line Chart ---
  const lineData = {
    labels: ['T2', 'T3', 'T4', 'T5', 'T6', 'T7'], 
    datasets: [
      {
        data: [15, 8, 5, 20, 12, 30], 
        color: (opacity = 1) => `rgba(211, 47, 47, ${opacity})`, 
        strokeWidth: 2,
      },
      {
      data: [10, 15, 3, 10, 8, 20], 
      color: (opacity = 1) => `rgba(54, 162, 235, ${opacity})`, 
      strokeWidth: 2,
      }
    ],
    // legend: ['Học sinh đi trễ'],
    legend: ['Tuần này', 'Tuần trước'],
  };

  // --- Bar Chart: Biểu đồ cột (Bar) ---
  const barData = {
    labels: ['Khối 10', 'Khối 11', 'Khối 12'],
    datasets: [{data: [45, 30, 60]}], 
  };

  // --- Pie Chart: Biểu đồ tròn (Pie) ---
  const pieData = [
    {
      name: 'Đi trễ',
      population: 85,
      color: '#FFC107', 
      legendFontColor: '#333',
      legendFontSize: 13,
    },
    {
      name: 'Vắng có phép',
      population: 15,
      color: '#4CAF50', 
      legendFontColor: '#333',
      legendFontSize: 13,
    },
    {
      name: 'Vắng không phép',
      population: 9,
      color: '#F44336', 
      legendFontColor: '#333',
      legendFontSize: 13,
    },
  ];

  // ==================================================================================
  // 4. Dữ liệu Biểu đồ tiến độ (Progress Chart) 
  // Chủ đề: Tỷ lệ hoàn thành mục tiêu chuyên cần
  const progressData = {
    labels: ["Mục tiêu Vắng KP", "Mục tiêu Đi trễ", "Tỷ lệ Đúng giờ"], 
    // Vắng không phép < 5% (0.05 -> đạt 95%), Đi trễ < 10% (0.1 -> đạt 90%)
    data: [0.92, 0.85, 0.70] 
  };

  // ==================================================================================
  // 5. Dữ liệu Biểu đồ hoạt động/Nhiệt (Contribution Graph)
  // Chủ đề: Mật độ vi phạm (vắng + trễ) theo ngày
  const contributionData = [
    { date: "2024-03-01", count: 5 }, 
    { date: "2024-03-02", count: 2 }, 
    { date: "2024-03-04", count: 15 }, 
    { date: "2024-03-05", count: 8 },
    { date: "2024-03-06", count: 6 },
    { date: "2024-03-07", count: 4 },
    { date: "2024-03-08", count: 12 }, 
    { date: "2024-03-11", count: 18 },
    { date: "2024-03-12", count: 10 },
    { date: "2024-03-25", count: 7 },
    { date: "2024-03-29", count: 3 }, 
  ];

  // ==================================================================================
  // 6. Dữ liệu Biểu đồ cột chồng (Stacked Bar Chart)
  // Chủ đề: So sánh Vắng có phép vs Vắng không phép theo khối
  const stackedBarData = {
    labels: ["Khối 10", "Khối 11", "Khối 12"],
    legend: ["Vắng Có phép", "Vắng Không phép"],
    data: [
      [35, 15], // Khối 10: 35 CP, 15 KP
      [20, 30], // Khối 11: 20 CP, 30 KP
      [10, 45]  // Khối 12: 10 CP, 45 KP (Tỷ lệ KP cao nhất)
    ],
    barColors: ["#4CAF50", "#D32F2F"] 
  };

  // --- Render Màn hình Menu ---
  if (!showCharts) {
    return (
      <SafeAreaView style={styles.menuContainer}>
        <View style={styles.menuContent}>
          <Image 
            source={require('./logo-ctu.png')}
            style={styles.logo} 
          />

          <Text style={styles.menuTitle}>ỨNG DỤNG</Text>
          <Text style={styles.menuTitle}>QUẢN LÝ HỌC SINH</Text>
          <Text style={styles.menuSubtitle}>CAN THO UNIVERSITY</Text>
          
          <TouchableOpacity 
            style={styles.menuButton}
            onPress={() => setShowCharts(true)} 
          >
            <Text style={styles.menuButtonText}>XEM BIỂU ĐỒ QUẢN LÝ HỌC SINH</Text>
          </TouchableOpacity>

          <TouchableOpacity 
            style={[styles.menuButton, { backgroundColor: '#757575' }]}
            onPress={() => Alert.alert("Notification", "Feature under development")}
          >
            <Text style={styles.menuButtonText}>CÀI ĐẶT HỆ THỐNG</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  }

  // --- Render Màn hình Biểu đồ ---
  return (
    <SafeAreaView style={styles.container}>
      
      <View style={styles.topBar}>
        <TouchableOpacity 
          style={styles.backButton}
          onPress={() => setShowCharts(false)} 
          activeOpacity={0.7} 
        >
          <Text style={styles.backButtonText}>{'< Quay lại Menu'}</Text>
        </TouchableOpacity>
      </View>

      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <Text style={styles.headerTitle}>ỨNG DỤNG THEO DÕI SỐ LƯỢNG HỌC SINH VẮNG VÀ ĐI TRỄ</Text>
        {/*/////////////////////////////////////////////////////////////////////////////////////*/}
        {/* --- Line Chart Biểu đồ đường --- */}
        <View style={styles.card}>
          <Text style={styles.cardTitle}>THỐNG KÊ ĐI TRỄ (LINE)</Text>
          <LineChart
            data={lineData}
            width={screenWidth - 40} 
            height={220}
            // chartConfig={chartConfig}
            chartConfig={{
              ...chartConfig,
              backgroundGradientFrom: '#507ae2',
              backgroundGradientTo: '#fff',
              color: (opacity = 1) => `rgba(211, 47, 47, ${opacity})`, 
              labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
            }}
            bezier 
            // yAxisSuffix=" hs"
            // yAxisInterval={1}
            style={{
              marginVertical: 80,
              borderRadius: 16,       
              }}
            // style={styles.chartStyle}
            onDataPointClick={({value}) => 
              Alert.alert('Chi tiết', `Số lượng: ${value}`)
            }
          />
        </View>
        {/*/////////////////////////////////////////////////////////////////////////////////////*/}
        {/* --- Bar Chart Biểu đồ cột --- */}
        <View style={styles.card}>
          <Text style={styles.cardTitle}>VI PHẠM THEO KHỐI (BAR)</Text>
          <BarChart
            data={barData}
            width={screenWidth - 40}
            height={220}
            yAxisLabel="" 
            yAxisSuffix=" hs" 
            chartConfig={{
                ...chartConfig,
                color: (opacity = 1) => `rgba(25, 118, 210, ${opacity})`, 
            }}
            style={styles.chartStyle}
            showBarTops={true} 
            fromZero={true} 
          />
        </View>

        {/*/////////////////////////////////////////////////////////////////////////////////////*/}
        {/* --- Pie Chart Biểu đồ tròn --- */}
        <View style={styles.card}>
          <Text style={styles.cardTitle}>TỶ LỆ CHUYÊN CẦN (PIE)</Text>
          <PieChart
            data={pieData}
            width={screenWidth - 40}
            height={220}
            chartConfig={chartConfig}
            accessor={'population'}
            backgroundColor={'transparent'}
            paddingLeft={'15'}
            absolute 
          />
        </View>

        {/*/////////////////////////////////////////////////////////////////////////////////////*/}
        {/* --- Progress Chart (Progress Chart) --- */}
        <View style={styles.card}>
          <Text style={styles.cardTitle}>TỶ LỆ HOÀN THÀNH MỤC TIÊU (PROGRESS)</Text>
          <ProgressChart
            data={progressData}
            width={screenWidth - 40}
            height={220}
            strokeWidth={16}
            radius={32}
            chartConfig={{
              ...chartConfig,
              backgroundGradientFrom: '#fff',
              backgroundGradientTo: '#fff',
              color: (opacity = 1) => `rgba(255, 152, 0, ${opacity})`,
            }}
            hideLegend={false}
            style={styles.chartStyle}
          />
        </View>

        {/*/////////////////////////////////////////////////////////////////////////////////////*/}
        {/* --- Contribution Graph (Contribution Graph) --- */}
        <View style={styles.card}>
          <Text style={styles.cardTitle}>MẬT ĐỘ VI PHẠM TRONG THÁNG (HEATMAP)</Text>
          <ContributionGraph
            values={contributionData}
            endDate={new Date("2024-04-01")}
            numDays={90} 
            width={screenWidth - 40}
            height={220}
            chartConfig={{
              ...chartConfig,
              backgroundGradientFrom: '#fff',
              backgroundGradientTo: '#fff',
              color: (opacity = 1) => `rgba(211, 47, 47, ${opacity})`, 
              labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
            }}
            style={styles.chartStyle}
            gutterSize={2} 
            squareSize={22}
          />
          <Text style={{textAlign: 'center', fontSize: 12, fontStyle: 'italic', marginBottom: 5, color: '#666'}}>
            (Số lượng học sinh Vắng/Trễ theo ngày)
          </Text>
        </View>

        {/*/////////////////////////////////////////////////////////////////////////////////////*/}
        {/* --- Stacked Bar Chart (Stacked Bar Chart) --- */}
        <View style={styles.card}>
          <Text style={styles.cardTitle}>SO SÁNH LOẠI VẮNG THEO KHỐI (STACKED)</Text>
          <StackedBarChart
            data={stackedBarData}
            width={screenWidth - 40}
            height={220}
            chartConfig={{
              ...chartConfig,
              backgroundGradientFrom: '#fff',
              backgroundGradientTo: '#fff',
              color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`, 
              labelColor: (opacity = 1) => `rgba(0,0,0, ${opacity})`,
            }}
            style={styles.chartStyle}
            barPercentage={0.6}
          />
        </View>
        {/*/////////////////////////////////////////////////////////////////////////////////////*/}

        <TouchableOpacity 
          style={styles.bottomExitButton}
          onPress={() => setShowCharts(false)}
        >
          <Text style={styles.bottomExitText}>THOÁT MÀN HÌNH</Text>
        </TouchableOpacity>

      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
  },
  scrollContainer: {
    padding: 10,
    paddingBottom: 30,
  },
  headerTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
    marginTop: 10,
    color: '#fd3300', 
  },
  card: {
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 10,
    marginBottom: 20,
    elevation: 4, 
    shadowColor: '#000', 
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: '700', 
    marginBottom: 10,
    marginLeft: 10,
    color: '#333',
    textTransform: 'uppercase', 
  },
  chartStyle: {
    borderRadius: 12,
    marginVertical: 8,
  },
  logo: {
    width: 120,   
    height: 120,  
    resizeMode: 'contain', 
    marginBottom: 20, 
  },
  menuContainer: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
  },
  menuContent: {
    width: '100%',
    paddingHorizontal: 20,
    alignItems: 'center',
  },
  menuTitle: {
    fontSize: 35,
    fontWeight: 'bold',
    color: '#2c3e50',
    marginBottom: 10,
    textAlign: 'center'
  },
  menuSubtitle: {
    fontSize: 18,
    color: '#7f8c8d',
    marginBottom: 50,
  },
  menuButton: {
    backgroundColor: '#2196F3', 
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 30,
    width: '100%',
    alignItems: 'center',
    marginBottom: 15,
    elevation: 3,
  },
  menuButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  topBar: {
    paddingHorizontal: 15,
    paddingVertical: 10,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
    zIndex: 999, 
    elevation: 5, 
  },
  backButton: {
    padding: 15,
  },
  backButtonText: {
    color: '#2196F3',
    fontSize: 16,
    fontWeight: '600',
  },
  bottomExitButton: {
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#D32F2F',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 10,
    marginBottom: 20,
  },
  bottomExitText: {
    color: '#D32F2F',
    fontWeight: 'bold',
  }
});

export default App;