class loaclCache {
  setCache(key, value) {
    window.localStorage.setItem(key, JSON.stringify(value))
  }
  getCache(key) {
    const value = window.localStorage.getItem(key);
    if(value) {
      return JSON.parse(value)
    }
  }
  deleteCache(key) {
    window.localStorage.removeItem(key)
  }
  clearCache(key) {
    window.localStorage.clearCache(key)
  }
}

export default new loaclCache();