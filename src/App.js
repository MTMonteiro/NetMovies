import React, { useEffect, useState } from 'react';
import './App.css'
import Tmdb from './Tmdb'
import MovieRow from './components/MovieRow/MovieRow'
import FeatureMovie from './components/FeatureMovie/FeatureMovie'
import Header from './components/Header/Header'

export default () => {

    const [movieList, setMovieList] = useState([])
    const [featureData, setFeatureData] = useState(null)
    const [blackHeader, setBlackHeader] = useState(false)

    // quando a tela for carregada vai executar o código abaixo
    useEffect(() => {
        const loadAll = async () => {
            // Pegando listas de filme
            let list = await Tmdb.getHomeList();
            setMovieList(list);

            // PEgando o featureMovie
            let originals = list.filter(i=>i.slug === 'originals');
            let randomChosen = Math.floor(Math.random() * (originals[0].items.results.length -1))
            let chosen = originals[0].items.results[randomChosen]
            
            let chosenInfo = await Tmdb.getMovieInfo(chosen.id, 'tv');
            setFeatureData(chosenInfo);
        }

        loadAll();
        
    }, []);

    useEffect(() => {
        const scrollListener = () => {
            if(window.scrollY > 10){
                setBlackHeader(true)
            } else {
                setBlackHeader(false)
            }
        }
        window.addEventListener('scroll', scrollListener);
        // Remover listener ao sair da pagina
        return () => {
            window.removeEventListener('scroll', scrollListener);
        }
    }, []);

    return (
      <div className="page">
        
        <Header black={blackHeader}/>
        {console.log(featureData)}
        { featureData &&
        <FeatureMovie item={featureData} />
        }

        <section className="lists">
            {movieList.map((item, key) => (
              <MovieRow 
                key={key} 
                title={item.title} 
                items={item.items}
              />
            ))}
        </section>

        <footer>
            Matheus Monteiro Alves <span role='img' aria-label="">✱</span> <br/>
            UI inspirada na netflix <br/>
            Fonte dos dados Themoviedb.org
        </footer>
        
        { movieList.length <= 0 &&
            //featureData &&
            <div className='loading'>
                <img src="https://media.wired.com/photos/592744d3f3e2356fd800bf00/master/w_2000,c_limit/Netflix_LoadTime.gif" alt='loading' />
            </div>
        }

      </div>
    )
}
