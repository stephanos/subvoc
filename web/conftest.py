import os
import pytest

from web.app import create_app


@pytest.fixture
def app():
    os.environ["CONFIG"] = "config_test"
    return create_app()
