import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import CreateProductForm from "../components/CreateProduct";
import axios from "axios";

const SellerUpdatePage = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);

  useEffect(() => {
    axios.get(`${import.meta.env.VITE_HOST_STRING}/app/v1/products/${id}`).then((res) => {
      setProduct(res.data.product);
    });
  }, [id]);

  if (!product) return <p>Loading...</p>;

  return <CreateProductForm initialData={product} />;
};

export default SellerUpdatePage;
