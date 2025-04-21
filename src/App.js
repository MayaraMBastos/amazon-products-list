import React, { useState } from "react";
import ProductsList from "./components/ProductsList";

function App() {
  const [products, setProducts] = useState([]);
  const [keyword, setKeyword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSearch = async () => {
    if (!keyword.trim()) return;
    setLoading(true);
    try {
      const response = await fetch(`http://localhost:3000/api/scrape?keyword=${keyword}`);
      const data = await response.json();
      setProducts(data.results);
    } catch (error) {
      console.error("Erro ao buscar produtos:", error);
      setProducts([]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="input-container">
      <h1>Search Products List on Amazon</h1>
      <div className="input-group">
      <input
        type="text"
        value={keyword}
        onChange={(e) => setKeyword(e.target.value)}
        placeholder="Add product name..."
      />
      <button onClick={handleSearch}>Search</button>
      </div>

      {loading ? <p>Carregando...</p> : <ProductsList products={products} />}
    </div>
  );
}

export default App;
