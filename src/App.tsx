import SearchResult from "./components/SearchResult";
import Header from "./components/Header";

function App() {
  return (
    <div className="App">
      <div className="app_container">
        <Header />

        <div className="SearchResult-wrapper">
          <SearchResult />
        </div>
      </div>
    </div>
  );
}

export default App;
