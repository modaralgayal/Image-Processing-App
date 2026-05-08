import { useState, useEffect } from "react";
import axios from "axios";

const PORT = 3000;

export const Home = () => {
  const [count, setCount] = useState(0);
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");

  useEffect((req, res) => {
    axios
      .get(`http://localhost:${PORT}`)
      .then((res) => {
        (setTitle(res.data.title), setDesc(res.data.desc));
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <>
      <h1> {title} </h1>
      <p> {desc} </p>
    </>
  );
};
