# Signal URL Search
# This utility checks the database files for URLs
# This program is licensed under the GNU General Public License. See license.md for more info.

file_trust = open("trust.txt")
file_satire = open("satire.txt")
file_salt = open("salt.txt")
file_false = open("false.txt")

trust = file_trust.read().split('\n')
satire = file_satire.read().split('\n')
salt = file_salt.read().split('\n')
fake = file_false.read().split('\n')

print("Signal URL Search - a seach utility for Signal")
print("SigURL - Total sites loaded: ", str(len(trust + satire + salt + fake)),  "(" + str(len(trust)), "trusted sites, " + str(len(satire)), "satirical sites,", str(len(salt)) + " salted sites, ", str(len(fake)) + " fake sites)")

def searchQuery():
    searchTerm = str(input("Insert query hostname here: "))
    if searchTerm in trust:
        print(searchTerm, "is a trusted site.")
    elif searchTerm in satire:
        print(searchTerm, "is a satirical site.")
    elif searchTerm in salt:
        print(searchTerm, "is a salted site.")
    elif searchTerm in fake:
        print(searchTerm, "is a false site.")
    else:
        print(searchTerm, "is not in any list.")

searchQuery()