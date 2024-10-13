import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Provider } from "react-redux";
import { store } from "./lib/store";
import { Header } from "./components/Header";
import { Cart } from "./components/Cart";
import { ProductList } from "./components/ProductList";
import { ProductDetails } from "./components/ProductDetails";

function App() {
  return (
    <Provider store={store}>
      <Router>
        <div className="min-h-screen bg-gray-100">
          <Header />
          <main className="container mx-auto px-4 py-8">
            <Routes>
              <Route path="/" element={<ProductList />} />
              <Route path="/product/:id" element={<ProductDetails />} />
              <Route path="/category/:slug" element={<ProductList />} />
            </Routes>
          </main>
          <Cart />
        </div>
      </Router>
    </Provider>
  );
}

export default App;
