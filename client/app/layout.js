"use client";

import Footer from "./components/Footer";
import Navbar from "./components/Navbar";
import "./globals.css";
import { Provider } from "react-redux";
import { thunk } from "redux-thunk";
import rootReducer from "./redux/reducers";
import { createStore, applyMiddleware, compose } from "redux";
import { ToastContainer } from "react-toastify";
import LeftSidebar from "./components/LeftSidebar";
import RightSidebar from "./components/RightSidebar";
import { usePathname } from "next/navigation";

const store = createStore(rootReducer, compose(applyMiddleware(thunk)));

export default function RootLayout({ children }) {
  const pathname = usePathname();
  const hideSidebars = pathname.startsWith("/auth"); // or pathname.includes("/auth")

  return (
    <html lang="en">
      <body>
        <Provider store={store}>
          <ToastContainer />
          <Navbar />
          <div className="flex justify-between px-5 mt-4">
            {!hideSidebars && <LeftSidebar />}
            {children}
            {!hideSidebars && <RightSidebar />}
          </div>
          <Footer />
        </Provider>
      </body>
    </html>
  );
}
