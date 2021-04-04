import { makeStyles, Typography } from "@material-ui/core";
import { inject, observer } from "mobx-react";
import { Link } from 'react-router-dom';
import { ProductImage } from "../ProductImage";

const useStyles = makeStyles(theme => ({
  mainProduct: {
    display: 'flex',
    flexDirection: 'column',
    width: 150,
    '& > *': {
      marginTop: theme.spacing()
    }
  },
  productName: {
    color: 'black',
    textDecoration: 'none',
  },
}))

export const MainProduct = inject()(observer((props) =>  {

  const { product } = props

  const classes = useStyles()

  return (
    <div className={classes.mainProduct}>
      <ProductImage link={true} product={product} width={150} height={150} />
      <div>
        <Typography className={classes.productName} component={Link} to={`/item/${product.id}`} variant="subtitle2">{product.name}</Typography>
        <Typography className={classes.productDescription} variant="body2">{product.aboutShort}</Typography>
      </div>
    </div>
  )
}))
