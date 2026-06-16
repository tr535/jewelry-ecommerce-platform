
import { useDeletefrombascetMutation, useGetallbascetQuery, useUpdatequetityMutation } from "./BascetapiSlice"
import React from 'react';
import { Button } from 'primereact/button';
import { DataView } from 'primereact/dataview';
import { Rating } from 'primereact/rating';
import { classNames } from 'primereact/utils';
import "./bascet.css"

const Usebascet = () => {
    const { data: bascet = [], isLoading: get_isLoading, error: get_isError,refetch  } = useGetallbascetQuery();
    const [funcquentity] = useUpdatequetityMutation();
    const [deleteproduct] = useDeletefrombascetMutation();

    const updadateqplus = (product) => {
        funcquentity({ quentity: 1, prudact: product._id });
    }

    const updadateqmenus = (product) => {
        funcquentity({ quentity: -1, prudact: product._id });
    }

    const clickDelete = (id) => {
        deleteproduct(id);
    }

    const itemTemplate = (product, index) => (
        <div className="col-12" key={product._id}>
            <div className={classNames('flex flex-column xl:flex-row xl:align-items-start p-4 gap-4')}>
                <img height="150px" width="150px"className="product-image"
                    src={product.prudact.image ? `http://localhost:1500/product/${product.prudact.image}.jpg` : '/1.jpg'}
                    alt={product.prudact.name} />
                <div className="flex flex-column sm:flex-row justify-content-between align-items-center xl:align-items-start flex-1 gap-4">
                    <div className="flex flex-column align-items-center sm:align-items-start gap-3">
                        <div className="text-2xl font-bold text-900">{product.prudact.name}</div>
                        <Rating value={product.prudact.rating} readOnly cancel={false}></Rating>
                        <div className="flex align-items-center gap-3">
                            <i className="pi pi-tag"></i>
                            <span className="font-semibold">{product.prudact.category}</span>
                        </div>
                    </div>
                    <div className="flex sm:flex-column align-items-center sm:align-items-end gap-3 sm:gap-2">
                        <Button icon="pi pi-trash" className="p-button-rounded p-button-danger" onClick={() => clickDelete(product._id)} />
                        <span className="text-2xl font-semibold">${Number(product.prudact.price) * product.quentity}</span>
                        <div className="quantity-control flex align-items-center gap-2">
                            <Button icon="pi pi-plus" className="p-button-sm" onClick={() => updadateqplus(product.prudact)} />
                            <span className="text-xl">{product.quentity}</span>
                            <Button icon="pi pi-minus" className="p-button-sm" onClick={() => updadateqmenus(product.prudact)} />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );

    const listTemplate = (bascet) => (
        <div className="grid grid-nogutter">
            {bascet.map((product, index) => itemTemplate(product, index))}
        </div>
    );

    if (get_isLoading) return <p>טוען...</p>;
    if (get_isError) return <p>שגיאה בטעינה</p>;

    return (
        <div id="custom-bascet" className="card">
            <DataView value={bascet} listTemplate={listTemplate} />
        </div>
    );
};

export default Usebascet;
