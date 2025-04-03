import "./PortfolioCard.css";
import { useState, useEffect } from "react";

function PortfolioCard({
  cardData,
  isEdit,
  changeModal,
  onSlider,
  onDeleteAlbum,
}) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [fullIconShow, setFullIconShow] = useState(false);

  useEffect(() => {
    if (window.innerWidth < 1000) {
      setFullIconShow(true);
    }
  }, []);

  function changeCurrentIndex(dir) {
    switch (dir) {
      case "prev":
        currentIndex === 0
          ? setCurrentIndex(cardData.urls.length - 1)
          : setCurrentIndex(currentIndex - 1);
        break;
      case "next":
        currentIndex === cardData.urls.length - 1
          ? setCurrentIndex(0)
          : setCurrentIndex(currentIndex + 1);
        break;
      default:
        break;
    }
  }

  return (
    <div
      className="profile__portfolio__item profile__item"
      onMouseEnter={() => setFullIconShow(true)}
      onMouseLeave={() => setFullIconShow(false)}
    >
      <div className="profile__portfolio__item__inner">
        <div className="profile__portfolio__item__nav">
          {cardData.urls.map((item, index) => (
            <div
              className={
                index === currentIndex
                  ? "profile__portfolio__item__dot active"
                  : "profile__portfolio__item__dot"
              }
              onClick={() => setCurrentIndex(index)}
              key={index}
            ></div>
          ))}
        </div>
        <div className="profile__portfolio__item__title">
          {cardData.albumTitle}
        </div>
      </div>
      {cardData.urls.map((item, index) => (
        <div
          className={
            index === currentIndex
              ? "profile__portfolio__img show"
              : "profile__portfolio__img"
          }
          style={{ background: `url(${item}) center / cover no-repeat` }}
          key={index}
          data-index={index}
        ></div>
      ))}
      <div
        className="profile__portfolio__item__prev profile__portfolio__switch"
        onClick={() => changeCurrentIndex("prev")}
      ></div>
      <div
        className="profile__portfolio__item__next profile__portfolio__switch"
        onClick={() => changeCurrentIndex("next")}
      ></div>
      <div
        className={
          isEdit
            ? "profile__portfolio__item__delete show"
            : "profile__portfolio__item__delete"
        }
        id="card"
        onClick={(e) => {
          changeModal(e);
          onDeleteAlbum(e.target);
        }}
        title="Delete album"
      ></div>

      <div
        className={
          fullIconShow
            ? "profile__portfolio__item__full show"
            : "profile__portfolio__item__full"
        }
        onClick={() => onSlider(currentIndex, cardData.urls)}
        style={{ display: isEdit ? "none" : "block" }}
      ></div>
    </div>
  );
}

export default PortfolioCard;
