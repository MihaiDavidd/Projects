# 1. Explică cu cuvintele tale în cadrul unui comentariu cum funcționează un if else.
# Conditia if specifica doar ca o conditie este adevarata sau falsa.
# Codul ruleaza pana la conditia if unde alege pe care varianta sa mearga true sau false.
# In afirmația if else daca afirmația este falsa, atunci este specificata in else parte.
# pot fi descrise asemenea unei intersectii

# 2. Verifică și afișează dacă x este număr natural sau nu.
x = input("Introdu un numar:\n")
if x.isdigit():
    print(f'{x} este un numar natural.')
else:
    print(f'{x} nu este un numar natural.')

# 3. Verifică și afișează dacă x este număr pozitiv, negativ sau neutru
x = int(input('Introdu un numar'))
if x < 0:
    print(f'{x} este un numar negativ.')
elif x == 0:
    print(f'{x} este un numar neutru.')
else:
    print(f'{x} este un numar pozitiv.')

# 4. Verifică și afișează dacă x este între -2 și 13.
x = int(input("Va rog scrieti un numar "))
if -2 > x < 13:
    print(f'{x} apartine intervalului (-2, 13)')
else:
    print(f'{x} nu apartine intervalului (-2, 13)')

# 5. Verifică și afișează dacă diferența dintre x și y este mai mică de 5
y = int(input("Te rog introdu un al doilea numar:\n"))
if (x - y) < 5:
    print(f"Diferenta dintre {x} si {y} este mai mica decat 5.")
else:
    print(f"Diferenta dintre {x} si {y} este mai mare decat 5.")

# 6. Verifică dacă x NU este între 5 și 27 - a se folosi ‘not’.
if not (5 < x < 27):
    print(f'{x}  nu este inclus in intervalul (5, 27)')
else:
    print(f'{x} este inclus in intervalul (5, 27)')

# 7. x și y (int). Verifică și afișează dacă sunt egale, dacă nu afișează care din ele este mai mare.
x = int(input("Te rog introdu un numar:\n"))
y = int(input("Te rog introdu un alt numar:\n"))
if x == y:
    print(f"{x} este egal cu {y}.")
elif x < y:\
        print(f"{x} este mai mic decat {y}.")
else:
    print(f"{x} este mai mare decat {y}.")

# 8. X, y, z - laturile unui triunghi. Afișează dacă triunghiul este isoscel, echilateral sau oarecare.
x, y, z = float(input("Te rog introdu cu spatiu intre ele lungimea celor trei laturi ale triunghiului:/n"))
if x == y == z:
       print("Acesta este un triunghi echilateral.")
elif x == y or y == z or z == x:
       print("Acesta este un triunghi isoscel.")
else:
       print("Acesta este un triunghi oarecare.")

# 9. Citește o literă de la tastatură. Verifică și afișează dacă este vocală sau nu
lista_vocale = ["a", "ă", "â", "e", "i", "î", "o", "u"]
lista_consoane = ["b", "c", "d", "f", "g", "h", "j", "l", "m", "n", "p", "r", "s", "ș", "t", "ț", "v", "z"]
litera = input("Te rog introdu o litera:\n").lower()
if litera in lista_vocale:
    print(f"{litera} este o vocala.")
elif litera in lista_consoane:\
        print(f"{litera} este o consoana.")
else:
       print(f"{litera} nu e este un caracter valid. Introdu un singur caracter din alfabet!")

# 10. Transformă și printează notele din sistem românesc în >
# Peste 9 => A
# Peste 8 => B
# Peste 7 => C
# Peste 6 => D
# Peste 4 => E
# 4 sau sub => F
nota = float(input("Introdu nota pe care ai luat-o la examen :\n"))
if 0 <= nota <= 10:
    if nota > 9:
        nota = "A"
        print(f"Nota ta este {nota}.")
    elif nota > 8:
        nota = "B"
        print(f"Nota ta este {nota}.")
    elif nota > 7:
        nota = "C"
        print(f"Nota ta este {nota}.")
    elif nota > 6:
        nota = "D"
        print(f"Nota ta este {nota}.")
    elif nota > 4:
        nota = "E"
        print(f"Nota ta este {nota}.")
    else:
        nota = "F"
        print(f"Nota ta este {nota}.")
else:
    print("Nota invalida")

# EXERCITII OPTIONALE (MEDIU-AVANSAT)

'''11.Verifica daca x are minim 4 cifre (x e int)
(ex: 7895 are 4 cifre, 10 nu are minim 4 cifre)'''
x = 5435
if x > 999:
    print("Minim 4 cifre")

'''12. Verifica daca x are exact 6 cifre'''
x = 543534
if 10**6 <= x < 10**7:
    print("Nr are exact 6 cifre")
else:
    print("Nr nu are exact 6 cifre")

'''13.Verifica daca x este numar par sau impar (x e int)'''
if x % 2 == 0:
    print("Este nr par")
else:
    print("Este nr impar")

'''14. x, y, z (int). Afiseaza care este cel mai mare dintre ele?'''
x, y, z = 3, 7, 1
if x > y:
    if x > z:
        print(f"{x} este cel mai mare")
    else:
        print(f"{z} este cel mai mare")
else:
    if y > z:
        print(f"{y} este cel mai mare")
    else:
        print(f"{z} este cel mai mare")

'''15. x, y, z - reprezinta unghiurile unui triunghi. Verifica si afiseaza daca triunghiul este valid sau nu'''
# Un triunghi este valid daca toate unghiurile sunt strict mai mari ca 0, iar suma lor este 180 grade
if (x > 0 and y > 0 and z > 0) and (x + y + z == 180):
    print("Triunghi valid")

'''16. Avand stringul: 'Coral is either the stupidest animal or the smartest rock'
cititi de la tastatura un int x 
afiseaza stringul fara ultimele x caractere
ex: daca ati ales 7 => 'Coral is either the stupidest animal or the smartest' '''
x = 7
my_string = "Coral is either the stupidest animal or the smartest rock"
print(my_string[0:len(my_string) - x])
print(my_string[:-x])

'''17.acelasi string. declara un string nou care sa fie format din primele 5 caractere + ultimele 5 '''
new_string = my_string[0:5] + my_string[-5:]

'''18.acelasi string. salveaza intr-o variabila si afiseaza indexul de start al cuvantului rock
(hint: este o functie care te ajuta sa faci asta) folosind aceasta variabila + slicing, afiseaza tot stringul pana la acest cuvant
output: 'Coral is either the stupidest animal or the smartest ' '''
# Putem gasi indexul cu find sau cu index
rock_index = my_string.index('rock')
# rock_index = my_string.find('rock')
print(my_string[0:rock_index])

'''19. citeste de la tastatura un string.verifica daca primul si ultimul caracter sunt la fel
se va folosi un assert. atentie: se doreste ca programul sa fie case insensitive 'apA' e acceptat '''
s = "apA"
# Putem compara cu upper sau lower, nu conteaza, cat timp in ambele parti folosim aceeasi functie
assert s[0].upper() == s[-1].upper()  # comparam A si A
assert s[0].lower() == s[-1].lower()  # comparam a si a

'''20. avand stringul '0123456789'. Afisati doar numerele pare acum afisati doar numerele impare
(hint: folositi slicing, controlati din pas'''
# Il consideram pe 0 ca fiind par
digits = "0123456789"
even = digits[ : :2]  # echivalent cu digits[0:len(digits):2]
odd = digits[1:len(digits):2]