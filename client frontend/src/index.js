import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import store from "./Redux/store";
import { Provider } from "react-redux";
import ContactInfo from "./components/homeComponents/ContactInfo";
import Footer from "./components/Footer";

ReactDOM.render(
  <Provider store={store}>
    <App />
    <ContactInfo />
    <Footer />
  </Provider>,

  document.getElementById("root")
);
