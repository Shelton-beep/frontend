import { useState } from "react";

export default function Home() {
  const [squareFt, setSquareFt] = useState<number | "">("");
  const [bedrooms, setBedrooms] = useState<number | "">("");
  const [floors, setFloors] = useState<number | "">("");
  const [age, setAge] = useState<number | "">("");
  const [predictedPrice, setPredictedPrice] = useState<number | null>(null);

  const handlePredict = async () => {
    if (squareFt && bedrooms && floors && age) {
      try {
        const response = await fetch("http://127.0.0.1:5000/predict", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            squareFt: Number(squareFt),
            bedrooms: Number(bedrooms),
            floors: Number(floors),
            age: Number(age),
          }),
        });

        const data = await response.json();
        if (response.ok) {
          setPredictedPrice(data.predictedPrice);
        } else {
          alert(`Error: ${data.error}`);
        }
      } catch (error) {
        console.error("Error:", error);
        alert("Error connecting to the server.");
      }
    } else {
      alert("Please fill in all fields!");
    }
  };

  return (
    <div style={{ padding: "2rem", fontFamily: "Arial, sans-serif" }}>
      <h1>House Price Predictor</h1>
      <div style={{ marginBottom: "1rem" }}>
        <label>Square Feet: </label>
        <input
          type="number"
          value={squareFt}
          onChange={(e) => setSquareFt(Number(e.target.value))}
        />
      </div>
      <div style={{ marginBottom: "1rem" }}>
        <label>Bedrooms: </label>
        <input
          type="number"
          value={bedrooms}
          onChange={(e) => setBedrooms(Number(e.target.value))}
        />
      </div>
      <div style={{ marginBottom: "1rem" }}>
        <label>Floors: </label>
        <input
          type="number"
          value={floors}
          onChange={(e) => setFloors(Number(e.target.value))}
        />
      </div>
      <div style={{ marginBottom: "1rem" }}>
        <label>Age of House: </label>
        <input
          type="number"
          value={age}
          onChange={(e) => setAge(Number(e.target.value))}
        />
      </div>
      <button onClick={handlePredict} style={{ padding: "0.5rem 1rem" }}>
        Predict Price
      </button>
      {predictedPrice !== null && (
        <div style={{ marginTop: "1rem" }}>
          <h2>Predicted Price: ${predictedPrice.toFixed(2)}</h2>
        </div>
      )}
    </div>
  );
}
