import React, { Suspense, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import AppRoutes from "./routes";
import Header from "./components/Header";
import Spin from "./components/Spin";
import { getData } from "./store/master/action.creators";
import "./App.css";

function App() {
  const dispatch = useDispatch();
  const { isLoading } = useSelector((state) => state.master);
  useEffect(() => {
    dispatch(getData());
  }, [dispatch]);
  return (
    <Suspense fallback="Loading..">
      <div className="app-container">
        <Header />
        <AppRoutes />
        <Spin show={isLoading} />
        <ToastContainer hideProgressBar position="top-right" />
      </div>
    </Suspense>
  );
}

export default App;
