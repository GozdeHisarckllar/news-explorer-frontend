import { useEffect } from "react";
import './Main.css';
import SearchForm from "../SearchForm/SearchForm";
import About from "../About/About";

const Main = ({ onRenderHome }) => {
  useEffect(() => {
    onRenderHome(true);
  });

  return(
    <main className="content">
      <section className="search">
        <h1 className="search__heading">What's going on in the world?</h1>
        <p className="search__info">Find the latest news on any topic and save them in your personal account.</p>
        <SearchForm/>
      </section>
      <About/>
    </main>
  );
}

export default Main;