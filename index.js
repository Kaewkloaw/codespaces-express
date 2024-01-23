const express = require('express');
const app = express();
const port = 3000;

app.set("view engine", "ejs");

const products = [];
for (let i = 1; i <= 100; i++) {
  const product = {
    id: i,
    name: `Product ${i}`,
    price: (Math.random() * 100).toFixed(2),
    description: `This is a description of the product ${i}`,
  };
  products.push(product);
}

app.get('/products', (req, res) => {
  const limit = parseInt(req.query.limit);
  const page = parseInt(req.query.page);
  const startIndex = (page - 1) * limit;
  const endIndex = page * limit;
  const paginatedProducts = products.slice(startIndex, endIndex);
  console.log(paginatedProducts);

  res.render('products', { paginatedProducts, limit, page });
});
app.get('/', (req, res) => {
  res.render('index', { products });
});

app.get('/page2', (req, res) => {
  const name = req.query.name;
  const age = req.query.age;
  res.render('page2', { name, age });
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});