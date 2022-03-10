import { createOrderTracking } from '..';

describe('Order tracking', () => {
  it('generates a valid order tracking tag', () => {
    const orderTracking = createOrderTracking('Faslet Demo');
    orderTracking.withOrderNumber('order-1').withPaymentStatus('paid');

    orderTracking
      .addProduct(
        'product-1',
        'variant-1',
        'Jacket',
        'Red Jacket/S',
        100,
        1,
        'sku-1'
      )
      .addProduct(
        'product-1',
        'variant-2',
        'Jacket',
        'Blue Jacket/S',
        200,
        2,
        'sku-2'
      );

    orderTracking.buildOrderTracking();

    expect(document.head).toMatchSnapshot();
  });

  it('throws an error when shop id is missing', () => {
    expect(() => createOrderTracking('')).toThrow();
  });

  it('throws an error when order number is missing', () => {
    const orderTracking = createOrderTracking('Faslet Demo');
    orderTracking.withPaymentStatus('paid');

    orderTracking
      .addProduct(
        'product-1',
        'variant-1',
        'Jacket',
        'Red Jacket/S',
        100,
        1,
        'sku-1'
      )
      .addProduct(
        'product-1',
        'variant-2',
        'Jacket',
        'Blue Jacket/S',
        200,
        2,
        'sku-2'
      );

    expect(() => orderTracking.buildOrderTracking()).toThrow();
  });

  it('throws an error when products are missing', () => {
    const orderTracking = createOrderTracking('Faslet Demo');
    orderTracking.withOrderNumber('order-1').withPaymentStatus('paid');

    expect(() => orderTracking.buildOrderTracking()).toThrow();
  });
});
