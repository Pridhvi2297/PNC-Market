class QueryProducts {
  constructor(products, query) {
    this.products = products;
    this.query = query;
  }

  categoryQuery = () => {
    this.products = this.query.category ? this.products.filter((c) => c.category === this.query.category) : this.products;
    return this;
  };

  ratingQuery = () => {
    this.products = this.query.rating ? this.products.filter((c) => parseInt(this.query.rating) <= c.rating && c.rating < parseInt(this.query.rating) + 1) : this.products;
    return this;
  };

  priceQuery = () => {
    this.products = this.products.filter((p) => p.price >= this.query.lowPrice && p.price <= this.query.highPrice);
    return this;
  };

  searchQuery = () => {
    this.products = this.query.searchValue ? this.products.filter((p) => p.name.toUpperCase().includes(this.query.searchValue.toUpperCase())) : this.products;
    return this;
  };

  sortByPrice = () => {
    if (this.query.sortPrice) {
      this.products = this.products.sort((a, b) => (this.query.sortPrice === "low-to-high" ? a.price - b.price : b.price - a.price));
    }
    return this;
  };

  skip = () => {
    const skipPage = (parseInt(this.query.pageNumber) - 1) * this.query.perPage;
    this.products = this.products.slice(skipPage);
    return this;
  };

  limit = () => {
    this.products = this.products.slice(0, this.query.perPage);
    return this;
  };

  getProducts = () => this.products;

  countProducts = () => this.products.length;
}

module.exports = QueryProducts;
