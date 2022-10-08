from abc import ABC
class FormaGeometrica(ABC):
    PI = 3.14
    def aria(self):
        raise NotImplementedError
    def descrie(self):
        print('Cel mai probabil am colturi')

class Cerc(FormaGeometrica):
    def __init__(self, raza):
        self.__raza = raza
    def aria(self):
        return self.__raza ** 2 * FormaGeometrica.PI
    def descrie(self):
        print(f'Sunt un cerc')
    @property
    def raza(self):
        return self.__raza
    @raza.getter
    def raza(self):
        print('Luam raza')
        return self.__raza
    @raza.setter
    def raza(self, valoare):
        print(f'Schimbam valoare razei cu {valoare}')
        self.__raza = valoare
    @raza.deleter
    def raza(self, raza_noua):
        if raza_noua > 0:
            print("am schimbat raza!")
        else:
            print("raza nu poate fi negativa")

class Patrat(FormaGeometrica):
    def __init__(self, latura):
        self.__latura = latura

        def aria(self):
            return self.__raza ** 2

        def perimetru(self):
            return self.__raza * 4
    @property
    def latura(self):
        return self.__latura
    @latura.getter
    def latura(self):
        print('Luam latura')
        return self.__latura
    @latura.setter
    def latura(self, valoare):
        print(f'Schimbam valoare laturii cu {valoare}')
        self.__latura = valoare
    @latura.deleter
    def latura(self):
        print('Se sterge latura')
        self.__latura = None
    def aria(self):
        return self.__latura ** 2
    def descrie(self):
        print(f'Sunt patrat')

c = Cerc(12)
print(c.aria(), 'Aria cercului')
c.descrie()
c.raza = 3
c.descrie()
print(c.aria(), 'Aria cercului')
p = Patrat(4)
print(p.aria(), 'Aria patratului')
p.descrie()
p.latura = 3
p.latura
p.descrie()
print(p.aria(), 'Aria patratului')
a = FormaGeometrica()
a.descrie()
try:
    a.aria()
except NotImplementedError:
    print('Forma geometrica este clasa abstracta')