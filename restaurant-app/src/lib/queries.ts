export const ALL_CATEGORIES = `*[_type == "category"] | order(sortOrder asc)`

export const ALL_MENU_ITEMS = `*[_type == "menuItem" && isAvailable == true]{
  _id,
  name,
  slug,
  category->{_id, name, slug, sortOrder},
  description,
  price,
  extraPortionPrice,
  image,
  isAvailable,
  isFeatured,
  tags
}`

export const MENU_ITEMS_BY_CATEGORY = `*[_type == "menuItem" && isAvailable == true && category->slug.current == $categorySlug]{
  _id,
  name,
  slug,
  category->{_id, name, slug, sortOrder},
  description,
  price,
  extraPortionPrice,
  image,
  isAvailable,
  isFeatured,
  tags
}`

export const FEATURED_ITEMS = `*[_type == "menuItem" && isAvailable == true && isFeatured == true]{
  _id,
  name,
  slug,
  category->{_id, name, slug, sortOrder},
  description,
  price,
  extraPortionPrice,
  image,
  isAvailable,
  isFeatured,
  tags
}`

export const SITE_SETTINGS = `*[_type == "siteSettings"][0]`
