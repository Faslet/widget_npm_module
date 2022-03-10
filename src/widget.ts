interface Color {
  id: string;
  name: string;
}

interface Variant {
  id: string;
  size: string;
  sku: string;
  available: boolean;
  color: string;
}

export class Widget {
  private productBrand: string;

  private productName: string;

  private productImageUrl: string;

  private addToCartSnippet: string;

  private shopPageUrl: string;

  private locale: string;

  private productIdentifier: string;

  private productTag: string;

  private colors: Color[];

  private variants: Variant[];

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

  withAddToCartSnippet(addToCartSnippet: string) {
    this.addToCartSnippet = addToCartSnippet;
    return this;
  }

  withAddToCartRedirect(urlWithVariantId: string, toReplace = '{VARIANT_ID}') {
    this.addToCartSnippet = `function(id) { 
        window.location.assign(${urlWithVariantId}.replace(${toReplace}, id));
        return Promise.resolve();
    }`;
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
}
