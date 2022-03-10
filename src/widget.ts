export interface Color {
  id: string;
  name: string;
}

export interface Variant {
  id: string;
  size: string;
  sku: string;
  available: boolean;
  color: string;
}

export class Widget {
  private platform = 'unknown';

  private productBrand: string;

  private productName: string;

  private productImageUrl: string;

  private readonly shopId: string;

  private shopPageUrl: string;

  private locale: string;

  private productIdentifier: string;

  private productTag: string;

  private colors: Color[] = [];

  private variants: Variant[] = [];

  private addToCart: (variantId: string) => Promise<unknown>;

  constructor(shopId: string) {
    this.shopId = shopId;
  }

  withBrand(productBrand: string) {
    this.productBrand = productBrand;
    return this;
  }

  withProductName(productName: string) {
    this.productName = productName;
    return this;
  }

  withProductImage(productImageUrl: string) {
    this.productImageUrl = productImageUrl;
    return this;
  }

  withProductId(productIdentifier: string) {
    this.productIdentifier = productIdentifier;
    return this;
  }

  withFasletProductTag(productTag: string) {
    this.productTag = productTag;
    return this;
  }

  withLocale(locale: string) {
    this.locale = locale;
    return this;
  }

  withUrl(shopPageUrl: string) {
    this.shopPageUrl = shopPageUrl;
    return this;
  }

  withAddToCart(addToCart: (variantId: string) => Promise<unknown>) {
    this.addToCart = addToCart;
    return this;
  }

  addColor(id: string, name: string) {
    this.colors.push({ id, name });
    return this;
  }

  addVariant(
    variantId: string,
    sizeLabel: string,
    inStock: boolean,
    sku: string,
    colorId: string
  ) {
    this.variants.push({
      size: sizeLabel,
      sku,
      id: variantId,
      available: inStock,
      color: colorId
    });
    return this;
  }

  // eslint-disable-next-line class-methods-use-this
  injectScriptTag() {
    const root =
      document.getElementsByTagName('script')[0] ?? document.head.lastChild;

    const faslet = document.createElement('script');
    faslet.type = 'text/javascript';
    faslet.src = 'https://widget.prod.faslet.net/faslet-app.min.js';
    faslet.defer = true;
    root.parentNode.insertBefore(faslet, root);
  }

  addToDom(parentCssSelector: string) {
    if (!this.shopId) {
      throw new Error(
        'Shop ID is missing, please construct your Widget instance with your Faslet Shop ID which you can obtain from Faslet'
      );
    }

    if (!this.productBrand) {
      throw new Error(
        'Brand is missing, please call withBrand on your Widget instance'
      );
    }

    if (!this.productIdentifier) {
      throw new Error(
        'Product Identifier is missing, please call withProductId on your Widget instance'
      );
    }

    if (!this.productName) {
      throw new Error(
        'Product Name is missing, please call withProductName on your Widget instance'
      );
    }

    if (!this.productImageUrl) {
      throw new Error(
        'Product Image Url is missing, please call withProductImage on your Widget instance'
      );
    }

    if (!this.variants) {
      throw new Error(
        'Variants are empty, please call addVariant on your Widget instance'
      );
    }

    const parent = document.querySelector(parentCssSelector);

    if (!parent) {
      throw new Error(
        `Could not find ${parentCssSelector} in the dom. Make sure you have an element that matches ${parentCssSelector}`
      );
    }

    window._faslet = {
      ...window._faslet,
      id: this.productIdentifier,
      variants: this.variants,
      colors: this.colors,
      shopUrl: this.shopPageUrl,
      addToCart: this.addToCart
    };

    const widget = document.createElement('faslet-app', { is: 'faslet-app' });
    widget.id = 'faslet-web-component';
    widget.setAttribute('platform', this.platform);
    widget.setAttribute('product-name', this.productName);
    widget.setAttribute('shop-id', this.shopId);
    widget.setAttribute('brand', this.productBrand);
    if (this.productTag) widget.setAttribute('categories', this.productTag);
    widget.setAttribute('product-img', this.productImageUrl);
    if (this.locale) widget.setAttribute('locale', this.locale);

    parent.appendChild(widget);
  }
}
