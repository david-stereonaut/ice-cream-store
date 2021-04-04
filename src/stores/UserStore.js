import { observable, action, makeObservable, computed } from  'mobx';
import { dummyData } from './dummyData';

export class UserStore {
  constructor() {
    this.products = [...dummyData]
    this.searchResults = []
    this.searchPriceRange = [3, 10]
    this.searchOrder = 'asc'
    this.searchOrderBy = 'price'
    this.cart = []
    
    makeObservable(this, {
      products: observable,
      searchResults: observable,
      searchPriceRange: observable,
      searchOrder: observable,
      searchOrderBy: observable,
      cart: observable,
      setSearchPriceRange: action,
      setSearchOrder: action,
      addToCart: action,
      changeCartQuantity: action,
      removeFromCart: action,
      getSortedResults: computed,
      getCartTotal: computed
    })
  }

  // string search in product names or abouts
  search = query => {
    const reg = new RegExp(`.*${query}.*`, 'i')
    const searchResults = []
    this.products.forEach((product) => {
      if (reg.test(product.name) ||
          reg.test(product.about) ||
          reg.test(product.aboutShort))
      {
        searchResults.push({ ...product })
      }
    })
    this.searchResults = searchResults
  }

  // filter and sorting
  setSearchPriceRange = range => {
    this.searchPriceRange = range
  }

  setSearchOrder = order => {
    this.searchOrder = order.order
    this.searchOrderBy = order.orderBy
  }

  get getSortedResults() {
    return [...this.searchResults].filter(result => result.price >= this.searchPriceRange[0] && result.price <= this.searchPriceRange[1] )
                        .sort((a, b) => {
                          if (this.searchOrder === 'asc') return a[this.searchOrderBy] > b[this.searchOrderBy] ? 1 : -1
                          if (this.searchOrder === 'desc') return a[this.searchOrderBy] > b[this.searchOrderBy] ? -1 : 1
                          return 0
                        })
  }

  getProductById = id => {
    return this.products.find(product => product.id === id)
  }

  addToCart = (item, quantity) => {
    this.cart.push({ item, quantity })
  }

  // change item quantity in cart
  changeCartQuantity = (newQuantity, index) => {
    console.log(this.cart[index])
    this.cart[index].quantity = newQuantity
    console.log(this.cart[index])
  }

  removeFromCart = (index) => {
    this.cart.splice(index, 1)
  }

  get getCartTotal() {
    return this.cart.reduce((accumulator, currentValue) => {
      return accumulator + (currentValue.quantity * currentValue.item.price)
    }, 0)
  }

  get getAutocomplete() {
    return [...this.searchResults].splice(0, 3)
  }

}
