import React, { useState, useRef } from 'react';
import { Button } from 'primereact/button';
import { InputText } from 'primereact/inputtext';
import { Toast } from 'primereact/toast';
import { Card } from 'primereact/card';
import './pay.css';

const Pay = () => {
    const [name, setName] = useState('');
    const [cardNumber, setCardNumber] = useState('');
    const toast = useRef(null);

    const handlePayment = () => {
        toast.current.show({
            severity: 'warn',
            summary: 'תשלום נדחה',
            detail: 'התשלום אינו זמין כרגע',
            life: 3000
        });
    };

    return (
        <div id="fake-checkout">
            <Toast ref={toast} />
            <Card className="checkout-card" title="תשלום">
                <div className="checkout-form">
                    <span className="p-float-label">
                        <InputText id="name" value={name} onChange={(e) => setName(e.target.value)} />
                        <label htmlFor="name">שם בעל הכרטיס</label>
                    </span>

                    <span className="p-float-label">
                        <InputText id="card" value={cardNumber} onChange={(e) => setCardNumber(e.target.value)} />
                        <label htmlFor="card">מספר כרטיס</label>
                    </span>

                    <Button label="אישור תשלום" icon="pi pi-credit-card" className="p-button-rounded p-button-success checkout-button" onClick={handlePayment} />
                </div>
            </Card>
        </div>
    );
};

export default Pay;
