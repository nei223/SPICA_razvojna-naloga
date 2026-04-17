# AllhoursApp

 Aplikacija zgrajena s pomočjo [Angular CLI](https://github.com/angular/angular-cli) version 21.2.7., za upravljanje s entitetami.

## Aplikacija omogoča:
* pregled uporabnikov
* dodajanje novih uporabnikov
* dodajanje odsotnosti
* pregled odsotnosti
* nastavitev API dostopa (Client ID, Client Secret, Token)


## Zahteve

Pred zagonom potrebujete:

* Node.js (>= 18)
* Angular CLI

```bash
npm install -g @angular/cli
```

## Namestitev

1. Klonirajte projekt:

```bash
git clone https://github.com/nei223/SPICA_razvojna-naloga
cd SPICA_razvojna-naloga
```

2. Namestite odvisnosti:

```bash
npm install
```

3. Zaženite aplikacijo:

```bash
npx ng serve
```

4. Odprite v brskalniku:

```bash
http://localhost:4200
```

---

## Nastavitve

Ob prvem zagonu te aplikacija preusmeri na **Settings**.

Vnesti moraš:

* **Client ID**
* **Client Secret**
* **Token**

Client ID: user123456
Client secret: gesli123456

Če podatki niso pravilni dostop do aplikacije ni mogoč.

## Token

* ročno vnesete v Settings

Token se shrani v `localStorage` in se uporablja za vse API klice.

---
## Kako deluje aplikacija
* `Settings` shrani podatke v `localStorage`
* `Auth service` uporablja token za API klice
* `Auth guard` prepreči dostop brez pravilnih podatkov
* `Users` omogoča upravljanje uporabnikov
      * Omogoča filtriranje po imenih
      * Omogoča dodajanje uporabnikov:
          * Vsa polja morajo biti izpolnjena
          *  E-pošta mora vsebovati @
          *  E-poštni naslov ne sme že prej obstajati
    	* Omogoča dodajanje odsotnosti
          * Vsa polja morajo biti izpoljnena
          * Konec odsotnosti ne more biti pred začetkom
* `Absences` omogoča pregled odsotnosti
          * Omogoča filtriranje po datumih

## Tehnologije
* Angular (standalone components)
* TypeScript
* HttpClient (REST API)
* LocalStorage (za shranjevanje podatkov)


