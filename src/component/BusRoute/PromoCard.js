import React from 'react';
import './PromoCard.css'; // This will be our CSS file for styling

const PromoCard = ({voucher}) => {
    console.log(voucher.voucher_code)
    return (
        <div className="promo-card">
            <div className="promo-info">
                <div className="promo-code">{voucher.voucher_code}</div>
                <div className="promo-details">
                    Giảm {voucher.saleUp} từ {voucher.startTime} • {voucher.endTime}
                </div>
            </div>
            <div className="promo-status">
                {voucher.condition}
            </div>
        </div>
    );
};

export default PromoCard;