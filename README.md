# paper manager

論文管理アプリが作りたいので、作ります。

### how to use
bibtex形式の論文データをpublic/liter.bibに配置。

bibtexparserを用いてliter.jsonに変換(parser.py)。

```
pip3 install bibtexparser
python3 parser.py
```

reactでdeployする。

```
npm run dev
```