import SnakeGame from "../components/SnakeGame"
import { Link } from 'react-router-dom';

function Home() {
    return (
        <div className="App">
          <SnakeGame />
          <Link to="/SnakeGame">Clic</Link>
        </div>
      );
}

export default Home