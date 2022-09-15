import { createWidget } from '..';

describe('Widget', () => {
  it('generates a valid script tag', () => {
    const widget = createWidget('Faslet Demo');
    widget.injectScriptTag();

    const scriptTag = document.querySelector(
      'script#faslet-script-tag'
    ) as HTMLScriptElement;

    expect(scriptTag.src).toBe(
      'https://widget.prod.faslet.net/faslet-app.min.js'
    );

    expect(scriptTag.defer).toBeTruthy();
  });

  it('generates a valid widget tag', () => {
    const widget = createWidget('Faslet Demo')
      .withBrand('Faslet Demo Brand')
      .withProductId('product-1')
      .withProductImage('https://placekitten.com/100')
      .withProductName('Jacket')
      .withFasletProductTag('Faslet_Jacket_Male');

    widget.addColor('red', 'Magnificent Red').addColor('blue', 'Dashing Blue');

    widget
      .addVariant(
        'variant-1',
        'S',
        true,
        'sku-1',
        'red',
        11.99,
        'https://placekitten.com/100/100'
      )
      .addVariant(
        'variant-2',
        'S',
        true,
        'sku-2',
        'blue',
        12.99,
        'https://placekitten.com/100/100'
      )
      .addVariant(
        'variant-3',
        'M',
        true,
        'sku-3',
        'red',
        13.99,
        'https://placekitten.com/100/100'
      )
      .addVariant(
        'variant-4',
        'M',
        false,
        'sku-4',
        'blue',
        14.99,
        'https://placekitten.com/100/100'
      )
      .addVariant(
        'variant-5',
        'L',
        false,
        'sku-5',
        'red',
        15.99,
        'https://placekitten.com/100/100'
      )
      .addVariant(
        'variant-6',
        'L',
        false,
        'sku-6',
        'blue',
        16.99,
        'https://placekitten.com/100/100'
      );

    widget.injectScriptTag();

    const container = document.createElement('div');
    container.id = 'faslet-test-container';
    document.body.appendChild(container);

    widget.addToDom('#faslet-test-container');

    expect(container).toMatchSnapshot();
  });

  it('throws an error when shop id is missing', () => {
    expect(() => createWidget('')).toThrow();
  });

  it('throws an error when brand is missing', () => {
    const widget = createWidget('Faslet Demo')
      .withProductId('product-1')
      .withProductImage('https://placekitten.com/100')
      .withProductName('Jacket')
      .withFasletProductTag('Faslet_Jacket_Male');

    widget.addColor('red', 'Magnificent Red').addColor('blue', 'Dashing Blue');

    widget
      .addVariant(
        'variant-1',
        'S',
        true,
        'sku-1',
        'red',
        11.99,
        'https://placekitten.com/100/100'
      )
      .addVariant(
        'variant-2',
        'S',
        true,
        'sku-2',
        'blue',
        12.99,
        'https://placekitten.com/100/100'
      )
      .addVariant(
        'variant-3',
        'M',
        true,
        'sku-3',
        'red',
        13.99,
        'https://placekitten.com/100/100'
      )
      .addVariant(
        'variant-4',
        'M',
        false,
        'sku-4',
        'blue',
        14.99,
        'https://placekitten.com/100/100'
      )
      .addVariant(
        'variant-5',
        'L',
        false,
        'sku-5',
        'red',
        15.99,
        'https://placekitten.com/100/100'
      )
      .addVariant(
        'variant-6',
        'L',
        false,
        'sku-6',
        'blue',
        16.99,
        'https://placekitten.com/100/100'
      );

    widget.injectScriptTag();

    const container = document.createElement('div');
    container.id = 'faslet-test-container';
    document.body.appendChild(container);

    expect(() => widget.addToDom('#faslet-test-container')).toThrow();
  });

  it('throws an error when variants are missing', () => {
    const widget = createWidget('Faslet Demo')
      .withBrand('Faslet Demo Brand')
      .withProductId('product-1')
      .withProductImage('https://placekitten.com/100')
      .withProductName('Jacket')
      .withFasletProductTag('Faslet_Jacket_Male');

    widget.addColor('red', 'Magnificent Red').addColor('blue', 'Dashing Blue');

    widget.injectScriptTag();

    const container = document.createElement('div');
    container.id = 'faslet-test-container';
    document.body.appendChild(container);

    expect(() => widget.addToDom('#faslet-test-container')).toThrow();
  });
});
