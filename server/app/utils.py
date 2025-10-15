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
