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
                        movie.type = "movie"
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
        },
        getCountrysFlag(film) {
            if (film.original_language == 'en') {
                return 'flag-icon-us'
            } else {
                return 'flag-icon-' + film.original_language
            }



        }
    },
    mounted() {
        // this.typeToSearch = "All"
    },
})