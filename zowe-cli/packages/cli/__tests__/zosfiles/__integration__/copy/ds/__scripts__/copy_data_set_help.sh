#!/bin/bash
set -e

echo "================Z/OS FILES COPY DATA SET HELP==============="
zowe zos-files copy ds --help
if [ $? -gt 0 ]
then
    exit $?
fi