import "./SavedItem.css";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function SavedItem({ data, onDelete }) {
  const [isDeleted, setIsDeleted] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    let timer = setInterval(() => {
      if (currentIndex === data.portfolio[0].urls.length - 1) {
        setCurrentIndex(0);
      } else {
        setCurrentIndex(currentIndex + 1);
      }
    }, 2000);
    return () => clearInterval(timer);
  });

  function deleteItem(e) {
    setIsDeleted(true);
    setTimeout(() => {
      e.target.parentNode.remove();
    }, 500);
  }

  return (
    <div className={isDeleted ? "saved__item deleted" : "saved__item"}>
      <div className="saved__item__bottom">
        <Link
          className="saved__item__avatar"
          to="/user_profile"
          style={{ background: `url(${data.avatar}) center / cover no-repeat` }}
          state={{ userData: data }}
        ></Link>
        <div className="saved__item__info">
          <div className="saved__item__name">{data.name}</div>
          <div className="saved__item__prof">{data.prof}</div>
        </div>
      </div>
      <div className="saved__item__slides">
        {data.portfolio[0].urls.map((item, index) => (
          <div
            className={
              index === currentIndex
                ? "saved__item__slide show"
                : "saved__item__slide"
            }
            style={{ background: `url(${item}) center / cover no-repeat` }}
            key={index}
          ></div>
        ))}
      </div>
      <div
        className="saved__delete"
        onClick={(e) => {
          deleteItem(e);
          onDelete();
        }}
      >
        &#10006;
      </div>
    </div>
  );
}

export default SavedItem;
