import { makeStyles, Typography } from "@material-ui/core";
import { inject, observer } from "mobx-react";
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

const useStyles = makeStyles(theme => ({
  resultsHead: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    width: '100%',
    '& > *': {
      width: '25%'
    },
    marginBottom: theme.spacing(1)
  },
  orderable: {
    display: 'flex',
    flexDirection: 'row',
    marginLeft: -24,
    justifyContent: 'center',
    '& > .MuiSvgIcon-root': {
      opacity: 0
    },
    '&:hover': {
      '& > .MuiSvgIcon-root': {
        opacity: 1
      },
    },
    cursor: 'pointer'
  },
  ordered: {
    '& > .desc': {
      transform: 'rotate(180deg)'
    },
    display: 'flex',
    flexDirection: 'row',
    marginLeft: -24,
    justifyContent: 'center',
    cursor: 'pointer'
  },
  orderIcon: {
    transition: 'transform .2s linear'
  }
}))

export const SearchResultsHead = inject('UserStore')(observer((props) =>  {

  const { UserStore, desktop } = props

  const { searchOrder, searchOrderBy, setSearchOrder } = UserStore
  
  const changeOrder = newOrderBy => {
    if (newOrderBy !== searchOrderBy) { // if click is on the current orderBy - change order
      setSearchOrder({ order: 'asc', orderBy: newOrderBy })
    } else { // if click is on the other orderBy option - change orderBy
      setSearchOrder({ order: searchOrder === 'asc' ? 'desc' : 'asc', orderBy: newOrderBy })
    }
  }

  const classes = useStyles()

  return (
        <div className={classes.resultsHead} >
          <div style={{width: 100}}></div>
          <div className={searchOrderBy === 'name'
                          ? classes.ordered
                          : classes.orderable}
              onClick={() => changeOrder('name')}
          >
            <ExpandMoreIcon className={`${searchOrder} ${classes.orderIcon}`} />
            <Typography variant="body1">
              Name
            </Typography>
          </div>
          {desktop && 
            <div>
              <Typography variant="body1">
                About
              </Typography>
            </div>
          }
          <div className={`${searchOrderBy === 'price'
                            ? classes.ordered
                            : classes.orderable}`}
              onClick={() => changeOrder('price')}
          >
            <ExpandMoreIcon className={`${searchOrder} ${classes.orderIcon}`}/>
            <Typography variant="body1">
              Price
            </Typography>
          </div>
        </div>
  )
}))
