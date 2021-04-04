import { makeStyles, Typography, useMediaQuery, useTheme } from "@material-ui/core";
import { inject, observer } from "mobx-react";
import { useEffect, useState } from "react";
import { useParams } from "react-router";
import { AddToCart } from "../AddToCart";
import { ProductImage } from "../ProductImage";

const useStyles = makeStyles(theme => ({
  item: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    marginTop: theme.spacing(1),
    // marginRight: 'auto',
    width: '80%',
    [theme.breakpoints.down('xs')]: {
      width: '100%',
      flexDirection: 'column',
      alignItems: 'center'
    },
    '& > *': {
      margin: theme.spacing(0.5),
      flex: 'none'
    }
  },
  itemText: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    '& > *': {
      width: '35vw',
      [theme.breakpoints.down('xs')]: {
        width: '80%',
      },
    },
    '& .add-to-cart': {
      marginTop: 'auto'
    }
  }
}))

export const Item = inject('UserStore')(observer((props) =>  {

  const { UserStore } = props

  const [ item, setItem ] = useState('Loading')

  const classes = useStyles()

  let { id } = useParams()
  
  useEffect(() => { // getting item by id
    const currentItem = UserStore.getProductById(parseInt(id))
    currentItem ? setItem(currentItem) : setItem('Item Not Found') // if no item found
  }, [id,UserStore])

  const theme = useTheme()
  const desktop = useMediaQuery(theme.breakpoints.up('sm')) // viewport media query

  return (
    typeof item === 'string'
    ?
    <div>{item}</div>
    : 
    <div className={classes.item}>
      <ProductImage product={item} link={false} height={'80vh'} width={desktop ? '40vw' : '80vw'} />
      <div className={classes.itemText}>
        <Typography variant="h6" paragraph>{item.name}</Typography>
        <Typography variant="body2" paragraph>{item.about}</Typography>
        <AddToCart item={item} />
      </div>
    </div>
  )
}))
