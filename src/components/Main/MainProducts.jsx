import { makeStyles } from "@material-ui/core";
import { inject, observer } from "mobx-react";
import { useEffect } from "react";
import { MainProduct } from "./MainProduct";

const useStyles = makeStyles(theme => ({
  mainProducts: {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    '& > *': {
      margin: theme.spacing(3)
    },
    justifyContent: 'center'

  },
}))

export const MainProducts = inject('GeneralStore', 'UserStore')(observer((props) =>  {

  const { UserStore } = props

  useEffect(() => {
    // this is where I would make the API call to get the products
  }, [])

  const classes = useStyles()

  const getRandomProducts = (products) => { // Getting 5 random products
    const allProducts = [...products]
    const random = []
    for (let i = 0; i < 5; i++) {
      random.push(allProducts.splice(Math.floor(Math.random() * allProducts.length), 1)[0])
    }
    return random
  }

  return (
    <div className={classes.mainProducts}>
      {getRandomProducts(UserStore.products).map(p => <MainProduct key={p.id} product={p} />)}
    </div>
  )
}))
