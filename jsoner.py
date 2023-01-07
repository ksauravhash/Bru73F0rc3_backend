from datetime import date
import json

name = input("Name: ")
swdname = input("S/W/D: ")
ddob = int(input("DD of Birth:"))
mdob = int(input("MM of Birth:"))
ydob = int(input("YYYY of Birth:"))
dob = date(ydob,mdob,ddob)
vfier = input("ID of Issuer Body:")

ddoi = int(input("DD of Issue:"))
mdoi = int(input("MM of Issue:"))
ydoi = int(input("YYYY of Issue:"))
doi = date(ydoi,mdoi,ddoi)

address = input("Enter Address:")
ntvalidity = int(input("Non-Transport Validity (in months):"))
tvalidity = int(input("Transport Validity (in months):"))

phno = input("Phone Number [without Country code and punctuation]: ")

info = {
    "name" : name,
    "dob" : str(dob),
    "doi" : str(doi),
    "contact" : phno,
    "issuer" : vfier,
    "address" : address,
    "non-transport" : ntvalidity,
    "transport" : tvalidity
}

pwd = phno[-4:] + str(ydob) + str(ydoi) + phno[:4]

with open("temp.json", "w") as outfile:
    json.dump(info, outfile)

print(pwd)
