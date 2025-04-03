import "./AddPortfolio.css";
import { useState, useRef } from "react";
import { Link, useLocation } from "react-router-dom";

function AddPortfolio() {
  const [urls, setUrls] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const location = useLocation();
  const isItLocationPage = location.state.isItLocationPage;

  const warningRef = useRef(null);
  const photoContainerRef = useRef(null);

  function readFileUrl(file) {
    return new Promise((resolve, reject) => {
      let fr = new FileReader();

      fr.onload = () => {
        resolve(fr.result);
      };

      fr.onerror = () => {
        reject(fr);
      };

      fr.readAsDataURL(file);
    });
  }

  function selectPhoto(e) {
    setIsLoading(true);
    let files = e.target.files;
    let readers = [];

    if (!files.length) return;

    for (let i = 0; i < files.length; i++) {
      readers.push(readFileUrl(files[i]));
    }

    Promise.all(readers).then((values) => {
      if (photoContainerRef.current.children.length > 0) {
        setUrls([...urls, ...values]);
      } else {
        setUrls(values);
      }
      setIsLoading(false);
    });
  }

  function checkIsSelected(e) {
    if (urls.length === 0) {
      e.preventDefault();
      warningRef.current.classList.add("required");
      photoContainerRef.current.style.borderColor = "tomato";
      setTimeout(() => {
        warningRef.current.classList.remove("required");
        photoContainerRef.current.style.borderColor = "#dadada";
      }, 2500);
    }
  }

  function removePhoto(photo) {
    photo.classList.add("removed");
    setTimeout(() => {
      Array.from(photoContainerRef.current.children).forEach((item) =>
        item.classList.remove("removed")
      );
      setUrls(
        urls.filter(
          (item) => item !== photo.getAttribute("style").slice(17, -35)
        )
      );
    }, 600);
  }

  function removeAllPhoto() {
    Array.from(photoContainerRef.current.children).forEach((item) =>
      item.classList.add("removed")
    );
    setTimeout(() => {
      setUrls([]);
    }, 600);
  }

  return (
    <div className="add__portfolio">
      <div className="add__portfolio__content">
        <div className="add__portfolio__load">
          <label className="add__portfolio__btn" htmlFor="add__portfolio__file">
            Select photo {isItLocationPage ? "of location" : ""}
          </label>
          <input
            className="add__portfolio__file"
            onChange={(e) => selectPhoto(e)}
            id="add__portfolio__file"
            type="file"
            accept="image/*"
            multiple
          />
        </div>
        <div className="add__portfolio__photo" ref={photoContainerRef}>
          {urls.length !== 0 ? (
            urls.map((item, index) => (
              <div
                className="add__portfolio__selected"
                style={{ background: `url(${item}) center / cover no-repeat` }}
                key={index}
              >
                <div
                  className="add__portfolio__remove"
                  onClick={(e) => removePhoto(e.target.parentNode)}
                ></div>
              </div>
            ))
          ) : (
            <div className={isLoading ? "add__portfolio__loading" : ""}>
              {isLoading ? "" : "No photos selected"}
            </div>
          )}
          <div
            className={
              urls.length !== 0
                ? "add__portfolio__remove__all visible"
                : "add__portfolio__remove__all"
            }
            title="Remove all photos"
            onClick={removeAllPhoto}
          ></div>
        </div>
        <div className="add__portfolio__next">
          <Link
            to="/add_portfolio_caption"
            className={
              urls === ""
                ? "add__portfolio__next__btn disable"
                : "add__portfolio__next__btn"
            }
            state={{ urls: urls, isItLocationPage: isItLocationPage }}
            ref={warningRef}
            onClick={(e) => checkIsSelected(e)}
          >
            Сontinue
          </Link>
        </div>
      </div>
    </div>
  );
}

export default AddPortfolio;
