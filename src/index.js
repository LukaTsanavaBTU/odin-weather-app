import "./styles.css";

const getJSON = async function (location, unitGroup = "metric") {
  try {
    const response = await fetch(
      `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${location}?unitGroup=${unitGroup}&key=H7LLKTPWLRK52JWZW8DFU9ZGQ&contentType=json`
    );
    return response.json();
  } catch (error) {
    console.log(error);
  }
};

const getData = async function (location, unitGroup = "metric") {
  const json = await getJSON(location, unitGroup);
  const { resolvedAddress: address, description, currentConditions } = json;
  const {
    conditions,
    icon,
    temp,
    feelslike,
    sunrise,
    sunset,
    windspeed,
    humidity,
  } = currentConditions;
  const data = {
    address,
    description,
    conditions,
    icon,
    temp,
    feelslike,
    sunrise,
    sunset,
    windspeed,
    humidity,
  };
  return data;
};

const displayInfo = async function (location, unitGroup = "metric") {
  const data = await getData(location, unitGroup);
  console.log(data);
  const icon = document.querySelector("#icon");
  const infoSpans = document.querySelectorAll(".infospan");
  const measurementSpans = document.querySelectorAll(".measurement");
  infoSpans.forEach((span) => {
    const id = span.getAttribute("id");
    span.textContent = data[id];
    measurementSpans.forEach((span) => {
      span.textContent = unitGroup === "us" ? "°F" : "°C";
    });
    icon.setAttribute("src", require(`./icons/${data.icon}.svg`));
  });
};

const locationInput = document.querySelector("#location-input");
const imperialCheckbox = document.querySelector("#us");
const searchButton = document.querySelector("button");

searchButton.addEventListener("click", () => {
  const location = locationInput.value;
  const imperial = imperialCheckbox.checked ? "us" : "metric";
  displayInfo(location, imperial);
});
