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
import { TestEnvironment } from "../../../../../../__tests__/__src__/environment/TestEnvironment";
import { ITestPropertiesSchema } from "../../../../../../__tests__/__src__/properties/ITestPropertiesSchema";
import * as fs from "fs";
import { StartTso, StopTso } from "@zowe/zos-tso-for-zowe-sdk";
import { Session } from "@zowe/imperative";

// Test Environment populated in the beforeAll();
let TEST_ENVIRONMENT: ITestEnvironment<ITestPropertiesSchema>;
let systemProps: ITestPropertiesSchema;
let REAL_SESSION: Session;
let acc: string;

describe("zos-tso ping address-space", () => {

    // Create the unique test environment
    beforeAll(async () => {
        TEST_ENVIRONMENT = await TestEnvironment.setUp({
            testName: "zos_tso_start_as",
            tempProfileTypes: ["zosmf", "tso"]
        });

        systemProps = TEST_ENVIRONMENT.systemTestProperties;

        REAL_SESSION = TestEnvironment.createZosmfSession(TEST_ENVIRONMENT);
        acc = systemProps.tso.account;
    });

    afterAll(async () => {
        await TestEnvironment.cleanUp(TEST_ENVIRONMENT);
    });

    it("should throw an error if provided address space is inactive", async () => {
        const response = runCliScript(__dirname + "/__scripts__/address-space/as_error_ping.sh", TEST_ENVIRONMENT);
        expect(response.status).toBe(1);
        expect(response.stdout.toString()).toBe("");
        expect(response.stderr.toString()).toMatchSnapshot();
    });

    it("should successfully issue the command", async () => {
        const regex = fs.readFileSync(__dirname + "/__regex__/as_ping_response.regex").toString();
        const key = (await StartTso.start(REAL_SESSION, acc)).servletKey;
        const response = runCliScript(__dirname + "/__scripts__/address-space/as_success_ping.sh", TEST_ENVIRONMENT, [key]);
        StopTso.stop(REAL_SESSION, key);
        expect(response.stderr.toString()).toBe("");
        expect(response.status).toBe(0);
        expect(new RegExp(regex, "g").test(response.stdout.toString())).toBe(true);
    });

    describe("without profiles", () => {

        // Create a separate test environment for no profiles
        let TEST_ENVIRONMENT_NO_PROF: ITestEnvironment<ITestPropertiesSchema>;
        let DEFAULT_SYSTEM_PROPS: ITestPropertiesSchema;

        beforeAll(async () => {
            TEST_ENVIRONMENT_NO_PROF = await TestEnvironment.setUp({
                testName: "zos_tso_ping_as_without_profiles"
            });

            DEFAULT_SYSTEM_PROPS = TEST_ENVIRONMENT_NO_PROF.systemTestProperties;
        });

        afterAll(async () => {
            await TestEnvironment.cleanUp(TEST_ENVIRONMENT_NO_PROF);
        });

        it("should successfully issue the command without a profile", async () => {
            const regex = fs.readFileSync(__dirname + "/__regex__/as_ping_response.regex").toString();
            const key = (await StartTso.start(REAL_SESSION, acc)).servletKey;

            const ZOWE_OPT_BASE_PATH = "ZOWE_OPT_BASE_PATH";

            // if API Mediation layer is being used (basePath has a value) then
            // set an ENVIRONMENT variable to be used by zowe.
            if (DEFAULT_SYSTEM_PROPS.zosmf.basePath != null) {
                TEST_ENVIRONMENT_NO_PROF.env[ZOWE_OPT_BASE_PATH] = DEFAULT_SYSTEM_PROPS.zosmf.basePath;
            }

            const response = runCliScript(__dirname + "/__scripts__/address-space/as_ping_fully_qualified.sh",
                TEST_ENVIRONMENT_NO_PROF,
                [
                    key,
                    DEFAULT_SYSTEM_PROPS.zosmf.host,
                    DEFAULT_SYSTEM_PROPS.zosmf.port,
                    DEFAULT_SYSTEM_PROPS.zosmf.user,
                    DEFAULT_SYSTEM_PROPS.zosmf.password,
                ]);
            StopTso.stop(REAL_SESSION, key);
            expect(response.stderr.toString()).toBe("");
            expect(response.status).toBe(0);
            expect(new RegExp(regex, "g").test(response.stdout.toString())).toBe(true);
        });
    });
});
