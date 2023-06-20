import SearchBar from '../components/SearchBar';
import Navbar from '../components/header/Navbar';

function Home() {

  return (
    <div>
      <div>
        <Navbar />
      </div>
      <div className="container" >
        <div>
          <SearchBar />
        </div>
      </div>
    </div>
  );
}

export default Home;

