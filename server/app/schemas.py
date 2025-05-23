from pydantic import BaseModel
from typing import Optional
from pydantic import BaseModel


# Tool Models
class ToolBase(BaseModel):
    name: str
    description: str
    categories: str
    url: str
    pricing: str  # e.g., "Free", "Premium", "Freemium"
    problem_it_solves: str
    key_features: str
    requires_account: bool


class ToolCreate(ToolBase):
    pass


class ToolResponse(ToolBase):
    id: int
    approved: bool
    blog_title: Optional[str] = None
    blog_content: Optional[str] = None

    class Config:
        from_attributes = True


# Admin Models
class AdminCreate(BaseModel):
    username: str
    password: str


class AdminResponse(BaseModel):
    id: int
    username: str
    is_superuser: bool
    is_approved: bool


class Token(BaseModel):
    access_token: str
    token_type: str
    admin: AdminResponse  # Include admin details in response


class AdminOut(BaseModel):
    id: int
    username: str


class Config:
    from_attributes = True
