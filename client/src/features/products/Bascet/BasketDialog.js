

import React from 'react';
import { Sidebar } from 'primereact/sidebar';
import Usebascet from './Usebascet';
import './bascet.css';
import { Button } from 'primereact/button';
import { useNavigate } from 'react-router-dom';

const BasketDialog = ({ visible, onHide }) => {
    const navigate = useNavigate();

    const goToBasket = () => {
        onHide(); 
        navigate('/Bascet');
    };

    const goToCheckout = () => {
        onHide(); 
        navigate('/Pay');
    };

    return (
        <Sidebar
            visible={visible}
            position="right"
            onHide={onHide}
            className="custom-sidebar"
            header="סל הקניות שלך"
        >
            <Usebascet />

            <div className="flex justify-content-between gap-2 p-2 mt-4 border-top-1 surface-border">
                <Button 
                    label="הצגת הסל המלא"
                    icon="pi pi-eye"
                    onClick={goToBasket}
                    className="p-button-secondary w-full"
                />
                <Button
                    label="מעבר לתשלום"
                    icon="pi pi-credit-card"
                    onClick={goToCheckout}
                    className="p-button-success w-full"
                />
            </div>
        </Sidebar>
    )

};

export default BasketDialog;
