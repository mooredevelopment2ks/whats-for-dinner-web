import Image from "next/image";
import hamburger from "@/assets/hamburger.png";
import chicken from "@/assets/chicken.png";
import pizza from "@/assets/pizza.png";
import chinese from "@/assets/chinese.png";
import pub from "@/assets/pub.png";
import sushi from "@/assets/sushi.png";
import korean from "@/assets/korean.png";
import random from "@/assets/random.png";
import React, { useState } from "react";

export default function Categories({ onCategoryUpdate }) {
  const [categoryCode, setCategoryCode] = useState("");

  const handleCategoryClick = (code) => {
    setCategoryCode(code);
    onCategoryUpdate(code);
  };

  const categoryCards = [
    {
      name: "Burgers",
      className: "cards",
      code: "4bf58dd8d48988d16c941735",
      src: hamburger,
      width: 100,
      alt: "hamburger",
    },
    {
      name: "Chicken",
      className: "cards",
      code: "4d4ae6fc7a7b7dea34424761",
      src: chicken,
      width: 100,
      alt: "chicken",
    },
    {
      name: "Pizza",
      className: "cards",
      code: "4bf58dd8d48988d1ca941735",
      src: pizza,
      width: 100,
      alt: "pizza",
    },
    {
      name: "Chinese",
      className: "cards",
      code: "4bf58dd8d48988d145941735",
      src: chinese,
      width: 100,
      alt: "chinese",
    },
    {
      name: "Pubs",
      className: "cards",
      code: "4bf58dd8d48988d11b941735",
      src: pub,
      width: 100,
      alt: "pubs",
    },
    {
      name: "Sushi",
      className: "cards",
      code: "4bf58dd8d48988d1d2941735",
      src: sushi,
      width: 100,
      alt: "sushi",
    },
    {
      name: "Korean",
      className: "cards",
      code: "4bf58dd8d48988d113941735",
      src: korean,
      width: 100,
      alt: "korean",
    },
    {
      name: "Random",
      className: "cards",
      code: "4bf58dd8d48988d16e941735",
      src: random,
      width: 100,
      alt: "random",
    },
  ];

  return (
    <div>
      <h1 className="heading">Pick a category</h1>
      <section className="categoryContainer">
        {categoryCards.map((option) => (
          <div
            key={option.name}
            className={option.className}
            onClick={() => handleCategoryClick(option.code)}
          >
            <Image src={option.src} width={option.width} alt={option.alt} />
            <h2>{option.name}</h2>
          </div>
        ))}
      </section>
    </div>
  );
}
