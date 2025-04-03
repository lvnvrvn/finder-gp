import "./Dialog.css";
import { useLocation, Link } from "react-router-dom";
import { useState, useRef, useEffect } from "react";
import USERS from "../USERS";

function Dialog() {
  const location = useLocation();
  const data = location.state.item;

  const [messages, setMessages] = useState(defineMessages());
  const [showOptions, setShowOptions] = useState(false);
  const [mute, setMute] = useState(false);
  const [showMedia, setShowMedia] = useState(false);
  const [showModalQuestion, setShowModalQuestion] = useState(false);
  const [typeQuestion, setTypeQuestion] = useState("");
  const [showScrollbar, setShowScrollbar] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isSliderOpened, setIsSliderOpened] = useState(false);
  const [users, setUsers] = useState(defineUsers());
  const [isMatched, setIsMatched] = useState(isMatchedCheck());
  const [showSearch, setShowSearch] = useState(false);

  const messagesRef = useRef(null);

  useEffect(() => {
    document.querySelector(".dialog__content__input").focus();
  }, []);

  useEffect(() => {
    if (isMatched) {
      setMessages([
        {
          sent: "from",
          message: `You have match with ${data.name}`,
          date: "18:20 Tue",
          isRead: true,
        },
      ]);
    } else {
      if (localStorage.getItem("finder__liked")) {
        if (
          JSON.parse(localStorage.getItem("finder__liked")).includes(data.id)
        ) {
          setMessages(defineMessages().slice(1));
        } else {
          setMessages(defineMessages());
        }
      }
    }
  }, [isMatched]);

  useEffect(() => {
    messagesRef.current.scrollTop =
      messagesRef.current.scrollHeight - messagesRef.current.clientHeight;
    if (messagesRef.current.scrollTop === 0) {
      messagesRef.current.style.justifyContent = "end";
    } else {
      messagesRef.current.style.justifyContent = "none";
    }
  }, [messages]);

  function defineUsers() {
    if (localStorage.getItem("finder__liked")) {
      const mutualMatch = [];
      JSON.parse(localStorage.getItem("finder__liked")).forEach((item) => {
        mutualMatch.push(USERS[item]);
      });
      return [...mutualMatch, ...USERS.slice(6)];
    } else {
      return USERS.slice(6);
    }
  }

  function defineMessages() {
    if (localStorage.getItem("finderSentMessages")) {
      const arrFromLS = JSON.parse(localStorage.getItem("finderSentMessages"));
      if (arrFromLS.map((item) => item.userId).includes(data.id)) {
        const messagesFromLS = arrFromLS.filter(
          (item) => item.userId === data.id
        )[0].messages;
        const newMessages = [...data.messages, ...messagesFromLS];
        return newMessages;
      } else {
        return data.messages;
      }
    }
    return data.messages;
  }

  function findMessage(e) {
    const val = e.target.value;
    if (val.trim() === "") {
      setMessages(defineMessages());
    } else {
      const filteredMessages = defineMessages().filter(
        (item) =>
          typeof item.message === "string" &&
          item.message.toLowerCase().includes(val.toLowerCase().trim())
      );
      setMessages(filteredMessages);
    }
  }

  function deleteDialog(id) {
    clearDialog();
    if (localStorage.getItem("finderDeletedChats")) {
      const arrFromLS = JSON.parse(localStorage.getItem("finderDeletedChats"));
      arrFromLS.push(id);
      const filteredUsers = defineUsers().filter((item) => {
        if (arrFromLS.includes(item.id)) {
          return false;
        } else {
          return true;
        }
      });
      setUsers(filteredUsers);
      localStorage.setItem("finderDeletedChats", JSON.stringify(arrFromLS));
    } else {
      const arrForLS = [];
      arrForLS.push(id);
      localStorage.setItem("finderDeletedChats", JSON.stringify(arrForLS));
      setUsers(defineUsers().filter((item) => item.id !== id));
    }
  }

  function clearDialog() {
    document.querySelector(".dialog__content__messages").innerHTML =
      '<div class="dialog__content__nomessages">No messages</div>>';
  }

  function blockUser() {
    document.querySelector(".dialog__content__area").innerHTML =
      '<div class="dialog__content__block">You have blocked this user</div>>';
  }

  function isMatchedCheck() {
    if (localStorage.getItem("finderChatStarted")) {
      const arrFromLS = JSON.parse(localStorage.getItem("finderChatStarted"));
      if (arrFromLS.includes(data.id)) {
        return false;
      }
    }
    if (data.id > 5) {
      return false;
    }
    if (!localStorage.getItem("finder__liked")) {
      return false;
    }
    if (localStorage.getItem("finder__liked")) {
      const arrFromLS = JSON.parse(localStorage.getItem("finder__liked"));
      if (arrFromLS.includes(data.id)) {
        return true;
      } else {
        return false;
      }
    }
    return true;
  }

  function addMessage(e) {
    const val = e.value;

    const date = new Date();
    let hours = date.getHours();
    let mins = date.getMinutes();

    if (hours < 10) {
      hours = "0" + hours;
    }
    if (mins < 10) {
      mins = "0" + mins;
    }

    if (localStorage.getItem("finderChatStarted")) {
      const arrFromLS = JSON.parse(localStorage.getItem("finderChatStarted"));
      arrFromLS.push(data.id);
      localStorage.setItem("finderChatStarted", JSON.stringify(arrFromLS));
    } else {
      const arrForLS = [data.id];
      localStorage.setItem("finderChatStarted", JSON.stringify(arrForLS));
      setIsMatched(isMatchedCheck);
    }
    setMessages([
      ...messages,
      {
        sent: "to",
        message: val,
        date: `${hours}:${mins}`,
        isRead: false,
      },
    ]);
  }

  function addToLS(val) {
    const messagesArr = [];
    const userObj = {
      userId: data.id,
      messages: [],
    };
    const date = new Date();
    let hours = date.getHours();
    let mins = date.getMinutes();
    if (hours < 10) {
      hours = "0" + hours;
    }
    if (mins < 10) {
      mins = "0" + mins;
    }
    const messageObj = {
      sent: "to",
      message: val,
      date: `${hours}:${mins}`,
      isRead: false,
    };
    userObj.messages.push(messageObj);
    if (localStorage.getItem("finderSentMessages")) {
      const arrFromLS = JSON.parse(localStorage.getItem("finderSentMessages"));
      if (arrFromLS.map((item) => item.userId).includes(data.id)) {
        for (let obj of arrFromLS) {
          if (obj.userId === data.id) {
            obj.messages.push(messageObj);
          }
        }
      } else {
        arrFromLS.push(userObj);
      }
      localStorage.setItem("finderSentMessages", JSON.stringify(arrFromLS));
    } else {
      messagesArr.push(userObj);
      localStorage.setItem("finderSentMessages", JSON.stringify(messagesArr));
    }
  }

  function checkClick(e) {
    if (!e.target.classList.contains("dialog__more")) {
      setShowOptions(false);
    }
    if (!e.target.classList.contains("dialog__message")) {
      document
        .querySelectorAll(".dialog__message")
        .forEach((item) => item.lastChild.classList.remove("show"));
    }
    if (
      !e.target.classList.contains("dialog__search") &&
      !e.target.classList.contains("dialog__search__input")
    ) {
      setShowSearch(false);
    }
  }

  function closeSlider() {
    setIsSliderOpened(false);
    document.body.style.overflow = "visible";
  }

  const mediaUrls = data.messages
    .filter((item) => Array.isArray(item.message))
    .map((item) => item.message)
    .flat(1);

  function changeSlide(dir) {
    if (dir === "next") {
      if (currentIndex === mediaUrls.length - 1) {
        setCurrentIndex(0);
      } else {
        setCurrentIndex(currentIndex + 1);
      }
    } else {
      if (currentIndex === 0) {
        setCurrentIndex(mediaUrls.length - 1);
      } else {
        setCurrentIndex(currentIndex - 1);
      }
    }
  }

  function showDeleteIcon(index) {
    document
      .querySelectorAll(".dialog__message")
      .forEach((item) => item.lastChild.classList.remove("show"));
    document
      .querySelectorAll(".dialog__message")
      [index].lastChild.classList.add("show");
  }

  function deleteMessage(index) {
    document
      .querySelectorAll(".dialog__message")
      [index].classList.add("deleted");

    setTimeout(() => {
      setMessages(messages.filter((item, messIndex) => messIndex !== index));
    }, 400);
  }

  return (
    <div className="dialog" onClick={(e) => checkClick(e)}>
      <div className="dialog__content">
        <div className="dialog__header">
          <div className="dialog__left">
            <Link to="/user_profile" state={{ userData: data }}>
              <div
                className="dialog__avatar"
                style={{
                  background: `url(${data.avatar}) center / cover no-repeat`,
                }}
              ></div>
            </Link>
            <div className="dialog__info">
              <div className="dialog__name">
                {data.name}
                <div
                  className={mute ? "dialog__mute show" : "dialog__mute"}
                ></div>
              </div>
              <div className="dialog__time">
                last seen {data.lastSeen} min ago
              </div>
            </div>
          </div>
          <div className="dialog__right">
            <input
              className={
                showSearch
                  ? "dialog__search__input show"
                  : "dialog__search__input"
              }
              type="text"
              placeholder="Search message"
              onChange={(e) => findMessage(e)}
            />
            <div
              className="dialog__search"
              onClick={() => {
                setShowSearch(!showSearch);
                document.querySelector(".dialog__search__input").focus();
              }}
            ></div>
            <div
              className="dialog__more"
              onClick={() => setShowOptions(!showOptions)}
            ></div>
          </div>

          <div
            className={showOptions ? "dialog__options show" : "dialog__options"}
          >
            <div className="dialog__option" onClick={() => setMute(!mute)}>
              {mute ? "Unmute" : "Mute"}
            </div>
            <div className="dialog__option" onClick={() => setShowMedia(true)}>
              Show media
            </div>
            <div
              className="dialog__option"
              onClick={() => {
                setShowModalQuestion(true);
                setTypeQuestion(true);
              }}
            >
              Delete chat
            </div>
            <div
              className="dialog__option"
              onClick={() => {
                setShowModalQuestion(true);
                setTypeQuestion(false);
              }}
            >
              Block
            </div>
          </div>
        </div>
        <div className={showMedia ? "dialog__media show" : "dialog__media"}>
          <div className="dialog__media__inner">
            <h5 className="dialog__media__title">Photos</h5>
            <div
              className="dialog__media__close"
              onClick={() => setShowMedia(false)}
            ></div>
            <div className="dialog__items">
              {messages
                .filter((item) => Array.isArray(item.message))
                .map((item) => item.message)
                .flat(1).length === 0 ? (
                <div className="dialog__media__nophotos">No photos</div>
              ) : (
                messages
                  .filter((item) => Array.isArray(item.message))
                  .map((item) => item.message)
                  .flat(1)
                  .map((item, index) => (
                    <div
                      className="dialog__media__item"
                      style={{
                        background: `url(${item}) center / cover no-repeat`,
                      }}
                      onClick={() => {
                        setCurrentIndex(index);
                        setIsSliderOpened(true);
                      }}
                    ></div>
                  ))
              )}
            </div>
          </div>
        </div>
        <div
          className={
            showModalQuestion ? "dialog__question show" : "dialog__question"
          }
        >
          <div className="dialog__question__inner">
            <h3 className="dialog__question__title">
              {typeQuestion ? "Delete this chat?" : "Block this user?"}
            </h3>
            <div
              className="dialog__question__close"
              onClick={() => setShowModalQuestion(false)}
            ></div>
            <button
              className="dialog__question__btn"
              onClick={() => {
                typeQuestion ? deleteDialog(data.id) : blockUser();
                setShowModalQuestion(false);
              }}
            >
              Yes
            </button>
            <button
              className="dialog__question__btn"
              onClick={() => setShowModalQuestion(false)}
            >
              Cancel
            </button>
          </div>
        </div>
        <div
          className={
            showScrollbar
              ? "dialog__content__messages show"
              : "dialog__content__messages"
          }
          ref={messagesRef}
          onScroll={() => {
            setShowScrollbar(true);
            setTimeout(() => {
              setShowScrollbar(false);
            }, 500);
          }}
        >
          {messages.length === 0 ? (
            <div className="dialog__nomessage">No messages</div>
          ) : (
            messages.map((item, index) => (
              <div
                className={
                  item.sent === "to"
                    ? "dialog__message sent"
                    : isMatched
                    ? "dialog__message matched"
                    : "dialog__message received"
                }
                key={index}
                onClick={() => showDeleteIcon(index)}
              >
                {typeof item.message !== "object" ? (
                  item.message
                ) : (
                  <div className="dialog__message__media">
                    {item.message.map((item, index) => (
                      <div
                        className="dialog__message__media__item"
                        style={{
                          background: `url(${item}) center / cover no-repeat`,
                        }}
                        key={index}
                        onClick={() => {
                          setCurrentIndex(index);
                          setIsSliderOpened(true);
                        }}
                      ></div>
                    ))}
                  </div>
                )}
                <div
                  className={
                    isMatched ? "dialog__message none" : "dialog__message__time"
                  }
                >
                  <span>{item.date}</span>{" "}
                  <span className={item.sent === "to" ? "" : "none"}>
                    &#128504;
                  </span>
                  <span
                    className={item.sent === "to" && item.isRead ? "" : "none"}
                  >
                    &#128504;
                  </span>
                </div>

                <div
                  className="dialog__message__delete"
                  key={index}
                  onClick={() => deleteMessage(index)}
                ></div>
              </div>
            ))
          )}
        </div>
        <div className="dialog__content__area">
          <input
            type="text"
            className="dialog__content__input"
            placeholder="Message"
            onKeyDown={(e) => {
              if (e.code === "Enter") {
                addMessage(e.target);
                addToLS(e.target.value);
                setIsMatched(false);
                e.target.value = "";
              }
            }}
          />
          <button
            className="dialog__content__btn"
            onClick={(e) => {
              addMessage(e.target.previousSibling);
              addToLS(e.target.previousSibling.value);
              setIsMatched(false);
              e.target.previousSibling.value = "";
              document.querySelector(".dialog__content__input").focus();
            }}
          >
            Send
          </button>
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
          src={mediaUrls[currentIndex]}
          alt=""
        />
      </div>
    </div>
  );
}

export default Dialog;
