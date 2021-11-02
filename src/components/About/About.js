import './About.css';
import author from "../../images/main-about.png";

const About = () => {
  return(
    <section className="about">
      <img className="about__avatar" src={author} alt="author avatar"/>
      <article className="about__article">
        <h2 className="about__title">About the author</h2>
        <p className="about__info about__info_type_intro">This block describes the project author. 
          Here you should indicate your name, what you do, and which development technologies you know.
        </p>
        <p className="about__info about__info_type_main">
        You can also talk about your experience with Practicum, what you learned there, and how you can help potential customers.
        </p>
      </article>
    </section>
  );
}

export default About;