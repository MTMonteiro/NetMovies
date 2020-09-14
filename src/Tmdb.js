const API_KEY = '2b84d0737ad998d9cb167e53b4bd7b97';
const API_BASE = 'https://api.themoviedb.org/3';

const basicFetch = async (endpoint) => {
    const req = await fetch(`${API_BASE}${endpoint}language=pt-BR&api_key=${API_KEY}`);
    //, {mode: 'no-cors'}
    const json = await req.json();
    return json
}

export default {
   getHomeList: async () => {
        // Algumas chamadas terminam com & e outras com ?
        // Depende da chamada
       return [
           {
               slug: 'originals',
               title: 'Originais do Netflix',
               items: await basicFetch(`/discover/tv?with_network=213&`)
           },
           {
                slug: 'trending',
                title: 'Recomendados',
                items: await basicFetch(`/trending/all/week?`)
           },
           {
                slug: 'toprated',
                title: 'Em alta',
                items: await basicFetch(`/movie/top_rated?`)
           },
           {
                slug: 'action',
                title: 'Ação',
                items: await basicFetch(`/discover/movie?with_genres=28&`)
           },
           {
                slug: 'comedy',
                title: 'Comédia',
                items: await basicFetch(`/discover/movie?with_genres=35&`) 
           },
           {
                slug: 'horror',
                title: 'Terror',
                items: await basicFetch(`/discover/movie?with_genres=27&`) 
           },
           {
                slug: 'romance',
                title: 'Romance',
                items: await basicFetch(`/discover/movie?with_genres=10749&`) 
           },
           {
                slug: 'documentary',
                title: 'Documentários',
                items: await basicFetch(`/discover/movie?with_genres=99&`)
           }
       ]
   },

   getMovieInfo: async (movieId,type) => {
          let info = {}
          if(movieId) {
               switch(type){
                    case 'movie':
                         info = await basicFetch(`/movie/${movieId}?`)

                    break;
                    case 'tv':
                         info = await basicFetch(`/tv/${movieId}?`)
                    break;

                    default:
                         info = null
                    break
               }
          }
          return info;
   }
}