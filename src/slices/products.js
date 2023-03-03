import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import ProductsService from "../services/ProductService";

const initialState = {
  productList: null,
};

export const createProduct = createAsyncThunk(
  "products/create",
  async ({ title, description }) => {
    const res = await ProductsService.create({ title, description });
    return res.data;
  }
);

export const retrieveProducts = createAsyncThunk(
  "products/retrieve",
  async () => {
    const res = await ProductsService.getAll();
    return res.data;
  }
);

export const updateProduct = createAsyncThunk(
  "products/update",
  async ({ id, data }) => {
    const res = await ProductsService.update(id, data);
    return res.data;
  }
);

export const deleteProduct = createAsyncThunk(
  "products/delete",
  async ({ id }) => {
    await ProductsService.remove(id);
    return { id };
  }
);

export const deleteAllProducts = createAsyncThunk(
  "products/deleteAll",
  async () => {
    const res = await ProductsService.removeAll();
    return res.data;
  }
);

export const findProductsByTitle = createAsyncThunk(
  "products/findByTitle",
  async ({ title }) => {
    const res = await ProductsService.findByTitle(title);
    return res.data;
  }
);

const ProductSlice = createSlice({
  name: "Product",
  initialState,
  extraReducers: {
    [createProduct.fulfilled]: (state, action) => {
      state.push(action.payload);
    },
    [retrieveProducts.fulfilled]: (state, action) => {
      state.productList = { ...action.payload };
    },
    [updateProduct.fulfilled]: (state, action) => {
      const index = state.findIndex(Product => Product.id === action.payload.id);
      state[index] = {
        ...state[index],
        ...action.payload,
      };
    },
    [deleteProduct.fulfilled]: (state, action) => {
      let index = state.findIndex(({ id }) => id === action.payload.id);
      state.splice(index, 1);
    },
    [deleteAllProducts.fulfilled]: (state, action) => {
      return [];
    },
    [findProductsByTitle.fulfilled]: (state, action) => {
      state.productList = { ...action.payload };
    },
  },
});

const { reducer } = ProductSlice;
export default reducer;