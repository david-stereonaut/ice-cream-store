import { AppBar, ClickAwayListener, IconButton, makeStyles, Paper, Slide, Toolbar, useScrollTrigger } from "@material-ui/core";
import { inject, observer } from "mobx-react";
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import SearchIcon from '@material-ui/icons/Search';
import ForwardIcon from '@material-ui/icons/Forward';
import HomeIcon from '@material-ui/icons/Home';
import { useState } from "react";
import { SearchField } from "./SearchField";
import { useHistory, useLocation } from "react-router";

const useStyles = makeStyles(() => ({
  navbar: {
    backgroundColor: '#FAF3E0',
  },
  toolbar: {
    display: 'flex',
    flexDirection: 'row-reverse',
    '& > .search-open': {
      width: 300,
      borderRadius: 20,
    },
  },
  searchBar: {
    width: 48,
    borderRadius: '50%' ,
    backgroundColor: '#FBD7DB',
    transition: 'width 0.5s ease, border-radius 0.5s ease',
    display: 'flex',
    flexDirection: 'row-reverse',
    alignItems: 'center',
    '& > .search-input': {
      marginLeft: 15
    }
  }
}))

export const Navbar = inject('GeneralStore', 'UserStore')(observer((props) =>  {

  const { GeneralStore, UserStore } = props

  const [openSearch, setOpenSearch] = useState(false) // trigger for navbar search animation

  const [showInput, setShowInput] = useState(false) // trigger for navbar search animation

  const location = useLocation()

  const history = useHistory()

  // triggers for navbar slide away and shadow
  const slideTrigger = useScrollTrigger()
  const shadowTrigger = useScrollTrigger({
    disableHysteresis: true,
    threshold: 0,
  })

  const onAnimationStart = () => {
    if (!openSearch) setShowInput(false)
  }
  const onAnimationEnd = () => {
    if (openSearch) setShowInput(true)
  }
  
  const search = () => {
    if (!openSearch) { // if searchbar is closed - open it
      setOpenSearch(!openSearch)
      return
    }
    if (GeneralStore.searchValue) { // if searchbar is open and there is a value - search and go to SERP
      UserStore.search(GeneralStore.searchValue)
      history.push('/search')
      return
    }
    setOpenSearch(!openSearch) // if searchbar is open and there is no value - close it
  }
  
  const classes = useStyles({ openSearch })
  
  return (
    <>
    <Slide appear={false} direction="down" in={!slideTrigger}>
      <AppBar className={classes.navbar} elevation= {shadowTrigger ? 3 : 0}>
        <Toolbar className={classes.toolbar}>
          <IconButton onClick={() => history.push('/cart')}>
            <ShoppingCartIcon color="primary" />
          </IconButton>
          <ClickAwayListener onClickAway={() => setOpenSearch(false)}>
            <Paper onAnimationEnd={onAnimationEnd} onAnimationStart={onAnimationStart} className={`${classes.searchBar} ${openSearch ? 'search-open' : ''}`} elevation={0}>
              <IconButton onClick={search}>
                <SearchIcon color="primary" />
              </IconButton>
              {showInput && <SearchField navbar={true} />}
            </Paper>
          </ClickAwayListener>
          {location.pathname !== '/home' &&
            <IconButton onClick={() => history.push('/home')} style={{marginRight: 'auto'}}>
              <HomeIcon color="primary" />
            </IconButton>
          }
          {(location.pathname.slice(1, 5) === 'item' || location.pathname.slice(1, 5) === 'cart') &&
            <IconButton onClick={() => history.goBack()} style={{}}>
              <ForwardIcon style={{transform: 'rotate(180deg)'}} color="primary" />
            </IconButton>
          }
        </Toolbar>
      </AppBar>
    </Slide>
    </>
  )
}))
