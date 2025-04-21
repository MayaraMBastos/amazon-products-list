import styles from './ProductsList.module.css';

function renderStars(rating) {
  const ratingNumber = Math.round(parseFloat(rating)) || 0;
  const fullStars = '★'.repeat(ratingNumber);
  const emptyStars = '☆'.repeat(5 - ratingNumber);
  return (
    <span className={styles.stars}>
      {fullStars}{emptyStars}
    </span>
  );
}

function ProductsList({ products }) {
  if (!products.length) return <p>No products found.</p>;

  return (
    <div className={styles["product-list"]}>
      {products.map((product, index) => (
        <div key={index} className={styles.product}>
          <img src={product.image} alt={product.title} />
          <h3>{product.title}</h3>
          <p>
            {renderStars(product.rating)} — {product.reviews} reviews
          </p>
        </div>
      ))}
    </div>
  );
}

export default ProductsList;
