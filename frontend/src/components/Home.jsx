import Header from "./Header.jsx";
import Movements from "./Movements.jsx";
import Graph from "./Graph.jsx";
import "../style/Home.css";

function Home() {
  return (
    <>
      <Header />
      <div className="container">
        <div className="container-child">
          <Movements />
        </div>
        <div className="container-child">
          <Graph />
        </div>
      </div>
    </>
  );
}

export default Home;
