import express from "express";
import cors from "cors";
import axios from "axios";
import { JSDOM } from "jsdom";
import fs from "fs"; // aqui é com import!

const app = express();
const PORT = 3000;

app.use(cors());

app.get("/api/scrape", async (req, res) => {
  const { keyword } = req.query;

  if (!keyword) {
    return res.status(400).json({ error: "Parâmetro 'keyword' é obrigatório." });
  }

  try {
    const url = `https://www.amazon.com/s?k=${encodeURIComponent(keyword)}`;
    const response = await axios.get(url, {
      headers: {
        "User-Agent":
          "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0 Safari/537.36",
        "Accept-Language": "en-US,en;q=0.9",
        "Accept": "text/html,application/xhtml+xml",
      },
    });

    fs.writeFileSync('pagina.html', response.data); // salva para debug

    const dom = new JSDOM(response.data);
    const document = dom.window.document;
    const items = [];

    const products = document.querySelectorAll("div.s-result-item");

    products.forEach((product) => {
      const title = product.querySelector(".a-size-medium")?.textContent?.trim();
      const rating = product.querySelector(".a-icon-alt")?.textContent?.trim();
      const reviews = product.querySelector(".a-size-base.s-underline-text")?.textContent?.trim();
      const image = product.querySelector("img.s-image")?.src;
      const link = product.querySelector("a.a-link-normal")?.href;
      const url= `https://www.amazon.com${link}`; // Corrigido para incluir o domínio completo

      if (title && image) {
        items.push({
          title,
          rating,
          reviews,
          image,
          url,
        });
      }
    });

    res.json({ results: items });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Erro ao buscar dados da Amazon." });
  }
});

app.listen(PORT, () => {
  console.log(`🚀 Servidor backend rodando em http://localhost:${PORT}`);
});