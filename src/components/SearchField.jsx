import { InputBase, makeStyles, Paper } from "@material-ui/core";
import { inject, observer } from "mobx-react";
import { useLayoutEffect, useRef, useState } from "react";
import { useHistory } from "react-router";
import { AutocompleteResult } from "./AutocompleteResult";

const useStyles = makeStyles(theme => ({
  input: {
    marginLeft: theme.spacing(1),
    flex: 1,
  },
  iconButton: {
    padding: 10,
  },
  autocomplete: {
    position: 'absolute',
    // bottom: ({ navbar }) => navbar ? -48 : -24,
    top: ({ autocompleteTop}) => autocompleteTop,
    zIndex: 1,
    width: ({ navbar }) => navbar ? 300 : 400,
    [theme.breakpoints.down('xs')]: {
      width: ({ navbar }) => navbar ? 300 : 250
    },
    display: 'flex',
    flexDirection: 'column',
  }

}))

export const SearchField = inject('GeneralStore', 'UserStore')(observer((props) =>  {

  const { GeneralStore, UserStore, navbar } = props

  const history = useHistory()

  const search = (e) => {
    if (e.target.value.length > 0) {
      setShowAutocomplete(true)
    }
    if (e.keyCode === 13) {
      UserStore.search(GeneralStore.searchValue)
      history.push('/search')
    }
  }

  // show autocomplete or not

  const [showAutocomplete, setShowAutocomplete] = useState(false)

  const onChange = ({ target }) => {
    if (target.value.length === 0) setShowAutocomplete(false)
    if (target.value.length > 0) {
      UserStore.search(target.value)
      setShowAutocomplete(true)
    }
    GeneralStore.setSearchValue(target.value)
  }

  const onFocus = () => {
    if (GeneralStore.searchValue.length  > 0) {
      setShowAutocomplete(true)
    }
  }

  const onBlur = () => {
    setTimeout(() => setShowAutocomplete(false), 150) // setTimeout as a workaround so the user will be able to press links
  }

  // getting input element bottom to set autocomplete top

  const [autocompleteTop, setAutocompleteTop] = useState(0)

  const inputRef = useRef(null)
  
  useLayoutEffect(() => {
    function updatePosition() {
      setAutocompleteTop(inputRef.current.getBoundingClientRect().bottom)
    }
    window.addEventListener('resize', updatePosition)
    updatePosition()
    return () => window.removeEventListener('resize', updatePosition)
  }, [])

  const classes = useStyles({ navbar, autocompleteTop })

  return (
    <>
      <InputBase
        ref={inputRef}
        onFocus={onFocus}
        onBlur={onBlur}
        onKeyDown={search}
        className={`${classes.input} search-input`}
        placeholder="Search Our Site"
        inputProps={{ 'aria-label': 'search our site' }}
        onChange={onChange}
        value={GeneralStore.searchValue}
      />
      {showAutocomplete &&
        <Paper className={classes.autocomplete}>
          {UserStore.getAutocomplete.map(item => <AutocompleteResult key={item.id} item={item} />)}
        </Paper>
      }
    </>
  )
}))
