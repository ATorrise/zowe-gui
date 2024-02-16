#!/bin/bash
wn=$1
set -e

echo "================Z/OS WORKFLOWS DELETE ARCHIVED-WORKFLOW ==============="
zowe zos-workflows delete archived-workflow --workflow-name $wn
if [ $? -gt 0 ]
then
    exit $?
fi