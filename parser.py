import json
import bibtexparser

with open('./public/liter.bib', 'r', encoding='utf-8') as bib_file:
    bib_database = bibtexparser.load(bib_file)

bib_json = json.dumps(bib_database.entries, indent=4, ensure_ascii=False)

with open('./public/liter.json', 'w', encoding='utf-8') as json_file:
    json_file.write(bib_json)
