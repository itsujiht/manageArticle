import json
import bibtexparser

with open('./public/liter.bib', 'r', encoding='utf-8') as bib_file:
    bib_database = bibtexparser.load(bib_file)

bib_json = []
for entry in bib_database.entries:
    entry_json = {
        "ID": entry.get("ID", ""),
        "author": entry.get("author", "no author"),
        "year": entry.get("year", "no year"),
        "title": entry.get("title", "no title"),
        "abstract": entry.get("abstract", "no abstract"),
        "memo": entry.get("memo", "no memo"),
        "tags": entry.get("tags", "").split(", ") if "tags" in entry else ["other"]
    }
    bib_json.append(entry_json)

bib_json_dump = json.dumps(bib_json, indent=4, ensure_ascii=False)

with open('./public/liter.json', 'w', encoding='utf-8') as json_file:
    json_file.write(bib_json_dump)
