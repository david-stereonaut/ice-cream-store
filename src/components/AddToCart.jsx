import { Button, FormControl, IconButton, makeStyles, MenuItem, Select, Snackbar, Typography } from "@material-ui/core";
import { inject, observer } from "mobx-react";
import { useState } from "react";
import { quantityOptions } from "../constants";
import CloseIcon from '@material-ui/icons/Close';

const useStyles = makeStyles(theme => ({
  addToCart: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    '& > *': {
      marginTop: theme.spacing(1)
    }
  }
}))

export const AddToCart = inject('UserStore', 'GeneralStore')(observer((props) =>  {

  const { item, UserStore } = props

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

  const [quantityValue, setQuantityValue] = useState(1)

  const handleQuantityChange = (event) => {
    setQuantityValue(event.target.value)
  }

  const addToCart = (e) => {
    UserStore.addToCart(item, quantityValue)
    setSnackbar({
      open: true,
      message: `${quantityOptions[quantityValue - 1]} of ${item.name} added to cart`
    })
  }

  const classes = useStyles()

  return (
    <div className={`${classes.addToCart} add-to-cart`}>
      {item.price < 10 // checking if the item is an ice cream or the cake
      ? <>
          <Typography>{item.price * quantityValue} $/</Typography>
          <FormControl size="small" style={{width: 60}}>
            <Select
              id="quantity"
              value={quantityValue}
              onChange={handleQuantityChange}
            >                {quantityOptions.map((value, ind) => <MenuItem key={ind} value={ind + 1}>{value}</MenuItem>)}
            </Select>
          </FormControl>
        </>
      : <Typography>{item.price}$</Typography>
      }
      <Button onClick={addToCart} variant="contained" color="secondary" size="small">Add to Cart</Button>
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
    </div>
  )
}))
