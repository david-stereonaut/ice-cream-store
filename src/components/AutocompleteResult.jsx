import { Card, CardMedia, Divider, makeStyles, Typography } from "@material-ui/core";
import { inject, observer } from "mobx-react";
import { useHistory } from "react-router";

const useStyles = makeStyles(theme => ({
  result: {
    display: 'flex',
    flexDirection: 'row',
    padding: theme.spacing(0.5),
    alignItems: 'center',
    cursor: 'pointer',
    '& > *': {
      margin: theme.spacing(0.5)
    }
  },
  thumbnail: {
    width: 75
  }
}))

export const AutocompleteResult = inject('GeneralStore', 'UserStore')(observer((props) =>  {

  const { item } = props

  const history = useHistory()

  const goToItem = () => {
    history.push(`/item/${item.id}`)
  }

  const classes = useStyles()

  return (
    <>
    <div onClick={goToItem} className={classes.result}>
      <div style={{width: 75}}>
        <Card elevation={0}>
          <CardMedia
            style={{height: 75}}
            image={item.thumbnail}
            title={item.name}
          />
        </Card>
      </div>
      <Typography>{item.name}</Typography>
      <Typography style={{marginLeft: 'auto'}}>{item.price < 10 
        ? `${item.price}$/
          0.33l`
        : `${item.price}$`}</Typography>
    </div>
    <Divider />
    </>
  )
}))
