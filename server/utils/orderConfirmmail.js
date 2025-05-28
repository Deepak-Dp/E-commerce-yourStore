const orderConfirmMail = ({orderId,createdAt,totalAmt,order_status,payment_status, name}) => {
    return `
        <h1>Order Confirmation</h1>
        <p>Hi ${name},</p>
        <p>We have received your order and will be processing it shortly.</p>
        <p>Here are the details of your order:</p>

       
        <h2>Order ID: ${orderId}</h2>
     
        <h2>Order Status: ${order_status}</h2>
        <h2>Order Price: ₹ ${totalAmt}</h2>
        <h2>Payment method: ₹ ${payment_status}</h2>
        <h2>Order Date: ${createdAt}</h2>
        <p>Thank you for shopping with us.</p>
    
        <p>Cheers,</p>
        <p>yourStore Team</p>

    `
}

module.exports = orderConfirmMail;



