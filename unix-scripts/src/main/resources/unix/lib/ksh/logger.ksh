#!/bin/ksh




export LOG_FILE=""
export SCRIPT_EXECUTOR=""

export DBG_LEVEL=5
export INFO_LEVEL=4
export WARN_LEVEL=3
export ERROR_LEVEL=2
export NO_TRACE=1

export DEFAULT_LOG_LEVEL="${INFO_LEVEL}"

export LOG_LEVEL="${DEFAULT_LOG_LEVEL}"

export PATTERN_INFO='INFO'
export PATTERN_ERROR='ERROR'
export PATTERN_WARNING='WARN'
export PATTERN_DEBUG='DBG'

write_log()
{
    current_log_level="${1}"
    message="${2}"
    asked_log_level=$(eval echo "\$${current_log_level}_LEVEL")

    if [ "${LOG_LEVEL}" -ge "${asked_log_level}" ]
    then
      log_date=$(date +'%Y-%m-%d %H:%M:%S')
      echo "[${SCRIPT_EXECUTOR}][${current_log_level}] - ${log_date} : ${message}" >> "${LOG_FILE}"
    fi
}

init_lib_log()
{
  SCRIPT_EXECUTOR="$(basename "${1}" ".ksh")"
  export LOG_FILE="${VARSOFT_APPLI}/log/${SCRIPT_EXECUTOR}.log"
  export SCRIPT_EXECUTOR

  if [ "$#" -eq 2 ]
  then 
    export LOG_LEVEL="${2}"
  fi

}

log_info()
{
  message="${1}"
  write_log "${PATTERN_INFO}" "${message}"
}

log_warn()
{
  message="${1}"
  write_log "${PATTERN_WARNING}" "${message}"
}

log_err()
{
  message="${1}"
  write_log "${PATTERN_ERROR}" "${message}"
}

log_debug()
{
  message="${1}"
  write_log "${PATTERN_DEBUG}" "${message}"
}