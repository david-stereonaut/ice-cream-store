import { Divider, makeStyles, Typography } from "@material-ui/core";
import { inject, observer } from "mobx-react";
import { Link } from "react-router-dom";
import { AddToCart } from "../AddToCart";
import { ProductImage } from "../ProductImage";

const useStyles = makeStyles(theme => ({
  result: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    '& > *': {
      width: '25%'
    },
    marginBottom: theme.spacing(1),
    marginTop: theme.spacing(1),
    // cursor: 'pointer'
  },
  thumbnailContainer: {
    width: 100,
  },
  thumbnailImage: {
    height: 100
  },
  addToCart: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    '& > *': {
      marginTop: theme.spacing(1)
    }
  },
  resultName: {
    color: 'black',
    textDecoration: 'none',
  }
}))

export const SearchResult = inject('UserStore')(observer((props) =>  {

  const { result, desktop } = props

  const classes = useStyles()

  return (
    <>
    <div className={classes.result}>
      <ProductImage link={true} width={125} height={125} product={result} />
      <Typography className={classes.resultName} component={Link} to={`/item/${result.id}`} variant="subtitle2">{result.name}</Typography>
      {desktop &&
        <Typography variant="body2">{result.aboutShort}</Typography>
      }
      <AddToCart item={result} />
    </div>
    <Divider />
    </>
  )
}))
