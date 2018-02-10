#!/bin/ksh

start_gui()
{
	 nohup yarn start 2>&1 > gui.log & 
}

start_security()
{
	nohup docker-compose -f src/main/docker/keycloak.yml up 2>&1 > security.log &

}

start_security
start_gui

