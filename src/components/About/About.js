import './About.css';
import author from '../../images/main-about.png';

const About = () => {
  return(
    <section className="about">
      <article className="about__article">
        <img className="about__avatar" src={author} alt="author avatar"/>
        <div className="about__text">
          <h2 className="about__title">About the author</h2>
          <p className="about__info about__info_type_intro">Welcome to News Explorer !
            I'm Gözde Hisarcıklılar and the developer of this project. As in the case of this 
            final project for the Practicum by Yandex curriculum, I enjoy developing apps using 
            Javacript, React, Node.js and version control with Git.
          </p>
          <p className="about__info about__info_type_main">
            Through the comprehensive projects and learning platform, Practicum by Yandex has introduced me a deeper 
            insight into efficiency and best practices. Since I like to try coming up with solutions and testing their results, 
            I'm glad to have opportunities to face new challenges in web development. 
          </p>
        </div>
      </article>
    </section>
  );
}

export default About;