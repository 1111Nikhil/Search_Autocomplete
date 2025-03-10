import { useEffect, useState } from "react";
import "./styles.css";

export default function App() {
  const [input, setInput] = useState("");
  const [search, setsearch] = useState([]);
  const [cache, setCache] = useState({});
  useEffect(() => {
    if (cache[input]) {
      setsearch(cache[input]);
      return;
    }
    const timer = setTimeout(() => {
      fetchdata();
    }, 300);
    return () => clearTimeout(timer);
  }, [input]);
  const fetchdata = async () => {
    const data = await fetch(
      "https://dummyjson.com/products/search?q=" + input
    );
    const json = await data.json();
    setsearch(json.products);
    setCache((prev) => ({ ...prev, [input]: json.products }));
    console.log(input);
  };
  return (
    <div className="App">
      <h1>SearchBar</h1>
      <input
        type="text"
        value={input}
        onChange={(e) => setInput(e.target.value)}
      />
      <ul className="list">
        {search?.map((ele) => (
          <li className="item" key={ele.id}>
            {ele.title}
          </li>
        ))}
      </ul>
    </div>
  );
}
