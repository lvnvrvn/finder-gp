import "./Profile.css";
import { useEffect, useState, useRef } from "react";
import { Link } from "react-router-dom";
import USERS from "../USERS";
import PortfolioCard from "../PortfolioCard/PortfolioCard";
import LocationItem from "../LocationItem/LocationItem";

function Profile() {
  const [directory, setDirectory] = useState(true);
  const [filterOptionsVisible, setFilterOptionsVisible] = useState(false);
  const [moreOptionVisible, setMoreOptionVisible] = useState(false);
  const [portfolio, setPortfolio] = useState(USERS[0].portfolio);
  const [locations, setLocations] = useState(USERS[0].locations);
  const [editMode, setEditMode] = useState(false);
  const [valueInput, setValueInput] = useState("Princess Nokia");
  const [valueSelect, setValueSelect] = useState("Model");
  const [isModalOpened, setIsModalOpened] = useState(false);
  const [editTypeSelected, setEditTypeSelected] = useState("");
  const [avatarUrl, setAvatarUrl] = useState(
    localStorage.getItem("url__finder") ||
      "https://images.unsplash.com/photo-1540174401473-df5f1c06c716"
  );
  const [isSliderOpened, setIsSliderOpened] = useState(false);

  const [currentIndex, setCurrentIndex] = useState(0);
  const [urlsForSlider, setUrlsForSlider] = useState([]);
  const [deletedAlbum, setDeletedAlbum] = useState(null);
  const [deletedLocation, setDeletedLocation] = useState(null);

  const [isModalLocationOpened, setIsModalLocationOpened] = useState(false);

  const [albumsLength, setAlbumsLength] = useState(0);
  const [locationsLength, setLocationsLength] = useState(0);

  const nameRef = useRef(null);
  const modalRef = useRef(null);
  const profRef = useRef(null);
  const inputRef = useRef(null);

  let initialTabsBlockHeight;

  useEffect(() => {
    initialTabsBlockHeight =
      document.querySelector(".profile__tabs").clientHeight;
  });

  useEffect(() => {
    setAlbumsLength(portfolio.length);
    setLocationsLength(locations.length);
  }, []);

  function changeDirectory(e) {
    if (e.target.innerHTML === "Portfolio") {
      setDirectory(true);
    } else {
      setDirectory(false);
    }
    if (USERS[0].locations.length < 3) {
      document.querySelector(".profile__tabs").style.height =
        initialTabsBlockHeight + "px";
    }
    inputRef.current.value = "";
    if (!directory && albumsLength !== 0) {
      setPortfolio(USERS[0].portfolio);
    }
    if (directory && locationsLength !== 0) {
      setLocations(USERS[0].locations);
    }
  }

  function checkEventTarget(e) {
    if (e.className !== "profile__filter__setting") {
      setFilterOptionsVisible(false);
    }
    if (e.className !== "profile__more") {
      setMoreOptionVisible(false);
    }
  }

  const navOptions = directory
    ? [
        "Model tests",
        "Portrait",
        "Thematic",
        "Studio",
        "Open air",
        "Indoor",
        "All",
      ]
    : ["Open air", "Studio", "Indoor", "All"];

  function changeFiltered(val, storage) {
    if (storage === "PORTFOLIO.photography") {
      switch (val) {
        case "All":
          setPortfolio(USERS[0].portfolio);
          break;
        default:
          setPortfolio(
            USERS[0].portfolio.filter((item) => {
              return item.type.includes(val.toLowerCase());
            })
          );
      }
    } else if (storage === "PORTFOLIO.locations") {
      switch (val) {
        case "All":
          setLocations(USERS[0].locations);
          break;
        default:
          setLocations(
            USERS[0].locations.filter(
              (item) => item.place === val.toLowerCase()
            )
          );
          break;
      }
    }
  }

  function filterItems(e) {
    if (directory) {
      setPortfolio(
        USERS[0].portfolio.filter((item) =>
          item.albumTitle
            .toLowerCase()
            .includes(e.target.value.toLowerCase().trim())
        )
      );
    } else {
      setLocations(
        USERS[0].locations.filter((item) =>
          item.locationTitle
            .toLowerCase()
            .includes(e.target.value.toLowerCase().trim())
        )
      );
    }
  }

  function editProfile() {
    localStorage.setItem("name__finder", valueInput);
    localStorage.setItem("prof__finder", valueSelect);
  }

  function selectPhoto(e) {
    let file = e.target.files[0];

    let fr = new FileReader();

    fr.onload = () => {};

    fr.readAsDataURL(file);

    setAvatarUrl(URL.createObjectURL(file));

    setTimeout(() => {
      localStorage.setItem("url__finder", avatarUrl);
    }, 0);
  }

  function openEditModal(e) {
    const target = e.target.id;
    setIsModalOpened(!isModalOpened);
    if (target === "name") {
      setEditTypeSelected("name");
    } else if (target === "prof") {
      setEditTypeSelected("prof");
    } else if (target === "card") {
      setEditTypeSelected("card");
    }
  }

  function openLocationDeleteModal(e) {
    setIsModalLocationOpened(true);
    setDeletedLocation(e);
  }

  function deleteAlbum() {
    deletedAlbum.parentNode.classList.add("removed");
    setTimeout(() => {
      deletedAlbum.parentNode.remove();
    }, 650);
    setAlbumsLength(albumsLength - 1);
  }

  function deleteLocation() {
    deletedLocation.parentNode.classList.add("removed");
    setTimeout(() => {
      deletedLocation.parentNode.remove();
    }, 650);
    setLocationsLength(locationsLength - 1);
  }

  function openSlider(index, urls) {
    if (editMode) {
      return;
    } else {
      setIsSliderOpened(true);
      setCurrentIndex(index);
      setUrlsForSlider(urls);
      document.body.style.overflow = "hidden";
    }
  }

  function closeSlider() {
    setIsSliderOpened(false);
    document.body.style.overflow = "visible";
  }

  function changeSlide(dir) {
    if (dir === "next") {
      if (currentIndex === urlsForSlider.length - 1) {
        setCurrentIndex(0);
      } else {
        setCurrentIndex(currentIndex + 1);
      }
    } else {
      if (currentIndex === 0) {
        setCurrentIndex(urlsForSlider.length - 1);
      } else {
        setCurrentIndex(currentIndex - 1);
      }
    }
  }

  function checkScroll() {
    if (USERS[0].locations.length < 3) {
      document.querySelector(".profile__tabs").style.height =
        document.querySelector(".profile__tabs__liked").clientHeight -
        50 +
        "px";
    }
  }

  function defineDeletedItem(target) {
    setDeletedAlbum(target);
  }

  return (
    <div className="profile" onClick={(e) => checkEventTarget(e.target)}>
      <div className="profile__content">
        <div
          className="profile__photo"
          style={{ background: `url(${avatarUrl}) center / cover no-repeat` }}
        >
          <div className={editMode ? "profile__edit show" : "profile__edit"}>
            <label
              className="profile__file__label"
              htmlFor="profile__file__input"
            ></label>
            <input
              className="profile__file__input"
              type="file"
              accept="image/*"
              id="profile__file__input"
              onChange={(e) => selectPhoto(e)}
            />
          </div>
        </div>
        <div className="user__name">
          <div className="user__name__text" ref={nameRef}>
            {localStorage.getItem("name__finder")
              ? localStorage.getItem("name__finder")
              : "Princess Nokia"}
          </div>
          <div
            className={
              editMode ? "profile__edit name show" : "profile__edit name"
            }
            id="name"
            onClick={(e) => openEditModal(e)}
          ></div>
        </div>
        <h3 className="user__prof">
          <div className="user__prof__text" ref={profRef}>
            {localStorage.getItem("prof__finder")
              ? localStorage.getItem("prof__finder")
              : "Model"}
          </div>
          <div
            className={
              editMode ? "profile__edit prof show" : "profile__edit prof"
            }
            id="prof"
            onClick={(e) => openEditModal(e)}
          ></div>
        </h3>
        <div className="profile__nav">
          <div
            className={
              directory ? "profile__nav__item" : "profile__nav__item active"
            }
            onClick={changeDirectory}
          >
            Locations
          </div>
          <div
            className={
              directory ? "profile__nav__item active" : "profile__nav__item"
            }
            onClick={changeDirectory}
          >
            Portfolio
          </div>
        </div>
        <div className="profile__filter">
          <form action="/" className="profile__form">
            <input
              type="text"
              className="profile__search"
              placeholder={directory ? "Search album" : "Search location"}
              ref={inputRef}
              onChange={(e) => filterItems(e)}
            />
            <a
              href="https://www.google.com/maps"
              className={
                directory
                  ? "profile__search__find__place"
                  : "profile__search__find__place show"
              }
              target="_blank"
            >
              on the map
            </a>
          </form>
          <div
            className="profile__filter__setting"
            onClick={() => setFilterOptionsVisible(!filterOptionsVisible)}
          ></div>
          <div
            className={
              filterOptionsVisible
                ? "profile__filter__options active"
                : "profile__filter__options"
            }
          >
            {navOptions.map((item, index) => (
              <div
                className="profile__filter__options__item"
                onClick={() =>
                  changeFiltered(
                    item,
                    directory ? "PORTFOLIO.photography" : "PORTFOLIO.locations"
                  )
                }
                key={index}
              >
                {item}
              </div>
            ))}
          </div>
          <Link to="/add">
            <div className="profile__add"></div>
          </Link>
          <div
            className="profile__more"
            onClick={() => setMoreOptionVisible(!moreOptionVisible)}
          ></div>
          <div
            className={
              moreOptionVisible
                ? "profile__filter__options active more"
                : "profile__filter__options more"
            }
          >
            <div
              className="profile__filter__options__item more"
              onClick={() => setEditMode(true)}
            >
              Edit
            </div>
            <Link to="/saved" className="profile__filter__options__item more">
              Saved
            </Link>
          </div>
        </div>
        <div className="profile__tabs">
          <div
            className={
              directory ? "profile__tabs__liked" : "profile__tabs__liked active"
            }
            onWheel={() => checkScroll()}
          >
            <div className="profile__liked">
              {locations.map((item, index) => (
                <LocationItem
                  item={item}
                  hideLocsInfo={true}
                  userIndex={index}
                  isEdit={editMode}
                  onDeleteLocation={openLocationDeleteModal}
                  key={index}
                />
              ))}
              <div
                className={locations.length ? "no-results" : "no-results show"}
              >
                No results
              </div>
              <div className={locationsLength ? "no-items" : "no-items show"}>
                No locations
              </div>
            </div>
          </div>

          <div
            className={
              directory
                ? "profile__tabs__portfolio active"
                : "profile__tabs__portfolio"
            }
          >
            <div className="profile__portfolio">
              {portfolio.map((item, index) => (
                <PortfolioCard
                  cardData={item}
                  isEdit={editMode}
                  changeModal={(e) => {
                    openEditModal(e);
                  }}
                  onSlider={openSlider}
                  onDeleteAlbum={defineDeletedItem}
                  key={index}
                />
              ))}
              <div
                className={portfolio.length ? "no-results" : "no-results show"}
              >
                No results
              </div>
              <div className={albumsLength ? "no-items" : "no-items show"}>
                No albums
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="profile__edit__done__text">Changes saved</div>
      <div
        className={
          editMode ? "profile__edit__done show" : "profile__edit__done"
        }
        onClick={(e) => {
          setEditMode(false);
          e.target.previousSibling.classList.add("show");
          setTimeout(() => {
            e.target.previousSibling.classList.remove("show");
          }, 1500);
        }}
      ></div>
      <div
        className={isModalOpened ? "profile__modal show" : "profile__modal"}
        ref={modalRef}
      >
        <div className="profile__modal__window">
          <h6 className="profile__modal__title">
            {editTypeSelected === "name"
              ? "Edit name"
              : editTypeSelected === "prof"
              ? "Edit profession"
              : "Delete this album?"}
          </h6>
          {editTypeSelected === "name" ? (
            <input
              className="profile__modal__input"
              type="text"
              value={valueInput}
              autoFocus
              onChange={(e) => setValueInput(e.target.value)}
            />
          ) : editTypeSelected === "prof" ? (
            <select
              className="profile__modal__select"
              onChange={(e) =>
                setValueSelect(
                  e.target.value.slice(0, 1).toUpperCase() +
                    e.target.value.slice(1)
                )
              }
            >
              <option value="modal">Modal</option>
              <option value="photographer">Photographer</option>
            </select>
          ) : (
            ""
          )}
          {editTypeSelected === "card" ? (
            <div className="profile__modal__btns">
              <button
                className="profile__modal__btn"
                onClick={(e) => {
                  setIsModalOpened(!isModalOpened);
                  deleteAlbum();
                }}
              >
                Delete
              </button>
              <button
                className="profile__modal__btn"
                onClick={() => {
                  setIsModalOpened(!isModalOpened);
                }}
              >
                Cancel
              </button>
            </div>
          ) : (
            <button
              className="profile__modal__btn"
              onClick={() => {
                editProfile();
                setIsModalOpened(!isModalOpened);
              }}
            >
              Edit
            </button>
          )}
        </div>
      </div>

      <div
        className={
          isModalLocationOpened
            ? "profile__modal__location show"
            : "profile__modal__location"
        }
        ref={modalRef}
      >
        <div className="profile__modal__location__window">
          <h6 className="profile__modal__title">Delete this location?</h6>
          <div className="profile__modal__btns">
            <button
              className="profile__modal__btn"
              onClick={(e) => {
                setIsModalLocationOpened(false);
                deleteLocation();
              }}
            >
              Delete
            </button>
            <button
              className="profile__modal__btn"
              onClick={() => {
                setIsModalLocationOpened(false);
              }}
            >
              Cancel
            </button>
          </div>
        </div>
      </div>

      <div
        className={
          isSliderOpened
            ? "location__page__slider show"
            : "location__page__slider"
        }
      >
        <div
          className="location__page__slider__close"
          onClick={() => closeSlider()}
        ></div>
        <div
          className="location__page__slider__left location__page__arrow"
          onClick={() => changeSlide("prev")}
        >
          <div className="location__page__arrow__icon location__page__arrow__icon__left"></div>
        </div>
        <div
          className="location__page__slider__right location__page__arrow"
          onClick={() => changeSlide("next")}
        >
          <div className="location__page__arrow__icon location__page__arrow__icon__right"></div>
        </div>
        <img
          className="location__page__photo"
          src={urlsForSlider[currentIndex]}
          alt=""
        />
      </div>
    </div>
  );
}

export default Profile;
