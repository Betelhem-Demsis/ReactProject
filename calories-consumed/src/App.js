import React, { useState } from "react";
import "./App.css";

const API_KEY = "qBMiAU2ndXM+/TQ4Hqu6AA==IS2ImI7KmWkqZIrp";
const API_URL = "https://api.calorieninjas.com/v1/nutrition?query=";

async function fetchCalories(food) {
  const response = await fetch(`${API_URL}${food}`, {
    method: "GET",
    headers: {
      "X-Api-Key": API_KEY,
    },
  });
  const data = await response.json();
  return data.items.length > 0 ? data.items[0].calories : 0;
}

function App() {
  const [foods, setFoods] = useState([
    { food: "", quantity: 1 },
    { food: "", quantity: 1 },
    { food: "", quantity: 1 },
    { food: "", quantity: 1 },
    { food: "", quantity: 1 },
    { food: "", quantity: 1 },
  ]);
  const [totalCalories, setTotalCalories] = useState(0);

  const handleFoodChange = (index, value) => {
    const newFoods = [...foods];
    newFoods[index].food = value;
    setFoods(newFoods);
  };

  const handleQuantityChange = (index, value) => {
    const newFoods = [...foods];
    newFoods[index].quantity = Number(value);
    setFoods(newFoods);
  };

  const sumUpCalories = async () => {
    let total = 0;

    for (const item of foods) {
      if (item.food.trim()) {
        const calories = await fetchCalories(item.food);
        total += calories * item.quantity;
      }
    }

    setTotalCalories(total);
  };

  return (
    <div className="content">
      <h1>Edu's Calories Calculator</h1>
      <div className="content-input">
        {foods.map((item, index) => (
          <label key={index}>
            Food-{index + 1}
            <input
              type="text"
              value={item.food}
              onChange={(e) => handleFoodChange(index, e.target.value)}
            />{" "}
            quantity:
            <input
              type="number"
              value={item.quantity}
              min="1"
              onChange={(e) => handleQuantityChange(index, e.target.value)}
            />
          </label>
        ))}
        <h2>
          the sum is -{" "}
          <span id="sum">{totalCalories}</span>
        </h2>
        <button onClick={sumUpCalories}>Sum Up</button>
      </div>
    </div>
  );
}

export default App;
