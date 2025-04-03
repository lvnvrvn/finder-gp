import "./LocationItem.css";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import USERS from "../USERS";

function LocationItem({
  item,
  hideLocsInfo,
  userIndex,
  isEdit,
  onDeleteLocation,
}) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isSaved, setIsSaved] = useState(false);

  if (userIndex >= USERS.length - 1) {
    userIndex = USERS.length - 2;
  }

  useEffect(() => {
    if (window.innerWidth < 1000) {
      document.querySelectorAll(".search__location__more").forEach((item) => {
        item.style.opacity = "1";
      });
    }
  }, []);

  function changeCurrentIndex(dir) {
    switch (dir) {
      case "prev":
        currentIndex === 0
          ? setCurrentIndex(item.urls.length - 1)
          : setCurrentIndex(currentIndex - 1);
        break;
      case "next":
        currentIndex === item.urls.length - 1
          ? setCurrentIndex(0)
          : setCurrentIndex(currentIndex + 1);
        break;
      default:
        break;
    }
  }

  function switchSlide(index) {
    setCurrentIndex(index);
  }

  return (
    <div className="search__location__item">
      <div className="search__location__inner">
        <div className="search__location__item__bottom">
          <div className="search__location__title">
            {item.locationTitle.length > 24
              ? item.locationTitle.slice(0, 24) + "..."
              : item.locationTitle}
          </div>
          <Link to="/user_profile" state={{ userData: USERS[item.authId] }}>
            <div
              className={
                hideLocsInfo
                  ? "search__location__profile__photo unvisible"
                  : "search__location__profile__photo"
              }
              style={{
                background: `url(${
                  USERS[item.authId].avatar
                }) center / cover no-repeat`,
              }}
            >
              <div
                className={
                  hideLocsInfo
                    ? "search__location__profile__info unvisible"
                    : "search__location__profile__info"
                }
              >
                <div className="search__location__profile__name">
                  {USERS[item.authId].name}
                </div>
                <div className="search__location__profile__prof">
                  {USERS[item.authId].prof}
                </div>
              </div>
            </div>
          </Link>

          <div className="search__location__nav">
            {item.urls.map((item, index) => (
              <div
                className={
                  index === currentIndex
                    ? "search__location__item__dot active"
                    : "search__location__item__dot"
                }
                key={index}
                onClick={() => switchSlide(index)}
              ></div>
            ))}
          </div>
        </div>
      </div>
      <div
        className="search__location__prev search__location__switch"
        onClick={() => changeCurrentIndex("prev")}
      ></div>
      <div
        className="search__location__next search__location__switch"
        onClick={() => changeCurrentIndex("next")}
      ></div>
      {item.urls.map((item, index) => (
        <div
          className={
            index === currentIndex
              ? "search__location__slide show"
              : "search__location__slide"
          }
          style={{
            background: `url(${item}) center / cover no-repeat`,
          }}
          key={index}
        ></div>
      ))}
      <div
        className={
          isEdit ? "search__location__save none" : "search__location__save"
        }
        onClick={() => setIsSaved(!isSaved)}
      >
        <div
          className={
            isSaved
              ? "search__location__unsaved"
              : "search__location__unsaved show"
          }
        ></div>
        <div
          className={
            isSaved ? "search__location__saved show" : "search__location__saved"
          }
        ></div>
      </div>
      <Link to="/location_page" state={{ item }}>
        <div
          className={
            isEdit ? "search__location__more none" : "search__location__more"
          }
        ></div>
      </Link>
      <div
        className={
          isEdit ? "search__location__delete show" : "search__location__delete"
        }
        onClick={(e) => onDeleteLocation(e.target)}
      ></div>
    </div>
  );
}

export default LocationItem;
