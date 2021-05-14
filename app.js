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
        stars: ['1', '2', '3', '4', '5']
    },
    computed: {

    },
    methods: {
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

            this.globalList = []
            this.seriesTvList = []
            this.moviesList = []

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
            // if (film.original_language == 'en') {
            // } else {
            //     return 'flag-icon-' + film.original_language
            // }
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
            this.showSearchBar = !this.showSearchBar
        }
    },
    mounted() {

    },
})