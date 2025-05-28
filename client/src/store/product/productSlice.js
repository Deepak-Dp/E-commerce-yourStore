import {createSlice} from '@reduxjs/toolkit'



const initialState ={
    allCategory :[],
    allAdminOrder:[],
    allProduct:[],
    allCartProduct:[],
    allAddress:[],
    allOrder:[]
   
    
}

const productSlice = createSlice({
    name : "product",
    initialState,
    reducers:{
        setAllCategory :(state, action) =>{
            state.allCategory = [...action.payload]
        },
        setAllProducts : (state, action)=>{
            state.allProduct = [...action.payload]
        },
        setCartProduct : (state,action )=>{
            state.allCartProduct = [...action.payload]
        },
        setAddress : (state,action )=>{
            state.allAddress = [...action.payload]
        },
        setUserOrder : (state,action )=>{
            state.allOrder = [...action.payload]
        },
        setAdminOrder : (state,action )=>{
            state.allAdminOrder = [...action.payload]
        }
       
        
    }
})

export const {setAllCategory,setAdminOrder,setUserOrder,setAllProducts,setAddress, setCartProduct} = productSlice.actions
export default productSlice.reducer