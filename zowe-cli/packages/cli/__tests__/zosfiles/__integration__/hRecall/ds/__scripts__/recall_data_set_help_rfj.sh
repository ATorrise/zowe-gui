#!/bin/bash
set -e

echo "================Z/OS FILES RECALL DATA-SET-SEQUENTIAL HELP==============="
zowe zos-files recall data-set --help --rfj
if [ $? -gt 0 ]
then
    exit $?
fi
