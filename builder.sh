#!/usr/bin/env bash

backend="backend/"
for d in */ ; do
    echo "$d"
    if [ $d == $backend ]
    then
    echo "$d"
    fi

done