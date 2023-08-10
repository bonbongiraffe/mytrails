"""add favorite to hikes

Revision ID: f33eee64032a
Revises: 72e366dacac6
Create Date: 2023-08-10 16:41:13.796405

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = 'f33eee64032a'
down_revision = '72e366dacac6'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('hikes', schema=None) as batch_op:
        batch_op.add_column(sa.Column('favorite', sa.Boolean(), nullable=True))

    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('hikes', schema=None) as batch_op:
        batch_op.drop_column('favorite')

    # ### end Alembic commands ###
