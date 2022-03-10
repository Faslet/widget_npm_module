export interface Product {
  sku: string;
  correlationId: string;
  title: string;
  variant_id: string;
  variant: string;
  price: number;
  quantity: number;
}

export class OrderTracking {
  private readonly shopId: string;

  private products: Product[] = [];

  private orderNumber: string;

  private paymentStatus: string;

  constructor(shopId: string) {
    this.shopId = shopId;
  }

  withOrderNumber(orderNumber) {
    this.orderNumber = orderNumber;
    return this;
  }

  withPaymentStatus(paymentStatus) {
    this.paymentStatus = paymentStatus;
    return this;
  }

  addProduct(
    productId,
    variantId,
    productName,
    variantName,
    priceTimesQuantity,
    quantity,
    sku
  ) {
    this.products.push({
      sku,
      correlationId: productId,
      title: productName,
      variant_id: variantId,
      variant: variantName,
      price: priceTimesQuantity,
      quantity
    });
    return this;
  }

  buildOrderTracking() {
    if (!this.shopId) {
      throw new Error(
        'Shop ID is missing, please construct your OrderTracking instance with your Faslet Shop ID which you can obtain from Faslet'
      );
    }

    if (!this.orderNumber) {
      throw new Error(
        'Order Number is missing, please call withOrderNumber on your OrderTracking instance'
      );
    }

    if (!this.products || !this.products.length) {
      throw new Error(
        'Products are empty, please call addProduct on your OrderTracking instance'
      );
    }

    const root =
      document.getElementsByTagName('script')[0] ?? document.head.lastChild;

    const faslet = document.createElement('script');
    faslet.type = 'text/javascript';
    faslet.id = 'faslet-order-tracking-tag';
    faslet.src = 'https://widget.prod.faslet.net/faslet-orders.js';
    if (root) {
      root.parentNode.insertBefore(faslet, root);
    } else {
      document.head.appendChild(faslet);
    }

    const gtm = document.createElement('script');
    gtm.type = 'text/javascript';
    gtm.id = 'faslet-gtm-tag';
    gtm.src = 'https://www.googletagmanager.com/gtag/js?id=G-6J8TML143D';
    gtm.defer = true;
    if (root) {
      root.parentNode.insertBefore(gtm, root);
    } else {
      document.head.appendChild(gtm);
    }

    faslet.onload = () => {
      window._faslet_orders?.configure();
      this.products.forEach((product) => {
        window._faslet_orders?.event(
          'widget_order_track',
          this.shopId,
          product
        );
      });
    };
  }
}
