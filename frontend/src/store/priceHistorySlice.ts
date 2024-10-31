import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '@/store/index';

type historyEntry = {
  time: number;
  price: number;
};

type PriceHistoryResponse = {
  symbol: string | null;
  history: historyEntry[];
};

type ApiState = {
  loading: boolean | null;
  error: boolean;
};

type PriceHistoryState = {
  symbol: string | null;
  history: historyEntry[];
  apiState: ApiState;
  currentRequestId: string | undefined;
};

const initialState: PriceHistoryState = {
  symbol: null,
  history: [],
  apiState: {
    loading: null,
    error: false
  },
  currentRequestId: undefined
};

export const fetchPriceHistory = createAsyncThunk<
  PriceHistoryResponse,
  string,
  { state: RootState }
>(
  'stocks/fetchPriceHistory',
  async (symbolId: string, thunkAPI) => {
    const response = await fetch(`http://localhost:3100/api/stock/history/${symbolId}`, {
      signal: thunkAPI.signal
    });
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    return (await response.json()) as PriceHistoryResponse;
  }
);

const selectSymbolInfo = (state: RootState) => state.priceHistory.symbol;
const selectPriceHistory = (state: RootState) => state.priceHistory.history;
const apiState = (state: RootState) => state.priceHistory.apiState;

const priceHistorySlice = createSlice({
  name: 'priceHistory',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchPriceHistory.pending, (state, action) => {
      state.apiState.error = false;
      state.apiState.loading = true;
      state.currentRequestId = action.meta.requestId;
    });

    builder.addCase(fetchPriceHistory.fulfilled, (state, action) => {
      const { requestId } = action.meta;
      if (state.currentRequestId !== requestId) return; // Ignore if not the latest

      const { symbol, history } = action.payload;
      state.apiState.error = false;
      state.apiState.loading = false;
      state.history = history;
      state.symbol = symbol;
      state.currentRequestId = undefined; // Reset after handling
    });

    builder.addCase(fetchPriceHistory.rejected, (state, action) => {
      const { requestId } = action.meta;
      if (state.currentRequestId !== requestId) return;

      if (!action.meta.aborted) {
        state.apiState.error = true;
        state.apiState.loading = false;
      }
      state.currentRequestId = undefined; // Reset after handling
    });
  }
});

const selectors = {
  selectPriceHistory,
  selectSymbolInfo,
  apiState
};

export default priceHistorySlice;
export { selectors };
