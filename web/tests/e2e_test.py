from selenium.webdriver.support.ui import WebDriverWait


def test_e2e(live_server, xvfb, browser):
    browser.get("http://localhost:%d" % live_server.port)
    assert browser.title == 'Use movies to discover new vocabulary'
    browser.save_screenshot("screenshots/0_home.png")

    searchbar = browser.find_element_by_name("q")
    searchbar.send_keys("Se7en")

    WebDriverWait(browser, 10).until(
        lambda x: x.find_element_by_class_name('search-result-wrapper'))
    browser.save_screenshot("screenshots/1_search_result.png")

    first_result = browser.find_element_by_class_name('search-result-item')
    first_result.click()

    assert browser.current_url == "http://localhost:%d/m/tt0114369" % live_server.port
    WebDriverWait(browser, 30).until(
        lambda x: x.find_element_by_class_name('analysis'))
    browser.save_screenshot("screenshots/2_analysis.png")
