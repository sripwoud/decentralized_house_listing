#!/bin/bash
~/zokrates compile -i square.code
~/zokrates setup
echo "[" > proofs.json
for ((i=1;i<=9;i++))
  do
    ~/zokrates compute-witness -a $i `expr $i \* $i`
    ~/zokrates generate-proof
    cat proof.json >> proofs.json
    echo "," >> proofs.json
  done
  ~/zokrates compute-witness -a 10 100
  ~/zokrates generate-proof
  cat proof.json >> proofs.json
  echo "]" >> proofs.json
