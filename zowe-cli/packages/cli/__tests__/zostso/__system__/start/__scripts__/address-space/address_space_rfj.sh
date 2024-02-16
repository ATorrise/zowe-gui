#!/bin/bash
set -e

# Start address space, if the command was successful, servlet key will be received
SERVLET_KEY=`zowe tso start as | cut -d ' ' -f 8`

# Stop address space, successful result will mean that start was successful
zowe zos-tso stop address-space ${SERVLET_KEY}  --response-format-json
exit $?