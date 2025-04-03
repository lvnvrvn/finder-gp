import "./Match.css";
import { useState } from "react";
import { Link } from "react-router-dom";
import USERS from "../USERS";
import MatchItem from "../MatchItem/MatchItem";

function Match() {
  const [currentIndex, setCurrentIndex] = useState(0);

  return (
    <div className="match">
      <div className="match__content">
        <div className="match__container">
          {USERS.slice(1, 6).map((item, index) => (
            <MatchItem
              data={{ item, currentIndex, index, setCurrentIndex }}
              key={index}
            />
          ))}
          {currentIndex === 5 ? (
            <div className="see__all">You have seen all</div>
          ) : (
            ""
          )}
          {currentIndex === 5 ? (
            <Link to="/message" className="see__mutual">
              See mutual likes
            </Link>
          ) : (
            ""
          )}
        </div>
      </div>
    </div>
  );
}

export default Match;
