/*
* This program and the accompanying materials are made available under the terms of the
* Eclipse Public License v2.0 which accompanies this distribution, and is available at
* https://www.eclipse.org/legal/epl-v20.html
*
* SPDX-License-Identifier: EPL-2.0
*
* Copyright Contributors to the Zowe Project.
*
*/

/**
 * The test environment for your test.
 * @export
 * @interface ITestEnvironment
 */
export interface ITestEnvironment<TestPropertiesSchema> {
    /**
     * The working directory for your test environment. It is a unique (uuid) area where your tests can create
     * their home folders (for imperative, etc.) and you can use the area as scratch for any files, etc. that
     * must be created for your test.
     * @type {string}
     * @memberof ITestEnvironment
     */
    workingDir: string;

    /**
     * The system test properties configured and loaded as part of the test lifecycle. This field may be null
     * in the case that no system test properties were configured or could be loaded.
     *
     * Not present if skipProperties is specified on ISetupEnvironmentParms
     * @type {TestPropertiesSchema}
     * @memberof ITestEnvironment
     */
    systemTestProperties: TestPropertiesSchema;

    /**
     * Set of environmental variables (such as profile/logging home directory)
     * that can be used when executing zowe CLI commands
     * @type { [key: string]: string }
     * @memberof ITestEnvironment
     */
    env: { [key: string]: string };

    /**
     * A map of profileType to profile names created when you specify
     * tempProfileTypes on your ISetupEnvironmentParms object.
     * Empty if you did not specify any profile types.
     * @type { [key: string]: string[] }
     * @memberof ITestEnvironment
     */
    tempProfiles?: { [profileType: string]: string[] };

    /**
     * Was the plugin installed in the working directory
     */
    pluginInstalled?: boolean;
}
