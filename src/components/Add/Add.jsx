import "./Add.css";
import { Link } from "react-router-dom";

function Add() {
  return (
    <div className="add">
      <div className="add__content">
        <Link to="/add_portfolio" className="add__portfolio__area add__area" state={{ isItLocationPage: false }}>Add new work to portfolio</Link>
        <Link to="/add_portfolio" className="add__location__area add__area" state={{ isItLocationPage: true }}>Add new location</Link>
      </div>
    </div>
  );
}

export default Add;
