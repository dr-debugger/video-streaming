import "./App.css";

function App() {
  return (
    <div className="App">
      <video controls muted>
        <source src="http://localhost:8080/video" type="video/mp4" />
      </video>
    </div>
  );
}

export default App;
