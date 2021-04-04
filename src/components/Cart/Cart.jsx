import { makeStyles } from "@material-ui/core";
import { inject, observer } from "mobx-react";
import { CartItems } from "./CartItems";
import { CartTotal } from "./CartTotal";

const useStyles = makeStyles(theme => ({
  cart: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'flex-start',
    width: '95vw',
    justifyContent: 'space-around',
    marginTop: theme.spacing(1),
    [theme.breakpoints.down('sm')]: {
      flexDirection: 'column',
      alignItems: 'center',
    }
  },
}))

export const Cart = inject()(observer((props) =>  {

  const classes = useStyles()

  return (
    <div className={classes.cart}>
      <CartItems />
      <CartTotal />
    </div>
  )
}))
