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

import { ITestEnvironment, runCliScript } from "@zowe/cli-test-utils";
import { TestEnvironment } from "../../../../../../../__tests__/__src__/environment/TestEnvironment";
import { ITestPropertiesSchema } from "../../../../../../../__tests__/__src__/properties/ITestPropertiesSchema";

// Test Environment populated in the beforeAll();
let TEST_ENVIRONMENT: ITestEnvironment<ITestPropertiesSchema>;

describe("Create z/OS USS directory", () => {

    // Create the unique test environment
    beforeAll(async () => {
        TEST_ENVIRONMENT = await TestEnvironment.setUp({
            testName: "zos_create_uss_dir",
            skipProperties: true
        });
    });

    afterAll(async () => {
        await TestEnvironment.cleanUp(TEST_ENVIRONMENT);
    });

    it("should display the help", () => {
        const response = runCliScript(__dirname + "/__scripts__/create_uss_dir_help.sh", TEST_ENVIRONMENT);
        expect(response.stderr.toString()).toBe("");
        expect(response.status).toBe(0);
        expect(response.stdout.toString()).toMatchSnapshot();
    });

    it("should fail creating a USS directory due to missing uss path", () => {
        const response = runCliScript(__dirname + "/__scripts__/command/command_create_uss_dir.sh",
            TEST_ENVIRONMENT, []);
        expect(response.stderr.toString()).toContain("Missing Positional Argument");
        expect(response.stderr.toString()).toContain("ussPath");
    });

    it("should fail creating a USS directory due to invalid length on option mode", () => {
        const response = runCliScript(__dirname + "/__scripts__/command/command_create_uss_dir_mode.sh",
            TEST_ENVIRONMENT, []);
        expect(response.stderr.toString()).toContain("Invalid value length for option");
        expect(response.stderr.toString()).toContain("--mode");
    });

});
