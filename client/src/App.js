import "./App.css";
import RecordWebCam from "./testComponents/RecordWebCam";

function App() {
  return (
    <div className="App">
      <RecordWebCam />
      {/* <video
        controls
        autoPlay
        style={{ width: "400px" }}
        src="http://localhost:8080/video"
        type="video/mp4"
      ></video> */}
    </div>
  );
}

export default App;
