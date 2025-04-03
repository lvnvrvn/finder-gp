import "./Message.css";
import { useState } from "react";
import { Link } from "react-router-dom";
import USERS from "../USERS";
import Chat from "../Chat/Chat";

function Message() {
  const [filterOptionsVisible, setFilterOptionsVisible] = useState(false);
  const [users, setUsers] = useState(defineUsers());
  const [showModalQuestion, setShowModalQuestion] = useState(false);
  const [deletedId, setDeletedId] = useState(null);

  function defineUsers() {
    let itemsToDelete = [];
    let filteredUsers;
    if (localStorage.getItem("finder__liked")) {
      const mutualMatch = JSON.parse(localStorage.getItem("finder__liked"));
      const numRow = [1, 2, 3, 4, 5];
      itemsToDelete = numRow.filter((item) => {
        if (mutualMatch.includes(item)) {
          return false;
        } else {
          return true;
        }
      });
    }
    if (localStorage.getItem("finderDeletedChats")) {
      if (!localStorage.getItem("finder__liked")) {
        itemsToDelete = [
          1,
          2,
          3,
          4,
          5,
          ...JSON.parse(localStorage.getItem("finderDeletedChats")),
        ];
      } else {
        itemsToDelete = [
          ...itemsToDelete,
          ...JSON.parse(localStorage.getItem("finderDeletedChats")),
        ];
      }
    }
    if (localStorage.length === 0) {
      return USERS.slice(6);
    }
    if (!localStorage.getItem("finder__liked")) {
      itemsToDelete = [...itemsToDelete, 1, 2, 3, 4, 5];
    }
    filteredUsers = USERS.slice(1).filter(
      (item) => !itemsToDelete.includes(item.id)
    );
    return filteredUsers;
  }

  function sureToDelete(id) {
    setDeletedId(id);
    setShowModalQuestion(true);
  }

  function deleteDialog(id) {
    setShowModalQuestion(false);
    if (localStorage.getItem("finderDeletedChats")) {
      const arrFromLS = JSON.parse(localStorage.getItem("finderDeletedChats"));
      if (arrFromLS.includes(id)) {
        return;
      } else {
        arrFromLS.push(id);
      }
      localStorage.setItem("finderDeletedChats", JSON.stringify(arrFromLS));
    } else {
      const arrForLS = [];
      arrForLS.push(id);
      localStorage.setItem("finderDeletedChats", JSON.stringify(arrForLS));
    }
    setUsers(users.filter((item) => item.id !== id));
    if (localStorage.getItem("finderMarked")) {
      const arrFromLS = JSON.parse(localStorage.getItem("finderMarked"));
      localStorage.setItem(
        "finderMarked",
        JSON.stringify(arrFromLS.filter((item) => item !== id))
      );
    }
  }

  function markAsRead(item) {
    if (localStorage.getItem("finder__wasRead")) {
      const arr = JSON.parse(localStorage.getItem("finder__wasRead"));
      if (arr.includes(item.id)) {
        return;
      }
      arr.push(item.id);
      localStorage.setItem("finder__wasRead", JSON.stringify(arr));
    } else {
      const arr = [];
      arr.push(item.id);
      localStorage.setItem("finder__wasRead", JSON.stringify(arr));
    }
  }

  function filterMessages(e) {
    if (e.target.value === "") {
      setUsers(defineUsers());
    } else {
      const filteredUsersIds = [];
      if (localStorage.getItem("finderSentMessages")) {
        const arrFromLS = JSON.parse(
          localStorage.getItem("finderSentMessages")
        ).forEach((item) => {
          if (
            item.messages[item.messages.length - 1].message.includes(
              e.target.value.toLowerCase().trim()
            )
          ) {
            filteredUsersIds.push(item.userId);
          }
        });
      }
      defineUsers().forEach((item) => {
        if (
          item.messages[item.messages.length - 1].message
            .toLowerCase()
            .includes(e.target.value.toLowerCase().trim())
        ) {
          filteredUsersIds.push(item.id);
        }
        if (
          item.name.toLowerCase().includes(e.target.value.toLowerCase().trim())
        ) {
          filteredUsersIds.push(item.id);
        }
      });
      const filteredUsers = defineUsers().filter((item) =>
        filteredUsersIds.includes(item.id)
      );
      setUsers(filteredUsers);
    }
  }

  function changeFilterOptionsVisibility() {
    setFilterOptionsVisible(!filterOptionsVisible);
  }

  function showUnread() {
    const firstFiltering = defineUsers().filter(
      (item) =>
        item.messages[item.messages.length - 1].isRead === false &&
        item.messages[item.messages.length - 1].sent === "from"
    );
    if (localStorage.getItem("finder__wasRead")) {
      const arrFromLS = JSON.parse(localStorage.getItem("finder__wasRead"));
      const filteredUsers = firstFiltering.filter(
        (item) => !arrFromLS.includes(item.id)
      );
      setUsers(filteredUsers);
    } else {
      setUsers(firstFiltering);
    }
  }

  function showMarked() {
    if (localStorage.getItem("finderMarked")) {
      const arrFromLS = JSON.parse(localStorage.getItem("finderMarked"));
      setUsers(defineUsers().filter((item) => arrFromLS.includes(item.id)));
    } else {
      setUsers([]);
    }
  }

  function showAllMessages() {
    setUsers(defineUsers());
  }

  return (
    <div
      className="message"
      onClick={(e) => {
        if (e.target.className !== "message__filter") {
          setFilterOptionsVisible(false);
        }
      }}
    >
      <div className="message__content">
        <div className="message__content__search">
          <form action="" className="message__form">
            <input
              className="message__input"
              type="text"
              placeholder="Search dialog"
              onChange={(e) => filterMessages(e)}
            />
          </form>
          <div
            className="message__filter"
            onClick={changeFilterOptionsVisibility}
          ></div>
          <div
            className={
              filterOptionsVisible
                ? "message__filter__options active"
                : "message__filter__options"
            }
          >
            <div
              className="message__filter__options__item"
              onClick={showUnread}
            >
              Show unread
            </div>
            <div
              className="message__filter__options__item"
              onClick={showMarked}
            >
              Show marked
            </div>
            <div
              className="message__filter__options__item"
              onClick={showAllMessages}
            >
              Show all
            </div>
          </div>
        </div>
        <div className="message__content__chats">
          {users.map((item) => (
            <Link
              to="/dialog"
              state={{ item }}
              key={item.id}
              onClick={() => markAsRead(item)}
            >
              <Chat chatData={item} onDelete={sureToDelete} />
            </Link>
          ))}
        </div>
        <div
          className={
            users.length === 0
              ? "message__noresults show"
              : "message__noresults"
          }
        >
          No results
        </div>
      </div>
      <div
        className={
          showModalQuestion ? "dialog__question show" : "dialog__question"
        }
      >
        <div className="dialog__question__inner">
          <h3 className="dialog__question__title">Delete this dialog?</h3>
          <div
            className="dialog__question__close"
            onClick={() => setShowModalQuestion(false)}
          ></div>
          <button
            className="dialog__question__btn"
            onClick={() => deleteDialog(deletedId)}
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
    </div>
  );
}

export default Message;
