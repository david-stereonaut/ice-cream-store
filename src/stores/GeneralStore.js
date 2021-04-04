import { observable, action, makeObservable } from  'mobx'


export class GeneralStore {
  constructor() {
    this.searchValue = ''
    this.snackbar = false
    this.snackbarMessage = ''
    
    makeObservable(this, {
      searchValue: observable,
      snackbar: observable,
      snackbarMessage: observable,
      setSearchValue: action,
      openSnackbar: action,
      closeSnackbar: action

    })
  }

  setSearchValue = value => {
    this.searchValue = value
  }

  openSnackbar = message => {
    this.snackbarMessage = message
    if (!this.snackbar) this.snackbar = true
  }

  closeSnackbar = () => {
    this.snackbar = false
  }

}
