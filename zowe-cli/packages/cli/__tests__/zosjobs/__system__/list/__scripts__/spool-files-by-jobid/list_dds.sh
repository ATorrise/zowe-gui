#!/bin/bash
zowe zos-jobs list spool-files-by-jobid $1
exit $?