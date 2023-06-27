import SearchBar from '../components/SearchBar';
import Navbar from '../components/header/Navbar';
import '../styles/Home.css'

function Home() {

  return (
    <div>
      <div className="container" >
      <div>
        <Navbar />
      </div>
      
        <div>
          <h1 className='home-title'>Trouve le tatoueur qui te convient</h1>
        </div>
        <div>
          <SearchBar />
        </div>
      </div>
    </div>
  );
}

export default Home;

