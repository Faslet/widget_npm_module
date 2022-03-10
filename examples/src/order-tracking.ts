import { createOrderTracking } from '@faslet/widget';

const ot = createOrderTracking('Faslet Demo')
  .withOrderNumber('Order-1')
  .withPaymentStatus('paid');

ot.addProduct(
  'product-1',
  'variant-1',
  'Jacket',
  'Red Jacket/S',
  100,
  1,
  'sku-1'
).addProduct(
  'product-1',
  'variant-2',
  'Jacket',
  'Blue Jacket/S',
  200,
  2,
  'sku-2'
);

ot.buildOrderTracking();
