import "./LocationPage.css";
import { useLocation, Link } from "react-router-dom";
import { useState } from "react";
import USERS from "../USERS";

function LocationPage() {
  const location = useLocation();
  const locationData = location.state.item;

  const [isSliderOpened, setIsSliderOpened] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isSaved, setIsSaved] = useState(locationData.isSaved);

  function openSlider(index) {
    setIsSliderOpened(true);
    setCurrentIndex(index);
    document.body.style.overflow = "hidden";
  }

  function closeSlider() {
    setIsSliderOpened(false);
    document.body.style.overflow = "visible";
  }

  function changeSlide(dir) {
    if (dir === "next") {
      if (currentIndex === locationData.urls.length - 1) {
        setCurrentIndex(0);
      } else {
        setCurrentIndex(currentIndex + 1);
      }
    } else {
      if (currentIndex === 0) {
        setCurrentIndex(locationData.urls.length - 1);
      } else {
        setCurrentIndex(currentIndex - 1);
      }
    }
  }

  function saveLocation(title) {
    setIsSaved(!isSaved);
    localStorage.setItem("finder__locations", title);
  }

  return (
    <div className="location__page">
      <div className="location__page__content">
        <div
          className="location__page__save"
          onClick={() => saveLocation(locationData.locationTitle)}
        >
          <div
            className={
              isSaved
                ? "location__page__icon__unsaved"
                : "location__page__icon__unsaved show"
            }
          ></div>
          <div
            className={
              isSaved
                ? "location__page__icon__saved show"
                : "location__page__icon__saved"
            }
          ></div>
        </div>

        <div className="location__page__media">
          {locationData.urls.map((item, index) => (
            <div
              className="location__page__media__photo"
              style={{ background: `url(${item}) center / cover no-repeat` }}
              key={index}
              onClick={() => openSlider(index)}
            ></div>
          ))}
        </div>
        <h2 className="location__page__title">{locationData.locationTitle}</h2>
        <div className="location__page__text">
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Voluptate,
          dolor sit. Inventore, neque! Vero voluptatibus maiores assumenda
          possimus voluptatum nihil ratione repellat alias exercitationem,
          accusamus maxime illum omnis minima fuga inventore sint veniam
          repellendus rerum distinctio deleniti neque aliquam. Eos natus,
          quisquam tenetur voluptate distinctio architecto asperiores aliquid,
          quibusdam mollitia, perferendis dolorum totam. Excepturi quasi
          perspiciatis exercitationem atque, natus nulla? Minima quia, obcaecati
          velit accusamus ut sint enim, cum, animi illo ab quasi! A, asperiores!
          Perferendis nihil veritatis hic ullam nostrum. Commodi sapiente fugit
          rerum eligendi cumque atque! Cum magnam aperiam ducimus eum laboriosam
          voluptate voluptates unde voluptas, nulla laborum earum officia
          quisquam enim maxime at non obcaecati tenetur beatae repellendus
          dignissimos explicabo consequuntur. Officiis autem porro, iste aliquam
          possimus beatae, corporis sequi rem fugit dicta sit eveniet amet
          architecto laborum, cum nobis rerum adipisci error doloribus fuga
          laudantium. Consectetur recusandae laudantium, quaerat repellendus
          nobis magnam facere rerum assumenda quod corporis quas natus nulla
          inventore, magni eos illum, blanditiis saepe minus quos? Tempore
          aliquid tempora temporibus nobis soluta eius id quisquam maxime magni
          accusamus, rerum, reprehenderit dignissimos natus, est voluptatem et
          commodi vel voluptatibus excepturi error! Facilis facere similique
          molestiae mollitia eveniet corrupti aspernatur repellendus odio est!
          Dolor, voluptates officia!
        </div>
        <div className="location__page__address">
          <b>Address</b>: <i>{locationData.address}</i>
        </div>
        <a
          href={locationData.link}
          target="_blank"
          className="location__page__btn"
        >
          Look on the map
        </a>
        <div className="location__page__author">
          <Link
            to="/user_profile"
            state={{ userData: USERS[locationData.authId] }}
            className="location__page__author__photo"
            style={{
              background: `url(${
                USERS[locationData.authId].avatar
              }) center / cover no-repeat`,
            }}
          ></Link>
          <span className="location__page__author__sign">
            Posted by {USERS[locationData.authId].name}
          </span>
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
          src={locationData.urls[currentIndex]}
          alt=""
        />
      </div>
    </div>
  );
}

export default LocationPage;
