from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from app.core.deps import get_current_user
from app.db.database import get_db
from app.models.models import Order, OrderItem, OrderStatus, Product
from app.schemas.schemas import CheckoutRequest, OrderOut

router = APIRouter(prefix="/api/orders", tags=["orders"])


@router.post("/checkout", response_model=OrderOut, status_code=201)
def checkout(payload: CheckoutRequest, db: Session = Depends(get_db), user=Depends(get_current_user)):
    total = 0.0
    line_items: list[OrderItem] = []

    for item in payload.items:
        product = db.get(Product, item.product_id)
        if not product or product.stock < item.quantity:
            raise HTTPException(status_code=400, detail=f"Product unavailable: {item.product_id}")
        line_total = float(product.price) * item.quantity
        total += line_total
        line_items.append(
            OrderItem(
                product_id=product.id,
                vendor_id=product.vendor_id,
                quantity=item.quantity,
                unit_price=product.price,
            )
        )
        product.stock -= item.quantity

    order = Order(
        buyer_id=user.id,
        status=OrderStatus.pending,
        total_amount=total,
        shipping_address=payload.shipping_address,
    )
    order.items = line_items
    db.add(order)
    db.commit()
    db.refresh(order)
    # NOTE: hand off to payment gateway (Razorpay/Stripe) here, then
    # update order.status -> paid via webhook confirmation.
    return order


@router.get("/my", response_model=list[OrderOut])
def my_orders(db: Session = Depends(get_db), user=Depends(get_current_user)):
    return db.query(Order).filter(Order.buyer_id == user.id).order_by(Order.created_at.desc()).all()
