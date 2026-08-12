from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from app.core.deps import get_current_user, require_role
from app.db.database import get_db
from app.models.models import Vendor, VendorStatus
from app.schemas.schemas import VendorApply, VendorOut

router = APIRouter(prefix="/api/vendors", tags=["vendors"])


@router.post("/apply", response_model=VendorOut, status_code=201)
def apply_as_vendor(payload: VendorApply, db: Session = Depends(get_db), user=Depends(get_current_user)):
    existing = db.query(Vendor).filter(Vendor.user_id == user.id).first()
    if existing:
        raise HTTPException(status_code=400, detail="Vendor application already exists")

    vendor = Vendor(
        user_id=user.id,
        business_name=payload.business_name,
        story=payload.story,
        region=payload.region,
        status=VendorStatus.pending,
    )
    db.add(vendor)
    db.commit()
    db.refresh(vendor)
    return vendor


@router.get("/pending", response_model=list[VendorOut])
def list_pending_vendors(db: Session = Depends(get_db), _admin=Depends(require_role("admin", "super_admin"))):
    return db.query(Vendor).filter(Vendor.status == VendorStatus.pending).all()


@router.post("/{vendor_id}/approve", response_model=VendorOut)
def approve_vendor(vendor_id: str, db: Session = Depends(get_db), _admin=Depends(require_role("admin", "super_admin"))):
    vendor = db.get(Vendor, vendor_id)
    if not vendor:
        raise HTTPException(status_code=404, detail="Vendor not found")
    vendor.status = VendorStatus.approved
    db.commit()
    db.refresh(vendor)
    return vendor


@router.post("/{vendor_id}/reject", response_model=VendorOut)
def reject_vendor(vendor_id: str, db: Session = Depends(get_db), _admin=Depends(require_role("admin", "super_admin"))):
    vendor = db.get(Vendor, vendor_id)
    if not vendor:
        raise HTTPException(status_code=404, detail="Vendor not found")
    vendor.status = VendorStatus.rejected
    db.commit()
    db.refresh(vendor)
    return vendor
