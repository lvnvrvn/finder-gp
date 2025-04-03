import "./AddPortfolioCaption.css";
import { useLocation } from "react-router-dom";
import { useState } from "react";
import { Link } from "react-router-dom";

function AddPortfolioCaption() {
  const location = useLocation();
  const urls = location.state.urls;
  const isItLocationPage = location.state.isItLocationPage;

  const [isTitle, setIsTitle] = useState(false);
  const [isDescription, setIsDescription] = useState(false);

  function changeIsTitle(e) {
    if (e.target.value !== "") {
      setIsTitle(true);
    } else {
      setIsTitle(false);
    }
  }

  function changeIsDescription(e) {
    if (e.target.value !== "") {
      setIsDescription(true);
    } else {
      setIsDescription(false);
    }
  }

  function checkIsDataCorrect(e) {
    document.body.children[1].children[0].children[1].children[4].children[0].classList.add(
      "new"
    );
  }

  return (
    <div className="add__portfolio__caption">
      <div className="add__portfolio__caption__content">
        <div className="add__portfolio__caption__photo">
          {urls.map((item) => (
            <div
              className="add__portfolio__caption__photo__selected"
              style={{ background: `url(${item}) center / cover no-repeat` }}
            ></div>
          ))}
        </div>
        <form
          action="/"
          className={
            isItLocationPage
              ? "add__portfolio__caption__form is-location"
              : "add__portfolio__caption__form"
          }
        >
          <div className="add__portfolio__caption__form__item">
            <input
              type="text"
              className="add__portfolio__caption__input"
              onInput={(e) => changeIsTitle(e)}
            />
            <label
              htmlFor=""
              className={
                isTitle
                  ? "add__portfolio__caption__label focused"
                  : "add__portfolio__caption__label"
              }
            >
              Add {isItLocationPage ? "location" : "album"} title
            </label>
          </div>
          <div className="add__portfolio__caption__form__item">
            <textarea
              className="add__portfolio__caption__input"
              onInput={(e) => changeIsDescription(e)}
            ></textarea>
            <label
              htmlFor=""
              className={
                isDescription
                  ? "add__portfolio__caption__label focused"
                  : "add__portfolio__caption__label"
              }
            >
              Add {isItLocationPage ? "location" : "album"} description
            </label>
          </div>
          <div className="add__portfolio__caption__form__item">
            <input
              type="text"
              className="add__portfolio__caption__input"
              onInput={(e) => changeIsTitle(e)}
            />
            <label
              htmlFor=""
              className={
                isTitle
                  ? "add__portfolio__caption__label focused"
                  : "add__portfolio__caption__label"
              }
            >
              Indicate the location
            </label>
            <a
              href="https://www.google.com/maps"
              className="add__portfolio__caption__form__map"
              target="_blank"
            >
              on the map
            </a>
          </div>
        </form>
        <div className="add__portfolio__caption__next">
          <Link
            to="/data_sent"
            className="add__portfolio__caption__btn"
            onClick={(e) => checkIsDataCorrect(e)}
            state={{ isItLocationPage: isItLocationPage }}
          >
            Add to {isItLocationPage ? "locations" : "portfolio"}
          </Link>
        </div>
      </div>
    </div>
  );
}

export default AddPortfolioCaption;
