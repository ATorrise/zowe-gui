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

import { GuiResult, IHandlerParameters, ImperativeError, ProcessUtils, RestConstants, TextUtils } from "@zowe/imperative";
import {ILocalFile,
    EditUtilities} from "../../../../src/zosfiles/edit/Edit.utils";
import { mockHandlerParameters } from "@zowe/cli-test-utils";
import { EditDefinition } from "../../../../src/zosfiles/edit/Edit.definition";
import EditHandler from "../../../../src/zosfiles/edit/Edit.handler";
import { UNIT_TEST_PROFILES_ZOSMF, UNIT_TEST_ZOSMF_PROF_OPTS } from "../../../../../../__tests__/__src__/mocks/ZosmfProfileMock";
import stripAnsi = require("strip-ansi");

describe("Files Edit Group Handler", () => {
    describe("process method", () => {
        //Variable instantiation
        const dataSetName = "dataset";
        const dataSetPath = "/tmp/dataset.txt";

        const commandParameters: IHandlerParameters = mockHandlerParameters({
            arguments: UNIT_TEST_ZOSMF_PROF_OPTS,
            positionals: ["zos-files", "edit", "ds"],
            definition: EditDefinition,
            profiles: UNIT_TEST_PROFILES_ZOSMF
        });

        const localFile: ILocalFile = {
            tempPath: dataSetPath,
            fileName: dataSetName,
            fileType: "ds",
            guiAvail: true,
            zosResp: {
                apiResponse:{etag: 'remote etag'},
                success: true,
                commandResponse: ``
            },
            conflict: false
        };

        //Mocks Setup
        const buildTempPathSpy = jest.spyOn(EditUtilities, "buildTempPath");
        const checkForStashSpy = jest.spyOn(EditUtilities, "checkForStash");
        const promptUserSpy = jest.spyOn(EditUtilities, "promptUser");
        const localDownloadSpy = jest.spyOn(EditUtilities, "localDownload");
        const guiAvailSpy = jest.spyOn(ProcessUtils, "isGuiAvailable");
        jest.spyOn(EditUtilities, "fileComparison").mockImplementation(jest.fn());
        jest.spyOn(EditUtilities, "makeEdits").mockImplementation(jest.fn());

        guiAvailSpy.mockImplementation(jest.fn(() => {
            return GuiResult.GUI_AVAILABLE;
        }));
        buildTempPathSpy.mockImplementation(jest.fn(async () => {
            return dataSetPath;
        }));
        checkForStashSpy.mockImplementation(jest.fn(async () => {
            return true;
        }));
        promptUserSpy.mockImplementation(jest.fn(async () => {
            return true;
        }));
        localDownloadSpy.mockImplementation(jest.fn(async () => {
            return localFile;
        }));

        //Handler Setup
        const handler = new EditHandler;
        commandParameters.arguments.dataSetName = dataSetName;
        const params = Object.assign({}, ...[commandParameters]);
        params.arguments = Object.assign({}, ...[commandParameters.arguments]);
        params.response.console.log = jest.fn((logs) => {
            expect(stripAnsi(logs.toString())).toMatchSnapshot();
        }) as any;

        it("should correctly determine fileType upon initial creation of lfFile", async () => {
            let lfFile: ILocalFile;
            jest.spyOn(EditUtilities, "makeEdits").mockImplementation(async () => {
                lfFile = localFile;
                return true;
            });
            jest.spyOn(EditUtilities, "uploadEdits").mockImplementation(async () => {
                return [true, false]; //[uploaded, canceled]
            });
            await handler.process(params);
            expect(lfFile.fileType).toContain('ds');
        });
        it("should make and upload edits successfully", async () => {
            jest.spyOn(EditUtilities, "makeEdits").mockImplementation(async () => {
                return true;
            });
            jest.spyOn(EditUtilities, "uploadEdits").mockImplementation(async () => {
                return [true, false]; //[uploaded, canceled]
            });
            await handler.process(params);
            expect(params.response.data.setObj).toHaveBeenCalledWith({
                success: true,
                commandResponse: TextUtils.chalk.green(
                    "Successfully uploaded edits to mainframe."
                )});
        });
        it("should upload edits unsuccessfully", async () => {
            jest.spyOn(EditUtilities, "makeEdits").mockImplementation(async () => {
                return false;
            });
            jest.spyOn(EditUtilities, "uploadEdits").mockImplementation(async () => {
                return [false, true]; //[uploaded, canceled]
            });
            await handler.process(params);
            expect(params.response.data.setObj).toHaveBeenCalledWith({
                success: true,
                commandResponse: TextUtils.chalk.green(
                    "Exiting now. Temp file persists for editing."
                )});
        });
        it("should catch remote 404 error", async () => {
            localDownloadSpy.mockImplementation(jest.fn(async () => {
                throw new ImperativeError({
                    msg: "File not found on mainframe. Command terminated",
                    errorCode: String(RestConstants.HTTP_STATUS_404)
                });
            }));

            let caughtError;
            try {
                await handler.process(params);
            } catch(e) {
                caughtError = e;
            }
            expect(caughtError).toBeInstanceOf(ImperativeError);
        });
    });
});