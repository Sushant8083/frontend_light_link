import { Container } from "postcss";
import React, { useState, useEffect } from "react";
import { IoClose } from "react-icons/io5";
import axios from "axios";

const Popup = ({ setisVisible, setproduct }) => {
  const cat = ["wooden", "Tile", "Vinyl", "Luxury Vinyl", "Laminate"];

  const [checkedItems, setCheckedItems] = useState([]);

  const handleCheckboxChange = (event) => {
    const { name, checked } = event.target;
    if (checked) {
      setCheckedItems((prevState) => [...prevState, name]);
    } else {
      setCheckedItems((prevState) => prevState.filter((item) => item !== name));
    }
  };

  useEffect(() => {
    const featch = async () => {
      const respons = await axios.post("http://localhost:3000/products", {
        checkedItems,
      });
      console.log("called");
      console.log(checkedItems);
      setproduct(respons.data);
      console.log(respons.data);
    };
    featch();
  }, [checkedItems]);

  return (
    <div className="absolute inset-0 flex justify-center items-center mt-[150px] md:mt-0">
      <div className="w-full md:w-[400px] h-auto md:h-[400px] border-2 bg-white rounded-[25px]">
        <div className="flex w-full justify-between p-4 border-b-2">
          <h1 className=" text-3xl font-semibold">Filters</h1>
          <button onClick={() => setisVisible(false)}>
            <IoClose className=" text-3xl text-gray-700" />
          </button>
        </div>

        <div className="flex flex-col gap-4 p-4 overflow-y-auto">
          {cat.map((e, index) => (
            <div
              key={index}
              className="text-xl flex w-full items-center justify-between "
            >
              {e}{" "}
              <input
                type="checkbox"
                name={e}
                id={e}
                checked={checkedItems.includes(e)}
                onChange={handleCheckboxChange}
                className="h-4 w-4"
              />
            </div>
          ))}
        </div>
        <div className="border-t-2 p-5 flex justify-end gap-3">
          <button
            className="px-3 py-2 bg-gray-300 text-gray-700 rounded-[10px]"
            onClick={() => setCheckedItems([])}
          >
            Clear filter
          </button>{" "}
          <button
            className="px-3 py-2 bg-orange-600 rounded-[10px]"
            onClick={() => setisVisible(false)}
          >
            Done
          </button>{" "}
        </div>
      </div>
    </div>
  );
};

export default Popup;
