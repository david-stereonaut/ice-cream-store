import { Card, CardMedia } from "@material-ui/core";
import { inject, observer } from "mobx-react";
import { Link } from 'react-router-dom';

export const ProductImage = inject()(observer((props) =>  {

  const { product, height, width, link } = props

  return (
      <Card component={link ? Link : 'div'} to={`/item/${product.id}`} style={{width}} elevation={0}>
        <CardMedia 
          style={{height}}
          image={product.thumbnail}
          title={product.name}
        />
      </Card>
  )
}))
