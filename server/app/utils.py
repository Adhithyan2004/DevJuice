
from playwright.async_api import async_playwright
import requests
from bs4 import BeautifulSoup




async def async_capture_screenshot(url: str, filename: str):
    async with async_playwright() as p:
        browser = await p.chromium.launch()
        page = await browser.new_page()
        await page.goto(url, timeout=60000)
        await page.screenshot(path=filename, full_page=True)
        await browser.close()


import requests
from bs4 import BeautifulSoup

def bestsoup_scraper(url: str) -> dict:
    try:
        headers = {
            "User-Agent": "Mozilla/5.0"
        }
        response = requests.get(url, headers=headers, timeout=10)
        response.raise_for_status()

        soup = BeautifulSoup(response.text, "html.parser")

        title = soup.title.string.strip() if soup.title else "No title found"

        meta_desc = ""
        meta_tag = soup.find("meta", attrs={"name": "description"})
        if meta_tag and meta_tag.get("content"):
            meta_desc = meta_tag["content"].strip()
        else:
            meta_desc = ""

        return {
            "title": title,
            "description": meta_desc
        }

    except Exception as e:
        print(f"Error scraping metadata: {e}")
        return {
            "title": "Fallback Title",
            "description": "Fallback description for the tool. Real metadata coming soon."
        }
