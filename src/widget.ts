export interface Color {
  id: string
  name: string
}

export interface Variant {
  id: string
  size: string
  sku: string
  available: boolean
  color: string
  price?: number
  imageUrl?: string
}

export class Widget {
  private platform = 'unknown'

  private productBrand: string

  private productName: string

  private productImageUrl: string

  private readonly shopId: string

  private shopPageUrl: string

  private locale: string | undefined

  private productIdentifier: string

  private productTag: string | undefined

  private colors: Color[] = []

  private variants: Variant[] = []

  private addToCart: (variantId: string) => Promise<unknown>

  private disableProductRecs = false

  private userId: string | undefined

  private onResult: ({ label }: { label: string }, resultType: 'auto' | 'result-screen') => unknown

  private onButtonShow: () => unknown

  private onButtonHidden: () => unknown

  private onDataChanged: (data: {
    userId: string
    widgetVersion?: string
    seenExperiments?: string
    experimentVariants?: string
    profile?: unknown
  }) => unknown

  /**
   * Constructor
   * @param shopId - your unique Faslet Shop ID. This can be obtained in the Faslet Partner Portal
   */
  constructor(shopId: string) {
    this.shopId = shopId
  }

  /**
   * Set the brand for this product
   * @param productBrand - the name of the brand
   */
  withBrand(productBrand: string) {
    this.productBrand = productBrand
    return this
  }

  /**
   * Set the name of this product
   * @param productName - the name of this product
   */
  withProductName(productName: string) {
    this.productName = productName
    return this
  }

  /**
   * Set the image for this product
   * @param productImageUrl - the url of the image for this product
   */
  withProductImage(productImageUrl: string) {
    this.productImageUrl = productImageUrl
    return this
  }

  /**
   * Set the Product Identifier. This is required and used by Faslet to correlate products through orders and returns. Note that this should not be a variant identifier
   * @param productIdentifier - the product identifier.
   */
  withProductId(productIdentifier: string) {
    this.productIdentifier = productIdentifier
    return this
  }

  /**
   * Set the Product Tag. This was previously used before Product Identifiers to handle sizing. This is no longer required.
   * @deprecated
   * @param productTag - the product tag.
   */
  withFasletProductTag(productTag: string) {
    this.productTag = productTag
    return this
  }

  /**
   * Set the locale.
   * @param locale - a 2 character iso language code.
   */
  withLocale(locale: string) {
    this.locale = locale
    return this
  }

  /**
   * Disable Product Recommendations explicitly. Useful for App development.
   */
  disableProductRecommendations() {
    this.disableProductRecs = true
    return this
  }

  withUrl(shopPageUrl: string) {
    this.shopPageUrl = shopPageUrl
    return this
  }

  withAddToCart(addToCart: (variantId: string) => Promise<unknown>) {
    this.addToCart = addToCart
    return this
  }

  withOnResult(onResult: ({ label }: { label: string }, resultType: 'auto' | 'result-screen') => unknown) {
    this.onResult = onResult
    return this
  }

  withOnButtonShow(onButtonShow: () => unknown) {
    this.onButtonShow = onButtonShow
    return this
  }

  withOnButtonHidden(onButtonHidden: () => unknown) {
    this.onButtonHidden = onButtonHidden
    return this
  }

  withUserId(userId: string) {
    this.userId = userId
    return this
  }

  withOnDataChanged(
    onDataChanged: (data: {
      userId: string
      widgetVersion?: string
      seenExperiments?: string
      experimentVariants?: string
      profile?: unknown
    }) => unknown
  ) {
    this.onDataChanged = onDataChanged
    return this
  }

  openWidget(): void {
    if (!window._faslet?.openWidget) {
      console.error('Attempted to open Faslet widget before it was added to the DOM')
      return
    }
    window._faslet.openWidget()
  }

  addColor(id: string, name: string) {
    this.colors.push({ id, name })
    return this
  }

  addVariant(
    variantId: string,
    sizeLabel: string,
    inStock: boolean,
    sku: string,
    colorId: string,
    price?: number,
    imageUrl?: string
  ) {
    this.variants.push({
      size: sizeLabel,
      sku,
      id: variantId,
      available: inStock,
      color: colorId,
      price,
      imageUrl,
    })
    return this
  }

  /**
   * Inject the Faslet script tag into the DOM
   */
  injectScriptTag() {
    const root = document.getElementsByTagName('script')[0] ?? document.head.lastChild

    const existing = document.querySelector('#faslet-script-tag')
    if (existing) {
      console.log('Faslet script tag already exists, ignoring request to add again')
      return
    }

    const faslet = document.createElement('script')
    faslet.type = 'text/javascript'
    faslet.id = 'faslet-script-tag'
    faslet.src = 'https://widget.prod.faslet.net/faslet-app.min.js'
    faslet.defer = true
    if (root) {
      root.parentNode.insertBefore(faslet, root)
    } else {
      document.head.appendChild(faslet)
    }
  }

  /**
   * Remove the faslet-app tag from the DOM
   */
  removeFromDom() {
    const webComponent = document.querySelector('#faslet-web-component')
    if (webComponent) {
      webComponent.remove()
    }
  }

  /**
   * Add the faslet-app tag to the DOM
   * @param parentCssSelector - the css selector of the parent element to add the widget to
   */
  addToDom(parentCssSelector: string) {
    if (!this.shopId) {
      throw new Error(
        'Shop ID is missing, please construct your Widget instance with your Faslet Shop ID which you can obtain from Faslet'
      )
    }

    if (!this.productBrand) {
      throw new Error('Brand is missing, please call withBrand on your Widget instance')
    }

    if (!this.productIdentifier) {
      throw new Error('Product Identifier is missing, please call withProductId on your Widget instance')
    }

    if (!this.productName) {
      throw new Error('Product Name is missing, please call withProductName on your Widget instance')
    }

    if (!this.productImageUrl) {
      throw new Error('Product Image Url is missing, please call withProductImage on your Widget instance')
    }

    if (!this.variants || !this.variants.length) {
      throw new Error('Variants are empty, please call addVariant on your Widget instance')
    }

    const parent = document.querySelector(parentCssSelector)

    if (!parent) {
      throw new Error(
        `Could not find ${parentCssSelector} in the dom. Make sure you have an element that matches ${parentCssSelector}`
      )
    }

    window._faslet = {
      ...window._faslet,
      id: this.productIdentifier,
      variants: this.variants,
      colors: this.colors,
      shopUrl: this.shopPageUrl,
      addToCart: this.addToCart,
      onButtonHidden: this.onButtonHidden,
      onButtonShow: this.onButtonShow,
      onResult: this.onResult,
      onDataChanged: this.onDataChanged,
    }

    const widget = document.createElement('faslet-app', { is: 'faslet-app' })
    widget.id = 'faslet-web-component'
    widget.setAttribute('platform', this.platform)
    widget.setAttribute('product-name', this.productName)
    widget.setAttribute('shop-id', this.shopId)
    widget.setAttribute('brand', this.productBrand)
    if (this.productTag) widget.setAttribute('categories', this.productTag)
    widget.setAttribute('product-img', this.productImageUrl)
    if (this.locale) widget.setAttribute('locale', this.locale)
    if (this.disableProductRecs) widget.setAttribute('disable-product-recommendations', 'true')
    if (this.userId) widget.setAttribute('user-id', this.userId)

    parent.appendChild(widget)
  }
}
