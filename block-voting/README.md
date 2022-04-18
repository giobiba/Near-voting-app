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