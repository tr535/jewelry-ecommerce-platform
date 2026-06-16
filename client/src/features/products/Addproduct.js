import React, { useState, useEffect, useRef } from 'react';
import { classNames } from 'primereact/utils';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Toast } from 'primereact/toast';
import { Button } from 'primereact/button';
import { Rating } from 'primereact/rating';
import { Toolbar } from 'primereact/toolbar';
import { InputTextarea } from 'primereact/inputtextarea';
import { IconField } from 'primereact/iconfield';
import { InputIcon } from 'primereact/inputicon';
import { RadioButton } from 'primereact/radiobutton';
import { InputNumber } from 'primereact/inputnumber';
import { Dialog } from 'primereact/dialog';
import { InputText } from 'primereact/inputtext';
import { useAddproductMutation, useDeleteproductMutation, useGetallproductQuery, useUpdateproductMutation } from './productApiSlice';
import './Products.css';

const Useproducts=()=> {

    const { data: products = [], isLoading, isError } = useGetallproductQuery();
    const [funcaddproduct, { isError: isAddError, isSuccess: isAddSuccess, error: addError }] = useAddproductMutation()
    const [funcupdate, { isError: isUpdateError, isSuccess: isUpdateuccess, error: updateError }] = useUpdateproductMutation()
    const [funDelet, { isError: isdeleteerror, error: deleteerror, isSuccess: deletesaccess }] = useDeleteproductMutation()

    let emptyProduct = {
        name: '',
        image: '',
        description: '',
        category: '',
        price: 0,
        quantity: 1,
        rating: 5,
    };
    const [deleteProductDialog, setDeleteProductDialog] = useState(false);
    const [productDialog, setProductDialog] = useState(false);
    const [deleteProductsDialog, setDeleteProductsDialog] = useState(false);
    const [product, setProduct] = useState(emptyProduct);
    const [selectedProducts, setSelectedProducts] = useState(null);
    const [submitted, setSubmitted] = useState(false);
    const [globalFilter, setGlobalFilter] = useState(null);
    const toast = useRef(null);
    const dt = useRef(null);


    useEffect(() => {
        if (isAddError)
            toast.current.show({ severity: 'error', summary: 'Error', detail: addError.data.Message, life: 3000 });
        else if (isAddSuccess)
            toast.current.show({ severity: 'success', summary: 'Successful', detail: 'Product Created', life: 3000 });
    }, [isAddError, isAddSuccess])

    useEffect(() => {
        if (isUpdateError)
            toast.current.show({ severity: 'error', summary: 'Error', detail: updateError.data.Message, life: 3000 });
        else if (isUpdateuccess)
            toast.current.show({ severity: 'success', summary: 'Successful', detail: 'Product update', life: 3000 });
    }, [isUpdateuccess, isUpdateError])
    useEffect(() => {
        if (isdeleteerror)
            toast.current.show({ severity: 'error', summary: 'Error', detail: deleteerror.data.Message, life: 3000 });
        else if (deletesaccess)
            toast.current.show({ severity: 'success', summary: 'Successful', detail: 'Product deleted', life: 3000 });
    }, [isdeleteerror, deletesaccess])
    
    const formatCurrency = (value) => {
        return value.toLocaleString('en-US', { style: 'currency', currency: 'USD' });
    };
    const openNew = () => {
        setProduct(emptyProduct);
        setSubmitted(false);
        setProductDialog(true);
    };
    const hideDialog = () => {
        setSubmitted(false);
        setProductDialog(false);
    };
    const hideDeleteProductDialog = () => {
        setDeleteProductDialog(false);
    };
    const hideDeleteProductsDialog = () => {
        setDeleteProductsDialog(false);
    };
    const saveProduct = async () => {
        let _product = { ...product };
        setSubmitted(true);

        if (!_product.name || !_product.image || !_product.category || !_product.price) {
            toast.current.show({
                severity: 'warn',
                summary: 'Missing Fields',
                detail: 'Please fill in all required fields.',
                life: 3000
            });
            return;
        }

        let p = _product;
        if (product._id) {
            funcupdate(product);
        } else {
            funcaddproduct(product);
        }

        setProductDialog(false);
        setProduct(emptyProduct);
    };


    const editProduct = (product) => {
        setProduct({ ...product });
        setProductDialog(true);
    };
    const confirmDeleteProduct = (product) => {
        setProduct(product);
        setDeleteProductDialog(true);
    };
    const exportCSV = () => {
        dt.current.exportCSV();
    };

    const confirmDeleteSelected = () => {
        setDeleteProductsDialog(true);
    };

    const deleteSelectedProducts = () => {
        let _products = products.filter((val) => !selectedProducts.includes(val));

        setDeleteProductsDialog(false);
        setSelectedProducts(null);
        toast.current.show({ severity: 'success', summary: 'Successful', detail: 'Products Deleted', life: 3000 });
    };

    const onCategoryChange = (e) => {
        let _product = { ...product };

        _product['category'] = e.value;
        setProduct(_product);
    };

    const onInputChange = (e, name) => {
        const val = (e.target && e.target.value) || '';
        let _product = { ...product };

        _product[`${name}`] = val;

        setProduct(_product);
    };

    const onInputNumberChange = (e, name) => {
        const val = e.value || 0;
        let _product = { ...product };

        _product[`${name}`] = val;

        setProduct(_product);
    };


    const leftToolbarTemplate = () => {
        return (
            <div className="flex flex-wrap gap-2">
                <Button label="New" icon="pi pi-plus" severity="success" onClick={openNew} />
                <Button label="Export" icon="pi pi-upload" className="p-button-help" onClick={exportCSV} />
            </div>
        );
    };

    const rightToolbarTemplate = () => {
        return null; 
    };


    const imageBodyTemplate = (rowData) => {
        return <img src={`http://localhost:1500/product/${rowData.image}.jpg`} alt={rowData.image} className="shadow-2 border-round" style={{ width: '300px' }} />;
    };

    const priceBodyTemplate = (rowData) => {
        return formatCurrency(rowData.price);
    };

    const ratingBodyTemplate = (rowData) => {
        return <Rating value={rowData.rating} readOnly cancel={false} />;
    }

    const actionBodyTemplate = (rowData) => {
        return (
            <React.Fragment>
                <Button icon="pi pi-pencil" rounded outlined className="mr-2" onClick={() => editProduct(rowData)} />
                <Button icon="pi pi-trash" rounded outlined severity="danger" onClick={() => confirmDeleteProduct(rowData)} />
            </React.Fragment>
        );
    };

    const header = (
        <div className="flex flex-wrap gap-2 align-items-center justify-content-between">
            <h4 className="m-0">Manage Products</h4>
            <IconField iconPosition="left">
                <InputIcon className="pi pi-search" />
                <InputText type="search" onInput={(e) => setGlobalFilter(e.target.value)} placeholder="Search..." />
            </IconField>
        </div>
    );
    const productDialogFooter = (
        <React.Fragment>
            <Button label="Cancel" icon="pi pi-times" outlined onClick={hideDialog} />
            <Button label="Save" icon="pi pi-check" onClick={saveProduct} />
        </React.Fragment>
    );

    const deleteProductDialogFooter = (
        <React.Fragment>
            <Button label="No" icon="pi pi-times" outlined onClick={hideDeleteProductDialog} />
            <Button label="Yes" icon="pi pi-check" severity="danger" onClick={() => { funDelet(product._id); hideDeleteProductDialog() }} />

        </React.Fragment>
    );
    const deleteProductsDialogFooter = (
        <React.Fragment>
            <Button label="No" icon="pi pi-times" outlined onClick={hideDeleteProductsDialog} />
            <Button label="Yes" icon="pi pi-check" severity="danger" onClick={deleteSelectedProducts} />
        </React.Fragment>
    );

    return (
        <div>
            <Toast ref={toast} />
            <div className="card">
                <Toolbar className="mb-4" left={leftToolbarTemplate} right={rightToolbarTemplate}></Toolbar>

                <DataTable ref={dt} value={products} selection={selectedProducts} onSelectionChange={(e) => setSelectedProducts(e.value)}
                    dataKey="_id" paginator rows={10} rowsPerPageOptions={[5, 10, 25]}
                    paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
                    currentPageReportTemplate="Showing {first} to {last} of {totalRecords} products" globalFilter={globalFilter} header={header}>
                    <Column selectionMode="multiple" exportable={false} style={{ minWidth: 'rem' }}></Column>
                    <Column field="name" header="Name" sortable style={{ minWidth: '10rem' }}></Column>
                    <Column field="image" header="Image" body={imageBodyTemplate} style={{ minWidth: '10rem' }}></Column>
                    <Column field="price" header="Price" body={priceBodyTemplate} sortable style={{ minWidth: '10rem' }}></Column>
                    <Column field="category" header="Category" sortable style={{ minWidth: '10rem' }}></Column>
                    <Column field="rating" header="Reviews" body={ratingBodyTemplate} sortable style={{ minWidth: '10rem' }}></Column>
                    <Column body={actionBodyTemplate} exportable={false} style={{ minWidth: '10rem' }}></Column>
                </DataTable>
            </div>

            <Dialog visible={productDialog} style={{ width: '32rem' }} breakpoints={{ '960px': '75vw', '641px': '90vw' }} header="Product Details" modal className="p-fluid" footer={productDialogFooter} onHide={hideDialog}>
                {product.image && <img required style={{ height: "150px", width: "150px" }} src={product.image ? `http://localhost:1500/product/${product.image}.jpg` : '/1.jpg'}
                    alt={product.name} className="product-image block m-auto pb-3" />}
                <div className="field">
                    <label htmlFor="name" className="font-bold">
                        Name
                    </label>
                    <InputText id="name" value={product.name} onChange={(e) => onInputChange(e, 'name')} required autoFocus className={classNames({ 'p-invalid': submitted && !product.name })} />
                    {submitted && !product.name && <small className="p-error">Name is required.</small>}
                </div>
                <div className="field">
                    <label htmlFor="description" className="font-bold">
                        Description
                    </label>
                    <InputTextarea id="description" value={product.description} onChange={(e) => onInputChange(e, 'description')} required rows={3} cols={20} />
                </div>

                <div className="field">
                    <label className="mb-3 font-bold">Category</label>
                    <div className="formgrid grid">
                        <div className="field-radiobutton col-6">
                            <RadioButton inputId="category1" name="category" value="Ring" onChange={onCategoryChange} checked={product.category == "Ring"} required />
                            <label htmlFor="category1">Ring</label>
                        </div>
                        <div className="field-radiobutton col-6">
                            <RadioButton inputId="category2" name="category" value="Bracelet" onChange={onCategoryChange} checked={product.category == 'Bracelet'} />
                            <label htmlFor="category2">Bracelet</label>
                        </div>
                        <div className="field-radiobutton col-6">
                            <RadioButton inputId="category3" name="category" value="Necklace" onChange={onCategoryChange} checked={product.category == 'Necklace'} />
                            <label htmlFor="category3">Necklace</label>
                        </div>
                        <div className="field-radiobutton col-6">
                            <RadioButton inputId="category4" name="category" value="other" onChange={onCategoryChange} checked={product.category == 'other'} />
                            <label htmlFor="category4">other</label>
                        </div>
                    </div>
                </div>

                <div className="formgrid grid">
                    <div className="field col">
                        <label htmlFor="price" className="font-bold">
                            Price
                        </label>
                        <InputNumber id="price" value={product.price} onValueChange={(e) => onInputNumberChange(e, 'price')} mode="currency" currency="USD" locale="en-US" required />
                        <label htmlFor="rating" className="font-bold">
                            rating
                        </label>
                        <Rating id="rating" value={product.rating} onChange={(e) => onInputChange({ target: { value: e.value } }, 'rating')} cancel={false} />

                    </div>
                    <div className="field col">
                        <label htmlFor="quantity" className="font-bold">
                            Quantity
                        </label>
                        <InputNumber id="quantity" value={product.quantity} onValueChange={(e) => onInputNumberChange(e, 'quantity')} />
                        <label htmlFor="quantity" className="font-bold">
                            image
                        </label>
                        <InputText id="name" value={product.image} onChange={(e) => onInputChange(e, 'image')} required autoFocus className={classNames({ 'p-invalid': submitted && !product.image })} />
                        {submitted && !product.image && <small className="p-error">image is required.</small>}
                    </div>
                </div>

            </Dialog>

            <Dialog visible={deleteProductDialog} style={{ width: '32rem' }} breakpoints={{ '960px': '75vw', '641px': '90vw' }} header="Confirm" modal footer={deleteProductDialogFooter} onHide={hideDeleteProductDialog}>
                <div className="confirmation-content">
                    <i className="pi pi-exclamation-triangle mr-3" style={{ fontSize: '2rem' }} />
                    {product && (
                        <span>
                            Are you sure you want to delete <b>{product.name}</b>?
                        </span>
                    )}
                </div>
            </Dialog>

            <Dialog visible={deleteProductsDialog} style={{ width: '32rem' }} breakpoints={{ '960px': '75vw', '641px': '90vw' }} header="Confirm" modal footer={deleteProductsDialogFooter} onHide={hideDeleteProductsDialog}>
                <div className="confirmation-content">
                    <i className="pi pi-exclamation-triangle mr-3" style={{ fontSize: '2rem' }} />
                    {product && <span>Are you sure you want to delete the selected products?</span>}
                </div>
            </Dialog>
        </div>
    );
}
export default Useproducts