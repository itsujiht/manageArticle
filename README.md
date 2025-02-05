# paper manager

論文管理アプリが作りたいので、作ります。

### how to use
1. bibtex形式の論文データをpublic/liter.bibに配置。

2. bibtexparserを用いてliter.jsonに変換(parser.py)。

```
pip3 install bibtexparser
python3 parser.py
```

3. reactでdeployする。

```
npm run dev
```