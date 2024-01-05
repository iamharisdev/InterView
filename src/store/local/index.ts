import {createSlice} from '@reduxjs/toolkit';

const slice = createSlice({
  name: 'local',
  initialState: {
   
    isLogin: false,
    user:null,
    isLoading:false,
  },
  reducers: {
    
    setUserData: (state, action: any) => {
     
      state.isLogin=true
      state.user = action.payload;
    },
    setIsLoading:(state,action:any)=>{
      state.isLoading=action.payload
    }
  }
    
});

export const {
  setIsLoading,
  setUserData,
} = slice.actions;


export default slice.reducer;
