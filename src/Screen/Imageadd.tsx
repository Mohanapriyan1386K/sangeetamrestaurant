



import { useEffect, useState } from "react";
import axios from "axios";

const BASE_URL = "https://snageethamresturent.vercel.app";

function Imageadd() {
  const [name, setName] = useState("");
  const [quantity, setQuantity] = useState("");
  const [images, setImages] = useState<any>();

  const [product, setProduct] = useState([]);

  useEffect(() => {
    getProduct();
  }, []);

  const getProduct = async () => {
    try {
      // const data = await axios.get(`${BASE_URL}/api/products`);
      const data = await axios.get("http://localhost:8000/api/sweet")
      setProduct(data.data.data);
    } catch (err:any) {
      alert("data fetch  Failed");
      console.log(err.message)
    }
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    const formData = new FormData();

    formData.append("name", name);
    formData.append("category", "Halwa");
    formData.append("image", images)
    formData.append("description", "asjnajs")
    formData.append("price", "626");
    formData.append("unit", "Kg")
    formData.append("ingredients", "sss")

    try {
      // const res = await axios.post(`${BASE_URL}/api/products`, formData);
      const res = await axios.post("http://localhost:8000/api/sweet", formData)
      console.log(res.data);
      alert("Product Added Successfully");

      setName("");
      setQuantity("");
      setImages([]);

      getProduct();
    } catch (err) {
      console.log(err);
      alert("Upload Failed");
    }
  };

  return (
    <div style={{ padding: "30px" }}>
      <h2>Add Product</h2>

      <form onSubmit={handleSubmit}>
        <div>
          <label>Product Name</label>
          <br />
          <input
            type="text"
            value={name}
            placeholder="Enter Product Name"
            onChange={(e) => setName(e.target.value)}
          />
        </div>

        <br />

        <div>
          <label>Quantity</label>
          <br />
          <input
            type="number"
            value={quantity}
            placeholder="Enter Quantity"
            onChange={(e) => setQuantity(e.target.value)}
          />
        </div>

        <br />

        <div>
          <label>Product Image</label>
          <br />
          <input
            type="file"
            accept="image/*"
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
              if (e.target.files) {
                setImages(e.target.files[0]);
              }
            }}
          />
        </div>

        <br />

        <button type="submit">Add Product</button>
      </form>

      <div>
        {product.map((item: any) => (
          <div key={item._id}>
            <h3>{item.name}</h3>
            <p>Quantity: {item.quantity}</p>
            <img src={item.image} alt={item.name} width="150" />
          </div>
        ))}
      </div>
    </div>
  );
}

export default Imageadd;
