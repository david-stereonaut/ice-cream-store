import { Button, Divider, makeStyles, Paper, Typography } from "@material-ui/core";
import { inject, observer } from "mobx-react";

const useStyles = makeStyles(theme => ({
  cartTotal: {
    display: 'flex',
    flexDirection: 'column',
    padding: theme.spacing(2),
    width: '30%',
    [theme.breakpoints.down('sm')]: {
      marginTop: theme.spacing(2),
      marginBottom: theme.spacing(2),
      width: '80vw'
    }
  },
  title: {
    marginBottom: theme.spacing(3)
  },
  total: {
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(2),
    display: 'flex',
    flexDirection: 'row',
    padding: theme.spacing(1)
  }
}))

export const CartTotal = inject('UserStore')(observer((props) =>  {

  const { UserStore } = props

  const classes = useStyles()

  return (
    <Paper className={classes.cartTotal}>
      <Typography className={classes.title} variant="h6">Total</Typography>
      <Divider />
      <div className={classes.total}>
        <Typography><b>Total</b></Typography>
        <Typography style={{marginLeft: 'auto'}}><b>{`${UserStore.getCartTotal} $`}</b></Typography>
      </div>
      <Button color="secondary" variant="contained">Proceed to Checkout</Button>
    </Paper>
  )
}))
