"use client";
import Footer from "./components/Footer";
import Navbar from "./components/Navbar";
import "./globals.css";
import { Provider } from "react-redux";
import { thunk } from "redux-thunk";
import rootReducer from "./redux/reducers";
import { createStore, applyMiddleware, compose } from "redux";
import { ToastContainer } from "react-toastify";
const store = createStore(rootReducer, compose(applyMiddleware(thunk)));
export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <Provider store={store}>
          <ToastContainer />
          <Navbar />
          {children}
          <Footer />
        </Provider>
        {/* <script src="https://unpkg.com/boxicons@2.1.4/dist/boxicons.js"></script> */}
      </body>
    </html>
  );
}
