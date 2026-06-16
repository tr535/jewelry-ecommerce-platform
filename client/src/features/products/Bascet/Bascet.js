import { useDeletefrombascetMutation, useGetallbascetQuery, useUpdatequetityMutation } from "./BascetapiSlice"
import React, { useState, useEffect } from 'react';
import { Button } from 'primereact/button';
import { DataView } from 'primereact/dataview';
import { Rating } from 'primereact/rating';
import "./bascet.css"
import { classNames } from 'primereact/utils';
const Usebascet = () => {
    const { data: bascet = [], isLoading: get_isLoading, error: get_isError } = useGetallbascetQuery()

    const [funcquentity] = useUpdatequetityMutation()
    const updadateqplus = (product) => {
        const p = {
            quentity: 1,
            prudact: product._id
        }
        funcquentity(p)
    }
const updadateqmenus=(product)=>{
    const p = {
        quentity: -1,
        prudact: product._id
    }
    funcquentity(p)
}
const [deleteproduct]=useDeletefrombascetMutation()
const clickDelete=(id)=>{
    deleteproduct(id)
   
}
    const itemTemplate = (product, index) => {
        return (
            <div className="col-12" key={product.id}>
                <div className={classNames('flex flex-column xl:flex-row xl:align-items-start p-4 gap-4', { 'border-top-1 surface-border': index !== 0 })}>
                    <img className="product-image"
                        src={product.prudact.image ? `http://localhost:1500/product/${product.prudact.image}.jpg` : '/1.jpg'}
                        alt={product.prudact.name} />
                    <div className="flex flex-column sm:flex-row justify-content-between align-items-center xl:align-items-start flex-1 gap-4">
                        <div className="flex flex-column align-items-center sm:align-items-start gap-3">
                            <div className="text-2xl font-bold text-900">{product.prudact.name}</div>
                            <Rating value={product.prudact.rating} readOnly cancel={false}></Rating>
                            <div className="flex align-items-center gap-3">
                                <span className="flex align-items-center gap-2">
                                    <i className="pi pi-tag"></i>
                                    <span className="font-semibold">{product.prudact.category}</span>
                                </span>
                            </div>
                        </div>
                        {}
                        <div className="flex sm:flex-column align-items-center sm:align-items-end gap-3 sm:gap-2">
                        <Button icon="pi pi-trash" className="p-button-rounded" onClick={()=>clickDelete(product._id)}/>
                            <span className="text-2xl font-semibold">${Number(product.prudact.price)*product.quentity}</span>
                            <div className="quantity-control">
                            <span> <button onClick={() => updadateqplus(product.prudact)}>+</button></span>
                            <span className="text-2xl font-semibold">{product.quentity}</span>
                            <span> <button onClick={() => updadateqmenus(product.prudact)}>-</button></span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    };


    const listTemplate = (bascet) => {
        return (
            <div className="grid grid-nogutter">
                {bascet.map((product, index) => itemTemplate(product, index))}
            </div>
        );
    }


    return (
        <div className="card">
            <DataView value={bascet} listTemplate={listTemplate} />
        </div>
    )
}




export default Usebascet

