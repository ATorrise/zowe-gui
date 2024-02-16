#!/bin/bash
set -e

echo "================Z/OS FILES CREATE DATA-SET-SEQUENTIAL HELP==============="
zowe zos-files create data-set-sequential --help
if [ $? -gt 0 ]
then
    exit $?
fi

echo "================Z/OS CFILES CREATE DATA-SET-SEQUENTIAL HELP WITH RFJ==========="
zowe zos-files create data-set-sequential --help --rfj
exit $?
