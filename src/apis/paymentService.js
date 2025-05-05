import axiosClient from '@/apis/axiosClient';

const createPaymentUrl = async (data) => {
  const res = await axiosClient.post('/payment/create_payment_url', data);
  return res.data;
};

// Xử lý kết quả VNPAY trả về (sau redirect), query nằm ở URL
const handleVnpayReturn = async (params) => {
  const res = await axiosClient.get('/payment/vnpay_return', { params });
  return res.data;
};

// IPN: VNPAY gọi webhook này để xác nhận thanh toán (server thường dùng)
const handleVnpayIPN = async (params) => {
  const res = await axiosClient.get('/payment/vnpay_ipn', { params });
  return res.data;
};

export { createPaymentUrl, handleVnpayReturn, handleVnpayIPN };
