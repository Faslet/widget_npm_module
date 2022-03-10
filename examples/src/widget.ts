import { createWidget } from '@faslet/widget';

function myAddToCartFunction(variantId: string) {
  alert(`Adding ${variantId} to the shopping cart`);
  return Promise.resolve();
}

const widget = createWidget('Faslet Demo')
  .withBrand('Faslet Demo')
  .withProductId('id123')
  .withProductImage('https://placekitten.com/100')
  .withProductName('Jacket')
  .withFasletProductTag('Faslet_Jacket_Male')
  .withAddToCart(myAddToCartFunction);

widget.addColor('red', 'Magnificent Red').addColor('blue', 'Dashing Blue');

widget
  .addVariant('var_1', 'S', true, 'sku_1', 'red')
  .addVariant('var_2', 'S', true, 'sku_2', 'blue')
  .addVariant('var_3', 'M', true, 'sku_3', 'red')
  .addVariant('var_4', 'M', false, 'sku_4', 'blue')
  .addVariant('var_5', 'L', false, 'sku_5', 'red')
  .addVariant('var_6', 'L', false, 'sku_6', 'blue');

widget.injectScriptTag();

widget.addToDom('#faslet-container');
