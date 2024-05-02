import { useEffect, useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import { FiBox } from "react-icons/fi";
import { BsBoomboxFill } from "react-icons/bs";
import { BsBoxes } from "react-icons/bs";
import { IoFilterOutline } from "react-icons/io5";
import { FaSearch } from "react-icons/fa";


import axios from "axios";
import Popup from "./Popup";



function App() {

  const [product, setproduct] = useState([1, 2, 3, 4, 5, 6]);
  const [smallproduct, setsmallproduct] = useState([]);

  useEffect(() => {
    const featch = async () => {
      const respons = await axios.post("http://localhost:3000/products", {});
      setproduct(respons.data);
      console.log(respons.data);
      setsmallproduct(product[0]);
    };
    featch();
  }, []);

  const smallname = (index) => {
    setsmallproduct(product[index]);
  };

  const [isVisible, setisVisible] = useState(false);

  return (
    <>
      <div className="w-full h-[100vh] flex flex-col md:flex-row relative ">
        <div className="w-full h-[35%]  md:w-[400px] md:h-full">
          <div className="flex justify-between ">
            <button className="px-3 py-2 border border-gray-700 mx-2 mt-1 rounded flex items-center gap-2 ">
              {" "}
              <FiBox /> Floor
            </button>
            <button className="px-3 py-2 border border-gray-700 mx-2 mt-1 rounded flex items-center gap-2 ">
              {" "}
              <BsBoomboxFill /> Countertops
            </button>
            <button className="px-3 py-2 border border-gray-700 mx-2 mt-1 rounded flex items-center gap-2 ">
              <BsBoxes /> Walls
            </button>
          </div>
          <div className="flex justify-between mt-5 ">
            <button className="px-3 py-2 border border-gray-700 mx-2 mt-1 rounded flex items-center gap-2 ">
              <FaSearch />
            </button>
            <button
              onClick={() => setisVisible(true)}
              className="px-12 py-2 border border-gray-700 mx-2 mt-1 rounded flex items-center gap-2"
            >
              <IoFilterOutline />{" "}
              Filter
            </button>

            {isVisible && <Popup setisVisible={setisVisible} setproduct={setproduct} />}
            <button className="px-3 py-2 border border-gray-700 mx-2 mt-1 rounded flex items-center gap-2 ">
              <BsBoxes /> Walls
            </button>
          </div>

          <div className="h-[50%] w-full md:h-[70%] md:w-full overflow-y-auto md:overflow-x-auto mt-5 flex md:flex-col flex-nowrap">
            {product?.map((product, index) => (
              <div
                key={index}
                onClick={() => smallname(index)}
                className="flex my-2 md:w-[90%] md:mx-0 items-center md:p-2 rounded-md md:border md:border-gray-600 flex-shrink-0 w-32 mx-2"
              >
                <img
                  src={product?.image?.URL}
                  alt=""
                  className="h-28 rounded w-32 object-cover"
                />
                <div className="hidden md:block px-4 text-left">
                  <h5 className="text-gray-800 text-sm">Roomvo</h5>
                  <h4 className="font-semibold text-sm">{product?.name}</h4>
                  <h4 className="text-sm text-gray-700 mt-10">
                    {product?.size}
                  </h4>
                </div>
              </div>
            ))}
          </div>
          <div className="md:hidden mb-6 text-left" >
            <h5 className="text-gray-800 text-sm">Roomvo</h5>
            <h3 className="font-semibold text-sm">{smallproduct.name ? smallproduct.name : "Wooden Floor Tiles"}</h3>
          </div>
        </div>
        <div className="w-full h-[65%] md:w-[900px] mt-10 md:h-full overflow-hidden">
          <img
            src="https://www.roomvo.com/services/room/rooms/74a54151f18840fabdf139d8965873e1/paint/?instance_spec=%7B%22product_id%22%3A%22892876941%22%2C%22orientation%22%3A0%2C%22instance_number%22%3A1%7D&img_format=jpg&vendor=7ba951f7199241029da9fafbcf960397&visitor=9e628651d03a4cfc8d463cde8f3c3204&locale=en-gb&display_width=1024&display_height=1024&img_quality=high"
            alt=""
          />
        </div>
      </div>
    </>
  );
}

export default App;


