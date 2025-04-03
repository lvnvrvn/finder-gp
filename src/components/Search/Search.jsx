import "./Search.css";
import { useState } from "react";
import USERS from "../USERS";
import LocationItem from "../LocationItem/LocationItem";

function Search() {
  const [filterOptionsVisible, setFilterOptionsVisible] = useState(false);
  const [locations, setLocations] = useState(
    USERS.slice(1)
      .map((item) => item.locations)
      .flat(1)
  );

  function changeFilterOptionsVisibility() {
    setFilterOptionsVisible(!filterOptionsVisible);
  }

  function showFiltered(place) {
    switch (place) {
      case "air":
        setLocations(
          USERS.slice(1)
            .map((item) => item.locations)
            .flat(1)
            .filter((item) => item.place === "open air")
        );
        break;
      case "studio":
        setLocations(
          USERS.slice(1)
            .map((item) => item.locations)
            .flat(1)
            .filter((item) => item.place === "studio")
        );
        break;
      case "indoor":
        setLocations(
          USERS.slice(1)
            .map((item) => item.locations)
            .flat(1)
            .filter((item) => item.place === "indoor")
        );
        break;
      default:
        setLocations(
          USERS.slice(1)
            .map((item) => item.locations)
            .flat(1)
        );
        break;
    }
  }

  function changeInputValue(val) {
    setLocations(
      USERS.slice(1)
        .map((item) => item.locations)
        .flat(1)
        .filter((item) =>
          item.locationTitle.toLowerCase().includes(val.toLowerCase().trim())
        )
    );
  }

  return (
    <div
      className="search"
      onClick={(e) => {
        if (e.target.className !== "search__filter") {
          setFilterOptionsVisible(false);
        }
      }}
    >
      <div className="search__content">
        <div className="search__content__search">
          <form action="" className="search__form">
            <input
              className="search__input"
              type="text"
              placeholder="Search location"
              onChange={(e) => changeInputValue(e.target.value)}
            />
            <a
              href="https://www.google.com/maps"
              className="search__input__find__place"
              target="_blank"
            >
              on the map
            </a>
          </form>
          <div
            className="search__filter"
            onClick={changeFilterOptionsVisibility}
          ></div>
          <div
            className={
              filterOptionsVisible
                ? "search__filter__options active"
                : "search__filter__options"
            }
          >
            <div
              className="search__filter__options__item"
              onClick={() => showFiltered("air")}
            >
              Open air
            </div>
            <div
              className="search__filter__options__item"
              onClick={() => showFiltered("studio")}
            >
              Studio
            </div>
            <div
              className="search__filter__options__item"
              onClick={() => showFiltered("indoor")}
            >
              Indoor
            </div>
            <div
              className="search__filter__options__item"
              onClick={() => showFiltered("all")}
            >
              All
            </div>
          </div>
        </div>
        <div className="search__content__locations">
          {locations.map((item, index) => (
            <LocationItem item={item} hideLocsInfo={false} key={index} />
          ))}
        </div>
        <div
          className={
            locations.length === 0
              ? "search__content__notfound show"
              : "search__content__notfound"
          }
        >
          <h2 className="search__content__notfound__title">
            Sorry, nothing found
          </h2>
          <div className="search__content__notfound__icon"></div>
        </div>
      </div>
    </div>
  );
}

export default Search;
