
import "./home.scss";
import { TopBox } from "../../components/topBox/TopBox";
import { Box4 } from "../../components/topBox/box4";
import { Box2 } from "../../components/topBox/box2";
import { Box5 } from "../../components/topBox/box5";
import { Box3 } from "../../components/topBox/box3";

const Home = () => {
  return (
    <div className="home">
      <div className="box box1"><TopBox/></div>
      <div className="box box2"><Box2/></div>
      <div className="box box3"><Box3/></div>
      <div className="box box4"><Box4/></div>
      <div className="box box5"><Box5/></div>
      <div className="box box6">box 6</div>

    </div>
  );
};

export default Home;
