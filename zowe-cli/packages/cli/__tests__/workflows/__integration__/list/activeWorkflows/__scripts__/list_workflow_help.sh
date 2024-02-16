#!/bin/bash
set -e

echo "================Z/OS WORKFLOWS LIST ACTIVE WORKFLOWS HELP==============="
zowe zos-workflows list aw --help
if [ $? -gt 0 ]
then
    exit $?
fi

echo "================Z/OS WORKFLOWS LIST ACTIVE WORKFLOWS HELP RFJ==========="
zowe zos-workflows list aw --help --rfj
exit $?
