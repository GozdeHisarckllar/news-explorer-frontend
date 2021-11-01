import { useEffect } from "react";

const Main = ({ onRenderHome }) => {
  useEffect(() => {
    onRenderHome(true);
  });

  return(
    <p>gd</p>
  );
}

export default Main;