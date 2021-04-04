import { makeStyles } from "@material-ui/core";
import { inject, observer } from "mobx-react";
import { SearchBar } from "../SearchBar";
import { SearchResults } from "./SearchResults";

const useStyles = makeStyles(theme => ({
  search: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
}))

export const Search = inject('UserStore')(observer((props) =>  {

  const classes = useStyles()

  return (
    <div className={classes.search}>
      <SearchBar />
      <SearchResults />
    </div>
  )
}))
