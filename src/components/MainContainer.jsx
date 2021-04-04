import { Route, Redirect, Switch } from "react-router-dom";
import { inject, observer } from "mobx-react";
import { Main } from "./Main/Main";
import { Search } from "./Search/Search";
import { Item } from "./Item/Item";
import { makeStyles } from "@material-ui/core";
import { Cart } from "./Cart/Cart";

const useStyles = makeStyles(theme => ({
  mainContainer: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    marginTop: 64
  }
}))

export const MainContainer = inject()(observer((props) => {

  const classes = useStyles()

  return (
    <div className={classes.mainContainer}>
      <Switch>
        <Route exact path="/home" render={() => <Main />}/>
        <Route exact path="/search" render={() => <Search />}/>
        <Route exact path="/item/:id" render={() => <Item />}/>
        <Route exact path="/cart" render={() => <Cart />}/>
        <Redirect to="/home" />
      </Switch>
    </div>
  )
}))