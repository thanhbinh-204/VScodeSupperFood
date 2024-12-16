import React from 'react';
import { Provider } from 'react-redux';
import { persistor,store } from './redux/Store';
import AppNavigation from './navigations/AppNavigation';
import { SafeAreaView } from 'react-native-safe-area-context';
import { PersistGate } from 'redux-persist/integration/react';


function App(): React.JSX.Element {
  return (
    <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>

      <SafeAreaView
        style={{ flex: 1 }}>
        <AppNavigation />
      </SafeAreaView>

    </PersistGate>
  </Provider>
  );
}

export default App;
