import "./RootView.css";
import ReactLoading from "react-loading";

function LoadingScreen() {
  return (
    <div className="grid-Loading">
      <ReactLoading
        type={"bubbles"}
        color={"#F58840"}
        height={150}
        width={150}
      />
    </div>
  );
}

export default LoadingScreen;
