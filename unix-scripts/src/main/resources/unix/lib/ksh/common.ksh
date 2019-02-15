#!/bin/ksh

print_usage()
{
    SCRIPT_TO_READ="${1}"

    check_file "${SCRIPT_TO_READ}"

    cat "${SCRIPT_TO_READ}" | grep "#%" | sed 's/#%//g'

}

check_file()
{

    FILE_TO_CHECK="${1}"

    if [ ! -f "${FILE_TO_CHECK}" ]
    then
        echo "The file ${FILE_TO_CHECK} does not exists"
        exit 1
    fi

    if [ ! -r "${FILE_TO_CHECK}" ]
    then
        echo "The file ${FILE_TO_CHECK} could not be read"
        exit 2
    fi

}

check_ret_val()
{
    ret_val="${1}"
    error_message="${2}"
    if [ "${ret_val}" -ne 0 ]
    then   
        log_err "${error_message}"
        exit 1
    fi
}