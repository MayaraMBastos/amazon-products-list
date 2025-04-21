import { useState } from 'react';
import './App.css';

function App() {
  const [keyword, setKeyword] = useState('');
  const [products, setProducts] = useState([]);
  const [error, setError] = useState('');

  // Função para buscar produtos
  const handleSearch = async () => {
    if (!keyword) {
      setError('Por favor, insira uma palavra-chave.');
      return;
    }

    try {
      const response = await fetch(`http://localhost:3000/api/scrape?keyword=${encodeURIComponent(keyword)}`);
      const data = await response.json();
      if (Array.isArray(data) && data.length > 0) {
        setProducts(data);
        setError('');
      } else {
        setError('Nenhum produto encontrado.');
        console.log(data)
        setProducts([]);
      }
    } catch (err) {
      setError('Erro ao buscar os produtos.');
      console.log(err);
      setProducts([]);
    }
  };

  return (
    <div className="App">
      <h1>Search Products from Amazon</h1>
      <input 
        type="text" 
        placeholder="Keyword..." 
        value={keyword}
        onChange={(e) => setKeyword(e.target.value)}
      />
      <button onClick={handleSearch}>Search</button>
      {error && <p className="error">{error}</p>}
      <div className="products">
        {products.map((product, index) => (
          <div className="product" key={index}>
            <img src={product.imageUrl} alt={product.title} />
            <h3>{product.title}</h3>
            <p>Classificação: {product.rating}</p>
            <p>Avaliações: {product.reviews}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
