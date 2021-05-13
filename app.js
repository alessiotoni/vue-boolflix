const app = new Vue({
    el: "#app",
    data: {
        moviesList: [],
        seriesTvList: [],
        globalList: [],
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
                    resp.data.results.forEach(element => {
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
            let get = axios.get("https://api.themoviedb.org/3/search/tv", query)


            get.then((resp) => {
                    const seriesTvList = resp.data.results.map((serieTv) => {
                        serieTv.title = serieTv.name
                        serieTv.original_title = serieTv.original_name
                        return serieTv
                    })
                    seriesTvList.forEach(element => {
                        this.globalList.push(element);
                    })
                    
                })
        },
        searchOnClick() {
            this.globalList = []

            switch (this.typeToSearch) {

                case ("movie"):
                    this.searchMovies()

                    break;

                case ("tv"):
                    this.moviesList = [];
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