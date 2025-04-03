import "./SavedLocationItem.css";
import { useState } from "react";

function SavedLocationItem({ data, onDelete }) {
  const [isDeleted, setIsDeleted] = useState(false);

  function deleteItem(e) {
    if (e.target.classList.contains("saved__delete")) {
      e.preventDefault();
    }
    setIsDeleted(true);
    setTimeout(() => {
      e.target.parentNode.parentNode.remove();
    }, 500);
  }

  return (
    <div
      className={isDeleted ? "saved__location deleted" : "saved__location"}
      style={{
        background: `url(${data.urls[0]}) center center / cover no-repeat`,
      }}
    >
      <div
        className="saved__delete"
        onClick={(e) => {
          deleteItem(e);
          onDelete();
        }}
      >
        &#10006;
      </div>
      <div className="saved__location__title">{data.locationTitle}</div>
    </div>
  );
}

export default SavedLocationItem;
