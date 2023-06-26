export interface Signup{
    name:string,
    passord:string,
    email:string
}
export interface Login{
    email:string,
    password:string    
}
export interface Product{
    id:number,
    name:string,
    price:number,
    category:string,
    color:string,
    image:string,
    description:string,
    quantity: undefined | number,
    productId: undefined | number
}
export interface Cart{
    id:number | undefined,
    userId:number,
    productId:number,
    name:string,
    price:number,
    category:string,
    color:string,
    image:string,
    description:string,
    quantity: undefined | number
}
export interface priceSummary{
    price: number,
    discount: number,
    tax: number,
    delivery: number,
    total: number
}