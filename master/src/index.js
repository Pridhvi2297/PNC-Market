import React, { lazy, Suspense } from "react";
import { createRoot } from "react-dom";
import { Toaster } from "react-hot-toast";
import store from "./store";
import { Provider } from "react-redux";
import "./index.css";
import reportWebVitals from "./reportWebVitals";
import { BrowserRouter } from "react-router-dom";

const App = lazy(() => import("./App"));
const root = createRoot(document.getElementById("root"));

root.render(
  <BrowserRouter>
    <Provider store={store}>
      <Suspense fallback={<div>Loading...</div>}>
        <App />
        <Toaster
          toastOptions={{
            position: "top-right",
            background: "#000031",
            color: "#fcfcff",
          }}
        />
      </Suspense>
    </Provider>
  </BrowserRouter>
);

reportWebVitals();
