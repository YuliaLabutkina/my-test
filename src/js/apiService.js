const baseUrl = 'https://pixabay.com/api/';
const token = '18667081-1f708d4293c59a8f1b4f35978';

class ApiService {
    constructor() {
      this.searchQuery  = '';
      this.page = 1;
      this.totalPages = 0;
    }
  
    async fetchImg() {
      const result = await fetch(`${baseUrl}?image_type=photo&orientation=horizontal&q=${this.searchQuery }&page=${this.page}&per_page=20&key=${token}`);
      return result.json();
    }
  
    incrementPage() {
      this.page += 1;
    }
  
    resetPage() {
      this.page = 1;
    }

    calculatePages(amount) {
      this.totalPages = amount / 20;
    }
  
    get query() {
      return this.searchQuery;
    }
  
    set query(newSearchQuery) {
      this.searchQuery = newSearchQuery;
    }

    get pages() {
      return this.totalPages;
    }

    get currentPage() {
      return this.page;
    }
  }

  export default ApiService;