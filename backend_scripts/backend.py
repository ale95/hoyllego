#! /usr/bin/python
# -*- coding: ISO-8859-1 -*-
import urllib, json, threading
import xml.etree.ElementTree as et
from xml.dom.minidom import parse
import datetime as dt

def dayOrNight(data):
	arrayTime = str(dt.datetime.time(dt.datetime.now())).split(':')
	if int(arrayTime[0]) >= 6 and  int(arrayTime[0]) <= 20:
		a = 'd'
	else:
		a = 'n'
	return a

def getTime():
	return dt.datetime.time(dt.datetime.now())
def getTiempo():
	dicc = {}
	code = urllib.urlopen("http://weather.yahooapis.com/forecastrss?w=468739&u=c")
	tempsmn = urllib.urlopen("http://www.smn.gov.ar/layouts/temperatura_layout.php").read().decode('iso-8859-1').encode("utf-8").split("º")[0]
	parse = et.parse(code)
	root = parse.getroot()
	tiempo = root[0][12][5].attrib

	dicc['temperatura'] = str(tempsmn)
	if (dicc['temperatura'] == ""):
		print getTime(), "[Tiempo] ADV: Temperatura de Yahoo"
		dicc['temperatura'] = str(tiempo['temp'])

	estadosArray = ['Tornado', 'Tormenta tropical', 'Huracán', "Tormentas fuertes", "Tormenta", "Lluvia y nieve", "Lluvia y aguanieve", "Aguanieve y nieve", "Llovizna helada", "Llovizna", "Lluvia helada", "Lluvia", "Lluvia", "Copos de nieve", "Lluvia ligera", "Nieve y viento", "Nieve", "Granizo", "Aguanieve", "Polvo", "Brumoso", "Neblina", "Humo", "Un poco ventoso", "Ventoso", "Frío", "Nublado", "Parcialmente nublado", "Parcialmente nublado", "Un poco nublado", "Un poco nublado", "Despejado", "Soleado", "Templado", "Templado", "Lluvia con piedras", "Caluroso", "Tormentas aisladas", "Tormentas dispersas", "Tormentas dispersas", "Lluvias Dispersas", "Fuertes Nevadas", "Nevada Leve Dispersa", "Fuertes Nevadas", "Parcialmente Nublado", "Chaparrón", "Nevada Leve", "Chaparrones Aislados"]
	dicc['estado'] = estadosArray[int(tiempo['code'])]
	dicc['icono'] = 'http://l.yimg.com/a/i/us/nws/weather/gr/'+ str(tiempo['code']) + dayOrNight(tiempo['date']) + '.png'

	dicc['minima'] = root[0][12][7].attrib['low']
	dicc['maxima'] = root[0][12][7].attrib['high']

	pronextarray = []
	dicc['extendido'] = pronextarray
	for x in range(8,12):
		pronextarray.append({"dia" : root[0][12][x].attrib['day'], "fecha" : root[0][12][x].attrib['date'], "minima" : root[0][12][x].attrib['low'], "maxima" : root[0][12][x].attrib['high'], "estado" : estadosArray[int(root[0][12][x].attrib['code'])], "icono" : 'http://l.yimg.com/a/i/us/nws/weather/gr/'+ str(root[0][12][x].attrib['code']) + 'd.png'})

	jsonString = json.dumps(dicc)

	jsonFile = open("../servicios/tiempo/serv.json", 'w')
	jsonFile.write(jsonString)
	jsonFile.close()
	print getTime(), "[Tiempo] JSON editado"
	threading.Timer(1800.0, getTiempo).start()

getTiempo()

def subteColor(data):
	if "Servicio normal" in data:
		a = 1
	elif data == "Servicio con demora" or data == "Comenzó a regularizar su servicio" or "Con demora" in data:
		a = 2
	else:
		a = 3
	return a

def getSubte():
	diccWidget = []
	pag = urllib.urlopen("http://www.metrovias.com.ar/V2/InfoSubteSplash.asp")
	linearay = pag.read().decode('iso-8859-1').encode("utf-8").split("\n")
	sptlinearay = linearay[24].split("<")
	i=0
	estadof = []
	for x in xrange(2,len(sptlinearay),2):
		estadoraw = sptlinearay[x].split(";")
		estadoraw1 = estadoraw[1][0:-1]
		i = i + 1
		estadof.append(estadoraw1)


	nombresArray = ["A", "B", "C", "D", "E", "H", "P", "U"]
	coloresArray = ["#06f", "red", "#009", "green", "indigo", "yellow", "orange", "red"]
	for z in range(len(estadof)):
		diccWidget.append({"nombre" : nombresArray[z], "estado" : subteColor(estadof[z]) , "color" : coloresArray[z], "detalle" : estadof[z]})
	wjsonString = json.dumps(diccWidget)
	wjsonFile = open("../servicios/subtes/serv.json", 'w')
	wjsonFile.write(wjsonString)
	wjsonFile.close()
	print getTime(), "[Subtes] JSON editado"

	threading.Timer(90.0, getSubte).start()

getSubte()


def getTrenes():
	code = urllib.urlopen("http://www.ferrovias.com.ar/")
	lineadetalle = code.read().split('\n')[78]
	parse = et.fromstring(lineadetalle)
	uFile = open("Ugofe.json", 'r')
	fFile = open("Ferrovias.json", 'r')
	sFile = open("Sofse.json", 'r')

	uDicc = json.loads(uFile.read())
	fDicc = json.loads(fFile.read())
	sDicc = json.loads(sFile.read())
	uFile.close()
	fFile.close()
	sFile.close()

	for i in fDicc:
		uDicc.append(i)
	for i in sDicc:
		uDicc.append(i)
	
	jsonString = json.dumps(uDicc)
	jsonFile = open("../servicios/trenes/serv.json", 'w')
	jsonFile.write(jsonString)
	jsonFile.close()
	print getTime(), "[Trenes] JSON editado"

	threading.Timer(90.0, getTrenes).start()

getTrenes()

def getRss():
	codert = urllib.urlopen("http://actualidad.rt.com/feeds/all.rss?rss=1")
	codetn = urllib.urlopen("http://www.tn.com.ar/rss.xml")
	codeinfobae = urllib.urlopen("http://cdn01.ib.infobae.com/adjuntos/162/rss/Infobae.xml")
	#codetelam = urllib.urlopen("http://www.telam.com.ar/rss2/ultimasnoticas.xml")


	filert = open("../servicios/rt/rss.xml", 'w')
	filert.write(codert.read())
	filert.close()

	filetn = open("../servicios/tn/rss.xml", 'w')
	filetn.write(codetn.read())
	filetn.close()

	fileinfobae = open("../servicios/infobae/rss.xml", 'w')
	fileinfobae.write(codeinfobae.read())
	fileinfobae.close()

	'''filetelam = open("../servicios/telam/rss.xml", 'w')
	filetelam.write(codetelam.read())
	filetelam.close()'''

	print getTime(),"[RSS] RSS's actualizados"

	threading.Timer(300.0, getRss).start()

getRss()