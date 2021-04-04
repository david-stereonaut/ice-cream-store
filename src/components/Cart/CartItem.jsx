import { Divider, FormControl, IconButton, makeStyles, MenuItem, Select, Snackbar, Typography } from "@material-ui/core";
import { inject, observer } from "mobx-react";
import { useState } from "react";
import { quantityOptions } from "../../constants";
import { ProductImage } from "../ProductImage";
import CloseIcon from '@material-ui/icons/Close';

const useStyles = makeStyles(theme => ({
  cartItem: {
    display: 'flex',
    flexDirection: 'row',
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(1),
    width: '100%'
  },
  itemDetails: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
    marginLeft: theme.spacing(2),
    width: '40%'
  },
  itemQuantity: {
    marginTop: 'auto',
    marginBottom: theme.spacing(0.5)
  },
   itemName: {
     marginTop: theme.spacing(0.5)
   },
   price: {
     marginLeft: 'auto',
     marginTop: 'auto',
     marginBottom: theme.spacing(1),
     marginRight: theme.spacing(3),
     [theme.breakpoints.down('sm')]: {
      marginRight: theme.spacing(1)
    }
   }
}))

export const CartItem = inject('UserStore')(observer((props) =>  {

  const { item, quantity, index, UserStore, itemRemovedSnackbar } = props

  const [snackbar, setSnackbar] = useState({
    message: '',
    open: false
  })

  const closeSnackbar = () => {
    setSnackbar({
      message: snackbar.message,
      open: false
    })
  }

  const handleQuantityChange = (event) => {
    UserStore.changeCartQuantity(event.target.value, index)
    setSnackbar({
      message: 'Item Updated',
      open: true
    })
  }

  const removeItem = () => {
    UserStore.removeFromCart(index)
    itemRemovedSnackbar(`${item.name} was removed from the cart`)
  }

  const classes = useStyles()

  return (
    <>
    <div className={classes.cartItem}>
      <ProductImage product={item} height={125} width={125} link={true} />
      <div className={classes.itemDetails}>
        <Typography>{item.name}</Typography>
        <div className={classes.itemQuantity}>
        {item.price < 10 &&
          <FormControl size="small" style={{width: 60}}>
            <Select
              id="quantity"
              value={quantity}
              onChange={handleQuantityChange}
            >                {quantityOptions.map((value, ind) => <MenuItem key={ind} value={ind + 1}>{value}</MenuItem>)}
            </Select>
          </FormControl>
        }
          <IconButton size="small" aria-label="close" color="inherit" onClick={removeItem}>
              <CloseIcon fontSize="small" />
            </IconButton>
        </div>
      </div>
      <Typography className={classes.price}><b>{quantity * item.price} $</b></Typography>
    </div>
    <Divider />
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
