import json

from fastapi import APIRouter, Depends, HTTPException, Query
from sqlalchemy.orm import Session

from app.core.deps import require_role
from app.db.database import get_db
from app.models.models import Product, ProductStatus
from app.schemas.schemas import ProductCreate, ProductOut

router = APIRouter(prefix="/api/products", tags=["products"])


def _serialize(p: Product) -> ProductOut:
    return ProductOut(
        id=p.id,
        title=p.title,
        slug=p.slug,
        description=p.description,
        price=float(p.price),
        compare_at_price=float(p.compare_at_price) if p.compare_at_price else None,
        stock=p.stock,
        images=json.loads(p.images or "[]"),
        rating_avg=float(p.rating_avg or 0),
        vendor_id=p.vendor_id,
        category_id=p.category_id,
    )


@router.get("", response_model=list[ProductOut])
def list_products(
    category: str | None = None,
    festival: str | None = None,
    q: str | None = Query(default=None, description="Search text"),
    db: Session = Depends(get_db),
):
    query = db.query(Product).filter(Product.status == ProductStatus.live)
    if category:
        query = query.join(Product.category).filter_by(slug=category)
    if q:
        query = query.filter(Product.title.ilike(f"%{q}%"))
    products = query.limit(60).all()
    return [_serialize(p) for p in products]


@router.get("/{slug}", response_model=ProductOut)
def get_product(slug: str, db: Session = Depends(get_db)):
    product = db.query(Product).filter(Product.slug == slug).first()
    if not product:
        raise HTTPException(status_code=404, detail="Product not found")
    return _serialize(product)


@router.post("", response_model=ProductOut, status_code=201)
def create_product(
    payload: ProductCreate,
    db: Session = Depends(get_db),
    vendor_user=Depends(require_role("vendor")),
):
    slug = payload.title.lower().replace(" ", "-")
    product = Product(
        vendor_id=vendor_user.vendor_profile.id,
        category_id=payload.category_id,
        title=payload.title,
        slug=slug,
        description=payload.description,
        craft_story=payload.craft_story,
        price=payload.price,
        compare_at_price=payload.compare_at_price,
        stock=payload.stock,
        festival_tags=json.dumps(payload.festival_tags),
        status=ProductStatus.pending_review,
    )
    db.add(product)
    db.commit()
    db.refresh(product)
    return _serialize(product)
