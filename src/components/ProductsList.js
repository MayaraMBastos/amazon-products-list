import styles from'./ProductsList.module.css'

function ProductsList({ products }) {
  if (!products.length) return <p>No products found.</p>;

  return (
    <div className={styles["product-list"]}>
      {products.map((product, index) => (
        <div key={index} className={styles.product}>
          <img src={product.image} alt={product.title} />
          <h3>{product.title}</h3>
          <p>{product.rating} — {product.reviews} reviews</p>
        </div>
      ))}
    </div>
  );
}

export default ProductsList;

  