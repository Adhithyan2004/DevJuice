from sqlalchemy import Column, Integer, String, Boolean, Text
from app.database import Base


class Tool(Base):
    __tablename__ = "tools"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, nullable=False)
    description = Column(Text, nullable=False)
    categories = Column(String, nullable=False)
    url = Column(String, nullable=False, unique=True)
    approved = Column(Boolean, default=False)

    # New Fields
    pricing = Column(String, nullable=False)  # e.g., "Free", "Premium", "Freemium"
    problem_it_solves = Column(Text, nullable=False)
    key_features = Column(Text, nullable=False)
    requires_account = Column(Boolean, default=False)

    # Auto-generated blog fields
    blog_title = Column(String, nullable=True)
    blog_content = Column(Text, nullable=True)


class Admin(Base):
    __tablename__ = "admins"

    id = Column(Integer, primary_key=True, index=True)
    username = Column(String(50), nullable=False, unique=True)
    hashed_password = Column(String(255), nullable=False)
    is_superuser = Column(Boolean, default=True)
    is_approved = Column(Boolean, default=False)
