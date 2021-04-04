import { makeStyles, Typography } from "@material-ui/core";
import { inject, observer } from "mobx-react";

const useStyles = makeStyles(theme => ({
  header: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    width: '60%',
    '& > *': {
      marginBottom: theme.spacing(1)
    },
    marginBottom: theme.spacing(4),
  },
}))

export const MainHeader = inject()(observer((props) =>  {

  const classes = useStyles()

  return (
      <div className={classes.header}>
        <Typography variant="h3">
          GOODSTOCK ICE CREAM.
        </Typography>
        <Typography>
          "Definitely a real ice cream shop. Founded in 1871 by Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin venenatis fermentum nibh, a semper elit scelerisque id. Aliquam nibh nisi, tincidunt bibendum nisi at, tempor mollis leo. Aliquam dictum, lacus sit amet ultricies auctor, felis purus consequat ex, in bibendum orci risus in nibh."
        </Typography>
      </div>
  )
}))
