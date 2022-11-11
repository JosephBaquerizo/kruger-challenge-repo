import './App.css';
import Header from "./layouts/Header";
import RoutesComponent from "./routes";
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { store, persistor } from './store/index';
import { Toaster } from 'react-hot-toast';

function App() {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <Toaster />
        <Header />
        <RoutesComponent />
      </PersistGate>
    </Provider>
  );
}

export default App;
