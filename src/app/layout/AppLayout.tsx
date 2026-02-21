import React from 'react';
import { View, StyleSheet, Image, useColorScheme, Dimensions } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

type Props = {
  children: React.ReactNode;
};

const AppLayout: React.FC<Props> = ({ children }) => {
  const insets = useSafeAreaInsets();
  const colorScheme = useColorScheme();
  const { width: screenWidth } = Dimensions.get('window');

  // Responsive logo sizing (keeps original aspect ratio 140x36)
  const logoMaxWidth = 140;
  const logoMinWidth = 96;
  const logoWidth = Math.min(logoMaxWidth, Math.max(logoMinWidth, Math.round(screenWidth * 0.36)));
  const logoHeight = Math.round(logoWidth * (36 / 140));

  // Local theme colors — replace with app theme variables if available
  const colors =
    colorScheme === 'dark'
      ? { background: '#000000', headerBackground: 'transparent', logoTint: '#ffffff' }
      : { background: '#ffffff', headerBackground: 'transparent', logoTint: undefined };

  return (
    <View
      style={[
        styles.container,
        { paddingTop: insets.top, paddingBottom: insets.bottom, backgroundColor: colors.background },
      ]}
    >
      <View style={[styles.header, { backgroundColor: colors.headerBackground }]}> 
        <Image
          source={require('../../assets/images/logo.png')}
          style={[styles.logo, { width: logoWidth, height: logoHeight, tintColor: colors.logoTint }]}
          resizeMode="contain"
          accessible
          accessibilityRole="image"
          accessibilityLabel="Stream logo"
        />
      </View>
      {children}
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },
  header: { alignItems: 'center', paddingVertical: 8 },
  logo: { width: 140, height: 36 },
});

export default AppLayout;
