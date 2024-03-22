import React from "react";
import "./product.scss";
import { Single } from "../../components/single/Single";
import { useParams } from "react-router-dom";

export const Product = () => {
  const { id } = useParams<{ id: string }>();
  return (
    <div className="product">
      <Single id={id ?? ""} />
    </div>
  );
};
