import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { router } from "./app/routes/Routes";
import { Provider } from 'react-redux';
import { RouterProvider } from 'react-router-dom';
import { store, persistor } from './app/store/store';
import { ToastContainer } from "react-toastify";
import { PersistGate } from 'redux-persist/integration/react';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <ToastContainer position="bottom-right" hideProgressBar theme="colored" />
        <RouterProvider router={router} />
      </PersistGate>
    </Provider>
  </StrictMode>,
);
