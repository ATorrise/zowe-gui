#!/bin/bash
step=$1
set -e

echo "================Z/OS WORKFLOWS START WORKFLOW EMPTY ==============="
zowe zos-workflows start workflow-step $step
if [ $? -gt 0 ]
then
    exit $?
fi