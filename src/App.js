import Profile from "./components/Profile/Profile";
import { Route, Routes, Link } from "react-router-dom";
import { useState, useEffect } from "react";

import Match from "./components/Match/Match";
import Search from "./components/Search/Search";
import Add from "./components/Add/Add";
import Message from "./components/Message/Message";
import Dialog from "./components/Dialog/Dialog";
import AddPortfolio from "./components/AddPortfolio/AddPortfolio";
import AddPortfolioCaption from "./components/AddPortfolioCaption/AddPortfolioCaption";
import DataSent from "./components/DataSent/DataSent";
import UserProfile from "./components/UserProfile/UserProfile";
import Saved from "./components/Saved/Saved";
import LocationPage from "./components/LocationPage/LocationPage";
import Modal from "./components/Modal/Modal";
import ModalSmall from "./components/ModalSmall/ModalSmall";

function App() {
  function markAsViewed() {
    document.body.children[1].children[0].children[1].children[4].children[0].classList.remove(
      "new"
    );
  }

  const [modalVisibility, setModalVisibility] = useState(false);
  const [modalBgVisibility, setModalBgVisibility] = useState(false);
  const [currentModal, setCurrentModal] = useState(NaN);

  const modalsText = [
    "Здесь находится раздел, в котором можно посмотреть людей поблизости и их портфолио",
    "Здесь можно поискать локации для съёмок",
    "Здесь можно выложить новые работы в портфолио или добавить найденную локацию",
    "Здесь находятся сообщения с другими пользователями",
    "Здесь находится ваш профиль",
  ];

  const leftOffset = [10, 30, 50, 70, 90];
  const leftOffsetMobile = [30, 30, 50, 70, 70];

  useEffect(() => {
    if (modalVisibility) {
      document.body.style.overflow = "hidden";
    }
    if (!localStorage.getItem("finder__wasVisited")) {
      setModalBgVisibility(true);
      setModalVisibility(true);
      setCurrentModal(-1);
    }
  }, []);

  useEffect(() => {
    if (currentModal > 4) {
      setModalBgVisibility(false);
      localStorage.setItem("finder__wasVisited", true);
    }
  }, [currentModal]);

  function closeModal() {
    setModalVisibility(false);
  }

  function switchModal() {
    setCurrentModal(currentModal + 1);
  }

  return (
    <div className="App" onClick={() => switchModal()}>
      <Routes>
        <Route path="home" element={<Match />} />
        <Route path="search" element={<Search />} />
        <Route path="add" element={<Add />} />
        <Route path="message" element={<Message />} />
        <Route path="/" element={<Profile />} />
        <Route path="dialog" element={<Dialog />} />
        <Route path="add_portfolio" element={<AddPortfolio />} />
        <Route path="add_portfolio_caption" element={<AddPortfolioCaption />} />
        <Route path="data_sent" element={<DataSent />} />
        <Route path="user_profile" element={<UserProfile />} />
        <Route path="saved" element={<Saved />} />
        <Route path="location_page" element={<LocationPage />} />
      </Routes>
      <div className="fixed__menu">
        <Link to="/home">
          <div className="fixed__menu__item fixed__menu__match"></div>
        </Link>
        <Link to="/search">
          <div className="fixed__menu__item fixed__menu__search"></div>
        </Link>
        <Link to="/add">
          <div className="fixed__menu__item fixed__menu__add"></div>
        </Link>
        <Link to="/message">
          <div className="fixed__menu__item fixed__menu__message"></div>
        </Link>
        <Link to="/">
          <div
            className="fixed__menu__item fixed__menu__profile"
            onClick={markAsViewed}
          ></div>
        </Link>
        {modalsText.map((item, index) => (
          <ModalSmall
            isVisible={currentModal === index}
            left={
              window.innerWidth > 500
                ? leftOffset[index]
                : leftOffsetMobile[index]
            }
            text={modalsText[index]}
            index={index}
            toSwitch={switchModal}
          />
        ))}
      </div>

      <Modal isVisible={modalVisibility} toClose={closeModal} />

      <div className={modalBgVisibility ? "modal__bg show" : "modal__bg"}></div>
    </div>
  );
}

export default App;
