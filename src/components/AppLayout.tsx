import React from 'react';
import { View, Text, StyleSheet, SafeAreaView } from 'react-native';

type AppLayoutProps = {
  title: string;
  children: React.ReactNode;
};

const AppLayout: React.FC<AppLayoutProps> = ({ title, children }) => {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>{title}</Text>
      </View>
      <View style={styles.content}>
        {children}
      </View>
    </SafeAreaView>
  );
};

export default AppLayout;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  header: {
    paddingVertical: 12,
    paddingHorizontal: 16,
    backgroundColor: '#222',
  },
  headerTitle: {
    color: '#ffffff',
    fontSize: 20,
    fontWeight: 'bold',
  },
  content: {
    flex: 1,
    padding: 16,
  },
});
