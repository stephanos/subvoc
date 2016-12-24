class Subtitle:
    def __init__(self, id, title, year, downloads, text=None):
        self.id = id
        self.title = title
        self.year = year
        self.text = text
        self.downloads = downloads
