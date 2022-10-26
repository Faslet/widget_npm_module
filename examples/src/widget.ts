import { createWidget } from '@faslet/widget';

function myAddToCartFunction(variantId: string) {
  alert(`Adding ${variantId} to the shopping cart`);
  return Promise.resolve();
}

function onWidgetResult({ label }: { label: string }, resultType: string) {
  console.log(`Got Result ${label} from resultType ${resultType}`);
}

const widget = createWidget('Faslet Demo')
  .withBrand('Faslet Demo Brand')
  .withProductId('product-1')
  .withProductImage('https://placekitten.com/100')
  .withProductName('Jacket')
  .withAddToCart(myAddToCartFunction)
  .withOnResult(onWidgetResult);

widget.addColor('red', 'Magnificent Red').addColor('blue', 'Dashing Blue');

widget
  .addVariant(
    'variant-1',
    'S',
    true,
    'sku-1',
    'red',
    11.99,
    'https://placekitten.com/300/500'
  )
  .addVariant(
    'variant-2',
    'S',
    true,
    'sku-2',
    'blue',
    11.99,
    'https://placekitten.com/300/500'
  )
  .addVariant(
    'variant-3',
    'M',
    true,
    'sku-3',
    'red',
    11.99,
    'https://placekitten.com/300/500'
  )
  .addVariant(
    'variant-4',
    'M',
    false,
    'sku-4',
    'blue',
    11.99,
    'https://placekitten.com/300/500'
  )
  .addVariant(
    'variant-5',
    'L',
    false,
    'sku-5',
    'red',
    11.99,
    'https://placekitten.com/300/500'
  )
  .addVariant(
    'variant-6',
    'L',
    false,
    'sku-6',
    'blue',
    11.99,
    'https://placekitten.com/300/500'
  );

widget.injectScriptTag();

widget.addToDom('#faslet-container');
