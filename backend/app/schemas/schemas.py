from datetime import datetime

from pydantic import BaseModel, EmailStr, Field


# ---------- Auth ----------
class UserCreate(BaseModel):
    name: str
    email: EmailStr
    password: str = Field(min_length=8)
    phone: str | None = None


class UserLogin(BaseModel):
    email: EmailStr
    password: str


class UserOut(BaseModel):
    id: str
    name: str
    email: EmailStr
    role: str

    class Config:
        from_attributes = True


class Token(BaseModel):
    access_token: str
    token_type: str = "bearer"


# ---------- Category ----------
class CategoryOut(BaseModel):
    id: str
    name: str
    slug: str

    class Config:
        from_attributes = True


# ---------- Product ----------
class ProductCreate(BaseModel):
    title: str
    description: str
    craft_story: str | None = None
    category_id: str
    price: float
    compare_at_price: float | None = None
    stock: int = 0
    festival_tags: list[str] = []


class ProductOut(BaseModel):
    id: str
    title: str
    slug: str
    description: str
    price: float
    compare_at_price: float | None
    stock: int
    images: list[str]
    rating_avg: float
    vendor_id: str
    category_id: str

    class Config:
        from_attributes = True


# ---------- Vendor ----------
class VendorApply(BaseModel):
    business_name: str
    story: str | None = None
    region: str | None = None


class VendorOut(BaseModel):
    id: str
    business_name: str
    status: str
    commission_percent: float

    class Config:
        from_attributes = True


# ---------- Cart / Order ----------
class CartItem(BaseModel):
    product_id: str
    quantity: int = 1


class CheckoutRequest(BaseModel):
    items: list[CartItem]
    shipping_address: str


class OrderOut(BaseModel):
    id: str
    status: str
    total_amount: float
    created_at: datetime

    class Config:
        from_attributes = True


# ---------- Chatbot ----------
class ChatRequest(BaseModel):
    session_id: str | None = None
    message: str


class ChatResponse(BaseModel):
    session_id: str
    reply: str
    product_suggestions: list[ProductOut] = []
