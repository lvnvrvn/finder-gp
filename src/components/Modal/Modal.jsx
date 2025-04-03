import "./Modal.css";

function Modal({ toClose, isVisible }) {
  function changeBg() {
    document.querySelector(".modal__bg").style.background = "rgba(8, 8, 8, .8)";
    document.querySelector(".modal__bg").style.zIndex = "99";
  }

  return (
    <div
      className={isVisible ? "modal show" : "modal"}
      onClick={() => {
        toClose();
        changeBg();
      }}
    >
      <div className="modal__window">
        <h2 className="modal__title">Добро пожаловать в tfp tinder.</h2>
        <p className="modal__text">
          Здесь ты можешь найти понравившегося тебе художественного деятеля и
          узнать взаимна ли ваша творческая симпатия.
          <br />
          <br />
          <i>
            P.S. Приложение ещё находится в разработке, поэтому некоторые его
            детали пока что носят демонстративный, а не функциональный характер.
          </i>
        </p>
        <button
          className="modal__btn"
          onClick={() => {
            toClose();
            changeBg();
          }}
        >
          Понятно
        </button>
      </div>
    </div>
  );
}

export default Modal;
