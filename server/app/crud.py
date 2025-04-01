from sqlalchemy.orm import Session
from app.models import Tool
from app.schemas import ToolCreate

# Create a new tool
def create_tool(db: Session, tool: ToolCreate):
    db_tool = Tool(**tool.dict())
    db.add(db_tool)
    db.commit()
    db.refresh(db_tool)
    return db_tool

# Get all tools
def get_tools(db: Session):
    return db.query(Tool).all()

# Get a single tool by ID
def get_tool(db: Session, tool_id: int):
    return db.query(Tool).filter(Tool.id == tool_id).first()
