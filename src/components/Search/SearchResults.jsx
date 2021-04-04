import { Divider, makeStyles, Paper, Slider, Typography, useMediaQuery, useTheme } from "@material-ui/core";
import { inject, observer } from "mobx-react";
import { SearchResult } from "./SearchResult";
import { SearchResultsHead } from "./SearchResultsHead";

const useStyles = makeStyles(theme => ({
  results: {
    display: 'flex',
    flexDirection: 'column',
    width: '80vw',
    padding: theme.spacing(1),
    marginBottom: theme.spacing(3)
  },
  resultsHeader: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    marginBottom: theme.spacing(1)
  },
}))

export const SearchResults = inject('UserStore')(observer((props) =>  {

  const { UserStore } = props

  const handleRangeChange = (event, newValue) => { // price range filter 
    UserStore.setSearchPriceRange(newValue)
  }

  function valuetext(value) {
    return `${value}$/0.33l`
  }

  const theme = useTheme()
  const desktop = useMediaQuery(theme.breakpoints.up('sm')) // viewport media query

  const classes = useStyles()

  return (
      <Paper className={classes.results}>
        <div className={classes.resultsHeader}>
          <Typography variant="h6">
            Search Results
          </Typography>
          <div>
            <Typography>Price Range</Typography>
            <Slider
              min={3}
              max={10}
              value={UserStore.searchPriceRange}
              onChange={handleRangeChange}
              valueLabelDisplay="auto"
              aria-labelledby="range-slider"
              getAriaValueText={valuetext}
            />
            <Typography>
              <b>{UserStore.searchPriceRange[0]}</b>$/0.33l to <b>{UserStore.searchPriceRange[1]}</b>$/0.33l
            </Typography>
          </div>
        </div>
        <SearchResultsHead desktop={desktop} />
        <Divider />
        {UserStore.getSortedResults.map(result => <SearchResult key={result.id} desktop={desktop} result={result} /> )}
      </Paper>
  )
}))
