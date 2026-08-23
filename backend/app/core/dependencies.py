from uuid import UUID

from fastapi import Depends, HTTPException, status
from fastapi.security import OAuth2PasswordBearer
from jose import JWTError, jwt
from sqlalchemy import select
from sqlalchemy.orm import Session

from app.core.config import settings
from app.core.database import get_db
from app.models.user import User, UserRole
from app.models.doctor import Doctor


oauth2_scheme = OAuth2PasswordBearer(
    tokenUrl="/api/v1/auth/login"
)


def get_current_user(
    token: str = Depends(oauth2_scheme),
    db: Session = Depends(get_db),
) -> User:
    """
    Validate the JWT access token and return the
    authenticated user from PostgreSQL.
    """

    credentials_exception = HTTPException(
        status_code=status.HTTP_401_UNAUTHORIZED,
        detail="Could not validate credentials",
        headers={
            "WWW-Authenticate": "Bearer"
        },
    )

    try:
        # Decode and validate JWT.
        payload = jwt.decode(
            token,
            settings.JWT_SECRET_KEY,
            algorithms=[settings.JWT_ALGORITHM],
        )

        # Our login function stores the user ID in "sub".
        user_id = payload.get("sub")

        if user_id is None:
            raise credentials_exception

        user_uuid = UUID(user_id)

    except (JWTError, ValueError):
        raise credentials_exception

    # Find the user in PostgreSQL.
    user = db.scalar(
        select(User).where(
            User.id == user_uuid
        )
    )

    if user is None:
        raise credentials_exception

    # Don't allow inactive accounts.
    if not user.is_active:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="User account is inactive",
        )

    return user

def get_current_doctor(
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db),
) -> Doctor:
    """
    Return the Doctor profile belonging to the
    currently authenticated user.
    """

    if current_user.role != UserRole.DOCTOR:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Doctor access required",
        )

    doctor = db.scalar(
        select(Doctor).where(
            Doctor.user_id == current_user.id
        )
    )

    if doctor is None:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Doctor profile not found",
        )

    return doctor

def get_current_patient(
    current_user: User = Depends(get_current_user),
) -> User:
    """
    Return the currently authenticated patient.
    """

    if current_user.role != UserRole.PATIENT:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Patient access required",
        )

    return current_user