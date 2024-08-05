import { SearchResult, Header } from "./components";

function App() {
  return (
    <div className="App">
      <Header />

      <div className="content-wrapper">
        <SearchResult />
      </div>
    </div>
  );
}

export default App;
