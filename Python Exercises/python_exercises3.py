""" 1. Declară o listă note_muzicale în care să pui do re mi etc până la do
- Afișeaz-o
- Inversează ordinea folosind slicing și suprascrie această listă.
- Printează varianta actuală (inversată).
- Pe această listă aplică o metodă care bănuiești că face același lucru,
adică să îi inverseze ordinea. Nu trebuie să o suprascrii în acest caz,
deoarece metoda face asta automat.
- Printează varianta actuală a listei. Practic ai ajuns înapoi la varianta inițială."""
note_muzicale = [ 'do', 're', 'mi', 'fa', 'sol', 'la', 'si', 'do']
print(note_muzicale)
note_muzicale_invers = note_muzicale[::-1]
print(note_muzicale_invers)
note_muzicale_invers.reverse()
print(F'The new reversed will be {note_muzicale_invers}')

#2. De câte ori apare ‘do’?
note_muzicale = [ 'do', 're', 'mi', 'fa', 'sol', 'la', 'si', 'do']
print(note_muzicale.count('do'))

#3.Având 2 liste, [3, 1, 0, 2] și [6, 5, 4] - Găsește 2 variante să le unești într-o singură listă.
a = [3, 1, 0, 2]
b = [6, 5, 4]
new_list = a + b
print(new_list)
new_list2 = a
print(new_list2)
new_list2 = new_list2.__add__(b)
print(new_list2)

""" 4. - Sortează și afișază lista generată la exercițiul anterior. 
- Sterge numărul 0 folosind o funcție. 
- Afișaza iar lista."""
new_list2 = [3, 1, 0, 2, 6, 5, 4]
print(new_list2)
new_list2.sort()
print(new_list2)
del new_list2[0]
print(new_list2)

""" 5. Folosind un if verifică lista generată la exercițiul 3 și afișază: 
- Lista este goală. 
- Lista nu este goală."""
new_list2 = [3, 1, 0, 2, 6, 5, 4]
print(len(new_list2))
if len(new_list2) != 0:
    print("Lista nu este goala")
else:
    print('Lista este goala')

 ''' 6. Folosește o funcție care să șteargă lista de la exercițiul 3. '''
new_list2 = [3, 1, 0, 2, 6, 5, 4]
print(new_list2)
new_list2.clear()
print(new_list2)
del new_list2
print(new_list2)

#7. Copy paste la exercițiul 5. Verifică încă o dată. Acum ar trebui să se afișeze că lista e goală.
new_list2 = []
print(len(new_list2))
if len(new_list2) != 0:
    print("Lista nu este goala")
else:
    print('Lista este goala')

#8. Având dicționarul dict1 = {'Ana' : 8, 'Gigel' : 10, 'Dorel' : 5} Folosește o funcție că să afișezi Elevii (cheile)
dict1 = {'Ana' : 8, 'Gigel' : 10, 'Dorel' : 5}
print(f"Elevii din clasa sunt {dict1.keys()}")

#9. Printează cei 3 elevi și notele lor Ex: ‘Ana a luat nota {x}’ Doar nota o vei lua folosindu-te de cheie
dict1 = {'Ana' : 8, 'Gigel' : 10, 'Dorel' : 5}
print(f"Ana a luat nota {dict1['Ana']}")
print(f"Gigel a luat nota {dict1['Gigel']}")
print(f"Dorel a luat nota {dict1['Dorel']}")

""" 10. Dorel a făcut contestație și a primit 6 
- Modifică nota lui Dorel în 6 
- Printează nota după modificare"""
dict1 = {'Ana' : 8, 'Gigel' : 10, 'Dorel' : 5}
print(f"Dorel a avut nota {dict1['Dorel']} inainte de contestatie.")
dict1['Dorel'] = 6
print(dict1)
print(f"Dupa contestatie Dorel are nota {dict1['Dorel']}. ")

""" 11. Gigel se transferă din clasă 
- Căuta o funcție care să îl șteargă 
- Vine un coleg nou. Adaugă Ionică, cu nota 9 
- Printează noii elevi"""
dict1 = {'Ana' : 8, 'Gigel' : 10, 'Dorel' : 5}
print(dict1)
del dict1['Gigel']
print(dict1)
dict1['Ionel'] = 9
print(dict1)
print(f"Elevii din clasa sunt {dict1.keys()}")

"""12.Set zile_sapt = {'luni', 'marți', 'miercuri', 'joi', 'vineri', 'sâmbăta', 'duminică'} 
weekend = {'sâmbăta', 'duminică'} 
- Adaugă în zilele_sapt ‘luni’ 
- Afișeaza zile_sapt"""
zile_sapt = {'luni', 'marți', 'miercuri', 'joi', 'vineri', 'sâmbăta', 'duminică'}
weekend = {'sâmbăta', 'duminică'}
print(zile_sapt)
zile_sapt.add('luni')
print(zile_sapt)

""" 13.Folosește un if și verifică dacă: 
- Weekend este un subset al zilelor din săptămânii. 
- Weekend nu este un subset al zilelor din săptămânii."""
zile_sapt = {'luni', 'marți', 'miercuri', 'joi', 'vineri', 'sâmbăta', 'duminică'}
weekend = {'sâmbăta', 'duminică'}
if weekend.issubset(zile_sapt):
    print("Weekend este un subset al zilelor din săptămânii")
else:
    print("Weekend nu este un subset al zilelor din săptămânii.")

#14. Afișează diferențele dintre aceste 2 seturi.
zile_sapt = {'luni', 'marți', 'miercuri', 'joi', 'vineri', 'sâmbăta', 'duminică'}
weekend = {'sâmbăta', 'duminică'}
print(zile_sapt.difference(weekend))

#15. Afișază intersecția elementelor din aceste 2 seturi.
zile_sapt = {'luni', 'marți', 'miercuri', 'joi', 'vineri', 'sâmbăta', 'duminică'}
weekend = {'sâmbăta', 'duminică'}
print(zile_sapt.intersection(weekend))

# EXERCITII OPTIONALE (MEDIU-AVANSAT)
'''1. Ne imaginăm o echipă de fotbal pt teren sintetic. 3 Schimbări maxime admise: 
  - Declară o Listă cu 5 jucători 
  - Schimbari_efectuate = te joci tu cu valori diferite 
  - Schimbari_max = 3 
Dacă Jucătorul x e în teren și mai avem schimbări la dispoziție 
  - Efectuează schimbarea 
  - Șterge jucătorul scos din listă 
  - Adaugă jucătorul intrat 
  - Afișaza a intra x, a ieșit y, mai ai z schimbări 
Dacă jucătorul nu e în teren: 
  - Afișază ‘ nu se poate efectua schimbarea deoarece jucătorul x nu e în 
  teren’ 
  - Afișază ‘mai ai z schimbări’ 
Testează codul cu diferite valori'''
jucatori = ['hagi','petrescu','popescu','mutu', 'chivu']
Schimbari_efectuate = 0
Schimbari_max = 3
while Schimbari_efectuate < Schimbari_max:
    jucator_schimbat = input('Selecteaza jucatorul care doresti sa fie schimbat')
    noul_jucator = input("Alege un nou jucator care sa intre in teren")
if jucator_schimbat in jucatori:
        jucatori.remove(jucator_schimbat)
        jucatori.append(noul_jucator)
        Schimbari_efectuate += 1
        print(f'A intrat {noul_jucator}, a iesit {jucator_schimbat} si mai ai {(Schimbari_max - Schimbari_efectuate)} schimbari')
        print(jucatori)
else:
        print(f"nu se poate efectua schimbarea deoarece jucătorul {jucator_schimbat} nu e în teren")
        print(f"mai ai {(Schimbari_max-Schimbari_efectuate)} schimbări")
        print('Nu mai ai schimbari de facut.')

''' MAX_CHANGES = 3  # constant
players = ['Adela', 'Cosmin', 'Calin', 'Mada', 'Lavinia']
changes = 0  # number of changes

# se poate face si cu for, dar acolo trebuie sa mergem pe numarul de schimbari ramase
# for i in range(MAX_CHANGES - changes):
# In cazul acesta, trebuie sa fim atenti sa nu "sarim" daca ceea ce ne da utilizatorul nu e corect

# Cat timp inca mai avem schimbari disponibile
while changes < MAX_CHANGES:
    player_out = input(f"Ce jucator vrei sa iasa de pe teren? Optiunile sunt {players}\n")
    if player_out not in players:
        print(f"nu se poate efectua schimbarea deoarece jucatorul {player_out} nu e in teren")
        print(f"Mai aveti {MAX_CHANGES - changes} schimbari")
        continue  # sare inapoi la while, practic continua sa itereze, si "sare" peste codul de mai jos

    player_in = input(f"Ce jucator vrei sa bagi in locul lui {player_out}?\n")
    players.remove(player_out)  # Stergem jucatorul scos din lista
    players.append(player_in)  # Adaugam jucatorul intrat

    changes += 1  # Incrementam numarul de schimbari efectuate, deoarece avem o schimbare valida
    print(f"A intrat {player_in}, a iesit {player_out}, mai aveti {MAX_CHANGES - changes}")

print("S-a terminat meciul!") '''