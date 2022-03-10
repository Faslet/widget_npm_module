import { Widget } from './widget';
import { OrderTracking } from './order-tracking';

function createWidget(shopId: string) {
  if (!shopId) {
    throw Error('Shop ID not specified');
  }

  return new Widget(shopId);
}

function createOrderTracking(shopId: string) {
  if (!shopId) {
    throw Error('Shop ID not specified');
  }

  return new OrderTracking(shopId);
}

export { createWidget, createOrderTracking, Widget, OrderTracking };
