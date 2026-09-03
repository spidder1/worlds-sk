-- Supplier refreshes first unapprove the previous primary image and then add
-- the replacement. Enforce uniqueness only for the approved primary so the
-- old source link can remain as audit history without blocking the refresh.

drop index if exists catalog.one_primary_media_per_product_locale;

create unique index one_approved_primary_media_per_product_locale
  on catalog.product_media (product_id, locale)
  where role = 'PRIMARY' and approved;

comment on index catalog.one_approved_primary_media_per_product_locale is
  'At most one approved primary image per product and locale; unapproved supplier history may coexist.';
