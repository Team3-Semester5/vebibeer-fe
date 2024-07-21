import React from 'react';
import './PromoCard.css'; // This will be our CSS file for styling

const PromoCard = ({ voucher }) => {

    const formatDateTime = (dateTimeString) => {
        const options = {
            hour: '2-digit',
            minute: '2-digit',
            day: '2-digit',
            month: '2-digit',
            year: 'numeric',
        };
        return new Date(dateTimeString).toLocaleString('vi-VN', options);
    };
    console.log(voucher.voucher_code)

    return (
        <div className="promo-card">
            <div className="promo-info">
                <div className="promo-code">{voucher.voucher_code}</div>
                <div className="promo-details">
                    Reduce {voucher.saleUp} from {formatDateTime(voucher.startTime)} • {formatDateTime(voucher.endTime)}
                </div>
            </div>
            <div className="promo-status">
                {voucher.condition}
            </div>
        </div>
    );
};

export default PromoCard;