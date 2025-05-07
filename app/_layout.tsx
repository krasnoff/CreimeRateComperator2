import { Drawer } from 'expo-router/drawer';
import { useEffect } from 'react';
import { I18nManager } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

export default function Layout() {
  useEffect(() => {
    if (!I18nManager.isRTL) {
      I18nManager.allowRTL(true);
      I18nManager.forceRTL(true);      
    }
  }, []);

  return (
    // <AutocompleteDropdownContextProvider
    // //  headerOffset={100}
    // >
    <GestureHandlerRootView style={{ flex: 1 }}>
      <Drawer screenOptions={{
        drawerPosition: 'right', // 👈 this changes the drawer to open from the right
      }}>
        <Drawer.Screen
          name="index" // This is the name of the page and must match the url from root
          options={{
            drawerLabel: 'בחר קריטריונים להשוואה',
            title: 'מפת הפשיעה בישראל',
            drawerItemStyle: { direction: 'rtl' }, 
            
          }}
        />
        <Drawer.Screen
          name="about" // This is the name of the page and must match the url from root
          options={{
            drawerLabel: 'אודות',
            title: 'מפת הפשיעה בישראל',
            drawerItemStyle: { direction: 'rtl' }, 
          }}
        />
        <Drawer.Screen
          name="+not-found"
          options={{
            drawerItemStyle: { height: 0 }, // Hides it from drawer
            drawerLabel: () => null,         // Hides label
            title: '',                       // No title
          }}
        />
      </Drawer>
    </GestureHandlerRootView>
    // </AutocompleteDropdownContextProvider>
  );
}
