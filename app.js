const app = new Vue({
    el: "#app",
    data: {
        globalList: [],
        moviesList: [],
        seriesTvList: [],
        textToSearch: "",
        typesList: [
            "movie", "tv",
        ],
        typeToSearch: "",
        showSearchBar: false,
        showSearchButton: false,
        stars: ['1', '2', '3', '4', '5'],
        genresMovies: [],
        genresSeriesTv: [],
        showDropDownFilm: false,
        showDropDownSeriesTv: false,
        filterMovie: "",
        filterSeriesTv: "",
    },
    computed: {

    },
    methods: {
        getGenresMovies(){
            const query = {
                params: {
                    api_key: "7dc4ed377361dc12e209ca035023ec50",
                    language: "it-IT",
                }
            }
            axios.get("https://api.themoviedb.org/3/genre/movie/list", query)
            .then((resp) => {
                resp.data.genres.forEach((genre) => {
                    this.genresMovies.push(genre)

                })
            })
        },
        getGenresSeriesTv(){
            const query = {
                params: {
                    api_key: "7dc4ed377361dc12e209ca035023ec50",
                    language: "it-IT",
                }
            }
            axios.get("https://api.themoviedb.org/3/genre/tv/list", query)
            .then((resp) => {
                resp.data.genres.forEach((genre) => {
                    this.genresSeriesTv.push(genre)

                })
            })
        },
        reset(){
            this.globalList = []
            this.moviesList = []
            this.seriesTvList = []
        },
        homeClick(){
            this.reset()

            this.defaultMovies()
            this.defaultSeriesTv
        },
        seriesTvClick(){
            this.reset()
            this.defaultSeriesTv()
        },
        moviesClick(){
            this.reset()
            this.defaultMovies()
        },
        defaultMovies(){
            const query = {
                params: {
                    api_key: "7dc4ed377361dc12e209ca035023ec50",
                    // query: this.textToSearch,
                    language: "it-IT",
                }
            }
            axios.get("https://api.themoviedb.org/3/discover/movie", query)
                .then((resp) => {
                    const moviesList = resp.data.results.map((movie) => {

                        movie.type = "movie";
                        movie.img = movie.poster_path

                        return movie
                    })
                    moviesList.forEach((element) => {

                        this.moviesList.push(element);
                        this.globalList.push(element);
                    });
                })
        },
        defaultSeriesTv(){
            const query = {
                params: {
                    api_key: "7dc4ed377361dc12e209ca035023ec50",
                    // query: this.textToSearch,
                    language: "it-IT",
                }
            }
            axios.get("https://api.themoviedb.org/3/discover/tv", query)
                .then((resp) => {
                    const moviesList = resp.data.results.map((movie) => {

                        movie.type = "seriesTv";
                        movie.img = movie.poster_path

                        return movie
                    })
                    moviesList.forEach((element) => {

                        this.moviesList.push(element);
                        this.globalList.push(element);
                    });
                })
        },
        searchMovies() {
            const query = {
                params: {
                    api_key: "7dc4ed377361dc12e209ca035023ec50",
                    query: this.textToSearch,
                    language: "it-IT",
                }
            }
            axios.get("https://api.themoviedb.org/3/search/movie", query)
                .then((resp) => {
                    const moviesList = resp.data.results.map((movie) => {

                        movie.type = "movie";
                        movie.img = movie.poster_path

                        return movie
                    })
                    moviesList.forEach((element) => {

                        this.moviesList.push(element);
                        this.globalList.push(element);
                    });
                })
        },
        searchSeriesTv() {
            const query = {
                params: {
                    api_key: "7dc4ed377361dc12e209ca035023ec50",
                    query: this.textToSearch,
                    language: "it-IT",
                }
            }
            axios.get("https://api.themoviedb.org/3/search/tv", query)
                .then((resp) => {
                    const seriesTvList = resp.data.results.map((serieTv) => {

                        serieTv.title = serieTv.name
                        serieTv.original_title = serieTv.original_name
                        serieTv.img = serieTv.poster_path
                        serieTv.type = "seriesTv"

                        return serieTv
                    })
                    seriesTvList.forEach((element) => {

                        this.seriesTvList.push(element);
                        this.globalList.push(element);
                    })
                })
        },
        searchOnClick() {

            if (this.textToSearch) {
                this.reset()

                switch (this.typeToSearch) {

                    case ("movie"):
                        this.searchMovies()
                        break;

                    case ("tv"):
                        this.searchSeriesTv()
                        break;

                    case (""):
                        this.searchMovies()
                        this.searchSeriesTv()
                        break;
                }

                this.textToSearch = ""

                this.clickShowSearchBar()

            }


        },
        getCountrysFlag(film) {
            switch (film.original_language) {
                case ('en'):
                    return 'flag-icon-us'
                case ('usfr'):
                    return 'flag-icon-us'
                case ('ussv'):
                    return 'flag-icon-us'
                case ('ja'):
                    return 'flag-icon-jp'
                default:
                    return 'flag-icon-us' + film.original_language

            }
        },
        getImg(film) {
            return "http://image.tmdb.org/t/p/w500" + film.img
        },
        voteAverageStars(film, index) {
            const voteAverage = Math.ceil(film.vote_average / 2)
            if ((index + 1) <= voteAverage) {
                return true
            }
            return false
        },
        clickShowSearchBar() {
            if (this.showSearchBar === false) {
                this.showSearchBar = true
                this.showSearchButton = true
                setTimeout(() => {
                    document.querySelector('.box input').focus()
                }, 1000)
            } else {
                this.showSearchButton = false
                setTimeout(() => {
                    this.showSearchBar = false
                }, 1000)
            }

        },
        showDDF(){
            this.showDropDownFilm = !this.showDropDownFilm
            this.showDropDownSeriesTv = false

        },
        showDDST(){
            this.showDropDownSeriesTv = !this.showDropDownSeriesTv
            this.showDropDownFilm = false

        },
        getFilterMovies(genre){
            
        }
    },
    mounted() {
        this.defaultMovies()
        this.defaultSeriesTv()
        this.getGenresMovies()
        this.getGenresSeriesTv()
    },
})