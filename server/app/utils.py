import os
import requests
from bs4 import BeautifulSoup
from dotenv import load_dotenv  # Import dotenv

# Load environment variables
load_dotenv()

def bestsoup_scraper(url):
    """Fetch website metadata using BestSoup."""
    try:
        response = requests.get(url, timeout=10)
        soup = BeautifulSoup(response.text, "html.parser")

        title = soup.find("title").text if soup.find("title") else None
        description = (
            soup.find("meta", attrs={"name": "description"}) or 
            soup.find("meta", attrs={"property": "og:description"})
        )
        description = description["content"] if description else None

        return {"title": title, "description": description}

    except Exception as e:
        print(f"Metadata fetch failed: {e}")
        return {"title": None, "description": None}

def get_screenshot(url):
    """Fetch a screenshot from a Screenshot API."""
    API_KEY = os.getenv("SCREENSHOT_API_KEY")  # Get key from env file
    if not API_KEY:
        raise ValueError("Missing SCREENSHOT_API_KEY in environment variables.")

    screenshot_url = f"https://api.screenshotone.com/take?url={url}&block_cookie_banners=true&access_key={API_KEY}"
    return screenshot_url  # Returns the generated screenshot URL
