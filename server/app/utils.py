# app/utils.py
import asyncio
from playwright.async_api import async_playwright
import os
import uuid

SCREENSHOT_DIR = "static/screenshots"
os.makedirs(SCREENSHOT_DIR, exist_ok=True)

async def async_capture_screenshot(url: str, filename: str):
    async with async_playwright() as p:
        browser = await p.chromium.launch()
        page = await browser.new_page()
        await page.goto(url, timeout=60000)
        await page.screenshot(path=filename, full_page=True)
        await browser.close()

def get_screenshot(url: str) -> str:
    """Wrapper to run the async Playwright screenshot sync-like."""
    filename = f"{uuid.uuid4().hex}.png"
    filepath = os.path.join(SCREENSHOT_DIR, filename)
    asyncio.run(async_capture_screenshot(url, filepath))
    return f"/{filepath}"  # path you’ll serve statically via FastAPI
