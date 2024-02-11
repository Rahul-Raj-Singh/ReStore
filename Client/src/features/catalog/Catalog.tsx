import { useEffect } from 'react';
import ProductList from './ProductList'
import Loading from '../../app/layout/Loading';
import { useAppDispatch, useAppSelector } from '../../app/store/store';
import { fetchFiltersAsync, fetchProductsAsync, productSelectors, setPageNumber, setProductParam } from './catalogSlice';
import { FormControl, FormControlLabel, FormLabel, Grid, Paper, Radio, RadioGroup } from '@mui/material';
import ProductSearch from './ProductSearch';
import CheckboxGroup from '../../app/components/CheckboxGroup';
import MyPagination from '../../app/components/MyPagination';

const sortOptions = [
  {label: "Alphabetical", value: "Alphabetical"},
  {label: "Price - Low to High", value: "Price"},
  {label: "Price - High to Low", value: "PriceDesc"},
]

export default function Catalog() {

  const productList = useAppSelector(productSelectors.selectAll)
  const {status, brandList, typeList, productsLoaded, filtersLoaded, productParams, metadata} = useAppSelector(state => state.catalog);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (!productsLoaded) dispatch(fetchProductsAsync())
  }, [dispatch, productsLoaded]);

  useEffect(() => {
    if (!filtersLoaded) dispatch(fetchFiltersAsync())
  }, [dispatch, filtersLoaded]);

  if (status.includes("pending")) return <Loading/>
  
  return (
    <Grid container spacing={4}>
      <Grid item xs={3}>

        <Paper sx={{mb: 2}}>
          <ProductSearch/>
        </Paper>

        <Paper sx={{mb: 2, p: 2}}>
          <FormControl>
              <FormLabel>Sort By</FormLabel>
              <RadioGroup value={productParams.sortBy} onChange={e => dispatch(setProductParam({sortBy: e.target.value}))}>
                {sortOptions.map(x => <FormControlLabel key={x.value} value={x.value} control={<Radio />} label={x.label} />)}
              </RadioGroup>
          </FormControl>
        </Paper>

        <Paper sx={{mb: 2, p: 2}}>
          <FormControl>
            <FormLabel>Brands</FormLabel>
            <CheckboxGroup items={brandList} checked={productParams.brandList} 
              onChange={(checkedItems) => dispatch(setProductParam({brandList: checkedItems}))}/>
          </FormControl>
        </Paper>

        <Paper sx={{mb: 2, p: 2}}>
          <FormLabel>Types</FormLabel>
          <CheckboxGroup items={typeList} checked={productParams.typeList} 
              onChange={(checkedItems) => dispatch(setProductParam({typeList: checkedItems}))}/>
        </Paper>

      </Grid>

      <Grid item xs={9}>
        <ProductList productList={productList}/>
      </Grid>

      <Grid item xs={3}/>
      <Grid item xs={9}>
        <MyPagination metadata={metadata} onPageChange={(page: number) => dispatch(setPageNumber({pageNumber: page}))} />
      </Grid>

    </Grid>
  )
}
