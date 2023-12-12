import { HashRouter, BrowserRouter, Routes, Route } from "react-router-dom";
import { Dashboard, Downloads, Error } from "./pages";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route index path="/prova/" element={<Dashboard />} />
          <Route path="/prova/downloads" element={<Downloads />} />
          <Route path="*" element={<Error />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
