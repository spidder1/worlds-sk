# Lokálny vývoj Medusa

Medusa backend je v `apps/medusa` a je súčasťou existujúceho pnpm workspace.
Súčasný Worlds.sk storefront zostáva oddelený; Medusa sa pripája postupne.

## Prvé spustenie

1. Vytvor Neon databázu alebo branch pre `development`.
2. Skopíruj `apps/medusa/.env.example` do `apps/medusa/.env`.
3. Vyplň `DATABASE_URL` Neon connection stringom s `sslmode=require`.
4. Spusť Redis lokálne na porte `6379`, alebo nastav inú hodnotu `REDIS_URL`.
5. Aplikuj Medusa migrácie:

```powershell
pnpm medusa:migrate
```

6. Spusť backend a administráciu:

```powershell
pnpm dev:medusa
```

Backend bude dostupný na `http://localhost:9000` a administrácia na
`http://localhost:9000/app`.

## Dôležité pravidlá

- Produkčný Neon connection string sa nesmie zapisovať do repozitára.
- Vývoj, staging a production musia používať oddelené Neon branches/databázy.
- Pred prvým importom produktov sa musí overiť schéma a kategorizácia na malej vzorke.
- `apps/medusa/.env` je lokálny súbor ignorovaný Gitom; zdieľané premenné patria do
  `apps/medusa/.env.example`.

## Ďalší krok

Po overení čistého Medusa backendu vytvoríme vlastný modul pre eD feed, ktorý bude
plniť Medusa produkty, varianty, ceny, sklad, kategórie a všetky obrázky.
