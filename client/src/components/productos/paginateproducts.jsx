import React, { Component } from "react";
import Pagination from "../MyPagination";
import axios from "axios";
import ProductCard from "./ProductCard"

export class PaginateProducts extends Component {
  state = {
    allProducts: [],
    currentProducts: [],
    currentPage: null,
    totalPages: null,
  };
  componentDidMount() {
    axios.get(`/api/product`).then((prods) => {
      this.setState({ allProducts: prods.data });
    });
  }
  onPageChanged = (data) => {
    const { allProducts } = this.state;
    const { currentPage, totalPages, pageLimit } = data;
    const offset = (currentPage - 1) * pageLimit;
    const currentProducts = allProducts.slice(offset, offset + pageLimit);
    this.setState({ currentPage, currentProducts, totalPages });
  };
  render() {
    const { allProducts, currentProducts, currentPage, totalPages } = this.state;
    const totalProducts = allProducts.length;
    if (totalProducts === 0) return null;
    const headerClass = [
      "text-dark py-2 pr-4 m-0",
      currentPage ? "border-gray border-right" : "",
    ]
      .join(" ")
      .trim();
    return (
      <section class="shop bg-grey-1">
        <div class="container">
          <div class="white-bg">
            <ul class="shop-items portfolioContainer height-auto margin row">
              {currentProducts.map((d, i) => (
                <ProductCard Key={i} Product={d} />
              ))}
            </ul>
            <div className="d-flex flex-row">
              <div className="align-self-center">
                <Pagination
                  totalRecords={totalProducts}
                  pageLimit={20}
                  pageNeighbours={2}
                  onPageChanged={this.onPageChanged}
                />
              </div>
              <div className="align-self-center">
                {currentPage && `Page ${currentPage}/${totalPages}`}
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }
}

export default PaginateProducts;