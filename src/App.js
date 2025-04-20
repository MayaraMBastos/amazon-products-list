import { useEffect, useState } from "react";
import "./index.css";

import InputSearch from "./InputSearch";
import ProductsList from "./ProductsList";

export function App() {
  const [search, setSearch] = useState("");
  const [products, setProducts] = useState([]);

  useEffect(() => {
    if (search.trim() === "") return;

    const fetchProducts = async () => {
      try {
        const res = await fetch(`/api/scrape?keyword=${encodeURIComponent(search)}`);
        const data = await res.json();
        setProducts(data);
      } catch (err) {
        console.error("Erro ao buscar produtos:", err);
        setProducts([]);
      }
    };

    fetchProducts();
  }, [search]);

  return (
    <div className="app">
      <h1>Search Best Products</h1>
      <p>Search for the best products on Amazon:</p>
      <InputSearch setSearch={setSearch} />
      <div><ProductsList products={products} /></div>
    </div>
  );
}

export default App;
