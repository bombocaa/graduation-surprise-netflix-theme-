import { useState, useEffect } from 'react';
import { NetflixIntro } from './components/NetflixIntro';
import { Play, RotateCcw, Search, Bell } from 'lucide-react';
import './App.css';

interface Movie {
  id: number;
  title: string;
  match: string;
  image: string;
  category: string;
}

export function App() {
  const [isPlayingIntro, setIsPlayingIntro] = useState(true);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const trendingMovies: Movie[] = [
    {
      id: 1,
      title: 'Stranger Things 5',
      match: '99% Match',
      image: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=600&q=80',
      category: 'Sci-Fi Drama'
    },
    {
      id: 2,
      title: 'Cyberpunk Redline',
      match: '97% Match',
      image: 'https://images.unsplash.com/photo-1578632767115-351597cf2477?auto=format&fit=crop&w=600&q=80',
      category: 'Cyberpunk Thriller'
    },
    {
      id: 3,
      title: 'The Witcher: Blood Origin',
      match: '95% Match',
      image: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=600&q=80',
      category: 'Dark Fantasy'
    },
    {
      id: 4,
      title: 'Black Mirror: Season 7',
      match: '98% Match',
      image: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&w=600&q=80',
      category: 'Tech Dystopia'
    },
    {
      id: 5,
      title: 'Squid Game: The Challenge',
      match: '96% Match',
      image: 'https://images.unsplash.com/photo-1509198397868-475647b2a1e5?auto=format&fit=crop&w=600&q=80',
      category: 'Survival Drama'
    }
  ];

  const popularMovies: Movie[] = [
    {
      id: 6,
      title: 'Interstellar Odyssey',
      match: '98% Match',
      image: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=600&q=80',
      category: 'Space Exploration'
    },
    {
      id: 7,
      title: 'Shadow Realm',
      match: '94% Match',
      image: 'https://images.unsplash.com/photo-1534447677768-be436bb09401?auto=format&fit=crop&w=600&q=80',
      category: 'Action Mystery'
    },
    {
      id: 8,
      title: 'Neon Odyssey',
      match: '96% Match',
      image: 'https://images.unsplash.com/photo-1508739773434-c26b3d09e071?auto=format&fit=crop&w=600&q=80',
      category: 'Futuristic Action'
    },
    {
      id: 9,
      title: 'The Crown Chronicles',
      match: '92% Match',
      image: 'https://images.unsplash.com/photo-1514565131-fce0801e5785?auto=format&fit=crop&w=600&q=80',
      category: 'Historical Drama'
    }
  ];

  const handleReplayIntro = () => {
    setIsPlayingIntro(true);
  };

  return (
    <div className="netflix-app">
      {/* Netflix Intro Screen */}
      {isPlayingIntro && (
        <NetflixIntro 
          onComplete={() => setIsPlayingIntro(false)} 
          autoPlaySound={true} 
        />
      )}

      {/* Navigation Header */}
      <nav className={`netflix-nav ${isScrolled ? 'scrolled' : ''}`}>
        <div className="nav-left">
          <div className="nav-logo" onClick={handleReplayIntro} title="Replay Netflix Intro">
            <span className="logo-n-text">NETFLIX</span>
          </div>
          <ul className="nav-links">
            <li><a href="#" className="active">Home</a></li>
            <li><a href="#">TV Shows</a></li>
            <li><a href="#">Movies</a></li>
            <li><a href="#">New & Popular</a></li>
            <li><a href="#">My List</a></li>
          </ul>
        </div>

        <div className="nav-right">
          <button className="replay-intro-btn" onClick={handleReplayIntro}>
            <RotateCcw size={16} />
            <span>Replay Intro</span>
          </button>
          <Search size={20} style={{ cursor: 'pointer' }} />
          <Bell size={20} style={{ cursor: 'pointer' }} />
          <div className="profile-avatar">N</div>
        </div>
      </nav>

      {/* Hero Showcase Banner */}
      <section 
        className="hero-banner" 
        style={{ backgroundImage: `url('/hero.png')` }}
      >
        <div className="hero-overlay" />
        <div className="hero-content">
          <div className="netflix-original-tag">
            <span>N</span> Original Series
          </div>
          <h1 className="hero-title">NEON METROPOLIS</h1>
          <div className="hero-meta">
            <span className="match-score">99% Match</span>
            <span>2026</span>
            <span className="badge-hdr">4K ULTRA HD</span>
            <span className="badge-hdr">5.1 SOUND</span>
          </div>
          <p className="hero-description">
            In a high-octane cybernetic future, a rogue operative discovers a conspiracy 
            that could reshape the global neural network forever. Experience the thrilling 
            cinematic saga in immersive HDR sound.
          </p>
          <div className="hero-buttons">
            <button className="btn-play">
              <Play size={20} fill="currentColor" /> Play Now
            </button>
            <button className="btn-info" onClick={handleReplayIntro}>
              <RotateCcw size={20} /> Replay Intro
            </button>
          </div>
        </div>
      </section>

      {/* Movie Sliders Container */}
      <div className="rows-container">
        {/* Row 1: Trending Now */}
        <div className="movie-row">
          <h2 className="row-title">Trending Now</h2>
          <div className="row-cards">
            {trendingMovies.map((movie) => (
              <div 
                key={movie.id} 
                className="movie-card"
                style={{ backgroundImage: `url(${movie.image})` }}
              >
                <div className="card-overlay">
                  <h4 className="card-title">{movie.title}</h4>
                  <span className="card-tags">{movie.match} • {movie.category}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Row 2: Popular on Netflix */}
        <div className="movie-row">
          <h2 className="row-title">Popular on Netflix</h2>
          <div className="row-cards">
            {popularMovies.map((movie) => (
              <div 
                key={movie.id} 
                className="movie-card"
                style={{ backgroundImage: `url(${movie.image})` }}
              >
                <div className="card-overlay">
                  <h4 className="card-title">{movie.title}</h4>
                  <span className="card-tags">{movie.match} • {movie.category}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
