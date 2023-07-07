import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./classes/Landing.css";
import MemberCard from "./Members-cards";
import Agustín from "./landing-photos/agustin.jpg";
import Joaquín from "./landing-photos/joaquin.jpg";
import Camila from "./landing-photos/camila.jpg";
import { AiFillGithub } from "react-icons/ai";
import { FaLinkedin } from "react-icons/fa";

function Landing() {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    arrows: false
  };

  const teamMembers = [
    {
      name: "Agustin Pérez",
      photo: Agustín,
      socialMedia: [
        { name: <AiFillGithub  className="icon"/>, url: "https://github.com/Agustin3100" },
        { name: <FaLinkedin className="icon" />, url: "" }
      ]
    },
    {
      name: "Joaquín Jones",
      photo: Joaquín,
      socialMedia: [
        { name: <AiFillGithub  className="icon"/>, url: "https://github.com/WololoRC" },
        { name: <FaLinkedin className="icon" />, url: "http://www.linkedin.com/in/joaquin-jones-8bbabb281" }
      ]
    },
    {
      name: "Camila Mauro",
      photo: Camila,
      socialMedia: [
        { name: <AiFillGithub  className="icon"/>, url: "https://github.com/C-Mauro" },
        { name: <FaLinkedin className="icon" />, url: "https://www.linkedin.com/in/camila-mauro-157022" }
      ]
    }
  ];

  return (
    <div className="landing-container bg-epicblack">
      <header className="header-container text-fantasyli bg-fantasyviolet">
        <h1>Welcome to Blinder!</h1>
      </header>
      <section className="description-section">
        <div className="description-container text-epicpink bg-epicblack">
          <p>
            Connect with people based on your interests Do you like reading? Do
            you enjoy sports? Are you a fan of animals? Get ready to meet new
            people in a different way.
          </p>
        </div>
      </section>
      <div className="signup">
        <p>Sign up now and start the experience!</p>
      </div>
      <section className="features-container bg-epicpink text-white">
        <Slider {...settings}>
          {/* Slide 1 */}
          <div>
            <ul className="features">
              <li>Connections based on shared interests</li>
            </ul>
          </div>
          {/* Slide 2 */}
          <div>
            <ul className="features">
              <li>Anonymous profiles to maintain privacy</li>
            </ul>
          </div>
          {/* Slide 3 */}
          <div>
            <ul className="features">
              <li>Explore people with similar tastes and hobbies</li>
            </ul>
          </div>
          {/* Slide 4 */}
          <div>
            <ul className="features">
              <li>Secure and user-friendly messaging system</li>
            </ul>
          </div>
        </Slider>
      </section>

      <footer className="footer-container ">
        <h3 className="about bg-epicpink text-white">Team members</h3>
        <div className="team-members">
          {teamMembers.map((member, index) => (
            <div key={index}>
              <MemberCard {...member} />
            </div>
          ))}
        </div>
      </footer>
    </div>
  );
}

export default Landing;
