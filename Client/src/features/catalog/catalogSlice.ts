import { createAsyncThunk, createEntityAdapter, createSlice } from "@reduxjs/toolkit";
import { Product, ProductParam } from "../../app/models/product";
import agent from "../../app/api/agent";
import { RootState } from "../../app/store/store";
import { PaginationMetaData } from "../../app/models/paginationMetaData";

type CatalogState = {
    productsLoaded: boolean;
    filtersLoaded: boolean;
    status: string;
    brandList: string[];
    typeList: string[];
    productParams: ProductParam;
    metadata: PaginationMetaData;
}

const productsAdapter = createEntityAdapter({
    selectId: (p: Product) => p.productId
});

function getAxiosParams(productParam: ProductParam) {

    const params = new URLSearchParams();
    params.append("pageNumber", productParam.pageNumber.toString());
    params.append("pageSize", productParam.pageSize.toString());

    if (productParam.searchTerm)               params.append("searchTerm", productParam.searchTerm);
    if (productParam.sortBy)                   params.append("sortBy", productParam.sortBy);
    if (productParam.brandList.length > 0)     params.append("brands", productParam.brandList.toString());
    if (productParam.typeList.length > 0)      params.append("types", productParam.typeList.toString());

    return params;
}

export const fetchProductsAsync = createAsyncThunk<Product[], void, {state: RootState}>(
    "catalog/fetchProductsAsync",
    async (_, thunkApi) => {
        try {
            const params = getAxiosParams(thunkApi.getState().catalog.productParams);
            const paginatedResponse = await agent.requests.get("product", params);
            thunkApi.dispatch(setPaginationMetadata(paginatedResponse.metadata))
            return paginatedResponse.data;
        } catch (error) {
            console.error(error);
            return thunkApi.rejectWithValue({error});
        }
    }
);

export const fetchSingleProductAsync = createAsyncThunk<Product, string>(
    "catalog/fetchSingleProductAsync",
    async (productId: string, thunkApi) => {
        try {
            const product = await agent.requests.get(`product/${productId}`);

            if (!product) return thunkApi.rejectWithValue({error: "No product received from API"});

            return product;
        } catch (error) {
            return thunkApi.rejectWithValue({error});
        }
    }
);

export const fetchFiltersAsync = createAsyncThunk(
    "catalog/fetchFiltersAsync",
    async (_, thunkApi) => {
        try {
            const filters = await agent.requests.get(`product/filters`);
            return filters;
        } catch (error) {
            return thunkApi.rejectWithValue({error});
        }
    }
);

function initParam(): ProductParam {
    return {
        pageNumber: 1,
        pageSize: 6,
        sortBy: "Alphabetical",
        searchTerm: "",
        brandList: [],
        typeList: []
    }
}

export const catalogSlice = createSlice({
    name: "catalog",
    initialState: productsAdapter.getInitialState<CatalogState>({
        status: "idle",
        productsLoaded: false,
        filtersLoaded: false,
        brandList: [],
        typeList: [],
        productParams: initParam(),
        metadata: { // set from api
            pageNumber: 0,
            pageSize: 0,
            totalCount: 0,
            totalPages: 0
        }
    }),
    reducers: {
        setProductParam: (state, action) => {
            state.productsLoaded = false;
            state.productParams = {...state.productParams, ...action.payload, pageNumber: 1}
        },
        setPageNumber: (state, action) => {
            state.productsLoaded = false;
            state.productParams = {...state.productParams, ...action.payload}
        },
        resetProductParam: (state) => {
            state.productsLoaded = false;
            state.productParams = initParam()
        },
        setPaginationMetadata: (state, action) => {
            state.metadata = action.payload;
        }
    },
    extraReducers: builder => {
        // fetchProductsAsync
        builder.addCase(fetchProductsAsync.pending, (state) => {
            state.status = "pending";
        });
        builder.addCase(fetchProductsAsync.fulfilled, (state, action) => {
            productsAdapter.setAll(state, action.payload)
            state.status = "idle";
            state.productsLoaded = true;
        });
        builder.addCase(fetchProductsAsync.rejected, (state, action) => {
            console.log(action.payload)
            state.status = "idle";
        });

        // fetchSingleProductAsync
        builder.addCase(fetchSingleProductAsync.pending, (state) => {
            state.status = "pending";
        });
        builder.addCase(fetchSingleProductAsync.fulfilled, (state, action) => {
            productsAdapter.upsertOne(state, action.payload)
            state.status = "idle";
        });
        builder.addCase(fetchSingleProductAsync.rejected, (state, action) => {
            console.log(action.payload)
            state.status = "idle";
        });

        // fetchFiltersAsync
        builder.addCase(fetchFiltersAsync.pending, (state) => {
            state.status = "pending";
        });
        builder.addCase(fetchFiltersAsync.fulfilled, (state, action) => {
            state.brandList = action.payload.brands;
            state.typeList = action.payload.types;
            state.status = "idle";
            state.filtersLoaded = true;
        });
        builder.addCase(fetchFiltersAsync.rejected, (state, action) => {
            console.log(action.payload)
            state.status = "idle";
        });
    }
});

export const productSelectors = productsAdapter.getSelectors((state: RootState) => state.catalog);

export const {setProductParam, resetProductParam, setPaginationMetadata, setPageNumber} = catalogSlice.actions;