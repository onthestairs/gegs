# Gegs

Gegs is a crossword making assistant.


## Words list
To make the word list first download similar to
`hunspell-en_GB-ise-2017.01.22.zip` from SCOWL - https://sourceforge.net/projects/wordlist/files/speller/2017.01.22/.

Then run this command to make the json file ```cat en_GB-ise.dic | grep -E "^[a-zA-Z]+/.*\$" | sed -E "s/([a-zA-Z]+)\/.*/\1/" | tr '[a-z]' '[A-Z]' | sort | uniq |jq  --raw-input .  | jq --slurp . > words.json```
