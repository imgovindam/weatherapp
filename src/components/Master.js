import React, { useEffect, useState } from "react";
import ThermostatIcon from "@mui/icons-material/Thermostat";
import WaterDropIcon from "@mui/icons-material/WaterDrop";
import LocationSearchingIcon from "@mui/icons-material/LocationSearching";
import WindPowerIcon from "@mui/icons-material/WindPower";
import CompressIcon from "@mui/icons-material/Compress";
import NotesIcon from "@mui/icons-material/Notes";
import "./App.css";
import axios from "axios";

const Master = () => {
  const [input, setInput] = useState("");
  const [location, setLocation] = useState();
  // let Apikey = "166b1aebdf86ea274129224a354114fc";
  // useEffect(() => {
  //   const fetchData = async () => {
  //     try {
  //       const response = await axios.get(
  //         `https://api.openweathermap.org/data/2.5/weather?q=${input}&appid=166b1aebdf86ea274129224a354114fc`
  //       );
  //       setLocation(response.data);
  //     } catch (error) {
  //       console.error("Error making API call:", error);
  //     }
  //   };

  //   fetchData();
  // }, [input]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        if (input.length === 2) {
          // if (input.trim() === "") { // Reset location when input is empty
          setLocation(null);
        } else {
          const response = await axios.get(
            `https://api.openweathermap.org/data/2.5/weather?q=${input}&appid=166b1aebdf86ea274129224a354114fc`
          );
          setLocation(response.data);
        }
      } catch (error) {
        setLocation("");
        console.error("Error making API call:", error);
      }
    };

    fetchData();
  }, [input]);

  const handleInput = (e) => {
    setInput(e.target.value);
  };

  const tempConverter = (k) => {
    let c = k - 273;
    return c;
  };

  return (
    <>
      <div className="bg-[#154646] flex flex-col justify-center items-center h-[100vh] w-full">
        <div className="border  rounded-xl bg-blue-100 a w-1/2 flex flex-col p-2 m-2 justify-center items-center">
          <div className="bg-blue-200 rounded-lg flex  justify-center items-center h-[10vh] w-1/2">
            <h1 className="font-sans font-semibold text-lg">
              {input.length >= 3 ? location?.name : " "}
            </h1>
            {location ? (
              <span>
                <img
                  className="object-cover bg-no-repeat bg-cover h-20"
                  src={`https://openweathermap.org/img/wn/${location?.weather[0]?.icon}.png`}
                  alt="icon"
                />
              </span>
            ) : (
              <span>
                <img
                  className="object-cover bg-no-repeat bg-cover h-20 p-3"
                  src="https://cdn-icons-png.flaticon.com/128/4814/4814268.png"
                  alt="icon"
                />
              </span>
            )}
          </div>

          <div className="bg-blue-900 w-1/2 rounded-lg  flex justify-center m-2 p-2">
            <input
              onChange={(e) => handleInput(e)}
              className="mx-2 p-2 rounded-lg outline-none font-normal font-serif w-full"
              type="text"
              placeholder="city please..."
              value={input}
            />
            <span className="cursor-pointer bg-white items-center flex">
              <LocationSearchingIcon
                fontSize="large"
                style={{
                  color: "blue",
                }}
              />
            </span>
          </div>

          {location ? (
            <div className="flex p-2 m-2 flex-col text-black">
              <div className="px-2 py-2 ">
                {tempConverter(location?.main?.temp).toFixed(2) > 30 ? (
                  <span>
                    <ThermostatIcon fontSize="large" style={{ color: "red" }} />
                  </span>
                ) : (
                  <span>
                    <ThermostatIcon
                      fontSize="large"
                      style={{ color: "green" }}
                    />
                  </span>
                )}

                {/* <span>
              <ThermostatIcon fontSize="large" style={{ color: "green" }} />
            </span> */}
                <span className="font-sans font-semibold text-[20px] mx-2">
                  {Math.round(tempConverter(location?.main?.temp))} °C
                </span>
              </div>
              <div className="px-2 py-2">
                <span>
                  <WaterDropIcon fontSize="large" style={{ color: "aqua" }} />
                </span>
                <span className="font-sans font-semibold text-[20px] mx-2">
                  {location?.main?.humidity} %
                </span>
              </div>
              <div className="px-2 py-2">
                {location?.wind?.speed > 3 ? (
                  <span>
                    <WindPowerIcon fontSize="large" style={{ color: "red" }} />
                  </span>
                ) : (
                  <span>
                    <WindPowerIcon fontSize="large" style={{ color: "blue" }} />
                  </span>
                )}
                {/* <span>
                  <WindPowerIcon fontSize="large" style={{ color: "blue" }} />
                </span> */}
                <span className="font-sans font-semibold text-[20px] mx-2">
                  {location?.wind?.speed} km/h
                </span>
              </div>
              <div className="px-2 py-2">
                <span>
                  <CompressIcon fontSize="large" style={{ color: "red" }} />
                </span>
                <span className="font-sans font-semibold text-[20px] mx-2">
                  {location?.main?.pressure} mb
                </span>
              </div>
              {/* <div className="px-2 py-2">
            <span>
              <CompressIcon fontSize="large" style={{ color: "grey" }} />
            </span>
            <span className="font-sans font-semibold text-[20px] mx-2">
              {location?.sys?.visibility}
            </span>
          </div> */}
              <div className="px-2 py-2">
                <span>
                  <NotesIcon style={{ color: "green" }} />
                </span>
                <span className="font-sans font-semibold text-[20px] mx-2">
                  {location?.weather[0]?.description}
                </span>
              </div>
            </div>
          ) : (
            ""
          )}
        </div>
      </div>
    </>
  );
};

export default Master;
