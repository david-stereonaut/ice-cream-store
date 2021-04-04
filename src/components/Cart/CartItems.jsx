import { Divider, IconButton, makeStyles, Paper, Snackbar, Typography } from "@material-ui/core";
import { inject, observer } from "mobx-react";
import { useState } from "react";
import { CartItem } from "./CartItem";
import CloseIcon from '@material-ui/icons/Close';

const useStyles = makeStyles(theme => ({
  cartItems: {
    display: 'flex',
    flexDirection: 'column',
    padding: theme.spacing(2),
    width: '60%',
    [theme.breakpoints.down('sm')]: {
      width: '80vw'
    }
  },
  title: {
    marginBottom: theme.spacing(3)
  }
}))

export const CartItems = inject('UserStore')(observer((props) =>  {

  const { UserStore } = props

  // "Item Deleted" snackbar

  const [snackbar, setSnackbar] = useState({
    message: '',
    open: false
  })

  const closeSnackbar = (e, reason) => {
    if (reason === "clickaway") return
    setSnackbar({
      message: snackbar.message,
      open: false
    })
  }

  const openSnackbar = (message) => {
    setSnackbar({
      message: message,
      open: true
    })
  }

  const classes = useStyles()

  return (
    <>
      <Paper className={classes.cartItems}>
        <Typography className={classes.title} variant="h6">Your Bag</Typography>
        <Divider />
        {UserStore.cart.map((cartItem, ind) => <CartItem itemRemovedSnackbar={openSnackbar} item={cartItem.item} quantity={cartItem.quantity} index={ind} key={ind} />)}
      </Paper>
      <Snackbar
        open={snackbar.open}
        autoHideDuration={3000}
        onClose={closeSnackbar}
        message={snackbar.message}
        action={
          <>
            <IconButton size="small" aria-label="close" color="inherit" onClick={closeSnackbar}>
              <CloseIcon fontSize="small" />
            </IconButton>
          </>
        }
      />
    </>
  )
}))
