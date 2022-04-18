## Aplicatie de votare bazat pe blockchain NEAR

Smart-contractul este scris in AssemblyScript si este compilat in WebAssembly.

In mediul de development este creat automat un cont de test in [reteaua de test](https://rpc.testnet.near.org), iar deploymentul este facut automat:
```shell
yarn dev
```

Front-end-ul este scris in React.

Dependintele pentru front-end se instaleaza din directorul `block-voting` cu comanda:
```shell
yarn install
```

Dependintele pentru contract sunt instalate separat din directorul `block-voting/contract` cu aceeasi comanda.

Proiectul este inspirat ***puternic*** de tutorialul [acesta](https://www.youtube.com/watch?v=sm8w9tDnMZc).

---

### Detaliile blockchainului

Codul pentru blockchain este gasit in fisierul contract/assembly/index.ts

Structura acestui fisier poate fi descompusa in 3 zone:
* declararea variabilelor: prezenta la inceputul fisierului, sunt declarate 5 dictionare, pentru primele 4 cheia reprezinte un singur sondaj, iar valoare, in functie de variabila contine diferite date referitoare la acel sondaj (candidati, numar de voturi a fiecaruia, userii care au votat etc.). Mai exista si variabila PromptArray care contine toate sondajele. Aceasta este de asemenea un dictionar deoarece este mai usor de lucrat in acest mod. Toate sondajele sunt gasite la cheia "allarrays"
* metodele de tip view: sunt metode care nu schimba variabilele din blockchain, acestea pot doar sa citeasca din ele. Aici se gasesc metode precum verificarea daca un utilizator a votat, sau metode de get pentru variabile blockchainului
* metodele de tip change: sunt metode care altereaza variabilele, aici se pot gasi metode precum creearea unui nou sondaj, adaugarea de utilizatori, votarea unui anumit utilizator.
