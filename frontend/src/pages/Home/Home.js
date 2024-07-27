import React from "react";
import { RiNetflixLine, RiProductHuntLine } from "react-icons/ri";
import { Link } from "react-router-dom";
import "./Home.scss";
import heroImg from "../../assets/inv-img.png";
import homeVideo from "../../assets/HomeScreenVideo.mp4";
import imcLogo from "../../assets/indore_municipal.png"
import { ShowOnLogin, ShowOnLogout } from "../../components/protect/HiddenLink";

const Home = () => {
  return (
    <div className="home">
      <video id="background-video" lopp autoPlay muted>
        <source src={homeVideo} type="video/mp4" />
      </video>
      <nav className="container">
        <div className="nav-bar">
          <div className="logo">
            <img src={imcLogo}></img>
          </div>
          <div className="t-b">
            <div className="logo-texts">
              <div className="initiative">
                <h2>STOCK PILE INDORE</h2><br></br>
                <h4 className="invent-text">Inventory Management System</h4>
              </div>
            </div>

            <ul className="home-links">
              <ShowOnLogout>
                <li>
                  <button className="--btn --btn-primary">
                    <Link to="/login">Login</Link>
                  </button>
                </li>
              </ShowOnLogout>
              <ShowOnLogin>
                <li>
                  <button className="--btn --btn-primary">
                    <Link to="/dashboard">Dashboard</Link>
                  </button>
                </li>
              </ShowOnLogin>
            </ul>
          </div>
        </div>
      </nav>
      {/* HERO SECTION */}
      <section className="container hero">
        <div className="hero-text">
          <p>
            The Indore Municipal Corporation Inventory Management System streamlines resource tracking and allocation, reduces costs, improves efficiency,
            and provides real-time insights for informed decision-making, ensuring optimal municipal operations and sustainability.
          </p>
          <div className="hero-buttons">
          </div>
          <div className="--flex-start">
            <NumberText num="500+" text="Partners" />
          </div>
        </div>

        <div className="hero-image">
          <img src={heroImg} alt="Inventory" />
        </div>
      </section>
    </div>
  );
};

const NumberText = ({ num, text }) => {
  return (
    <div className="--mr">
      <h3 className="--color-black">{num}</h3>
      <p className="--color-black">{text}</p>
    </div>
  );
};

export default Home;
