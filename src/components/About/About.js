import './About.css';
import author from '../../images/main-about.png';

const About = () => {
  return(
    <section className="about">
      <article className="about__article">
        <img className="about__avatar" src={author} alt="author avatar"/>
        <div className="about__text">
          <h2 className="about__title">About the author</h2>
          <p className="about__info about__info_type_intro">This block describes the project author. 
            Here you should indicate your name, what you do, and which development technologies you know.
          </p>
          <p className="about__info about__info_type_main">
          You can also talk about your experience with Practicum, what you learned there, and how you can help potential customers.
          </p>
        </div>
      </article>
    </section>
  );
}

export default About;