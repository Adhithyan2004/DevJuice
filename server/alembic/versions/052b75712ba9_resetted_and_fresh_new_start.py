"""resetted and fresh new start

Revision ID: 052b75712ba9
Revises: 
Create Date: 2025-05-04 11:59:31.982109

"""
from typing import Sequence, Union

from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision: str = '052b75712ba9'
down_revision: Union[str, None] = None
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def upgrade() -> None:
    """Upgrade schema."""
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_index('ix_admins_id', table_name='admins')
    op.drop_table('admins')
    op.drop_index('ix_tools_id', table_name='tools')
    op.drop_table('tools')
    # ### end Alembic commands ###


def downgrade() -> None:
    """Downgrade schema."""
    # ### commands auto generated by Alembic - please adjust! ###
    op.create_table('tools',
    sa.Column('id', sa.INTEGER(), autoincrement=True, nullable=False),
    sa.Column('name', sa.VARCHAR(), autoincrement=False, nullable=False),
    sa.Column('description', sa.TEXT(), autoincrement=False, nullable=False),
    sa.Column('categories', sa.VARCHAR(), autoincrement=False, nullable=False),
    sa.Column('url', sa.VARCHAR(), autoincrement=False, nullable=False),
    sa.Column('approved', sa.BOOLEAN(), autoincrement=False, nullable=True),
    sa.Column('pricing', sa.VARCHAR(), autoincrement=False, nullable=False),
    sa.Column('problem_it_solves', sa.TEXT(), autoincrement=False, nullable=False),
    sa.Column('key_features', sa.TEXT(), autoincrement=False, nullable=False),
    sa.Column('requires_account', sa.BOOLEAN(), autoincrement=False, nullable=True),
    sa.Column('blog_title', sa.VARCHAR(), autoincrement=False, nullable=True),
    sa.Column('blog_content', sa.TEXT(), autoincrement=False, nullable=True),
    sa.PrimaryKeyConstraint('id', name='tools_pkey'),
    sa.UniqueConstraint('url', name='tools_url_key')
    )
    op.create_index('ix_tools_id', 'tools', ['id'], unique=False)
    op.create_table('admins',
    sa.Column('id', sa.INTEGER(), autoincrement=True, nullable=False),
    sa.Column('username', sa.VARCHAR(length=50), autoincrement=False, nullable=False),
    sa.Column('hashed_password', sa.VARCHAR(length=255), autoincrement=False, nullable=False),
    sa.Column('is_superuser', sa.BOOLEAN(), autoincrement=False, nullable=True),
    sa.Column('is_approved', sa.BOOLEAN(), autoincrement=False, nullable=True),
    sa.PrimaryKeyConstraint('id', name='admins_pkey'),
    sa.UniqueConstraint('username', name='admins_username_key')
    )
    op.create_index('ix_admins_id', 'admins', ['id'], unique=False)
    # ### end Alembic commands ###
