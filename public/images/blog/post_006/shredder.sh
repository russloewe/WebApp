#!/bin/bash
ShredFile() {
    OUTPUT=$(wc -c "$1")
    fsize=($OUTPUT)
    if [ "$fsize" -lt 1 ]
    then
        let fsize=1
    fi
    echo $fsize
    echo "$1"
    dd if=/dev/zero of="$1" bs=$fsize count=1 conv=notrunc
    if [ $? -eq 0 ]
    then
        rm "$1"
        echo "$1 shredded"
    else
        zenity --error --text="Error trying to overwrite $1"
        exit 1
    fi
}

ShredDir () {
    arg=("$1")
    find "$arg" -type f | while read i
        do
            ShredFile "$i"
        done
        echo "pruning"
        find "$arg" -type d -empty -delete
}

ShredAll () {
    for arg 
        do
            if [ -d "$arg" ]
            then
                ShredDir "$arg"
            else
                ShredFile "$arg"
            fi
        done
}

zenity --question --text="Shred It?" --ok-label="Yes" --cancel-label="No"
if [ $? = 0 ] ; then
    (ShredAll "$@") | zenity --progress --pulsate --no-cancel --auto-close
else
    exit 
fi




