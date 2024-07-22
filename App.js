import React from 'react';
import { StyleSheet, Text, View, FlatList, TouchableOpacity } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

const dataArray = [
  {
    id: 1,
    expense: 150,
    product: 'Sony Headphones',
    category: 'Electronics',
    expenseDate: '2023-08-27',
  },
  {
    id: 2,
    expense: 270,
    product: 'Asus Gaming Monitor',
    category: 'Electronics',
    expenseDate: '2023-09-24',
  },
  {
    id: 3,
    expense: 1400,
    product: 'Air Tickets',
    category: 'Travel',
    expenseDate: '2024-07-17',
  },
  {
    id: 4,
    expense: 34,
    product: 'Domino\'s Pizza',
    category: 'Food',
    expenseDate: '2024-06-25',
  },
  {
    id: 5,
    expense: 24,
    product: 'Deadpool-3',
    category: 'Entertainment',
    expenseDate: '2024-07-15',
  },
  {
    id: 6,
    expense: 124,
    product: 'Walmart',
    category: 'Groceries',
    expenseDate: '2024-07-16',
  },
  {
    id: 7,
    expense: 55,
    product: 'Hoodie',
    category: 'Clothes',
    expenseDate: '2024-07-20',
  },
];

const highestExpense = Math.max(...dataArray.map(item => item.expense));
const lowestExpense = Math.min(...dataArray.map(item => item.expense));

const getExpenseColor = (expense) => {
  if (expense === highestExpense) {
    return 'red';
  } else if (expense === lowestExpense) {
    return 'lightgreen';
  } else {
    return 'green';
  }
};

const ExpenseListScreen = ({ navigation }) => {
  const renderItem = ({ item }) => (
    <TouchableOpacity
      style={styles.item}
      onPress={() => navigation.navigate('Detail', { expense: item })}
    >
      <Ionicons name="logo-usd" size={24} color={getExpenseColor(item.expense)} style={styles.icon} />
      <View style={styles.itemContent}>
        <Text style={styles.title}>{item.product}</Text>
        <Text style={styles.subtitle}>{item.category}</Text>
      </View>
      <Text style={[styles.expense, { color: getExpenseColor(item.expense) }]}>${item.expense.toFixed(2)}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={dataArray}
        renderItem={renderItem}
        keyExtractor={item => item.id.toString()}
        style={styles.listContainer}
      />
    </View>
  );
};

const ExpenseDetailScreen = ({ route }) => {
  const { expense } = route.params;
  const expenseColor = getExpenseColor(expense.expense);

  return (
    <View style={styles.detailContainer}>
      <View style={styles.detailCard}>
        <Text style={styles.detailTitle}>{expense.product}</Text>
        <Text style={styles.detailSubtitle}>Expense: <Text style={[styles.detailAmount, { color: expenseColor }]}>${expense.expense.toFixed(2)}</Text></Text>
        <Text style={styles.detailSubtitle}>Category: {expense.category}</Text>
        <Text style={styles.detailSubtitle}>Date: {expense.expenseDate}</Text>
      </View>
    </View>
  );
};

const TotalExpenseScreen = () => {
  const totalTransactions = dataArray.length;
  const totalExpense = dataArray.reduce((total, item) => total + item.expense, 0);

  return (
    <View style={styles.summaryView}>
      <View style={styles.sView}>
        <Text style={styles.sText}>Total Number of Transactions:</Text>
        <Text style={styles.sVal}>{totalTransactions}</Text>
      </View>
      <View style={styles.sView}>
        <Text style={styles.sText}>Total Expenses:</Text>
        <Text style={styles.sVal}>${totalExpense.toFixed(2)}</Text>
      </View>
      <View style={styles.sView}>
        <Text style={styles.sText}>Highest Expense:</Text>
        <Text style={[styles.sVal, { color: 'red' }]}>${highestExpense.toFixed(2)}</Text>
      </View>
      <View style={styles.sView}>
        <Text style={styles.sText}>Lowest Expense:</Text>
        <Text style={[styles.sVal, { color: 'lightgreen' }]}>${lowestExpense.toFixed(2)}</Text>
      </View>
    </View>
  );
};

const HomeScreen = () => (
  <Stack.Navigator>
    <Stack.Screen name="Home" component={ExpenseListScreen} />
    <Stack.Screen
      name="Detail"
      component={ExpenseDetailScreen}
      options={{ title: 'Expense Detail' }}
    />
  </Stack.Navigator>
);

const SummaryScreen = () => (
  <Stack.Navigator>
    <Stack.Screen name="Summary" component={TotalExpenseScreen} options={{ headerShown: false }} />
  </Stack.Navigator>
);

export default function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            let iconName;
            if (route.name === 'Home') {
              iconName = focused ? 'home' : 'home-outline';
            } else if (route.name === 'Summary') {
              iconName = focused ? 'list' : 'list-outline';
            }
            return <Ionicons name={iconName} size={size} color={color} />;
          },
          tabBarActiveTintColor: '#007BFF',
          tabBarInactiveTintColor: 'gray',
        })}
      >
        <Tab.Screen name="Home" component={HomeScreen} options={{ headerShown: false }} />
        <Tab.Screen name="Summary" component={SummaryScreen} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 15,
    backgroundColor: '#F8F9FA',
  },
  listContainer: {
    marginTop: 5,
  },
  item: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFF',
    padding: 15,
    marginVertical: 5,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 2,
  },
  icon: {
    marginRight: 10,
  },
  itemContent: {
    flex: 1,
    marginRight: 10,
  },
  expense: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#343A40', // Changed to black
  },
  subtitle: {
    fontSize: 14,
    color: '#6C757D',
  },
  detailContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#F8F9FA',
  },
  detailCard: {
    backgroundColor: '#FFF',
    padding: 20,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 3,
    width: '100%',
    maxWidth: 400,
    alignItems: 'center',
  },
  detailTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#000', // Changed to black
    marginBottom: 10,
  },
  detailSubtitle: {
    fontSize: 18,
    color: '#6C757D',
    marginBottom: 10,
  },
  detailAmount: {
    fontWeight: 'bold',
  },
  summaryView: {
    flex: 1,
    padding: 20,
    backgroundColor: '#F8F9FA',
  },
  summaryTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#007BFF',
    marginBottom: 20,
    textAlign: 'center',
  },
  sView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#FFF',
    padding: 15,
    marginVertical: 5,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 2,
  },
  sText: {
    fontSize: 16,
    color: '#343A40',
  },
  sVal: {
    fontSize: 16,
    fontWeight: 'bold',
  },
});
