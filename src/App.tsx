import "./App.css";
import Router from "./Router";
import { FC } from "react";

const App: FC = () => {
  const message = "Hello from";
  console.log(`${message} App`);

  return <Router message={message} />;
};

export default App;
