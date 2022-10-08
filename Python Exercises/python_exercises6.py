# Pentru toate clasele, creați cel puțin 2 obiecte cu valori diferite și apelați toate
# metodele clasei.
''' 1.Clasa Cerc
Atribute: raza, culoare
Constructor pentru ambele atribute
Metode:
● descrie_cerc() - va PRINTA culoarea și raza
● aria() - va RETURNA aria
● diametru()
● circumferinta() '''
import math
class Cerc:


    def __init__(self, raza, culoare):
        self.raza = raza
        self.culoare = culoare

    def aria(self):
        return math.pi * self.raza ** 2

    def descrie_cerc(self):
        print(f'Raza cercului este: {self.raza}, culoarea cercului este {self.culoare}')

    def diametru(self):
        return self.raza ** 2

    def circumferinta(self):
        return math.pi * self.diametru() * 2

cerc = Cerc(1, "verde")
cerc.descrie_cerc()
print(cerc.aria())
print(cerc.diametru())
print(cerc.circumferinta())
print('-'* 50)

'''2. Clasa Dreptunghi
Atribute: lungime, latime, culoare
Constructor pentru toate atributele
Metode:
● descrie()
● aria()
● perimetrul()
● schimbă_culoarea(noua_culoare) - această metodă nu returneaza nimic.
Ea va lua ca și parametru o nouă culoare și va suprascrie atributul
self.culoare. Puteti verifica schimbarea culorii prin apelarea metodei
descrie().'''
class Dreptunghi:
    def __init__(self, lungime, latime, culoare):
        self.lungime = lungime
        self.latime = latime
        self.culoare = culoare

    def descrie(self):
        print(f"Dreptunghiul are culoarea {self.culoare}, lungimea de {self.lungime} si latimea de {self.latime}")

    def aria(self):
        return self.latime * self.lungime

    def perimetrul(self):
        return 2 * (self.lungime + self.latime)

    def schimba_culoarea(self, culoare_noua):
        self.culoare = culoare_noua

dreptunghi = Dreptunghi(1, 2, "verde")
dreptunghi.descrie()
print(dreptunghi.aria())
print(dreptunghi.perimetrul())
dreptunghi.schimba_culoarea("alb")
dreptunghi.descrie()
print('-'*50)

'''3. Clasa Angajat
Atribute: nume, prenume, salariu
Constructor pt toate atributele
Metode:
● descrie()
● nume_complet()
● salariu_lunar()
● salariu_anual()
● marire_salariu(procent)'''
class Angajat:

    def __init__(self, nume, prenume, salariu):
        self.nume = nume
        self.prenume = prenume
        self.salariu = salariu
    def descrie(self):
        print(f"Ma numesc {self.nume} {self.prenume} si am salar {self.salariu} RON")
    def nume_complet(self) -> str:
        return self.nume + self.prenume
    def salariu_lunar(self) -> int:
        return self.salariu
    def salariu_anual(self):
        return self.salariu + (self.salariu * 12)
    def marire_salariu(self, procent):
        return self.salariu + ((self.salariu * procent)/100)

angajat_1 = Angajat("David", "Mihai", 5000)
angajat_1.descrie()
print(angajat_1.nume_complet())
print(angajat_1.salariu_lunar())
print(angajat_1.salariu_anual())
print(angajat_1.marire_salariu(10))
print('-'*50)

'''4.Clasa Cont
Atribute: iban, titular_cont, sold
Constructor pentru toate atributele
Metode:
● afisare_sold() - Titularul x are în contul y suma de n lei
● debitare_cont(suma)
● creditare_cont(suma)'''

class Cont:
    def __init__(self, iban, titular_cont, sold):
        self.iban = iban
        self.titular_cont = titular_cont
        self.sold = sold
    def afisare_sold(self):
        print(f'Titularul {self.titular_cont} are in contul {self.iban} suma de {self.sold}RON')
    def debitare_cont(self, suma):
        self.sold += suma
        return self.sold
    def creditare_cont(self, suma):
        self.sold -= suma
        return self.sold
cont = Cont(123456, "David Mihai", 10000)
cont.afisare_sold()
print(cont.debitare_cont(2000))
print(cont.creditare_cont(1000))

# EXERCITII OPTIONALE (MEDIU-AVANSAT)

'''1. Clasa Factura
Atribute: seria (va fi constantă, nu trebuie constructor, toate facturile vor
avea aceeași serie), număr, nume_produs, cantitate, pret_buc
Constructor: toate atributele, fara serie
Metode:
● schimbă_cantitatea(cantitate)
● schimbă_prețul(pret)
● schimbă_nume_produs(nume)
● generează_factura() - va printa tabelar dacă reușiți
Factura seria x numar y
Data: generați automat data de azi
Produs | cantitate | preț bucată | Total
Telefon | 7 | 700 | 49000 '''
from datetime import datetime
from prettytable import PrettyTable

class Factura:
    SERIE = 1234567789
    def __init__(self, numar, nume_produs, cantitate, pret_buc):
        self.numar = numar
        self.nume_produs = nume_produs
        self.cantitate = cantitate
        self.pret_buc = pret_buc

    def schimba_cantitatea(self, cantitate_noua):
        self.cantitate = cantitate_noua

    def schimba_pretul(self, pret_nou):
        self.pret_buc = pret_nou

    def schimba_nume__produs(self, nume_nou):
        self.nume_produs = nume_nou

    def genereaza_factura(self):
        print(f"Factura seria {Factura.SERIE} numar {self.numar}")
        print(f"Data: {datetime.now()}")
        total = self.cantitate * self.pret_buc
        mytable = PrettyTable(["Produs", "Cantitate", "Pret bucata", "Total"])
        mytable.add_row([self.nume_produs, self.cantitate, self.pret_buc, total])
        print(mytable)


factura = Factura(1, "televizor", 5, 1500)
factura.schimba_cantitatea(8)
factura.schimba_pretul(1400)
factura.schimba_nume__produs("frigider")
factura.genereaza_factura()