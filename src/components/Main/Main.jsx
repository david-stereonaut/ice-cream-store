import { makeStyles } from "@material-ui/core";
import { inject, observer } from "mobx-react";
import { MainHeader } from "./MainHeader";
import { MainProducts } from "./MainProducts";
import { SearchBar } from "../SearchBar";

const useStyles = makeStyles(theme => ({
  main: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
}))

export const Main = inject()(observer((props) =>  {

  const classes = useStyles()

  return (
    <div className={classes.main}>
      <MainHeader />
      <MainProducts />
      <SearchBar />
    </div>
  )
}))
