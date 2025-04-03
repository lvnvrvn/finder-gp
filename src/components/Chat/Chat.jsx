import "./Chat.css";
import { useState, useEffect } from "react";

function Chat({ chatData, onDelete }) {
  const [optionsActive, setOptionsActive] = useState(false);
  const [unreadCount, setUnreadCount] = useState(countUnread());
  const [isMatched, setIsMatched] = useState(isMatchedCheck());
  const [isMarked, setIsMarked] = useState(false);
  const [isMuted, setIsMuted] = useState(isMutedCheck());
  const [wasReadState, setWasReadState] = useState(wasReadCheck());
  const [lastMessage, setLastMessage] = useState(defineLastMessage());

  const [lastMessageText, setLastMessageText] = useState(lastMessage.message);

  const style = {
    background: `url(${chatData.avatar}) center center / cover no-repeat`,
    backgroundSize: "cover",
  };

  document.addEventListener("click", function (e) {
    if (!e.target.classList.contains("message__chat__right")) {
      setOptionsActive(false);
    }
  });

  useEffect(() => {
    const markedFromLS = JSON.parse(localStorage.getItem("finderMarked"));
    if (markedFromLS?.includes(chatData.id)) {
      setIsMarked(true);
    }

    if (lastMessageText.length > 90) {
      setLastMessageText(lastMessageText.slice(0, 90) + "...");
    }
    if (window.innerWidth < 695 && lastMessageText.length > 60) {
      setLastMessageText(lastMessageText.slice(0, 60) + "...");
    }
    if (window.innerWidth < 450 && lastMessageText.length > 30) {
      setLastMessageText(lastMessageText.slice(0, 30) + "...");
    }
    if (window.innerWidth < 320 && lastMessageText.length > 20) {
      setLastMessageText(lastMessageText.slice(0, 20) + "...");
    }
  }, []);

  function isMatchedCheck() {
    if (localStorage.getItem("finderChatStarted")) {
      const arrFromLS = JSON.parse(localStorage.getItem("finderChatStarted"));
      if (arrFromLS.includes(chatData.id)) {
        return false;
      } else {
        if (localStorage.getItem("finder__liked")) {
          const arrFromLS = JSON.parse(localStorage.getItem("finder__liked"));
          if (arrFromLS.includes(chatData.id)) {
            return true;
          } else {
            return false;
          }
        } else {
          return false;
        }
      }
    } else {
      if (localStorage.getItem("finder__liked")) {
        const arrFromLS = JSON.parse(localStorage.getItem("finder__liked"));
        if (arrFromLS.includes(chatData.id)) {
          return true;
        } else {
          return false;
        }
      } else {
        return false;
      }
    }
  }

  function defineLastMessage() {
    if (localStorage.getItem("finderSentMessages")) {
      if (isMatched) {
        return {
          sent: "from",
          message: `You have match with ${chatData.name}`,
          date: "18:20 Tue",
          isRead: false,
        };
      } else {
        const arrFromLS = JSON.parse(
          localStorage.getItem("finderSentMessages")
        );
        if (arrFromLS.map((item) => item.userId).includes(chatData.id)) {
          const messagesFromLS = arrFromLS.filter(
            (item) => item.userId === chatData.id
          )[0].messages;
          const newMessages = [...chatData.messages, ...messagesFromLS];
          return newMessages[newMessages.length - 1];
        } else {
          return chatData.messages[chatData.messages.length - 1];
        }
      }
    } else {
      return chatData.messages[chatData.messages.length - 1];
    }
  }

  function wasReadCheck() {
    if (localStorage.getItem("finder__wasRead")) {
      const filtered = JSON.parse(
        localStorage.getItem("finder__wasRead")
      ).filter((item) => item === chatData.id);
      if (filtered.length > 0) {
        return true;
      }
    } else {
      return false;
    }
  }

  function isMutedCheck() {
    if (localStorage.getItem("finderMuted")) {
      const arrFromLS = JSON.parse(localStorage.getItem("finderMuted"));
      if (arrFromLS.includes(chatData.id)) {
        return true;
      } else {
        return false;
      }
    } else {
      return false;
    }
  }

  function changeOptionsActive() {
    document
      .querySelectorAll(".message__chat__options")
      .forEach((item) => item.classList.remove("active"));
    setOptionsActive(!optionsActive);
  }

  function rememberMarked(id, isMarked) {
    if (!localStorage.getItem("finderMarked")) {
      localStorage.setItem("finderMarked", JSON.stringify([]));
    }

    const arrFromLS = JSON.parse(localStorage.getItem("finderMarked"));
    if (isMarked) {
      localStorage.setItem("finderMarked", JSON.stringify([...arrFromLS, id]));
    } else {
      const filtered = arrFromLS.filter((item) => item !== id);
      localStorage.setItem("finderMarked", JSON.stringify(filtered));
    }
  }

  function rememberMuted(id, actionType) {
    if (localStorage.getItem("finderMuted")) {
      const arrFromLS = JSON.parse(localStorage.getItem("finderMuted"));
      if (!actionType) {
        if (arrFromLS.includes(id)) {
          return;
        }
        arrFromLS.push(id);
        localStorage.setItem("finderMuted", JSON.stringify(arrFromLS));
      } else {
        const filtered = arrFromLS.filter((item) => item !== id);
        localStorage.setItem("finderMuted", JSON.stringify(filtered));
      }
    } else {
      const arrForLS = [];
      arrForLS.push(id);
      localStorage.setItem("finderMuted", JSON.stringify(arrForLS));
    }
  }

  function countUnread() {
    let count = 0;
    for (let i = chatData.messages.length - 1; i >= 0; i--) {
      if (chatData.messages[i].sent === "to") {
        return count;
      } else {
        if (chatData.messages[i].isRead === false) {
          count++;
        } else {
          return count;
        }
      }
    }
  }

  function checkClick(e) {
    if (e.target.classList.contains("message__chat__right")) {
      e.preventDefault();
    }
  }

  return (
    <div className="message__chat__item" onClick={(e) => checkClick(e)}>
      <div className="message__chat__photo" style={style}></div>
      <div className="message__chat__text">
        <div className="message__chat__name">
          {chatData.name}
          <div
            className={
              isMuted ? "message__chat__mute" : "message__chat__mute none"
            }
          ></div>
        </div>
        <div
          className={
            (unreadCount && !wasReadState) || (isMatched && !wasReadState)
              ? "message__chat__mail unread"
              : "message__chat__mail"
          }
        >
          <span
            className={
              lastMessage.sent === "to"
                ? "message__chat__sent show"
                : "message__chat__sent"
            }
          >
            <span
              className={
                chatData.messages[chatData.messages.length - 1] === "to"
              }
            >
              &#128504;
            </span>
            <span
              className={
                chatData.messages[chatData.messages.length - 1].isRead
                  ? "message__chat__chechmark"
                  : "message__chat__chechmark none"
              }
            >
              &#128504;
            </span>
          </span>
          {isMatched
            ? `You have the match with ${chatData.name}`
            : lastMessageText}
        </div>
      </div>
      <div className="message__chat__info">
        <div className="message__chat__date">
          {chatData.messages[chatData.messages.length - 1].date}
        </div>
        <div
          className={
            (unreadCount && !wasReadState) || (isMatched && !wasReadState)
              ? "message__chat__count"
              : "message__chat__count none"
          }
        >
          {isMatched ? 1 : unreadCount}
        </div>
        <div className="message__chat__options__btn">
          <div className="message__chat__options__btn__element"></div>
          <div className="message__chat__options__btn__element"></div>
          <div className="message__chat__options__btn__element"></div>
        </div>
        <div
          className={
            optionsActive
              ? "message__chat__options active"
              : "message__chat__options"
          }
        >
          <div
            className="message__chat__options__item"
            onClick={(e) => {
              e.preventDefault();
              setIsMuted(!isMuted);
              rememberMuted(chatData.id, isMuted);
            }}
          >
            {isMuted ? "Unmute" : "Mute"}
          </div>
          <div
            className="message__chat__options__item"
            onClick={(e) => {
              e.preventDefault();
              setIsMarked(!isMarked);
              rememberMarked(chatData.id, !isMarked);
            }}
          >
            {isMarked ? "Unmark" : "Mark"}
          </div>
          <div
            className="message__chat__options__item"
            onClick={(e) => {
              e.preventDefault();
              onDelete(chatData.id);
            }}
          >
            Delete
          </div>
        </div>
      </div>

      <div
        className={
          isMarked ? "message__chat__mark show" : "message__chat__mark"
        }
      ></div>
      <div
        className="message__chat__right"
        onClick={() => changeOptionsActive(chatData.id)}
      ></div>
    </div>
  );
}

export default Chat;
