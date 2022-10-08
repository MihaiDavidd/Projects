''' 1.Având lista:
mașini = ['Audi', 'Volvo', 'BMW', 'Mercedes', 'Aston Martin', 'Lăstun',
'Fiat', 'Trabant', 'Opel']
Folosește un for că să iterezi prin toată lista și să afișezi;
● ‘Mașina mea preferată este x’.
● Fă același lucru cu un for each.
● Fă același lucru cu un while.'''
masini = ['Audi', 'Volvo', 'BMW', 'Mercedes', 'Aston Martin', 'Lăstun','Fiat', 'Trabant', 'Opel']
for marca in range(len(masini)):
    print(f'Masina mea favorita este {masini[marca]}.')
for masina in masini:
    print(f'Masina mea favorita este {masina}')
a = 0
while a<len(masini):
    print(f'Masina mea favorita este {masini[a]}')
    a = a+1

'''2. Aceeași listă:Folosește un for else.
În for:
- Modifică elementele din listă astfel încât să fie scrie cu majuscule,
exceptând primul și ultimul.
În else:
- Printează lista.'''
for i in range(1, len(masini)-1):
    masini[i] = masini[i].upper()
    print(masini)
else:
    print(masini)

'''3. Aceeași listă:
Vine un cumpărător care dorește să cumpere un Mercedes.
Itereaza prin ea prin modalitatea aleasă de tine.
Dacă mașina e mercedes:
Printează ‘am găsit mașina dorită de dvs’
Ieși din ciclu folosind un cuvânt cheie care face acest lucru
Altfel:
Printează ‘Am găsit mașina X. Mai căutam‘'''
for marca in masini:
    if marca == 'Mercedes':
        print(f'Am gasit masina dorita de dvs')
        break
else:
    print(f'Am gasit masina {masina}. Mai cautam.')

'''4. Aceași listă;
Vine un cumpărător bogat dar indecis. Îi vom prezenta toate mașinile cu
excepția Trabant și Lăstun.
- Dacă mașina e Trabant sau Lăstun:
Folosește un cuvânt cheie care să dea skip la ce urmează (nu trebuie
else).
- Printează S-ar putea să vă placă mașina x.'''
for masina in masini:
    if masina == "Lăstun" or masina == "Trabant":
        continue
    print(f"S-ar putea sa va placa {masina}.")

'''5. Modernizează parcul de mașini:
● Crează o listă goală, masini_vechi.
● Itereaza prin mașini.
● Când găsesti Lăstun sau Trabant:
- Salvează aceste mașini în masini_vechi.
- Suprascrie-le cu ‘Tesla’ (în lista inițială de mașini).
● Printează Modele vechi: x.
● Modele noi: x.'''
masini = ['Audi', 'Volvo', 'BMW', 'Mercedes', 'Aston Martin', 'Lăstun','Fiat', 'Trabant', 'Opel']
masini_vechi =[]
for marca in masini:
    if marca == 'Lastun' or marca =='Trabant':
        masini_vechi.append(marca)
        masini.append('Tesla')
    print(f'Masinile noi sunt: {masini}')
    print(f'Masinile vechi sunt: {masini_vechi}')

'''6. Având dict:
pret_masini = {
'Dacia': 6800,
'Lăstun': 500,
'Opel': 1100,
'Audi': 19000,
'BMW': 23000
}
Vine un client cu un buget de 15000 euro.
● Prezintă doar mașinile care se încadrează în acest buget.
● Itereaza prin dict.items() și accesează mașina și prețul.
● Printează Pentru un buget de sub 15000 euro puteți alege mașină
xLastun
● Iterează prin listă.'''
pret_masini = {
'Dacia': 6800,
'Lăstun': 500,
'Opel': 1100,
'Audi': 19000,
'BMW': 23000
}
buget_client = 15000
for pret <= buget_client :
    print(f'Masina sugerata la bugetul dumneavoastra este {masina} cu valoarea {pret}')
if buget <=buget_client:
    print(f'Pentru un buget de sub 15000 euro puteți alege mașină Lastun')

'''7. Având lista:
numere = numere = [5, 7, 3, 9, 3, 3, 1, 0, -4, 3]
● Iterează prin ea.
● Afișează de câte ori apare 3 (nu ai voie să folosești count).'''
numere = numere = [5, 7, 3, 9, 3, 3, 1, 0, -4, 3]
afisare_3 = 0
for numar in numere:
    if numar==3:
        afisare_3 +=1
        print(f'Numarul 3 apare de {numar} ori')

'''8. Aceeași listă:
● Iterează prin ea
● Calculează și afișează suma numerelor (nu ai voie să folosești sum).'''
numere = numere = [5, 7, 3, 9, 3, 3, 1, 0, -4, 3]
suma_numere = 0
for numar in numere:
    suma_numere= suma_numere + numar
    print(suma_numere)

'''9. Aceeași listă:
● Iterează prin ea.
● Afișază cel mai mare număr (nu ai voie să folosești max).'''
numar_maxim = 0
for numar in numere:
    if numar > numar_maxim
        numar=numar_maxim
        print(f'cel mai mare numare este{numar_maxim}')

'''10. Aceeași listă:
● Iterează prin ea.
● Dacă numărul e pozitiv, înlocuieste-l cu valoarea lui negativă.
Ex: dacă e 3, să devină -3
● Afișază noua listă.'''
numere = numere = [5, 7, 3, 9, 3, 3, 1, 0, -4, 3]
numere_negative = 0
# if numere >= numere_negative:
numere_negative =[-a for a in numere]
print(numere_negative)
# nu gasesc conditia ca sa ruleze fara -4 in print

# EXERCITII OPTIONALE (MEDIU-AVANSAT)
'''11.
alte_numere = [-5, 7, 2, 9, 12, 3, 1, -6, -4, 3]
numere_pare = []
numere_impare = []
numere_pozitive = []
numere_negative = []
Iterati prin lista alte_numere
Populati corect celelalte liste
Afisati cele 4 liste la final '''

alte_numere = [-5, 7, 2, 9, 12, 3, 1, -6, -4, 3]
numere_pare = []
numere_impare = []
numere_pozitive = []
numere_negative = []

assert numere_pare == [2, 12, -6, -4], "Rezultat gresit, nu ai gasit corect toate numerele pare"
assert numere_impare == [-5, 7, 9, 3, 1, 3], "Rezultat gresit, nu ai gasit corect toate numerele impare"
assert numere_pozitive == [7, 2, 9, 12, 3, 1, 3], "Rezultat gresit, nu ai gasit corect toate numerele pozitive"
assert numere_negative == [-5, -6, -4], "Rezultat gresit, nu ai gasit corect toate numerele negative"

