# ess
elitec software system

Architektura na serveru je rozdělena do více vrstev:

Složka: ess_api: (.Net Framework)
- Core - definice DB objektů (Model), konstant, extensions metod atd..

- Infrastructure (DAL - Data access layer) - Repository pattern a vytvoření metod pro přístup k jednolivým DB objektům.

- BL (Bussiness layer) -  Logické rozdělení do jednotlivých Service (Zde se píšou jednotlivé algoritmy, výpočty atd, přístup k DAL a Libraries)

- Libraries - Vlastní a externí knihovny rozdělení do jednotlivých tříd (Servis) pro možnost použítí jako microservices)

- Test - Unit testy (Pro budoucí použití)

- ess_api - správa a přístup k jednotlivým EP - Controllers

Slozka: essclient: (Angular, typescript)
- separováni do samostatnych komponent a modulů
- rozdeleni na presentation (prezencni web) a internal (administrace) casti..
