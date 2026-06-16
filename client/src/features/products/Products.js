import { useState } from 'react';
import { useDeleteproductMutation, useGetallproductQuery } from './productApiSlice';
import { Button } from 'primereact/button';
import { DataView, DataViewLayoutOptions } from 'primereact/dataview';
import { Rating } from 'primereact/rating';
import { classNames } from 'primereact/utils';
import { useNavigate } from 'react-router-dom';
import { useAddtobascetMutation } from './Bascet/BascetapiSlice';
import BasketDialog from '../products/Bascet/BasketDialog';
import { useSelector } from 'react-redux';
const ProductList = () => {
    const [layout, setLayout] = useState('grid');
    const navigate = useNavigate()
    const [show, setShow] = useState(false)
    const { isUserLoggedIn } = useSelector((state) => state.auth)
    const [funcaddproduct, { isError: isAddError,isLoading:isLoadingadd }] = useAddtobascetMutation()


    const addtobascet = (product) => {
        if(!isUserLoggedIn)
            return (alert("עליך להתחבר קודם"))
        const obj = {
            productid: product._id
        }
        funcaddproduct(obj)
        setShow(true)
    }

    const { data: products = [], isLoading, isError } = useGetallproductQuery();
    if (isError) return <p>error</p>
    if (isLoading) return <p>טוען...</p>;

if(isAddError)  return <p>error</p>
    if (isLoadingadd) return <p>טוען...</p>;

    // תצוגת מוצר בתצוגת רשימה (list)
    const listItem = (product, index) => {
        return (
            <div className="col-12" key={product.id}>
                <div className={classNames('flex flex-column xl:flex-row xl:align-items-start p-4 gap-4', {
                    'border-top-1 surface-border': index !== 0
                })}>
                    <img className="w-9 sm:w-16rem xl:w-10rem shadow-2 block xl:block mx-auto border-round"
                        src={product.image ? `http://localhost:1500/product/${product.image}.jpg` : '/1.jpg'}
                        alt={product.name} />
                    <div className="flex flex-column sm:flex-row justify-content-between align-items-center xl:align-items-start flex-1 gap-4">
                        <div className="flex flex-column align-items-center sm:align-items-start gap-3">
                            <div className="text-2xl font-bold text-900">{product.name}</div>
                            <Rating value={product.rating} readOnly cancel={false} />
                            <div className="flex align-items-center gap-3">
                                <span className="flex align-items-center gap-2">
                                    <i className="pi pi-tag" />
                                    <span className="font-semibold">{product.category}</span>
                                </span>
                            </div>
                        </div>
                        <div className="flex sm:flex-column align-items-center sm:align-items-end gap-3 sm:gap-2">
                            <span className="text-2xl font-semibold">${product.price}</span>
                  <Button icon="pi pi-shopping-cart" className="p-button-rounded" onClick={() => (addtobascet(product))} />
                        </div>
                    </div>
                </div>
            </div>
        );
    };

    // תצוגת מוצר בתצוגת רשת (grid)
    const gridItem = (product) => {
        return (
            <div className="col-12 sm:col-6 lg:col-12 xl:col-4 p-2" key={product._id}>
                <div className="p-4 border-1 surface-border surface-card border-round">
                    <div className="flex flex-wrap align-items-center justify-content-between gap-2">
                        <div className="flex align-items-center gap-2">
                            <i className="pi pi-tag"></i>
                            <span className="font-semibold">{product.category}</span>
                        </div>
                    </div>
                    <div className="flex flex-column align-items-center gap-3 py-5">
                        <img className="w-9 shadow-2 border-round"
                            src={product.image ? `http://localhost:1500/product/${product.image}.jpg` : '/1.jpg'}
                            alt={product.name} />
                        <div className="text-2xl font-bold">{product.name}</div>
                        <Rating value={product.rating} readOnly cancel={false} />
                    </div>
                    <div className="flex align-items-center justify-content-between">
                        <span className="text-2xl font-semibold">${product.price}</span>
                        <Button icon="pi pi-shopping-cart" className="p-button-rounded" onClick={() => (addtobascet(product))} />
                    </div>
                </div>
            </div>
        );
    };

    // פונקציה שבוחרת תצוגה מתאימה לפי layout
    const itemTemplate = (product, layout, index) => {
        if (!product) return null;
        return layout === 'list' ? listItem(product, index) : gridItem(product);
    };

    // תצוגת כל המוצרים
    const listTemplate = (products, layout) => {
        return (
            <div className="grid grid-nogutter">
                {products.map((product, index) => itemTemplate(product, layout, index))}
            </div>
        );
    };

    // const bascetnavigate = () => {
    //     navigate("/Usebascet")
    // }
    const header = () => (
        <>
            <div className="flex justify-content-start">
            </div>
            <div className="flex justify-content-end">
                <DataViewLayoutOptions layout={layout} onChange={(e) => setLayout(e.value)} />
            </div>
        </>
    );

    return (
        <div className="card">
            <DataView value={products} listTemplate={listTemplate} layout={layout} header={header()} />
            <BasketDialog
                isUserLoggedIn={true}
                visible={show}
                onHide={() => setShow(false)}
            />

        </div>

    );
}
export default ProductList