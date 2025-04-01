from fastapi import APIRouter, Depends, HTTPException, Query
from sqlalchemy.orm import Session
from sqlalchemy import or_
from app import models, schemas, database
from app.utils import bestsoup_scraper, get_screenshot
from app.auth import get_current_admin  # ✅ Admin Authentication

router = APIRouter()

# ✅ Get Database Session
def get_db():
    db = database.SessionLocal()
    try:
        yield db
    finally:
        db.close()

# 🔍 Public: Get Approved Tools
@router.get("/", response_model=dict)
def get_tools(
    db: Session = Depends(get_db),
    search: str = Query(None),
    category: str = Query(None),
    pricing: str = Query(None),
    sort_by: str = Query(None),
    page: int = Query(1),
    limit: int = Query(10),
):
    query = db.query(models.Tool).filter(models.Tool.approved == True)

    if search:
        query = query.filter(
            or_(
                models.Tool.name.ilike(f"%{search}%"),
                models.Tool.description.ilike(f"%{search}%"),
            )
        )

    if category:
        query = query.filter(models.Tool.categories == category)

    if pricing:
        query = query.filter(models.Tool.pricing == pricing)

    if sort_by == "name":
        query = query.order_by(models.Tool.name)
    elif sort_by == "date":
        query = query.order_by(models.Tool.created_at.desc())

    total = query.count()
    tools = query.offset((page - 1) * limit).limit(limit).all()
    tools_data = [schemas.ToolResponse.from_orm(tool) for tool in tools]

    return {
        "total": total,
        "page": page,
        "limit": limit,
        "total_pages": (total // limit) + (1 if total % limit > 0 else 0),
        "tools": tools_data
    }

# ➕ Public: Create a New Tool Submission
@router.post("/", response_model=schemas.ToolResponse)
def create_tool(tool: schemas.ToolCreate, db: Session = Depends(get_db)):
    try:
        metadata = bestsoup_scraper(tool.url)
        screenshot_url = get_screenshot(tool.url)

        blog_title = f"Exploring {tool.name}: A {tool.pricing.capitalize()} {tool.categories} Tool"
        blog_content = (
            f"{tool.name} is a {tool.pricing} tool designed to solve the problem of {tool.problem_it_solves}. "
            f"It offers features like {tool.key_features}. "
            f"{'Requires an account to use.' if tool.requires_account else 'No account needed to use this tool.'}"
        )

        db_tool = models.Tool(
            name=tool.name,
            description=metadata.get("description") or tool.description,
            categories=tool.categories,
            url=tool.url,
            pricing=tool.pricing,
            problem_it_solves=tool.problem_it_solves,
            key_features=tool.key_features,
            requires_account=tool.requires_account,
            approved=False,  # ❌ Tools are NOT approved by default
            blog_title=blog_title,
            blog_content=blog_content,
            image_url=screenshot_url, 
        )
        db.add(db_tool)
        db.commit()
        db.refresh(db_tool)
        return db_tool

    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error: {str(e)}")

# ✅ Admin-Only: Approve a Tool
@router.put("/{tool_id}/approve")
def approve_tool(
    tool_id: int, 
    db: Session = Depends(get_db), 
    admin: models.Admin = Depends(get_current_admin)  # 🔐 Admin Required
):
    tool = db.query(models.Tool).filter(models.Tool.id == tool_id).first()
    if not tool:
        raise HTTPException(status_code=404, detail="Tool not found")

    tool.approved = True
    db.commit()
    return {"message": "Tool approved successfully"}

# 🔎 Admin-Only: Get Pending Tools
@router.get("/pending", response_model=list[schemas.ToolResponse])
def get_pending_tools(
    db: Session = Depends(get_db), 
    admin: models.Admin = Depends(get_current_admin)  # 🔐 Admin Required
):
    return db.query(models.Tool).filter(models.Tool.approved == False).all()

# ❌ Admin-Only: Delete a Tool
@router.delete("/{tool_id}")
def delete_tool(
    tool_id: int, 
    db: Session = Depends(get_db), 
    admin: models.Admin = Depends(get_current_admin)  # 🔐 Admin Required
):
    tool = db.query(models.Tool).filter(models.Tool.id == tool_id).first()
    
    if not tool:
        raise HTTPException(status_code=404, detail="Tool not found")
    
    db.delete(tool)
    db.commit()
    return {"message": "Tool deleted successfully"}

# 🛠 Public: Get a Single Tool by ID
@router.get("/{tool_id}", response_model=schemas.ToolResponse)
def get_tool(tool_id: int, db: Session = Depends(get_db)):
    tool = db.query(models.Tool).filter(models.Tool.id == tool_id).first()
    if not tool:
        raise HTTPException(status_code=404, detail="Tool not found")
    return tool
