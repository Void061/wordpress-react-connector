import { Link } from "react-router-dom";

const Error = () => {
  return (
    <div>
      <p>pagina non trovata all'interno di react.js</p>
      <Link to="/prova/">Torna dentro l'app</Link>
    </div>
  );
};
export default Error;
