import "./DataSent.css";
import { useLocation } from "react-router-dom";

function DataSent() {
  const location = useLocation();
  const isItLocationPage = location.state.isItLocationPage;

  return (
    <div className="data__sent">
      <h2 className="data__sent__title">
        The {isItLocationPage ? "location" : "album"} has been added to your{" "}
        {isItLocationPage ? "collection" : "portfolio"}
      </h2>
      <div
        className={
          isItLocationPage
            ? "data__sent__icon data__sent__icon__location"
            : "data__sent__icon data__sent__icon__photo"
        }
      ></div>
    </div>
  );
}

export default DataSent;
