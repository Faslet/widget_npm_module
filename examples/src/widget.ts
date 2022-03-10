import { createWidget } from '@faslet/widget';

function myAddToCartFunction(variantId: string) {
  alert(`Adding ${variantId} to the shopping cart`);
  return Promise.resolve();
}

const widget = createWidget('Faslet Demo')
  .withBrand('Faslet Demo Brand')
  .withProductId('product-1')
  .withProductImage('https://placekitten.com/100')
  .withProductName('Jacket')
  .withFasletProductTag('Faslet_Jacket_Male')
  .withAddToCart(myAddToCartFunction);

widget.addColor('red', 'Magnificent Red').addColor('blue', 'Dashing Blue');

widget
  .addVariant('variant-1', 'S', true, 'sku-1', 'red')
  .addVariant('variant-2', 'S', true, 'sku-2', 'blue')
  .addVariant('variant-3', 'M', true, 'sku-3', 'red')
  .addVariant('variant-4', 'M', false, 'sku-4', 'blue')
  .addVariant('variant-5', 'L', false, 'sku-5', 'red')
  .addVariant('variant-6', 'L', false, 'sku-6', 'blue');

widget.injectScriptTag();

widget.addToDom('#faslet-container');
