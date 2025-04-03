import "./Saved.css";
import { useState } from "react";
import { Link } from "react-router-dom";
import USERS from "../USERS";
import SavedItem from "../SavedItem/SavedItem";
import SavedLocationItem from "../SavedLocationItem/SavedLocationItem";

function Saved() {
  const [savedItems, setSavedItems] = useState(true);
  const [savedLocations, setSavedLocations] = useState(true);
  const [profilesSelected, setProfilesSelected] = useState(true);

  function checkElementsCount() {
    if (document.querySelector(".saved__container").children.length === 2) {
      setSavedItems(false);
    } else {
      setSavedItems(true);
    }
  }

  function checkLocationsCount() {
    if (
      document.querySelectorAll(".saved__container")[1].children.length === 2
    ) {
      setSavedLocations(false);
    } else {
      setSavedLocations(true);
    }
  }

  function changeDirectory(e) {
    const val = e.target.value;
    if (val === "profile") {
      setProfilesSelected(true);
    } else {
      setProfilesSelected(false);
    }
  }

  return (
    <div className="saved">
      <div className="saved__content">
        <h3 className="saved__title">
          Saved
          <select
            className="saved__select"
            onChange={(e) => changeDirectory(e)}
          >
            <option value="profile">profiles</option>
            <option value="location">locations</option>
          </select>
        </h3>
        <div
          className={
            profilesSelected ? "saved__container visible" : "saved__container"
          }
        >
          {USERS.filter((item) => item.isSaved).map((item, index) => (
            <SavedItem data={item} onDelete={checkElementsCount} key={index} />
          ))}
          <div
            className={
              savedItems ? "saved__no__elemens" : "saved__no__elemens show"
            }
          >
            You don't have any saved profiles yet
          </div>
        </div>
        <div
          className={
            profilesSelected ? "saved__container" : "saved__container visible"
          }
        >
          {USERS.map((item) => item.locations)
            .flat(1)
            .filter((item) => item.isSaved)
            .map((item, index) => (
              <Link to="/location_page" state={{ item }}>
                <SavedLocationItem data={item} onDelete={checkLocationsCount} />
              </Link>
            ))}
          <div
            className={
              savedLocations ? "saved__no__elemens" : "saved__no__elemens show"
            }
          >
            You don't have any saved locations yet
          </div>
        </div>
      </div>
    </div>
  );
}

export default Saved;
