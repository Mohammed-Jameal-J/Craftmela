"""
Cloudinary integration — product image upload + background standardization.

Usage from an upload endpoint:

    from app.services.cloudinary_service import upload_product_image
    url = upload_product_image(file_bytes, public_id="product-slug-1")
"""

import cloudinary
import cloudinary.uploader

from app.core.config import settings

cloudinary.config(
    cloud_name=settings.CLOUDINARY_CLOUD_NAME,
    api_key=settings.CLOUDINARY_API_KEY,
    api_secret=settings.CLOUDINARY_API_SECRET,
    secure=True,
)


def upload_product_image(file, public_id: str, folder: str = "craftmela/products") -> str:
    """Uploads an image and returns the delivered (CDN) URL.

    Applies automatic format + quality optimization. Background removal can
    be enabled per-asset with `background_removal="cloudinary_ai"` on
    Cloudinary plans that include the AI Background Removal add-on.
    """
    result = cloudinary.uploader.upload(
        file,
        public_id=public_id,
        folder=folder,
        overwrite=True,
        resource_type="image",
        transformation=[{"quality": "auto", "fetch_format": "auto"}],
    )
    return result["secure_url"]


def upload_banner_image(file, public_id: str) -> str:
    return upload_product_image(file, public_id=public_id, folder="craftmela/banners")
