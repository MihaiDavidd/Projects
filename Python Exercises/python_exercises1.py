 #1. În cadrul unui comentariu, explică cu cuvintele tale ce este o variabilă.
# Raspuns: Variabila este o zona din memorie rezervata care contine date

''' 2. Declară și initializează câte o variabilă din fiecare din următoarele tipuri de 
variabilă :string,int,float, bool. 
Observație: Valorile vor fi alese de tine după preferințe.'''
nume_caine = 'Rex'
varsta_caine = 1.6
jucarii_caine = 10
sanatos = True

#3. Utilizează funcția type pentru a verifica dacă au tipul de date așteptat.
print(type(nume_caine))
print(type(varsta_caine))
print(type(jucarii_caine))
print(type(sanatos))

''' 4. Rotunjește ‘float’-ul folosind funcția round() și salvează această modificare în 
aceeași variabilă (suprascriere): 
- Verifică tipul acesteia. '''
varsta_caine = round(varsta_caine)
print(varsta_caine)
print(type(varsta_caine))

''' 5. Folosește print() și printează în consola 4 propoziții folosind cele 4 variabile. 
Rezolvă nepotrivirile de tip prin ce modalitate dorești.'''
print(f'Numele cainelui este {nume_caine}')
print(f'Are varsta de {varsta_caine} ani')
print(f'In curte se joaca cu {jucarii_caine} jucarii')
print(f'Cainele este sanatos ? {sanatos}')

'''6. Citește de la tastatură: numele si prenumele. 
Afișează: 'Numele complet are x caractere'.'''
nume = input('introdu numele tau')
prenume = input('introdu prenumele tau')
nume_prenume = nume + ' ' + prenume
nume_prenume = nume_prenume.split()
print(f'Numele complet are {len(nume_prenume)} caractere')

'''7. Citește de la tastatură: lungimea si lățimea. 
Afișează: 'Aria dreptunghiului este x'.'''
lungime = float(input('care este lungimea'))
latime = float(input('care este latimea'))
aria = lungime * latime
print(f'Aria dreptunghiului este {aria}')

'''8. Având stringul: 'Coral is either the stupidest animal or the smartest rock': 
- afișează de câte ori apare cuvântul 'the';'''
a = 'Coral is either the stupidest animal or the smartest rock'
print(a.count(' the '))

'''9. Același string. 
- Afișează de câte ori apare cuvântul 'the'; 
- Printează rezultatul.'''
a = 'Coral is either the stupidest animal or the smartest rock'
print(a.count('the'))

'''10. Același string. 
- Folosiți un assert ca să verificați dacă acest string conține doar numere'''
assert isinstance(a, int)

 # EXERCITII OPTIONALE (MEDIU-AVANSAT)
'''1. Exercițiu: 
- citește de la tastatură un string de dimensiune impară; 
- afișează caracterul din mijloc. '''
from math import ceil
string = input("introdu string de dimensiune impara")
mijloc = string[(len(string)-1)//2:(len(string)+2)//2]
print(mijloc)

''' 2. Folosind assert, verifică dacă un string este palindrom. 
A palindrome is a word, number, phrase, or other sequence of characters 
which reads the same backward as forward'''
a = input('introdu cuvant')
assert a == a[::-1]
print(f'este palindrom')

''' 3. Folosind o singură linie de cod : 
- citește un string de la tastatură (ex: 'alabala portocala'); 
- salvează fiecare cuvânt într-o variabilă; 
- printează ambele variabile pentru verificare. '''
a,b = input(f'scrie doua cuvinte').split(); print(a,"\n", b)

'''4. Exercițiu: 
- citește un string de la tastatură (ex: alabala portocala); 
- salvează primul caracter într-o variabilă - indiferent care este el, încearcă 
cu 2 stringuri diferite; 
- capitalizează acest caracter peste tot, mai puțin pentru primul și ultimul 
caracter => alAbAlA portocAla.'''
prop = 'alabala portocala'
caracter = prop[0]
cuvant_nou = prop[0] + prop[1:-1].replace(caracter, caracter.upper()) + prop[-1]
print(cuvant_nou)
#cuvant = input("Introdu un cuvant de la tastatura:\n")
#first_char = cuvant[0]
#last_char = cuvant[-1]
#cuvant = cuvant[1:-1].replace(first_char, first_char.upper())
#cuvant_cu_upper = first_char + cuvant + last_char
#print(cuvant_cu_upper)
'''5.Exercițiu: 
- citește un user de la tastatură; 
- citește o parolă; 
- afișează: 'Parola pt user x este ***** și are x caractere'; 
- ***** se va calcula dinamic, indiferent de dimensiunea parolei, trebuie să afișeze corect. 
eg: parola abc => *** parola abcd => ****'''
user = input('introdu nume')
password = input ('introdu parola')
password_length = len(password)
print(password_length)
show_password=password_length * '*'
print(f'Parola pentru user: {user} este {show_password} si are {password_length} caractere')