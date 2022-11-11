import React from "react";
import PostCard from "../PostCard";
import Styles from "./CarouselSeller.module.css";
import { Image } from "react-bootstrap";
import capitalizeFirstLetter from "../../utils/capitalizeFirstLetter";

function CarouselSeller({ seller, queryParams }) {
  let products = seller.products;
  if (queryParams?.description) {
    products = seller?.products?.filter((p) => 
      p?.description.toLowerCase().includes(queryParams?.description?.toLowerCase()));
  }

  return (
    <div className={seller.deletedAt ? Styles.container2 : Styles.container}>
      <div className={Styles.containerCarousel}>
        <div className="d-flex align-items-center mw-10r">
          <Image
            roundedCircle
            className={Styles.sellerImage}
            src={seller.image}
          />
          <div>
            <h1 className={Styles.sellerTitle}>
              {capitalizeFirstLetter(seller.name)}
            </h1>
            <h5 className={Styles.sellerTitle}>
              {capitalizeFirstLetter(seller.category)}
            </h5>
          </div>
        </div>
        <div className={Styles.containerCards}>
          {products?.map((product) => {
            return product?.posts?.map((post) => {
              if (new Date(post?.date)>new Date() )
              return <PostCard key={post.id} product={product} post={post} />;
            });
          })}
        </div>
      </div>
    </div>
  );
}

export default CarouselSeller;
