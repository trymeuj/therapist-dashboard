import { BrowserRouter, useRoutes } from "react-router-dom";
import Themeroutes from "./routes/Router";

const App = () => {
  const AppRoutes = () => {
    const routing = useRoutes(Themeroutes);
    return routing;
  };

  return <BrowserRouter>
  <div className="dark">
    <AppRoutes />
  </div>
</BrowserRouter>;
};

export default App;
