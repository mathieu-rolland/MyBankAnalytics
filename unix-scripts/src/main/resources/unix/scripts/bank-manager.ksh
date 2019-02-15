#!/bin/ksh

# #####################################################
#
# start script for all bank analytics modules
#
#% #####################################################
#%
#% 
#% Function : Start a bank module
#%
#% usage : bank_manager.ksh <action> <MODULE>
#%
#%  action could be :
#%      - start : to start a module
#%      - stop : to stop the module
#%      - status : to display the module status
#%
#% Available modules :
#%    - registry : used to start the jhipster registry
#%
#%
#% Exemple :
#%  - To start the registry :
#%      bank_manager.ksh start registry
#%
#% #####################################################


readonly command="${1}"
readonly module="${2}"
readonly available_modules="registry"
readonly available_commands="start stop status"

THIS=$(readlink -e "${0}")

. "${PRODUCT_APPLI}/lib/ksh/logger.ksh"
. "${PRODUCT_APPLI}/lib/ksh/common.ksh"

check_input_param()
{
    if [ "$#" -ne 2 ]
    then
        log_err "The usage is not correct"
        print_usage "${THIS}"
        exit 1
    fi

    if [ "$(echo "${available_modules}" | grep "${module}")" -ne 0 ]
    then
        log_err "The module ${module} is not available"
        print_usage "${THIS}"
        exit 1
    fi

    res=$(echo "${available_commands}" | grep "${command}")
    if [ -z "${res}" ]
    then
        log_err "The command ${command} is not available"
        print_usage "${THIS}"
        exit 1
    fi

}

start_jhipster_registry()
{
    saved_location=$(pwd)

    cd "${DOCKERFILE_LOCATION}" || exit 1
    
    docker-compose -f "src/main/docker/jhipster-registry.yml" up -d
    check_ret_val "${?}" "Failed to start the jhispter registry"

    cd "${saved_location}" || exit 1

}

stop_jhipster_registry()
{
    docker ps -a | grep 'jhipster/jhipster-registry' | awk '{print $1}' | xargs docker stop | xargs docker rm
    check_ret_val "${?}" "Failed to stop the jhispter registry"
}

status_jhipster_registry()
{
    image_status=$(docker ps --format "table {{.Status}}" | grep -v 'STATUS')
    if [ -z "${image_status}" ]
    then    
        echo "JHIPSTER REGISTRY : STOPPED"
    else
        echo "JHIPSTER REGISTRY : ${image_status}"
    fi 
}

start_module()
{
    if [ "${module}" = "registry" ]
    then
        if [ "${command}" = "start" ]
        then
            log_info "Start the jhispter registry"
            start_jhipster_registry
            log_info "Jhipster registry started successfully"
        elif [ "${command}" = "stop" ]
        then
            log_info "Stop the jhispter registry"
            stop_jhipster_registry
            log_info "Jhipster registry stopped successfully"
        elif [ "${command}" = "status" ]
        then
            log_info "Get status of the jhispter registry"
            status_jhipster_registry
        else
            log_error "The input action is not available"
            exit 1
        fi
    fi
}

init_lib_log "${0}"
log_info "Start bank analytics module with param [${module}]"

check_input_param "$@"

start_module

log_info "Start bank analytics module done successfully"
