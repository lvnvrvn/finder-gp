import "./MatchItem.css";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

function MatchItem({ data }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isVideoPlaying, setIsVideoPlaying] = useState(false);
  const [isSlideshowPlaying, setIsSlideshowPlaying] = useState(false);
  const [isSaved, setIsSaved] = useState(false);
  const [isLiked, setIsLiked] = useState("");

  function changeCurrentIndex(dir) {
    if (isVideoPlaying) {
      return;
    }
    switch (dir) {
      case "prev":
        currentIndex === 0
          ? setCurrentIndex(data.item.portfolio[0].urls.length - 1)
          : setCurrentIndex(currentIndex - 1);
        break;
      case "next":
        currentIndex === data.item.portfolio[0].urls.length - 1
          ? setCurrentIndex(0)
          : setCurrentIndex(currentIndex + 1);
        break;
      default:
        break;
    }
  }

  let timer;

  useEffect(() => {
    if (isSlideshowPlaying) {
      timer = setInterval(() => {
        changeCurrentIndex("next");
      }, 2000);
    } else {
      clearInterval(timer);
    }
    return () => clearInterval(timer);
  });

  useEffect(() => {
    if (data.index === data.currentIndex) {
      setIsSlideshowPlaying(true);
    } else {
      setIsSlideshowPlaying(false);
    }
  }, [data.currentIndex]);

  function watchShowreel(e) {
    setIsVideoPlaying(!isVideoPlaying);
    setIsSlideshowPlaying(!isSlideshowPlaying);
    if (isVideoPlaying === false) {
      e.target.parentNode.parentNode.parentNode
        .querySelectorAll(".match__item__slide")
        [currentIndex].classList.remove("show");
    } else if (isVideoPlaying === true) {
      e.target.parentNode.parentNode.parentNode
        .querySelectorAll(".match__item__slide")
        [currentIndex].classList.add("show");
    }
  }

  function likeItem() {
    if (localStorage.getItem("finder__liked")) {
      const arr = JSON.parse(localStorage.getItem("finder__liked"));
      if (arr.includes(data.currentIndex + 1)) {
        localStorage.setItem("finder__liked", JSON.stringify(arr));
      } else {
        arr.push(data.currentIndex + 1);
        localStorage.setItem("finder__liked", JSON.stringify(arr));
      }
    } else {
      const arr = [];
      arr.push(data.currentIndex + 1);
      localStorage.setItem("finder__liked", JSON.stringify(arr));
    }
    setIsLiked(true);
    document
      .querySelectorAll(".match__item")
      [data.currentIndex].classList.add("liked");
    setTimeout(() => {
      document.querySelectorAll(".match__item")[
        data.currentIndex
      ].style.display = "none";
    }, 1100);
    setTimeout(() => {
      if (data.currentIndex === 5) {
        data.setCurrentIndex(0);
      } else {
        data.setCurrentIndex(data.currentIndex + 1);
      }
    }, 1200);
  }

  function skipItem() {
    setIsLiked(false);
    document
      .querySelectorAll(".match__item")
      [data.currentIndex].classList.add("skiped");
    setTimeout(() => {
      if (data.currentIndex === 5) {
        data.setCurrentIndex(0);
      } else {
        data.setCurrentIndex(data.currentIndex + 1);
      }
    }, 1200);
  }

  return (
    <div
      className={
        data.index === data.currentIndex ? "match__item show" : "match__item"
      }
    >
      <div className="match__item__media">
        <div className="match__item__bottom">
          <div className="match__item__info">
            <Link
              to="/user_profile"
              className="match__item__avatar"
              style={{
                background: `url(${data.item.avatar}) center / cover no-repeat`,
              }}
              state={{ userData: data.item }}
            ></Link>
            <div className="match__item__name">{data.item.name}</div>
            <div className="match__item__prof">{data.item.prof}</div>
          </div>
          <div className="match__item__nav">
            <div
              className={
                isVideoPlaying
                  ? "match__item__showreel playing"
                  : "match__item__showreel"
              }
              title="Watch showreel"
              onClick={(e) => watchShowreel(e)}
            ></div>
            <div className="match__item__dots">
              {data.item.portfolio[0].urls.map((item, index) => (
                <div
                  className={
                    index === currentIndex
                      ? "match__item__dot active"
                      : "match__item__dot"
                  }
                  key={index}
                  onClick={() => setCurrentIndex(index)}
                ></div>
              ))}
            </div>
          </div>
        </div>
        {data.item.portfolio[0].urls.map((item, index) => (
          <div
            style={{ background: `url(${item}) center / cover no-repeat` }}
            className={
              index === currentIndex
                ? "match__item__slide show"
                : "match__item__slide"
            }
            key={index}
          ></div>
        ))}
        <div
          className={
            isVideoPlaying
              ? "match__item__slide showreel show"
              : "match__item__slide showreel"
          }
        >
          <div className="showreel__icon"></div>
        </div>

        <div
          className="match__item__prev match__item__switch"
          onClick={() => changeCurrentIndex("prev")}
        ></div>
        <div
          className="match__item__next match__item__switch"
          onClick={() => changeCurrentIndex("next")}
        ></div>
      </div>
      <div className="match__item__select">
        <div
          className="match__item__select__icon match__item__select__cancel"
          onClick={skipItem}
        ></div>
        <div
          className="match__item__select__icon match__item__select__like"
          onClick={() => likeItem(data.currentIndex)}
        ></div>
      </div>
      <div className="match__item__save" onClick={() => setIsSaved(!isSaved)}>
        <div
          className={
            isSaved
              ? "match__item__icon__saved show"
              : "match__item__icon__saved"
          }
        ></div>
        <div
          className={
            isSaved
              ? "match__item__icon__unsaved"
              : "match__item__icon__unsaved show"
          }
        ></div>
      </div>
      <div
        className="match__item__pause"
        onClick={() => setIsSlideshowPlaying(!isSlideshowPlaying)}
      >
        <div
          className={
            isSlideshowPlaying
              ? "match__item__icon__pause show"
              : "match__item__icon__pause"
          }
        ></div>
        <div
          className={
            isSlideshowPlaying
              ? "match__item__icon__pause"
              : "match__item__icon__play show"
          }
        ></div>
      </div>

      <div
        className={
          isLiked === true ? "match__item__likes animate" : "match__item__likes"
        }
      >
        <div className="match__item__like"></div>
        <div className="match__item__like"></div>
        <div className="match__item__like"></div>
        <div className="match__item__like"></div>
        <div className="match__item__like"></div>
      </div>

      <div
        className={
          isLiked === false
            ? "match__item__skips animate"
            : "match__item__skips"
        }
      >
        <div className="match__item__skip"></div>
        <div className="match__item__skip"></div>
        <div className="match__item__skip"></div>
        <div className="match__item__skip"></div>
        <div className="match__item__skip"></div>
      </div>
    </div>
  );
}

export default MatchItem;
