import { useNavigate } from 'react-router';
import '../styles/Home.css';

const Home = () => {
    const navigate = useNavigate();
    return (
        <main className="home-main">
            <div className="home-container">
                <h1 className="home-title">Your home<br/>for help</h1>
                <button className="start-btn" onClick={()=> navigate('/projects')}>Start fundraising</button>
                <button className="start-btn" onClick={()=> navigate('/donations')}>Donate Now!</button>

            </div>
        </main>
    );
};

export default Home;