import { IconButton, makeStyles, Paper } from "@material-ui/core";
import { inject, observer } from "mobx-react";
import SearchIcon from '@material-ui/icons/Search';
import { SearchField } from "./SearchField";
import { useHistory } from "react-router"; 

const useStyles = makeStyles(theme => ({
  mainSearch: {
    padding: '2px 4px',
    display: 'flex',
    alignItems: 'center',
    borderRadius: 20,
    width: 400,
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(4),
    [theme.breakpoints.down('xs')]: {
      width: 250
    }
  },
  iconButton: {
    padding: 10,
  },

}))

export const SearchBar = inject('GeneralStore', 'UserStore')(observer((props) =>  {

  const { GeneralStore, UserStore } = props

  const history = useHistory()

  const search = e => {
    e.preventDefault()
    UserStore.search(GeneralStore.searchValue)
    history.push('/search')
    
  }

  const classes = useStyles()

  return (
    <>
    <Paper onSubmit={search} className={classes.mainSearch}>
      <SearchField navbar={false} />
      <IconButton type="submit" onClick={search} className={classes.iconButton} aria-label="search">
        <SearchIcon />
      </IconButton>
    </Paper>
    </>
  )
}))
