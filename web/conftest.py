import os

from pytest import fixture, yield_fixture
from selenium import webdriver
from xvfbwrapper import Xvfb

from web.app import create_app


@fixture
def app():
    os.environ["CONFIG"] = "config_test"
    return create_app()


@fixture(scope='session')
def xvfb():
    with Xvfb(width=1024, height=800) as vdisplay:
        yield vdisplay


@yield_fixture()
def browser():
    driver = webdriver.Firefox()
    yield driver
    driver.quit()
